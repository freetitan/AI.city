/*
 * 城市智能管理与公共政策模拟仿真系统 — 治理目标体系
 * 追踪管理者的治理成效和里程碑
 */

import { Micro } from '../Micro.js';

// 治理目标定义
const ACHIEVEMENTS = [
    // ═══ 城市规模 ═══
    { id: 'first_zone',      name: '城市奠基者',       desc: '城市开始有人口入驻',                   check: (s) => s.census.totalPop > 0 },
    { id: 'pop_500',         name: '社区雏形',         desc: '人口突破500人',                       check: (s) => s.evaluation.cityPop >= 500 },
    { id: 'pop_2000',        name: '建制镇',           desc: '人口突破2,000人',                     check: (s) => s.evaluation.cityPop >= 2000 },
    { id: 'pop_10000',       name: '设市',             desc: '人口突破10,000人',                    check: (s) => s.evaluation.cityPop >= 10000 },
    { id: 'pop_50000',       name: '中心城市',         desc: '人口突破50,000人',                    check: (s) => s.evaluation.cityPop >= 50000 },
    { id: 'pop_100000',      name: '大城市',           desc: '人口突破100,000人',                   check: (s) => s.evaluation.cityPop >= 100000 },
    { id: 'pop_500000',      name: '特大城市',         desc: '人口突破500,000人',                   check: (s) => s.evaluation.cityPop >= 500000 },

    // ═══ 经济财政 ═══
    { id: 'rich_100k',       name: '财力雄厚',         desc: '财政储备达到$100,000',                check: (s) => s.budget.totalFunds >= 100000 },
    { id: 'rich_1m',         name: '经济强市',         desc: '财政储备达到$1,000,000',              check: (s) => s.budget.totalFunds >= 1000000 },
    { id: 'debt_free',       name: '无债一身轻',       desc: '偿还全部市政债券',                    check: (s) => s.budget.bondDebt === 0 && s.census.totalPop > 500 },

    // ═══ 社会治理 ═══
    { id: 'low_crime',       name: '平安城市',         desc: '犯罪率平均值低于10',                   check: (s) => s.census.crimeAverage < 10 && s.census.totalPop > 100 },
    { id: 'high_approval',   name: '人民满意',         desc: '市民满意度达90%以上',                  check: (s) => s.evaluation.cityYes >= 90 },
    { id: 'high_score',      name: '卓越治理',         desc: '城市综合评分达900+',                   check: (s) => s.evaluation.cityScore >= 900 },
    { id: 'full_services',   name: '服务全覆盖',       desc: '公安、消防、医院均建成',               check: (s) => s.census.policeStationPop > 0 && s.census.fireStationPop > 0 && s.census.hospitalPop > 0 },
    { id: 'survive_disaster', name: '韧性城市',        desc: '成功应对一次重大灾害',                 check: null },

    // ═══ 教育卫生 ═══
    { id: 'high_education',  name: '教育强市',         desc: '教育水平达到150+',                    check: (s) => s.census.educationLevel >= 150 },
    { id: 'high_health',     name: '健康城市',         desc: '健康水平达到150+',                    check: (s) => s.census.healthLevel >= 150 },
    { id: 'hospital_built',  name: '医者仁心',         desc: '建成医院',                            check: (s) => s.census.hospitalPop > 0 },
    { id: 'school_built',    name: '教育兴邦',         desc: '建成学校或社区中心',                   check: (s) => s.census.churchPop > 0 },

    // ═══ 政策仿真新增 ═══
    { id: 'happy_city',      name: '幸福城市',         desc: '幸福指数达到85+',                     check: (s) => s.census.happinessLevel >= 85 },
    { id: 'low_gini',        name: '公平社会',         desc: '基尼系数控制在0.30以下',              check: (s) => s.census.giniCoefficient < 0.30 && s.census.totalPop > 100 },
    { id: 'high_green',      name: '绿色城市',         desc: '绿化率达到60%以上',                   check: (s) => (s.census.greenRate || 0) >= 60 },
    { id: 'high_livelihood', name: '民生示范',         desc: '民生综合指数达到80+',                 check: (s) => (s.census.livelihoodIndex || 0) >= 80 },
    { id: 'high_governance', name: '善治典范',         desc: '治理效能指数达到80+',                 check: (s) => (s.census.governanceIndex || 0) >= 80 },
    { id: 'high_sustain',    name: '可持续发展',       desc: '可持续发展指数达到80+',               check: (s) => (s.census.sustainabilityIndex || 0) >= 80 },
    { id: 'high_tech',       name: '创新之都',         desc: '科技创新指数达到70+',                 check: (s) => (s.census.techInnovationIndex || 0) >= 70 },
    { id: 'no_pollution',    name: '生态宜居',         desc: '污染平均值控制在15以下',              check: (s) => s.census.pollutionAverage < 15 && s.census.totalPop > 100 },
    { id: 'no_fire',         name: '消防安全',         desc: '消防体系完善且全年无火灾',            check: (s) => s.census.firePop === 0 && s.census.fireStationPop > 0 && s.census.totalPop > 1000 },
    { id: 'park_builder',    name: '园林城市',         desc: '建设20处以上公园绿地',                check: (s) => (s.census.parkCount || 0) >= 20 },
    { id: 'ss_coverage',     name: '保障兜底',         desc: '社会保障覆盖率达到80%以上',           check: (s) => (s.census.socialSecurityCoverage || 0) >= 80 },
    { id: 'nuclear_power',   name: '核能时代',         desc: '建成核电站',                          check: (s) => s.census.nuclearPowerPop > 0 },
    { id: 'airport_built',   name: '航空枢纽',         desc: '建成机场',                            check: (s) => s.census.airportPop > 0 },
    { id: 'seaport_built',   name: '港口物流',         desc: '建成港口',                            check: (s) => s.census.seaportPop > 0 },
    { id: 'stadium_built',   name: '全民健身',         desc: '建成体育场馆',                        check: (s) => s.census.stadiumPop > 0 },
    { id: 'year_2000',       name: '千禧之年',         desc: '进入2000年',                          check: (s) => { let yr = Math.floor(s.cityTime / 48) + s.startingYear; return yr >= 2000; } },
];

export class Achievements {

    constructor () {
        this.unlocked = {};
        this.recentUnlock = null;
        this.totalUnlocked = 0;
    }

    save (saveData) {
        saveData.achievements = this.unlocked;
    }

    load (saveData) {
        if (saveData.achievements) {
            this.unlocked = saveData.achievements;
            this.totalUnlocked = Object.keys(this.unlocked).length;
        }
    }

    // Check all achievements against current simulation state
    checkAll (simData) {
        let newUnlocks = [];

        for (let i = 0; i < ACHIEVEMENTS.length; i++) {
            let ach = ACHIEVEMENTS[i];
            if (this.unlocked[ach.id]) continue;
            if (ach.check === null) continue;

            if (ach.check(simData)) {
                this.unlock(ach.id);
                newUnlocks.push(ach);
            }
        }

        return newUnlocks;
    }

    // Manually trigger an achievement
    trigger (id) {
        if (this.unlocked[id]) return null;
        this.unlock(id);
        let ach = ACHIEVEMENTS.find(a => a.id === id);
        return ach || null;
    }

    unlock (id) {
        if (this.unlocked[id]) return;
        this.unlocked[id] = true;
        this.totalUnlocked++;
        this.recentUnlock = id;
    }

    getRecentUnlock () {
        if (!this.recentUnlock) return null;
        let ach = ACHIEVEMENTS.find(a => a.id === this.recentUnlock);
        this.recentUnlock = null;
        return ach;
    }

    getAll () {
        return ACHIEVEMENTS.map(ach => ({
            ...ach,
            unlocked: !!this.unlocked[ach.id],
            check: undefined
        }));
    }

    getProgress () {
        return { unlocked: this.totalUnlocked, total: ACHIEVEMENTS.length };
    }
}
