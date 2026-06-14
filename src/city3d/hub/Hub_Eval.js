import { Hub_Pannel } from './Hub_Pannel.js';
import { AppState } from '../../AppState.js'

export class Hub_Eval extends Hub_Pannel {

	constructor( hub, isRight  ) {

		super( hub, '评估', isRight  );
        this.updateFunction = AppState.main.getEval
        this.happiness = 50;

	}

	_getLevelString  (value, maxValue, strings) {
        var idx = Math.floor((value / maxValue) * (strings.length - 1));
        idx = Math.max(0, Math.min(idx, strings.length - 1));
        var colors = ['#e05555', '#e07744', '#f0b84a', '#8bcc5a', '#4bcc7a'];
        return '<span style="color:' + colors[idx] + ';">' + strings[idx] + '</span>';
    }

    _getIndexColor (value) {
        if (value >= 80) return '#4bcc7a';
        if (value >= 60) return '#8bcc5a';
        if (value >= 40) return '#f0b84a';
        if (value >= 20) return '#e07744';
        return '#e05555';
    }

    _getPercentColor (value, invert) {
        // invert: true means lower is better (e.g. Gini)
        if (invert) {
            if (value <= 0.25) return '#4bcc7a';
            if (value <= 0.35) return '#8bcc5a';
            if (value <= 0.45) return '#f0b84a';
            return '#e05555';
        }
        if (value >= 80) return '#4bcc7a';
        if (value >= 60) return '#8bcc5a';
        if (value >= 40) return '#f0b84a';
        if (value >= 20) return '#e07744';
        return '#e05555';
    }

	update( data ) {

        
        this.happiness = data[7] || 50;


		if(this.state === 'none') return;
        if(this.state === 'close') return;

		this.evaltYes.innerHTML = '满意: ' + data[0] + '%';
        this.evaltNo.innerHTML  = '不满意: ' + (100 - data[0]) + '%';

        var lblStyle = 'display:inline-block; width:110px; color:rgba(180,210,240,1); text-align:left; ';
        var titleStyle = 'display:inline-block; width:100%; font-size:10px; letter-spacing:0.08em; color:rgba(180,210,240,0.6);'
        +'text-align:center; font-weight:bold; border-top:1px solid rgba(100,160,220,0.22); margin-top:8px;';

        this.evaltProb.innerHTML = '<span style="' + titleStyle + '">突出问题</span><br>' + data[1];

        this.evaltStats.innerHTML = '<span style="' + titleStyle + '">基础指标</span><br>'
            + '<span style="' + lblStyle + '">🚨 犯罪率:</span>' + data[2] + '<br>'
            + '<span style="' + lblStyle + '">💨 污染:</span>' + data[3] + '<br>'
            + '<span style="' + lblStyle + '">🚗 交通:</span>'   + data[4] + '<br>';

        // Extended statistics
        let eduLevel = data[5] || 0;
        let healthLevel = data[6] || 0;
        let unemployment = data[8] || 0;
        let season = data[9] || 'Spring';
        let policeCoverage = data[10] !== undefined ? data[10] : 0;
        let fireCoverage   = data[11] !== undefined ? data[11] : 0;
        let parkCount      = data[12] !== undefined ? data[12] : 0;
        let waterCoverage  = data[13] !== undefined ? data[13] : 100;
        let indDef         = data[14] || null;
        let hospitalCount  = data[15] !== undefined ? data[15] : 0;
        let schoolCount    = data[16] !== undefined ? data[16] : 0;
        let eduCoverage    = data[17] !== undefined ? data[17] : 100;

        // 政策仿真新增数据
        let giniCoef       = data[18] !== undefined ? data[18] : 0.35;
        let engelCoef      = data[19] !== undefined ? data[19] : 0.40;
        let greenRate      = data[20] !== undefined ? data[20] : 30;
        let livelihoodIdx  = data[21] !== undefined ? data[21] : 50;
        let governanceIdx  = data[22] !== undefined ? data[22] : 50;
        let sustainIdx     = data[23] !== undefined ? data[23] : 50;
        let techIdx        = data[24] !== undefined ? data[24] : 20;
        let ssCoverage     = data[25] !== undefined ? data[25] : 40;
        let ssFundRate     = data[26] !== undefined ? data[26] : 100;
        let envFundRate    = data[27] !== undefined ? data[27] : 100;
        let techFundRate   = data[28] !== undefined ? data[28] : 100;
        let synergyCount   = data[29] !== undefined ? data[29] : 0;
        let conflictCount  = data[30] !== undefined ? data[30] : 0;

        let happyColor = this.happiness >= 70 ? '#4bcc7a' : this.happiness >= 40 ? '#f0b84a' : '#e05555';
        let eduStr = this._getLevelString(eduLevel, 200, ['缺失', '薄弱', '基础', '良好', '优秀']);
        let healthStr = this._getLevelString(healthLevel, 200, ['危急', '较差', '一般', '良好', '优秀']);
        let indStr = indDef ? (indDef.icon + ' ' + indDef.name) : '🏙️ 均衡发展';

        this.evaltExtended.innerHTML = '<span style="' + titleStyle + '">居民福祉</span><br>'
            + '<span style="' + lblStyle + '">👨‍🎓 教育水平:</span>' + eduStr + '<br>'
            + '<span style="' + lblStyle + '">❤️ 健康水平:</span>' + healthStr + '<br>'
            + '<span style="' + lblStyle + '">😵 失业率:</span>' + unemployment + '%<br>'
            + '<span style="' + lblStyle + '">😊 幸福指数:</span><span style="color:' + happyColor + '; font-weight:bold;">' + this.happiness + '%</span><br>'
            
            + '<span style="' + titleStyle + '">公共服务覆盖</span><br>'
            + '<span style="' + lblStyle + '">🚓 警力覆盖:</span><span style="color:' + this._getPercentColor(policeCoverage) + ';">' + policeCoverage + '%</span><br>'
            + '<span style="' + lblStyle + '">🚒 消防覆盖:</span><span style="color:' + this._getPercentColor(fireCoverage) + ';">' + fireCoverage + '%</span><br>'
            + '<span style="' + lblStyle + '">💧 供水覆盖:</span><span style="color:' + this._getPercentColor(waterCoverage) + ';">' + waterCoverage + '%</span><br>'
            + '<span style="' + lblStyle + '">🏥 医院:</span><span style="color:' + (hospitalCount > 0 ? '#4bcc7a' : 'rgba(180,210,240,0.5)') + ';">' + hospitalCount + '</span><br>'
            + '<span style="' + lblStyle + '">🏫 学校:</span><span style="color:' + (schoolCount > 0 ? '#4bcc7a' : 'rgba(180,210,240,0.5)') + ';">' + schoolCount + '</span><br>'
            + '<span style="' + lblStyle + '">🌳 绿化率:</span><span style="color:' + this._getPercentColor(greenRate) + ';">' + greenRate + '%</span><br>'

            + '<span style="' + titleStyle + '">政策仿真指标</span><br>'
            + '<span style="' + lblStyle + '">📊 基尼系数:</span><span style="color:' + this._getPercentColor(giniCoef, true) + '; font-weight:600;">' + (giniCoef || 0.35).toFixed(2) + '</span><br>'
            + '<span style="' + lblStyle + '">🍽️ 恩格尔系数:</span><span style="color:' + this._getPercentColor(1 - engelCoef) + ';">' + (engelCoef || 0.40).toFixed(2) + '</span><br>'
            + '<span style="' + lblStyle + '">❤️ 民生指数:</span><span style="color:' + this._getIndexColor(livelihoodIdx) + '; font-weight:600;">' + livelihoodIdx + '</span><br>'
            + '<span style="' + lblStyle + '">⚖️ 治理效能:</span><span style="color:' + this._getIndexColor(governanceIdx) + '; font-weight:600;">' + governanceIdx + '</span><br>'
            + '<span style="' + lblStyle + '">🌍 可持续发展:</span><span style="color:' + this._getIndexColor(sustainIdx) + '; font-weight:600;">' + sustainIdx + '</span><br>'
            + '<span style="' + lblStyle + '">🔬 科技创新:</span><span style="color:' + this._getIndexColor(techIdx) + ';">' + techIdx + '</span><br>'
            + '<span style="' + lblStyle + '">🛡️ 社保覆盖:</span><span style="color:' + this._getPercentColor(ssCoverage) + ';">' + ssCoverage + '%</span><br>'

            + '<span style="' + titleStyle + '">发展模式</span><br>'
            + '<span style="color:#f0b84a;">' + indStr + '</span>'
            + (synergyCount > 0 ? '<br><span style="color:#4bcc7a; font-size:11px;">⚡ 政策协同 +' + synergyCount + '</span>' : '')
            + (conflictCount > 0 ? '<br><span style="color:#e05555; font-size:11px;">⚠️ 政策冲突 -' + conflictCount + '</span>' : '');

	}

	init() {

		var body = document.createElement('div');
        body.style.cssText = 'padding:10px 12px; pointer-events:none; display:flex; flex-direction:column; align-items: center;';
        this.pannel.appendChild( body );

        this.evaltOpinion = document.createElement('div');
        this.evaltOpinion.style.cssText = 'pointer-events:none; color:' + '#dce8f5' + '; font-size:12px; font-weight:600; margin-bottom:6px;';
        body.appendChild( this.evaltOpinion );

        this.evaltYes = document.createElement('span');
        this.evaltYes.style.cssText = 'color:#4bcc7a; font-size:16px; font-weight:bold; margin-right:20px;';

        this.evaltNo = document.createElement('span');
        this.evaltNo.style.cssText = 'color:#e05555; font-size:16px; font-weight:bold;';

        var voteRow = document.createElement('div');
        voteRow.style.cssText = 'margin-bottom:6px;';
        voteRow.appendChild(this.evaltYes);
        voteRow.appendChild(this.evaltNo);
        body.appendChild(voteRow);

        this.evaltProb = document.createElement('div');
        this.evaltProb.style.cssText = 'pointer-events:none; color:' + '#dce8f5' + '; font-size:13px; line-height:1.5; width:90%; text-align:center; ';
        body.appendChild( this.evaltProb );

        this.evaltStats = document.createElement('div');
        this.evaltStats.style.cssText = 'pointer-events:none; color:' + '#dce8f5' + '; font-size:13px; line-height:1.5; width:90%; text-align:left; ';
        body.appendChild( this.evaltStats );

        this.evaltExtended = document.createElement('div');
        this.evaltExtended.style.cssText = 'pointer-events:none; color:' + '#dce8f5' + '; font-size:13px; line-height:1.5; width:90%; text-align:left; ';
        body.appendChild( this.evaltExtended );

        this.evaltOpinion.innerHTML = '<b>民意调查</b><br><span style="font-size:11px; color:rgba(180,210,240,0.6);">城市管理成效评价</span>';

	}

}
