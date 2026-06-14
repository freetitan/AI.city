import { Hub_Pannel } from './Hub_Pannel.js';
import { AppState } from '../../AppState.js'

export class Hub_History extends Hub_Pannel {

	constructor( hub, isRight ) {

		super( hub, '历史', isRight );

		//this.pannel.style.cssText = 'position:absolute; top:44px; left:10px; width:260px; padding: 4px 4px;'
        //    + ' pointer-events:none; display:flex; flex-direction:column; border-radius:10px; ';

        this.updateFunction = AppState.main.getHistory

	}

	update( data ){

		var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

        var html = '';
        if (!data || data.length === 0) {
            html = '<div style="font-size:12px; color:rgba(180,210,240,0.5); text-align:center; padding:20px;">暂无历史记录</div>';
        } else {
            for (var i = 0; i < data.length; i++) {
                var evt = data[i];
                var typeColors = {
                    milestone: '#4bcc7a',
                    disaster: '#e05555',
                    achievement: '#f0b84a',
                    economic: '#4a9edd',
                    growth: '#8bcc5a',
                    season: '#b088e0'
                };
                var typeIcons = {
                    milestone: '◆',
                    disaster: '⚠',
                    achievement: '★',
                    economic: '$',
                    growth: '▲',
                    season: '◐'
                };
                var color = typeColors[evt.type] || '#dce8f5';
                var icon = typeIcons[evt.type] || '•';
                var monthStr = months[evt.month] || '???';
                var dateStr = monthStr + ' ' + evt.year;

                html += '<div style="display:flex; gap:8px; padding:5px 0; border-bottom:1px solid rgba(100,160,220,0.1);">'
                      + '<span style="color:' + color + '; font-size:14px; min-width:16px; text-align:center;">' + icon + '</span>'
                      + '<div style="flex:1;">'
                      + '<div style="font-size:11px; color:rgba(180,210,240,0.5);">' + dateStr + '</div>'
                      + '<div style="font-size:12px; color:#dce8f5;">' + evt.desc + '</div>'
                      + '</div></div>';
            }
        }

        this.body.innerHTML = html;

	}

	init() {

		this.body = document.createElement('div');
        this.body.style.cssText = 'padding:10px 12px; pointer-events:auto; overflow-y:auto; max-height:340px;'
        + 'scrollbar-color: var(--c-accent) var(--c-bg); scrollbar-width: thin;'
        this.pannel.appendChild( this.body );

	}

}