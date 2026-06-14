import { Hub_Pannel } from './Hub_Pannel.js';
import { AppState } from '../../AppState.js'

export class Hub_Economy extends Hub_Pannel {

	constructor( hub, isRight  ) {

		super( hub, '发展模式', isRight  );
        this.updateFunction = AppState.main.getIndustrySpec

	}

	update(list, current){
		// Rebuild each time
        this.body.innerHTML = '';

        var hdr = document.createElement('div');
        hdr.style.cssText = 'font-size:11px; color:rgba(180,210,240,0.6); margin-bottom:10px; pointer-events:none; line-height:1.5;';
        hdr.textContent = '选择城市发展战略定位，将深刻影响城市税收、环境、就业和民生等各项指标表现。';
        this.body.appendChild(hdr);

        if (Array.isArray(list)) {
            for (var i = 0; i < list.length; i++) {
                this._addDevModeRow(this.body, list[i]);
            }
        }
	}

	init() {

		this.body = document.createElement('div');
        this.body.style.cssText = 'padding:8px 12px; pointer-events:auto; overflow-y:auto; max-height:400px;'
        + 'scrollbar-color: var(--c-accent) var(--c-bg); scrollbar-width: thin;'
        this.pannel.appendChild(this.body);

	}

	_addDevModeRow (container, spec) {
        var _this = this;
        var row = document.createElement('div');
        row.style.cssText = 'display:flex; align-items:flex-start; gap:8px; margin-bottom:6px; pointer-events:auto; cursor:pointer;'
                          + ' padding:6px 8px; border-radius:6px; border:1px solid '
                          + (spec.active ? 'rgba(240,184,74,0.6)' : 'rgba(100,160,220,0.2)') + ';'
                          + ' background:' + (spec.active ? 'rgba(240,184,74,0.10)' : 'rgba(255,255,255,0.03)') + ';'
                          + ' transition:background 120ms;';
        row.dataset.id = spec.id;

        var icon = document.createElement('div');
        icon.style.cssText = 'flex-shrink:0; font-size:18px; line-height:1; margin-top:2px;';
        icon.textContent = spec.icon || '🏙️';
        row.appendChild(icon);

        var info = document.createElement('div');
        info.style.cssText = 'pointer-events:none; flex:1;';
        info.innerHTML = '<div style="font-size:12px; font-weight:600; color:#dce8f5;">' + spec.name
                       + (spec.active ? ' <span style="color:#f0b84a; font-size:10px;">[当前模式]</span>' : '') + '</div>'
                       + '<div style="font-size:10px; color:rgba(180,210,240,0.6); line-height:1.4; margin-top:1px;">' + spec.description + '</div>';
        row.appendChild(info);

        row.addEventListener('click', function(e){
            e.preventDefault();
            Main.setIndustrySpec(this.dataset.id);
        }, false);

        container.appendChild(row);
    }

}
