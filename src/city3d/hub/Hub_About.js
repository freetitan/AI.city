import { Hub_Pannel } from './Hub_Pannel.js';
import { AppState } from '../../AppState.js'

export class Hub_About extends Hub_Pannel {

	constructor( hub, isRight ) {

		super( hub, '关于', isRight );

	}

	init() {

		var body = document.createElement('div');
        body.style.cssText = 'padding:10px 12px; pointer-events:none;';
        this.pannel.appendChild( body );

        var desc = document.createElement('div');
        desc.style.cssText = 'font-size:12px; color:#dce8f5; line-height:1.6; margin-bottom:10px; pointer-events:auto;';
        desc.innerHTML = '<b>AI.city</b> v' + AppState.version + '<br>'
                       + 'Author <a href="https://github.com/freetitan" target="_blank">freetitan</a><br><br>'
                       + '3d with <b>three.js</b><br>'
                       + 'Simulation inspired by MicropolisJS';
        body.appendChild( desc );

        var kbdDiv = document.createElement('div');
        kbdDiv.style.cssText = 'font-size:11px; color:rgba(180,210,240,0.6);'
                             + ' border-top:1px solid rgba(100,160,220,0.22);'
                             + ' padding-top:8px; margin-bottom:10px; line-height:1.8;';
        kbdDiv.innerHTML = '<b style="color:#dce8f5; letter-spacing:0.05em;">键盘快捷键</b><br>'
                         + '<span class="hub-kbd">B</span> 财政 &nbsp;'
                         + '<span class="hub-kbd">E</span> 评估<br>'
                         + '<span class="hub-kbd">D</span> 灾害 &nbsp;'
                         + '<span class="hub-kbd">S</span> 存档<br>'
                         + '<span class="hub-kbd">A</span> 成就 &nbsp;'
                         + '<span class="hub-kbd">H</span> 历史<br>'
                         + '<span class="hub-kbd">O</span> 图层 &nbsp;'
                         + '<span class="hub-kbd">N</span> 政策<br>'
                         + '<span class="hub-kbd">I</span> 发展模式<br>'
                         + '<span class="hub-kbd">?</span> 关于<br>'
                         + '<span class="hub-kbd">Esc</span> 关闭窗口';
        body.appendChild( kbdDiv );

        this.linke = document.createElement('div');
        this.linke.style.cssText = 'pointer-events:auto; font-size:12px;';
        this.linke.innerHTML = "<a href='https://github.com/freetitan/AI.city' target='_blank'>GitHub 源代码 ↗</a>";
        body.appendChild( this.linke );

	}

}