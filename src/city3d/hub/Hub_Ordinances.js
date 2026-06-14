import { Hub_Pannel } from './Hub_Pannel.js';
import { AppState } from '../../AppState.js'
import { POLICY_CATEGORIES } from '../../micro/game/Ordinances.js'

export class Hub_Ordinances extends Hub_Pannel {

	constructor( hub, isRight  ) {

		super( hub, '政策', isRight  );
        this.updateFunction = AppState.main.getOrdinances

	}

	update( ordinances, annualCost ){

		// Rebuild the list each time (ordinances may have toggled)
        this.body.innerHTML = '';

        var costLabel = document.createElement('div');
        costLabel.style.cssText = 'font-size:11px; color:rgba(180,210,240,0.6); margin-bottom:8px; pointer-events:none;';
        costLabel.textContent = '年度政策支出: ' + (annualCost || 0) + '$';
        this.body.appendChild(costLabel);

        if (Array.isArray(ordinances)) {
            // 按领域分类展示
            let categories = {};
            for (var i = 0; i < ordinances.length; i++) {
                var cat = ordinances[i].category || 'other';
                if (!categories[cat]) categories[cat] = [];
                categories[cat].push(ordinances[i]);
            }

            // 按分类顺序展示
            for (var c = 0; c < POLICY_CATEGORIES.length; c++) {
                var catDef = POLICY_CATEGORIES[c];
                if (!categories[catDef.id]) continue;

                // 分类标题
                var catHeader = document.createElement('div');
                catHeader.style.cssText = 'font-size:12px; font-weight:700; color:rgba(180,210,240,0.8); margin-top:10px; margin-bottom:4px; pointer-events:none;';
                catHeader.textContent = catDef.icon + ' ' + catDef.name;
                this.body.appendChild(catHeader);

                // 该分类下的政策
                var catOrds = categories[catDef.id];
                for (var j = 0; j < catOrds.length; j++) {
                    this._addPolicyRow(this.body, catOrds[j]);
                }
            }
        }

	}

	init() {

		this.body = document.createElement('div');
        this.body.style.cssText = 'padding:8px 12px; pointer-events:auto; overflow-y:auto; max-height:400px;'
        + 'scrollbar-color: var(--c-accent) var(--c-bg); scrollbar-width: thin;'
        this.pannel.appendChild( this.body );

	}

	_addPolicyRow (container, ord) {
        var _this = this;
        var row = document.createElement('div');
        row.style.cssText = 'display:flex; align-items:flex-start; gap:8px; margin-bottom:8px; pointer-events:auto; cursor:pointer;'
                          + ' padding:6px 8px; border-radius:6px; border:1px solid rgba(100,160,220,0.2);'
                          + ' background:' + (ord.active ? 'rgba(75,204,122,0.12)' : 'rgba(255,255,255,0.03)') + ';'
                          + ' transition:background 120ms;';
        row.dataset.id = ord.id;

        var toggle = document.createElement('div');
        toggle.style.cssText = 'flex-shrink:0; width:14px; height:14px; border-radius:3px; border:1.5px solid '
                             + (ord.active ? '#4bcc7a' : 'rgba(100,160,220,0.4)') + ';'
                             + ' background:' + (ord.active ? '#4bcc7a' : 'transparent') + ';'
                             + ' margin-top:2px;';
        row.appendChild(toggle);

        var info = document.createElement('div');
        info.style.cssText = 'pointer-events:none;';
        info.innerHTML = '<div style="font-size:12px; font-weight:600; color:#dce8f5;">' + ord.name + '</div>'
                       + '<div style="font-size:10px; color:rgba(180,210,240,0.6); line-height:1.4;">' + ord.description + '</div>'
                       + (ord.annualCost > 0 ? '<div style="font-size:10px; color:rgba(224,160,60,0.85); margin-top:1px;">年支出: ' + ord.annualCost + '$</div>' : '<div style="font-size:10px; color:rgba(180,210,240,0.4); margin-top:1px;">无财政成本</div>');
        row.appendChild(info);

        row.addEventListener('click', function(e){
            e.preventDefault();
            AppState.main.setOrdinance(this.dataset.id);
        }, false);

        container.appendChild(row);
    }

}
