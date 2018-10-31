"charset = utf-8";
"use strict";
/**
 ***************************************
 * @项目 文蕴视力康复中心-房山店
 * @联系 WangWei
 * @邮箱 290518066@qq.com
 ***************************************
 **/


/**
 **********************
 * 扩展jQuery的常用方法
 **********************
 **/
(function($){
	$.extend({

		//弹出提示框2秒
		alerts:function(txt,cls){
			var cls = cls?cls:cls='';
			var _html = '<p class="alerts '+cls+'">'+txt+'</p>';
			$('body').append(_html);
			var _as = $('.alerts');
			_as.fadeIn(100);
			setTimeout(function(){
				_as.remove();
			},2000);
		},

		//确定提示框-模拟alert();只是一个提示不做其它用途
		alert:function(txt){
			var tipHtml = '<div class="alertTip_bg">'+
					'<div class="alertTip">'+
						'<h6>提示</h6>'+
						'<p>'+txt+'</p>'+
						'<button>确定</button>'+
					'</div>'+
				'</div>';
			var $body = $('body');
			//可拖动
			alertDrag();
			//点确定消失
			$body.append(tipHtml).delegate('.alertTip > button', 'click', function() {
				$(this).parents('.alertTip_bg').remove();
			});
		},

		//弹出确认框-模拟confirm();
		confirm:function(txt){
			var tipHtml = '<div class="alertTip_bg">'+
					'<div class="alertTip">'+
						'<h6>提示</h6>'+
						'<p>'+txt+'</p>'+
						'<button class="cancle">取消</button><button class="sure">确定</button>'+
					'</div>'+
				'</div>';
			var $body = $('body');
			$body.append(tipHtml);
			//可拖动
			alertDrag();
			//点cancle消失
			$body.delegate('.alertTip > .cancle', 'click', function() {
				$(this).parents('.alertTip_bg').remove();
			});
		},


		//n-m之间的随机数（默认0-10，包括n和m）
		rdm:function(n,m){
			n = n || 0;
			m = m || 10;
			return parseInt(Math.random()*((m-n)+1))+n;
		},

		//补零函数--返回的是String
		toDbl:function(n){
			return n<10?'0'+n:''+n;
		},

		//获取len长度的随机数字 --注意会出现1.0的情况
        getRnd: function (len) {
            if ($.isNullOrEmpty(len)) { len = 5; }
            return parseFloat(Math.random()).toFixed(len).toString().replace("0.", "");
        },

        //是否整数：0,正整数，负整数
        isInt: function (str) {
            return (str % 1 == 0 ? true : false); //return /^\-?\d+$/.test(num);
        },

        //是否是正整数
        //symbol不指定时表示不按正号前导符匹配，?表示模糊正号前导符匹配，+表示一定要有正号前导符
        isPositiveInt: function (str, symbol) {
            if ($.isNullOrEmpty(str)) { return false; }
            switch (symbol) {
                case "+": return /^\+[1-9][0-9]*$/.test(str); break;
                case "?": return /^\+?[1-9][0-9]*$/.test(str); break;
                default: return /^[1-9][0-9]*$/.test(str); break;
            }
        },

        //非负整数(正整数和零)
        isPositiveIntOrZero: function (str, symbol) {
            switch (symbol) {
                case "+": return (/^\+[1-9][0-9]*$/.test(str) || str == 0); break;
                case "?": return (/^\+?[1-9][0-9]*$/.test(str) || str == 0); break;
                default: return (/^[1-9][0-9]*$/.test(str) || str == "0"); break;
            }
        },

        //是否是金额
        isMoney: function (str) {
            return /^(0|[1-9][0-9]*){1}(\.\d{1,2})?$/.test(str);
        },

        //小数四舍五入
        decRound: function (Decimal, i) {
            return Math.round(Decimal * Math.pow(10, i)) / Math.pow(10, i);
        },

        //过滤数组中重复的项
        arrFilter: function (arr) {
            if (arr.length < 2) { return [arr[0]] || []; }
            var array = [];
            for (var i = 0; i < arr.length; i++) {
                array.push(arr.splice(i--, 1));
                for (var j = 0; j < arr.length; j++) {
                    if (arr[j] == array[array.length - 1]) {
                        arr.splice(j--, 1);
                    }
                }
            }
            return array;
        },
        
        // 元素是否在数组中存在
        arrIsExit: function (arr, ele) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === ele) {
                    return true;
                }
            }
            return false;
        },

        //获取url中的参数值
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },

        //获取当前时间
        getDateTime: function () {
            var d = new Date();
            return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        },

        //将json格式的字符串转为json对象{}
        json: function (jsonStr) {
            return eval("(" + jsonStr + ")");
        },

        //字符串字节长度，1个中文或全角字符是2字节
        bLength: function (str) {
            var len = 0;
            if (!str) { return 0; }
            var str = str.replace(/(^\s*)|(\s*$)/g, "");
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) { len++; } else { len += 2; }
            }
            return len;
        },
        //是否字符串或数组是否为空
        isNullOrEmpty: function (str) {
            return (str == null
                    || typeof str == "NaN"
                    || typeof str == "undefined"
                    || str.length == 0) ? true : false;
        }
	});
})(jQuery);

//弹出框可推拽函数
function alertDrag(){
	$('body').delegate('.alertTip h6','mousedown',function(e){
		var $box = $(this).parent('.alertTip');
		var o = $box.offset();
		var x = e.pageX - o.left;
		var y = e.pageY - o.top;
		//防止超出屏幕
		var iBoxWidth = $box.width();
		var iBoxHeight = $box.height();
		var iWinWidth = $(window).width();
		var iWinHeight = $(window).height();
		var iMarL = Math.abs(parseInt($box.css("marginLeft")));
		var iMarT = Math.abs(parseInt($box.css("marginTop")));
		var scroll_h = $(window).scrollTop(); //注意有滚动高度

		$(document).bind('mousemove',function(ev){
			$box.stop();
			var _x = ev.pageX - x;
			var _y = ev.pageY - y - scroll_h;
			//防止超出屏幕的判断
			/*if(_x<0){_x=0}
			if(_x>iWinWidth-iBoxWidth){_x=iWinWidth-iBoxWidth}
			if(_y<0){_y=0}
			if(_y>iWinHeight-iBoxHeight){_y=iWinHeight-iBoxHeight}*/

			$box.animate({left:_x+iMarL+'px',top:_y+iMarT+'px'},0);
			return false;//防止出现选择文字的情况
		});
		$(document).mouseup(function(){
			$(this).unbind('mousemove');
		});
	});
};





var ski = {
	dom:{
		//use jquery-1.12.3.min.js
	},
	cmn:{
		//common function
	},
	ind:{
		//individual function
	}
};

ski.cmn = {
	rdm:function(n,m){
		return parseInt(Math.random()*(m-n))+n;
	},
	toDbl:function(n){
		return n<10?'0'+n:''+n;
	}
};


//公共部分执行
ski.cmn.rdm(30,100);
