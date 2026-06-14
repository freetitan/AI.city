import { Hub_Pannel } from './Hub_Pannel.js';
import { AppState } from '../../AppState.js'

export class Hub_Disaster extends Hub_Pannel {

	constructor( hub, isRight ) {

		super( hub, '灾害', isRight );

		// 显示名称（中文）
		this.type = ['无', '怪兽袭击', '火灾', '洪水', '空难', '核泄漏', '龙卷风', '地震'];
		// 内部名称（英文，与 Micro.js 中的 DISASTER_ 常量匹配）
		this.typeKey = ['None', 'Monster', 'Fire', 'Flood', 'Crash', 'Meltdown', 'Tornado', 'Earthquake'];
		this.icon = ['', '🦖 ', '🔥 ', '🌊 ', '✈︎ ', '💥 ', '🌪️ ', '♒︎ '];
		this.buttons = [];

	}

	init() {

		this.body = document.createElement('div');
        this.body.style.cssText = 'width:100%; padding:10px 0px; align-items: center; pointer-events:none; display:flex; flex-direction:column; gap:6px;';
        this.pannel.appendChild( this.body );

		for(var i=0; i<this.type.length; i++){
            this.buttons[i] = this.hubMain.addButton( this.body, this.icon[i] + this.type[i], [138, 24, 11],null);
            this.buttons[i].name = this.typeKey[i]; // 使用英文key传递给后端
            this.buttons[i].addEventListener('click',  function(e){ e.preventDefault(); AppState.main.setDisaster(this.name); }, false);
        }

	}

}