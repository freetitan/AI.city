/* 城市智能管理与公共政策模拟仿真系统 — 城市发展模式
 *
 * 管理者选择城市的发展定位和战略方向，深刻影响模拟仿真的
 * 各项指标表现——税收、污染、就业、民生、可持续性等。
 *
 * 发展模式互斥（同时仅一个生效），效果通过 getEffects() 返回，
 * 在 Simulation.js 中应用。
 */

import { Micro } from '../Micro.js';

export const SPECIALIZATION_DEFS = [
    {
        id: Micro.INDUSTRY_MIXED,
        name: '均衡发展',
        icon: '🏙️',
        description: '各产业协调并进，无额外加成也无负面效应，适合探索阶段。',
        effects: {
            resTaxMod: 0, comTaxMod: 0, indTaxMod: 0,
            pollutionMod: 0, unemployMod: 0, landValueMod: 0,
            educationMod: 0, healthMod: 0, parkBonus: 0,
            giniMod: 0, greenRateMod: 0, livelihoodMod: 0
        }
    },
    {
        id: Micro.INDUSTRY_TECH,
        name: '科技创新中心',
        icon: '💻',
        description: '高技能人才集聚，产业清洁高效。商工税收提升，污染降低，但基础设施成本高。',
        effects: {
            resTaxMod: 0, comTaxMod: 1, indTaxMod: 1,
            pollutionMod: -20, unemployMod: -15, landValueMod: 10,
            educationMod: 20, healthMod: 5, parkBonus: 0,
            giniMod: 2, greenRateMod: 0, livelihoodMod: 0
        }
    },
    {
        id: Micro.INDUSTRY_MANUFACTURING,
        name: '先进制造',
        icon: '🏭',
        description: '工业驱动增长，税收丰厚，但环境污染显著，健康风险上升。',
        effects: {
            resTaxMod: 0, comTaxMod: 0, indTaxMod: 2,
            pollutionMod: 35, unemployMod: -20, landValueMod: -10,
            educationMod: -10, healthMod: -15, parkBonus: 0,
            giniMod: 3, greenRateMod: -5, livelihoodMod: -5
        }
    },
    {
        id: Micro.INDUSTRY_TOURISM,
        name: '文旅服务',
        icon: '🌴',
        description: '服务业与文旅为主。商业税收强，公园价值高，但对治安要求严格。',
        effects: {
            resTaxMod: 0, comTaxMod: 2, indTaxMod: -1,
            pollutionMod: -10, unemployMod: 10, landValueMod: 15,
            educationMod: 5, healthMod: 10, parkBonus: 3,
            giniMod: 0, greenRateMod: 3, livelihoodMod: 5
        }
    },
    {
        id: Micro.INDUSTRY_FARMING,
        name: '现代农业',
        icon: '🌾',
        description: '绿色农业经济。低污染、就业稳定，但税收规模有限。',
        effects: {
            resTaxMod: 0, comTaxMod: -1, indTaxMod: -1,
            pollutionMod: -25, unemployMod: -10, landValueMod: 5,
            educationMod: 0, healthMod: 20, parkBonus: 2,
            giniMod: -2, greenRateMod: 5, livelihoodMod: 5
        }
    },
    {
        id: Micro.INDUSTRY_GREEN,
        name: '绿色生态',
        icon: '🌳',
        description: '以生态文明为核心，优先环境保护和低碳发展。污染极低、绿化率高，但经济增长较缓。',
        effects: {
            resTaxMod: -1, comTaxMod: -1, indTaxMod: -2,
            pollutionMod: -40, unemployMod: 5, landValueMod: 10,
            educationMod: 5, healthMod: 25, parkBonus: 4,
            giniMod: -3, greenRateMod: 10, livelihoodMod: 10
        }
    },
    {
        id: Micro.INDUSTRY_SMART,
        name: '智慧城市',
        icon: '🧠',
        description: '数字化治理先行，数据驱动决策。治理效能显著提升，但前期投入大。',
        effects: {
            resTaxMod: 0, comTaxMod: 1, indTaxMod: 0,
            pollutionMod: -5, unemployMod: -5, landValueMod: 5,
            educationMod: 15, healthMod: 5, parkBonus: 0,
            giniMod: 0, greenRateMod: 0, livelihoodMod: 5
        }
    },
    {
        id: Micro.INDUSTRY_WELFARE,
        name: '民生优先',
        icon: '❤️',
        description: '以人民幸福为核心目标。民生指数和健康水平大幅提升，但财政压力较大。',
        effects: {
            resTaxMod: 0, comTaxMod: -1, indTaxMod: -1,
            pollutionMod: -5, unemployMod: -5, landValueMod: 0,
            educationMod: 10, healthMod: 20, parkBonus: 2,
            giniMod: -8, greenRateMod: 2, livelihoodMod: 20
        }
    },
    {
        id: Micro.INDUSTRY_INNOVATION,
        name: '创新驱动',
        icon: '🚀',
        description: '聚焦科技研发和产业创新。教育与创新指数领先，但社会公平风险上升。',
        effects: {
            resTaxMod: 1, comTaxMod: 2, indTaxMod: 1,
            pollutionMod: -10, unemployMod: -10, landValueMod: 15,
            educationMod: 25, healthMod: 0, parkBonus: 0,
            giniMod: 5, greenRateMod: 0, livelihoodMod: -5
        }
    }
];

// Build a quick lookup map by id
const _defsById = {};
for (var _i = 0; _i < SPECIALIZATION_DEFS.length; _i++) {
    _defsById[ SPECIALIZATION_DEFS[_i].id ] = SPECIALIZATION_DEFS[_i];
}

export class IndustrySpecialization {

    constructor () {
        this._current = Micro.INDUSTRY_MIXED;
    }

    save (saveData) {
        saveData.industrySpecialization = this._current;
    }

    load (saveData) {
        if (saveData && saveData.industrySpecialization && _defsById[ saveData.industrySpecialization ]) {
            this._current = saveData.industrySpecialization;
        }
    }

    // Returns id of active specialization
    getCurrent () {
        return this._current;
    }

    // Set active specialization by id; returns true if valid
    setSpecialization (id) {
        if (_defsById[id]) {
            this._current = id;
            return true;
        }
        return false;
    }

    // Returns the effect object for the active specialization
    getEffects () {
        var def = _defsById[this._current] || _defsById[Micro.INDUSTRY_MIXED];
        return def.effects;
    }

    // Returns the full definition for the active specialization (name, icon, description, effects)
    getCurrentDef () {
        return _defsById[this._current] || _defsById[Micro.INDUSTRY_MIXED];
    }

    // Returns the full list of all specialization definitions (for UI rendering)
    getList () {
        return SPECIALIZATION_DEFS.map(function(def) {
            return {
                id:          def.id,
                name:        def.name,
                icon:        def.icon,
                description: def.description,
                active:      def.id === this._current
            };
        }, this);
    }

}
