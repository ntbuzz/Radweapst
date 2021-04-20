
// JQueryプラグインで呼び出す
//==============================================================================================
// フローティングウィンドウのフォームのみ
$.fn.innerWindow = function (title) {
	var self = $(this);
	var id = "#" + self.attr("id");
    var val = self.attr("value");
    var buttons = (val) ? val.split(",") : Array();
    var message_id= id+" .resize_message";
//	操作ボタンパーツを追加
    var controlls = ["close:${#core.Close}", "resize:${#core.Resize}", "resize_message:${#core.SizeDisplay}"];
    controlls.forEach(function (value) {
        var cls = value.split(':');
        if (self.find("." + cls[0]).length == 0) {
            var alt = (cls[1] != '') ? ' alt="' + cls[1] + '"' : '';
            var tag = '<span class="'+cls[0]+alt+'"></span>';
            self.append(tag);
        }
    });
//  標準ボタンパーツを追加
	if (buttons.length && self.find(".center").length===0) {
        var buttontag = "<div class='center'><hr>";
        var buttonClass = [ "execButton", "closeButton"];
		$.each(buttons, function (index, val) {
			var action = buttonClass[index];
			buttontag = buttontag + '<span class="Button ' + action + '">' + val + '</span>';
        });
        buttontag = buttontag+"</div>";
        self.find('dd').append(buttontag);
	}
	self.find('dl dt').text(title);
	// 背景をクリックできなくする
	var backwall = $('<div class="floatWin-BK"></div>');
    // クローズイベントを登録
	self.off().on('click', '#close, .close, .cancel, .closeButton, .execButton', function (e) {
		e.stopPropagation();
		e.preventDefault();
		self.fadeOut("fast");
		self.find('#init_contents').html('');      // clear contents
		$(document).unbind("mousemove");
		backwall.remove();
	});
	// ドロップ属性があればエレメントを初期化する
	var cls = self.attr("class");
	if( cls!==undefined && cls.indexOf("drop") !== -1) {
		self.find("#datalist").empty();
		var initdata = self.find("#init").attr("value");
		self.find("#datalist").append(initdata);
	};
	// サイズ属性があればウィンドウサイズを指定する
	if (self.is('[size]')) {
		var sz = self.attr("size").split(',');
		self.css({
			"width": sz[0] + "px",
			"height": sz[1] + "px",
		});
		if (sz.length == 4) {
			self.css({
				"min-width": sz[2] + "px",
				"min-height": sz[3] + "px"
			});
		};
		var x = ($(window).innerWidth() - self.width())/2;  // 中央
		var y = ($(window).innerHeight() - self.height())/4;    // 上部25%の位置
		if (x < 0) {
			x = 5;
			self.width($(window).innerWidth() - 20);
		}
		if (y < 0) {
			y = 5;
			self.height($(window).innerHeight() - 20 );
		}
		self.css({'left': x + 'px','top': y + 'px'});
	};
	$(window).resize( function() {
		self.css( {
			top: $(window).scrollTop() + 100,
			left: ($(window).width() - self.outerWidth()) /2
		});
	});
	$(window).resize();
    // フォーム内のINPUTでENTERが押下されたときの処理
	self.on('keypress', 'input', function () {
        if (e.key === 'Enter') $('.execButton').click();
//        if (e.key === 'Escape') $('.cancel').click(); // ESCAPEキーは発火しない？
	});
    // タイトルバーのドラッグ
	self.on('mousedown', 'dl dt', function (e) {
        self.data("clickPointX", e.pageX - self.offset().left)
            .data("clickPointY", e.pageY - self.offset().top);
        $(document).mousemove( function(e) {
            self.css({
                top: (e.pageY - self.data("clickPointY")) + "px",
                left: (e.pageX - self.data("clickPointX")) + "px"
            });
        }).mouseup( function(e) {
            $(document).unbind("mousemove");
        });
    });     // mousedown()
    // リサイズのドラッグ
	self.on('mousedown', '.resize', function (e) {
        self.data("clickPointX", e.pageX)
            .data("clickPointY", e.pageY);
        $(message_id).fadeIn('fast');
        self.css('user-select', 'none');    // テキスト選択不可
        $(document).mousemove(function (e) {
            var new_width = Math.floor(e.pageX - self.offset().left + 6);
            var new_height= Math.floor(e.pageY - self.offset().top + 6);
            self.css({
                width: new_width + "px",
                height: new_height + "px"
            });
            var txt = new_width + " x " + new_height;
            $(message_id).text(txt);
        }).mouseup(function (e) {
            $(message_id).fadeOut('fast');
            self.css('user-select', '');    // テキスト選択可能
            $(document).unbind("mousemove");
        });
    });
	$('body').append(backwall);
	backwall.fadeIn('fast');
	self.fadeIn("fast");
	return self;
};
//=============================================================================================
// フローティングウィンドウ内に要素が定義済で、要素の値設定を行う場合
$.fn.floatWin = function (setupObj, callback) {
	var setting = {
		Title: '',
		execButton: '.execButton',
		formObj: {},
	}
	$.each(setupObj, function (key, value) { setting[key] = value;});
	var self = this;
	// Formparameter setup
	$.each(setting.formObj, function (key, value) {
		var target = self.find('[name="' + key + '"]');
		if (target.length) {
			switch (target.prop("tagName")) {
			case 'INPUT':
				if (target.attr("type") == "checkbox" || target.attr("type") == "radio" ) {
					target.prop('checked', (value == 't'));
				} else target.val(value);   // 自ID
				break;
			case 'SELECT':
				target.val(value);   // 自ID
				break;
			case 'TEXTAREA':
				var w = target.attr("cols");
				var h = target.attr("rows");
				target.css({"width": w+"em","height": h+"em"});
			default:
				target.text(value);   // 自ID
			}
		}
	});
	self.find(setting.execButton).off().on('click', function () {
		var setobj = {};
		self.find("*").each(function () {
			var nm = $(this).attr('name');
			if (nm) {
				var tt = $(this).attr('type');
				if (tt == 'checkbox' || tt == 'radio') {
					if($(this).is(':checked')) setobj[nm] = $(this).val();
				} else {
					setobj[nm] = $(this).val();
				}
			}
		});
		if (callback !== null) callback.call(this,setobj);
		return false;
	});
	self.innerWindow(setting.Title);
	return self;
};

/*
// プラグイン化する前のバージョン
var selector = $(".floatWindow");
selector.each(function () {
    var id = "#" + $(this).attr("id");
    var val = $(this).attr("value");
    var buttons = (val) ? val.split(",") : Array();
    var self = $(id);
    var message_id= id+" .resize_message";
//	操作ボタンパーツを追加
    var controlls = ["openButton:", "close:${#core.Close}", "resize:${#core.Resize}", "resize_message:${#core.SizeDisplay}"];
    controlls.forEach(function (value) {
        var cls = value.split(':');
        if (self.find("." + cls[0]).length == 0) {
            var alt = (cls[1] != '') ? ' alt="' + cls[1] + '"' : '';
            var tag = '<span class="'+cls[0]+alt+'"></span>';
            self.append(tag);
        }
    });
//  標準ボタンパーツを追加
    if(buttons.length) {
        var buttontag = "<div class='center'><hr>";
        var buttonClass = [ "execButton", "closeButton"];
        $.each(buttons,function(index,val) {
            var action = buttonClass[index];
            buttontag = buttontag+'<span class="Button '+action+'">'+val+'</span>';
        });
        buttontag = buttontag+"</div>";
        self.find('dd').append(buttontag);
    }
// クリックイベント登録
    self.find(".openButton").off().click(function () {
            // alert("click=" + click);
        selector.fadeOut("fast");   // 全てのウィンドウを消す
        // クローズイベントを登録
		$(id).off().on('click', '#close, .close, .cancel, .closeButton, .execButton', function (e) {
			e.stopPropagation();
       		e.preventDefault();
            self.fadeOut("fast");
            self.find('#init_contents').html('');      // clear contents
            $(document).unbind("mousemove");
            $("body").find(".floatWin-BK").remove();
        });
        // ドロップ属性があればエレメントを初期化する
        if( self.attr("class").indexOf("drop") !== -1) {
            self.find("#datalist").empty();
            var initdata = self.find("#init").attr("value");
            self.find("#datalist").append(initdata);
        };
        $("body").append("<div class='floatWin-BK'></div>");
        // サイズ属性があればウィンドウサイズを指定する
        if (self.is('[size]')) {
            var sz = self.attr("size").split(',');
            self.css({
                "width": sz[0] + "px",
                "height": sz[1] + "px",
            });
            if (sz.length == 4) {
                self.css({
                    "min-width": sz[2] + "px",
                    "min-height": sz[3] + "px"
                });
            };
            var x = ($(window).innerWidth() - self.width())/2;  // 中央
            var y = ($(window).innerHeight() - self.height())/4;    // 上部25%の位置
            if (x < 0) {
                x = 5;
                self.width($(window).innerWidth() - 20);
            }
            if (y < 0) {
                y = 5;
                self.height($(window).innerHeight() - 20 );
            }
            self.css({'left': x + 'px','top': y + 'px'});
        };
        self.fadeIn("fast");
        $(window).resize( function() {
            self.css( {
                top: $(window).scrollTop() + 100,
                left: ($(window).width() - self.outerWidth()) /2
            });
        });
        $(window).resize();
        return false;
    });
    // フォーム内のINPUTでENTERが押下されたときの処理
    $(id + " input").keypress(function (e) {
        if (e.key === 'Enter') $('.execButton').click();
//        if (e.key === 'Escape') $('.cancel').click(); // ESCAPEキーは発火しない？
    });
    // タイトルバーのドラッグ
    $(id+" dl dt").mousedown( function(e) {
        self.data("clickPointX", e.pageX - self.offset().left)
            .data("clickPointY", e.pageY - self.offset().top);
        $(document).mousemove( function(e) {
            self.css({
                top: (e.pageY - self.data("clickPointY")) + "px",
                left: (e.pageX - self.data("clickPointX")) + "px"
            });
        }).mouseup( function(e) {
            $(document).unbind("mousemove");
        });
    });     // mousedown()
    // リサイズのドラッグ
    $(id+" .resize").mousedown( function(e) {
        self.data("clickPointX", e.pageX)
            .data("clickPointY", e.pageY);
        $(message_id).fadeIn('fast');
        self.css('user-select', 'none');    // テキスト選択不可
        $(document).mousemove(function (e) {
            var new_width = Math.floor(e.pageX - self.offset().left + 6);
            var new_height= Math.floor(e.pageY - self.offset().top + 6);
            self.css({
                width: new_width + "px",
                height: new_height + "px"
            });
            var txt = new_width + " x " + new_height;
            $(message_id).text(txt);
        }).mouseup(function (e) {
            $(message_id).fadeOut('fast');
            self.css('user-select', '');    // テキスト選択可能
            $(document).unbind("mousemove");
        });
    });     // mousedown()
});
*/