import { Hub_Pannel } from './Hub_Pannel.js';
import { AppState } from '../../AppState.js'

export class Hub_Overlays extends Hub_Pannel {

	constructor( hub, isRight ) {

		super( hub, '图层', isRight );

		this.type = ['无', '人口密度', '发展速度', '土地价值', '犯罪率', '污染', '交通', '电网', '火灾风险', '警力覆盖'];
		this.icon = ['', '👨‍👩‍👧 ', '📈 ', '💰 ', '☠️ ', '🤢 ', '🚗 ', '⚡ ' , '🔥 ', '🚨 '];
        this.buttons = [];

	}
	
	init() {

		const body = document.createElement('div');
        body.style.cssText = 'width:100%; padding:10px 0px; pointer-events:none; display:flex; flex-direction:column; gap:6px; align-items: center; ';
        this.pannel.appendChild( body );

        for(let i=0; i<this.type.length; i++){
            this.buttons[i] = this.hubMain.addButton(body, this.icon[i] + this.type[i].toUpperCase(), [138,24,11], null);
            this.buttons[i].name = this.type[i];
            this.buttons[i].addEventListener('click',  function(e){ e.preventDefault(); AppState.main.setOverlays(this.name); }, false);
        }

	}

}