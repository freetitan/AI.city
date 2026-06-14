import { Hub_Pannel } from './Hub_Pannel.js';
import { AppState } from '../../AppState.js'

export class Hub_Budget extends Hub_Pannel {

	constructor( hub, isRight ) {

		super( hub, '财政', isRight );

		this.resTaxRate = 7;
        this.comTaxRate = 7;
        this.indTaxRate = 7;

        this.roadRate = 0
        this.roadFund = 0
        this.fireRate = 0
        this.fireFund = 0
        this.policeRate = 0
        this.policeFund = 0
        this.waterRate = 0
        this.waterFund = 0
        this.educationRate = 0
        this.educationFund = 0
        this.socialSecurityRate = 0
        this.socialSecurityFund = 0
        this.environmentRate = 0
        this.environmentFund = 0
        this.techInnovationRate = 0
        this.techInnovationFund = 0

        this.totalFunds = 0
        this.taxesCollected = 0
        this.bondAnnualPayment = 0
        this.bondMaxDebt = 0

        this.bondDebt =  0;
        this.bondAnnualPayment = 0;
        this.bondMaxDebt = 0

        this.cashFlow = 0

        this.updateFunction = AppState.main.getBudget

	}

	update( data ) {

		for(let m in data){
			if(this[m]!==undefined){ 
				this[m] = data[m];
			}
		}

        var previousFunds = this.totalFunds;
        var taxesCollected = this.taxesCollected || 0;
        this.cashFlow = taxesCollected - (this.roadFund || 0) - (this.fireFund || 0) - (this.policeFund || 0) - (this.waterFund || 0) - (this.educationFund || 0) - (this.socialSecurityFund || 0) - (this.environmentFund || 0) - (this.techInnovationFund || 0);

	    if(this.state === 'none') return;
        if(this.state === 'close') return;

        this.hubMain.setSliderValue('住宅税率', this.resTaxRate, 20, null);
        this.hubMain.setSliderValue('商业税率', this.comTaxRate, 20, null);
        this.hubMain.setSliderValue('工业税率', this.indTaxRate, 20, null);
        this.hubMain.setSliderValue('道路维护',   this.roadRate,   100, this.roadFund);
        this.hubMain.setSliderValue('消防服务',    this.fireRate,   100, this.fireFund);
        this.hubMain.setSliderValue('警务服务',  this.policeRate, 100, this.policeFund);
        this.hubMain.setSliderValue('供水系统',   this.waterRate !== undefined ? this.waterRate : 100, 100, this.waterFund);
        this.hubMain.setSliderValue('教育投入', this.educationRate !== undefined ? this.educationRate : 100, 100, this.educationFund);
        this.hubMain.setSliderValue('社会保障', this.socialSecurityRate !== undefined ? this.socialSecurityRate : 100, 100, this.socialSecurityFund);
        this.hubMain.setSliderValue('环境保护', this.environmentRate !== undefined ? this.environmentRate : 100, 100, this.environmentFund);
        this.hubMain.setSliderValue('科技创新', this.techInnovationRate !== undefined ? this.techInnovationRate : 100, 100, this.techInnovationFund);

        this.budgetResult.innerHTML = '<span style="color:rgba(180,210,240,0.6)">年度财政收入:</span> ￥' + this.cashFlow
                                    + '<br><span style="color:rgba(180,210,240,0.6)">税收总额:</span> ￥' + taxesCollected;

        // Update bond info display
        var bondDebt    = this.bondDebt        || 0;
        var bondPayment = this.bondAnnualPayment || 0;
        var bondMax     = this.bondMaxDebt      || 50000;
        var debtColor   = bondDebt === 0 ? 'rgba(180,210,240,0.6)' : bondDebt > bondMax * 0.8 ? '#e05555' : '#f0b84a';
        if (this.bondDebtInfo) {
            this.bondDebtInfo.innerHTML = '<span style="color:rgba(180,210,240,0.6);">未偿还债务:</span>'
                + ' <span style="color:' + debtColor + '; font-weight:600;">￥' + bondDebt + '</span>'
                + '<br><span style="color:rgba(180,210,240,0.6);">年利息:</span>'
                + ' <span style="color:' + (bondPayment > 0 ? '#f0b84a' : 'rgba(180,210,240,0.6)') + ';">￥' + bondPayment + '</span>'
                + '<br><span style="color:rgba(180,210,240,0.4); font-size:10px;">上限: ￥' + bondMax + ' (年利率7%)</span>';
        }

	}

	init() {

		const body = document.createElement('div');
        body.style.cssText = 'padding:10px 12px 6px; pointer-events:none; overflow-y:auto; overflow-x:hidden;'
                           + ' display:flex; flex-direction:column; align-items: center;';
        this.pannel.appendChild( body );

        var taxLabel = document.createElement('div');
        taxLabel.style.cssText = 'font-size:10px; font-weight:700;'
                               + ' letter-spacing:0.08em; color:rgba(75,204,122,0.8); text-transform:uppercase;'
                               + ' margin-bottom:2px;';
        taxLabel.textContent = '税率设置';
        body.appendChild(taxLabel);

        this.hubMain.addSlider(body, null, '住宅税率', this.resTaxRate, null, '#27a866', 20);
        this.hubMain.addSlider(body, null, '商业税率', this.comTaxRate, null, '#61B2F4', 20);
        this.hubMain.addSlider(body, null, '工业税率', this.indTaxRate, null, '#d4cd2a', 20);

        var svcLabel = document.createElement('div');
            svcLabel.style.cssText = 'font-size:10px; font-weight:700;'
                                   + ' letter-spacing:0.08em; color:rgba(224,85,85,0.8); text-transform:uppercase;'
                                   + ' margin-top:6px; margin-bottom:2px;';
            svcLabel.textContent = '基础设施';
            body.appendChild(svcLabel);

        this.hubMain.addSlider(body, null, '道路维护',  this.roadRate,   this.roadFund,   '#e05555', 100);
        this.hubMain.addSlider(body, null, '消防服务',   this.fireRate,   this.fireFund,   '#e05555', 100);
        this.hubMain.addSlider(body, null, '警务服务', this.policeRate, this.policeFund, '#e05555', 100);
        this.hubMain.addSlider(body, null, '供水系统',  this.waterRate !== undefined ? this.waterRate : 100, this.waterFund,  '#4a9edd', 100);
        this.hubMain.addSlider(body, null, '教育投入', this.educationRate !== undefined ? this.educationRate : 100, this.educationFund, '#a855f7', 100);

        // 政策仿真新增支出类别
        var policyLabel = document.createElement('div');
            policyLabel.style.cssText = 'font-size:10px; font-weight:700;'
                                   + ' letter-spacing:0.08em; color:rgba(168,85,247,0.8); text-transform:uppercase;'
                                   + ' margin-top:6px; margin-bottom:2px;';
            policyLabel.textContent = '公共服务';
            body.appendChild(policyLabel);

        this.hubMain.addSlider(body, null, '社会保障', this.socialSecurityRate !== undefined ? this.socialSecurityRate : 100, this.socialSecurityFund, '#f59e0b', 100);
        this.hubMain.addSlider(body, null, '环境保护', this.environmentRate !== undefined ? this.environmentRate : 100, this.environmentFund, '#22c55e', 100);
        this.hubMain.addSlider(body, null, '科技创新', this.techInnovationRate !== undefined ? this.techInnovationRate : 100, this.techInnovationFund, '#3b82f6', 100);

        this.budgetResult = document.createElement('div');
        this.budgetResult.style.cssText = 'pointer-events:none; color:' + '#dce8f5' + '; font-size:12px; line-height:1.6;'
                                        + ' margin-top:8px; margin-bottom:4px;';
        body.appendChild( this.budgetResult );

        // ── Municipal Bonds section ───────────────────────────────
        var bondLabel = document.createElement('div');
        bondLabel.style.cssText = 'font-size:10px; font-weight:700;'
                                + ' letter-spacing:0.08em; color:rgba(240,184,74,0.8); text-transform:uppercase;'
                                + ' margin-top:6px; margin-bottom:4px;';
        bondLabel.textContent = '市政债券';
        body.appendChild(bondLabel);

        this.bondDebtInfo = document.createElement('div');
        this.bondDebtInfo.style.cssText = 'pointer-events:none; color:' + '#dce8f5' + '; font-size:11px; line-height:1.5;'
                                        + ' margin-bottom:6px;';
        body.appendChild(this.bondDebtInfo);


        var bondBtnsRow = document.createElement('div');
        bondBtnsRow.style.cssText = 'display:flex; gap:4px; pointer-events:auto; margin-bottom:6px;';
        body.appendChild(bondBtnsRow);

        var b5k  = this.hubMain.addButton(bondBtnsRow, '+￥5K',  [58, 22, 12], null);
        var b10k = this.hubMain.addButton(bondBtnsRow, '+￥10K', [62, 22, 12], null);
        var b20k = this.hubMain.addButton(bondBtnsRow, '+￥20K', [62, 22, 12], null);
        b5k.title  = '发行￥5,000债券 (年利率7%)';
        b10k.title = '发行￥10,000债券 (年利率7%)';
        b20k.title = '发行￥20,000债券 (年利率7%)';
        b5k.addEventListener( 'click', function(e){ e.preventDefault(); AppState.main.issueBond(5000);  }, false);
        b10k.addEventListener('click', function(e){ e.preventDefault(); AppState.main.issueBond(10000); }, false);
        b20k.addEventListener('click', function(e){ e.preventDefault(); AppState.main.issueBond(20000); }, false);

        

	}

	apply(){

		var wRate = this.waterRate !== undefined ? this.waterRate : 100;
        var eRate = this.educationRate !== undefined ? this.educationRate : 100;
        var ssRate = this.socialSecurityRate !== undefined ? this.socialSecurityRate : 100;
        var envRate = this.environmentRate !== undefined ? this.environmentRate : 100;
        var techRate = this.techInnovationRate !== undefined ? this.techInnovationRate : 100;
        AppState.main.setBudget([this.resTaxRate, this.comTaxRate, this.indTaxRate, this.roadRate, this.fireRate, this.policeRate, wRate, eRate, ssRate, envRate, techRate]);

        //this.close()

	}

}
