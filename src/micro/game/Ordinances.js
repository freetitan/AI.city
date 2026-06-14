/* 城市智能管理与公共政策模拟仿真系统 — 公共政策模块
 *
 * 一组可由管理者（玩家）制定/撤销的城市公共政策。
 * 每项政策有年度财政成本，以及持续生效期间对模拟仿真的影响因子。
 *
 * 政策按领域分类：民生保障、环境保护、经济产业、城市治理、社会公平
 *
 * 效果以增量形式表达，由 Simulation.updateEducationHealth() 和
 * Simulation.simulate() 通过 this.ordinances.getEffects() 获取并应用。
 */

// 政策领域分类
export const POLICY_CATEGORIES = [
    { id: 'livelihood',  name: '民生保障', icon: '🏥' },
    { id: 'environment', name: '环境保护', icon: '🌿' },
    { id: 'economy',     name: '经济产业', icon: '📈' },
    { id: 'governance',  name: '城市治理', icon: '⚖️' },
    { id: 'equity',      name: '社会公平', icon: '🤝' }
];

export const ORDINANCE_DEFS = [
    // ═══════════════════ 民生保障 ═══════════════════
    {
        id: 'FREE_CLINICS',
        name: '免费诊所计划',
        category: 'livelihood',
        description: '资助公共医疗诊所，提升市民健康水平，降低因病致贫风险。',
        annualCost: 200,
        effects: { healthBonus: 20, pollutionMod: 0, educationBonus: 0, trafficMod: 0, comTaxMod: 0, crimeMod: 0, giniMod: -3, greenRateMod: 0, livelihoodMod: 10 }
    },
    {
        id: 'HOUSING_SUBSIDY',
        name: '住房保障补贴',
        category: 'livelihood',
        description: '为中低收入家庭提供住房补贴，改善居住条件，降低贫富差距。',
        annualCost: 350,
        effects: { healthBonus: 5, pollutionMod: 0, educationBonus: 0, trafficMod: 0, comTaxMod: 0, crimeMod: -5, giniMod: -8, greenRateMod: 0, livelihoodMod: 15 }
    },
    {
        id: 'ELDERLY_CARE',
        name: '社区养老服务体系',
        category: 'livelihood',
        description: '建设社区养老服务中心，提供居家养老服务，提升老年群体幸福感。',
        annualCost: 280,
        effects: { healthBonus: 15, pollutionMod: 0, educationBonus: 0, trafficMod: 0, comTaxMod: 0, crimeMod: 0, giniMod: -2, greenRateMod: 0, livelihoodMod: 12 }
    },
    {
        id: 'FOOD_SAFETY',
        name: '食品安全监管强化',
        category: 'livelihood',
        description: '加强食品安全抽检和执法力度，保障市民饮食安全。',
        annualCost: 120,
        effects: { healthBonus: 10, pollutionMod: 0, educationBonus: 0, trafficMod: 0, comTaxMod: 0, crimeMod: -3, giniMod: 0, greenRateMod: 0, livelihoodMod: 8 }
    },

    // ═══════════════════ 环境保护 ═══════════════════
    {
        id: 'RECYCLING_PROGRAM',
        name: '垃圾分类回收制度',
        category: 'environment',
        description: '强制垃圾分类回收，减少城市污染排放，推动循环经济。',
        annualCost: 150,
        effects: { healthBonus: 5, pollutionMod: -15, educationBonus: 0, trafficMod: 0, comTaxMod: 0, crimeMod: 0, giniMod: 0, greenRateMod: 5, livelihoodMod: 0 }
    },
    {
        id: 'GREEN_BUILDING_CODE',
        name: '绿色建筑标准',
        category: 'environment',
        description: '强制新建建筑达到节能标准，减少城市碳排放，改善公共健康。',
        annualCost: 180,
        effects: { healthBonus: 10, pollutionMod: -20, educationBonus: 5, trafficMod: 0, comTaxMod: 0, crimeMod: 0, giniMod: 0, greenRateMod: 8, livelihoodMod: 0 }
    },
    {
        id: 'RIVER_REMEDIATION',
        name: '水系综合治理工程',
        category: 'environment',
        description: '投资河道清淤和湿地修复，改善水环境质量和城市景观。',
        annualCost: 400,
        effects: { healthBonus: 8, pollutionMod: -25, educationBonus: 0, trafficMod: 0, comTaxMod: 0, crimeMod: 0, giniMod: 0, greenRateMod: 12, livelihoodMod: 5 }
    },
    {
        id: 'AIR_QUALITY_MONITOR',
        name: '空气质量监测网络',
        category: 'environment',
        description: '建设大气监测站点，实时发布空气质量预警，倒逼污染治理。',
        annualCost: 100,
        effects: { healthBonus: 8, pollutionMod: -10, educationBonus: 0, trafficMod: 0, comTaxMod: 0, crimeMod: 0, giniMod: 0, greenRateMod: 3, livelihoodMod: 3 }
    },

    // ═══════════════════ 经济产业 ═══════════════════
    {
        id: 'SMALL_BIZ_INCENTIVE',
        name: '小微企业扶持政策',
        category: 'economy',
        description: '为小微企业提供税收减免，激发市场活力，但短期减少商业税收。',
        annualCost: 0,
        effects: { healthBonus: 0, pollutionMod: 0, educationBonus: 0, trafficMod: 0, comTaxMod: -0.10, crimeMod: 0, giniMod: -2, greenRateMod: 0, livelihoodMod: 0 }
    },
    {
        id: 'PUBLIC_TRANSIT_SUBSIDY',
        name: '公共交通补贴',
        category: 'economy',
        description: '补贴公交与轨道交通运营，降低出行成本，缓解道路拥堵。',
        annualCost: 250,
        effects: { healthBonus: 5, pollutionMod: -8, educationBonus: 0, trafficMod: -10, comTaxMod: 0, crimeMod: 0, giniMod: -2, greenRateMod: 2, livelihoodMod: 5 }
    },
    {
        id: 'TECH_INCUBATOR',
        name: '科技企业孵化器',
        category: 'economy',
        description: '建设科技企业孵化基地，培育高新技术企业，提升创新能力。',
        annualCost: 300,
        effects: { healthBonus: 0, pollutionMod: -5, educationBonus: 15, trafficMod: 0, comTaxMod: 0.05, crimeMod: 0, giniMod: 0, greenRateMod: 0, livelihoodMod: 0 }
    },
    {
        id: 'INDUSTRY_UPGRADE',
        name: '产业转型升级引导',
        category: 'economy',
        description: '引导传统产业技术改造，淘汰落后产能，降低污染提升效益。',
        annualCost: 350,
        effects: { healthBonus: 5, pollutionMod: -18, educationBonus: 5, trafficMod: 0, comTaxMod: 0.08, crimeMod: 0, giniMod: 0, greenRateMod: 3, livelihoodMod: 0 }
    },

    // ═══════════════════ 城市治理 ═══════════════════
    {
        id: 'SPEED_CAMERAS',
        name: '智能交通监控网络',
        category: 'governance',
        description: '部署智能交通监控设备，降低事故率，提升治安管控效能。',
        annualCost: 100,
        effects: { healthBonus: 5, pollutionMod: 0, educationBonus: 0, trafficMod: -5, comTaxMod: 0, crimeMod: -15, giniMod: 0, greenRateMod: 0, livelihoodMod: 0 }
    },
    {
        id: 'NOISE_ORDINANCE',
        name: '噪声管控条例',
        category: 'governance',
        description: '限制施工和商业噪声排放，改善居住环境质量。',
        annualCost: 0,
        effects: { healthBonus: 3, pollutionMod: -5, educationBonus: 0, trafficMod: 0, comTaxMod: 0, crimeMod: 0, giniMod: 0, greenRateMod: 0, livelihoodMod: 3 }
    },
    {
        id: 'SMART_CITY_PLATFORM',
        name: '智慧城市综合平台',
        category: 'governance',
        description: '建设城市大数据平台，实现跨部门数据共享与智能决策支持。',
        annualCost: 400,
        effects: { healthBonus: 5, pollutionMod: -5, educationBonus: 10, trafficMod: -8, comTaxMod: 0.03, crimeMod: -10, giniMod: 0, greenRateMod: 0, livelihoodMod: 5 }
    },
    {
        id: 'EMERGENCY_RESPONSE',
        name: '应急管理体系建设',
        category: 'governance',
        description: '完善城市应急预案和救援体系，提升灾害应对和快速恢复能力。',
        annualCost: 200,
        effects: { healthBonus: 10, pollutionMod: 0, educationBonus: 0, trafficMod: 0, comTaxMod: 0, crimeMod: -5, giniMod: 0, greenRateMod: 0, livelihoodMod: 8 }
    },

    // ═══════════════════ 社会公平 ═══════════════════
    {
        id: 'EDUCATION_SUBSIDIES',
        name: '教育均衡化政策',
        category: 'equity',
        description: '加大对薄弱学校的投入，缩小教育资源差距，促进社会流动。',
        annualCost: 300,
        effects: { healthBonus: 0, pollutionMod: 0, educationBonus: 25, trafficMod: 0, comTaxMod: 0, crimeMod: -5, giniMod: -5, greenRateMod: 0, livelihoodMod: 5 }
    },
    {
        id: 'MINIMUM_WAGE',
        name: '最低工资保障制度',
        category: 'equity',
        description: '设定并提高最低工资标准，保障劳动者基本收入，缩小收入差距。',
        annualCost: 0,
        effects: { healthBonus: 5, pollutionMod: 0, educationBonus: 0, trafficMod: 0, comTaxMod: -0.05, crimeMod: -8, giniMod: -6, greenRateMod: 0, livelihoodMod: 10 }
    },
    {
        id: 'URBAN_RENEWAL',
        name: '城市更新与棚改',
        category: 'equity',
        description: '推进棚户区改造和老旧小区更新，改善低收入群体居住条件。',
        annualCost: 500,
        effects: { healthBonus: 10, pollutionMod: -10, educationBonus: 0, trafficMod: -3, comTaxMod: 0, crimeMod: -10, giniMod: -10, greenRateMod: 5, livelihoodMod: 15 }
    },
    {
        id: 'DISABLED_SUPPORT',
        name: '无障碍环境建设',
        category: 'equity',
        description: '推进城市无障碍设施建设，保障残障人士平等参与社会生活。',
        annualCost: 150,
        effects: { healthBonus: 5, pollutionMod: 0, educationBonus: 5, trafficMod: 0, comTaxMod: 0, crimeMod: 0, giniMod: -3, greenRateMod: 2, livelihoodMod: 8 }
    }
];

export class Ordinances {

    constructor () {
        // Map from ordinance id → boolean (active or not)
        this._active = {};
        for (var i = 0; i < ORDINANCE_DEFS.length; i++) {
            this._active[ ORDINANCE_DEFS[i].id ] = false;
        }
    }

    save (saveData) {
        saveData.ordinances = Object.assign({}, this._active);
    }

    load (saveData) {
        if (saveData && saveData.ordinances) {
            var ids = Object.keys(saveData.ordinances);
            for (var i = 0; i < ids.length; i++) {
                if (this._active.hasOwnProperty(ids[i])) {
                    this._active[ ids[i] ] = !!saveData.ordinances[ ids[i] ];
                }
            }
        }
    }

    toggle (id) {
        if (this._active.hasOwnProperty(id)) {
            this._active[id] = !this._active[id];
            return this._active[id];
        }
        return false;
    }

    isActive (id) {
        return !!this._active[id];
    }

    // Returns combined effect object for all active ordinances
    getEffects () {
        var combined = {
            healthBonus:    0,
            pollutionMod:   0,
            educationBonus: 0,
            trafficMod:     0,
            comTaxMod:      0,
            crimeMod:       0,
            giniMod:        0,
            greenRateMod:   0,
            livelihoodMod:  0
        };
        for (var i = 0; i < ORDINANCE_DEFS.length; i++) {
            var def = ORDINANCE_DEFS[i];
            if (!this._active[def.id]) continue;
            var fx = def.effects;
            combined.healthBonus    += fx.healthBonus    || 0;
            combined.pollutionMod   += fx.pollutionMod   || 0;
            combined.educationBonus += fx.educationBonus || 0;
            combined.trafficMod     += fx.trafficMod     || 0;
            combined.comTaxMod      += fx.comTaxMod      || 0;
            combined.crimeMod       += fx.crimeMod       || 0;
            combined.giniMod        += fx.giniMod        || 0;
            combined.greenRateMod   += fx.greenRateMod   || 0;
            combined.livelihoodMod  += fx.livelihoodMod  || 0;
        }
        return combined;
    }

    // Annual cost (deducted from budget each year)
    getAnnualCost () {
        var total = 0;
        for (var i = 0; i < ORDINANCE_DEFS.length; i++) {
            if (this._active[ ORDINANCE_DEFS[i].id ]) {
                total += ORDINANCE_DEFS[i].annualCost;
            }
        }
        return total;
    }

    // Serialisable list of ordinances with their current state (for the UI)
    getList () {
        return ORDINANCE_DEFS.map(function(def) {
            return {
                id:          def.id,
                name:        def.name,
                category:    def.category,
                description: def.description,
                annualCost:  def.annualCost,
                active:      !!this._active[def.id]
            };
        }, this);
    }

    // 检测政策协同与冲突
    getPolicyInteractions () {
        let synergyCount = 0;
        let conflictCount = 0;

        // 协同：绿色建筑 + 垃圾回收 = 额外环保效果
        if (this._active['GREEN_BUILDING_CODE'] && this._active['RECYCLING_PROGRAM']) synergyCount++;
        // 协同：教育均衡 + 免费诊所 = 民生改善
        if (this._active['EDUCATION_SUBSIDIES'] && this._active['FREE_CLINICS']) synergyCount++;
        // 协同：智慧城市 + 智能交通 = 治理增效
        if (this._active['SMART_CITY_PLATFORM'] && this._active['SPEED_CAMERAS']) synergyCount++;
        // 协同：产业升级 + 科技孵化 = 创新驱动
        if (this._active['INDUSTRY_UPGRADE'] && this._active['TECH_INCUBATOR']) synergyCount++;
        // 协同：住房保障 + 城市更新 = 居住改善
        if (this._active['HOUSING_SUBSIDY'] && this._active['URBAN_RENEWAL']) synergyCount++;

        // 冲突：小微企业减税 + 最低工资保障 = 财政压力
        if (this._active['SMALL_BIZ_INCENTIVE'] && this._active['MINIMUM_WAGE']) conflictCount++;
        // 冲突：产业升级（减产） + 制造业专精 = 产业矛盾
        if (this._active['INDUSTRY_UPGRADE']) conflictCount += 0; // handled elsewhere

        return { synergy: synergyCount, conflict: conflictCount };
    }

}
