/* 城市智能管理与公共政策模拟仿真系统 — 政策效果模拟引擎
 *
 * 核心职责：
 * 1. 计算政策组合的协同效应和冲突效果
 * 2. 模拟政策实施的滞后效应（政策从颁布到生效需要时间）
 * 3. 计算城市综合运行指标（民生指数、治理效能、可持续发展等）
 * 4. 提供政策效果的定量评估
 */

import { Messages } from '../Messages.js';
import { Micro } from '../Micro.js';

export class PolicyEngine {

    constructor () {
        // 政策滞后效应队列：记录最近激活的政策及其生效进度
        // { id: string, startCityTime: number, targetEffect: object, progress: 0~1 }
        this._pendingPolicies = [];

        // 上一次的协同/冲突检测结果
        this._lastSynergy = 0;
        this._lastConflict = 0;

        // 政策效果缓冲（实际生效中的效果，考虑滞后）
        this._effectiveBonuses = {
            healthBonus: 0,
            pollutionMod: 0,
            educationBonus: 0,
            trafficMod: 0,
            comTaxMod: 0,
            crimeMod: 0,
            giniMod: 0,
            greenRateMod: 0,
            livelihoodMod: 0
        };
    }

    save (saveData) {
        saveData.policyPendingPolicies = this._pendingPolicies.map(p => ({
            id: p.id,
            startCityTime: p.startCityTime,
            progress: p.progress
        }));
    }

    load (saveData) {
        if (saveData && saveData.policyPendingPolicies) {
            this._pendingPolicies = saveData.policyPendingPolicies;
        }
    }

    // 政策激活时加入滞后队列（滞后周期 = 12 个 cityTime 单位 ≈ 3个月）
    onPolicyActivated (id, cityTime, fullEffects) {
        const LAG_CYCLES = 12;
        this._pendingPolicies.push({
            id: id,
            startCityTime: cityTime,
            fullEffects: fullEffects,
            lagCycles: LAG_CYCLES,
            progress: 0
        });
    }

    // 政策撤销时从滞后队列移除
    onPolicyDeactivated (id) {
        this._pendingPolicies = this._pendingPolicies.filter(p => p.id !== id);
    }

    // 每个模拟 tick 更新滞后进度
    updateLagProgress (cityTime) {
        for (let i = 0; i < this._pendingPolicies.length; i++) {
            let p = this._pendingPolicies[i];
            let elapsed = cityTime - p.startCityTime;
            p.progress = Math.min(1, elapsed / p.lagCycles);
        }
        // 清理已完成的（progress >= 1 超过一定时间的）
        this._pendingPolicies = this._pendingPolicies.filter(p => p.progress < 1.0 || (cityTime - p.startCityTime) < p.lagCycles * 2);
    }

    // 检测政策协同与冲突
    detectInteractions (ordinances) {
        let interactions = ordinances.getPolicyInteractions();
        this._lastSynergy = interactions.synergy;
        this._lastConflict = interactions.conflict;
        return interactions;
    }

    // 计算综合政策效果（含协同加成和冲突削减）
    computeEffectiveEffects (ordinancesEffects) {
        let fx = Object.assign({}, ordinancesEffects);

        // 协同加成：每对协同政策增加 5% 效果
        let synergyMultiplier = 1 + this._lastSynergy * 0.05;
        // 冲突削减：每对冲突政策减少 3% 效果
        let conflictMultiplier = 1 - this._lastConflict * 0.03;
        let finalMultiplier = synergyMultiplier * conflictMultiplier;

        for (let key in fx) {
            if (typeof fx[key] === 'number' && key !== 'comTaxMod') {
                fx[key] = Math.round(fx[key] * finalMultiplier * 10) / 10;
            }
        }
        // comTaxMod 是乘法修正，不适用加成/削减
        fx._synergyCount = this._lastSynergy;
        fx._conflictCount = this._lastConflict;

        return fx;
    }

    // ══════════════════════════════════════════════════════════════
    // 城市运行综合指标计算
    // ══════════════════════════════════════════════════════════════

    // 基尼系数 (0~1)
    // 受住房保障、最低工资、城市更新、社会保障等政策影响
    computeGiniCoefficient (census, budget, ordFx, indFx) {
        let base = 0.35; // 基准值
        // 贫富差距随人口增长而自然扩大
        let popScale = census.totalPop > 0 ? Math.min(census.totalPop / 100000, 0.2) : 0;
        // 税收累进性影响
        let taxEffect = (budget.resTaxRate - budget.indTaxRate) * 0.005;
        // 政策修正
        let ordGiniMod = (ordFx.giniMod || 0) / 100; // giniMod 是百分点，转成 0~1
        let indGiniMod = (indFx && indFx.giniMod) ? indFx.giniMod / 100 : 0;

        let gini = base + popScale - taxEffect + ordGiniMod + indGiniMod;
        // 社会保障投入降低基尼系数
        if (budget.socialSecurityMaintenanceBudget > 0) {
            let ssEffect = budget.socialSecurityEffect / Micro.MAX_SOCIAL_SECURITY_EFFECT;
            gini -= ssEffect * 0.05;
        }
        return Math.max(0.15, Math.min(0.65, gini));
    }

    // 恩格尔系数 (0~1)
    computeEngelCoefficient (census, budget) {
        let base = 0.40;
        // 地价越高，恩格尔系数越低（越富裕）
        let landValueEffect = -Math.min(census.landValueAverage, 200) / 1000;
        // 税率越高，可支配收入越少
        let taxEffect = budget.cityTax * 0.01;
        // 社会保障越好，基本生活支出占比越低
        let ssEffect = 0;
        if (budget.socialSecurityMaintenanceBudget > 0) {
            ssEffect = -(budget.socialSecurityEffect / Micro.MAX_SOCIAL_SECURITY_EFFECT) * 0.05;
        }
        return Math.max(0.15, Math.min(0.70, base + landValueEffect + taxEffect + ssEffect));
    }

    // 城市绿化率 (0~100%)
    computeGreenRate (census, budget, ordFx) {
        let base = 30; // 基础绿化率
        let parkBonus = Math.min((census.parkCount || 0) * 0.5, 20);
        let pollutionPenalty = -Math.min(census.pollutionAverage, 100) * 0.1;
        let ordBonus = (ordFx.greenRateMod || 0) * 0.5;
        let envEffect = 0;
        if (budget.environmentMaintenanceBudget > 0) {
            envEffect = (budget.environmentEffect / Micro.MAX_ENVIRONMENT_EFFECT) * 10;
        }
        return Math.max(5, Math.min(80, base + parkBonus + pollutionPenalty + ordBonus + envEffect));
    }

    // 民生综合指数 (0~100)
    computeLivelihoodIndex (census, budget, ordFx) {
        let base = 50;
        // 健康水平贡献
        base += (census.healthLevel / Micro.HEALTH_EFFECT_RANGE) * 15;
        // 教育水平贡献
        base += (census.educationLevel / Micro.EDUCATION_EFFECT_RANGE) * 10;
        // 社会保障覆盖率
        let ssCoverage = budget.socialSecurityMaintenanceBudget > 0
            ? (budget.socialSecurityEffect / Micro.MAX_SOCIAL_SECURITY_EFFECT) * 100 : 40;
        base += ssCoverage * 0.1;
        // 政策修正
        base += (ordFx.livelihoodMod || 0) * 0.5;
        // 失业率惩罚
        let unemployment = (census.comPop + census.indPop) > 0
            ? Math.max(0, (census.resPop / ((census.comPop + census.indPop) * 8) - 1) * 100) : 0;
        base -= Math.min(unemployment, 30) * 0.3;
        // 基尼系数惩罚
        base -= Math.max(0, census.giniCoefficient - 0.4) * 50;
        return Math.max(0, Math.min(100, Math.round(base)));
    }

    // 治理效能指数 (0~100)
    computeGovernanceIndex (census, budget, ordFx) {
        let base = 50;
        // 警力覆盖
        let policeCoverage = 0;
        if (budget.policeMaintenanceBudget > 0) {
            policeCoverage = (budget.policeEffect / Micro.MAX_POLICESTATION_EFFECT) * 100;
        }
        base += policeCoverage * 0.1;
        // 犯罪率越低越好
        base -= census.crimeAverage * 0.15;
        // 消防覆盖
        let fireCoverage = 0;
        if (budget.fireMaintenanceBudget > 0) {
            fireCoverage = (budget.fireEffect / Micro.MAX_FIRESTATION_EFFECT) * 20;
        }
        base += fireCoverage * 0.05;
        // 智慧城市平台加成
        base += (ordFx.trafficMod || 0) * -0.2; // trafficMod is negative = good
        base += (ordFx.crimeMod || 0) * -0.3;   // crimeMod is negative = good
        return Math.max(0, Math.min(100, Math.round(base)));
    }

    // 可持续发展指数 (0~100)
    computeSustainabilityIndex (census, budget, ordFx) {
        let base = 50;
        // 环境保护投入
        if (budget.environmentMaintenanceBudget > 0) {
            base += (budget.environmentEffect / Micro.MAX_ENVIRONMENT_EFFECT) * 15;
        }
        // 污染惩罚
        base -= census.pollutionAverage * 0.1;
        // 绿化率
        base += (census.greenRate || 30) * 0.1;
        // 科技创新
        if (budget.techInnovationMaintenanceBudget > 0) {
            base += (budget.techInnovationEffect / Micro.MAX_TECH_INNOVATION_EFFECT) * 10;
        }
        // 基尼系数高→不可持续
        base -= Math.max(0, (census.giniCoefficient || 0.35) - 0.35) * 40;
        // 政策修正
        base += (ordFx.pollutionMod || 0) * 0.2;
        return Math.max(0, Math.min(100, Math.round(base)));
    }

    // 科技创新指数 (0~100)
    computeTechInnovationIndex (census, budget, ordFx) {
        let base = 20;
        // 教育水平
        base += (census.educationLevel / Micro.EDUCATION_EFFECT_RANGE) * 20;
        // 科技投入
        if (budget.techInnovationMaintenanceBudget > 0) {
            base += (budget.techInnovationEffect / Micro.MAX_TECH_INNOVATION_EFFECT) * 25;
        }
        // 商业活力
        base += Math.min(census.comPop, 50) * 0.2;
        // 政策修正
        base += (ordFx.educationBonus || 0) * 0.3;
        return Math.max(0, Math.min(100, Math.round(base)));
    }

    // 社会保障覆盖率 (0~100%)
    computeSocialSecurityCoverage (census, budget) {
        if (census.totalPop === 0) return 100;
        if (budget.socialSecurityMaintenanceBudget === 0) return 40;
        return Math.round((budget.socialSecurityEffect / Micro.MAX_SOCIAL_SECURITY_EFFECT) * 100);
    }

    // 综合更新所有指标
    updateAllIndicators (census, budget, ordFx, indFx) {
        census.giniCoefficient = Math.round(this.computeGiniCoefficient(census, budget, ordFx, indFx) * 100) / 100;
        census.engelCoefficient = Math.round(this.computeEngelCoefficient(census, budget) * 100) / 100;
        census.greenRate = Math.round(this.computeGreenRate(census, budget, ordFx));
        census.livelihoodIndex = this.computeLivelihoodIndex(census, budget, ordFx);
        census.governanceIndex = this.computeGovernanceIndex(census, budget, ordFx);
        census.sustainabilityIndex = this.computeSustainabilityIndex(census, budget, ordFx);
        census.techInnovationIndex = this.computeTechInnovationIndex(census, budget, ordFx);
        census.socialSecurityCoverage = this.computeSocialSecurityCoverage(census, budget);
    }

}
