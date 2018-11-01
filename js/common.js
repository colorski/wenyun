"charset = utf-8";
"use strict";
/**
 ***************************************
 * @项目 文蕴视力康复中心-房山店
 * @联系 WangWei
 * @邮箱 290518066@qq.com
 ***************************************
 **/

(function($){
	$.extend({
		//phone call popup
		phonePopup:function(){
			var _html = '<div class="wy-bg" id="phonePopup">'+
				'<div class="wy-bg-inner">'+
					'<p class="list phone"><span><i class="iconfont icon-ffwappui122822"></i>电话：13161516787</span><a href="tel:13161516787" class="phone-click">点击咨询</a></p>'+
					'<p class="list address"><span><i class="iconfont icon-ffwappui122820"></i>地址：房山区良乡华亨国际中心9层913室</span></p>'+
					'<p class="list weixin"><span><i class="iconfont icon-scan_light"></i>微信：13161516787</span></p>'+
					'<i class="iconfont icon-1295jiaoyiguanbidingdan icon-btn-cancle" id="btnIconPhoneCancle"></i>'+
				'</div>'+
			'</div>'
			var btn = $('#btnIconPhone'), main = $('#main');
			btn.click(function(){
				$.phonePopupRemove();
				main.append(_html);
			});
			main.delegate('#btnIconPhoneCancle','click',function(){
				$.phonePopupRemove();
			})
		},
		phonePopupRemove:function(){
			$('#phonePopup').remove();
		},
		alerts:function(txt,cls){
			var cls = cls?cls:cls='';
			var _html = '<p class="alerts '+cls+'">'+txt+'</p>';
			$('body').append(_html);
			var _as = $('.alerts');
			_as.fadeIn(100);
			setTimeout(function(){
				_as.remove();
			},2000);
		}
	});
})(jQuery);

$(document).ready(function(){
	$.phonePopup();
	//$.alerts('234')
});

