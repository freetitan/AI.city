/* micropolisJS. Adapted by Graeme McCutcheon from Micropolis.
 *
 * This code is released under the GNU GPL v3, with some additional terms.
 * Please see the files LICENSE and COPYING for details. Alternatively,
 * consult http://micropolisjs.graemcc.co.uk/LICENSE and
 * http://micropolisjs.graemcc.co.uk/COPYING
 *
 * 城市智能管理与公共政策模拟仿真系统 — 中文本地化
 */

import { Micro } from './Micro.js';
import { Messages } from './Messages.js';

const Text = function(){
    // TODO Some kind of rudimentary L20N based on navigator.language?

    // 查询工具字符串
    var densityStrings = ['低密度', '中密度', '高密度', '极高密度'];
    var landValueStrings = ['棚户区', '老旧社区', '普通社区', '高档社区'];
    var crimeStrings = ['安全', '轻度犯罪', '中度犯罪', '高犯罪率'];
    var pollutionStrings = ['无污染', '轻度污染', '中度污染', '重度污染'];
    var rateStrings = ['衰退', '平稳', '缓慢增长', '快速增长'];
    var zoneTypes = ['空地', '水域', '林地', '废墟', '洪涝', '核污染',
                   '火灾', '道路', '供电', '铁路', '住宅区', '商业区',
                   '工业区', '港口', '机场', '火电站', '消防站',
                   '派出所', '体育场馆', '核电站', '桥梁',
                   '雷达站', '喷泉', '工业区', '钢铁厂',
                   '桥梁', '铀矿'];

    // 评估窗口
    var gameLevel = {};
    gameLevel['' + Micro.LEVEL_EASY] = '初级';
    gameLevel['' + Micro.LEVEL_MED] = '中级';
    gameLevel['' + Micro.LEVEL_HARD] = '高级';

    var cityClass = {};
    cityClass[Micro.CC_VILLAGE] = '村庄';
    cityClass[Micro.CC_TOWN] = '小镇';
    cityClass[Micro.CC_CITY] = '城市';
    cityClass[Micro.CC_CAPITAL] = '中心城市';
    cityClass[Micro.CC_METROPOLIS] = '大都市';
    cityClass[Micro.CC_MEGALOPOLIS] = '特大城市';

    var problems = {};
    problems[Micro.CRIME] = '治安问题';
    problems[Micro.POLLUTION] = '环境污染';
    problems[Micro.HOUSING] = '住房困难';
    problems[Micro.TAXES] = '税负过重';
    problems[Micro.TRAFFIC] = '交通拥堵';
    problems[Micro.UNEMPLOYMENT] = '就业不足';
    problems[Micro.FIRE] = '火灾隐患';
    problems[Micro.INEQUALITY] = '贫富差距';
    problems[Micro.PUBLIC_HEALTH] = '公共卫生';
    problems[Micro.ENVIRONMENT] = '生态退化';
    problems[Micro.GOVERNANCE] = '治理低效';
    problems[Micro.LIVELIHOOD] = '民生短板';
    problems[Micro.SUSTAINABILITY] = '发展不可持续';

    // 月份
    var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

    // 工具字符串
    var toolMessages = {
        noMoney: '财政资金不足，无法实施',
        needsDoze: '该区域需先进行拆迁清场'
    };

    // 消息字符串 — 中性提示
    var neutralMessages = {};
    neutralMessages[Messages.FIRE_STATION_NEEDS_FUNDING] = '消防经费不足，应急能力下降';
    neutralMessages[Messages.NEED_AIRPORT] = '商业发展需要建设航空港';
    neutralMessages[Messages.NEED_FIRE_STATION] = '市民要求增设消防站';
    neutralMessages[Messages.NEED_HOSPITAL] = '市民要求建设医院';
    neutralMessages[Messages.NEED_ELECTRICITY] = '请建设发电设施';
    neutralMessages[Messages.NEED_MORE_INDUSTRIAL] = '工业用地供给不足';
    neutralMessages[Messages.NEED_MORE_COMMERCIAL] = '商业用地供给不足';
    neutralMessages[Messages.NEED_MORE_RESIDENTIAL] = '住宅用地供给不足';
    neutralMessages[Messages.NEED_MORE_RAILS] = '轨道交通网络不完善';
    neutralMessages[Messages.NEED_MORE_ROADS] = '道路网络容量不足';
    neutralMessages[Messages.NEED_POLICE_STATION] = '市民要求增设派出所';
    neutralMessages[Messages.NEED_SEAPORT] = '工业发展需要建设港口';
    neutralMessages[Messages.NEED_STADIUM] = '居民要求建设体育场馆';
    neutralMessages[Messages.ROAD_NEEDS_FUNDING] = '道路维护经费不足，路况恶化';
    neutralMessages[Messages.POLICE_NEEDS_FUNDING] = '公安经费不足，治安防控下降';
    neutralMessages[Messages.WELCOME] = '欢迎使用城市智能管理与政策仿真系统';
    neutralMessages[Messages.WELCOMEBACK] = '欢迎回到城市智能管理系统';
    neutralMessages[Messages.SEASON_CHANGED] = '季节更替，请注意政策调整';
    neutralMessages[Messages.NEED_SCHOOLS] = '市民要求增设学校';
    neutralMessages[Messages.BOND_PAYMENT_DUE] = '年度债券利息已扣除';
    neutralMessages[Messages.BOND_ISSUED] = '市政债券发行成功';
    neutralMessages[Messages.NEED_SOCIAL_SECURITY] = '社会保障投入不足，民生指数下降';
    neutralMessages[Messages.NEED_ENVIRONMENT_PROTECTION] = '环保投入不足，生态指标恶化';
    neutralMessages[Messages.NEED_TECH_INNOVATION] = '科技创新投入不足，竞争力下降';
    neutralMessages[Messages.POLICY_SYNERGY_BONUS] = '政策协同效应显现，综合效益提升';
    neutralMessages[Messages.POLICY_CONFLICT_WARNING] = '政策存在冲突，效果相互抵消';
    neutralMessages[Messages.GINI_HIGH] = '基尼系数过高，社会公平性堪忧';
    neutralMessages[Messages.GREEN_RATE_LOW] = '城市绿化率偏低，人居环境待改善';
    neutralMessages[Messages.LIVELIHOOD_INDEX_LOW] = '民生综合指数偏低，需加强保障';

    // 坏消息
    var badMessages = {};
    badMessages[Messages.BLACKOUTS_REPORTED] = '供电不足，出现大范围停电';
    badMessages[Messages.COPTER_CRASHED] = '直升机坠毁事故';
    badMessages[Messages.EARTHQUAKE] = '重大地震灾害报告！！';
    badMessages[Messages.EXPLOSION_REPORTED] = '爆炸事故报告';
    badMessages[Messages.FLOODING_REPORTED] = '洪涝灾害报告！';
    badMessages[Messages.FIRE_REPORTED] = '火灾报告';
    badMessages[Messages.HEAVY_TRAFFIC] = '城市交通严重拥堵';
    badMessages[Messages.HIGH_CRIME] = '犯罪率居高不下';
    badMessages[Messages.HIGH_POLLUTION] = '环境污染严重超标';
    badMessages[Messages.MONSTER_SIGHTED] = '重大突发事件！';
    badMessages[Messages.NO_MONEY] = '城市财政已破产';
    badMessages[Messages.NOT_ENOUGH_POWER] = '电力供应严重不足，大面积限电';
    badMessages[Messages.NUCLEAR_MELTDOWN] = '核电站发生熔毁事故！！';
    badMessages[Messages.PLANE_CRASHED] = '飞机失事';
    badMessages[Messages.SHIP_CRASHED] = '船舶事故报告';
    badMessages[Messages.TAX_TOO_HIGH] = '税负过高，企业和居民不满';
    badMessages[Messages.TORNADO_SIGHTED] = '龙卷风预警！';
    badMessages[Messages.TRAFFIC_JAMS] = '城市交通持续拥堵';
    badMessages[Messages.TRAIN_CRASHED] = '列车事故报告';
    badMessages[Messages.HEAT_WAVE] = '高温预警！火灾风险升高';
    badMessages[Messages.BLIZZARD] = '暴风雪！道路加速损坏';
    badMessages[Messages.LOW_EDUCATION] = '教育水平严重不足，人才流失加剧';
    badMessages[Messages.BOND_HIGH_DEBT] = '警告：市政债务负担过重';

    // 好消息
    var goodMessages = {};
    goodMessages[Messages.REACHED_CAPITAL] = '城市人口突破5万，晋升中心城市';
    goodMessages[Messages.REACHED_CITY] = '城市人口突破1万，正式建市';
    goodMessages[Messages.REACHED_MEGALOPOLIS] = '城市人口突破50万，成为特大城市';
    goodMessages[Messages.REACHED_METROPOLIS] = '城市人口突破10万，成为大都市';
    goodMessages[Messages.REACHED_TOWN] = '人口突破2千，升级为小镇';
    goodMessages[Messages.ACHIEVEMENT_UNLOCKED] = '治理目标达成！';

    var seasons = ['春季', '夏季', '秋季', '冬季'];

    var educationStrings = ['缺失', '薄弱', '基础', '良好', '优秀'];
    var healthStrings = ['危急', '较差', '一般', '良好', '优秀'];
    var happinessStrings = ['困苦', '不满', '尚可', '幸福', '繁荣'];

    // 城市运行态势等级
    var governanceStrings = ['失控', '紊乱', '一般', '良好', '高效'];
    var sustainabilityStrings = ['不可持续', '高风险', '一般', '较可持续', '高度可持续'];
    var livelihoodStrings = ['极差', '不足', '基本', '良好', '优质'];

    return {
        badMessages: badMessages,
        cityClass: cityClass,
        crimeStrings: crimeStrings,
        densityStrings: densityStrings,
        educationStrings: educationStrings,
        gameLevel: gameLevel,
        goodMessages: goodMessages,
        happinessStrings: happinessStrings,
        healthStrings: healthStrings,
        landValueStrings: landValueStrings,
        months: months,
        neutralMessages: neutralMessages,
        problems: problems,
        pollutionStrings: pollutionStrings,
        rateStrings: rateStrings,
        seasons: seasons,
        toolMessages: toolMessages,
        zoneTypes: zoneTypes,
        governanceStrings: governanceStrings,
        sustainabilityStrings: sustainabilityStrings,
        livelihoodStrings: livelihoodStrings
    }

};

export const TXT = new Text();
