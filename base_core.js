/**
 *
 * @authors wangmin
 * @date    2016-06-03 10:41:59
 * @version 1.0.0
 */

var y = y || {
    version: "1.0.0",
    coreFileName: "base_core",
    namespace: "y"
};

! function() {
    "use strict";
    /**
     * [首页轮播图]
     * @param  {[object]} params [配置参数]
     */
    y.banner = function(params) {
        var setting = {
            automatic: true, //是否自动播放
            width: $(window).width(), //图片显示宽度，默认屏幕宽度
            height: 0, //图片显示高度，默认为0，样式中默认是640，如果等于0则以样式里的高度，如果不为0则以传入的高度
            //autoTools: true, //是否显示下面的小点
            autoButton: true, //是否显示上下屏按钮
            intervals: 5000 //自动播放间隔时间，单位为毫秒，默认为5000
        };
        var element = {
            imglist: $('#banner-box .focusimg-list'), //图片显示集合
            tools: $('#banner-box .banner-tools'), //下面小点集合
            prve: $('#banner-box .banner-prve'), //上一屏按钮
            next: $('#banner-box .banner-next') //下一屏按钮
        };
        var count = element.tools.find('a').size(); //获取图片数量
        var isRun = false; //是否运行
        var timer = null;

        function _set() {
            //设置大图的宽度高度
            element.imglist.width(setting.width * count);
            element.imglist.find('li').width(setting.width);
            if (setting.height) {
                element.imglist.find('li').height(setting.height);
            }

            //设置下面小数显示位置
            var toolsWidth = count * 30;
            element.tools.css({
                'width': toolsWidth + 'px',
                'margin-left': (toolsWidth / 2 * -1) + 'px'
            });
        }

        function _run() {
            if (!isRun && setting.automatic) {
                isRun = true;
                timer = window.setInterval(_next, setting.intervals);
            }
        }

        function _stop() {
            window.clearInterval(timer);
            timer = null;
            isRun = false;
        }

        function _play(i) {
            var margin = i * setting.width * -1;
            element.imglist.stop().animate({
                marginLeft: margin + "px"
            }, {
                duration: 500
            });
            element.tools.find('a').removeClass('on');
            element.tools.find('a').eq(i).addClass('on');
        }

        function _prev() {
            var index = _getIndex('up');
            _play(index);
        }

        function _next() {
            var index = _getIndex();
            _play(index);
        }

        function _getIndex(arrow) {
            var index = element.tools.find('http://www.yinshanfu.com.cn/css/style/a.on').index();
            if (arrow) {
                //上一张
                if (index === 0) {
                    index = count - 1;
                } else {
                    --index;
                }
            } else {
                //下一张
                if (index === count - 1) {
                    index = 0;
                } else {
                    ++index;
                }
            }
            return index;
        }

        function _circleEvent() {
            element.tools.find('a').click(function() {
                var index = $(this).index();
                _stop();
                _play(index);
                _run();
            });
        }

        function _prevEvent() {
            element.prve.click(function() {
                _stop();
                _prev();
                _run();
            });
        }

        function _nextEvent() {
            element.next.click(function() {
                _stop();
                _next();
                _run();
            });
        }

        if (typeof params === 'object') {
            setting = $.extend({}, setting, params);
        }

        _set();
        _circleEvent();
        if (setting.autoButton) {
            _prevEvent();
            _nextEvent();
        }
        _run();
    };
}.call(window.jQuery, window.y);

! function() {
    "use strict";
    /**
     * [计算fullpage剩下位置]
     * @param {[number]} index     [显示块的序号，从1开始]
     * @param {[number]} minHeight [块内容最小高度，默认286]
     */
    y.setTop = function(index, minHeight) {
        var $section = $('#section' + index + ' .section-box');
        var specified = 242; //上面固定高度
        var winHeight = $(window).height(); //屏幕高度
        minHeight = minHeight || 286; //下面最小高度
        var s = winHeight - specified; //屏幕下面实际高度
        var t = s - minHeight; //剩下高度
        if (t > 2) {
            $section.css('top', (parseInt(t / 2) + specified + 17) + 'px');
        }
    };
}.call(window.jQuery, window.y);

! function() {
    "use strict";
    /**
     * [移动到指定位置]
     * @param  {[string]} el  [事件元素]
     * @param  {[number]} len [移动长度]
     */
    y.flip = function(el, len) {
        len = len || 0;
        $('#' + el).click(function(event) {
            $('html,body').animate({
                scrollTop: len
            }, 400);
        });
    };
}.call(window.jQuery, window.y);

! function() {
    "use strict";

    function _create() {
        if ($('#loadingProgress').size() > 0) {
            $('#loadingLayer').css({
                'opacity': 0.8,
                'filter': 'alpha(opacity=80)'
            });
            $('#loadingProgress').css({
                'opacity': 1,
                'filter': 'alpha(opacity=100)'
            });
            $('#loadingLayer,#loadingProgress').show();
        } else {
            $('body').append('<div id="loadingLayer" style="width:100%;height:100%;background:#fff;opacity:1;filter:alpha(opacity=100);position:fixed;top:274px;left:0;z-index:1005;"></div>');           
        }
    }

    function _close() {
        $('#loadingLayer,#loadingProgress').fadeTo(800, 0, function() {
            $(this).hide();
        });
    }

    y.ui = y.ui || {};
    y.ui.loading = y.ui.loading || {
        open: function() {
            _create();
        },
        close: function() {
            _close();
        }
    };
}.call(window.jQuery, window.y);