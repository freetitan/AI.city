import { Hub_Pannel } from './Hub_Pannel.js';
import { AppState } from '../../AppState.js'

export class Hub_Save_Load extends Hub_Pannel {

	constructor( hub, isRight ) {

		super( hub, '存档管理', isRight );

	}

	init() {

		this.body = document.createElement('div');
        this.body.style.cssText = 'padding:10px 12px; pointer-events:none; align-items: center; display:flex; flex-direction:column; gap:6px;';
        this.pannel.appendChild( this.body );

        const bg2 = this.hubMain.addButton(this.body, '本地存档', [138, 26, 11], null);
        const bg3 = this.hubMain.addButton(this.body, '保存文件', [138, 26, 11], null);
        const bg4 = this.hubMain.addButton(this.body, '读取文件', [138, 26, 11], null);

        bg2.title = '保存到浏览器本地存储';
        bg3.title = '导出为 JSON 文件';
        bg4.title = '从 JSON 文件读取存档';

        bg2.addEventListener('click', function(e){ e.preventDefault(); AppState.main.autoSave();   }, false);
        bg3.addEventListener('click', function(e){ e.preventDefault(); AppState.main.saveGame();   }, false);
        bg4.addEventListener('click', function(e){ e.preventDefault(); AppState.main.loadGame();   }, false);

        var sep = document.createElement('div');
        sep.style.cssText = 'border-top:1px solid rgba(100,160,220,0.22); margin:2px 0;';
        this.body.appendChild(sep);

        const bg1 = this.hubMain.addButton(this.body, '新建地图',  [138, 26, 11], null);
        bg1.title = '生成新地图并开始新仿真';
        bg1.addEventListener('click', function(e){
            e.preventDefault();
            _this.closeExit();
            _this.openNewMap(function(){ Main.playMap(); });
        }, false);

	}

}