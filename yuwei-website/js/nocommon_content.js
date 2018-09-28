! function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) { var a = "function" == typeof require && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} };
      t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r)
    } return n[o].exports
  } for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]); return s
}({
  1: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } } var _domready = require("utils/domready"),
      _domready2 = _interopRequireDefault(_domready),
      _autoInit = require("./ncommon_content/modules/auto-init"),
      _autoInit2 = _interopRequireDefault(_autoInit),
      $ = void 0;
    window.NCOMMON_MODULE_INIT = _autoInit2.default, (0, _domready2.default)(function () { $ = window.NCOMMON_$ || window.$, (0, _autoInit2.default)() })
  }, { "./ncommon_content/modules/auto-init": 28, "utils/domready": 37 }],
  2: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") }

    function _possibleConstructorReturn(self, call) { if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !call || "object" != typeof call && "function" != typeof call ? self : call }

    function _inherits(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    } exports.__esModule = !0; var _WindowStore = require("stores/WindowStore"),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      _eventemitter = require("eventemitter2"),
      _Tween = require("utils/Tween"),
      _Tween2 = _interopRequireDefault(_Tween),
      $ = void 0,
      Accordion = function (_EventEmitter) {
        function Accordion($el, options) { _classCallCheck(this, Accordion), $ = window.NCOMMON_$ || window.$; var _this = _possibleConstructorReturn(this, _EventEmitter.call(this)); return _this.$ = $el, _this.options = _.assign({ fade: 0, manual: 0, outerclick: 0, hidewithclose: 0, cell: "", line_pc: "", line_tab: "", line_sp: "" }, options || {}), _this._tw = new _Tween2.default, _this.options.fade && (_this._opacity = 1, _this._twFade = new _Tween2.default), _this } return _inherits(Accordion, _EventEmitter), Accordion.prototype.onChange = function (f) { this.on("change", f) }, Accordion.prototype.init = function () {
          var _this2 = this;
          this.$container = this._findOuter('[data-njs="accordion__container"]'), this.$heightbase = this._findOuter('[data-njs="accordion__heightbase"]'), this.$content = this._findOuter('[data-njs="accordion__content"]'), this.$toggle = this._findOuter('[data-njs="accordion__toggle"]'), this.$opener = this._findOuter('[data-njs="accordion__opener"]'), this.$closer = this._findOuter('[data-njs="accordion__closer"]'), this.$toggle.on("click", function () { return _this2.options.manual ? _this2.emit("change", !_this2._opened) : void _this2.switchState(!_this2._opened) }), this.$opener.on("click", function () { return _this2.options.manual ? _this2.emit("change", !0) : void _this2.switchState(!0) }), this.$closer.on("click", function () { return _this2.options.manual ? _this2.emit("change", !1) : void _this2.switchState(!1) }), this.options.outerclick && $("body").on("click", function (e) {
            if (_this2._opened && $(e.target).closest(_this2.$).length <= 0) {
              if (_this2.options.manual) return _this2.emit("change", !1);
              _this2.switchState(!1)
            }
          }), _WindowStore2.default.onResize(this._resized.bind(this)), this._resized(), this.switchState(!1, !0)
        }, Accordion.prototype._findOuter = function (expr) { return this.$.find(expr).not(this.$.find('[data-njs="accordion"] ' + expr)) }, Accordion.prototype._resized = function () {
          this._adjustHeightToGrid(); var contentH = Math.round(this.$content.outerHeight() || 0),
            baseH = Math.round(this.$heightbase.outerHeight() || 0);
          this._disabled = contentH <= baseH, 0 === this.$heightbase.length && (this._disabled = !1), this.$.switchClass("js-disabled", this._disabled)
        }, Accordion.prototype._adjustHeightToGrid = function () {
          var _this3 = this; if (this.options.cell) {
            var $cells = this.$content.find(this.options.cell),
            th = Math.round(this.$content.outerHeight() || 0),
            targetLine = this.options["line_" + _WindowStore2.default.getType()];
            targetLine && ! function () {
              targetLine = parseInt(targetLine); var baseTop = _this3.$content.offset().top,
                preTop = void 0,
                line = 0;
              _.find($cells, function (el) {
                var $cell = $(el),
                top = $cell.offset().top; return top !== preTop && (line++ , line === targetLine + 1) ? (th = top - baseTop, !0) : (preTop = top, !1)
              })
            }(), this.$heightbase.css("height", th)
          }
        }, Accordion.prototype.getCurrentHeight = function () { return this.$container.outerHeight() || 0 }, Accordion.prototype.getCurrentWrapperHeight = function () { return this.$.outerHeight() }, Accordion.prototype.getOffsetTop = function () { return this.$.offset().top }, Accordion.prototype.getOpened = function () { return this._opened }, Accordion.prototype.getDuration = function () {
          var th = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          baseHeight = 150,
          baseDuration = 200,
          dh = Math.abs(th - this.getCurrentHeight()),
          ratio = Math.min(2, Math.max(1, dh / baseHeight)); return Math.round(baseDuration * ratio)
        }, Accordion.prototype.switchState = function (opened, isDirect, _onProgress) {
          var _this4 = this; if (this._opened !== opened) {
          this._opened = opened, this.emit("toggle-start"), this.emit(opened ? "open-start" : "close-start"), opened || this.$.removeClass("js-opencomplete"), this.options.hidewithclose && opened && this.$content.css("display", "block"); var $dest = opened ? this.$content : this.$heightbase,
            $source = opened ? this.$heightbase : this.$content,
            start = this.getCurrentHeight(),
            end = $dest.outerHeight() || 0,
            duration = 0,
            delay = 0; if (isDirect || (duration = this.getDuration(end)), this.options.fade) {
              delay = opened ? 100 : 500; var fadeDuration = 500,
                fadeDelay = opened ? duration : 0;
              isDirect && (fadeDuration = fadeDelay = 0), this._twFade.it({ start: this._opacity, end: opened ? 1 : 0, duration: fadeDuration, delay: fadeDelay, easing: "easeInOutSine", onProgress: function (v) { _this4._opacity = v, _this4.$content.css("opacity", v) } })
            } var easing = "easeInOutQuad";
            this._tw = this._tw || new _Tween2.default, this._tw.it({ start: start, end: end, duration: duration, delay: delay, easing: easing, onProgress: function (v, currentTime) { _this4.$container.css("height", v), _onProgress && _onProgress(v, currentTime) }, onComplete: function () { _this4.$container.css("height", ""), $dest.css("position", "relative"), $source.css({ position: "absolute", left: 0, top: 0 }), opened && _this4.$.addClass("js-opencomplete"), _this4.options.hidewithclose && !opened && _this4.$content.css("display", "none"), _this4.emit("toggle-complete"), _this4.emit(opened ? "open-complete" : "close-complete") } }), this.$toggle.switchClass("js-active", opened), this.$opener.switchClass("js-hidden", opened), this.$closer.switchClass("js-hidden", !opened), this.$.switchClass("js-opened", opened), this.options.manual || this.emit("change", opened)
          }
        }, Accordion
      }(_eventemitter.EventEmitter2);
    exports.default = Accordion
  }, { eventemitter2: 38, "stores/WindowStore": 30, "utils/Tween": 33 }],
  3: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var _Browsers = require("constants/Browsers"),
      _Browsers2 = _interopRequireDefault(_Browsers),
      _WindowStore = require("stores/WindowStore"),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      $ = void 0,
      DELAY_CNT = 0,
      LOW_MODE = _Browsers2.default.ie,
      Bg = function () {
        function Bg($el, options) {
          if (_classCallCheck(this, Bg), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.options = _.assign({ src: "", src_tab: "", src_sp: "", src_low: "", delay: !1, lazyload: !1 }, options || {}), !this.options.src) return console.error("[Bg] data-src is required."); if (this.options.src_tab || (this.options.src_tab = this.options.src), this.options.src_low || (this.options.src_low = this.options.src), this._srces = { pc: this.options.src, tab: this.options.src_tab, sp: this.options.src_sp, low: this.options.src_low }, this.options.delay) {
            var delay = 300 * DELAY_CNT++;
            setTimeout(this._start.bind(this), delay)
          } else this._start()
        } return Bg.prototype._start = function () { _WindowStore2.default.onResponsive(this._break.bind(this)), this._break() }, Bg.prototype._break = function () {
          var type = _WindowStore2.default.getType();
          LOW_MODE && (type = "low"); var src = this._srces[type];
          this._src !== src && (this._src = src, this.$.css("background-image", "url(" + src + ")"))
        }, Bg
      }();
    exports.default = Bg
  }, { "constants/Browsers": 29, "stores/WindowStore": 30 }],
  4: [function (require, module, exports) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") }

    function _possibleConstructorReturn(self, call) { if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !call || "object" != typeof call && "function" != typeof call ? self : call }

    function _inherits(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    } var _eventemitter = require("eventemitter2"),
      $ = void 0,
      Checkbox = function (_EventEmitter) {
        function Checkbox($el, options) { _classCallCheck(this, Checkbox), $ = window.NCOMMON_$ || window.$; var _this = _possibleConstructorReturn(this, _EventEmitter.call(this)); return _this.$ = $el, _this.options = _.assign({ initialvalues: [], useinput: !1, hasall: !1, radio: !1 }, options), _.isArray(_this.options.initialvalues) || (_this.options.initialvalues = [_this.options.initialvalues]), _this._$btns = _.map(_this.$.find('[data-njs="checkbox__item"], input[type="checkbox"]'), function (el) { var $btn = $(el); return $btn.kill = function () { $btn.isKilled = !0, $btn.removeClass("js-active") }, _this.options.useinput ? ($btn.value = $btn.attr("value"), $btn.on("change", function (e) { e.preventDefault(), _this.activate($btn.value) })) : ($btn.value = $btn.attr("data-value"), $btn.on("click", function (e) { e.preventDefault(), _this.activate($btn.value) })), $btn }), _this._values = _this.options.initialvalues, _this._updateBtnState(), _this } return _inherits(Checkbox, _EventEmitter), Checkbox.prototype.onChange = function (f) { this.on("change", f) }, Checkbox.prototype.getValues = function () { return this._values }, Checkbox.prototype.getBtns = function () { return this._$btns }, Checkbox.prototype.activate = function (value, withNoEvent) {
          var uncheck = _.includes(this._values, value);
          this.options.radio ? this._values = [value] : uncheck ? this._values = _.without(this._values, value) : this._values.push(value), this.options.hasall && ("all" === value ? this._values = ["all"] : uncheck ? 0 === this._values.length && (this._values = ["all"]) : (this._values = _.without(this._values, "all"), this._values.length == this._$btns.length - 1 && (this._values = ["all"]))), this._updateBtnState(), this.options.radio && uncheck || withNoEvent || this.emit("change", this._values)
        }, Checkbox.prototype._updateBtnState = function () {
          var _this2 = this;
          _.forEach(this._$btns, function ($btn) {
            if (!$btn.isKilled) {
              var active = _.includes(_this2._values, $btn.value);
              _this2.options.useinput ? $btn.prop("checked", active) : $btn.switchClass("js-active", active)
            }
          })
        }, Checkbox
      }(_eventemitter.EventEmitter2);
    module.exports = Checkbox
  }, { eventemitter2: 38 }],
  5: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var _Util = require("utils/Util"),
      _Util2 = _interopRequireDefault(_Util),
      $ = void 0,
      Counter = function () {
        function Counter($el, options) {
        _classCallCheck(this, Counter), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.options = _.assign({ convertprice: !1, steps: 10, stepduration: 33 }, options || {}), this._bindedTick = this._tick.bind(this); var initialNum = parseInt(this.$.text());
          isNaN(initialNum) && (initialNum = 0), this.setValue(initialNum)
        } return Counter.prototype.setValue = function (value) { this._value !== value && (this._value = value, this.options.convertprice && (value = _Util2.default.num2price(value)), this.$.text(value)) }, Counter.prototype.animateValue = function (value) { value = Math.round(value), this._targetValue !== value && (this._targetValue = value, this._count = 0, this._startValue = this._value, this._speed = (this._targetValue - this._startValue) / this.options.steps, this._tick()) }, Counter.prototype._tick = function () {
        clearTimeout(this._tickID), this._count++; var value = Math.round(this._startValue + this._speed * this._count);
          this.setValue(value), value !== this._targetValue && (this._tickID = setTimeout(this._bindedTick, this.options.stepduration))
        }, Counter
      }();
    exports.default = Counter
  }, { "utils/Util": 36 }],
  6: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var _Tween = require("utils/Tween"),
      _WindowStore = (_interopRequireDefault(_Tween), require("stores/WindowStore")),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      _Url = require("utils/Url"),
      _Browsers = (_interopRequireDefault(_Url), require("constants/Browsers")),
      $ = (_interopRequireDefault(_Browsers), void 0),
      BODIES = {},
      COUNT = {},
      CONFIGS = {},
      Gallery = function () {
        function Gallery($el, options) {
        _classCallCheck(this, Gallery), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.options = _.assign({ group: "noname", num: null, type: null, title: "", thumb: null, image: null, videoid: null }, options || {}), this.options.thumb && this.$.css("background-image", "url(" + this.options.thumb + ")"); var group = this.options.group;
          BODIES[group] = BODIES[group] || new Body, null === this.options.num && (void 0 === COUNT[group] && (COUNT[group] = 0), this.options.num = COUNT[group], COUNT[group]++), CONFIGS[group] = CONFIGS[group] || [], CONFIGS[group][this.options.num] = _.reduce(this.options, function (res, v, k) { return res[k] = res[k] || v, res }, _.assign({}, CONFIGS[group][this.options.num]))
        } return Gallery.prototype.init = function (initChildModules) {
          var _this = this;
          BODIES[this.options.group].init(CONFIGS[this.options.group], initChildModules), this.$.on("click", function (e) { e.preventDefault(), BODIES[_this.options.group].open(_this.options.num) })
        }, Gallery
      }(),
      Body = function () {
        function Body() { _classCallCheck(this, Body), this.$ = $('\n<div data-njs="gallery__body">\n  <div data-njs="gallery__bg"></div>\n  <div data-njs="gallery__outer">\n    <div data-njs="gallery__inner">\n      <div data-njs="gallery__container"></div>\n    </div>\n  </div>\n  <div data-njs="gallery__close" class="ncommon-iconRect ncommon-iconRect--close ncommon-u-linkbox">\n    <i class="ncommon-icon" data-shape="close"><i><i></i></i></i>\n  </div>\n</div>\n').appendTo(document.body), this.$html = $("html"), this.$body = $("body"), this.$outer = this.$.find('[data-njs="gallery__outer"]'), this.$inner = this.$.find('[data-njs="gallery__inner"]'), this.$container = this.$.find('[data-njs="gallery__container"]'), this._bindedResize = this._resized.bind(this), this.$.on("click", this._clicked.bind(this)) } return Body.prototype.init = function (configs, initChildModules) { this._inited || (this._inited = !0, this._configs = configs, this.$container.html(this._makeDOM()), this._single = 1 === configs.length, this._single && (this.$.addClass("js-single"), this.$.find('[data-njs="gallery__itemInfo"], [data-njs="nav"], [data-njs="switcher__prev"], [data-njs="switcher__next"]').remove()), initChildModules(this.$container), this._switcher = this.$.find('[data-njs="switcher"]').data("njs-instance")) }, Body.prototype._makeDOM = function () { return '\n    <div data-njs="switcher" data-initialnum="-1">\n      <div data-njs="switcher__container">' + this._makeContents() + '</div>\n      <div data-njs="switcher__prev" class="ncommon-iconRect ncommon-iconRect--pager ncommon-u-linkbox">\n        <i class="ncommon-icon" data-shape="left"><i><i></i></i></i>\n      </div>\n      <div data-njs="switcher__next" class="ncommon-iconRect ncommon-iconRect--pager ncommon-u-linkbox">\n        <i class="ncommon-icon" data-shape="right"><i><i></i></i></i>\n      </div>\n      <div data-njs="nav">\n        <div data-njs="scroller">\n          <div data-njs="scroller__wrap">\n              <div data-njs="scroller__clip">\n                <div data-njs="scroller__container">\n                  ' + this._makeNavItems() + '\n                </div>\n              </div>\n          </div>\n          <div data-njs="scroller__prev"></div>\n          <div data-njs="scroller__next"></div>\n        </div>\n      </div>\n    </div>\n    ' }, Body.prototype._makeContents = function () { var _this2 = this; return _.map(this._configs, function (conf, i) { return '\n      <div data-njs="switcher__content">\n        <div data-njs="gallery__itemStage">\n          ' + _this2._makeContentBody(conf) + '\n        </div>\n        <div data-njs="gallery__itemInfo">\n          <div data-njs="gallery__itemTitle">' + conf.title + "</div>\n        </div>\n      </div>\n      " }).join("") }, Body.prototype._makeContentBody = function (conf) { return "IMAGE" === conf.type ? '\n        <div data-njs="gallery__itemImage" style="background-image: url(' + conf.image + ')"></div>\n      ' : "MOVIE" === conf.type ? '\n        <div data-njs="gallery__itemMovie">\n          <div data-njs="ytplayer" data-videoid="' + conf.videoid + '"><div data-njs="ytplayer__body"></div></div>\n        </div>\n      ' : "" }, Body.prototype._makeNavItems = function () { return _.map(this._configs, function (conf, i) { return '\n      <div data-njs="scroller__item">\n        <div data-njs="nav__item" data-type="' + conf.type + '" style="background-image: url(' + (conf.thumb || conf.image) + ')"><span></span></div>\n      </div>\n      ' }).join("") }, Body.prototype.open = function (num) { this.$.addClass("js-visible"), this.$outer.scrollTop(0), this._switcher.activate(num), _WindowStore2.default.switchModalState(!0), this._activateResize(!0) }, Body.prototype._clicked = function (e) { $.contains(this.$container[0], e.target) || this._close() }, Body.prototype._close = function () { this._href = null, this.$.removeClass("js-visible"), this._activateResize(!1), this._switcher.activate(-1), clearTimeout(this._delayID), this._delayID = setTimeout(function () { _WindowStore2.default.switchModalState(!1) }, 400) }, Body.prototype._activateResize = function (isResizeActive) { isResizeActive ? (_WindowStore2.default.onResize(this._bindedResize), this._resized()) : _WindowStore2.default.offResize(this._bindedResize) }, Body.prototype._resized = function () {
          var sh = _WindowStore2.default.getHeight(),
          h = this.$container.outerHeight(),
          padding = Math.max(0, Math.round(.5 * (sh - h)));
          h > sh && (padding = 40), this.$outer.css({ "padding-top": padding, "padding-bottom": padding })
        }, Body
      }();
    exports.default = Gallery
  }, { "constants/Browsers": 29, "stores/WindowStore": 30, "utils/Tween": 33, "utils/Url": 34 }],
  7: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var _WindowStore = require("stores/WindowStore"),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      _Util = require("utils/Util"),
      _Util2 = _interopRequireDefault(_Util),
      $ = void 0,
      Heightline = function () {
        function Heightline($el, options) { _classCallCheck(this, Heightline), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.options = _.assign({ item: "", col: "", targets: [], oneline: !1 }, options || {}), _.isArray(this.options.targets) || (this.options.targets = [this.options.targets]), _WindowStore2.default.onResize(this._resizeHdl.bind(this)), this._resizeHdl() } return Heightline.prototype._resizeHdl = function () { this.options.item ? this._adjectForItem() : this.options.col && this._adjectForCol() }, Heightline.prototype._adjectForItem = function () {
          var _this = this,
          $allItems = _.map(this.$.find(this.options.item), function (el, i) { return $(el) }); if (0 !== $allItems.length) {
            var colNum = Math.round(this.$.outerWidth() / $allItems[0].outerWidth());
            this.options.oneline && (colNum = $allItems.length), _.forEach(_.chunk($allItems, colNum), function ($items) {
              _.forEach(_this.options.targets, function (targetExpr) {
                var maxH = _.reduce($items, function (res, $item) { var h = _Util2.default.domChildrenHeight($item.find(targetExpr)[0]); return res = Math.max(res, h) }, 0);
                _.forEach($items, function ($item) {
                  var $target = $item.find(targetExpr);
                  $target.css("height", maxH)
                })
              })
            })
          }
        }, Heightline.prototype._adjectForCol = function () {
          var _this2 = this,
          $targets = _.map(this.options.targets, function (targetExpr) {
            var elCnt = 0,
            cols = _.map(_this2.$.find(_this2.options.col), function (el) {
              var $col = $(el),
              $els = $col.find(targetExpr); return elCnt = Math.max(elCnt, $els.length), $els
            }); return cols.elCnt = elCnt, cols
          });
          _.forEach($targets, function (cols) {
            _.forEach(_.range(cols.elCnt), function (i) {
              var maxH = _.reduce(cols, function (res, $els) { var $el = $els.eq(i); return $el && $el.length > 0 && (res = Math.max(res, _Util2.default.domChildrenHeight($el[0]))), res }, 0);
              _.forEach(cols, function ($els) { $els.eq(i).css("height", maxH) })
            })
          })
        }, Heightline
      }();
    exports.default = Heightline
  }, { "stores/WindowStore": 30, "utils/Util": 36 }],
  8: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var _WindowStore = require("stores/WindowStore"),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      $ = void 0,
      HideSeek = function () {
        function HideSeek($el, options) { _classCallCheck(this, HideSeek), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.options = _.assign({}, options || {}), this.$html = $("html"), this._visible = !0, this._startTop = 0, _WindowStore2.default.onAll(this._resized.bind(this), this._scrolled.bind(this)) } return HideSeek.prototype.switchDisabled = function (disabled) { this._disabled !== disabled && (this._disabled = disabled) }, HideSeek.prototype._resized = function () { this._h = this.$.outerHeight(), this._scrolled() }, HideSeek.prototype._scrolled = function () {
          var top = _WindowStore2.default.getScrollTop(),
          dir = top >= this._oldTop ? 1 : -1;
          this._oldTop = top, this._startTop = Math.min(top, this._startTop); var maxTop = this._startTop + this._h,
            visible = top < maxTop;
          top >= maxTop && (visible = !1), dir < 0 && (visible = !0), this._switchVisible(visible)
        }, HideSeek.prototype._switchVisible = function (visible) { this._getIsModalOpened() || this._disabled || this._visible !== visible && (this._visible = visible, visible && (this._startTop = _WindowStore2.default.getScrollTop()), this.$.switchClass("js-hidden", !visible)) }, HideSeek.prototype._getIsModalOpened = function () { return 1 === parseInt(this.$html.attr("data-modalopened")) }, HideSeek
      }();
    exports.default = HideSeek
  }, { "stores/WindowStore": 30 }],
  9: [function (require, module, exports) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") }

    function _possibleConstructorReturn(self, call) { if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !call || "object" != typeof call && "function" != typeof call ? self : call }

    function _inherits(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    } exports.__esModule = !0; var _eventemitter = require("eventemitter2"),
      $ = void 0,
      Launcher = function (_EventEmitter) {
        function Launcher($el, options) { _classCallCheck(this, Launcher), $ = window.NCOMMON_$ || window.$; var _this = _possibleConstructorReturn(this, _EventEmitter.call(this)); return _this.$ = $el, _this.options = _.assign({ target: void 0 }, options || {}), _this.$target = _this.options ? $(_this.options.target) : null, _this.$target && (_this.$.on("click", _this._toggle.bind(_this)), _this.$target.find('[data-njs="launcher__deactivator"]').on("click", _this._toggle.bind(_this))), _this._active = !1, _this } return _inherits(Launcher, _EventEmitter), Launcher.prototype.onChange = function (f) { this.on("change", f) }, Launcher.prototype._toggle = function () { this._activate(!this._active) }, Launcher.prototype._activate = function (active) { this._active !== active && (this._active = active, this.$.switchClass("js-active", active), this.$target.switchClass("js-active", active), this.emit("change", active)) }, Launcher
      }(_eventemitter.EventEmitter2);
    exports.default = Launcher
  }, { eventemitter2: 38 }],
  10: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var _Browsers = require("constants/Browsers"),
      _Browsers2 = _interopRequireDefault(_Browsers),
      _Tween = require("utils/Tween"),
      _Tween2 = _interopRequireDefault(_Tween),
      _WindowStore = require("stores/WindowStore"),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      $ = void 0,
      HIDE_DELAY = _Browsers2.default.touch ? 0 : 300,
      MegaDrop = function () {
        function MegaDrop($el, options) { _classCallCheck(this, MegaDrop), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.options = _.assign({ bottom: 0 }, options || {}) } return MegaDrop.prototype.init = function () {
          var _this = this;
          this.$body = $("body"), this.$content = this.$.find('[data-njs="megadrop__content"]'), this.$clip = this.$.find('[data-njs="megadrop__contentClip"]'), this.$inner = this.$.find('[data-njs="megadrop__contentInner"]'), this._contents = _.reduce(this.$.find('[data-njs="megadrop__content"]'), function (res, el) { var content = new Content($(el), _this.options); return res[content.group] = content, res }, {}), this._buttons = _.map(this.$.find('[data-njs="megadrop__buttonHover"], [data-njs="megadrop__buttonClick"]'), function (el, i) { return new Button($(el), i, _this._activate.bind(_this)) }), this._groups = _.map(this._buttons, "group"), this._types = _.map(this._buttons, "type"), this._keys = _.map(this._buttons, "key"), this._items = _.map(this.$.find('[data-njs="megadrop__contentItem"]'), function (el, i) { return new Item($(el), _this._types[i], i, _this._activate.bind(_this)) }), this._hideSeek = this.$.find('[data-njs="hideseek"]').data("njs-instance"), this._num = -1
        }, MegaDrop.prototype._activate = function (num, noDelay) {
          var _this2 = this;
          clearTimeout(this._shortDelayID), this._shortDelayID = setTimeout(function () {
            if (_this2._num !== num) {
              var close2open = _this2._num === -1 && num >= 0;
              _this2._num = num, _this2.$.attr("data-active", _this2._keys[num] || ""), _this2._bindBodyClick(num >= 0), clearTimeout(_this2._delayID); var delay = noDelay ? 0 : HIDE_DELAY;
              num >= 0 && (delay = 0), close2open && !_Browsers2.default.touch && (delay = 300), delay > 0 ? _this2._delayID = setTimeout(_this2._doActivate.bind(_this2, num), delay) : _this2._doActivate(num)
            }
          }, _Browsers2.default.touch ? 0 : 33)
        }, MegaDrop.prototype._doActivate = function (num) {
          var _this3 = this,
          visible = num >= 0,
          newGroup = this._groups[num];
          _.forEach(this._buttons, function (button, i) { button.activate(i === num) }), _.forEach(this._contents, function (content) {
            var active = content.group === newGroup,
            newItem = active ? _this3._items[num] : null;
            content.activate(active, newGroup, newItem)
          }), this._hideSeek && this._hideSeek.switchDisabled(visible), _Browsers2.default.touch && _WindowStore2.default.switchModalState(visible)
        }, MegaDrop.prototype._bindBodyClick = function (isBind) {
          var _this4 = this;
          this._bindedBodyClick !== isBind && (this._bindedBodyClick = isBind, clearTimeout(this._bindedBodyClickID), this._bindedBodyClickID = setTimeout(function () {
            var eventName = _Browsers2.default.touch ? "touchstart" : "click";
            isBind ? (_this4._bindedBodyClicked = _this4._bindedBodyClicked || _this4._bodyClicked.bind(_this4), _this4.$body.on(eventName, _this4._bindedBodyClicked)) : _this4.$body.off(eventName, _this4._bindedBodyClicked)
          }, isBind ? 33 : 0))
        }, MegaDrop.prototype._bodyClicked = function (e) {
          var outerClicked = !$.contains(this.$[0], e.target),
          emptyClipClicked = this.$clip.is(e.target);
          (outerClicked || emptyClipClicked) && this._activate(-1, !0)
        }, MegaDrop
      }(),
      Content = function () {
        function Content($el, options) { _classCallCheck(this, Content), this.$ = $el, this.options = options, this.group = this.$.attr("data-group") || "noname", this._active = !1, this._tw = new _Tween2.default, this.$clip = this.$.find('[data-njs="megadrop__contentClip"]'), this.$inner = this.$.find('[data-njs="megadrop__contentInner"]'), _WindowStore2.default.onResize(this._resized.bind(this)), this._resized() } return Content.prototype.activate = function (active, newGroup, newItem) {
          var _this5 = this,
          oldItem = this._currentItem,
          easing = this._active ? "easeInOutQuart" : "easeOutQuart";
          this._active = active; var end = newItem ? newItem.getHeight() : 0;
          this._maxH && (end = Math.min(this._maxH, end)), this.$.switchClass("js-active", active, newGroup ? 0 : HIDE_DELAY), this._tw.it({ start: this.$inner.outerHeight(), end: end, duration: 500, delay: 0, easing: easing, onProgress: function (h) { _this5.$inner.css("height", h), _this5.options.bottom && _this5.$clip.css("height", h) }, onComplete: function () { _this5.$inner.css("height", end > 0 ? "auto" : ""), _this5._resized() } }), oldItem && oldItem.activate(!1), newItem && newItem.activate(!0), this._currentItem = newItem
        }, Content.prototype._resized = function () {
          if (this.options.bottom) {
            var currentH = this._currentItem ? this._currentItem.getHeight() : 0;
            this._maxH = _WindowStore2.default.getHeight() - 40; var h = this._num > 0 ? Math.min(currentH, this._maxH) : "";
            this.$clip.css("height", h)
          }
        }, Content
      }(),
      Button = function () {
        function Button($el, num, callback) {
          var _this6 = this;
          _classCallCheck(this, Button), this.$ = $el, this.group = this.$.attr("data-group") || "noname", this.type = "megadrop__buttonHover" === this.$.attr("data-njs") ? "hover" : "click", _Browsers2.default.touch && (this.type = "click"), this.key = this.$.attr("data-key"), "hover" === this.type ? this.$.on("mouseenter", function () { return callback(num) }).on("mouseleave", function () { return callback(-1) }) : this.$.on("click", function (e) { e.preventDefault(), callback(_this6._active ? -1 : num, !0) })
        } return Button.prototype.activate = function (active) { this._active !== active && (this._active = active, this.$.switchClass("js-active", active)) }, Button
      }(),
      Item = function () {
        function Item($el, type, num, callback) { _classCallCheck(this, Item), this.$ = $el, "hover" === type && this.$.on("mouseenter", function () { return callback(num) }).on("mouseleave", function () { return callback(-1) }) } return Item.prototype.getHeight = function () { return this.$.outerHeight() }, Item.prototype.activate = function (active) { this._active !== active && (this._active = active, this.$.switchClass("js-active", active), clearTimeout(this._focusDelayID), active && _Browsers2.default.desktop ? this._focusDelayID = setTimeout(this._switchFocus.bind(this), 500) : this._switchFocus()) }, Item.prototype._switchFocus = function () { this.$.find('[data-njs="megadrop__focusable"]')[this._active ? "focus" : "blur"]() }, Item
      }();
    exports.default = MegaDrop
  }, { "constants/Browsers": 29, "stores/WindowStore": 30, "utils/Tween": 33 }],
  11: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0;
    var _Tween = require("utils/Tween"),
      _WindowStore = (_interopRequireDefault(_Tween), require("stores/WindowStore")),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      _Url = require("utils/Url"),
      _Url2 = _interopRequireDefault(_Url),
      _Browsers = require("constants/Browsers"),
      _Browsers2 = _interopRequireDefault(_Browsers),
      $ = window.NCOMMON_$ || window.$,
      BODY = void 0,
      Modal = function () {
        function Modal($el, options) { _classCallCheck(this, Modal), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.options = _.assign({}, options || {}), BODY || (BODY = new Body) }
        return Modal.prototype.init = function () {
          var _this = this;
          this.$.on("click", function (e) {
            e.preventDefault(); var href = _this.$.attr("href");
            BODY.open(href)
          })
        }, Modal
      }(),
      Body = function () {
        function Body() { _classCallCheck(this, Body), this.$ = $('\n<div data-njs="modal__body">\n  <div data-njs="modal__frame"><iframe src="javascript:false;"></iframe></div>\n  <div data-njs="modal__bg"></div>\n  <div data-njs="modal__outer">\n    <div data-njs="modal__inner">\n      <div data-njs="modal__close" class="ncommon-iconRect ncommon-iconRect--close ncommon-u-linkbox">\n        <i class="ncommon-icon" data-shape="close"><i><i></i></i></i>\n      </div>\n      <div data-njs="modal__container"></div>\n    </div>\n  </div>\n</div>\n').appendTo(document.body), this.$html = $("html"), this.$body = $("body"), this.$frame = this.$.find('[data-njs="modal__frame"] iframe'), this.$outer = this.$.find('[data-njs="modal__outer"]'), this.$inner = this.$.find('[data-njs="modal__inner"]'), this.$container = this.$.find('[data-njs="modal__container"]'), this._bindedResize = this._resized.bind(this), this.$.on("click", this._clicked.bind(this)) } return Body.prototype.open = function (href) { this._href = href; var query = _Url2.default.parse(href).query; return "iframe" === query.type && _Browsers2.default.touch ? this._popup(query.self) : (this.$.removeClass("js-loaded").addClass("js-visible"), this.$container.html(""), _WindowStore2.default.switchModalState(!0), this.$inner.css("width", ""), "iframe" === query.type ? (this._type = "iframe", this.$inner.css("width", query.width), this._loadIframe(query)) : "slide" === query.type ? (this._type = "image", this._loadImage()) : _.includes(href, ".mp4") ? (this._type = "movie", this._loadMovie()) : (this._type = "ajax", this.$inner.css("width", query.width), this._loadAjax()), void this.$.attr("data-type", this._type)) }, Body.prototype._popup = function (isSelf) { isSelf ? location.href = this._href : window.open(this._href) }, Body.prototype._loadIframe = function (query) { this.$container.html('\n    <div data-njs="modal__content">\n      <iframe src="' + this._href + '" style="width: ' + query.width + "px; height: " + query.height + 'px;"></iframe>\n    </div>\n    '), this.$container.find("iframe").on("load", this._show.bind(this)) }, Body.prototype._loadImage = function () { this.$container.html('\n    <div data-njs="modal__content">\n      <img src="' + this._href + '" />\n    </div>\n    '), this.$container.find("img").on("load", this._show.bind(this)) }, Body.prototype._loadMovie = function () { this.$container.html('\n    <div data-njs="modal__content">\n      <video autoplay playsinline controls src="' + this._href + '" />\n    </div>\n    '), setTimeout(this._show.bind(this), 1) }, Body.prototype._loadAjax = function () { this._currentXHR = $.ajax({ url: this._href, type: "get", dataType: "html", success: this._ajaxComplete.bind(this) }) }, Body.prototype._ajaxComplete = function (res) { this._currentXHR = null, res = res.replace(/<body.*?>/, "<body>"), res = res.split("<body>")[1].split("</body>")[0], res = res.replace(/<script.*script>/gi, ""), res = res.replace(/<noscript.*noscript>/gi, ""), this.$container.append($(res).filter('[data-njs="modal__content"]')), this.$frame[0].contentWindow.location.replace(this._href), clearTimeout(this._delayID), this._delayID = setTimeout(this._show.bind(this), 200) }, Body.prototype._show = function () { this.$.addClass("js-loaded"), this._activateResize(!0) }, Body.prototype._clicked = function (e) { $.contains(this.$container[0], e.target) || this._close() }, Body.prototype._close = function () {
          var _this2 = this;
          this._href = null, this.$.removeClass("js-visible js-loaded"), this._activateResize(!1), clearTimeout(this._delayID), this._delayID = setTimeout(function () { _this2.$container.html(""), _WindowStore2.default.switchModalState(!1) }, 400)
        }, Body.prototype._activateResize = function (isResizeActive) { isResizeActive ? (_WindowStore2.default.onResize(this._bindedResize), this._resized()) : _WindowStore2.default.offResize(this._bindedResize) }, Body.prototype._resized = function () {
          var sh = _WindowStore2.default.getHeight(),
          h = this.$inner.outerHeight(); if ("movie" === this._type) {
            var minH = this.$container.outerWidth() / 16 * 9;
            h = Math.max(minH, h)
          } var padding = Math.max(0, Math.round(.5 * (sh - h)));
          h > sh && (padding = 40), this.$outer.css({ "padding-top": padding, "padding-bottom": padding })
        }, Body
      }();
    exports.default = Modal
  }, { "constants/Browsers": 29, "stores/WindowStore": 30, "utils/Tween": 33, "utils/Url": 34 }],
  12: [function (require, module, exports) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") }

    function _possibleConstructorReturn(self, call) { if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !call || "object" != typeof call && "function" != typeof call ? self : call }

    function _inherits(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    } var _eventemitter = require("eventemitter2"),
      $ = window.NCOMMON_$ || window.$,
      Nav = function (_EventEmitter) {
        function Nav($el, options) {
        _classCallCheck(this, Nav), $ = window.NCOMMON_$ || window.$; var _this = _possibleConstructorReturn(this, _EventEmitter.call(this)); return _this.$ = $el, _this._num = -1, _this.options = _.assign({ unselectable: !1, usevalue: !1, initialnum: 0, autolink: !1 }, options), _this._values = [], _this._$btns = _.map(_this.$.find('[data-njs="nav__item"]'), function (el, i) {
          var $btn = $(el); return _this._values.push($btn.attr("data-value") || i + 1), $btn.on("click", function () {
            var num = i;
            _this.options.unselectable && num === _this._num && (num = -1), _this.activate(num)
          }), $btn
        }), _this.options.autolink && location.hash && (_this.options.initialnum = _this._values.indexOf(String(location.hash.substr(1))), _this.options.initialnum === -1 && (_this.options.initialnum = _this._values.indexOf(parseInt(location.hash.substr(1)))), _this.options.initialnum === -1 && (_this.options.initialnum = 0)), _this.activate(_this.options.initialnum), _this
        } return _inherits(Nav, _EventEmitter), Nav.prototype.onChange = function (f) { this.on("change", f) }, Nav.prototype.getInitialNum = function () { return this.options.initialnum }, Nav.prototype.getNum = function () { return this._num }, Nav.prototype.getValue = function () { return this._value }, Nav.prototype.activateByValue = function (value, withNoEvent) {
          var num = this._values.indexOf(value);
          num === -1 && (num = 0), this.activate(num, withNoEvent)
        }, Nav.prototype.activate = function (num, withNoEvent) {
          if (this._num !== num) {
            var value = this._values[num],
            preNum = this._num; if (this._num = num, this._value = value, this._$btns[preNum] && this._$btns[preNum].switchClass("js-active", !1), this._$btns[num] && this._$btns[num].switchClass("js-active", !0), !withNoEvent && (this.emit("change", this.options.usevalue ? value : num), this.options.autolink)) {
              var hash = this._values[num] || "";
              location.replace("#" + hash)
            }
          }
        }, Nav
      }(_eventemitter.EventEmitter2);
    module.exports = Nav
  }, { eventemitter2: 38 }],
  13: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
        }
      } return function (Constructor, protoProps, staticProps) { return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor }
    }(),
      _Util = require("utils/Util"),
      _WindowStore = (_interopRequireDefault(_Util), require("stores/WindowStore")),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      _Tween = require("utils/Tween"),
      $ = (_interopRequireDefault(_Tween), window.NCOMMON_$ || window.$),
      Parallax = function () {
        function Parallax($el, options) { _classCallCheck(this, Parallax), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.options = _.assign({}, options || {}) } return Parallax.prototype.init = function () { this._items = _.map(this.$.find('[data-njs="parallax__item"]'), function (el, i) { return new Item($(el), i) }), _WindowStore2.default.onAll(this._resized.bind(this), this._scrolled.bind(this)) }, Parallax.prototype._resized = function () { _.forEach(this._items, function (item) { return item.calcBounds() }), this._scrolled() }, Parallax.prototype._scrolled = function () {
          var scrollTop = _WindowStore2.default.getScrollTop(),
          scrollBottom = scrollTop + _WindowStore2.default.getHeight(),
          centerY = scrollTop + .5 * _WindowStore2.default.getHeight(),
          num = _.findLastIndex(this._items, function (item) { return !!item.display && item.y < centerY }) || 0;
          this._activate(num), _.forEach(this._items, function (item) {
            var visible = item.bottomY > scrollTop && item.y < scrollBottom;
            item.switchVisible(visible)
          })
        }, Parallax.prototype._activate = function (num) { this._num !== num && (this._num = num, _.forEach(this._items, function (item, i) { item.activate(i === num) })) }, Parallax
      }(),
      Item = function () {
        function Item($el, num) { _classCallCheck(this, Item), this.$ = $el, this._num = num, this._delay = parseInt(this.$.attr("data-parallaxdelay") || 0) } return Item.prototype.calcBounds = function () { this._display = "none" !== this.$.css("display"), this._y = this.$.offset().top, this._h = this.$.outerHeight() }, Item.prototype.activate = function (active) { this._active !== active && (this._active = active, this.$.switchClass("js-active", active), this.$.switchClass("js-inactive", !active), active && !this._activeOnce && (this._activeOnce = !0, this.$.addClass("js-activeOnce"))) }, Item.prototype.switchVisible = function (visible) {
          var _this = this;
          this._visible !== visible && (this._visible = visible, this.$.switchClass("js-visible", visible), this.$.switchClass("js-hidden", !visible), visible && !this._visibleOnce && (this._visibleOnce = !0, setTimeout(function () {
            _this.$.addClass("js-visibleOnce"), _.forEach(_this.$.find('[data-parallaxtrigger="1"]'), function (el) {
              var module = $(el).data("njs-instance");
              module && module.parallaxVisible && module.parallaxVisible()
            })
          }, this._delay)))
        }, _createClass(Item, [{ key: "display", get: function () { return this._display } }, { key: "y", get: function () { return this._display ? this._y : null } }, { key: "bottomY", get: function () { return this._y + this._h } }, { key: "h", get: function () { return this._h } }]), Item
      }();
    exports.default = Parallax
  }, { "stores/WindowStore": 30, "utils/Tween": 33, "utils/Util": 36 }],
  14: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
        }
      } return function (Constructor, protoProps, staticProps) { return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor }
    }(),
      _Util = require("utils/Util"),
      _WindowStore = (_interopRequireDefault(_Util), require("stores/WindowStore")),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      _Tween = require("utils/Tween"),
      _Tween2 = _interopRequireDefault(_Tween),
      $ = void 0,
      ScrollPage = function () {
        function ScrollPage($el, options) { _classCallCheck(this, ScrollPage), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.options = _.assign({}, options || {}) } return ScrollPage.prototype.init = function () {
          var _this = this,
          $nav = this.$.find('[data-scrollpagenav="1"]');
          $nav.length > 0 && (this._nav = $nav.data("njs-instance"), this._nav.onChange(function (num) { _this._scrollTo(num) })), this._contents = _.map(this.$.find('[data-njs="scrollpage__content"]'), function (el, i) { return new Content($(el), i) }), this._tw = new _Tween2.default, _WindowStore2.default.onAll(this._resized.bind(this), this._scrolled.bind(this))
        }, ScrollPage.prototype._resized = function () { _.forEach(this._contents, function (content) { return content.calcBounds() }), this._scrolled() }, ScrollPage.prototype._scrolled = function () {
          var scrollTop = _WindowStore2.default.getScrollTop(),
          scrollBottom = scrollTop + _WindowStore2.default.getHeight(),
          centerY = scrollTop + .5 * _WindowStore2.default.getHeight(),
          num = Math.max(0, _.findLastIndex(this._contents, function (content) { return content.y < centerY }) || 0);
          this._activate(num), _.forEach(this._contents, function (content) {
            var visible = content.bottomY > scrollTop && content.y < scrollBottom;
            content.switchVisible(visible)
          })
        }, ScrollPage.prototype._activate = function (num) { this._num !== num && (this._num = num, this._nav && this._nav.activate(num, !0), _.forEach(this._contents, function (content, i) { content.activate(i === num) })) }, ScrollPage.prototype._scrollTo = function (num) {
          var end = this._contents[num] && this._contents[num].y || 0;
          _WindowStore2.default.scrollTo(end, 800)
        }, ScrollPage
      }(),
      Content = function () {
        function Content($el, num) { _classCallCheck(this, Content), this.$ = $el, this._num = num } return Content.prototype.calcBounds = function () { this._y = this.$.offset().top, this._h = this.$.outerHeight() }, Content.prototype.activate = function (active) { this._active !== active && (this._active = active, this.$.switchClass("js-active", active), active && !this._activeOnce && (this._activeOnce = !0, this.$.addClass("js-activeOnce"))) }, Content.prototype.switchVisible = function (visible) { this._visible !== visible && (this._visible = visible, this.$.switchClass("js-visible", visible), visible && !this._visibleOnce && (this._visibleOnce = !0, this.$.addClass("js-visibleOnce"))) }, _createClass(Content, [{ key: "y", get: function () { return this._y } }, { key: "bottomY", get: function () { return this._y + this._h } }, { key: "h", get: function () { return this._h } }]), Content
      }();
    exports.default = ScrollPage
  }, { "stores/WindowStore": 30, "utils/Tween": 33, "utils/Util": 36 }],
  15: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } var _WindowStore = require("stores/WindowStore"),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      _Tween = require("utils/Tween"),
      _Tween2 = _interopRequireDefault(_Tween),
      _Draggee = require("utils/Draggee"),
      _Draggee2 = _interopRequireDefault(_Draggee),
      _Browsers = require("constants/Browsers"),
      _Browsers2 = _interopRequireDefault(_Browsers),
      _Scroller_bar = require("./Scroller_bar"),
      _Scroller_bar2 = _interopRequireDefault(_Scroller_bar),
      _Util = require("utils/Util"),
      _Util2 = _interopRequireDefault(_Util),
      $ = void 0,
      Scroller = function () {
        function Scroller($el, options) { _classCallCheck(this, Scroller), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.options = _.assign({ section_counts: [], section_labels: [], initial_section: 0 }, options) } return Scroller.prototype.init = function () {
          var _this = this;
          this.$clip = this.$.find('[data-njs="scroller__clip"]'), this.$container = this.$.find('[data-njs="scroller__container"]'), this.$ghost = $('<div data-njs="scroller__ghost"></div>').prependTo(this.$container), this.$prev = this.$.find('[data-njs="scroller__prev"]'), this.$next = this.$.find('[data-njs="scroller__next"]'), this.$ui = this.$.find('[data-njs="scroller__ui"]'), this.$items = _.map(this.$.find('[data-njs="scroller__item"]'), function (el) { return $(el) }), this.$heads = _.map(this.$.find('[data-njs="scroller__itemHead"]'), function (el) { return $(el) }), this._tw = new _Tween2.default, this.$.find('[data-njs="scroller__bar"]').length > 0 && (this._bar = new _Scroller_bar2.default(this.$.find('[data-njs="scroller__bar"]'), this.options), this._bar.onChangePer(this._barPerChanged.bind(this))), this.$prev.on("click", function (e) { return _this._goto(-1) }), this.$next.on("click", function (e) { return _this._goto(1) }), this._d = new _Draggee2.default, this._d.init(this.$clip[0], { preventDefaultEvent: !_Browsers2.default.touch }).onStart(this._dragStarted.bind(this)).onMove(this._dragMoved.bind(this)).onEnd(this._dragEnded.bind(this)), this.$container.on("mousewheel DOMMouseScroll", this._wheeled.bind(this)), this._realX = 0, this._x = -1, _WindowStore2.default.onResize(this._resized.bind(this)), this._resized(), this._bindedTick = this._tick.bind(this), this._tick(), this._gotoInitialSection()
        }, Scroller.prototype._gotoInitialSection = function () {
          if (this.options.initial_section) {
            var length = _.sum(this.options.section_counts.slice(0, this.options.initial_section)),
            x = this._itemW * length;
            this._realX = this._x = x, this._tick()
          }
        }, Scroller.prototype._resized = function () {
          var _this2 = this;
          this._cancelTween(), this._clipW = this.$clip.outerWidth(), this._itemGutter = parseInt(this.$items[0].css("margin-right") || 0), this._itemW = this.$items[0].outerWidth() + this._itemGutter, this._totalW = this.$items.length * this._itemW - this._itemGutter, this._pageW = Math.max(1, Math.floor((this._clipW - this._itemGutter) / this._itemW)) * this._itemW, this._minX = 0, this._maxX = Math.max(this._minX, this._totalW - this._clipW), this._rangeX = this._maxX - this._minX, this._disabled = 0 === this._rangeX, this._disabled && (this._minX = this._maxX = .5 * -(this._clipW - this._totalW)), this.$ghost.css("width", this._totalW), this.$ui.switchClass("js-disabled", this._disabled), this._bar && this._bar.setWidth(this._clipW / this._totalW), this._maxHeight(); var containerX = this.$clip.offset().left - this._x;
          _.forEach(this.$heads, function ($head, i) { $head.baseX = $head.parent().offset().left - containerX }), _.forEach(this.$heads, function ($head, i) {
            var $nextHead = _this2.$heads[i + 1];
            $head.minX = $head.baseX, $nextHead ? $head.maxX = $nextHead.baseX - _this2._itemW : $head.maxX = _this2._totalW - _this2._itemW
          }), this._updatePos(this._x)
        }, Scroller.prototype._maxHeight = function () {
          var _this3 = this,
          maxH = _.reduce(this.$items, function (res, $el, i) { return $el.css("left", i * _this3._itemW), Math.max($el.outerHeight(), res) }, 0);
          this.$container.css("height", maxH)
        }, Scroller.prototype._wheeled = function (e) {
          var oe = e.originalEvent,
          deltaX = oe.deltaX ? -oe.deltaX : 0,
          deltaY = oe.deltaY ? -oe.deltaY : oe.wheelDelta ? oe.wheelDelta : -oe.detail,
          dir = 3 * Math.abs(deltaX) >= Math.abs(deltaY) ? "h" : "v"; "h" === dir && (e.preventDefault(), e.stopPropagation(), this._cancelTween(), this._updatePos(this._x + 10 * deltaX))
        }, Scroller.prototype._dragStarted = function (clientX, clientY) { this._cancelTween(), this._dragStartX = this._x }, Scroller.prototype._dragMoved = function (dx, dy, ax, ay) { this._dragging = !0, this._updatePos(this._dragStartX - dx) }, Scroller.prototype._dragEnded = function (dx, dy, ax, ay) {
        this._dragging = !1; var x = this._x - 5 * ax;
          this._tweenPos(x, !0)
        }, Scroller.prototype._barPerChanged = function (per) {
          this._cancelTween(); var x = this._per2x(per);
          this._updatePos(x)
        }, Scroller.prototype._updatePos = function (x) { x = this._minMaxX(x), this._x = x, this._checkNextPrev() }, Scroller.prototype._checkNextPrev = function () {
          var reachMin = this._x <= this._minX + 1,
          reachMax = this._x >= this._maxX - 1;
          this._reachMin !== reachMin && (this._reachMin = reachMin, this.$prev.switchClass("js-inactive", reachMin)), this._reachMax !== reachMax && (this._reachMax = reachMax, this.$next.switchClass("js-inactive", reachMax))
        }, Scroller.prototype._tweenPos = function (x, byThrow) {
          var _this4 = this;
          x = this._minMaxX(x), this._tweeing = !0; var easing = byThrow ? "easeOutQuad" : "easeInOutQuad",
            dx = Math.abs(x - this._x),
            duration = 400 * Math.min(1, dx / 300);
          this._tw.it({ start: this._x, end: x, duration: duration, easing: easing, onProgress: function (v) { _this4._updatePos(v) }, onComplete: function () { _this4._cancelTween() } })
        }, Scroller.prototype._cancelTween = function () { this._tweeing && (this._tweeing = !1, this._tw.stop()) }, Scroller.prototype._minMaxX = function (x) { return this._dragging ? x > this._maxX ? x = this._maxX + .2 * (x - this._maxX) : x < this._minX && (x = this._minX + .2 * (x - this._minX)) : x > this._maxX ? x = this._maxX : x < this._minX && (x = this._minX), x = Math.round(x) }, Scroller.prototype._x2per = function (x) { return x / this._rangeX }, Scroller.prototype._per2x = function (per) { return this._rangeX * per }, Scroller.prototype._tick = function () {
          var denom = this._dragging ? 1 : .3;
          this._realX += (this._x - this._realX) * denom, this._realX = Math.round(this._realX), this._oldRealX !== this._realX && (this._oldRealX = this._realX, this.$container.css3({ x: -this._realX }), this._bar && this._bar.move(this._x2per(this._realX)), this._fixHeadPosition(), this._tellCurrentSection()), _Util2.default.requestAnimationFrame(this._bindedTick)
        }, Scroller.prototype._fixHeadPosition = function () {
          var _this5 = this,
          sw = this._clipW - this._itemW;
          _.forEach(this.$heads, function ($head, i) {
            var relX = $head.baseX - _this5._realX,
            x = $head.baseX;
            relX < 0 ? (x = $head.baseX + -relX, x > $head.maxX && (x = $head.maxX)) : relX > sw && (x = $head.baseX - (relX - sw), x < $head.minX && (x = $head.minX)); var offsetX = x - $head.baseX;
            $head.offsetX !== offsetX && ($head.offsetX = offsetX, $head.css3({ x: offsetX }))
          })
        }, Scroller.prototype._tellCurrentSection = function () {
          var _this6 = this,
          totalCnt = 0,
          centerX = Math.round(this._realX + .5 * this._clipW),
          currentSection = _.findIndex(this.options.section_counts, function (cnt) {
            var startIndex = totalCnt;
            totalCnt += cnt; var endIndex = totalCnt,
              startX = _this6._itemW * startIndex,
              endX = _this6._itemW * endIndex; return startX <= centerX && centerX <= endX
          });
          this._currentSection !== currentSection && (this._currentSection = currentSection, this._bar && this._bar.activateSection(currentSection))
        }, Scroller.prototype._goto = function (dir) {
          var x = this._x + this._pageW * dir;
          this._tweenPos(x, !1)
        }, Scroller
      }();
    module.exports = Scroller
  }, { "./Scroller_bar": 16, "constants/Browsers": 29, "stores/WindowStore": 30, "utils/Draggee": 31, "utils/Tween": 33, "utils/Util": 36 }],
  16: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") }

    function _possibleConstructorReturn(self, call) { if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !call || "object" != typeof call && "function" != typeof call ? self : call }

    function _inherits(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    } var _eventemitter = require("eventemitter2"),
      _WindowStore = require("stores/WindowStore"),
      _Tween = (_interopRequireDefault(_WindowStore), require("utils/Tween")),
      _Draggee = (_interopRequireDefault(_Tween), require("utils/Draggee")),
      _Draggee2 = _interopRequireDefault(_Draggee),
      _Browsers = require("constants/Browsers"),
      $ = (_interopRequireDefault(_Browsers), void 0),
      Scroller_bar = function (_EventEmitter) {
        function Scroller_bar($el, options) { _classCallCheck(this, Scroller_bar), $ = window.NCOMMON_$ || window.$; var _this = _possibleConstructorReturn(this, _EventEmitter.call(this)); return _this.$ = $el, _this.options = options, _this.$knob = _this.$.find('[data-njs="scroller__barKnob"]'), _this.$display = _this.$.find('[data-njs="scroller__barDisplay"]'), _this.$sections = _this.$.find('[data-njs="scroller__sections"]'), _this.$sectionItems = _.map(_this.$.find('[data-njs="scroller__sectionItem"]'), function (el) { return $(el) }), _this._sectionEnabled = _this.options.section_counts.length > 0 && _this.options.section_labels.length > 0, _this._itemCount = _.sum(_this.options.section_counts), _this._d = new _Draggee2.default, _this._d.init(_this.$[0], { preventDefaultEvent: !0 }).onStart(_this._dragStartHdl.bind(_this)).onMove(_this._dragMoveHdl.bind(_this)).onEnd(_this._dragEndHdl.bind(_this)), _this._x = 0, _this } return _inherits(Scroller_bar, _EventEmitter), Scroller_bar.prototype.onChangePer = function (f) { this.on("per", f) }, Scroller_bar.prototype.setWidth = function (per) { this._sw = this.$.outerWidth(), this._knobW = Math.round(this._sw * per), this._minX = 0, this._maxX = this._sw - this._knobW, this._rangeX = this._maxX - this._minX, this._adjustSctionWidth(), this.$knob.css("width", this._knobW) }, Scroller_bar.prototype._adjustSctionWidth = function () {
          var _this2 = this;
          this._sectionEnabled && _.forEach(this.$sectionItems, function ($sectionItem, i) {
            var cnt = _this2.options.section_counts[i],
            w = Math.floor(_this2._sw * (cnt / _this2._itemCount));
            $sectionItem.css("width", w)
          })
        }, Scroller_bar.prototype.move = function (per) {
          var x = Math.round(this._rangeX * per);
          this.$knob.css3({ x: x }), this._x = x
        }, Scroller_bar.prototype.activateSection = function (num) {
          var label = this.options.section_labels[num];
          this._currentLabel !== label && (this._currentLabel = label, this.$display.html(label))
        }, Scroller_bar.prototype._dragStartHdl = function (clientX, clientY) {
          var relX = clientX - this.$.offset().left,
          isKnobDown = relX > this._x && relX < this._x + this._knobW; if (isKnobDown) this._dragStartX = relX + (this._x - relX);
          else {
            var x = relX - .5 * this._knobW;
            x = this._minMaxX(x), this._dragStartX = x, this._emitPer(x)
          }
        }, Scroller_bar.prototype._dragMoveHdl = function (dx, dy, ax, ay) {
          var x = this._dragStartX + dx;
          x = this._minMaxX(x), this._emitPer(x)
        }, Scroller_bar.prototype._dragEndHdl = function (dx, dy, ax, ay) { }, Scroller_bar.prototype._minMaxX = function (x) { return Math.min(this._maxX, Math.max(this._minX, x)) }, Scroller_bar.prototype._emitPer = function (x) {
          var per = x / this._rangeX;
          this.emit("per", per)
        }, Scroller_bar
      }(_eventemitter.EventEmitter2);
    module.exports = Scroller_bar
  }, { "constants/Browsers": 29, eventemitter2: 38, "stores/WindowStore": 30, "utils/Draggee": 31, "utils/Tween": 33 }],
  17: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") }

    function _possibleConstructorReturn(self, call) { if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !call || "object" != typeof call && "function" != typeof call ? self : call }

    function _inherits(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    }
    var _eventemitter = require("eventemitter2"),
      _WindowStore = require("stores/WindowStore"),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      _Tween = require("utils/Tween"),
      _Tween2 = _interopRequireDefault(_Tween),
      _Draggee = require("utils/Draggee"),
      _Draggee2 = _interopRequireDefault(_Draggee),
      _Browsers = require("constants/Browsers"),
      _Browsers2 = _interopRequireDefault(_Browsers),
      _Util = require("utils/Util"),
      _Util2 = _interopRequireDefault(_Util),
      $ = void 0,
      Slider = function (_EventEmitter) {
        function Slider($el, options) { _classCallCheck(this, Slider), $ = window.NCOMMON_$ || window.$; var _this = _possibleConstructorReturn(this, _EventEmitter.call(this)); return _this.$ = $el, _this.options = _.assign({ autoplay: !1, autoplayinterval: 4e3, eachheight: !1, repeat: !1, repeat_cnt: 10, endevent: !1, automove: !1 }, options), _this.$clip = _this.$.find('[data-njs="slider__clip"]'), _this.$container = _this.$.find('[data-njs="slider__container"]'), _this.$nav = _this.$.find('[data-njs="slider__nav"]'), _this.$tpl_navItem = _this.$.find('[data-njs="slider__navItem"]').remove(), _this.$prev = _this.$.find('[data-njs="slider__prev"]'), _this.$next = _this.$.find('[data-njs="slider__next"]'), _this }
        return _inherits(Slider, _EventEmitter), Slider.prototype.onEnd = function (f) { this.on("end", f) }, Slider.prototype.init = function () {
          var _this2 = this;
          this._originalCnt = this.$.find('[data-njs="slider__item"]').length, this.options.repeat && this._originalCnt > 1 && this.options.repeat_cnt > 1 && ! function () {
            var originalHtml = _this2.$container.html(),
            repeatCnt = Math.ceil(_this2.options.repeat_cnt / _this2._originalCnt),
            html = _.map(_.range(repeatCnt), function () { return originalHtml }).join("");
            _this2.$container.html(html)
          }(), this._items = _.map(this.$.find('[data-njs="slider__item"]'), function (el) { return new Item($(el)) }), this.$prev.on("click", function () { _this2._goNeighbour(-1) }), this.$next.on("click", function () { _this2._goNeighbour(1) }), this.$nav.on("click", '[data-njs="slider__navItem"]', function (e) {
            var index = _this2.$nav.find('[data-njs="slider__navItem"]').index(e.target),
            dir = index - _this2._originalNum;
            _this2._goNeighbour(dir, !1)
          }), this._tw = new _Tween2.default, this.options.eachheight && (this._twHeight = new _Tween2.default), this.options.autoplay && (this._twAuto = new _Tween2.default), _Browsers2.default.touch && !this.options.automove && (this._d = new _Draggee2.default, this._d.init(this.$container[0]).onStart(this._dragStartHdl.bind(this)).onMove(this._dragMoveHdl.bind(this)).onEnd(this._dragEndHdl.bind(this))), this._x = 0, _WindowStore2.default.onResize(this._resized.bind(this)), this._resized(), this.options.automove && (this._bindedAutoMove = this._autoMove.bind(this), this._autoMove())
        }, Slider.prototype._autoMove = function () { this._updatePos(this._x - .5), _Util2.default.requestAnimationFrame(this._bindedAutoMove) }, Slider.prototype._resized = function () {
          var cellW = this._items[0].getWidth(),
          cellMargin = this._items[0].getMargin(),
          totalW = cellW * this._items.length,
          areaW = this.$clip.outerWidth(),
          pageCnt = Math.max(1, Math.round(areaW / cellW)),
          pageW = pageCnt * cellW;
          this._cellW = cellW, this._cellMargin = cellMargin, this._areaW = areaW, this._totalW = totalW, this._minX = Math.round(.5 * this._areaW - .5 * this._totalW), this._maxX = this._minX + this._totalW - this._cellW, this._pageW !== pageW ? (this._pageW = pageW, this._maxPage = Math.ceil(this._totalW / this._pageW) - 1, this._reset()) : this._centering(), this._maxHeight()
        }, Slider.prototype._maxHeight = function () {
          if (!this.options.eachheight) {
            var maxH = _.reduce(this._items, function (res, item) { return res = Math.max(res, item.getHeight()) }, 0);
            this.$container.css("height", maxH)
          }
        }, Slider.prototype._dragStartHdl = function (clientX, clientY) { this._dragStartX = this._calcX(), this._updatePos(this._dragStartX) }, Slider.prototype._dragMoveHdl = function (dx, dy, ax, ay) {
          var tx = this._dragStartX + dx;
          this._updatePos(tx)
        }, Slider.prototype._dragEndHdl = function (dx, dy, ax, ay) {
          var dir = 0,
          max = 10;
          dx < 0 && ax < -max ? dir = 1 : dx > 0 && ax > max && (dir = -1), this._goNeighbour(dir, !0)
        }, Slider.prototype._reset = function () {
          var _this3 = this; if (_.forEach(this._items, function (item, i) { item.setX(_this3._cellW * i) }), this.$.switchClass("js-disabled", this._maxPage < 1), this.$nav.length > 0) {
            this.$nav.html(""); var navCnt = this.options.repeat ? this._originalCnt : this._maxPage + 1;
            _.forEach(_.range(navCnt), function () { _this3.$tpl_navItem.clone().appendTo(_this3.$nav) })
          } this._setNum(0)
        }, Slider.prototype._centering = function () { this._updatePos(this._calcX()) }, Slider.prototype._goNeighbour = function (dir, bySwipe) {
          if (!(this._originalCnt <= 1)) {
            var num = this._num + dir; if (this.options.endevent && num > this._maxPage) return void this.emit("end"); var duration = bySwipe ? 500 : 800,
              easing = bySwipe ? "easeOutQuart" : "easeInOutQuart";
            this.options.repeat || (num > this._maxPage ? num = this._maxPage : num < 0 && (num = 0)), this._setNum(num, duration, easing)
          }
        }, Slider.prototype.goto = function (num) { this._setNum(num, 0) }, Slider.prototype._setNum = function (num) {
          var _this4 = this,
          duration = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          easing = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "linear";
          this._num = num, this._originalNum = (this._num + 1e3 * this._originalCnt) % this._originalCnt; var start = this._x,
            end = this._calcX(); if (this._tw.stop(), this._tw.it({ start: start, end: end, duration: duration, easing: easing, onProgress: function (x) { _this4._updatePos(x) } }), this.options.repeat || (this.$prev.switchClass("js-hidden", 0 === num), this.$next.switchClass("js-hidden", num === this._maxPage)), this.$nav.length > 0 && _.forEach(this.$.find('[data-njs="slider__navItem"]'), function (el, i) { $(el).switchClass("js-active", i === _this4._originalNum) }), this.options.eachheight) {
              var startH = this.$container.outerHeight(),
              endH = this._items[this._originalNum].getHeight();
              startH != endH && this._twHeight.it({ start: startH, end: endH, duration: duration, easing: easing, onProgress: function (h) { _this4.$container.css("height", h) } })
            } this.options.autoplay && (this.killAuto(), this.setAuto())
        }, Slider.prototype.killAuto = function () {
          this._twAuto.stop()
        }, Slider.prototype.setAuto = function () {
          var _this5 = this,
          $currentTimer = void 0;
          this.$nav.length > 0 && ($currentTimer = this.$nav.find('[data-njs="slider__navItemTimer"]').eq(this._originalNum)), this._twAuto.it({ start: 0, end: 1, duration: this.options.autoplayinterval, easing: "linear", onProgress: function (per) { $currentTimer && $currentTimer.css3({ scaleX: per, scaleY: 1 }) }, onComplete: function () { _this5._goNeighbour(1) } })
        }, Slider.prototype._calcX = function () { var baseX = .5 * this._areaW - .5 * (this._pageW - this._cellMargin); return Math.round(baseX - this._num * this._pageW) }, Slider.prototype._updatePos = function (x) {
          var _this6 = this;
          this._x = x, this.$container.css3({ x: x }), this.options.repeat && _.forEach(this._items, function (item) {
            var itemX = item.getX(),
            relX = _this6._x + itemX;
            relX < _this6._minX && item.offsetX(_this6._totalW), relX > _this6._maxX && item.offsetX(-_this6._totalW)
          })
        }, Slider
      }(_eventemitter.EventEmitter2),
      Item = function () {
        function Item($el) { _classCallCheck(this, Item), this.$ = $el } return Item.prototype.getWidth = function () { return this.$.outerWidth() + this.getMargin() }, Item.prototype.getHeight = function () { return this.$.outerHeight() }, Item.prototype.getMargin = function () { return parseInt(this.$.css("margin-right")) }, Item.prototype.setX = function (x) { this._x = x, this.$.css3({ x: x }) }, Item.prototype.getX = function (x) { return this._x }, Item.prototype.offsetX = function (x) { this.setX(this._x + x) }, Item
      }();
    module.exports = Slider
  }, { "constants/Browsers": 29, eventemitter2: 38, "stores/WindowStore": 30, "utils/Draggee": 31, "utils/Tween": 33, "utils/Util": 36 }],
  18: [function (require, module, exports) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } var $ = (require("eventemitter2"), void 0),
      SliderGallery = function () {
        function SliderGallery($el, options) { _classCallCheck(this, SliderGallery), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.options = _.assign({}, options) } return SliderGallery.prototype.init = function () {
          var _this = this;
          this.$opener = this.$.find('[data-njs="slidergallery__opener"]'), this.$closer = this.$.find('[data-njs="slidergallery__closer"]'), this.$opener.on("click", function (e) { e.preventDefault(), _this._switchOpen(!0) }), this.$closer.on("click", function (e) { e.preventDefault(), _this._switchOpen(!1) }), this._slider = this.$.find('[data-njs="slider"]').data("njs-instance"), this._slider.killAuto(), this._slider.onEnd(function () { _this._switchOpen(!1) })
        }, SliderGallery.prototype._switchOpen = function (opened) { this._opened !== opened && (this._opened = opened, this.$.switchClass("js-opened", opened), opened ? this._slider.goto(0) : this._slider.killAuto()) }, SliderGallery
      }();
    module.exports = SliderGallery
  }, { eventemitter2: 38 }],
  19: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var _Tween = require("utils/Tween"),
      _Tween2 = _interopRequireDefault(_Tween),
      $ = void 0,
      SmoothScroll = function SmoothScroll($el, options) {
        var _this = this;
        _classCallCheck(this, SmoothScroll), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.$window = $(window), this.options = _.assign({ target: "" }, options || {}); var $target = ($el.attr("href"), $(this.options.target)); if (0 === $target.length) return console.warn("[SmoothScroll] target is not found.");
        this._tw = new _Tween2.default, $el.on("click", function (e) { e.preventDefault(), _this._tw.it({ start: _this.$window.scrollTop(), end: $target.offset().top, duration: 400, easing: "easeInOutQuad", onProgress: function (v) { _this.$window.scrollTop(v) }, onComplete: function () { } }), _this.$window.off("wheel", wheel).on("wheel", wheel) }); var wheel = function wheel() { _this.$window.off("wheel", wheel), _this._tw.stop() }; return this
      };
    exports.default = SmoothScroll
  }, { "utils/Tween": 33 }],
  20: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var _WindowStore = require("stores/WindowStore"),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      $ = void 0,
      Sticky = function () {
        function Sticky($el, options) { _classCallCheck(this, Sticky), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.options = _.assign({ bottom: "", bottommargin: 0 }, options || {}), this._offsetY = 0, this.$inner = this.$.find('[data-njs="sticky__inner"]'), this.$bottom = this.options.bottom ? $(this.options.bottom) : null, this.$bottom && 0 === this.$bottom.length && (this.$bottom = null), _WindowStore2.default.onAll(this._resizeHdl.bind(this), this._scrollHdl.bind(this)) } return Sticky.prototype._resizeHdl = function () { this._y = this.$.offset().top, this._h = this.$inner.outerHeight(), this.$bottom && (this._bottomY = this.$bottom.offset().top - this._h - this.options.bottommargin, this._bottomY < this._y && (this._bottomY = this._y)), this._scrollHdl() }, Sticky.prototype._scrollHdl = function () {
          var top = _WindowStore2.default.getScrollTop(),
          fixed = top > this._y;
          this._fixed !== fixed && (this._fixed = fixed, this.$.switchClass("js-fixed", fixed), this.$inner.css({ top: 0 })); var offsetY = 0;
          fixed && this.$bottom && (offsetY = top - this._bottomY, offsetY < 0 && (offsetY = 0), this._offsetY !== offsetY && (this._offsetY = offsetY, this.$inner.css({ top: -offsetY })))
        }, Sticky
      }();
    exports.default = Sticky
  }, { "stores/WindowStore": 30 }],
  21: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") }

    function _possibleConstructorReturn(self, call) { if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !call || "object" != typeof call && "function" != typeof call ? self : call }

    function _inherits(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    } var _eventemitter = require("eventemitter2"),
      _Draggee = require("utils/Draggee"),
      _Draggee2 = _interopRequireDefault(_Draggee),
      _WindowStore = require("stores/WindowStore"),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      _Tween = require("utils/Tween"),
      _Tween2 = _interopRequireDefault(_Tween),
      _Browsers = require("constants/Browsers"),
      _Browsers2 = _interopRequireDefault(_Browsers),
      _Switcher_content = require("./Switcher_content"),
      _Switcher_content2 = _interopRequireDefault(_Switcher_content),
      $ = void 0,
      Switcher = function (_EventEmitter) {
        function Switcher($el, options) { _classCallCheck(this, Switcher), $ = window.NCOMMON_$ || window.$; var _this = _possibleConstructorReturn(this, _EventEmitter.call(this)); return _this.$ = $el, _this.options = _.assign({ initialnum: 0, swipeable: !1, autoplay: !1, autoplayinterval: 4e3, hovertokillauto: 0, eachheight: !1, animation: "normal" }, options), _this } return _inherits(Switcher, _EventEmitter), Switcher.prototype.parallaxVisible = function () { this.activate(0) }, Switcher.prototype._findOuter = function (expr) { return this.$.find(expr).not(this.$.find('[data-njs="switcher"] ' + expr)) }, Switcher.prototype.init = function () {
          var _this2 = this;
          this.options.eachheight && (this._twHeight = new _Tween2.default), this.options.autoplay && (this._twAuto = new _Tween2.default), this.$container = this._findOuter('[data-njs="switcher__container"]'), this._contents = _.map(this._findOuter('[data-njs="switcher__content"]'), function (el) { return new _Switcher_content2.default($(el)) }), this._max = this._contents.length, this.$prev = this._findOuter('[data-njs="switcher__prev"]'), this.$next = this._findOuter('[data-njs="switcher__next"]'), this.$prev.length < 0 && (this.$prev = null), this.$next.length < 0 && (this.$next = null), this.$prev && this.$prev.on("click", this.prev.bind(this, null)), this.$next && this.$next.on("click", this.next.bind(this, null)), this._nav = this._findOuter('[data-njs="nav"]').data("njs-instance"), this._nav && (this._nav.onChange(function (num) { _this2.activate(num) }), this._nav.getInitialNum() > 0 && (this.options.initialnum = this._nav.getInitialNum())), this.$displayCurrent = this.$.find('[data-njs="switcher__displayCurrent"]'), this.$diplayTotal = this.$.find('[data-njs="switcher__displayTotal"]'), this.$diplayTotal.text(this._contents.length), this.options.autoplay && this.options.hovertokillauto && this.$container.on("mouseenter", function () { _this2.killAuto() }).on("mouseleave", function () { _this2.setAuto() }), _Browsers2.default.touch && this.options.swipeable && (this._d = new _Draggee2.default, this._d.init(this.$container[0]).onStart(this._dragStartHdl.bind(this)).onEndDir(this._dragEndDirHdl.bind(this))), this.activate(this.options.initialnum, void 0, !1, !0, !0), _WindowStore2.default.onResize(this._resized.bind(this)), this._resized()
        }, Switcher.prototype.onChange = function (f) { this.on("change", f) }, Switcher.prototype.prev = function (byThrow) {
          var num = (this._num - 1 + this._max) % this._max;
          this.activate(num, -1, byThrow)
        }, Switcher.prototype.next = function (byThrow, byAuto) {
          var num = (this._num + 1 + this._max) % this._max;
          this.activate(num, 1, byThrow, !1, byAuto)
        }, Switcher.prototype.activate = function (num, forcedDir, byThrow, isDirect, byAuto) {
          if (this._num !== num) {
            var dir = num - this._num;
            void 0 !== forcedDir && (dir = forcedDir), dir = dir < 0 ? -1 : 1, this._num = num; var oldContent = this._currentContent;
            this._currentContent = this._contents[num], this._nav && this._nav.activate(num), this.$displayCurrent.text(num + 1), this.options.eachheight && this._maxHeightEach(isDirect), oldContent && oldContent.activate(!1), this._currentContent && this._currentContent.activate(!0, this._startAuto.bind(this)), this.emit("change", num)
          }
        }, Switcher.prototype._startAuto = function () { this.options.autoplay && (this.killAuto(), this.setAuto()) }, Switcher.prototype.killAuto = function () { this._twAuto.stop() }, Switcher.prototype.setAuto = function () {
          var _this3 = this,
          $currentTimer = void 0;
          this._nav && ($currentTimer = this._nav.$.find('[data-njs="nav__itemTimer"]').eq(this._num)); var duration = this._currentContent && this._currentContent.getDuration() || this.options.autoplayinterval;
          this._twAuto.it({ start: 0, end: 1, duration: duration, easing: "linear", onProgress: function (per) { $currentTimer && $currentTimer.css3({ scaleX: per, scaleY: 1 }) }, onComplete: function () { _this3.next() } })
        }, Switcher.prototype._dragStartHdl = function () { this.killAuto() }, Switcher.prototype._dragEndDirHdl = function (dir) { dir > 0 ? this.next(!0) : dir < 0 && this.prev(!0), this.setAuto() }, Switcher.prototype._resized = function () { this.options.eachheight ? this._maxHeightEach(!0) : this._maxHeightAll() }, Switcher.prototype._maxHeightAll = function () {
          var maxH = _.reduce(this._contents, function (res, content) { return res = Math.max(res, content.getHeight()) }, 0);
          this.$container.css("height", maxH)
        }, Switcher.prototype._maxHeightEach = function (isDirect) {
          var _this4 = this,
          startH = this.$container.outerHeight(),
          endH = this._currentContent ? this._currentContent.getHeight() : 0,
          duration = isDirect ? 0 : 500,
          delay = duration * (endH > startH ? 0 : .5),
          easing = endH > startH ? "easeOutQuart" : "easeInOutQuart";
          startH != endH && this._twHeight.it({ start: startH, end: endH, duration: duration, delay: delay, easing: easing, onProgress: function (h) { _this4.$container.css("height", h) }, onComplete: function () { _this4.$container.css("height", "auto") } })
        }, Switcher
      }(_eventemitter.EventEmitter2);
    module.exports = Switcher
  }, { "./Switcher_content": 22, "constants/Browsers": 29, eventemitter2: 38, "stores/WindowStore": 30, "utils/Draggee": 31, "utils/Tween": 33 }],
  22: [function (require, module, exports) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } var $ = void 0,
      Switcher_content = function () {
        function Switcher_content($el) { _classCallCheck(this, Switcher_content), $ = window.NCOMMON_$ || window.$, this.$ = $el, this._duration = this.$.attr("data-duration") || null, this._isActive = !1, this._video = this.$.find('[data-njs="video"]').data("njs-instance"), this._ytplayer = this.$.find('[data-njs="ytplayer"]').data("njs-instance") } return Switcher_content.prototype.getDuration = function () { return this._duration ? parseInt(this._duration) : null }, Switcher_content.prototype.activate = function (isActive, callback) { this._isActive !== isActive && (this._isActive = isActive, this.$.switchClass("js-active", isActive), isActive ? callback && (this._video ? this._video.play(callback) : this._ytplayer ? (this._ytplayer.play(), callback()) : callback()) : (this._video && this._video.stop(), this._ytplayer && this._ytplayer.stop())) }, Switcher_content.prototype.getHeight = function () { return this.$.outerHeight() }, Switcher_content
      }();
    module.exports = Switcher_content
  }, {}],
  23: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var _WindowStore = require("stores/WindowStore"),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      $ = void 0,
      ToggleParent = function () {
        function ToggleParent($el, options) { return _classCallCheck(this, ToggleParent), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.options = _.assign({ parent_tab: "", parent_sp: "" }, options || {}), this.$parent = this.$currentParent = this.$.parent(), this.options.parent_tab && (this.$parent_tab = $(this.options.parent_tab), 0 === this.$parent_tab.length && (this.$parent_tab = null)), this.options.parent_sp && (this.$parent_sp = $(this.options.parent_sp), 0 === this.$parent_sp.length && (this.$parent_sp = null)), this.$parent_tab || this.$parent_sp ? (_WindowStore2.default.onResponsive(this._responsiveHdl.bind(this)), void this._responsiveHdl()) : console.warn("[ToggleParent] could not find another parent: " + this.options.parent_tab + " | " + this.options.parent_sp) } return ToggleParent.prototype._responsiveHdl = function () {
          var $parent = this["$parent_" + _WindowStore2.default.getType()] || this.$parent;
          $parent !== this.$currentParent && (this.$currentParent = $parent, $parent.append(this.$))
        }, ToggleParent
      }();
    exports.default = ToggleParent
  }, { "stores/WindowStore": 30 }],
  24: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var _Browsers = require("constants/Browsers"),
      _Browsers2 = _interopRequireDefault(_Browsers),
      $ = void 0,
      TouchHover = function () {
        function TouchHover($el, options) { _classCallCheck(this, TouchHover), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.options = _.assign({ syncelement: null }, options || {}), this.options.syncelement && (this.$syncElement = $(this.options.syncelement)), _Browsers2.default.touch ? this._initTouch() : this._initPC() } return TouchHover.prototype._initPC = function () {
          var _this = this;
          this.$.on("mouseenter", function () { _this._switchState(!0) }).on("mouseleave", function () { _this._switchState(!1) })
        }, TouchHover.prototype._initTouch = function () { this.$body = $(document.body), this._bindedTouchStarted = this._touchStarted.bind(this), this._isActive = !1, this.$.on("click", this._clicked.bind(this)) }, TouchHover.prototype._clicked = function (e) { this._isActive || (e.preventDefault(), e.stopPropagation(), this._activate(!0)) }, TouchHover.prototype._activate = function (isActive) { this._isActive !== isActive && (this._isActive = isActive, isActive ? this.$body.on("touchstart", this._bindedTouchStarted) : this.$body.off("touchstart", this._bindedTouchStarted), this._switchState(isActive)) }, TouchHover.prototype._touchStarted = function (e) { $.contains(this.$[0], e.target) || this._activate(!1) }, TouchHover.prototype._switchState = function (hover) { this.$.switchClass("js-hover", hover), this.$syncElement && this.$syncElement.switchClass("js-hover", hover) }, TouchHover
      }();
    exports.default = TouchHover
  }, { "constants/Browsers": 29 }],
  25: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } var _WindowStore = require("stores/WindowStore"),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      _Browsers = require("constants/Browsers"),
      _Browsers2 = _interopRequireDefault(_Browsers),
      $ = void 0,
      Video = function () {
        function Video($el, options) { return _classCallCheck(this, Video), $ = window.NCOMMON_$ || window.$, this.$ = $el, this.$body = this.$.find('[data-njs="video__body"]'), this.options = _.assign({ src: "", src_sp: "", poster: "", cover: 0, autoplay: 0 }, options), this.options.src ? this.options.poster ? (this._src = this.options[_Browsers2.default.mobile ? "src_sp" : "src"] || this.options.src, this._enabled = _Browsers2.default.canVideoPlaysInline, this._setPoster(), this._playing = !1, void (this.options.autoplay && this.play())) : alert("[Video] data-poster is required.") : console.warn("[Video] data-src is required.") } return Video.prototype.play = function (callback) { return this._enabled ? void (this._playing || (this._playCallback = callback, this._playing = !0, this._isReady ? this._play() : this._init())) : callback && callback() }, Video.prototype.stop = function () { this._enabled && this._playing && (this._playing = !1, this._pause()) }, Video.prototype._setPoster = function () { this._enabled || this.$.css("background-image", "url(" + this.options.poster + ")") }, Video.prototype._init = function () { this._inited || (this._inited = !0, this.$body.html('<video src="' + this._src + '" poster="' + this.options.poster + '" autoplay loop muted playsinline></video>'), this.$video = this.$body.find("video"), this._video = this.$video[0], this.$video.on("canplay", this._ready.bind(this))) }, Video.prototype._play = function () { this._video.currentTime = 0, this._video.play(), this._playCallback && this._playCallback() }, Video.prototype._pause = function () { this._playCallback = null, this._video.pause() }, Video.prototype._ready = function () { this._isReady || (this._isReady = !0, this.$video.off("canplay"), this._initCover(), this._playing && this._play(), this.$.addClass("js-ready")) }, Video.prototype._initCover = function () { this.options.cover && (this._videoW = this.$video.outerWidth(), this._videoH = this.$video.outerHeight(), _WindowStore2.default.onResize(this._resized.bind(this)), this._resized()) }, Video.prototype._resized = function () {
          var sw = this.$.outerWidth(),
          sh = this.$.outerHeight(),
          scale = Math.max(sw / this._videoW, sh / this._videoH),
          width = Math.round(this._videoW * scale),
          height = Math.round(this._videoH * scale),
          left = Math.round(.5 * (sw - width)),
          top = Math.round(.5 * (sh - height));
          this.$video.css({ width: width, height: height, left: left, top: top })
        }, Video
      }();
    module.exports = Video
  }, { "constants/Browsers": 29, "stores/WindowStore": 30 }],
  26: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") }

    function _possibleConstructorReturn(self, call) { if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !call || "object" != typeof call && "function" != typeof call ? self : call }

    function _inherits(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    } var _eventemitter = require("eventemitter2"),
      _YTPlayer_API = require("./YTPlayer_API"),
      _YTPlayer_API2 = _interopRequireDefault(_YTPlayer_API),
      $ = void 0,
      YTPlayer = function (_EventEmitter) {
        function YTPlayer($el, options) {
          var _ret;
          _classCallCheck(this, YTPlayer), $ = window.NCOMMON_$ || window.$; var _this = _possibleConstructorReturn(this, _EventEmitter.call(this)); return _this.$ = $el, _this.$body = _this.$.find('[data-njs="ytplayer__body"]'), _this.options = _.assign({ videoid: "", autoplay: 0 }, options), _this.options.videoid ? (_this._playing = !1, _this.options.autoplay && _this.play(), _this) : (_ret = console.warn("[YTPlayer] data-videoid is required."), _possibleConstructorReturn(_this, _ret))
        } return _inherits(YTPlayer, _EventEmitter), YTPlayer.prototype.play = function () { this._playing || (this._playing = !0, this._player ? this._player.playVideo() : this._init()) }, YTPlayer.prototype.stop = function () { this._playing && (this._playing = !1, this._player && this._player.stopVideo()) }, YTPlayer.prototype._init = function () {
          var _this2 = this;
          this._inited || (this._inited = !0, _YTPlayer_API2.default.init().then(function () { _this2._player = _YTPlayer_API2.default.makePlayer(_this2.$body[0], _this2.options.videoid, _this2._playerReady.bind(_this2), _this2._playerStateChanged.bind(_this2)) }))
        }, YTPlayer.prototype._playerReady = function () { }, YTPlayer.prototype._playerStateChanged = function () { }, YTPlayer
      }(_eventemitter.EventEmitter2);
    module.exports = YTPlayer
  }, { "./YTPlayer_API": 27, eventemitter2: 38 }],
  27: [function (require, module, exports) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } var $ = void 0,
      YTPlayer_API = function () {
        function YTPlayer_API() { _classCallCheck(this, YTPlayer_API), $ = window.NCOMMON_$ || window.$, this._initQueues = [] } return YTPlayer_API.prototype.init = function () { var _this = this; return this._isReady ? Promise.resolve() : (this._isInitializing || this._init(), new Promise(function (f, r) { _this._initQueues.push(f) })) }, YTPlayer_API.prototype._init = function () {
          if (!this._isInitializing) {
          this._isInitializing = !0, window.onYouTubeIframeAPIReady = this._ready.bind(this); var script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api"; var firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(script, firstScriptTag)
          }
        }, YTPlayer_API.prototype._ready = function () { this._isInitializing = !1, this._isReady = !0, _.forEach(this._initQueues, function (queue) { queue() }) }, YTPlayer_API.prototype.makePlayer = function (el, videoId, onReady, onStateChange) { return new YT.Player(el, { videoId: videoId, width: 640, height: 480, playerVars: { enablejsapi: 1, loop: 1, autoplay: 1, controls: 1, showinfo: 0, rel: 0, playsinline: 1 }, events: { onReady: onReady, onStateChange: onStateChange } }) }, YTPlayer_API
      }();
    module.exports = new YTPlayer_API
  }, {}],
  28: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } } exports.__esModule = !0, exports.default = function ($area) { $ = window.NCOMMON_$ || window.$, $area = $area || $(document.body), _Util2.default.initModules($area, moduleList) }; var _Util = require("utils/Util"),
      _Util2 = _interopRequireDefault(_Util),
      _Nav = require("./Nav"),
      _Nav2 = _interopRequireDefault(_Nav),
      _Checkbox = require("./Checkbox"),
      _Checkbox2 = _interopRequireDefault(_Checkbox),
      _Accordion = require("./Accordion"),
      _Accordion2 = _interopRequireDefault(_Accordion),
      _Heightline = require("./Heightline"),
      _Heightline2 = _interopRequireDefault(_Heightline),
      _Switcher = require("./Switcher"),
      _Switcher2 = _interopRequireDefault(_Switcher),
      _Slider = require("./Slider"),
      _Slider2 = _interopRequireDefault(_Slider),
      _SliderGallery = require("./SliderGallery"),
      _SliderGallery2 = _interopRequireDefault(_SliderGallery),
      _Counter = require("./Counter"),
      _Counter2 = _interopRequireDefault(_Counter),
      _Sticky = require("./Sticky"),
      _Sticky2 = _interopRequireDefault(_Sticky),
      _ToggleParent = require("./ToggleParent"),
      _ToggleParent2 = _interopRequireDefault(_ToggleParent),
      _Launcher = require("./Launcher"),
      _Launcher2 = _interopRequireDefault(_Launcher),
      _SmoothScroll = require("./SmoothScroll"),
      _SmoothScroll2 = _interopRequireDefault(_SmoothScroll),
      _TouchHover = require("./TouchHover"),
      _TouchHover2 = _interopRequireDefault(_TouchHover),
      _Modal = require("./Modal"),
      _Modal2 = _interopRequireDefault(_Modal),
      _Gallery = require("./Gallery"),
      _Gallery2 = _interopRequireDefault(_Gallery),
      _Scroller = require("./Scroller"),
      _Scroller2 = _interopRequireDefault(_Scroller),
      _YTPlayer = require("./YTPlayer"),
      _YTPlayer2 = _interopRequireDefault(_YTPlayer),
      _Video = require("./Video"),
      _Video2 = _interopRequireDefault(_Video),
      _HideSeek = require("./HideSeek"),
      _HideSeek2 = _interopRequireDefault(_HideSeek),
      _MegaDrop = require("./MegaDrop"),
      _MegaDrop2 = _interopRequireDefault(_MegaDrop),
      _ScrollPage = require("./ScrollPage"),
      _ScrollPage2 = _interopRequireDefault(_ScrollPage),
      _Parallax = require("./Parallax"),
      _Parallax2 = _interopRequireDefault(_Parallax),
      _Bg = require("./Bg"),
      _Bg2 = _interopRequireDefault(_Bg),
      $ = void 0,
      moduleList = { toggleparent: _ToggleParent2.default, touchhover: _TouchHover2.default, ytplayer: _YTPlayer2.default, video: _Video2.default, heightline: _Heightline2.default, sticky: _Sticky2.default, nav: _Nav2.default, checkbox: _Checkbox2.default, counter: _Counter2.default, bg: _Bg2.default, launcher: _Launcher2.default, slider: _Slider2.default, switcher: _Switcher2.default, scroller: _Scroller2.default, smoothscroll: _SmoothScroll2.default, accordion: _Accordion2.default, modal: _Modal2.default, gallery: _Gallery2.default, hideseek: _HideSeek2.default, megadrop: _MegaDrop2.default, scrollpage: _ScrollPage2.default, parallax: _Parallax2.default, slidergallery: _SliderGallery2.default }
  }, { "./Accordion": 2, "./Bg": 3, "./Checkbox": 4, "./Counter": 5, "./Gallery": 6, "./Heightline": 7, "./HideSeek": 8, "./Launcher": 9, "./MegaDrop": 10, "./Modal": 11, "./Nav": 12, "./Parallax": 13, "./ScrollPage": 14, "./Scroller": 15, "./Slider": 17, "./SliderGallery": 18, "./SmoothScroll": 19, "./Sticky": 20, "./Switcher": 21, "./ToggleParent": 23, "./TouchHover": 24, "./Video": 25, "./YTPlayer": 26, "utils/Util": 36 }],
  29: [function (require, module, exports) {
    "use strict";
    exports.__esModule = !0; var ua = navigator.userAgent.toLowerCase(),
      win = ua.match(/windows/),
      mac = ua.match(/macintosh/),
      ie = ua.match(/msie/) || ua.match(/trident/),
      ie8 = ua.match(/msie 8/),
      ie9 = ua.match(/msie 9/),
      ie10 = ua.match(/msie 10/),
      edge = ua.match(/windows/) && ua.match(/edge/),
      chrome = ua.match(/chrome/),
      safari = ua.match(/safari/) && !ua.match(/chrome/),
      firefox = ua.match(/firefox/),
      opera = ua.match(/opera/),
      iphone = ua.match(/iphone/),
      ipod = ua.match(/ipod/),
      ipad = ua.match(/ipad/),
      ios = iphone || ipod || ipad,
      android = ua.match(/android/),
      androidMobile = android && ua.match(/mobile/),
      androidTablet = android && !ua.match(/mobile/),
      androidLegacy = ua.match(/android 2|android 4.0|android 4.1|android 4.2|android 4.3/),
      ios_ver = null,
      android_ver = null; try {
        if (ios) {
          ios_ver = (ua.split(" os ")[1] || "").split(" ")[0]; var v1 = parseInt(ios_ver.split("_")[0]),
            v2 = parseInt(ios_ver.split("_")[1] || 0);
          ios_ver = parseInt(((v1 < 10 ? "0" : "") + v1 + v2).substr(0, 3))
        } android && (android_ver = (ua.split("android ")[1] || "").substr(0, 3).split(".").join(""), android_ver = parseInt(android_ver))
      } catch (e) { alert(e) } var n_tablet = ua.match(/wiiu|switch/),
        n_sp = ua.match(/3ds|2ds/),
        ntd = n_tablet || n_sp,
        mobile = androidMobile || iphone || ipod || ntd,
        tablet = androidTablet || ipad,
        hasTouch = "ontouchstart" in window,
        touch = hasTouch && !win,
        desktop = !touch,
        retina = window.devicePixelRatio >= 2,
        canVideoPlaysInline = !!(desktop || ios && ios_ver >= 100);
    exports.default = { win: win, mac: mac, ie: ie, ie8: ie8, ie9: ie9, ie10: ie10, edge: edge, chrome: chrome, safari: safari, firefox: firefox, opera: opera, ios: ios, iphone: iphone, ipad: ipad, android: android, androidLegacy: androidLegacy, androidMobile: androidMobile, androidTablet: androidTablet, ios_ver: ios_ver, android_ver: android_ver, ntd: ntd, mobile: mobile, tablet: tablet, touch: touch, desktop: desktop, retina: retina, canVideoPlaysInline: canVideoPlaysInline }
  }, {}],
  30: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") }

    function _possibleConstructorReturn(self, call) { if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !call || "object" != typeof call && "function" != typeof call ? self : call }

    function _inherits(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    } exports.__esModule = !0;
    var _domready = require("utils/domready"),
      _domready2 = _interopRequireDefault(_domready),
      _eventemitter = require("eventemitter2"),
      _Tween = require("utils/Tween"),
      _Tween2 = _interopRequireDefault(_Tween),
      _Browsers = require("constants/Browsers"),
      _Browsers2 = _interopRequireDefault(_Browsers),
      $ = void 0,
      EV_LOAD = "load",
      EV_RESPONSIVE = "responsive",
      EV_RESIZE = "resize",
      EV_SCROLL = "scroll",
      TYPE_PC = "pc",
      TYPE_TAB = "tab",
      TYPE_SP = "sp",
      WindowStore = function (_EventEmitter) {
        function WindowStore(props) { _classCallCheck(this, WindowStore); var _this = _possibleConstructorReturn(this, _EventEmitter.call(this, props)); return _this.setMaxListeners(0), document.body ? _this._setup() : (0, _domready2.default)(_this._setup.bind(_this)), _this }
        return _inherits(WindowStore, _EventEmitter), WindowStore.prototype.forceSetup = function () { this._setup() }, WindowStore.prototype._setup = function () { $ = window.NCOMMON_$ || window.$, this._isSetup || (this._isSetup = !0, this.$window = $(window), this.$html = $("html"), this.$body = $(document.body), this.$htmlBody = $("html,body"), this.$sizecheck = $('<div data-njs="windowsizecheck"><div').appendTo(document.body), this._info = { loaded: !1, width: void 0, height: void 0, scrollTop: void 0, type: void 0, modelOpened: !1, scrollBarWidth: this._calcScrollBarWidth() }, this.$window.on("load", this._loadHdl.bind(this)).on("resize", this._resizeHdl.bind(this)).on("scroll", this._scrollHdl.bind(this)), this._resizeHdl()) }, WindowStore.prototype._calcScrollBarWidth = function () {
          if (_Browsers2.default.touch) return 0; var $outer = $('<div style="visibility: hidden; overflow: scroll; position: absolute; opacity: 0;"><div></div><div>').appendTo(document.body),
            $inner = $outer.find("div"),
            w = $outer.outerWidth() - $inner.outerWidth(); return $outer.remove(), w
        }, WindowStore.prototype.onAll = function (resizeHdl, scrollHdl) { this.onLoad(resizeHdl).onResize(resizeHdl).onScroll(scrollHdl), resizeHdl() }, WindowStore.prototype.onLoad = function (f) { return this.on(EV_LOAD, f), this }, WindowStore.prototype.onResponsive = function (f) { return this.on(EV_RESPONSIVE, f), this }, WindowStore.prototype.onResize = function (f) { return this.on(EV_RESIZE, f), this }, WindowStore.prototype.onScroll = function (f) { return this.on(EV_SCROLL, f), this }, WindowStore.prototype.offResponsive = function (f) { return this.off(EV_RESPONSIVE, f), this }, WindowStore.prototype.offResize = function (f) { return this.off(EV_RESIZE, f), this }, WindowStore.prototype.offScroll = function (f) { return this.off(EV_SCROLL, f), this }, WindowStore.prototype.triggerResize = function () { this.emit(EV_RESIZE, this._info) }, WindowStore.prototype.triggerScroll = function () { this.emit(EV_SCROLL, this._info) }, WindowStore.prototype.scrollTo = function (top) {
          var _this2 = this,
          duration = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0; return this._tw && this._tw.stop(), 0 === duration ? this.$window.scrollTop(top) : (this._tw = this._tw || new _Tween2.default, void this._tw.it({ start: this.getScrollTop(), end: top, duration: duration, easing: "easeInOutQuad", onProgress: function (v) { _this2.$window.scrollTop(v) } }))
        }, WindowStore.prototype.switchModalState = function (opened) {
          if (this._info.modelOpened !== opened) {
            this._info.modelOpened = opened; var marginTargets = $('body, [data-njs-fixed="1"]');
            this.$html.attr("data-modalopened", opened ? 1 : 0), opened ? (this._info.scrollBarWidth && marginTargets.css("margin-right", this._info.scrollBarWidth), _Browsers2.default.touch ? this.$htmlBody.css({ height: "100%", overflow: "hidden" }) : this.$html.css("overflow", "hidden"), this._memoriedScrollTop = this.getScrollTop(), this.$body.scrollTop(this._memoriedScrollTop)) : (this._info.scrollBarWidth && marginTargets.css("margin-right", ""), this.$htmlBody.css({ height: "", overflow: "" }), this.$body.scrollTop(0), this.scrollTo(this._memoriedScrollTop))
          }
        }, WindowStore.prototype.getWidth = function () {
          return this._info.width
        }, WindowStore.prototype.getHeight = function () { return this._info.height }, WindowStore.prototype.getScrollTop = function () { return this._info.scrollTop }, WindowStore.prototype.getIsPC = function () { return this._info.type === TYPE_PC }, WindowStore.prototype.getIsTAB = function () { return this._info.type === TYPE_TAB }, WindowStore.prototype.getIsSP = function () { return this._info.type === TYPE_SP }, WindowStore.prototype.getType = function () { return this._info.type }, WindowStore.prototype._loadHdl = function () { this._info.loaded = !0, this.emit(EV_LOAD, this._info), this.triggerResize() }, WindowStore.prototype._resizeHdl = function () {
          this._info.width = window.innerWidth || this.$window.width(), this._info.height = window.innerHeight || this.$window.height(); var checkerW = parseInt(this.$sizecheck.css("width")),
            type = TYPE_PC;
          2 === checkerW ? type = TYPE_TAB : 3 === checkerW && (type = TYPE_SP), this._info.type !== type && (this._info.type = type, this.emit(EV_RESPONSIVE, this._info)), this.triggerResize(), this._scrollHdl()
        }, WindowStore.prototype._scrollHdl = function () { this._info.scrollTop = this.$window.scrollTop(), this.triggerScroll() }, WindowStore
      }(_eventemitter.EventEmitter2);
    exports.default = new WindowStore
  }, { "constants/Browsers": 29, eventemitter2: 38, "utils/Tween": 33, "utils/domready": 37 }],
  31: [function (require, module, exports) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } var $ = void 0,
      Util = require("utils/Util"),
      Draggee = function () {
        function Draggee() { _classCallCheck(this, Draggee), $ = window.NCOMMON_$ || window.$, this.bindedUpdate = this.update.bind(this), this.bindedStartHdl = this.startHdl.bind(this), this.bindedMoveHdl = this.moveHdl.bind(this), this.bindedEndHdl = this.endHdl.bind(this) } return Draggee.prototype.init = function (node, options) { var _this = this; return this.node = node, this.options = _.assign({ preventDefaultEvent: !1, accelDecreasePer: .5 }, options || {}), this.isStarted = !1, Util.on(this.node, "mousedown touchstart MSPointerDown", this.bindedStartHdl), Util.copyProtect($(this.node)), $(this.node).on("click", "a", function (e) { _this._onceMoved && (e.preventDefault(), e.stopPropagation()), _this._onceMoved = !1 }), this }, Draggee.prototype.setOptions = function (options) { this.options = _.assign(this.options, options) }, Draggee.prototype.clear = function () { this.cancelUpdate(), this.unbindDrag(), this.node && (Util.off(this.node, "mousedown touchstart MSPointerDown", this.bindedStartHdl), this.node = null) }, Draggee.prototype.onStart = function (fn) { return this.startCallback = fn, this }, Draggee.prototype.onMove = function (fn) { return this.moveCallback = fn, this }, Draggee.prototype.onEnd = function (fn) { return this.endCabllback = fn, this }, Draggee.prototype.onEndDir = function (fn) { return this.endDirCabllback = fn, this }, Draggee.prototype.onClick = function (fn) { return this.clickCabllback = fn, this }, Draggee.prototype.bindDrag = function () { Util.on(document, "mousemove touchmove MSPointerMove", this.bindedMoveHdl), Util.on(document, "mouseup touchend MSPointerUp", this.bindedEndHdl) }, Draggee.prototype.unbindDrag = function () { Util.off(document, "mousemove touchmove MSPointerMove", this.bindedMoveHdl), Util.off(document, "mouseup touchend MSPointerUp", this.bindedEndHdl) }, Draggee.prototype.startHdl = function (e) {
          if (e = e || { type: "" }, this.options.preventDefaultEvent && (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation()), e.type.indexOf("touch") >= 0 && (this._touchFired = !0), !(this._touchFired && (e.type.indexOf("mouse") >= 0 || e.type.indexOf("MSPointer") >= 0 || e.type.indexOf("pointer") >= 0) || this.isStarted)) {
          this.isStarted = !0, this._multiTouch = !1, this._onceMoved = !1; var p = Util.getPoint(e);
            this.ix = p.x, this.iy = p.y, this.dx = this.dy = this.ax = this.ay = 0, this.startCallback && this.startCallback(p.x, p.y), this.bindDrag(), this.update()
          }
        }, Draggee.prototype.moveHdl = function (e) {
          if (this.isStarted) {
            if (e.touches && e.touches.length > 1) return void (this._multiTouch = !0);
            this.options.preventDefaultEvent && (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation()), this._onceMoved = !0; var p = Util.getPoint(e),
              dx = p.x - this.ix,
              dy = p.y - this.iy;
            this.ax += dx - this.dx, this.ay += dy - this.dy, this.dx = dx, this.dy = dy
          }
        }, Draggee.prototype.endHdl = function (e) {
          if (this.isStarted && (this.options.preventDefaultEvent && (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation()), this.isStarted)) {
          this.isStarted = !1, this.unbindDrag(), this.cancelUpdate(), this.endCabllback && this.endCabllback(this.dx, this.dy, this.ax, this.ay); var dir = 0,
            maxAccell = 1.5;
            this.dx < 0 && this.ax < -maxAccell ? dir = 1 : this.dx > 0 && this.ax > maxAccell && (dir = -1), this.endDirCabllback && this.endDirCabllback(dir), this._onceMoved || this._multiTouch || this.clickCabllback && this.clickCabllback(e)
          }
        }, Draggee.prototype.update = function () { this.cancelUpdate(), this.ax *= this.options.accelDecreasePer, this.ay *= this.options.accelDecreasePer, this.moveCallback && this.moveCallback(this.dx, this.dy, this.ax, this.ay), this.updateID = Util.requestAnimationFrame(this.bindedUpdate) }, Draggee.prototype.cancelUpdate = function () { this.updateID && Util.cancelAnimationFrame(this.updateID) }, Draggee
      }();
    module.exports = Draggee
  }, { "utils/Util": 36 }],
  32: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } } var _tweenFunctions = require("tween-functions"),
      _tweenFunctions2 = _interopRequireDefault(_tweenFunctions);
    module.exports = {
      it: function (currentTime, startValue, endValue, duration, easing) {
        var _this = this,
        easingFunc = _tweenFunctions2.default[easing] || _tweenFunctions2.default.linear; return _.isNumber(startValue) || _.isString(startValue) ? this._easingString(currentTime, startValue, endValue, duration, easingFunc) : _.reduce(startValue, function (res, startNum, key) { var endNum = endValue[key]; return res[key] = _this._easingString(currentTime, startNum, endNum, duration, easingFunc), res }, {})
      }, _easingString: function (currentTime, startValue, endValue, duration, easingFunc) {
        if (_.isNumber(startValue) && _.isNumber(endValue)) return easingFunc(currentTime, startValue, endValue, duration); var startStr = "" + startValue,
          startNum = parseInt(startValue),
          endNum = parseInt(endValue),
          val = easingFunc(currentTime, startNum, endNum, duration); return startStr.split("" + startNum).join(val)
      }
    }
  }, { "tween-functions": 39 }],
  33: [function (require, module, exports) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var Interpolate = require("utils/Interpolate"),
      Util = require("utils/Util"),
      Tween = function () {
        function Tween() {
          var defaultValue = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
          _classCallCheck(this, Tween), this._currentValue = defaultValue, this._bindedTick = this._tick.bind(this)
        } return Tween.prototype.it = function (props) { this._p = _.assign({ start: this._currentValue, end: 0, duration: 0, delay: 0, easing: "easeInOutQuad", onProgress: null, onComplete: null }, props), this.stop(), this._startTime = (new Date).getTime() + this._p.delay, this._tick() }, Tween.prototype.stop = function () { Util.cancelAnimationFrame(this._tickId) }, Tween.prototype._tick = function () {
          var currentTime = Math.max(0, Math.min(this._p.duration, (new Date).getTime() - this._startTime));
          this._currentValue = 0 === this._p.duration ? this._p.end : Interpolate.it(currentTime, this._p.start, this._p.end, this._p.duration, this._p.easing), this._p.onProgress && this._p.onProgress(this._currentValue, currentTime), currentTime >= this._p.duration ? this._p.onComplete && this._p.onComplete() : this._tickId = Util.requestAnimationFrame(this._bindedTick)
        }, Tween
      }();
    exports.default = Tween
  }, { "utils/Interpolate": 32, "utils/Util": 36 }],
  34: [function (require, module, exports) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } var Url = function () {
      function Url() { _classCallCheck(this, Url) } return Url.prototype.parse = function (url) {
        var queryStr = url.split("?")[1],
        query = _.reduce(queryStr ? queryStr.split("&") : null, function (res, v, i) {
          var arr = v.split("="),
          key = arr[0],
          val = arr[1]; return isNaN(Number(val)) || (val = Number(val)), res[key] = val, res
        }, {}); return { query: query }
      }, Url
    }();
    module.exports = new Url
  }, {}],
  35: [function (require, module, exports) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } var WEEKS = "日 月 火 水 木 金 土".split(" "),
      Util = function () {
        function Util() { _classCallCheck(this, Util) } return Util.getDepthFromScript = function (thisScriptPath) {
          var depth = "",
          head = document.getElementsByTagName("head")[0]; return Array.prototype.forEach.call(head.children, function (el, i) {
            if ("script" === el.tagName.toLowerCase()) {
              var src = el.getAttribute("src");
              src && (src.indexOf(thisScriptPath) < 0 || (depth = src.split(thisScriptPath)[0]))
            }
          }), depth
        }, Util.asyncLoadCSS = function (path, callback) {
          var isDone = !1,
          head = document.getElementsByTagName("head")[0],
          link = document.createElement("link");
          link.rel = "stylesheet", link.type = "text/css", link.href = path, head.appendChild(link), link.onload = link.onreadystatechange = function () { var isComplete = !link.readyState || "loaded" === link.readyState || "complete" === link.readyState; !isDone && isComplete && (isDone = !0, link.onload = link.onreadystatechange = null, callback && callback()) }
        }, Util.asyncLoadJS = function (path, callback) {
          var isDone = !1,
          head = document.getElementsByTagName("head")[0],
          script = document.createElement("script");
          script.src = path, head.appendChild(script), script.onload = script.onreadystatechange = function () { var isComplete = !script.readyState || "loaded" === script.readyState || "complete" === script.readyState; !isDone && isComplete && (isDone = !0, script.onload = script.onreadystatechange = null, head && script.parentNode && head.removeChild(script), callback && callback()) }
        }, Util.setCookie = function (data, period) {
          period = period || 7; var cookies = ""; for (var key in data) cookies += key + "=" + encodeURIComponent(data[key]) + "; "; var expire = new Date;
          expire.setTime(expire.getTime() + 864e5 * period), expire.toUTCString(), cookies += "expires=" + expire + ";", cookies += "path=/;", document.cookie = cookies
        }, Util.getCookie = function () {
          var result = {},
          cookies = document.cookie; if ("" != cookies)
            for (var cookieArray = cookies.split(";"), i = 0; i < cookieArray.length; i++) {
              var cookie = cookieArray[i].split("="),
              key = cookie[0].split(" ").join(""),
              val = cookie[1];
              result[key] = decodeURIComponent(val)
            }
          return result
        }, Util.week2jp = function (weekNum) { return WEEKS[weekNum] || "" }, Util.date = function (dateStr) { if (!dateStr) return new Date; if (!dateStr.indexOf) return new Date(dateStr); var second = dateStr.split(" ")[1] || ""; return dateStr = dateStr.split(" ")[0], dateStr = dateStr.split(".").join("-").split("-").map(function (str, i) { return 1 != i && 2 != i || 1 !== str.length ? str : "0" + str }).join("-"), second && (second = second.split(":").map(function (str, i) { return 1 === str.length ? "0" + str : str }).join(":"), dateStr += "T" + second), new Date(dateStr) }, Util
      }();
    module.exports = Util
  }, {}],
  36: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") }

    function _possibleConstructorReturn(self, call) { if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !call || "object" != typeof call && "function" != typeof call ? self : call }

    function _inherits(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    } var _Browsers = require("constants/Browsers"),
      _UtilLight2 = (_interopRequireDefault(_Browsers), require("./Util-light")),
      _UtilLight3 = _interopRequireDefault(_UtilLight2),
      $ = void 0,
      Util = function (_UtilLight) {
        function Util() { return _classCallCheck(this, Util), _possibleConstructorReturn(this, _UtilLight.apply(this, arguments)) } return _inherits(Util, _UtilLight), Util.on = function (el, eventName, fn) { _.each(eventName.split(" "), function (e) { el.addEventListener ? el.addEventListener(e, fn, !1) : el.attachEvent("on" + e, fn) }) }, Util.off = function (el, eventName, fn) { _.each(eventName.split(" "), function (e) { el.removeEventListener ? el.removeEventListener(e, fn, !1) : el.detachEvent("on" + e, fn) }) }, Util.imageLoad = function (img, src, dummyWaitDuration, fn, fnErro) {
          var cnt = 0,
          countup = function () { cnt++ , 2 === cnt && fn() },
          isLoaded = !1,
          loaded = function loaded() { isLoaded || (isLoaded = !0, Util.off(img, "load", loaded), countup()) };
          Util.on(img, "load", loaded), Util.on(img, "error", function (err) { console.error("load image error: " + src), fnErro && fnErro() }), img.src = src, (img.complete || "complete" === img.readyState) && loaded(); var waitID = setTimeout(countup, dummyWaitDuration || 0),
            cancelFunc = function () { Util.off(img, "load", loaded), clearTimeout(waitID), img = null, fn = null }; return cancelFunc
        }, Util.getRect = function (el) { var rect = el.getBoundingClientRect(); return { x: rect.left, y: rect.top, width: el.offsetWidth, height: el.offsetHeight } }, Util.getRadian = function (p, pBase) {
          var x = p.x,
          y = p.y; return pBase && (x -= pBase.x, y -= pBase.y), Math.atan2(y, x)
        }, Util.radian2angle = function (radian) { return radian / Math.PI * 180 }, Util.angle2radian = function (angle) { return angle * Math.PI / 180 }, Util.getPoint = function (e) { return e.touches && e.touches[0] ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY } }, Util.requestAnimationFrame = function (fn) { var f = this.requestAnimationFrameFunction(); return f ? f(fn) : setTimeout(fn, 33) }, Util.cancelAnimationFrame = function (clearID) { var f = this.cancelAnimationFrameFunction(); return f ? f(clearID) : clearTimeout(clearID) }, Util.requestAnimationFrameFunction = function () { return window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame }, Util.cancelAnimationFrameFunction = function () { return window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame }, Util.print = function (str, obj) { return _.reduce(obj, function (res, val, key) { return res.split("%" + key + "%").join(val) }, str) }, Util.attr2data = function (el) { var _this2 = this; return _.reduce(el.attributes, function (res, attr) { var k = attr.name.split("data-")[1]; if (!k) return res; var v = attr.value; return v.indexOf && (v.indexOf(",") >= 0 || v.indexOf(":") >= 0) && v.indexOf("//") < 0 && (v = v.split(","), v = _.map(v, function (v2) { return _this2.str2arr(v2, ":") })), res[k] = _this2.parseFloatOrRaw(v), res }, {}) }, Util.parseFloatOrRaw = function (v) { var num = parseFloat(v); return isNaN(num) ? v : String(num) === v ? num : v }, Util.parseIntOrRaw = function (v) { var num = parseInt(v); return isNaN(num) ? v : String(num) === v ? num : v }, Util.str2arr = function (v, delimiter) { var _this3 = this; return !v || !v.indexOf || v.indexOf(delimiter) < 0 ? this.parseFloatOrRaw(v) : _.map(v.split(delimiter), function (v2) { return _this3.parseFloatOrRaw(v2) }) }, Util.string2query = function (str) { return str = decodeURIComponent(str), _.reduce(str.split("&"), function (res, q) { var a = q.split("="); return 2 === a.length && (res[a[0]] = a[1]), res }, {}) }, Util.query2string = function (query) { return _.reduce(query, function (res, v, k) { return "" !== res && (res += "&"), res += k + "=" + v }, "") }, Util.copyProtect = function ($el) { $el.attr("unselectable", "on").attr("draggable", "false").css({ "-moz-user-select": "none", "-o-user-select": "none", "-khtml-user-select": "none", "-webkit-user-select": "none", "-ms-user-select": "none", "user-select": "none" }) }, Util.num2price = function (num) { return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }, Util.addClass = function (el, className) { el.classList ? el.classList.add(className) : el.className += " " + className }, Util.removeClass = function (el, className) { el.classList ? el.classList.remove(className) : el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ") }, Util.switchClass = function (el, className, isAdd) { isAdd ? this.addClass(el, className) : this.removeClass(el, className) }, Util.domHeight = function (el) { $ = $ || window.NCOMMON_$; var $el = $(el); return $el.outerHeight() + parseInt($el.css("margin-top")) + parseInt($el.css("margin-bottom")) }, Util.domChildrenHeight = function (el) { var _this4 = this; return $ = $ || window.NCOMMON_$, _.sum(_.map($(el).children(), function (child) { return _this4.domHeight(child) })) }, Util.initModules = function ($area, moduleList) {
          var _this5 = this;
          $ = $ || window.NCOMMON_$; var initChildModules = function ($childArea) { _this5.initModules($childArea, moduleList) },
            modules = _.compact(_.flatten(_.map(moduleList, function (Klass, key) {
              return _.map($area.find('[data-njs="' + key + '"]'), function (el) {
                var $el = $(el),
                attr = "data-inited-" + key; if (1 === parseInt($el.attr(attr))) return null; var options = Util.attr2data(el); if (options.cancelauto) return null; var instance = new Klass($el, options); return $el.attr(attr, 1), $el.addClass("js-moduleready"), $.data($el[0], "njs-instance", instance), instance
              })
            })));
          _.forEach(modules, function (module) { module.init && module.init(initChildModules) })
        }, Util
      }(_UtilLight3.default);
    module.exports = Util
  }, { "./Util-light": 35, "constants/Browsers": 29 }],
  37: [function (require, module, exports) {
    "use strict";
    exports.__esModule = !0, exports.default = function (fn) { "loading" != document.readyState ? fn() : document.addEventListener("DOMContentLoaded", fn) }
  }, {}],
  38: [function (require, module, exports) {
    ! function (undefined) {
      function init() { this._events = {}, this._conf && configure.call(this, this._conf) }

      function configure(conf) { conf && (this._conf = conf, conf.delimiter && (this.delimiter = conf.delimiter), conf.maxListeners && (this._events.maxListeners = conf.maxListeners), conf.wildcard && (this.wildcard = conf.wildcard), conf.newListener && (this.newListener = conf.newListener), this.wildcard && (this.listenerTree = {})) }

      function EventEmitter(conf) { this._events = {}, this.newListener = !1, configure.call(this, conf) }

      function searchListenerTree(handlers, type, tree, i) {
        if (!tree) return []; var leaf, len, branch, xTree, xxTree, isolatedBranch, endReached, listeners = [],
          typeLength = type.length,
          currentType = type[i],
          nextType = type[i + 1]; if (i === typeLength && tree._listeners) { if ("function" == typeof tree._listeners) return handlers && handlers.push(tree._listeners), [tree]; for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) handlers && handlers.push(tree._listeners[leaf]); return [tree] } if ("*" === currentType || "**" === currentType || tree[currentType]) { if ("*" === currentType) { for (branch in tree) "_listeners" !== branch && tree.hasOwnProperty(branch) && (listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 1))); return listeners } if ("**" === currentType) { endReached = i + 1 === typeLength || i + 2 === typeLength && "*" === nextType, endReached && tree._listeners && (listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength))); for (branch in tree) "_listeners" !== branch && tree.hasOwnProperty(branch) && ("*" === branch || "**" === branch ? (tree[branch]._listeners && !endReached && (listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength))), listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i))) : listeners = branch === nextType ? listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 2)) : listeners.concat(searchListenerTree(handlers, type, tree[branch], i))); return listeners } listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i + 1)) } if (xTree = tree["*"], xTree && searchListenerTree(handlers, type, xTree, i + 1), xxTree = tree["**"])
          if (i < typeLength) { xxTree._listeners && searchListenerTree(handlers, type, xxTree, typeLength); for (branch in xxTree) "_listeners" !== branch && xxTree.hasOwnProperty(branch) && (branch === nextType ? searchListenerTree(handlers, type, xxTree[branch], i + 2) : branch === currentType ? searchListenerTree(handlers, type, xxTree[branch], i + 1) : (isolatedBranch = {}, isolatedBranch[branch] = xxTree[branch], searchListenerTree(handlers, type, { "**": isolatedBranch }, i + 1))) } else xxTree._listeners ? searchListenerTree(handlers, type, xxTree, typeLength) : xxTree["*"] && xxTree["*"]._listeners && searchListenerTree(handlers, type, xxTree["*"], typeLength); return listeners
      }

      function growListenerTree(type, listener) {
        type = "string" == typeof type ? type.split(this.delimiter) : type.slice(); for (var i = 0, len = type.length; i + 1 < len; i++)
          if ("**" === type[i] && "**" === type[i + 1]) return; for (var tree = this.listenerTree, name = type.shift(); name;) {
            if (tree[name] || (tree[name] = {}), tree = tree[name], 0 === type.length) {
              if (tree._listeners) {
                if ("function" == typeof tree._listeners) tree._listeners = [tree._listeners, listener];
                else if (isArray(tree._listeners) && (tree._listeners.push(listener), !tree._listeners.warned)) { var m = defaultMaxListeners; "undefined" != typeof this._events.maxListeners && (m = this._events.maxListeners), m > 0 && tree._listeners.length > m && (tree._listeners.warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", tree._listeners.length), console.trace()) }
              } else tree._listeners = listener; return !0
            } name = type.shift()
          } return !0
      } var isArray = Array.isArray ? Array.isArray : function (obj) { return "[object Array]" === Object.prototype.toString.call(obj) },
        defaultMaxListeners = 10;
      EventEmitter.prototype.delimiter = ".", EventEmitter.prototype.setMaxListeners = function (n) { this._events || init.call(this), this._events.maxListeners = n, this._conf || (this._conf = {}), this._conf.maxListeners = n }, EventEmitter.prototype.event = "", EventEmitter.prototype.once = function (event, fn) { return this.many(event, 1, fn), this }, EventEmitter.prototype.many = function (event, ttl, fn) {
        function listener() { 0 === --ttl && self.off(event, listener), fn.apply(this, arguments) } var self = this; if ("function" != typeof fn) throw new Error("many only accepts instances of Function"); return listener._origin = fn, this.on(event, listener), self
      }, EventEmitter.prototype.emit = function () {
      this._events || init.call(this); var type = arguments[0]; if ("newListener" === type && !this.newListener && !this._events.newListener) return !1; if (this._all) { for (var l = arguments.length, args = new Array(l - 1), i = 1; i < l; i++) args[i - 1] = arguments[i]; for (i = 0, l = this._all.length; i < l; i++) this.event = type, this._all[i].apply(this, args) } if ("error" === type && !(this._all || this._events.error || this.wildcard && this.listenerTree.error)) throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event."); var handler; if (this.wildcard) {
        handler = []; var ns = "string" == typeof type ? type.split(this.delimiter) : type.slice();
        searchListenerTree.call(this, handler, ns, this.listenerTree, 0)
      } else handler = this._events[type]; if ("function" == typeof handler) {
        if (this.event = type, 1 === arguments.length) handler.call(this);
        else if (arguments.length > 1) switch (arguments.length) {
          case 2:
            handler.call(this, arguments[1]); break;
          case 3:
            handler.call(this, arguments[1], arguments[2]); break;
          default:
            for (var l = arguments.length, args = new Array(l - 1), i = 1; i < l; i++) args[i - 1] = arguments[i];
            handler.apply(this, args)
        }
        return !0
      } if (handler) { for (var l = arguments.length, args = new Array(l - 1), i = 1; i < l; i++) args[i - 1] = arguments[i]; for (var listeners = handler.slice(), i = 0, l = listeners.length; i < l; i++) this.event = type, listeners[i].apply(this, args); return listeners.length > 0 || !!this._all } return !!this._all
      }, EventEmitter.prototype.on = function (type, listener) {
        if ("function" == typeof type) return this.onAny(type), this; if ("function" != typeof listener) throw new Error("on only accepts instances of Function"); if (this._events || init.call(this), this.emit("newListener", type, listener), this.wildcard) return growListenerTree.call(this, type, listener), this; if (this._events[type]) {
          if ("function" == typeof this._events[type]) this._events[type] = [this._events[type], listener];
          else if (isArray(this._events[type]) && (this._events[type].push(listener), !this._events[type].warned)) { var m = defaultMaxListeners; "undefined" != typeof this._events.maxListeners && (m = this._events.maxListeners), m > 0 && this._events[type].length > m && (this._events[type].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length), console.trace()) }
        } else this._events[type] = listener; return this
      }, EventEmitter.prototype.onAny = function (fn) { if ("function" != typeof fn) throw new Error("onAny only accepts instances of Function"); return this._all || (this._all = []), this._all.push(fn), this }, EventEmitter.prototype.addListener = EventEmitter.prototype.on, EventEmitter.prototype.off = function (type, listener) {
        if ("function" != typeof listener) throw new Error("removeListener only takes instances of Function"); var handlers, leafs = []; if (this.wildcard) {
          var ns = "string" == typeof type ? type.split(this.delimiter) : type.slice();
          leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0)
        } else {
          if (!this._events[type]) return this;
          handlers = this._events[type], leafs.push({ _listeners: handlers })
        } for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
          var leaf = leafs[iLeaf]; if (handlers = leaf._listeners, isArray(handlers)) {
            for (var position = -1, i = 0, length = handlers.length; i < length; i++)
              if (handlers[i] === listener || handlers[i].listener && handlers[i].listener === listener || handlers[i]._origin && handlers[i]._origin === listener) { position = i; break }
            if (position < 0) continue; return this.wildcard ? leaf._listeners.splice(position, 1) : this._events[type].splice(position, 1), 0 === handlers.length && (this.wildcard ? delete leaf._listeners : delete this._events[type]), this
          } (handlers === listener || handlers.listener && handlers.listener === listener || handlers._origin && handlers._origin === listener) && (this.wildcard ? delete leaf._listeners : delete this._events[type])
        } return this
      }, EventEmitter.prototype.offAny = function (fn) {
        var fns, i = 0,
        l = 0; if (fn && this._all && this._all.length > 0) {
          for (fns = this._all, i = 0, l = fns.length; i < l; i++)
            if (fn === fns[i]) return fns.splice(i, 1), this
        } else this._all = []; return this
      }, EventEmitter.prototype.removeListener = EventEmitter.prototype.off, EventEmitter.prototype.removeAllListeners = function (type) {
        if (0 === arguments.length) return !this._events || init.call(this), this; if (this.wildcard)
          for (var ns = "string" == typeof type ? type.split(this.delimiter) : type.slice(), leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0), iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
            var leaf = leafs[iLeaf];
            leaf._listeners = null
          } else {
            if (!this._events[type]) return this;
          this._events[type] = null
        }
        return this
      }, EventEmitter.prototype.listeners = function (type) {
        if (this.wildcard) {
          var handlers = [],
          ns = "string" == typeof type ? type.split(this.delimiter) : type.slice(); return searchListenerTree.call(this, handlers, ns, this.listenerTree, 0), handlers
        } return this._events || init.call(this), this._events[type] || (this._events[type] = []), isArray(this._events[type]) || (this._events[type] = [this._events[type]]), this._events[type]
      }, EventEmitter.prototype.listenersAny = function () { return this._all ? this._all : [] }, "function" == typeof define && define.amd ? define(function () { return EventEmitter }) : "object" == typeof exports ? exports.EventEmitter2 = EventEmitter : window.EventEmitter2 = EventEmitter
    }()
  }, {}],
  39: [function (require, module, exports) {
    "use strict"; var tweenFunctions = { linear: function (t, b, _c, d) { var c = _c - b; return c * t / d + b }, easeInQuad: function (t, b, _c, d) { var c = _c - b; return c * (t /= d) * t + b }, easeOutQuad: function (t, b, _c, d) { var c = _c - b; return -c * (t /= d) * (t - 2) + b }, easeInOutQuad: function (t, b, _c, d) { var c = _c - b; return (t /= d / 2) < 1 ? c / 2 * t * t + b : -c / 2 * (--t * (t - 2) - 1) + b }, easeInCubic: function (t, b, _c, d) { var c = _c - b; return c * (t /= d) * t * t + b }, easeOutCubic: function (t, b, _c, d) { var c = _c - b; return c * ((t = t / d - 1) * t * t + 1) + b }, easeInOutCubic: function (t, b, _c, d) { var c = _c - b; return (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b }, easeInQuart: function (t, b, _c, d) { var c = _c - b; return c * (t /= d) * t * t * t + b }, easeOutQuart: function (t, b, _c, d) { var c = _c - b; return -c * ((t = t / d - 1) * t * t * t - 1) + b }, easeInOutQuart: function (t, b, _c, d) { var c = _c - b; return (t /= d / 2) < 1 ? c / 2 * t * t * t * t + b : -c / 2 * ((t -= 2) * t * t * t - 2) + b }, easeInQuint: function (t, b, _c, d) { var c = _c - b; return c * (t /= d) * t * t * t * t + b }, easeOutQuint: function (t, b, _c, d) { var c = _c - b; return c * ((t = t / d - 1) * t * t * t * t + 1) + b }, easeInOutQuint: function (t, b, _c, d) { var c = _c - b; return (t /= d / 2) < 1 ? c / 2 * t * t * t * t * t + b : c / 2 * ((t -= 2) * t * t * t * t + 2) + b }, easeInSine: function (t, b, _c, d) { var c = _c - b; return -c * Math.cos(t / d * (Math.PI / 2)) + c + b }, easeOutSine: function (t, b, _c, d) { var c = _c - b; return c * Math.sin(t / d * (Math.PI / 2)) + b }, easeInOutSine: function (t, b, _c, d) { var c = _c - b; return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b }, easeInExpo: function (t, b, _c, d) { var c = _c - b; return 0 == t ? b : c * Math.pow(2, 10 * (t / d - 1)) + b }, easeOutExpo: function (t, b, _c, d) { var c = _c - b; return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b }, easeInOutExpo: function (t, b, _c, d) { var c = _c - b; return 0 === t ? b : t === d ? b + c : (t /= d / 2) < 1 ? c / 2 * Math.pow(2, 10 * (t - 1)) + b : c / 2 * (-Math.pow(2, -10 * --t) + 2) + b }, easeInCirc: function (t, b, _c, d) { var c = _c - b; return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b }, easeOutCirc: function (t, b, _c, d) { var c = _c - b; return c * Math.sqrt(1 - (t = t / d - 1) * t) + b }, easeInOutCirc: function (t, b, _c, d) { var c = _c - b; return (t /= d / 2) < 1 ? -c / 2 * (Math.sqrt(1 - t * t) - 1) + b : c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b }, easeInElastic: function (t, b, _c, d) { var a, p, s, c = _c - b; return s = 1.70158, p = 0, a = c, 0 === t ? b : 1 === (t /= d) ? b + c : (p || (p = .3 * d), a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a), -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b) }, easeOutElastic: function (t, b, _c, d) { var a, p, s, c = _c - b; return s = 1.70158, p = 0, a = c, 0 === t ? b : 1 === (t /= d) ? b + c : (p || (p = .3 * d), a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a), a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b) }, easeInOutElastic: function (t, b, _c, d) { var a, p, s, c = _c - b; return s = 1.70158, p = 0, a = c, 0 === t ? b : 2 === (t /= d / 2) ? b + c : (p || (p = d * (.3 * 1.5)), a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a), t < 1 ? -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b : a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b) }, easeInBack: function (t, b, _c, d, s) { var c = _c - b; return void 0 === s && (s = 1.70158), c * (t /= d) * t * ((s + 1) * t - s) + b }, easeOutBack: function (t, b, _c, d, s) { var c = _c - b; return void 0 === s && (s = 1.70158), c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b }, easeInOutBack: function (t, b, _c, d, s) { var c = _c - b; return void 0 === s && (s = 1.70158), (t /= d / 2) < 1 ? c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b : c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b }, easeInBounce: function (t, b, _c, d) { var v, c = _c - b; return v = tweenFunctions.easeOutBounce(d - t, 0, c, d), c - v + b }, easeOutBounce: function (t, b, _c, d) { var c = _c - b; return (t /= d) < 1 / 2.75 ? c * (7.5625 * t * t) + b : t < 2 / 2.75 ? c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b : t < 2.5 / 2.75 ? c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b : c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b }, easeInOutBounce: function (t, b, _c, d) { var v, c = _c - b; return t < d / 2 ? (v = tweenFunctions.easeInBounce(2 * t, 0, c, d), .5 * v + b) : (v = tweenFunctions.easeOutBounce(2 * t - d, 0, c, d), .5 * v + .5 * c + b) } };
    module.exports = tweenFunctions
  }, {}]
}, {}, [1]);