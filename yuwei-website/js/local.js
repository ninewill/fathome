(function e(t, n, r) { function s(o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} }; t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++)s(r[o]); return s })({
  1: [function (require, module, exports) {
    'use strict';

    var _domready = require('utils/domready');

    var _domready2 = _interopRequireDefault(_domready);

    var _GlanceNav = require('utils/GlanceNav');

    var _GlanceNav2 = _interopRequireDefault(_GlanceNav);

    var _Browsers = require('../../../constants/Browsers');

    var _Browsers2 = _interopRequireDefault(_Browsers);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var $ = void 0;


    (0, _domready2['default'])(function () {
      $ = window.NCOMMON_$ || window.$;
      if (!_Browsers2['default'].game) {
        $(window).load(function () {
          var hero = new Hero();
        }); //ページ読み込み後にメインアニメーション開始
        var world = new World();
      }
      setTimeout(function () {
        var $navi = $('#local-navi-switch');
        var $list = $navi.find('.local-navi-switch__listWrap');
        var $arrow = $navi.find('.ncommon-sheader-switch__arrow');

        //GlanceNav
        new _GlanceNav2['default']($list, $arrow);
      }, 1);

      $(function () {
        var anchorPoint = $('#local-gallery__anchorPoint--index');
        var btnCurrentIndex = $('#local-navi-switch__item--index');
        var anchorPointOffset = anchorPoint.offset().top;
        $(window).scroll(function () {
          if ($(window).scrollTop() > anchorPointOffset) {
            btnCurrentIndex.addClass('js-active');
          } else {
            btnCurrentIndex.removeClass('js-active');
          }
        });
      });

      // スライドギャラリーを開いた時にスクロールを禁止
      $(function () {
        var html = $('html');
        var gallery = $('.local-gallery');
        var btnsGalleryOpener = $('[data-njs="slidergallery__opener"]');
        var btnsGalleryCloser = $('[data-njs="slidergallery__closer"]');
        btnsGalleryOpener.on('click', function () {
          $(window).on('touchmove.noScroll', function (e) {
            e.preventDefault();
          });
          html.css({ 'overflow': 'hidden' });
        });
        btnsGalleryCloser.on('click', function () {
          $(window).off('.noScroll');
          html.attr('style', '');
        });
      });
    });

    var Hero = function () {
      function Hero() {
        _classCallCheck(this, Hero);

        this.$ = $('#local-hero');
        this.$redInner = this.$.find('.local-hero__redInner');
        this.$pics = this.$.find('.local-hero__pic');
        this.$logo = this.$.next('.local-hero__logo');
        this.$headText = this.$logo.next('.local-hero__heading-text');
        this._num = 0;
        this._maxNum = this.$pics.length;
        this._flug = true;
        setTimeout(this._switchPic.bind(this), 800);
      }

      Hero.prototype._switchPic = function _switchPic() {
        var _this = this;

        var $pic = this.$pics.eq(this._num);
        var $picBef = this.$pics.eq(this._num - 1);
        this._num++;
        this._num = (this._num + this._maxNum) % this._maxNum;
        var redDuration = 800;
        var zoomDuration = 4000;

        if (this._flug === true) {
          this._logoSwitching(this);
          this.$redInner.addClass('js-hide');
          $pic.addClass('js-zooming-only');
          this._flug = false;
        } else {
          $pic.addClass('js-zooming');
        }
        $picBef.removeClass('js-overlap');
        $pic.addClass('js-show js-overlap');
        setTimeout(function () {
          setTimeout(function () {
            $picBef.removeClass('js-zooming js-zooming-only js-show');
          }, 0);
          setTimeout(_this._switchPic.bind(_this), 1500);
        }, zoomDuration);
      };

      Hero.prototype._logoSwitching = function _logoSwitching() {
        var _this2 = this;

        setTimeout(function () {
          _this2.$logo.removeClass('js-visible');
          setTimeout(function () {
            _this2.$headText.addClass('js-visible');
          }, 800);
        }, 100);
      };

      return Hero;
    }();

    var World = function () {
      function World() {
        _classCallCheck(this, World);

        this.$ = $('#local-world');
        this.bgLeft = 0;
        setInterval(this._move.bind(this), 33);
      }

      World.prototype._move = function _move() {
        var _newLeft = this.bgLeft - 1;
        this.$.css('background-position', _newLeft + 'px top');
        this.bgLeft = _newLeft;
      };

      return World;
    }();

  }, { "../../../constants/Browsers": 2, "utils/GlanceNav": 3, "utils/domready": 8 }], 2: [function (require, module, exports) {
    "use strict";

    exports.__esModule = true;
    var ua = navigator.userAgent.toLowerCase();

    var win = ua.match(/windows/);
    var win_tablet = win && ua.match(/tablet pc/);
    var mac = ua.match(/macintosh/);

    var ie = ua.match(/msie/) || ua.match(/trident/);
    var ie8 = ua.match(/msie 8/);
    var ie9 = ua.match(/msie 9/);
    var ie10 = ua.match(/msie 10/);
    var edge = ua.match(/windows/) && ua.match(/edge/);
    var chrome = ua.match(/chrome/);
    var safari = ua.match(/safari/) && !ua.match(/chrome/);
    var firefox = ua.match(/firefox/);
    var opera = ua.match(/opera/);

    var iphone = ua.match(/iphone/);
    var ipod = ua.match(/ipod/);
    var ipad = ua.match(/ipad/);
    var ios = iphone || ipod || ipad;

    var android = ua.match(/android/);
    var androidMobile = android && ua.match(/mobile/);
    var androidTablet = android && !ua.match(/mobile/);
    var androidLegacy = ua.match(/android 2|android 4.0|android 4.1|android 4.2|android 4.3/);

    var ios_ver = null;
    var android_ver = null;
    try {
      if (ios) {
        //2-3桁
        ios_ver = (ua.split(' os ')[1] || '').split(' ')[0];
        var v1 = parseInt(ios_ver.split('_')[0]);
        var v2 = parseInt(ios_ver.split('_')[1] || 0);
        ios_ver = parseInt(((v1 < 10 ? '0' : '') + v1 + v2).substr(0, 3));
      }
      if (android) {
        //2桁
        android_ver = (ua.split('android ')[1] || '').substr(0, 3).split('.').join('');
        android_ver = parseInt(android_ver);
      }
    } catch (e) {
      alert(e);
    }

    var n_switch = ua.match(/nintendo switch/);
    var n_tablet = ua.match(/wiiu/) || n_switch;
    var n_sp = ua.match(/3ds|2ds/);
    var game = n_tablet || n_sp;

    var mobile = androidMobile || iphone || ipod || game;
    var tablet = androidTablet || ipad;

    var hasTouch = "ontouchstart" in window;
    var touch = hasTouch && !win;
    var desktop = !touch;

    var retina = window.devicePixelRatio >= 2;

    var canVideoPlaysInline = !!(desktop || ios && ios_ver >= 100);
    if (game) canVideoPlaysInline = false;

    exports['default'] = {
      win: win,
      win_tablet: win_tablet,
      mac: mac,
      ie: ie,
      ie8: ie8,
      ie9: ie9,
      ie10: ie10,
      edge: edge,
      chrome: chrome,
      safari: safari,
      firefox: firefox,
      opera: opera,
      ios: ios,
      iphone: iphone,
      ipad: ipad,
      android: android,
      androidLegacy: androidLegacy,
      androidMobile: androidMobile,
      androidTablet: androidTablet,
      ios_ver: ios_ver,
      android_ver: android_ver,
      game: game,
      n_switch: n_switch,
      mobile: mobile,
      tablet: tablet,
      touch: touch,
      desktop: desktop,
      retina: retina,
      canVideoPlaysInline: canVideoPlaysInline
    };

  }, {}], 3: [function (require, module, exports) {
    "use strict";

    exports.__esModule = true;

    var _Tween = require('utils/Tween');

    var _Tween2 = _interopRequireDefault(_Tween);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var $ = void 0;

    var GlanceNav = function GlanceNav($list, $arrow, $arrowLeft) {
      _classCallCheck(this, GlanceNav);

      $ = window.NCOMMON_$ || window.$;

      //sp時、右へボタンの表示切り替え
      var _reachRight = false;
      $list.on('scroll', function () {
        var max = $list[0].scrollWidth - $list.outerWidth();
        var reachRight = $list.scrollLeft() > max - 5;
        if (_reachRight === reachRight) return;
        _reachRight = reachRight;
        $arrow.switchClass('js-hidden', reachRight);
      });

      //右へボタン
      var tw = new _Tween2['default']();
      $arrow.on('touchend', function () {
        var start = $list.scrollLeft();
        var end = start + $list.outerWidth() * 0.8;
        tw.it({
          start: start,
          end: end,
          duration: 300,
          easing: 'easeOutQuad',
          onProgress: function onProgress(v) {
            $list.scrollLeft(v);
          }
        });
      });

      if ($arrowLeft) {
        //sp時、左へボタンの表示切り替え
        if ($list.scrollLeft() === 0) {
          $arrowLeft.addClass('js-hidden');
        }
        var _reachLeft = false;
        $list.on('scroll', function () {
          var min = 0;
          var reachLeft = $list.scrollLeft() < min + 5;
          if (_reachLeft === reachLeft) return;
          _reachLeft = reachLeft;
          $arrowLeft.switchClass('js-hidden', reachLeft);
        });

        //左へボタン
        $arrowLeft.on('touchend', function () {
          var start = $list.scrollLeft();
          var end = start - $list.outerWidth() * 0.8;
          tw.it({
            start: start,
            end: end,
            duration: 300,
            easing: 'easeOutQuad',
            onProgress: function onProgress(v) {
              $list.scrollLeft(v);
            }
          });
        });
      }
    };

    exports['default'] = GlanceNav;

  }, { "utils/Tween": 5 }], 4: [function (require, module, exports) {
    "use strict";

    /**
     * 2つの値を、指定された位置で補間する
     *
    
     currentTime:  current time
     startValue:  beginning value（Number/String or Number/Stringを含んだObject）
     endValue: final value（Number/String or Number/Stringを含んだObject）
     duration:  total duration
    
     */

    var _tweenFunctions = require('tween-functions');

    var _tweenFunctions2 = _interopRequireDefault(_tweenFunctions);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    module.exports = {
      it: function it(currentTime, startValue, endValue, duration, easing) {
        var _this = this;

        var easingFunc = _tweenFunctions2['default'][easing] || _tweenFunctions2['default'].linear;

        //Number/Stringの場合
        if (_.isNumber(startValue) || _.isString(startValue)) {
          return this._easingString(currentTime, startValue, endValue, duration, easingFunc);
        }

        //Numberを含んだObjectの場合
        return _.reduce(startValue, function (res, startNum, key) {
          var endNum = endValue[key];
          res[key] = _this._easingString(currentTime, startNum, endNum, duration, easingFunc);
          return res;
        }, {});
      },
      _easingString: function _easingString(currentTime, startValue, endValue, duration, easingFunc) {
        //数字の場合はそのままeasing関数に渡す
        if (_.isNumber(startValue) && _.isNumber(endValue)) return easingFunc(currentTime, startValue, endValue, duration);

        //文字列をいったんNumberに変換してからeasing関数に渡す
        var startStr = '' + startValue;
        var startNum = parseInt(startValue);
        var endNum = parseInt(endValue);
        var val = easingFunc(currentTime, startNum, endNum, duration);
        return startStr.split('' + startNum).join(val);
      }
    };

  }, { "tween-functions": 9 }], 5: [function (require, module, exports) {
    "use strict";

    exports.__esModule = true;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Interpolate = require('utils/Interpolate');
    var Util = require('utils/Util');

    var Tween = function () {
      function Tween() {
        var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        _classCallCheck(this, Tween);

        this._currentValue = defaultValue;
        this._bindedTick = this._tick.bind(this);
      }

      Tween.prototype.it = function it(props) {
        this._p = _.assign({
          start: this._currentValue,
          end: 0,
          duration: 0,
          delay: 0,
          easing: 'easeInOutQuad',
          onProgress: null,
          onComplete: null
        }, props);

        this.stop();

        this._startTime = new Date().getTime() + this._p.delay;
        this._tick();
      };

      Tween.prototype.stop = function stop() {
        Util.cancelAnimationFrame(this._tickId);
      };

      Tween.prototype._tick = function _tick() {
        var currentTime = Math.max(0, Math.min(this._p.duration, new Date().getTime() - this._startTime));
        this._currentValue = this._p.duration === 0 ? this._p.end : Interpolate.it(currentTime, this._p.start, this._p.end, this._p.duration, this._p.easing);

        this._p.onProgress && this._p.onProgress(this._currentValue, currentTime);

        if (currentTime >= this._p.duration) {
          //complete
          this._p.onComplete && this._p.onComplete();
        } else {
          //next tick
          this._tickId = Util.requestAnimationFrame(this._bindedTick);
        }
      };

      return Tween;
    }();

    exports['default'] = Tween;

  }, { "utils/Interpolate": 4, "utils/Util": 7 }], 6: [function (require, module, exports) {
    "use strict";

    /**
     * jquery / lodashに依存しない軽量Util
     */

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var WEEKS = '日 月 火 水 木 金 土'.split(' ');
    var MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    var Util = function () {
      function Util() {
        _classCallCheck(this, Util);
      }

      /**
       * scriptタグのパスからルートへの相対パスを取得する
       */
      Util.getDepthFromScript = function getDepthFromScript(thisScriptPath) {
        var depth = '';
        var head = document.getElementsByTagName('head')[0];
        Array.prototype.forEach.call(head.children, function (el, i) {
          if (el.tagName.toLowerCase() !== 'script') return;
          var src = el.getAttribute('src');
          if (!src) return;
          if (src.indexOf(thisScriptPath) < 0) return;
          depth = src.split(thisScriptPath)[0];
        });
        return depth;
      };

      /**
       * 非同期でcssを読み込み
       */


      Util.asyncLoadCSS = function asyncLoadCSS(path, callback) {
        var isDone = false;
        var head = document.getElementsByTagName("head")[0];
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = path;
        head.appendChild(link);

        link.onload = link.onreadystatechange = function () {
          // readyStateはie10以下用
          // ie11以降＋その他のモダンブラウザでは、onloadだけで判断すればOK
          var isComplete = !link.readyState || link.readyState === "loaded" || link.readyState === "complete";

          if (!isDone && isComplete) {
            isDone = true;

            //ieのメモリーリーク対策
            link.onload = link.onreadystatechange = null;

            callback && callback();
          }
        };
      };

      /**
       * 非同期でjsを読み込み
       */


      Util.asyncLoadJS = function asyncLoadJS(path, callback) {
        var isDone = false;
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement("script");
        script.src = path;
        head.appendChild(script);

        script.onload = script.onreadystatechange = function () {
          // readyStateはie10以下用
          // ie11以降＋その他のモダンブラウザでは、onloadだけで判断すればOK
          var isComplete = !script.readyState || script.readyState === "loaded" || script.readyState === "complete";

          if (!isDone && isComplete) {
            isDone = true;

            //ieのメモリーリーク対策
            script.onload = script.onreadystatechange = null;
            if (head && script.parentNode) {
              head.removeChild(script);
            }

            callback && callback();
          }
        };
      };

      /**
       * クッキーの取得・追加
       */


      Util.setCookie = function setCookie(data, period) {
        period = period || 7; //未指定なら7日間保存
        var cookies = '';
        for (var key in data) {
          cookies += key + '=' + encodeURIComponent(data[key]) + '; ';
        }

        var expire = new Date();
        expire.setTime(expire.getTime() + 1000 * 3600 * 24 * period);
        expire.toUTCString();

        cookies += 'expires=' + expire + ';';
        cookies += 'path=/;';

        document.cookie = cookies;
      };

      Util.getCookie = function getCookie() {
        var result = {};
        var cookies = document.cookie;

        if (cookies != '') {
          var cookieArray = cookies.split(';');
          for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i].split('=');
            var key = cookie[0].split(' ').join(''); //keyのみ空白除去
            var val = cookie[1];
            result[key] = decodeURIComponent(val);
          }
        }
        return result;
      };

      /**
       * Dateの数字の曜日を日本語に変換する
       */


      Util.week2jp = function week2jp(weekNum) {
        return WEEKS[weekNum] || '';
      };

      /**
       * Dateの数字の月を英語に変換する
       */


      Util.month2en = function month2en(monthNum) {
        return MONTHS[monthNum] || '';
      };

      /**
       * 【safari対策】new Date()に安全なフォーマットで変換した日付文字列を渡す
       */


      Util.date = function date(dateStr) {
        if (!dateStr) return new Date();

        //数字の場合
        if (!dateStr.indexOf) return new Date(dateStr);

        //文字列の場合
        dateStr = this.formatDate(dateStr);

        return new Date(dateStr);
      };

      Util.formatDate = function formatDate(dateStr) {
        var second = dateStr.split(' ')[1] || '';
        dateStr = dateStr.split(' ')[0];
        dateStr = dateStr.split('.').join('/').split('/').map(function (str, i) {
          if ((i == 1 || i == 2) && str.length === 1) return '0' + str;
          return str;
        }).join('/');
        if (second) {
          second = second.split(':').map(function (str, i) {
            if (str.length === 1) return '0' + str;
            return str;
          }).join(':');
          dateStr += ' ' + second;
        }
        return dateStr;
      };

      return Util;
    }();

    module.exports = Util;

  }, {}], 7: [function (require, module, exports) {
    "use strict";

    var _Browsers = require('constants/Browsers');

    var _Browsers2 = _interopRequireDefault(_Browsers);

    var _UtilLight2 = require('./Util-light');

    var _UtilLight3 = _interopRequireDefault(_UtilLight2);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var $ = void 0;


    var REGEXP_KANA = /[\u30a1-\u30f6]/g;
    var REGEXP_HIRA = /[\u3041-\u3096]/g;

    var Util = function (_UtilLight) {
      _inherits(Util, _UtilLight);

      function Util() {
        _classCallCheck(this, Util);

        return _possibleConstructorReturn(this, _UtilLight.apply(this, arguments));
      }

      /**
       * dom要素へのaddEventListener（フォールバックつき）
       */
      Util.on = function on(el, eventName, fn) {
        _.each(eventName.split(" "), function (e) {
          if (el.addEventListener) {
            el.addEventListener(e, fn, false);
          } else {
            el.attachEvent("on" + e, fn);
          }
        });
      };

      Util.off = function off(el, eventName, fn) {
        _.each(eventName.split(" "), function (e) {
          if (el.removeEventListener) {
            el.removeEventListener(e, fn, false);
          } else {
            el.detachEvent("on" + e, fn);
          }
        });
      };

      Util.imageLoad = function imageLoad(img, src, dummyWaitDuration, fn, fnErro) {
        var cnt = 0;
        var countup = function countup() {
          cnt++;
          if (cnt === 2) {
            fn();
          }
        };

        var isLoaded = false;
        var loaded = function loaded() {
          if (isLoaded) return;
          isLoaded = true;
          Util.off(img, 'load', loaded);
          countup();
        };

        Util.on(img, 'load', loaded);
        Util.on(img, 'error', function (err) {
          console.error('load image error: ' + src);
          fnErro && fnErro();
        });
        img.src = src;
        if (img.complete || img.readyState === "complete") {
          loaded();
        }

        var waitID = setTimeout(countup, dummyWaitDuration || 0);

        var cancelFunc = function cancelFunc() {
          Util.off(img, 'load', loaded);
          clearTimeout(waitID);
          img = null;
          fn = null;
        };
        return cancelFunc;
      };

      /**
       * DOM要素の座標・サイズを取得する
       * @param el
       */


      Util.getRect = function getRect(el) {
        var rect = el.getBoundingClientRect();
        return {
          x: rect.left,
          y: rect.top,
          width: el.offsetWidth,
          height: el.offsetHeight
        };
      };

      Util.getRadian = function getRadian(p, pBase) {
        var x = p.x;
        var y = p.y;
        if (pBase) {
          x -= pBase.x;
          y -= pBase.y;
        }
        return Math.atan2(y, x);
      };

      Util.radian2angle = function radian2angle(radian) {
        return radian / Math.PI * 180;
      };

      Util.angle2radian = function angle2radian(angle) {
        return angle * Math.PI / 180;
      };

      /**
       * マウス・タッチ系のイベントからクライアント座標を取得する
       * クライアント座標 ・・・ ブラウザの左上基準の座標（スクロール量に応じて変動する）
       * @param e onMouseDown/onMouseMove/onTouchStart/onTouchMove等のイベント
       */


      Util.getPoint = function getPoint(e) {
        if (e.touches && e.touches[0]) {
          return {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
          };
        }
        return {
          x: e.clientX,
          y: e.clientY
        };
      };

      /**
       * requestAnimationFrame（フォールバックつき）
       */


      Util.requestAnimationFrame = function requestAnimationFrame(fn) {
        var f = this.requestAnimationFrameFunction();
        if (f) {
          return f(fn);
        } else {
          return setTimeout(fn, 33);
        }
      };

      Util.cancelAnimationFrame = function cancelAnimationFrame(clearID) {
        var f = this.cancelAnimationFrameFunction();
        if (f) {
          return f(clearID);
        } else {
          return clearTimeout(clearID);
        }
      };

      Util.requestAnimationFrameFunction = function requestAnimationFrameFunction() {
        return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      };

      Util.cancelAnimationFrameFunction = function cancelAnimationFrameFunction() {
        return window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame;
      };

      /**
       * 文字列内の%key%をオブジェクトの対応するvalueで置き換え
       */

      Util.print = function print(str, obj) {
        return _.reduce(obj, function (res, val, key) {
          return res.split("%" + key + "%").join(val);
        }, str);
      };

      /**
       * DOM要素の「data-」属性をObjectにして返す
       */


      Util.attr2data = function attr2data(el) {
        var _this2 = this;

        return _.reduce(el.attributes, function (res, attr) {
          var k = attr.name.split('data-')[1];
          if (!k) return res;
          var v = attr.value;
          if (v.indexOf && (v.indexOf(',') >= 0 || v.indexOf(':') >= 0) && v.indexOf('//') < 0) {
            //「//」でURLをはじく
            v = v.split(',');
            v = _.map(v, function (v2) {
              return _this2.str2arr(v2, ':');
            });
          }
          res[k] = _this2.parseFloatOrRaw(v);
          return res;
        }, {});
      };

      Util.parseFloatOrRaw = function parseFloatOrRaw(v) {
        var num = parseFloat(v);
        if (isNaN(num)) return v;
        if (String(num) === v) return num;
        return v;
      };

      Util.parseIntOrRaw = function parseIntOrRaw(v) {
        var num = parseInt(v);
        if (isNaN(num)) return v;
        if (String(num) === v) return num;
        return v;
      };

      Util.str2arr = function str2arr(v, delimiter) {
        var _this3 = this;

        if (!v || !v.indexOf || v.indexOf(delimiter) < 0) return this.parseFloatOrRaw(v);
        return _.map(v.split(delimiter), function (v2) {
          return _this3.parseFloatOrRaw(v2);
        });
      };

      Util.string2query = function string2query(str) {
        str = decodeURIComponent(str);
        return _.reduce(str.split('&'), function (res, q) {
          var a = q.split('=');
          if (a.length === 2) {
            res[a[0]] = a[1];
          }
          return res;
        }, {});
      };

      Util.query2string = function query2string(query) {
        return _.reduce(query, function (res, v, k) {
          if (res !== '') res += '&';
          res += k + '=' + v;
          return res;
        }, '');
      };

      /**
       * jquery要素をコピープロテクトする
       */


      Util.copyProtect = function copyProtect($el) {
        $el.attr("unselectable", "on").attr("draggable", "false").css({
          '-moz-user-select': 'none',
          '-o-user-select': 'none',
          '-khtml-user-select': 'none',
          '-webkit-user-select': 'none',
          '-ms-user-select': 'none',
          'user-select': 'none'
        });
      };

      /**
       * numberを3桁カンマ区切りのstringに変換
       */


      Util.num2price = function num2price(num) {
        return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
      };

      /**
       * DOM要素にクラスを追加・削除する
       */


      Util.addClass = function addClass(el, className) {
        if (el.classList) el.classList.add(className); else el.className += ' ' + className;
      };

      Util.removeClass = function removeClass(el, className) {
        if (el.classList) el.classList.remove(className); else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      };

      Util.switchClass = function switchClass(el, className, isAdd) {
        if (isAdd) this.addClass(el, className); else this.removeClass(el, className);
      };

      /**
       * dom要素のmarginを含んだ高さを取得
       */


      Util.domHeight = function domHeight(el) {
        $ = $ || window.NCOMMON_$;
        var $el = $(el);
        return $el.outerHeight() + parseInt($el.css('margin-top')) + parseInt($el.css('margin-bottom'));
      };

      /**
       * 子要素の高さの合計を取得
       */


      Util.domChildrenHeight = function domChildrenHeight(el) {
        var _this4 = this;

        $ = $ || window.NCOMMON_$ || window.$;
        return _.sum(_.map($(el).children(), function (child) {
          return _this4.domHeight(child);
        }));
      };

      Util.initModules = function initModules($area, moduleList) {
        var _this5 = this;

        $ = $ || window.NCOMMON_$ || window.$;
        var initChildModules = function initChildModules($childArea) {
          _this5.initModules($childArea, moduleList);
        };

        var modules = _.compact(_.flatten(_.map(moduleList, function (Klass, key) {
          return _.map($area.find('[data-njs="' + key + '"]'), function (el) {
            var $el = $(el);
            var attr = 'data-inited-' + key;
            if (parseInt($el.attr(attr)) === 1) return null;
            var options = Util.attr2data(el);
            if (options.cancelauto) return null;
            if (_Browsers2['default'].game && options.cancelgame) return null;
            var instance = new Klass($el, options);
            $el.attr(attr, 1);
            $el.addClass('js-moduleready');
            $.data($el[0], 'njs-instance', instance);
            return instance;
          });
        })));

        _.forEach(modules, function (module) {
          module.init && module.init(initChildModules);
        });
      };

      Util.clearModules = function clearModules($area, moduleList) {
        $ = $ || window.NCOMMON_$ || window.$;
        _.forEach(moduleList, function (Klass, key) {
          _.forEach($area.find('[data-njs="' + key + '"]'), function (el) {
            var $el = $(el);
            var instance = $.data($el[0], 'njs-instance');
            instance && instance.clear && instance.clear();
          });
        });
      };

      /**
       * カタカナ・ひらがなの変換
       */

      Util.kana2hira = function kana2hira(src) {
        if (!src) return '';
        return src.replace(REGEXP_KANA, function (match) {
          var chr = match.charCodeAt(0) - 0x60;
          return String.fromCharCode(chr);
        });
      };

      Util.hira2kana = function hira2kana(src) {
        if (!src) return '';
        return src.replace(REGEXP_HIRA, function (match) {
          var chr = match.charCodeAt(0) + 0x60;
          return String.fromCharCode(chr);
        });
      };

      /**
       * 全角・半角の変換
       */


      Util.zen2han = function zen2han(src) {
        if (!src) return '';

        src = src.split('　').join(' '); //全角スペース→半角スペース

        //10進数の場合
        return src.replace(/[A-Za-z0-9]/g, function (s) {
          return String.fromCharCode(s.charCodeAt(0) + 65248);
        });
        //
        // //16進数の場合
        // return src.replace(/[A-Za-z0-9]/g, function(s) {
        //   return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
        // });
      };

      /**
       * 検索用に文字列をフォーマット
       */


      Util.str2search = function str2search(src) {
        if (!src) return '';
        src = src.toLowerCase();
        src = this.zen2han(src);
        src = this.kana2hira(src);
        return src;
      };

      return Util;
    }(_UtilLight3['default']);

    module.exports = Util;

  }, { "./Util-light": 6, "constants/Browsers": 2 }], 8: [function (require, module, exports) {
    'use strict';

    exports.__esModule = true;

    exports['default'] = function (fn) {
      if (document.readyState != 'loading') {
        fn();
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    };

  }, {}], 9: [function (require, module, exports) {
    'use strict';

    // t: current time, b: beginning value, _c: final value, d: total duration
    var tweenFunctions = {
      linear: function (t, b, _c, d) {
        var c = _c - b;
        return c * t / d + b;
      },
      easeInQuad: function (t, b, _c, d) {
        var c = _c - b;
        return c * (t /= d) * t + b;
      },
      easeOutQuad: function (t, b, _c, d) {
        var c = _c - b;
        return -c * (t /= d) * (t - 2) + b;
      },
      easeInOutQuad: function (t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
          return c / 2 * t * t + b;
        } else {
          return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
      },
      easeInCubic: function (t, b, _c, d) {
        var c = _c - b;
        return c * (t /= d) * t * t + b;
      },
      easeOutCubic: function (t, b, _c, d) {
        var c = _c - b;
        return c * ((t = t / d - 1) * t * t + 1) + b;
      },
      easeInOutCubic: function (t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
          return c / 2 * t * t * t + b;
        } else {
          return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
      },
      easeInQuart: function (t, b, _c, d) {
        var c = _c - b;
        return c * (t /= d) * t * t * t + b;
      },
      easeOutQuart: function (t, b, _c, d) {
        var c = _c - b;
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      easeInOutQuart: function (t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
          return c / 2 * t * t * t * t + b;
        } else {
          return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
      },
      easeInQuint: function (t, b, _c, d) {
        var c = _c - b;
        return c * (t /= d) * t * t * t * t + b;
      },
      easeOutQuint: function (t, b, _c, d) {
        var c = _c - b;
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      easeInOutQuint: function (t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
          return c / 2 * t * t * t * t * t + b;
        } else {
          return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
      },
      easeInSine: function (t, b, _c, d) {
        var c = _c - b;
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
      },
      easeOutSine: function (t, b, _c, d) {
        var c = _c - b;
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
      },
      easeInOutSine: function (t, b, _c, d) {
        var c = _c - b;
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
      },
      easeInExpo: function (t, b, _c, d) {
        var c = _c - b;
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
      },
      easeOutExpo: function (t, b, _c, d) {
        var c = _c - b;
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
      },
      easeInOutExpo: function (t, b, _c, d) {
        var c = _c - b;
        if (t === 0) {
          return b;
        }
        if (t === d) {
          return b + c;
        }
        if ((t /= d / 2) < 1) {
          return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        } else {
          return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
      },
      easeInCirc: function (t, b, _c, d) {
        var c = _c - b;
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
      },
      easeOutCirc: function (t, b, _c, d) {
        var c = _c - b;
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
      },
      easeInOutCirc: function (t, b, _c, d) {
        var c = _c - b;
        if ((t /= d / 2) < 1) {
          return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        } else {
          return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
      },
      easeInElastic: function (t, b, _c, d) {
        var c = _c - b;
        var a, p, s;
        s = 1.70158;
        p = 0;
        a = c;
        if (t === 0) {
          return b;
        } else if ((t /= d) === 1) {
          return b + c;
        }
        if (!p) {
          p = d * 0.3;
        }
        if (a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      },
      easeOutElastic: function (t, b, _c, d) {
        var c = _c - b;
        var a, p, s;
        s = 1.70158;
        p = 0;
        a = c;
        if (t === 0) {
          return b;
        } else if ((t /= d) === 1) {
          return b + c;
        }
        if (!p) {
          p = d * 0.3;
        }
        if (a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
      },
      easeInOutElastic: function (t, b, _c, d) {
        var c = _c - b;
        var a, p, s;
        s = 1.70158;
        p = 0;
        a = c;
        if (t === 0) {
          return b;
        } else if ((t /= d / 2) === 2) {
          return b + c;
        }
        if (!p) {
          p = d * (0.3 * 1.5);
        }
        if (a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
          return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        } else {
          return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
        }
      },
      easeInBack: function (t, b, _c, d, s) {
        var c = _c - b;
        if (s === void 0) {
          s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
      },
      easeOutBack: function (t, b, _c, d, s) {
        var c = _c - b;
        if (s === void 0) {
          s = 1.70158;
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      },
      easeInOutBack: function (t, b, _c, d, s) {
        var c = _c - b;
        if (s === void 0) {
          s = 1.70158;
        }
        if ((t /= d / 2) < 1) {
          return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        } else {
          return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
        }
      },
      easeInBounce: function (t, b, _c, d) {
        var c = _c - b;
        var v;
        v = tweenFunctions.easeOutBounce(d - t, 0, c, d);
        return c - v + b;
      },
      easeOutBounce: function (t, b, _c, d) {
        var c = _c - b;
        if ((t /= d) < 1 / 2.75) {
          return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
          return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        } else if (t < 2.5 / 2.75) {
          return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        } else {
          return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        }
      },
      easeInOutBounce: function (t, b, _c, d) {
        var c = _c - b;
        var v;
        if (t < d / 2) {
          v = tweenFunctions.easeInBounce(t * 2, 0, c, d);
          return v * 0.5 + b;
        } else {
          v = tweenFunctions.easeOutBounce(t * 2 - d, 0, c, d);
          return v * 0.5 + c * 0.5 + b;
        }
      }
    };

    module.exports = tweenFunctions;

  }, {}]
}, {}, [1]);
