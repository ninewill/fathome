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
  }, { eventemitter2: 45, "stores/WindowStore": 33, "utils/Tween": 37 }],
  2: [function (require, module, exports) {
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
  }, { "stores/WindowStore": 33, "utils/Util": 40 }],
  3: [function (require, module, exports) {
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
  }, { "stores/WindowStore": 33 }],
  4: [function (require, module, exports) {
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
  }, { "constants/Browsers": 30, "stores/WindowStore": 33, "utils/Tween": 37 }],
  5: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") }

    function _possibleConstructorReturn(self, call) { if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !call || "object" != typeof call && "function" != typeof call ? self : call }

    function _inherits(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    } var _eventemitter = require("eventemitter2"),
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
        function Slider($el, options) { _classCallCheck(this, Slider), $ = window.NCOMMON_$ || window.$; var _this = _possibleConstructorReturn(this, _EventEmitter.call(this)); return _this.$ = $el, _this.options = _.assign({ autoplay: !1, autoplayinterval: 4e3, eachheight: !1, repeat: !1, repeat_cnt: 10, endevent: !1, automove: !1 }, options), _this.$clip = _this.$.find('[data-njs="slider__clip"]'), _this.$container = _this.$.find('[data-njs="slider__container"]'), _this.$nav = _this.$.find('[data-njs="slider__nav"]'), _this.$tpl_navItem = _this.$.find('[data-njs="slider__navItem"]').remove(), _this.$prev = _this.$.find('[data-njs="slider__prev"]'), _this.$next = _this.$.find('[data-njs="slider__next"]'), _this } return _inherits(Slider, _EventEmitter), Slider.prototype.onEnd = function (f) { this.on("end", f) }, Slider.prototype.init = function () {
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
        }, Slider.prototype.killAuto = function () { this._twAuto.stop() }, Slider.prototype.setAuto = function () {
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
  }, { "constants/Browsers": 30, eventemitter2: 45, "stores/WindowStore": 33, "utils/Draggee": 35, "utils/Tween": 37, "utils/Util": 40 }],
  6: [function (require, module, exports) {
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
  }, { "stores/WindowStore": 33 }],
  7: [function (require, module, exports) {
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
  }, { "constants/Browsers": 30 }],
  8: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } } var _Util = require("utils/Util"),
      _Util2 = _interopRequireDefault(_Util),
      _jquery = require("jquery"),
      _jquery2 = _interopRequireDefault(_jquery),
      _lodash = require("lodash"),
      _lodash2 = _interopRequireDefault(_lodash),
      _bluebird = require("bluebird"),
      _bluebird2 = _interopRequireDefault(_bluebird),
      _jquery3 = require("libs/jquery.css3"),
      _jquery4 = _interopRequireDefault(_jquery3),
      _jquery5 = require("libs/jquery.swithclass"),
      _jquery6 = _interopRequireDefault(_jquery5),
      _Browsers = require("constants/Browsers"),
      _Browsers2 = _interopRequireDefault(_Browsers),
      _Endpoints = require("./ncommon_shared/Endpoints"),
      _Endpoints2 = _interopRequireDefault(_Endpoints),
      _Paths = require("./ncommon_shared/Paths"),
      _Paths2 = _interopRequireDefault(_Paths),
      _Dictionary = require("./ncommon_shared/Dictionary"),
      _Dictionary2 = _interopRequireDefault(_Dictionary),
      _gheader = require("./ncommon_shared/gheader"),
      _gheader2 = _interopRequireDefault(_gheader),
      _gfooter = require("./ncommon_shared/gfooter"),
      _gfooter2 = _interopRequireDefault(_gfooter),
      _sheader = require("./ncommon_shared/sheader"),
      _sheader2 = _interopRequireDefault(_sheader),
      _sfooter = require("./ncommon_shared/sfooter"),
      _sfooter2 = _interopRequireDefault(_sfooter),
      _guardian = require("./ncommon_shared/guardian"),
      _guardian2 = _interopRequireDefault(_guardian),
      depth = _Util2.default.getDepthFromScript("/common/v2/js/ncommon_shared.js");
    window.NCOMMON_$ = _jquery2.default, window.$ || (window.$ = window.jQuery = _jquery2.default), window._ || (window._ = _lodash2.default), window.Promise = _bluebird2.default, (0, _jquery4.default)(window.NCOMMON_$), (0, _jquery6.default)(window.NCOMMON_$); var html = document.getElementsByTagName("html")[0];
    html.setAttribute("data-device", _Browsers2.default.touch ? "touch" : "desktop"), _Browsers2.default.ntd && html.setAttribute("data-nofixed", "1"), _Endpoints2.default.setup(depth), _Paths2.default.setup(depth), window.NCOMMON = _lodash2.default.assign(window.NCOMMON || {}, { depth: depth, Util: _Util2.default, Browsers: _Browsers2.default, Endpoints: _Endpoints2.default, Paths: _Paths2.default, Dictionary: _Dictionary2.default, gheader: _gheader2.default, gfooter: _gfooter2.default, sheader: _sheader2.default, sfooter: _sfooter2.default, guardian: _guardian2.default })
  }, { "./ncommon_shared/Dictionary": 11, "./ncommon_shared/Endpoints": 12, "./ncommon_shared/Paths": 14, "./ncommon_shared/gfooter": 15, "./ncommon_shared/gheader": 16, "./ncommon_shared/guardian": 17, "./ncommon_shared/sfooter": 23, "./ncommon_shared/sheader": 26, bluebird: 42, "constants/Browsers": 30, jquery: 46, "libs/jquery.css3": 31, "libs/jquery.swithclass": 32, lodash: 47, "utils/Util": 40 }],
  9: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0;
    var _AlpsMock = require("./AlpsMock"),
      _AlpsMock2 = _interopRequireDefault(_AlpsMock),
      $ = void 0,
      $orNull = function (expr) { $ = window.NCOMMON_$ || window.$; var $el = $(expr); return 0 === $el.length ? null : $el },
      Alps = function () {
        function Alps() { _classCallCheck(this, Alps) }
        return Alps.tpl = function (id, _tpl) {
        $ = window.NCOMMON_$ || window.$, this.$body = this.$body || $(document.body); var script = document.createElement("script");
          script.type = "text/x-riot-tmpl", script.id = id, script.innerHTML = _tpl, this.$body.prepend(script)
        }, Alps.init = function () {
          var _this = this;
          return $ = window.NCOMMON_$ || window.$, this._isInited || (this._isInited = !0, _AlpsMock2.default.needMock() ? _AlpsMock2.default.init().then(this._completed.bind(this)) : this._init().then(this._completed.bind(this))), this._alpsInfo ? Promise.resolve(this._alpsInfo) : (this._initCallbacks = this._initCallbacks || [],
            new Promise(function (f, r) { _this._initCallbacks.push(f) }))
        }, Alps._completed = function (alpsInfo) {
          var _this2 = this;
          $ = window.NCOMMON_$ || window.$, this._alpsInfo = alpsInfo, _.forEach(this._initCallbacks, function (callback) { return callback(_this2._alpsInfo) }), window.NCOMMON = window.NCOMMON || {}, window.NCOMMON.alpsInfo = alpsInfo, $(window).trigger("ncommon.alps.load")
        }, Alps._init = function () { return $ = window.NCOMMON_$ || window.$, this.tpl("alps_welcome_account_loading", ""), Alps.tpl("alps_welcome_account_guest", '\n<ul id="alps-account__guest">\n     <li data-name="btLogin" data-type="dom">\n        <button onclick="{ login }">ログイン</button>\n    </li>\n</ul>\n  '), Alps.tpl("alps_welcome_account_logged_in", '\n      <ul id="alps-account__loggedin">\n        <li data-name="nickname">{ account.nickname }</li>\n        <li data-name="miiIconUrl" data-type="img">\n          <img if="{ account.miiIconUrl }" riot-src="{ account.miiIconUrl }" />\n        </li>\n        <li data-name="miiIconUrlDefault" data-type="img">\n          <img src="https://cdn.accounts.nintendo.com/account/images/pc/defaults/mii2.png" />\n        </li>\n        <li data-name="favoriteColor">{ account.favoriteColor }</li>\n        <li data-name="unreadCountText">{ account.unreadCountText }</li>\n        <li if="{ points.isLoaded }" data-name="pointsPlatinum" id="alps-points__loaded">{ points.platinum }</li>\n        <li if="{ points.isLoaded }" data-name="pointsGold">{ points.gold }</li>\n        <li data-name="btLogount" data-type="dom">\n          <button onclick="{ logout }">ログアウト</button>\n        </li>\n      </ul>\n  '), Alps.tpl("alps_welcome_my_nintendo_point", ""), Alps.tpl("alps_welcome_unread_count", ""), Alps.tpl("alps_welcome_notifications_loading", ""), Alps.tpl("alps_welcome_notifications_none", '\n      <ul id="alps-notice__none"></ul>\n  '), Alps.tpl("alps_welcome_notifications_error", '\n      <ul id="alps-notice__error">\n          <li data-name="error_header" if="{ errorInfo.header }" riot-tag="raw" content="{ errorInfo.header }"></li>\n          <li data-name="error_message" riot-tag="raw" content="{ errorInfo.message }"></li>\n      </ul>\n  '), Alps.tpl("alps_welcome_notifications_list", '\n      <ul id="alps-notice__list">\n          <li data-name="list" data-type="dom">\n            <div>\n              <div each="{ notifications }" class="{\n                         ncommon-gheader-myInfo__item: true,\n                         js-em: alpsEmText &amp;&amp; !alpsSaleFlag,\n                         js-em_sale: alpsSaleFlag,\n                         js-special: alpsBanner,\n                         js-read: status === \'READ\',\n                         js-unread: status !== \'READ\'\n                         }">\n                <img if="{ alpsBanner }" class="ncommon-myInfo__itemBanner" riot-src="{ alpsBanner }" style="display: none;" />\n                <a href="{ alpsLinkHref }" target="{ alpsLinkTarget }" onclick="{ parent.onClickNotification }">\n                  <div class="ncommon-myInfo__itemThumb" style="background-image:url({ alpsIcon });"></div>\n                  <div class="ncommon-myInfo__itemTexts">\n                    <div class="ncommon-myInfo__itemTitle"><span>{ title }</span></div>\n                    <div class="ncommon-myInfo__itemDate"><span>{ alpsDateText }</span></div>\n                  </div>\n                </a>\n              </div>\n            </div>\n          </li>\n      </ul>\n  '), this.$ = $('\n      <div style="position: relative; height: 0; overflow: hidden;">\n        <alps-welcome-account></alps-welcome-account>\n        <alps-welcome-notifications></alps-welcome-notifications>\n      </div>\n    '), $(document.body).append(this.$), this._waitLoad() }, Alps._waitLoad = function () { var _this3 = this; return $ = window.NCOMMON_$ || window.$, new Promise(function (f, r) { _this3._checkDOM(f) }) }, Alps._checkDOM = function (callback) {
          $ = window.NCOMMON_$ || window.$; var $account__guest = $orNull("#alps-account__guest"),
            $account__loggedin = $orNull("#alps-account__loggedin"),
            $points__loaded = $orNull("#alps-points__loaded"),
            $notice__none = $orNull("#alps-notice__none"),
            $notice__error = $orNull("#alps-notice__error"),
            $notice__list = $orNull("#alps-notice__list"),
            isAccountLoaded = !(!$account__guest && !$points__loaded),
            isNoticeLoaded = !!($notice__none || $notice__error || $notice__list),
            isLoggedin = !!$account__loggedin; if (isAccountLoaded && (!isLoggedin || isLoggedin && isNoticeLoaded)) {
              var account = this._dom2info(isLoggedin ? $account__loggedin : $account__guest),
              notice = this._dom2info($notice__list || $notice__none || $notice__error);
              callback({ isLoggedin: isLoggedin, account: account, notice: notice })
            } else setTimeout(this._checkDOM.bind(this, callback), 100)
        }, Alps._dom2info = function ($el) {
          return $ = window.NCOMMON_$ || window.$, $el ? _.reduce($el.children(), function (res, el) {
            var $el = $(el),
            name = $el.attr("data-name"),
            type = $el.attr("data-type"),
            val = $el.html(); return "dom" === type && (val = $el.children()), "img" === type && (val = $el.find("img").attr("src")), res[name] = val, res
          }, {}) : {}
        }, Alps
      }();
    exports.default = Alps
  }, { "./AlpsMock": 10 }],
  10: [function (require, module, exports) {
    "use strict";

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var $ = void 0,
      AlpsMock = function () {
        function AlpsMock() { _classCallCheck(this, AlpsMock) } return AlpsMock.needMock = function () { $ = window.NCOMMON_$ || window.$; var domain = location.href.split("/")[2]; return !domain.match(/.*\.nintendo\.co\.jp/) }, AlpsMock.init = function () { var _this = this; return $ = window.NCOMMON_$ || window.$, new Promise(function (f, r) { setTimeout(function () { f(_this._getData()) }, 2e3) }) }, AlpsMock._getData = function () { return $ = window.NCOMMON_$ || window.$, this._isLoggedin() ? this._getDataLoggedin() : this._getDataGuest() }, AlpsMock._isLoggedin = function () { $ = window.NCOMMON_$ || window.$; var KEY = "ncommon_dummy_loggedin"; return 1 === parseInt(localStorage.getItem(KEY)) }, AlpsMock._getDataGuest = function () { return $ = window.NCOMMON_$ || window.$, { isLoggedin: !1, account: { btLogin: $("<button>ログイン</button>").on("click", function () { return alert("login (dummy)") }) } } }, AlpsMock._getDataLoggedin = function () { return $ = window.NCOMMON_$ || window.$, { isLoggedin: !0, account: { btLogount: $("<button>ログアウト</button>").on("click", function () { return alert("logout (dummy)") }), favoriteColor: "white", unreadCountText: "222222", miiIconUrl: "https://cdn-mii.accounts.nintendo.com/1.0.0/miis/ebfb5e768c123382/image/dd12e96c352ae77c-ebcc0c4f725b6b02.png?type=face&width=270", nickname: "１０文字以内のなまえ", pointsGold: "111111", pointsPlatinum: "999999" }, notice: { list: $('\n          <div>\n            <div class="ncommon-gheader-myInfo__item js-unread">\n              <img class="ncommon-myInfo__itemBanner" src="https://img-n.cdn.nintendo.net/bannerJS-FAthanks15a.png" style="display: none;" />\n              <a href="https://my.nintendo.com/news/17d390a68e08be25?notification=2016-12-01_J_S_00119" target="_blank">\n                <div class="ncommon-myInfo__itemThumb" style="background-image:url(https://cdn-image-f3580964b8e711e5b95f2ff191a1c838.baas.nintendo.com/1/f80a01ec25202453);"></div>\n                <div class="ncommon-myInfo__itemTexts">\n                  <div class="ncommon-myInfo__itemTitle"><span>マイニンテンドーオリジナルのしずえの3DSテーマをギフトに追加しました。1</span></div>\n                  <div class="ncommon-myInfo__itemDate"><span>2016.12.1</span></div>\n                </div>\n              </a>\n            </div>\n            <div class="ncommon-gheader-myInfo__item">\n              <a href="https://my.nintendo.com/news/17d390a68e08be25?notification=2016-12-01_J_S_00119" target="_blank">\n                <div class="ncommon-myInfo__itemThumb" style="background-image:url(https://cdn-image-f3580964b8e711e5b95f2ff191a1c838.baas.nintendo.com/1/f80a01ec25202453);"></div>\n                <div class="ncommon-myInfo__itemTexts">\n                  <div class="ncommon-myInfo__itemTitle"><span>マイニンテンドーオリジナルのしずえの3DSテーマをギフトに追加しました。2</span></div>\n                  <div class="ncommon-myInfo__itemDate"><span>2016.12.1</span></div>\n                </div>\n              </a>\n            </div>\n            <div class="ncommon-gheader-myInfo__item">\n              <a href="https://my.nintendo.com/news/17d390a68e08be25?notification=2016-12-01_J_S_00119" target="_blank">\n                <div class="ncommon-myInfo__itemThumb" style="background-image:url(https://cdn-image-f3580964b8e711e5b95f2ff191a1c838.baas.nintendo.com/1/f80a01ec25202453);"></div>\n                <div class="ncommon-myInfo__itemTexts">\n                  <div class="ncommon-myInfo__itemTitle"><span>マイニンテンドーオリジナルのしずえの3DSテーマをギフトに追加しました。3</span></div>\n                  <div class="ncommon-myInfo__itemDate"><span>2016.12.1</span></div>\n                </div>\n              </a>\n            </div>\n            <div class="ncommon-gheader-myInfo__item">\n              <a href="https://my.nintendo.com/news/17d390a68e08be25?notification=2016-12-01_J_S_00119" target="_blank">\n                <div class="ncommon-myInfo__itemThumb" style="background-image:url(https://cdn-image-f3580964b8e711e5b95f2ff191a1c838.baas.nintendo.com/1/f80a01ec25202453);"></div>\n                <div class="ncommon-myInfo__itemTexts">\n                  <div class="ncommon-myInfo__itemTitle"><span>マイニンテンドーオリジナルのしずえの3DSテーマをギフトに追加しました。4</span></div>\n                  <div class="ncommon-myInfo__itemDate"><span>2016.12.1</span></div>\n                </div>\n              </a>\n            </div>\n          </div>\n        ') } } }, AlpsMock
      }();
    exports.default = AlpsMock
  }, {}],
  11: [function (require, module, exports) {
    "use strict";
    exports.__esModule = !0; var JP = { "3ds": "ニンテンドー3DS", wiiu: "Wii U", switch: "Nintendo Switch", pkg_dl: "パッケージ版/ダウンロード版", dl: "ダウンロードソフト", pkg: "パッケージ版", vc: "バーチャルコンソール", wiiu_disc: "Wiiディスク(ダウンロード版)", "3ds_dl": "3DSダウンロードソフト", theme: "3DSテーマ", hard: "本体", other: "その他" },
      EN = {};
    Object.keys(JP).forEach(function (k) { EN[JP[k]] = k }), exports.default = { jp2en: function () { var jp = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""; return EN[jp] || "other" }, en2jp: function () { var en = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""; return _.map(en.split(" ").join("").split(","), function (str) { return JP[str] || "その他" }).join(",") } }
  }, {}],
  12: [function (require, module, exports) {
    "use strict";
    exports.__esModule = !0; var Endpoints = { newtopics: "https://topics.nintendo.co.jp/c/topic_api/json_list?key=newtopics", whatsnew: "/news/whatsnew.xml", netinfo: "/netinfo/ja_JP/status.json", schedule: "/data/schedule/xml/list.xml", sale_3ds: "/3ds/software/data/eshopinfo.js?callback=eshopinfo3ds", sale_wiiu: "/wiiu/software/data/eshopinfo.js?callback=eshopinfowiiu", soft_wiiu_pkg_20: "/data/software/xml/wiiu_pkg_dl_20.xml", soft_wiiu_pkg: "/data/software/xml/wiiu_pkg_dl.xml", soft_wiiu_vc: "/data/software/xml/wiiu_vc.xml", soft_wiiu_ranking_new: "/data/software/xml/wiiu_new_sales.xml", soft_wiiu_ranking_past: "/data/software/xml/wiiu_sales.xml", soft_3ds_pkg_20: "/data/software/xml/3ds_pkg_dl_20.xml", soft_3ds_pkg: "/data/software/xml/3ds_pkg_dl.xml", soft_3ds_vc: "/data/software/xml/3ds_vc.xml", soft_3ds_ranking_new: "/data/software/xml/3ds_new_sales.xml", soft_3ds_ranking_past: "/data/software/xml/3ds_sales.xml", soft_free: "/data/software/xml-static/free.xml", soft_trial: "/data/software/xml-static/trial.xml", game_series: "/data/software/xml-static/game_series.xml" };
    exports.default = {
      setup: function (depth) {
        var _this = this;
        _.forEach(Endpoints, function (url, key) { "/" === url.substr(0, 1) && (url = depth + url), _this[key] = url }), delete this.setup
      }
    }
  }, {}],
  13: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var _DataHandler = require("utils/DataHandler"),
      _DataHandler2 = _interopRequireDefault(_DataHandler),
      $ = void 0,
      NetInfo = function () {
        function NetInfo() { _classCallCheck(this, NetInfo), $ = window.NCOMMON_$ || window.$, this._callbacks = [] } return NetInfo.prototype.load = function (callback) { return this._data ? callback(this._data) : (this._start(), void this._callbacks.push(callback)) }, NetInfo.prototype._start = function () {
          var _this = this; if (!this._started) {
          this._started = !0; var interval = 300,
            update = (new Date).getTime() / 1e3 / interval | 0;
            new _DataHandler2.default($).add(NCOMMON.Endpoints.netinfo + "?" + update).start().then(function (data) { _this._data = data, _.forEach(_this._callbacks, function (callback) { callback(_this._data) }) })
          }
        }, NetInfo
      }();
    exports.default = new NetInfo
  }, { "utils/DataHandler": 34 }],
  14: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } } exports.__esModule = !0; var _path = require("path"),
      _path2 = _interopRequireDefault(_path),
      normalize = function (p) { p = p.split("?")[0].split("#")[0]; var ext = _path2.default.extname(p); return ext || (p += "index.html"), p };
    exports.default = {
      setup: function (depth) {
        var root = _path2.default.join(_path2.default.dirname(normalize(location.pathname)), depth),
        pathname = ("/" === root ? normalize(location.pathname) : normalize(location.href).split(root)[1] || "").split("?")[0].split("#")[0]; if (pathname) {
          var d = pathname.split("/");
          d = _.filter(d, function (_d) { return !_.includes(_d, ".html") }), d.shift(), this.level1 = d[0] || "", this.level2 = d[1] || "", this.level3 = d[2] || "", this.is_top = !this.level1, this.is_hardware = "hardware" === this.level1, this.is_software = "software" === this.level2, this.hard = this.level2, this.level2 && this.level2.indexOf("ds") >= 0 && (this.hard = "3ds"), this.level2 && this.level2.indexOf("nintendozone") >= 0 && (this.hard = "3ds")
        } delete this.setup
      }
    }
  }, { path: 43 }],
  15: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } } exports.__esModule = !0; var _Util = require("utils/Util"),
      _DataHandler = (_interopRequireDefault(_Util), require("utils/DataHandler")),
      _moduleInit = (_interopRequireDefault(_DataHandler), require("./module-init")),
      _moduleInit2 = _interopRequireDefault(_moduleInit),
      _WindowStore = require("stores/WindowStore"),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      _NetInfo = require("./NetInfo"),
      _NetInfo2 = _interopRequireDefault(_NetInfo),
      $ = void 0;
    exports.default = function (isMini) {
    $ = window.NCOMMON_$ || window.$, _WindowStore2.default.forceSetup(); var $parent = $("#ncommon-gfooter"),
      html = void 0,
      html_sns = "",
      html_related = "";
      NCOMMON.Paths.is_top && ($parent.addClass("js-top"), html_sns = '\n    <div class="ncommon-gfooter-sns">\n      <div class="ncommon-gfooter-sns__headline">ソーシャルメディアアカウント</div>\n      <ul class="ncommon-gfooter-sns__list">\n        <li class="ncommon-gfooter-sns__item ncommon-gfooter-sns__item--line"><a href="' + NCOMMON.depth + '/social/index.html#section-line"><span></span>LINE</a></li>\n        <li class="ncommon-gfooter-sns__item ncommon-gfooter-sns__item--twitter"><a href="' + NCOMMON.depth + '/social/index.html#section-twitter"><span></span>Twitter</a></li>\n        <li class="ncommon-gfooter-sns__item ncommon-gfooter-sns__item--youtube"><a href="' + NCOMMON.depth + '/social/index.html#section-youtube"><span></span>YouTube</a></li>\n        <li class="ncommon-gfooter-sns__item ncommon-gfooter-sns__item--instagram"><a href="' + NCOMMON.depth + '/social/index.html#section-instagram"><span></span>Instagram</a></li>\n      </ul>\n    </div>\n    ', html_related = '\n    <div class="ncommon-gfooter-related1">\n      <div class="ncommon-gfooter-related1__company" data-njs="accordion">\n        <div class="ncommon-gfooter-related1__headline" data-njs="accordion__toggle">会社情報</div>\n        <div class="ncommon-gfooter-related1__listWrap" data-njs="accordion__container">\n          <ul class="ncommon-gfooter-related1__list" data-theme="other" data-njs="accordion__content">\n            <li class="ncommon-gfooter-related1__item"><a href="' + NCOMMON.depth + '/corporate/index.html"><i><i><i></i><i></i><i></i></i></i>会社情報</a></li>\n            <li class="ncommon-gfooter-related1__item"><a href="' + NCOMMON.depth + '/ir/index.html"><i><i><i></i><i></i><i></i></i></i>株主・投資家向け情報</a></li>\n            <li class="ncommon-gfooter-related1__item"><a href="' + NCOMMON.depth + '/corporate/release/index.html"><i><i><i></i><i></i><i></i></i></i>ニュースリリース</a></li>\n            <li class="ncommon-gfooter-related1__item"><a href="' + NCOMMON.depth + '/jobs/index.html"><i><i><i></i><i></i><i></i></i></i>採用情報</a></li>\n            <li class="ncommon-gfooter-related1__item"><a href="' + NCOMMON.depth + '/csr/index.html"><i><i><i></i><i></i><i></i></i></i>CSRレポート</a></li>\n          </ul>\n        </div>\n      </div>\n      <div class="ncommon-gfooter-related1__cards">\n        <a href="' + NCOMMON.depth + '/others/index.html" class="ncommon-gfooter-related1__headline">トランプ・花札など</a>\n      </div>\n    </div>\n    '), isMini || (html = '\n    <div class="ncommon-g-innerW">\n      <div id="ncommon-gfooter-snsWrap">' + html_sns + '</div>\n      <ul class="ncommon-gfooter-spNav">\n        <li class="ncommon-gfooter-spNav__item ncommon-gfooter-spNav__item--hardware"><a href="' + NCOMMON.depth + '/hardware/index.html">ゲーム機本体</a></li>\n        <li class="ncommon-gfooter-spNav__item ncommon-gfooter-spNav__item--software"><a href="' + NCOMMON.depth + '/software/index.html">ゲームソフト・<br>アプリ</a></li>\n        <li class="ncommon-gfooter-spNav__item ncommon-gfooter-spNav__item--amiibo"><a href="' + NCOMMON.depth + '/amiibo/index.html">amiibo</a></li>\n        <li class="ncommon-gfooter-spNav__item ncommon-gfooter-spNav__item--topics"><a href="https://topics.nintendo.co.jp/index.html">トピックス</a></li>\n        <li class="ncommon-gfooter-spNav__item ncommon-gfooter-spNav__item--support"><a href="' + NCOMMON.depth + '/support/index.html">サポート</a></li>\n      </ul>\n      <div class="ncommon-gfooter-related2__wrap-sp"></div>\n      <div id="ncommon-gfooter-related1Wrap">' + html_related + '</div>\n      <div class="ncommon-gfooter-row">\n        <div class="ncommon-gfooter-related2__wrap-pc_tab">\n          <div class="ncommon-gfooter-related2" data-njs="toggleparent" data-parent_sp=".ncommon-gfooter-related2__wrap-sp">\n            <div class="ncommon-gfooter-related2__unit" data-theme="netinfo">\n              <a href="' + NCOMMON.depth + '/netinfo/index.html" class="ncommon-gfooter-related2__unitInner">\n                <div class="ncommon-gfooter-related2__icon ncommon-gfooter-related2__icon--networkinfo" id="ncommon-gfooter-related2__icon--networkinfo"><span></span></div>\n                <div class="ncommon-gfooter-related2__text">ネットワーク稼働状況</div>\n              </a>\n            </div>\n            <div class="ncommon-gfooter-related2__unit">\n              <div class="ncommon-gfooter-related2__unitInner">\n                <div class="ncommon-gfooter-related2__icon ncommon-gfooter-related2__icon--my"><span></span></div>\n                <ul class="ncommon-gfooter-related2__linkList" data-theme="default">\n                  <li class="ncommon-gfooter-related2__linkItem"><a href="https://store.nintendo.co.jp/" target="_blank"><i><i><i></i><i></i><i></i></i></i>マイニンテンドーストア</a></li>\n                  <li class="ncommon-gfooter-related2__linkItem"><a href="https://my.nintendo.com/" target="_blank"><i><i><i></i><i></i><i></i></i></i>マイニンテンドーポイント<br>プログラム</a></li>\n                </ul>\n              </div>\n            </div>\n            <div class="ncommon-gfooter-related2__unit" data-theme="miiverse">\n              <a href="https://miiverse.nintendo.net/" target="_blank" class="ncommon-gfooter-related2__unitInner">\n                <div class="ncommon-gfooter-related2__icon ncommon-gfooter-related2__icon--miiverse"><span></span></div>\n                <div class="ncommon-gfooter-related2__text">Miiverse</div>\n              </a>\n            </div>\n          </div>\n        </div>\n        <div class="ncommon-gfooter-sitemap" data-theme="default">\n          <div class="ncommon-gfooter-sitemap__col">\n            <div class="ncommon-gfooter-sitemap__unit">\n              <div class="ncommon-gfooter-sitemap__mainCat"><a href="' + NCOMMON.depth + '/hardware/index.html"><i><i><i></i><i></i><i></i></i></i>ゲーム機本体</a></div>\n              <div class="ncommon-gfooter-sitemap__list">\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/hardware/switch/index.html"><i><i><i></i><i></i><i></i></i></i>Nintendo Switch</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/hardware/2ds/index.html"><i><i><i></i><i></i><i></i></i></i>ニンテンドー2DS</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/hardware/new3dsll/index.html"><i><i><i></i><i></i><i></i></i></i>Newニンテンドー3DS LL</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/hardware/new3ds/index.html"><i><i><i></i><i></i><i></i></i></i>Newニンテンドー3DS</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="#"><i><i><i></i><i></i><i></i></i></i>ニンテンドークラシックミニ<br>ファミリーコンピュータ</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/hardware/wiiu/index.html"><i><i><i></i><i></i><i></i></i></i>Wii U</a></div>\n              </div>\n            </div>\n          </div>\n          <div class="ncommon-gfooter-sitemap__col">\n            <div class="ncommon-gfooter-sitemap__unit">\n              <div class="ncommon-gfooter-sitemap__mainCat"><a href="' + NCOMMON.depth + '/software/index.html"><i><i><i></i><i></i><i></i></i></i>ゲームソフト・アプリ</a></div>\n              <div class="ncommon-gfooter-sitemap__list">\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/software/switch/index.html"><i><i><i></i><i></i><i></i></i></i>Nintendo Switchで遊ぶ</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/software/3ds/index.html"><i><i><i></i><i></i><i></i></i></i>ニンテンドー3DSで遊ぶ</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/software/smartphone/index.html"><i><i><i></i><i></i><i></i></i></i>スマートフォンで遊ぶ</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/software/wiiu/index.html"><i><i><i></i><i></i><i></i></i></i>Wii Uで遊ぶ</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/software/free/index.html"><i><i><i></i><i></i><i></i></i></i>無料で遊べるソフト</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/software/trial/index.html"><i><i><i></i><i></i><i></i></i></i>体験版が遊べるソフト</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/software/campaign/index.html"><i><i><i></i><i></i><i></i></i></i>キャンペーン＆SALE情報</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/schedule/index.html"><i><i><i></i><i></i><i></i></i></i>発売スケジュール</a></div>\n              </div>\n            </div>\n          </div>\n          <div class="ncommon-gfooter-sitemap__col">\n            <div class="ncommon-gfooter-sitemap__unit">\n              <div class="ncommon-gfooter-sitemap__mainCat"><a href="https://topics.nintendo.co.jp/index.html"><i><i><i></i><i></i><i></i></i></i>トピックス</a></div>\n              <div class="ncommon-gfooter-sitemap__list">\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="https://topics.nintendo.co.jp/c/list.html"><i><i><i></i><i></i><i></i></i></i>記事一覧</a></div>\n              </div>\n            </div>\n            <div class="ncommon-gfooter-sitemap__unit">\n              <div class="ncommon-gfooter-sitemap__mainCat"><a href="' + NCOMMON.depth + '/amiibo/index.html"><i><i><i></i><i></i><i></i></i></i>amiibo</a></div>\n              <div class="ncommon-gfooter-sitemap__list">\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/amiibo/about/index.html"><i><i><i></i><i></i><i></i></i></i>amiiboって？</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/amiibo/lineup/index.html"><i><i><i></i><i></i><i></i></i></i>ラインナップ</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/amiibo/software/index.html"><i><i><i></i><i></i><i></i></i></i>対応ソフト</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/amiibo/set/index.html"><i><i><i></i><i></i><i></i></i></i>セット商品</a></div>\n              </div>\n            </div>\n          </div>\n          <div class="ncommon-gfooter-sitemap__col">\n            <div class="ncommon-gfooter-sitemap__unit">\n              <div class="ncommon-gfooter-sitemap__mainCat"><a href="' + NCOMMON.depth + '/support/index.html"><i><i><i></i><i></i><i></i></i></i>サポート</a></div>\n              <div class="ncommon-gfooter-sitemap__list">\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="https://support.nintendo.co.jp/app/home"><i><i><i></i><i></i><i></i></i></i>Q&amp;A<br>(よくあるご質問と回答)</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/support/errorcode/index.html"><i><i><i></i><i></i><i></i></i></i>エラーコードから<br>対処法を調べる</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/support/3ds/index.html"><i><i><i></i><i></i><i></i></i></i>ニンテンドー3DS</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/support/wiiu/index.html"><i><i><i></i><i></i><i></i></i></i>Wii U</a></div>\n                <div class="ncommon-gfooter-sitemap__subCat"><a href="' + NCOMMON.depth + '/support/my_nintendo/index.html"><i><i><i></i><i></i><i></i></i></i>マイニンテンドー</a></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="ncommon-gfooter-foot">\n      <div class="ncommon-g-innerW">\n        <ul class="ncommon-gfooter-foot__nav" data-theme="other">\n          <li class="ncommon-gfooter-foot__navItem"><a href="' + NCOMMON.depth + '/parents/index.html"><i><i><i></i><i></i><i></i></i></i>保護者のみなさまへ</a></li>\n          <li class="ncommon-gfooter-foot__navItem"><a href="' + NCOMMON.depth + '/anzen/index.html"><i><i><i></i><i></i><i></i></i></i>健康と安全のために</a></li>\n          <li class="ncommon-gfooter-foot__navItem"><a href="' + NCOMMON.depth + '/about_hp.html"><i><i><i></i><i></i><i></i></i></i>任天堂ウェブサイトポリシー</a></li>\n          <li class="ncommon-gfooter-foot__navItem"><a href="' + NCOMMON.depth + '/support/inquiry/index.html"><i><i><i></i><i></i><i></i></i></i>お問い合わせ</a></li>\n          <li class="ncommon-gfooter-foot__navItem"><a href="' + NCOMMON.depth + '/sitemap/index.html"><i><i><i></i><i></i><i></i></i></i>サイトマップ</a></li>\n          <li class="ncommon-gfooter-foot__navItem"><a href="http://www.nintendo.com/countryselector/" target="_blank" class="is-blank"><i><i><i></i><i></i><i></i></i></i>Global Site</a></li>\n        </ul>\n        <div class="ncommon-gfooter-foot__copyright">&copy; Nintendo</div>\n      </div>\n    </div>\n    '), $(window).on("load", function () {
        $(".footer-topic-path-back-to-top-btn").on("click", function (e) { e.preventDefault(), e.stopPropagation(), _WindowStore2.default.scrollTo(0, 800) }), setTimeout(function () {
          $("a.footer-topic-path-back-to-top-btn").html("<i><i><i></i><i></i><i></i></i></i>"), $("div.footer-topic-path-back-to-top").attr("data-theme", "white"), _NetInfo2.default.load(function (data) {
            var isNG = !!_.find(data.categories, function (info) { return info.type });
            isNG && $parent.find("#ncommon-gfooter-related2__icon--networkinfo").addClass("is-NG")
          })
        }, 1e3), $parent.append(html), (0, _moduleInit2.default)($parent)
      })
    }
  }, { "./NetInfo": 13, "./module-init": 18, "stores/WindowStore": 33, "utils/DataHandler": 34, "utils/Util": 40 }],
  16: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } } exports.__esModule = !0;
    var _Util = require("utils/Util"),
      _DataHandler = (_interopRequireDefault(_Util), require("utils/DataHandler")),
      _partsAccountBt = (_interopRequireDefault(_DataHandler), require("./parts-account-bt")),
      _partsAccountBt2 = _interopRequireDefault(_partsAccountBt),
      _partsAccountContent = require("./parts-account-content"),
      _partsAccountContent2 = _interopRequireDefault(_partsAccountContent),
      _partsRanking = require("./parts-ranking"),
      _partsRanking2 = _interopRequireDefault(_partsRanking),
      _partsSearcharea = require("./parts-searcharea"),
      _partsSearcharea2 = _interopRequireDefault(_partsSearcharea),
      _moduleInit = require("./module-init"),
      _moduleInit2 = _interopRequireDefault(_moduleInit),
      _WindowStore = require("stores/WindowStore"),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      _NetInfo = require("./NetInfo"),
      _NetInfo2 = _interopRequireDefault(_NetInfo),
      $ = void 0;
    exports.default = function () {
      $ = window.NCOMMON_$ || window.$, _WindowStore2.default.forceSetup();
      var $parent = $("#ncommon-gheader"),
        html = '\n  <div data-njs="megadrop">\n    <div class="ncommon-gheader-dfHeader" data-njs="hideseek" data-njs-fixed="1">\n      <div class="ncommon-g-innerW-tab_sp">\n        <h1 class="ncommon-gheader-dfHeader__logo"><a href="' + NCOMMON.depth + '/index.html">Nintendo</a></h1>\n        <ul class="ncommon-gheader-dfHeader__sub">\n          <li class="ncommon-gheader-dfHeader__subItem ncommon-gheader-dfHeader__subItem--search">\n            <a href="#" data-njs="megadrop__buttonHover" data-group="megadrop_sub" data-key="search"><span class="ncommon-gheader-dfHeader__icon"></span><span class="ncommon-gheader-dfHeader__label">さがす</span></a>\n          </li>\n          <li class="ncommon-gheader-dfHeader__subItem ncommon-gheader-dfHeader__subItem--my">\n            <a href="#" data-njs="megadrop__buttonHover" data-group="megadrop_sub" class="js-hide" data-key="mynintendo" id="ncommon-gheader-accountBt"></a>\n          </li>\n        </ul>\n      </div>\n      <div class="ncommon-gheader-dfHeader__fallbacks">\n        <alps-account-panel></alps-account-panel>\n        <alps-account-nav></alps-account-nav>\n      </div>\n      <ul class="ncommon-gheader-dfHeader__main">\n        <li class="ncommon-gheader-dfHeader__mainItem ncommon-gheader-dfHeader__mainItem--hardware">\n          <a href="' + NCOMMON.depth + '/hardware/index.html" data-njs="megadrop__buttonHover" data-group="megadrop_main"><span class="ncommon-gheader-dfHeader__icon"></span><span class="ncommon-gheader-dfHeader__label">ゲーム機本体</span></a>\n        </li>\n        <li class="ncommon-gheader-dfHeader__mainItem ncommon-gheader-dfHeader__mainItem--software">\n          <a href="' + NCOMMON.depth + '/software/index.html" data-njs="megadrop__buttonHover" data-group="megadrop_main"><span class="ncommon-gheader-dfHeader__icon"></span><span class="ncommon-gheader-dfHeader__label">ゲームソフト・アプリ</span></a>\n        </li>\n        <li class="ncommon-gheader-dfHeader__mainItem ncommon-gheader-dfHeader__mainItem--amiibo">\n          <a href="' + NCOMMON.depth + '/amiibo/index.html" data-njs="megadrop__buttonHover" data-group="megadrop_main"><span class="ncommon-gheader-dfHeader__icon"></span><span class="ncommon-gheader-dfHeader__label">amiibo</span></a>\n        </li>\n        <li class="ncommon-gheader-dfHeader__mainItem ncommon-gheader-dfHeader__mainItem--topics">\n          <a href="https://topics.nintendo.co.jp/index.html" data-njs="megadrop__buttonHover" data-group="megadrop_main"><span class="ncommon-gheader-dfHeader__icon"></span><span class="ncommon-gheader-dfHeader__label">トピックス</span></a>\n        </li>\n        <li class="ncommon-gheader-dfHeader__mainItem ncommon-gheader-dfHeader__mainItem--support">\n          <a href="' + NCOMMON.depth + '/support/index.html" data-njs="megadrop__buttonHover" data-group="megadrop_main"><span class="ncommon-gheader-dfHeader__icon"></span><span class="ncommon-gheader-dfHeader__label">サポート</span></a>\n        </li>\n      </ul>\n    </div><!-- /ncommon-gheader-dfHeader -->\n\n    <div class="ncommon-gheader-dropArea ncommon-gheader-dropArea--sub" data-njs="megadrop__content" data-group="megadrop_sub" data-njs-fixed="1">\n      <div data-njs="megadrop__contentClip">\n        <div class="ncommon-gheader-dropArea__inner" data-njs="megadrop__contentInner">\n          <div data-njs="megadrop__contentItem">\n            <div class="ncommon-gheader-dropArea__body">\n              <div class="ncommon-g-innerW">\n                <div id="ncommon-gheader-searchAreaWrap"></div>\n              </div>\n            </div>\n          </div>\n          <div data-njs="megadrop__contentItem" id="ncommon-gheader-accountContent"></div>\n        </div>\n      </div>\n    </div>\n\n    <div class="ncommon-gheader-dropArea ncommon-gheader-dropArea--main" data-njs="megadrop__content" data-group="megadrop_main" data-njs-fixed="1">\n      <div data-njs="megadrop__contentClip">\n        <div class="ncommon-gheader-dropArea__inner" data-njs="megadrop__contentInner">\n          <div data-njs="megadrop__contentItem">\n            <div class="ncommon-gheader-dropArea__body">\n              <div class="ncommon-g-innerW-pc_tab">\n                <ul class="ncommon-gheader-itemList ncommon-gheader-itemList--4col" data-njs="heightline" data-item=".ncommon-gheader-itemList__item" data-targets=".ncommon-gheader-itemList__heightbase">\n                  <li class="ncommon-gheader-itemList__item">\n                    <a href="' + NCOMMON.depth + '/hardware/switch/index.html">\n                      <p class="ncommon-gheader-itemList__thumb ncommon-gheader-itemList__thumb--hardware01"></p>\n                      <div class="ncommon-gheader-itemList__heightbase">\n                        <p class="ncommon-gheader-itemList__text">Nintendo Switch</p>\n                      </div>\n                    </a>\n                  </li>\n                  <li class="ncommon-gheader-itemList__item">\n                    <a href="' + NCOMMON.depth + '/hardware/2ds/index.html">\n                      <p class="ncommon-gheader-itemList__thumb ncommon-gheader-itemList__thumb--hardware02"></p>\n                      <div class="ncommon-gheader-itemList__heightbase">\n                        <p class="ncommon-gheader-itemList__text">ニンテンドー2DS</p>\n                      </div>\n                    </a>\n                  </li>\n                  <li class="ncommon-gheader-itemList__item">\n                    <a href="' + NCOMMON.depth + '/hardware/new3dsll/index.html">\n                      <p class="ncommon-gheader-itemList__thumb ncommon-gheader-itemList__thumb--hardware03"></p>\n                      <div class="ncommon-gheader-itemList__heightbase">\n                        <p class="ncommon-gheader-itemList__text">Newニンテンドー3DS <span>LL</span></p>\n                      </div>\n                    </a>\n                  </li>\n                  <li class="ncommon-gheader-itemList__item">\n                    <a href="' + NCOMMON.depth + '/hardware/new3ds/index.html">\n                      <p class="ncommon-gheader-itemList__thumb ncommon-gheader-itemList__thumb--hardware04"></p>\n                      <div class="ncommon-gheader-itemList__heightbase">\n                        <p class="ncommon-gheader-itemList__text">Newニンテンドー3DS</p>\n                      </div>\n                    </a>\n                  </li>\n                </ul>\n              </div>\n            </div>\n            <div class="ncommon-g-innerW-pc">\n              <div class="ncommon-gheader-dropArea__foot" data-theme="default">\n                <p class="ncommon-gheader-dropArea__footLink"><a href="' + NCOMMON.depth + '/hardware/index.html"><i><i><i></i><i></i><i></i></i></i>ゲーム機本体一覧</a></p>\n              </div>\n            </div>\n          </div>\n\n          <div data-njs="megadrop__contentItem">\n            <div class="ncommon-gheader-dropArea__body">\n              <div class="ncommon-g-innerW-pc_tab">\n                <ul class="ncommon-gheader-itemList ncommon-gheader-itemList--4col" data-njs="heightline" data-item=".ncommon-gheader-itemList__item" data-targets=".ncommon-gheader-itemList__heightbase">\n                  <li class="ncommon-gheader-itemList__item">\n                    <a href="' + NCOMMON.depth + '/software/switch/index.html">\n                      <p class="ncommon-gheader-itemList__thumb ncommon-gheader-itemList__thumb--software01"></p>\n                      <div class="ncommon-gheader-itemList__heightbase">\n                        <p class="ncommon-gheader-itemList__text">Nintendo Switchで<span>遊ぶ</span></p>\n                      </div>\n                    </a>\n                  </li>\n                  <li class="ncommon-gheader-itemList__item">\n                    <a href="' + NCOMMON.depth + '/software/3ds/index.html">\n                      <p class="ncommon-gheader-itemList__thumb ncommon-gheader-itemList__thumb--software02"></p>\n                      <div class="ncommon-gheader-itemList__heightbase">\n                        <p class="ncommon-gheader-itemList__text">ニンテンドー3DSで遊ぶ</p>\n                      </div>\n                    </a>\n                  </li>\n                  <li class="ncommon-gheader-itemList__item">\n                    <a href="' + NCOMMON.depth + '/software/wiiu/index.html">\n                      <p class="ncommon-gheader-itemList__thumb ncommon-gheader-itemList__thumb--software03"></p>\n                      <div class="ncommon-gheader-itemList__heightbase">\n                        <p class="ncommon-gheader-itemList__text">Wii Uで遊ぶ</p>\n                      </div>\n                    </a>\n                  </li>\n                  <li class="ncommon-gheader-itemList__item">\n                    <a href="' + NCOMMON.depth + '/software/smartphone/index.html">\n                      <p class="ncommon-gheader-itemList__thumb ncommon-gheader-itemList__thumb--software04"></p>\n                      <div class="ncommon-gheader-itemList__heightbase">\n                        <p class="ncommon-gheader-itemList__text">スマートフォンで遊ぶ</p>\n                      </div>\n                    </a>\n                  </li>\n                </ul>\n              </div>\n            </div>\n            <div class="ncommon-g-innerW-pc">\n              <div class="ncommon-gheader-dropArea__foot" data-theme="default">\n                <p class="ncommon-gheader-dropArea__footLink"><a href="' + NCOMMON.depth + '/software/index.html"><i><i><i></i><i></i><i></i></i></i>ゲームソフト・アプリ一覧</a></p>\n              </div>\n            </div>\n          </div>\n\n          <div data-njs="megadrop__contentItem">\n            <div class="ncommon-gheader-dropArea__body">\n              <div class="ncommon-g-innerW-pc_tab">\n                <ul class="ncommon-gheader-itemList ncommon-gheader-itemList--3col" data-njs="heightline" data-item=".ncommon-gheader-itemList__item" data-targets=".ncommon-gheader-itemList__heightbase">\n                  <li class="ncommon-gheader-itemList__item">\n                    <a href="' + NCOMMON.depth + '/amiibo/lineup/index.html">\n                      <p class="ncommon-gheader-itemList__thumb ncommon-gheader-itemList__thumb--amiibo01"></p>\n                      <div class="ncommon-gheader-itemList__heightbase">\n                        <p class="ncommon-gheader-itemList__text">ラインナップ</p>\n                      </div>\n                    </a>\n                  </li>\n                  <li class="ncommon-gheader-itemList__item">\n                    <a href="' + NCOMMON.depth + '/amiibo/software/index.html">\n                      <p class="ncommon-gheader-itemList__thumb ncommon-gheader-itemList__thumb--amiibo02"></p>\n                      <div class="ncommon-gheader-itemList__heightbase">\n                        <p class="ncommon-gheader-itemList__text">対応ソフト</p>\n                      </div>\n                    </a>\n                  </li>\n                  <li class="ncommon-gheader-itemList__item">\n                    <a href="' + NCOMMON.depth + '/amiibo/set/index.html">\n                      <p class="ncommon-gheader-itemList__thumb ncommon-gheader-itemList__thumb--amiibo03"></p>\n                      <div class="ncommon-gheader-itemList__heightbase">\n                        <p class="ncommon-gheader-itemList__text">セット商品</p>\n                      </div>\n                    </a>\n                  </li>\n                </ul>\n              </div>\n            </div>\n            <div class="ncommon-g-innerW-pc">\n              <div class="ncommon-gheader-dropArea__foot" data-theme="default">\n                <p class="ncommon-gheader-dropArea__footLink"><a href="' + NCOMMON.depth + '/amiibo/index.html"><i><i><i></i><i></i><i></i></i></i>そのほかの情報</a></p>\n              </div>\n            </div>\n          </div>\n\n          <div data-njs="megadrop__contentItem">\n            <div class="ncommon-gheader-dropArea__body">\n              <div class="ncommon-gheader-rankingArea">\n                <div class="ncommon-g-innerW-pc_tab">\n                  <div class="ncommon-gheader-rankingArea__headline">24時間ランキング</div>\n                </div>\n                <div class="ncommon-g-innerW-pc">\n                  <div class="ncommon-gheader-rankingArea__wrapper" id="ncommon-gheader-rankingArea__wrapper"></div>\n                </div>\n              </div>\n            </div>\n            <div class="ncommon-g-innerW-pc">\n              <div class="ncommon-gheader-dropArea__foot" data-theme="default">\n                <p class="ncommon-gheader-dropArea__footLink"><a href="https://topics.nintendo.co.jp/index.html"><i><i><i></i><i></i><i></i></i></i>トピックス記事一覧</a></p>\n              </div>\n            </div>\n          </div>\n\n          <div data-njs="megadrop__contentItem">\n            <div class="ncommon-gheader-dropArea__body">\n              <div class="ncommon-g-innerW-pc_tab">\n                <div class="ncommon-gheader-networkInfo">\n                  <div class="ncommon-g-innerW-sp">\n                    <div class="ncommon-gheader-networkInfo__headline" id="ncommon-gheader-networkInfo__headline"><span>ネットワーク障害</span>発生状況</div>\n                    <div class="ncommon-gheader-networkInfo__list">\n                      <div class="ncommon-gheader-networkInfo__item" data-name="ニンテンドー3DS"><a href="' + NCOMMON.depth + '/netinfo/index.html">ニンテンドー3DS</a></div>\n                      <div class="ncommon-gheader-networkInfo__item" data-name="Wii U"><a href="' + NCOMMON.depth + '/netinfo/index.html">Wii U</a></div>\n                      <div class="ncommon-gheader-networkInfo__item" data-name="web"><a href="' + NCOMMON.depth + '/netinfo/index.html">WEBサービス</a></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class="ncommon-g-innerW-pc_tab">\n                <ul class="ncommon-gheader-itemList ncommon-gheader-itemList--3col" data-njs="heightline" data-item=".ncommon-gheader-itemList__item" data-targets=".ncommon-gheader-itemList__heightbase">\n                  <li class="ncommon-gheader-itemList__item">\n                    <a href="' + NCOMMON.depth + '/support/3ds/index.html">\n                      <p class="ncommon-gheader-itemList__thumb ncommon-gheader-itemList__thumb--support01"></p>\n                      <div class="ncommon-gheader-itemList__heightbase">\n                        <p class="ncommon-gheader-itemList__text">ニンテンドー<span>3DS</span><span>サポート</span></p>\n                      </div>\n                    </a>\n                  </li>\n                  <li class="ncommon-gheader-itemList__item">\n                    <a href="' + NCOMMON.depth + '/support/wiiu/index.html">\n                      <p class="ncommon-gheader-itemList__thumb ncommon-gheader-itemList__thumb--support02"></p>\n                      <div class="ncommon-gheader-itemList__heightbase">\n                        <p class="ncommon-gheader-itemList__text">Wii Uサポート</p>\n                      </div>\n                    </a>\n                  </li>\n                  <li class="ncommon-gheader-itemList__item">\n                    <a href="' + NCOMMON.depth + '/support/repair/index.html">\n                      <p class="ncommon-gheader-itemList__thumb ncommon-gheader-itemList__thumb--support03"></p>\n                      <div class="ncommon-gheader-itemList__heightbase">\n                        <p class="ncommon-gheader-itemList__text ncommon-gheader-itemList__text--2row">修理のご案内<br><span class="ncommon-gheader-itemList__textCaption">（オンライン修理受付）</span></p>\n                      </div>\n                    </a>\n                  </li>\n                </ul>\n              </div>\n              <div class="ncommon-g-innerW-pc_tab">\n                <form id="ncommon-gheader-qaSearch__formWrap">\n                  <div class="ncommon-gheader-qaSearch">\n                    <div class="ncommon-gheader-qaSearch__headline">Q&amp;Aからさがす</div>\n                    <div class="ncommon-gheader-qaSearch__form">\n                      <div class="ncommon-g-search">\n                        <input id="ncommon-gheader-qaSearch__text" name="keyword" type="text" placeholder="キーワードを入力してください" class="ncommon-g-search__text" />\n                        <button class="ncommon-g-search__bt">さがす</button>\n                      </div>\n                    </div>\n                  </div>\n                </form>\n              </div>\n            </div>\n            <div class="ncommon-g-innerW-pc">\n              <div class="ncommon-gheader-dropArea__foot" data-theme="default">\n                <p class="ncommon-gheader-dropArea__footLink"><a href="' + NCOMMON.depth + '/support/index.html"><i><i><i></i><i></i><i></i></i></i>サポート一覧</a></p>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ',
        $ranking = (0,
          _partsRanking2.default)();
      setTimeout(function () {
        $parent.find("#ncommon-gheader-rankingArea__wrapper").append($ranking), (0, _partsAccountBt2.default)($parent.find("#ncommon-gheader-accountBt")), (0, _partsAccountContent2.default)($parent.find("#ncommon-gheader-accountContent")); var _$searchAreaWrap = $parent.find("#ncommon-gheader-searchAreaWrap");
        _$searchAreaWrap.append((0, _partsSearcharea2.default)()), _NetInfo2.default.load(function (data) {
          _.forEach($parent.find(".ncommon-gheader-networkInfo__item"), function (el) {
            var $el = $(el),
            info = _.find(data.categories, { name: $el.attr("data-name") });
            $el.addClass(info.type ? "is-NG" : "is-OK")
          }); var isNG = !!_.find(data.categories, function (info) { return info.type });
          isNG && $parent.find("#ncommon-gheader-networkInfo__headline").addClass("is-NG")
        }), $parent.find("#ncommon-gheader-qaSearch__formWrap").on("submit", function (e) {
          e.preventDefault(), e.stopPropagation(); var val = $parent.find("#ncommon-gheader-qaSearch__text").val() || "";
          location.href = "https://support.nintendo.co.jp/app/answers/list/st/5/kw/" + encodeURIComponent(val) + "/page/1/search/1"
        })
      }, 1e3), (0, _moduleInit2.default)($parent), $parent.html(html)
    }
  }, { "./NetInfo": 13, "./module-init": 18, "./parts-account-bt": 19, "./parts-account-content": 20, "./parts-ranking": 21, "./parts-searcharea": 22, "stores/WindowStore": 33, "utils/DataHandler": 34, "utils/Util": 40 }],
  17: [function (require, module, exports) {
    "use strict";
    exports.__esModule = !0; var $ = void 0;
    exports.default = function () { $ = window.NCOMMON_$ || window.$, document.write('\n  <div class="ncommon-g-innerW-pc" data-theme="guardian">\n    <div class="ncommon-guardian">\n      <div class="ncommon-guardian__icon"></div>\n      <div class="ncommon-guradian__texts">\n        <div class="ncommon-guardian__headline">\n          <div class="ncommon-guardian__text01">保護者のみなさまへ</div>\n          <div class="ncommon-guardian__text02">お子さまに安心して<span>お使いいただくために</span></div>\n        </div>\n        <div class="ncommon-guardian__text03">ゲーム機には、お子さまのインターネットの使用や見知らぬ人とのやり取り、<br>クレジットカードの使用などを保護者の方が制限する機能があります。</div>\n        <div class="ncommon-guardian__link"><a href="' + NCOMMON.depth + '/parents/index.html"><i><i><i></i><i></i><i></i></i></i>くわしくはこちら</a></div>\n      </div>\n    </div>\n  </div>\n  ') }
  }, {}],
  18: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } } exports.__esModule = !0, exports.default = function ($area) { $ = window.NCOMMON_$ || window.$, $area = $area || $(document.body), _Util2.default.initModules($area, moduleList) }; var _Util = require("utils/Util"),
      _Util2 = _interopRequireDefault(_Util),
      _Heightline = require("../ncommon_content/modules/Heightline"),
      _Heightline2 = _interopRequireDefault(_Heightline),
      _Slider = require("../ncommon_content/modules/Slider"),
      _Slider2 = _interopRequireDefault(_Slider),
      _Accordion = require("../ncommon_content/modules/Accordion"),
      _Accordion2 = _interopRequireDefault(_Accordion),
      _HideSeek = require("../ncommon_content/modules/HideSeek"),
      _HideSeek2 = _interopRequireDefault(_HideSeek),
      _MegaDrop = require("../ncommon_content/modules/MegaDrop"),
      _MegaDrop2 = _interopRequireDefault(_MegaDrop),
      _TouchHover = require("../ncommon_content/modules/TouchHover"),
      _TouchHover2 = _interopRequireDefault(_TouchHover),
      _ToggleParent = require("../ncommon_content/modules/ToggleParent"),
      _ToggleParent2 = _interopRequireDefault(_ToggleParent),
      $ = void 0,
      moduleList = { toggleparent: _ToggleParent2.default, heightline: _Heightline2.default, slider: _Slider2.default, accordion: _Accordion2.default, hideseek: _HideSeek2.default, megadrop: _MegaDrop2.default, touchhover: _TouchHover2.default }
  }, { "../ncommon_content/modules/Accordion": 1, "../ncommon_content/modules/Heightline": 2, "../ncommon_content/modules/HideSeek": 3, "../ncommon_content/modules/MegaDrop": 4, "../ncommon_content/modules/Slider": 5, "../ncommon_content/modules/ToggleParent": 6, "../ncommon_content/modules/TouchHover": 7, "utils/Util": 40 }],
  19: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } } exports.__esModule = !0; var _Util = require("utils/Util"),
      _Alps = (_interopRequireDefault(_Util), require("./Alps")),
      _Alps2 = _interopRequireDefault(_Alps),
      $ = void 0;
    exports.default = function ($this) {
      $ = window.NCOMMON_$ || window.$; return _Alps2.default.init().then(function (alpsInfo) {
        if ($this.removeClass("js-hide"), alpsInfo.isLoggedin) {
          var _$miiInNav = $('<div class="ncommon-g-miiInNav ncommon-g-mii" style="background-image:url(' + (alpsInfo.account.miiIconUrl || alpsInfo.account.miiIconUrlDefault) + ');" data-favoritecolor="' + alpsInfo.account.favoriteColor + '"></div>');
          Number(alpsInfo.account.unreadCountText) > 0 && _$miiInNav.addClass("js-unread"), $this.before(_$miiInNav)
        } else $this.append('<span class="ncommon-gheader-dfHeader__icon"></span><span class="ncommon-gheader-dfHeader__label">会員サービス</span>')
      }), $this
    }
  }, { "./Alps": 9, "utils/Util": 40 }],
  20: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } } exports.__esModule = !0; var _Util = require("utils/Util"),
      _Alps = (_interopRequireDefault(_Util), require("./Alps")),
      _Alps2 = _interopRequireDefault(_Alps),
      _moduleInit = require("./module-init"),
      _moduleInit2 = _interopRequireDefault(_moduleInit),
      $ = void 0;
    exports.default = function ($this) {
      return $ = window.NCOMMON_$ || window.$, _Alps2.default.init().then(function (alpsInfo) {
        alpsInfo.isLoggedin ? ! function () {
          $this.append('\n        <div class="ncommon-gheader-myBnr__wrap-pc"></div>\n        <div class="ncommon-gheader-dropArea__body">\n          <div class="ncommon-g-innerW ncommon-gheader-myArea">\n            <div class="ncommon-gheader-myArea__inner">\n              <div class="ncommon-gheader-myArea__headline"><span>会員サービス</span></div>\n              <div class="ncommon-gheader-myBnr__wrap-tab_sp"></div>\n              <div class="ncommon-gheader-myArea__box ncommon-gheader-myBox">\n                <div class="ncommon-gheader-myBox__inner2">\n                  <div class="ncommon-gheader-myBox__inner">\n                    <div class="ncommon-gheader-myBox__icon ncommon-g-mii" style="background-image:url(' + (alpsInfo.account.miiIconUrl || alpsInfo.account.miiIconUrlDefault) + ');" data-favoritecolor="' + alpsInfo.account.favoriteColor + '"></div>\n                    <div class="ncommon-gheader-myBox__name">' + alpsInfo.account.nickname + '</div>\n                  </div>\n                  <div class="ncommon-gheader-myBox__points">\n                    <div class="ncommon-gheader-myBox__point ncommon-gheader-myBox__point--platinum">× ' + alpsInfo.account.pointsPlatinum + '</div>\n                    <div class="ncommon-gheader-myBox__point ncommon-gheader-myBox__point--gold">× ' + alpsInfo.account.pointsGold + '</div>\n                  </div>\n                </div>\n                <div class="ncommon-gheader-myBox__bts">\n                  <div class="ncommon-gheader-myBox__bt"><a href="https://accounts.nintendo.com/" target="_blank"><i><i><i></i><i></i><i></i></i></i>設定</a></div>\n                  <div class="ncommon-gheader-myBox__bt"><a href="https://accounts.nintendo.com/logout" target="_blank"><i><i><i></i><i></i><i></i></i></i>ログアウト</a></div>\n                </div>\n              </div>\n              <div class="ncommon-gheader-myArea__links-pc" data-njs="heightline" data-item=".ncommon-gheader-myLinks__item" data-targets=".ncommon-gheader-myLinks__link">\n                <div class="ncommon-gheader-myLinks" data-njs="toggleparent" data-parent_tab=".ncommon-gheader-myArea__links-tab_sp" data-parent_sp=".ncommon-gheader-myArea__links-tab_sp">\n                  <div class="ncommon-gheader-myLinks__item ncommon-gheader-myLinks__item--store">\n                    <a href="https://store.nintendo.co.jp/" target="_blank" class="ncommon-gheader-myLinks__link">\n                      <div class="ncommon-gheader-myLinks__headline"><i><i><i></i><i></i><i></i></i></i><span>マイニンテンドー</span>ストア</div>\n                      <div class="ncommon-gheader-myLinks__text"><span>ここでしか手に入らない任天堂関連の特別な商品などをご購入いただけます。</span></div>\n                    </a>\n                  </div>\n                  <div class="ncommon-gheader-myLinks__item ncommon-gheader-myLinks__item--point">\n                    <a href="https://my.nintendo.com/" target="_blank" class="ncommon-gheader-myLinks__link">\n                      <div class="ncommon-gheader-myLinks__headline"><i><i><i></i><i></i><i></i></i></i><span>マイニンテンドー</span>ポイントプログラム</div>\n                      <div class="ncommon-gheader-myLinks__text"><span>アプリで遊んだり、ソフトを購入するとたまるポイントをギフトと交換。</span></div>\n                    </a>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <div id="ncommon-gheader-myInfo" class="ncommon-gheader-myInfo">\n              <div class="ncommon-gheader-myInfo__headline">あなたへのお知らせ</div>\n\n              <div class="ncommon-gheader-myInfo__slider" data-njs="slider" data-eachheight="1">\n                <div class="ncommon-gheader-myInfo__sliderClip" data-njs="slider__clip">\n                  <div id="ncommon-gheader-myInfo__lists" class="ncommon-gheader-myInfo__lists" data-njs="slider__container"></div>\n                </div>\n\n                <div class="ncommon-gheader-myInfo__sliderPager">\n                  <div class="ncommon-gheader-myInfo__sliderPrev" data-njs="slider__prev"><i><i><i></i><i></i><i></i></i></i></div>\n                  <div class="ncommon-gheader-myInfo__sliderNav" data-njs="slider__nav">\n                    <div class="ncommon-gheader-myInfo__sliderNavItem" data-njs="slider__navItem"></div>\n                  </div>\n                  <div class="ncommon-gheader-myInfo__sliderNext" data-njs="slider__next"><i><i><i></i><i></i><i></i></i></i></div>\n                </div>\n              </div>\n\n              <div class="ncommon-gheader-myInfo__linkToList"><a href="#"><i><i><i></i><i></i><i></i></i></i>一覧を見る</a></div>\n            </div>\n\n            <div class="ncommon-gheader-myArea__links-tab_sp" data-njs="heightline" data-item=".ncommon-gheader-myLinks__item" data-targets=".ncommon-gheader-myLinks__link"></div>\n          </div>\n        </div>\n      '); var _$myInfo = $this.find("#ncommon-gheader-myInfo"),
            _$myInfoLists = $this.find("#ncommon-gheader-myInfo__lists"),
            $list = alpsInfo.notice.list || $("<div></div>"),
            _$myInfoItem = _.map($list.find(".ncommon-gheader-myInfo__item"), function (el) { return $(el) }),
            banners = { thankyou: "bannerJS-FAthanks15a.png" }; if (_.forEach(banners, function (bannerSrc, bannerType) {
              var index = _.findIndex(_$myInfoItem, function ($item) { return _.includes($item.find(".ncommon-myInfo__itemBanner").attr("src") || "", bannerSrc) });
              index >= 0 && (_$myInfoItem.splice(index, 1), $this.find(".ncommon-gheader-myBnr__wrap-pc").append('\n          <div class="ncommon-gheader-myBnr" data-bnrtype="' + bannerType + '" data-njs="toggleparent" data-parent_tab=".ncommon-gheader-myBnr__wrap-tab_sp" data-parent_sp=".ncommon-gheader-myBnr__wrap-tab_sp"></div>\n          '))
            }), _$myInfoItem.length) {
              var _units = _.chunk(_$myInfoItem, 3);
            _.forEach(_units, function (unit) {
              var _$myInfoList = $('<div class="ncommon-gheader-myInfo__list" data-njs="slider__item"></div>');
              _.forEach(unit, function ($el) { _$myInfoList.append($el) }), _$myInfoLists.append(_$myInfoList)
            }); var _unreadCount = Number(alpsInfo.account.unreadCountText);
            _unreadCount > 0 && _$myInfo.prepend('<div class="ncommon-gheader-myInfo__unreadCount">未読： ' + _unreadCount + "件</div>")
          } else _$myInfo.remove()
        }() : $this.append('\n        <div class="ncommon-gheader-dropArea__body">\n          <div class="ncommon-g-innerW ncommon-gheader-myArea">\n            <div class="ncommon-gheader-myArea__inner">\n              <div class="ncommon-gheader-myArea__headline"><span>会員サービス</span></div>\n              <div class="ncommon-gheader-myArea__startBts">\n                <div class="ncommon-gheader-myArea__startBt"><a href="https://my.nintendo.com/login?theme=login_form" target="_blank" class="ncommon-gheader-myStartBt"><i><i><i></i><i></i><i></i></i></i><span class="ncommon-gheader-myStartBt__text">ログインする</span></a></div>\n                <div class="ncommon-gheader-myArea__startBt"><a href="https://my.nintendo.com/login" target="_blank" class="ncommon-gheader-myStartBt"><i><i><i></i><i></i><i></i></i></i><span class="ncommon-gheader-myStartBt__text">はじめる<span class="ncommon-gheader-myStartBt__textInner">ニンテンドーアカウントに<br>登録する</span></span></a></div>\n              </div>\n              <div class="ncommon-gheader-myArea__links-pc ncommon-gheader-myArea__links-tab_sp" data-njs="heightline" data-item=".ncommon-gheader-myLinks__item" data-targets=".ncommon-gheader-myLinks__link">\n                <div class="ncommon-gheader-myLinks">\n                  <div class="ncommon-gheader-myLinks__item ncommon-gheader-myLinks__item--store">\n                    <a href="https://store.nintendo.co.jp/" target="_blank" class="ncommon-gheader-myLinks__link">\n                      <div class="ncommon-gheader-myLinks__headline"><i><i><i></i><i></i><i></i></i></i><span>マイニンテンドー</span>ストア</div>\n                      <div class="ncommon-gheader-myLinks__text"><span>ここでしか手に入らない任天堂関連の特別な商品などをご購入いただけます。</span></div>\n                    </a>\n                  </div>\n                  <div class="ncommon-gheader-myLinks__item ncommon-gheader-myLinks__item--point">\n                    <a href="https://my.nintendo.com/" target="_blank" class="ncommon-gheader-myLinks__link">\n                      <div class="ncommon-gheader-myLinks__headline"><i><i><i></i><i></i><i></i></i></i><span>マイニンテンドー</span>ポイントプログラム</div>\n                      <div class="ncommon-gheader-myLinks__text"><span>アプリで遊んだり、ソフトを購入するとたまるポイントをギフトと交換。</span></div>\n                    </a>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      '), (0, _moduleInit2.default)($this)
      }), $this
    }
  }, { "./Alps": 9, "./module-init": 18, "utils/Util": 40 }],
  21: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } } exports.__esModule = !0; var _Util = require("utils/Util"),
      _Alps = (_interopRequireDefault(_Util), require("./Alps")),
      $ = (_interopRequireDefault(_Alps), void 0);
    exports.default = function () {
      $ = window.NCOMMON_$ || window.$; var $this = $('<div class="ncommon-gheader-rankingArea__list"></div>');
      document.write("\n    <script type=\"text/javascript\">\n      if (!window._rcmdjp) document.write(unescape(\"%3Cscript src='\" + document.location.protocol + \"//d.rcmd.jp/topics.nintendo.co.jp/item/recommend.js' type='text/javascript' charset='UTF-8'%3E%3C/script%3E\"));\n    </script>\n  "), document.write("\n    <div id=\"ncommon-gheader-ranking__placeholder\" style=\"position: absolute; height: 0px; overflow: hidden;\">\n      <script type=\"text/javascript\">\n        try{\n          _rcmdjp._displayRanking({\n            type: 'pv',\n            span: 'day',\n            template: 'ranking_gheader_v2'\n          });\n        } catch(err) {}\n      </script>\n    </div>\n  "); var checkDOM = function checkDOM() { var $content = $("#ncommon-gheader-ranking__placeholder > div"); return 0 === $content.length ? setTimeout(checkDOM, 1e3) : ($this.append($content), void $(window).trigger("resize")) }; return checkDOM(), $this
    }
  }, { "./Alps": 9, "utils/Util": 40 }],
  22: [function (require, module, exports) {
    "use strict";
    exports.__esModule = !0; var $ = void 0;
    exports.default = function () {
      $ = window.NCOMMON_$ || window.$; var $this = $('\n  <form>\n    <div class="ncommon-g-searchArea">\n      <div class="ncommon-g-searchArea__text">\n        <div class="ncommon-g-search">\n          <input type="text" placeholder="キーワードを入力してください" class="ncommon-g-search__text" data-njs="megadrop__focusable"></input>\n          <button class="ncommon-g-search__bt">さがす</button>\n        </div>\n      </div>\n      <div class="ncommon-g-searchArea__radios">\n        <div class="ncommon-g-searchArea__radio">\n          <label><input type="radio" name="searchType" value="soft" checked><span>ソフトをさがす</span></label>\n        </div>\n        <div class="ncommon-g-searchArea__radio">\n          <label><input type="radio" name="searchType" value="page"><span>サイト内のページをさがす</span></label>\n        </div>\n      </div>\n    </div>\n  </form>\n  '); return $this.on("submit", function (e) {
        e.preventDefault(), e.stopPropagation(); var val = $this.find('input[type="text"]').val() || "",
          type = $this.find('input[name="searchType"]:checked').val();
        location.href = "soft" === type ? "http://search1.nintendo.co.jp/search/software.php?keyword=" + encodeURIComponent(val) : "http://search2.nintendo.co.jp/?q=" + encodeURIComponent(val)
      }), $this
    }
  }, {}],
  23: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } } exports.__esModule = !0; var _Util = require("utils/Util"),
      _WindowStore = (_interopRequireDefault(_Util), require("stores/WindowStore")),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      _moduleInit = require("./module-init"),
      _moduleInit2 = _interopRequireDefault(_moduleInit),
      _sfooterHard3ds = require("./sfooter/sfooter-hard-3ds"),
      _sfooterHard3ds2 = _interopRequireDefault(_sfooterHard3ds),
      _sfooterSoft = require("./sfooter/sfooter-soft"),
      _sfooterSoft2 = _interopRequireDefault(_sfooterSoft),
      $ = void 0,
      FUNCS = { "hardware/3ds": _sfooterHard3ds2.default, software: _sfooterSoft2.default };
    exports.default = function (type) {
    $ = window.NCOMMON_$ || window.$, _WindowStore2.default.forceSetup(); var $parent = $("#ncommon-sfooter"),
      p = NCOMMON.Paths,
      level1 = p.level1; "schedule" === level1 && (level1 = "software"); var func = FUNCS[level1 + "/" + p.hard] || FUNCS[level1],
        $this = func && func(type);
      $this && ($parent.append($this), (0, _moduleInit2.default)($parent))
    }
  }, { "./module-init": 18, "./sfooter/sfooter-hard-3ds": 24, "./sfooter/sfooter-soft": 25, "stores/WindowStore": 33, "utils/Util": 40 }],
  24: [function (require, module, exports) {
    "use strict";
    exports.__esModule = !0; var $ = void 0;
    exports.default = function () { $ = window.NCOMMON_$ || window.$; var $this = $('\n  <div class="ncommon-g-innerW-pc">\n    <div class="ncommon-sfooter-hard" data-path2="' + NCOMMON.Paths.level2 + '">\n      <div class="ncommon-sfooter-hard__headline">ニンテンドー3DSシリーズ</div>\n      <ul class="ncommon-sfooter-hard__list">\n        <li class="ncommon-sfooter-hard__item ncommon-sfooter-hard__item--2ds">\n          <a href="' + NCOMMON.depth + '/hardware/2ds/index.html">\n            <span>ニンテンドー2DS</span>\n          </a>\n        </li>\n        <li class="ncommon-sfooter-hard__item ncommon-sfooter-hard__item--new3dsll">\n          <a href="' + NCOMMON.depth + '/hardware/new3dsll/index.html">\n            <span>Newニンテンドー3DS LL</span>\n          </a>\n        </li>\n        <li class="ncommon-sfooter-hard__item ncommon-sfooter-hard__item--new3ds">\n          <a href="' + NCOMMON.depth + '/hardware/new3ds/index.html">\n            <span>Newニンテンドー3DS</span>\n          </a>\n        </li>\n      </ul>\n    </div>\n  </div>\n  '); return $this }
  }, {}],
  25: [function (require, module, exports) {
    "use strict";
    exports.__esModule = !0; var $ = void 0;
    exports.default = function () {
      var type = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
      $ = window.NCOMMON_$ || window.$; var $footArea = void 0;
      $footArea = $("top" == type ? '\n  <div class="ncommon-g-innerW-tab_sp">\n    <div class="ncommon-sfooter-soft__searchArea">\n      <p class="ncommon-sfooter-soft__searchText">ソフトをさがす</p>\n      <div class="ncommon-sfooter-soft__searchWrap">\n        <form action="http://search1.nintendo.co.jp/search/software.php" method="get">\n          <div class="ncommon-g-search">\n            <input name="keyword" type="text" placeholder="ソフトやメーカー名などを入力" class="ncommon-g-search__text"></input>\n            <button class="ncommon-g-search__bt">さがす</button>\n          </div>\n        </form>\n      </div>\n      <div class="ncommon-sfooter-soft__searchBt">\n        <a href="' + NCOMMON.depth + '/schedule/index.html"><i><i><i></i><i></i><i></i></i></i>発売スケジュール</a>\n      </div>\n    </div>\n  </div>\n  ' : '\n  <div data-theme="default">\n    <div class="ncommon-sfooter-soft__linkToTop"><a href="' + NCOMMON.depth + '/software/index.html"><i><i><i></i><i></i><i></i></i></i>ゲームソフト・アプリ</a></div>\n  </div>\n  '); var $this = $('\n  <div class="ncommon-sfooter-soft ncommon-g-innerW-pc">\n    <ul class="ncommon-sfooter-soft__nav">\n      <li class="ncommon-sfooter-soft__item ncommon-sfooter-soft__item--switch">\n        <a href="' + NCOMMON.depth + '/software/switch/index.html">\n          <div class="ncommon-sfooter-soft__itemPic"></div>\n          <div class="ncommon-sfooter-soft__itemText">Nintendo Switch<br>で遊ぶ</div>\n        </a>\n      </li>\n      <li class="ncommon-sfooter-soft__item ncommon-sfooter-soft__item--3ds">\n        <a href="' + NCOMMON.depth + '/software/3ds/index.html">\n          <div class="ncommon-sfooter-soft__itemPic"></div>\n          <div class="ncommon-sfooter-soft__itemText">ニンテンドー3DS<br>で遊ぶ</div>\n        </a>\n      </li>\n      <li class="ncommon-sfooter-soft__item ncommon-sfooter-soft__item--smartphone">\n        <a href="' + NCOMMON.depth + '/software/smartphone/index.html">\n          <div class="ncommon-sfooter-soft__itemPic"></div>\n          <div class="ncommon-sfooter-soft__itemText">スマートフォン<br>で遊ぶ</div>\n        </a>\n      </li>\n      <li class="ncommon-sfooter-soft__item ncommon-sfooter-soft__item--wiiu">\n        <a href="' + NCOMMON.depth + '/software/wiiu/index.html">\n          <div class="ncommon-sfooter-soft__itemPic"></div>\n          <div class="ncommon-sfooter-soft__itemText">Wii Uで遊ぶ</div>\n        </a>\n      </li>\n    </ul>\n  </div>\n  ').append($footArea); return $this
    }
  }, {}],
  26: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } } exports.__esModule = !0; var _Util = require("utils/Util"),
      _WindowStore = (_interopRequireDefault(_Util), require("stores/WindowStore")),
      _WindowStore2 = _interopRequireDefault(_WindowStore),
      _moduleInit = require("./module-init"),
      _moduleInit2 = _interopRequireDefault(_moduleInit),
      _sheaderHard3ds = require("./sheader/sheader-hard-3ds"),
      _sheaderHard3ds2 = _interopRequireDefault(_sheaderHard3ds),
      _sheaderHardWiiu = require("./sheader/sheader-hard-wiiu"),
      _sheaderHardWiiu2 = _interopRequireDefault(_sheaderHardWiiu),
      _sheaderHardSwitch = require("./sheader/sheader-hard-switch"),
      _sheaderHardSwitch2 = _interopRequireDefault(_sheaderHardSwitch),
      $ = void 0,
      FUNCS = { "hardware/3ds": _sheaderHard3ds2.default, "hardware/wiiu": _sheaderHardWiiu2.default, "hardware/switch": _sheaderHardSwitch2.default };
    exports.default = function () {
      var type = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
      $ = window.NCOMMON_$ || window.$, _WindowStore2.default.forceSetup(); var $parent = $("#ncommon-sheader"),
        p = NCOMMON.Paths,
        func = FUNCS[p.level1 + "/" + p.hard] || FUNCS[p.level1],
        $this = func && func(type);
      $this && ($parent.append($this), (0, _moduleInit2.default)($parent))
    }
  }, { "./module-init": 18, "./sheader/sheader-hard-3ds": 27, "./sheader/sheader-hard-switch": 28, "./sheader/sheader-hard-wiiu": 29, "stores/WindowStore": 33, "utils/Util": 40 }],
  27: [function (require, module, exports) {
    "use strict";
    exports.__esModule = !0; var $ = void 0;
    exports.default = function () {
      var type = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
      $ = window.NCOMMON_$ || window.$; var $this = $('\n  <div class="ncommon-sheader-3ds" data-path3="' + NCOMMON.Paths.level3 + '">\n    <div class="ncommon-g-innerW-pc">\n      <div class="ncommon-sheader-3ds__logo"><span>ニンテンドー3DSシリーズ</span></div>\n      <div data-njs="accordion" data-outerclick="1">\n        <div class="ncommon-sheader-3ds__opener" data-njs="accordion__toggle"></div>\n        <div class="ncommon-sheader-3ds__listsWrap" data-njs="accordion__container">\n          <div class="ncommon-sheader-3ds__lists" data-njs="accordion__content">\n            <ul class="ncommon-sheader-3ds__list ncommon-sheader-3ds__list--main">\n              <li class="ncommon-sheader-3ds__item ncommon-sheader-3ds__item--feature">\n                <div class="ncommon-sheader-3ds__feature" data-njs="touchhover" data-syncelement=".ncommon-sheader-3ds__lists">\n                  <div class="ncommon-sheader-3ds__featureHeadline">3DSシリーズの特長<i><i><i></i><i></i><i></i></i></i></div>\n                  <div class="ncommon-sheader-3ds__featureListWrap">\n                    <ul class="ncommon-sheader-3ds__featureList">\n                      <li class="ncommon-sheader-3ds__featureItem"><a href="' + NCOMMON.depth + '/hardware/2ds/index.html"><i><i><i></i><i></i><i></i></i></i>ニンテンドー2DS</a></li>\n                      <li class="ncommon-sheader-3ds__featureItem"><a href="' + NCOMMON.depth + '/hardware/new3dsll/index.html"><i><i><i></i><i></i><i></i></i></i>Newニンテンドー3DS LL</a></li>\n                      <li class="ncommon-sheader-3ds__featureItem"><a href="' + NCOMMON.depth + '/hardware/new3ds/index.html"><i><i><i></i><i></i><i></i></i></i>Newニンテンドー3DS</a></li>\n                      <li class="ncommon-sheader-3ds__featureItem"><a href="' + NCOMMON.depth + '/hardware/3ds/index.html"><i><i><i></i><i></i><i></i></i></i>ニンテンドー3DS/3DS LL</a></li>\n                    </ul>\n                  </div>\n                </div>\n              </li>\n              <li class="ncommon-sheader-3ds__item ncommon-sheader-3ds__item--lineup"><a href="' + NCOMMON.depth + '/hardware/3ds/lineup/index.html">カラーバリエーション</a></li>\n              <li class="ncommon-sheader-3ds__item ncommon-sheader-3ds__item--accessories"><a href="' + NCOMMON.depth + '/hardware/3ds/accessories/index.html">周辺機器</a></li>\n            </ul>\n            <ul class="ncommon-sheader-3ds__list ncommon-sheader-3ds__list--sub">\n              <li class="ncommon-sheader-3ds__item ncommon-sheader-3ds__item--parts"><a href="' + NCOMMON.depth + '/hardware/3ds/parts/index.html"><i><i><i></i><i></i><i></i></i></i>各部機能</a></li>\n              <li class="ncommon-sheader-3ds__item ncommon-sheader-3ds__item--specs"><a href="' + NCOMMON.depth + '/hardware/3ds/specs/index.html"><i><i><i></i><i></i><i></i></i></i>主な仕様</a></li>\n              <li class="ncommon-sheader-3ds__item ncommon-sheader-3ds__item--compare"><a href="' + NCOMMON.depth + '/hardware/3ds/compare/index.html"><i><i><i></i><i></i><i></i></i></i>比較する</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  '); return "top" == type ? $this.addClass("js-top") : $this.addClass("js-detail"), $this
    }
  }, {}],
  28: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } } exports.__esModule = !0; var _Tween = require("utils/Tween"),
      _Tween2 = _interopRequireDefault(_Tween),
      $ = void 0,
      TITLES = { lineup: { jp: "主機介紹", en: "Lineup" }, software: { jp: "遊戲軟體一覽", en: "Game Software" }, accessories: { jp: "周邊設備", en: "Accessories" }, specs: { jp: "功能/規格", en: "Tech Specs" }, parentalcontrols: { jp: "Nintendo Switch™ Parental Controls", en: "" }, onlineservice: { jp: "オンラインサービス", en: "Online Service" }, store: { jp: "銷售店舖一覽", en: "Retail Store List" } };
    exports.default = function () {
    arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
      $ = window.NCOMMON_$ || window.$; var path3 = NCOMMON.Paths.level3,
        $this = $('\n    <div class="ncommon-sheader-switch" data-path3="' + path3 + '">\n      <div class="ncommon-u-hide-tab ncommon-u-hide-sp">\n        <div class="ncommon-sheader-switch__hero--pc ncommon-g-innerW-pc">\n          <div class="ncommon-sheader-switch__title">\n            <p class="ncommon-sheader-switch__title--jp">' + TITLES[path3].jp + '</p>\n            <p class="ncommon-sheader-switch__title--en">' + TITLES[path3].en + '</p>\n          </div>\n          <div class="ncommon-sheader-switch__logo--pc"><span>Nintendo Switch</span></div>\n        </div>\n      </div>\n      <div class="ncommon-u-hide-pc ncommon-u-hide-sp">\n        <div class="ncommon-sheader-switch__hero--tab">\n          <div class="ncommon-sheader-switch__logo--tab"><span>Nintendo Switch</span></div>\n        </div>\n      </div>\n      <div class="ncommon-u-hide-pc ncommon-u-hide-tab">\n        <div class="ncommon-sheader-switch__logo--sp"><span>Nintendo Switch</span></div>\n      </div>\n      <div class="ncommon-sheader-switch__listWrap">\n        <div class="ncommon-g-innerW-pc">\n          <ul class="ncommon-sheader-switch__list">\n            <li class="ncommon-sheader-switch__item ncommon-sheader-switch__item--index"><a href="' + NCOMMON.depth + '/hardware/switch/index.html">Nintendo Switch的特徵</a></li>\n            <li class="ncommon-sheader-switch__item ncommon-sheader-switch__item--lineup"><a href="' + NCOMMON.depth + '/hardware/switch/lineup/index.html">主機介紹</a></li>\n<li class="ncommon-sheader-switch__item ncommon-sheader-switch__item--software"><a href="' + NCOMMON.depth + '/software/switch/index.html">遊戲軟體一覽</a></li>\n<li class="ncommon-sheader-switch__item ncommon-sheader-switch__item--specs"><a href="' + NCOMMON.depth + '/hardware/switch/specs/index.html">功能/規格</a></li>\n            <li class="ncommon-sheader-switch__item ncommon-sheader-switch__item--accessories"><a href="' + NCOMMON.depth + '/hardware/switch/accessories/index.html">周邊設備</a></li>\n            <li class="ncommon-sheader-switch__item ncommon-sheader-switch__item--parentalcontrols"><a href="' + NCOMMON.depth + '/hardware/switch/parentalcontrols/index.html">Nintendo Switch™ Parental Controls</a></li>\n            <li class="ncommon-sheader-switch__item ncommon-sheader-switch__item--store"><a href="' + NCOMMON.depth + '/hardware/switch/store/index.html">銷售店舖</a></li>\n<!--<li class="ncommon-sheader-switch__item ncommon-sheader-switch__item--onlineservice"><a href="' + NCOMMON.depth + '/hardware/switch/onlineservice/index.html">オンラインサービス</a></li>\n-->          </ul>\n        </div>\n        <div class="ncommon-u-hide-pc ncommon-u-hide-tab">\n          <div class="ncommon-sheader-switch__arrow">&nbsp;</div>\n        </div>\n      </div>\n    </div>\n  '); return setTimeout(function () {
          var $list = $this.find(".ncommon-sheader-switch__list"),
          $currentBtn = $this.find(".ncommon-sheader-switch__item--" + path3),
          $arrow = $this.find(".ncommon-sheader-switch__arrow"),
          listW = $list.outerWidth(),
          btnW = $currentBtn.outerWidth(),
          btnX = $currentBtn.offset().left - $list.offset().left,
          ts = Math.round(btnX - .5 * (listW - btnW));
          $list.scrollLeft(ts); var _reachRight = !1;
          $list.on("scroll", function () {
            var max = $list[0].scrollWidth - $list.outerWidth(),
            reachRight = $list.scrollLeft() > max - 5;
            _reachRight !== reachRight && (_reachRight = reachRight, $arrow.switchClass("js-hidden", reachRight))
          }); var tw = new _Tween2.default;
          $arrow.on("touchend", function () {
            var start = $list.scrollLeft(),
            end = start + .8 * $list.outerWidth();
            tw.it({ start: start, end: end, duration: 300, easing: "easeOutQuad", onProgress: function (v) { $list.scrollLeft(v) } })
          })
        }, 1), $this
    }
  }, { "utils/Tween": 37 }],
  29: [function (require, module, exports) {
    "use strict";
    exports.__esModule = !0;
    var $ = void 0;
    exports.default = function () {
      var type = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
      $ = window.NCOMMON_$ || window.$;
      var $this = $('\n  <div class="ncommon-sheader-wiiu" data-path3="' + NCOMMON.Paths.level3 + '">\n    <div class="ncommon-g-innerW-pc">\n      <div class="ncommon-sheader-wiiu__logo"><a href="' + NCOMMON.depth + '/hardware/wiiu/index.html"></a></div>\n      <div data-njs="accordion" data-outerclick="1">\n        <div class="ncommon-sheader-wiiu__opener" data-njs="accordion__toggle"></div>\n        <div class="ncommon-sheader-wiiu__listsWrap" data-njs="accordion__container">\n          <div class="ncommon-sheader-wiiu__lists" data-njs="accordion__content">\n            <ul class="ncommon-sheader-wiiu__list ncommon-sheader-wiiu__list--main">\n              <li class="ncommon-sheader-wiiu__item ncommon-sheader-wiiu__item--feature"><a href="' + NCOMMON.depth + '/hardware/wiiu/index.html">Wii Uの特長</a></li>\n              <li class="ncommon-sheader-wiiu__item ncommon-sheader-wiiu__item--lineup"><a href="' + NCOMMON.depth + '/hardware/wiiu/lineup/index.html">本体ラインナップ</a></li>\n              <li class="ncommon-sheader-wiiu__item ncommon-sheader-wiiu__item--accessories"><a href="' + NCOMMON.depth + '/hardware/wiiu/accessories/index.html">周辺機器</a></li>\n            </ul>\n            <ul class="ncommon-sheader-wiiu__list ncommon-sheader-wiiu__list--sub">\n              <li class="ncommon-sheader-wiiu__item ncommon-sheader-wiiu__item--parts"><a href="' + NCOMMON.depth + '/hardware/wiiu/parts/index.html"><i><i><i></i><i></i><i></i></i></i>各部機能</a></li>\n              <li class="ncommon-sheader-wiiu__item ncommon-sheader-wiiu__item--specs"><a href="' + NCOMMON.depth + '/hardware/wiiu/specs/index.html"><i><i><i></i><i></i><i></i></i></i>主な仕様</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  ');
      return "top" == type ? $this.addClass("js-top") : $this.addClass("js-detail"),
        $this
    }
  }, {}],
  30: [function (require, module, exports) {
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
  31: [function (require, module, exports) {
    "use strict";
    exports.__esModule = !0, exports.default = function ($) {
      var ua = navigator.userAgent.toLowerCase(),
      isIE6 = (ua.indexOf("android") >= 0, ua.indexOf("firefox") >= 0, ua.indexOf("msie 6") >= 0),
      isIE7 = ua.indexOf("msie 7") >= 0,
      isIE8 = ua.indexOf("msie 8") >= 0,
      isIE9 = ua.indexOf("msie 9") >= 0,
      isSupportedTransform = !(isIE6 || isIE7 || isIE8),
      isSupportedTransform3d = !(isIE6 || isIE7 || isIE8 || isIE9);
      $.fn.css3 = function (option) {
        var scaleX, scaleY, style = {},
        transform = ""; if (isSupportedTransform3d && void 0 !== option.perspective && (transform += " perspective(" + option.perspective + "px)"), void 0 === option.scale && void 0 === option.scaleX && void 0 === option.scaleY || (scaleX = option.scale || option.scaleX || 0, scaleY = option.scale || option.scaleY || 0, transform += " scale(" + scaleX + "," + scaleY + ")"), void 0 !== option.x || void 0 !== option.y || void 0 !== option.z) {
          var x = option.x || 0,
          y = option.y || 0,
          z = option.z || 0;
          x = String(x).indexOf("%") >= 0 ? x : x + "px", y = String(y).indexOf("%") >= 0 ? y : y + "px", z = String(z).indexOf("%") >= 0 ? z : z + "px", isSupportedTransform ? transform += isSupportedTransform3d ? " translate3d(" + x + "," + y + "," + z + ")" : " translate(" + x + "," + y + ")" : (void 0 !== option.x && (style.left = option.x), void 0 !== option.y && (style.top = option.y))
        } if (void 0 !== option.rotation && (transform += " rotate(" + option.rotation + "deg)"), void 0 !== option.rotationY || void 0 !== option.rotationX) {
          var rotateY = option.rotationY || 0,
          rotateX = option.rotationX || 0;
          isSupportedTransform3d ? (transform += " rotateY(" + rotateY + "deg)", transform += " rotateX(" + rotateX + "deg)") : (scaleX = 1 - Math.abs(rotateY / 90), scaleY = 1 - Math.abs(rotateX / 90), transform += " scale(" + scaleX + "," + scaleY + ")")
        } return style["-webkit-transform"] = transform, style["-moz-transform"] = transform, style["-ms-transform"] = transform, style["-o-transform"] = transform, style.transform = transform, option.origin && (style["-webkit-transform-origin"] = option.origin, style["-moz-transform-origin"] = option.origin, style["-ms-transform-origin"] = option.origin, style["-o-transform-origin"] = option.origin, style["transform-origin"] = option.origin), void 0 !== option.alpha && (style.opacity = option.alpha), $(this).css(style), this
      }
    }
  }, {}],
  32: [function (require, module, exports) {
    "use strict";
    exports.__esModule = !0, exports.default = function ($) { $.fn.switchClass = function (className, isAdd, delay, callback) { var $self = this; if (0 !== $self.length) { var f = function () { isAdd ? $self.addClass(className) : $self.removeClass(className), callback && callback() }; return delay >= 0 && clearTimeout($self.switchClassDelayID), delay > 0 ? $self.switchClassDelayID = setTimeout(f, delay) : f(), this } } }
  }, {}],
  33: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") }

    function _possibleConstructorReturn(self, call) { if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !call || "object" != typeof call && "function" != typeof call ? self : call }

    function _inherits(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: !1, writable: !0, configurable: !0 } }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
    } exports.__esModule = !0; var _domready = require("utils/domready"),
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
        function WindowStore(props) { _classCallCheck(this, WindowStore); var _this = _possibleConstructorReturn(this, _EventEmitter.call(this, props)); return _this.setMaxListeners(0), document.body ? _this._setup() : (0, _domready2.default)(_this._setup.bind(_this)), _this } return _inherits(WindowStore, _EventEmitter), WindowStore.prototype.forceSetup = function () { this._setup() }, WindowStore.prototype._setup = function () { $ = window.NCOMMON_$ || window.$, this._isSetup || (this._isSetup = !0, this.$window = $(window), this.$html = $("html"), this.$body = $(document.body), this.$htmlBody = $("html,body"), this.$sizecheck = $('<div data-njs="windowsizecheck"><div').appendTo(document.body), this._info = { loaded: !1, width: void 0, height: void 0, scrollTop: void 0, type: void 0, modelOpened: !1, scrollBarWidth: this._calcScrollBarWidth() }, this.$window.on("load", this._loadHdl.bind(this)).on("resize", this._resizeHdl.bind(this)).on("scroll", this._scrollHdl.bind(this)), this._resizeHdl()) }, WindowStore.prototype._calcScrollBarWidth = function () {
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
        }, WindowStore.prototype.getWidth = function () { return this._info.width }, WindowStore.prototype.getHeight = function () { return this._info.height }, WindowStore.prototype.getScrollTop = function () { return this._info.scrollTop }, WindowStore.prototype.getIsPC = function () { return this._info.type === TYPE_PC }, WindowStore.prototype.getIsTAB = function () { return this._info.type === TYPE_TAB }, WindowStore.prototype.getIsSP = function () { return this._info.type === TYPE_SP }, WindowStore.prototype.getType = function () { return this._info.type }, WindowStore.prototype._loadHdl = function () { this._info.loaded = !0, this.emit(EV_LOAD, this._info), this.triggerResize() }, WindowStore.prototype._resizeHdl = function () {
          this._info.width = window.innerWidth || this.$window.width(), this._info.height = window.innerHeight || this.$window.height(); var checkerW = parseInt(this.$sizecheck.css("width")),
            type = TYPE_PC;
          2 === checkerW ? type = TYPE_TAB : 3 === checkerW && (type = TYPE_SP), this._info.type !== type && (this._info.type = type, this.emit(EV_RESPONSIVE, this._info)), this.triggerResize(), this._scrollHdl()
        }, WindowStore.prototype._scrollHdl = function () { this._info.scrollTop = this.$window.scrollTop(), this.triggerScroll() }, WindowStore
      }(_eventemitter.EventEmitter2);
    exports.default = new WindowStore
  }, { "constants/Browsers": 30, eventemitter2: 45, "utils/Tween": 37, "utils/domready": 41 }],
  34: [function (require, module, exports) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function") } exports.__esModule = !0; var _Url = require("utils/Url"),
      _Url2 = _interopRequireDefault(_Url),
      $ = void 0,
      DataHandler = function () {
        function DataHandler() { _classCallCheck(this, DataHandler), $ = window.NCOMMON_$ || window.$, this._root = {}, this._taskList = [] } return DataHandler.prototype.add = function () {
          var url = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
          key = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
          dataType = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null; return dataType || (dataType = this._detectDataType(url)), this._taskList.push({ url: url, key: key, dataType: dataType }), this
        }, DataHandler.prototype._detectDataType = function (url) { return _.includes(url, "js?callback=") ? "jsonp" : _.includes(url, "xml") ? "xml" : "json" }, DataHandler.prototype.start = function () { var _this = this; return Promise.all(_.map(this._taskList, function (task) { return _this._queue(task.dataType, task.url).then(function (data) { task.key ? _this._root[task.key] = data : _this._root = _.assign(_this._root, data) }) })).then(function () { return _this._root }) }, DataHandler.prototype._queue = function (dataType, url) { return "json" === dataType ? this._fetchJson(url) : "jsonp" === dataType ? this._fetchJsonp(url) : "xml" === dataType ? this._fetchXml(url) : Promise.resolve() }, DataHandler.prototype._fetchJson = function (url) { return new Promise(function (f, r) { $.ajax({ cache: !0, type: "GET", dataType: "text", url: url, success: function (res) { res = JSON.parse(res), f(res) }, error: function () { console.error("[DataHandler] error: " + url) } }) }) }, DataHandler.prototype._fetchJsonp = function (url) { var jsonpCallback = _Url2.default.parse(url).query.callback; return new Promise(function (f, r) { $.ajax({ cache: !0, type: "GET", dataType: "jsonp", url: url, jsonpCallback: jsonpCallback, success: function (res) { f(res) }, error: function () { console.error("[DataHandler] error: " + url) } }) }) }, DataHandler.prototype._fetchXml = function (url) { var _this2 = this; return new Promise(function (f, r) { $.ajax({ cache: !0, type: "GET", dataType: "xml", url: url, success: function (res) { res = _this2._xml2json(res), f(res) }, error: function () { console.error("[DataHandler] error: " + url) } }) }) }, DataHandler.prototype._xml2json = function (doc) { var $root = $(doc); return this._node2obj($root.eq(0)) }, DataHandler.prototype._node2obj = function ($node) {
          var _this3 = this; return _.reduce($node.children(), function (res, el) {
            var $el = $(el),
            tag = el.tagName,
            item = _this3._node2obj($el); return item = _.assign(item, _this3._getNodeAttrs($el)), 0 === _.keys(item).length && 0 === $el.children().length && (item = _.trim($el.text())), res[tag] ? _.isArray(res[tag]) ? res[tag].push(item) : res[tag] = _.concat([res[tag]], item) : res[tag] = item, res
          }, {})
        }, DataHandler.prototype._getNodeAttrs = function ($node) { return _.reduce($node[0].attributes, function (res, attr) { return res[attr.name] = attr.value, res }, {}) }, DataHandler
      }();
    exports.default = DataHandler
  }, { "utils/Url": 38 }],
  35: [function (require, module, exports) {
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
  }, { "utils/Util": 40 }],
  36: [function (require, module, exports) {
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
  }, { "tween-functions": 48 }],
  37: [function (require, module, exports) {
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
  }, { "utils/Interpolate": 36, "utils/Util": 40 }],
  38: [function (require, module, exports) {
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
  39: [function (require, module, exports) {
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
  40: [function (require, module, exports) {
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
  }, { "./Util-light": 39, "constants/Browsers": 30 }],
  41: [function (require, module, exports) {
    "use strict";
    exports.__esModule = !0, exports.default = function (fn) { "loading" != document.readyState ? fn() : document.addEventListener("DOMContentLoaded", fn) }
  }, {}],
  42: [function (require, module, exports) {
    (function (process, global) {
      ! function (e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else { var f; "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.Promise = e() }
      }(function () {
        var define, module, exports;
        return function e(t, n, r) {
          function s(o, u) {
            if (!n[o]) {
              if (!t[o]) { var a = "function" == typeof _dereq_ && _dereq_; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} };
              t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r)
            } return n[o].exports
          } for (var i = "function" == typeof _dereq_ && _dereq_, o = 0; o < r.length; o++) s(r[o]); return s
        }({
          1: [function (_dereq_, module, exports) {
            "use strict";
            module.exports = function (Promise) {
              function any(promises) {
                var ret = new SomePromiseArray(promises),
                promise = ret.promise(); return ret.setHowMany(1), ret.setUnwrap(), ret.init(), promise
              } var SomePromiseArray = Promise._SomePromiseArray;
              Promise.any = function (promises) { return any(promises) }, Promise.prototype.any = function () { return any(this) }
            }
          }, {}],
          2: [function (_dereq_, module, exports) {
            "use strict";

            function Async() {
            this._isTickUsed = !1, this._lateQueue = new Queue(16), this._normalQueue = new Queue(16), this._trampolineEnabled = !0; var self = this;
              this.drainQueues = function () { self._drainQueues() }, this._schedule = schedule.isStatic ? schedule(this.drainQueues) : schedule
            }

            function AsyncInvokeLater(fn, receiver, arg) { this._lateQueue.push(fn, receiver, arg), this._queueTick() }

            function AsyncInvoke(fn, receiver, arg) { this._normalQueue.push(fn, receiver, arg), this._queueTick() }

            function AsyncSettlePromises(promise) { this._normalQueue._pushOne(promise), this._queueTick() }
            var firstLineError;
            try { throw new Error } catch (e) { firstLineError = e }
            var schedule = _dereq_("./schedule.js"),
              Queue = _dereq_("./queue.js"),
              util = _dereq_("./util.js");
            Async.prototype.disableTrampolineIfNecessary = function () { util.hasDevTools && (this._trampolineEnabled = !1) }, Async.prototype.enableTrampoline = function () { this._trampolineEnabled || (this._trampolineEnabled = !0, this._schedule = function (fn) { setTimeout(fn, 0) }) }, Async.prototype.haveItemsQueued = function () { return this._normalQueue.length() > 0 }, Async.prototype.throwLater = function (fn, arg) {
              if (1 === arguments.length && (arg = fn, fn = function () { throw arg }), "undefined" != typeof setTimeout) setTimeout(function () { fn(arg) }, 0);
              else try { this._schedule(function () { fn(arg) }) } catch (e) { throw new Error("No async scheduler available\n\n    See http://goo.gl/m3OTXk\n") }
            }, util.hasDevTools ? (schedule.isStatic && (schedule = function (fn) { setTimeout(fn, 0) }), Async.prototype.invokeLater = function (fn, receiver, arg) {
              this._trampolineEnabled ? AsyncInvokeLater.call(this, fn, receiver, arg) : this._schedule(function () {
                setTimeout(function () {
                  fn.call(receiver, arg)
                }, 100)
              })
            }, Async.prototype.invoke = function (fn, receiver, arg) { this._trampolineEnabled ? AsyncInvoke.call(this, fn, receiver, arg) : this._schedule(function () { fn.call(receiver, arg) }) }, Async.prototype.settlePromises = function (promise) { this._trampolineEnabled ? AsyncSettlePromises.call(this, promise) : this._schedule(function () { promise._settlePromises() }) }) : (Async.prototype.invokeLater = AsyncInvokeLater, Async.prototype.invoke = AsyncInvoke, Async.prototype.settlePromises = AsyncSettlePromises), Async.prototype.invokeFirst = function (fn, receiver, arg) { this._normalQueue.unshift(fn, receiver, arg), this._queueTick() }, Async.prototype._drainQueue = function (queue) {
              for (; queue.length() > 0;) {
                var fn = queue.shift(); if ("function" == typeof fn) {
                  var receiver = queue.shift(),
                  arg = queue.shift();
                  fn.call(receiver, arg)
                } else fn._settlePromises()
              }
            }, Async.prototype._drainQueues = function () { this._drainQueue(this._normalQueue), this._reset(), this._drainQueue(this._lateQueue) }, Async.prototype._queueTick = function () { this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues)) }, Async.prototype._reset = function () { this._isTickUsed = !1 }, module.exports = new Async, module.exports.firstLineError = firstLineError
          }, { "./queue.js": 28, "./schedule.js": 31, "./util.js": 38 }],
          3: [function (_dereq_, module, exports) {
            "use strict";
            module.exports = function (Promise, INTERNAL, tryConvertToPromise) {
              var rejectThis = function (_, e) { this._reject(e) },
              targetRejected = function (e, context) { context.promiseRejectionQueued = !0, context.bindingPromise._then(rejectThis, rejectThis, null, this, e) },
              bindingResolved = function (thisArg, context) { this._isPending() && this._resolveCallback(context.target) },
              bindingRejected = function (e, context) { context.promiseRejectionQueued || this._reject(e) };
              Promise.prototype.bind = function (thisArg) {
                var maybePromise = tryConvertToPromise(thisArg),
                ret = new Promise(INTERNAL);
                ret._propagateFrom(this, 1); var target = this._target(); if (ret._setBoundTo(maybePromise), maybePromise instanceof Promise) {
                  var context = { promiseRejectionQueued: !1, promise: ret, target: target, bindingPromise: maybePromise };
                  target._then(INTERNAL, targetRejected, ret._progress, ret, context), maybePromise._then(bindingResolved, bindingRejected, ret._progress, ret, context)
                } else ret._resolveCallback(target); return ret
              }, Promise.prototype._setBoundTo = function (obj) { void 0 !== obj ? (this._bitField = 131072 | this._bitField, this._boundTo = obj) : this._bitField = this._bitField & -131073 }, Promise.prototype._isBound = function () { return 131072 === (131072 & this._bitField) }, Promise.bind = function (thisArg, value) {
                var maybePromise = tryConvertToPromise(thisArg),
                ret = new Promise(INTERNAL); return ret._setBoundTo(maybePromise), maybePromise instanceof Promise ? maybePromise._then(function () { ret._resolveCallback(value) }, ret._reject, ret._progress, ret, null) : ret._resolveCallback(value), ret
              }
            }
          }, {}],
          4: [function (_dereq_, module, exports) {
            "use strict";

            function noConflict() { try { Promise === bluebird && (Promise = old) } catch (e) { } return bluebird } var old; "undefined" != typeof Promise && (old = Promise); var bluebird = _dereq_("./promise.js")();
            bluebird.noConflict = noConflict, module.exports = bluebird
          }, { "./promise.js": 23 }],
          5: [function (_dereq_, module, exports) {
            "use strict"; var cr = Object.create; if (cr) {
              var callerCache = cr(null),
              getterCache = cr(null);
              callerCache[" size"] = getterCache[" size"] = 0
            } module.exports = function (Promise) {
              function ensureMethod(obj, methodName) { var fn; if (null != obj && (fn = obj[methodName]), "function" != typeof fn) { var message = "Object " + util.classString(obj) + " has no method '" + util.toString(methodName) + "'"; throw new Promise.TypeError(message) } return fn }

              function caller(obj) {
                var methodName = this.pop(),
                fn = ensureMethod(obj, methodName); return fn.apply(obj, this)
              }

              function namedGetter(obj) { return obj[this] }

              function indexedGetter(obj) { var index = +this; return index < 0 && (index = Math.max(0, index + obj.length)), obj[index] } var getGetter, util = _dereq_("./util.js"),
                canEvaluate = util.canEvaluate;
              util.isIdentifier;
              Promise.prototype.call = function (methodName) { for (var $_len = arguments.length, args = new Array($_len - 1), $_i = 1; $_i < $_len; ++$_i) args[$_i - 1] = arguments[$_i]; return args.push(methodName), this._then(caller, void 0, void 0, args, void 0) }, Promise.prototype.get = function (propertyName) {
                var getter, isIndex = "number" == typeof propertyName; if (isIndex) getter = indexedGetter;
                else if (canEvaluate) {
                  var maybeGetter = getGetter(propertyName);
                  getter = null !== maybeGetter ? maybeGetter : namedGetter
                } else getter = namedGetter; return this._then(getter, void 0, void 0, propertyName, void 0)
              }
            }
          }, { "./util.js": 38 }],
          6: [function (_dereq_, module, exports) {
            "use strict";
            module.exports = function (Promise) {
              var errors = _dereq_("./errors.js"),
              async = _dereq_("./async.js"),
              CancellationError = errors.CancellationError;
              Promise.prototype._cancel = function (reason) {
                if (!this.isCancellable()) return this; for (var parent, promiseToReject = this; void 0 !== (parent = promiseToReject._cancellationParent) && parent.isCancellable();) promiseToReject = parent;
                this._unsetCancellable(), promiseToReject._target()._rejectCallback(reason, !1, !0)
              }, Promise.prototype.cancel = function (reason) { return this.isCancellable() ? (void 0 === reason && (reason = new CancellationError), async.invokeLater(this._cancel, this, reason), this) : this }, Promise.prototype.cancellable = function () { return this._cancellable() ? this : (async.enableTrampoline(), this._setCancellable(), this._cancellationParent = void 0, this) }, Promise.prototype.uncancellable = function () { var ret = this.then(); return ret._unsetCancellable(), ret }, Promise.prototype.fork = function (didFulfill, didReject, didProgress) { var ret = this._then(didFulfill, didReject, didProgress, void 0, void 0); return ret._setCancellable(), ret._cancellationParent = void 0, ret }
            }
          }, { "./async.js": 2, "./errors.js": 13 }],
          7: [function (_dereq_, module, exports) {
            "use strict";
            module.exports = function () {
              function CapturedTrace(parent) {
              this._parent = parent; var length = this._length = 1 + (void 0 === parent ? 0 : parent._length);
                captureStackTrace(this, CapturedTrace), length > 32 && this.uncycle()
              }

              function reconstructStack(message, stacks) { for (var i = 0; i < stacks.length - 1; ++i) stacks[i].push("From previous event:"), stacks[i] = stacks[i].join("\n"); return i < stacks.length && (stacks[i] = stacks[i].join("\n")), message + "\n" + stacks.join("\n") }

              function removeDuplicateOrEmptyJumps(stacks) { for (var i = 0; i < stacks.length; ++i)(0 === stacks[i].length || i + 1 < stacks.length && stacks[i][0] === stacks[i + 1][0]) && (stacks.splice(i, 1), i--) }

              function removeCommonRoots(stacks) {
                for (var current = stacks[0], i = 1; i < stacks.length; ++i) {
                  for (var prev = stacks[i], currentLastIndex = current.length - 1, currentLastLine = current[currentLastIndex], commonRootMeetPoint = -1, j = prev.length - 1; j >= 0; --j)
                    if (prev[j] === currentLastLine) { commonRootMeetPoint = j; break }
                  for (var j = commonRootMeetPoint; j >= 0; --j) {
                    var line = prev[j]; if (current[currentLastIndex] !== line) break;
                    current.pop(), currentLastIndex--
                  } current = prev
                }
              }

              function cleanStack(stack) {
                for (var ret = [], i = 0; i < stack.length; ++i) {
                  var line = stack[i],
                  isTraceLine = stackFramePattern.test(line) || "    (No stack trace)" === line,
                  isInternalFrame = isTraceLine && shouldIgnore(line);
                  isTraceLine && !isInternalFrame && (indentStackFrames && " " !== line.charAt(0) && (line = "    " + line), ret.push(line))
                } return ret
              }

              function stackFramesAsArray(error) { for (var stack = error.stack.replace(/\s+$/g, "").split("\n"), i = 0; i < stack.length; ++i) { var line = stack[i]; if ("    (No stack trace)" === line || stackFramePattern.test(line)) break } return i > 0 && (stack = stack.slice(i)), stack }

              function formatNonError(obj) {
                var str; if ("function" == typeof obj) str = "[function " + (obj.name || "anonymous") + "]";
                else {
                  str = obj.toString(); var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/; if (ruselessToString.test(str)) try {
                    var newStr = JSON.stringify(obj);
                    str = newStr
                  } catch (e) { } 0 === str.length && (str = "(empty array)")
                } return "(<" + snip(str) + ">, no stack trace)"
              }

              function snip(str) { var maxChars = 41; return str.length < maxChars ? str : str.substr(0, maxChars - 3) + "..." }

              function parseLineInfo(line) { var matches = line.match(parseLineInfoRegex); if (matches) return { fileName: matches[1], line: parseInt(matches[2], 10) } } var warn, async = _dereq_("./async.js"),
                util = _dereq_("./util.js"),
                bluebirdFramePattern = /[\\\/]bluebird[\\\/]js[\\\/](main|debug|zalgo|instrumented)/,
                stackFramePattern = null,
                formatStack = null,
                indentStackFrames = !1;
              util.inherits(CapturedTrace, Error), CapturedTrace.prototype.uncycle = function () {
                var length = this._length; if (!(length < 2)) {
                  for (var nodes = [], stackToIndex = {}, i = 0, node = this; void 0 !== node; ++i) nodes.push(node), node = node._parent;
                  length = this._length = i; for (var i = length - 1; i >= 0; --i) {
                    var stack = nodes[i].stack;
                    void 0 === stackToIndex[stack] && (stackToIndex[stack] = i)
                  } for (var i = 0; i < length; ++i) {
                    var currentStack = nodes[i].stack,
                    index = stackToIndex[currentStack]; if (void 0 !== index && index !== i) {
                    index > 0 && (nodes[index - 1]._parent = void 0, nodes[index - 1]._length = 1), nodes[i]._parent = void 0, nodes[i]._length = 1; var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;
                      index < length - 1 ? (cycleEdgeNode._parent = nodes[index + 1], cycleEdgeNode._parent.uncycle(), cycleEdgeNode._length = cycleEdgeNode._parent._length + 1) : (cycleEdgeNode._parent = void 0, cycleEdgeNode._length = 1); for (var currentChildLength = cycleEdgeNode._length + 1, j = i - 2; j >= 0; --j) nodes[j]._length = currentChildLength, currentChildLength++; return
                    }
                  }
                }
              }, CapturedTrace.prototype.parent = function () { return this._parent }, CapturedTrace.prototype.hasParent = function () { return void 0 !== this._parent }, CapturedTrace.prototype.attachExtraTrace = function (error) {
                if (!error.__stackCleaned__) {
                  this.uncycle(); for (var parsed = CapturedTrace.parseStackAndMessage(error), message = parsed.message, stacks = [parsed.stack], trace = this; void 0 !== trace;) stacks.push(cleanStack(trace.stack.split("\n"))), trace = trace._parent;
                  removeCommonRoots(stacks), removeDuplicateOrEmptyJumps(stacks), util.notEnumerableProp(error, "stack", reconstructStack(message, stacks)), util.notEnumerableProp(error, "__stackCleaned__", !0)
                }
              }, CapturedTrace.parseStackAndMessage = function (error) {
                var stack = error.stack,
                message = error.toString(); return stack = "string" == typeof stack && stack.length > 0 ? stackFramesAsArray(error) : ["    (No stack trace)"], { message: message, stack: cleanStack(stack) }
              }, CapturedTrace.formatAndLogError = function (error, title) {
                if ("undefined" != typeof console) {
                  var message; if ("object" == typeof error || "function" == typeof error) {
                    var stack = error.stack;
                    message = title + formatStack(stack, error)
                  } else message = title + String(error); "function" == typeof warn ? warn(message) : "function" != typeof console.log && "object" != typeof console.log || console.log(message)
                }
              }, CapturedTrace.unhandledRejection = function (reason) { CapturedTrace.formatAndLogError(reason, "^--- With additional stack trace: ") }, CapturedTrace.isSupported = function () { return "function" == typeof captureStackTrace }, CapturedTrace.fireRejectionEvent = function (name, localHandler, reason, promise) { var localEventFired = !1; try { "function" == typeof localHandler && (localEventFired = !0, "rejectionHandled" === name ? localHandler(promise) : localHandler(reason, promise)) } catch (e) { async.throwLater(e) } var globalEventFired = !1; try { globalEventFired = fireGlobalEvent(name, reason, promise) } catch (e) { globalEventFired = !0, async.throwLater(e) } var domEventFired = !1; if (fireDomEvent) try { domEventFired = fireDomEvent(name.toLowerCase(), { reason: reason, promise: promise }) } catch (e) { domEventFired = !0, async.throwLater(e) } globalEventFired || localEventFired || domEventFired || "unhandledRejection" !== name || CapturedTrace.formatAndLogError(reason, "Unhandled rejection ") }; var shouldIgnore = function () { return !1 },
                parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
              CapturedTrace.setBounds = function (firstLineError, lastLineError) { if (CapturedTrace.isSupported()) { for (var firstFileName, lastFileName, firstStackLines = firstLineError.stack.split("\n"), lastStackLines = lastLineError.stack.split("\n"), firstIndex = -1, lastIndex = -1, i = 0; i < firstStackLines.length; ++i) { var result = parseLineInfo(firstStackLines[i]); if (result) { firstFileName = result.fileName, firstIndex = result.line; break } } for (var i = 0; i < lastStackLines.length; ++i) { var result = parseLineInfo(lastStackLines[i]); if (result) { lastFileName = result.fileName, lastIndex = result.line; break } } firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName || firstFileName !== lastFileName || firstIndex >= lastIndex || (shouldIgnore = function (line) { if (bluebirdFramePattern.test(line)) return !0; var info = parseLineInfo(line); return !!(info && info.fileName === firstFileName && firstIndex <= info.line && info.line <= lastIndex) }) } }; var fireDomEvent, captureStackTrace = function () {
                var v8stackFramePattern = /^\s*at\s*/,
                v8stackFormatter = function (stack, error) { return "string" == typeof stack ? stack : void 0 !== error.name && void 0 !== error.message ? error.toString() : formatNonError(error) }; if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                Error.stackTraceLimit = Error.stackTraceLimit + 6, stackFramePattern = v8stackFramePattern, formatStack = v8stackFormatter; var captureStackTrace = Error.captureStackTrace; return shouldIgnore = function (line) { return bluebirdFramePattern.test(line) },
                  function (receiver, ignoreUntil) { Error.stackTraceLimit = Error.stackTraceLimit + 6, captureStackTrace(receiver, ignoreUntil), Error.stackTraceLimit = Error.stackTraceLimit - 6 }
                } var err = new Error; if ("string" == typeof err.stack && err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) return stackFramePattern = /@/, formatStack = v8stackFormatter, indentStackFrames = !0,
                  function (o) { o.stack = (new Error).stack }; var hasStackAfterThrow; try { throw new Error } catch (e) { hasStackAfterThrow = "stack" in e } return "stack" in err || !hasStackAfterThrow || "number" != typeof Error.stackTraceLimit ? (formatStack = function (stack, error) { return "string" == typeof stack ? stack : "object" != typeof error && "function" != typeof error || void 0 === error.name || void 0 === error.message ? formatNonError(error) : error.toString() }, null): (stackFramePattern = v8stackFramePattern, formatStack = v8stackFormatter, function(o) { Error.stackTraceLimit = Error.stackTraceLimit + 6; try { throw new Error } catch (e) { o.stack = e.stack } Error.stackTraceLimit = Error.stackTraceLimit - 6 })
      }([]),
        fireGlobalEvent = function () {
          if (util.isNode) return function (name, reason, promise) { return "rejectionHandled" === name ? process.emit(name, promise) : process.emit(name, reason, promise) }; var customEventWorks = !1,
            anyEventWorks = !0; try {
              var ev = new self.CustomEvent("test");
              customEventWorks = ev instanceof CustomEvent
            } catch (e) { } if (!customEventWorks) try {
              var event = document.createEvent("CustomEvent");
              event.initCustomEvent("testingtheevent", !1, !0, {}), self.dispatchEvent(event)
            } catch (e) { anyEventWorks = !1 } anyEventWorks && (fireDomEvent = function (type, detail) { var event; return customEventWorks ? event = new self.CustomEvent(type, { detail: detail, bubbles: !1, cancelable: !0 }) : self.dispatchEvent && (event = document.createEvent("CustomEvent"), event.initCustomEvent(type, !1, !0, detail)), !!event && !self.dispatchEvent(event) }); var toWindowMethodNameMap = {}; return toWindowMethodNameMap.unhandledRejection = "onunhandledRejection".toLowerCase(), toWindowMethodNameMap.rejectionHandled = "onrejectionHandled".toLowerCase(),
              function (name, reason, promise) {
                var methodName = toWindowMethodNameMap[name],
                method = self[methodName]; return !!method && ("rejectionHandled" === name ? method.call(self, promise) : method.call(self, reason, promise), !0)
              }
        }(); return "undefined" != typeof console && "undefined" != typeof console.warn && (warn = function (message) { console.warn(message) }, util.isNode && process.stderr.isTTY ? warn = function (message) { process.stderr.write("[31m" + message + "[39m\n") } : util.isNode || "string" != typeof (new Error).stack || (warn = function (message) { console.warn("%c" + message, "color: red") })), CapturedTrace
    } }, { "./async.js": 2, "./util.js": 38 }],
  8: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (NEXT_FILTER) {
      function CatchFilter(instances, callback, promise) { this._instances = instances, this._callback = callback, this._promise = promise }

      function safePredicate(predicate, e) {
        var safeObject = {},
        retfilter = tryCatch(predicate).call(safeObject, e); if (retfilter === errorObj) return retfilter; var safeKeys = keys(safeObject); return safeKeys.length ? (errorObj.e = new TypeError("Catch filter must inherit from Error or be a simple predicate function\n\n    See http://goo.gl/o84o68\n"), errorObj) : retfilter
      } var util = _dereq_("./util.js"),
        errors = _dereq_("./errors.js"),
        tryCatch = util.tryCatch,
        errorObj = util.errorObj,
        keys = _dereq_("./es5.js").keys,
        TypeError = errors.TypeError; return CatchFilter.prototype.doFilter = function (e) {
          for (var cb = this._callback, promise = this._promise, boundTo = promise._boundValue(), i = 0, len = this._instances.length; i < len; ++i) {
            var item = this._instances[i],
            itemIsErrorType = item === Error || null != item && item.prototype instanceof Error; if (itemIsErrorType && e instanceof item) { var ret = tryCatch(cb).call(boundTo, e); return ret === errorObj ? (NEXT_FILTER.e = ret.e, NEXT_FILTER) : ret } if ("function" == typeof item && !itemIsErrorType) { var shouldHandle = safePredicate(item, e); if (shouldHandle === errorObj) { e = errorObj.e; break } if (shouldHandle) { var ret = tryCatch(cb).call(boundTo, e); return ret === errorObj ? (NEXT_FILTER.e = ret.e, NEXT_FILTER) : ret } }
          } return NEXT_FILTER.e = e, NEXT_FILTER
        }, CatchFilter
    }
  }, { "./errors.js": 13, "./es5.js": 14, "./util.js": 38 }],
  9: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, CapturedTrace, isDebugging) {
      function Context() { this._trace = new CapturedTrace(peekContext()) }

      function createContext() { if (isDebugging()) return new Context }

      function peekContext() { var lastIndex = contextStack.length - 1; if (lastIndex >= 0) return contextStack[lastIndex] } var contextStack = []; return Context.prototype._pushContext = function () { isDebugging() && void 0 !== this._trace && contextStack.push(this._trace) }, Context.prototype._popContext = function () { isDebugging() && void 0 !== this._trace && contextStack.pop() }, Promise.prototype._peekContext = peekContext, Promise.prototype._pushContext = Context.prototype._pushContext, Promise.prototype._popContext = Context.prototype._popContext, createContext
    }
  }, {}],
  10: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, CapturedTrace) {
      var unhandledRejectionHandled, possiblyUnhandledRejection, getDomain = Promise._getDomain,
      async = _dereq_("./async.js"),
      Warning = _dereq_("./errors.js").Warning,
      util = _dereq_("./util.js"),
      canAttachTrace = util.canAttachTrace,
      debugging = util.isNode && (!!process.env.BLUEBIRD_DEBUG || "development" === process.env.NODE_ENV); return util.isNode && 0 == process.env.BLUEBIRD_DEBUG && (debugging = !1), debugging && async.disableTrampolineIfNecessary(), Promise.prototype._ignoreRejections = function () { this._unsetRejectionIsUnhandled(), this._bitField = 16777216 | this._bitField }, Promise.prototype._ensurePossibleRejectionHandled = function () { 0 === (16777216 & this._bitField) && (this._setRejectionIsUnhandled(), async.invokeLater(this._notifyUnhandledRejection, this, void 0)) }, Promise.prototype._notifyUnhandledRejectionIsHandled = function () { CapturedTrace.fireRejectionEvent("rejectionHandled", unhandledRejectionHandled, void 0, this) }, Promise.prototype._notifyUnhandledRejection = function () {
        if (this._isRejectionUnhandled()) {
          var reason = this._getCarriedStackTrace() || this._settledValue;
          this._setUnhandledRejectionIsNotified(), CapturedTrace.fireRejectionEvent("unhandledRejection", possiblyUnhandledRejection, reason, this)
        }
      }, Promise.prototype._setUnhandledRejectionIsNotified = function () { this._bitField = 524288 | this._bitField }, Promise.prototype._unsetUnhandledRejectionIsNotified = function () { this._bitField = this._bitField & -524289 }, Promise.prototype._isUnhandledRejectionNotified = function () { return (524288 & this._bitField) > 0 }, Promise.prototype._setRejectionIsUnhandled = function () { this._bitField = 2097152 | this._bitField }, Promise.prototype._unsetRejectionIsUnhandled = function () { this._bitField = this._bitField & -2097153, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled()) }, Promise.prototype._isRejectionUnhandled = function () { return (2097152 & this._bitField) > 0 }, Promise.prototype._setCarriedStackTrace = function (capturedTrace) { this._bitField = 1048576 | this._bitField, this._fulfillmentHandler0 = capturedTrace }, Promise.prototype._isCarryingStackTrace = function () { return (1048576 & this._bitField) > 0 }, Promise.prototype._getCarriedStackTrace = function () { return this._isCarryingStackTrace() ? this._fulfillmentHandler0 : void 0 }, Promise.prototype._captureStackTrace = function () { return debugging && (this._trace = new CapturedTrace(this._peekContext())), this }, Promise.prototype._attachExtraTrace = function (error, ignoreSelf) {
        if (debugging && canAttachTrace(error)) {
          var trace = this._trace; if (void 0 !== trace && ignoreSelf && (trace = trace._parent), void 0 !== trace) trace.attachExtraTrace(error);
          else if (!error.__stackCleaned__) {
            var parsed = CapturedTrace.parseStackAndMessage(error);
            util.notEnumerableProp(error, "stack", parsed.message + "\n" + parsed.stack.join("\n")), util.notEnumerableProp(error, "__stackCleaned__", !0)
          }
        }
      }, Promise.prototype._warn = function (message) {
        var warning = new Warning(message),
        ctx = this._peekContext(); if (ctx) ctx.attachExtraTrace(warning);
        else {
          var parsed = CapturedTrace.parseStackAndMessage(warning);
          warning.stack = parsed.message + "\n" + parsed.stack.join("\n")
        } CapturedTrace.formatAndLogError(warning, "")
      }, Promise.onPossiblyUnhandledRejection = function (fn) {
        var domain = getDomain();
        possiblyUnhandledRejection = "function" == typeof fn ? null === domain ? fn : domain.bind(fn) : void 0
      }, Promise.onUnhandledRejectionHandled = function (fn) {
        var domain = getDomain();
        unhandledRejectionHandled = "function" == typeof fn ? null === domain ? fn : domain.bind(fn) : void 0
      }, Promise.longStackTraces = function () {
        if (async.haveItemsQueued() && debugging === !1) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/DT1qyG\n");
        debugging = CapturedTrace.isSupported(), debugging && async.disableTrampolineIfNecessary()
      }, Promise.hasLongStackTraces = function () { return debugging && CapturedTrace.isSupported() }, CapturedTrace.isSupported() || (Promise.longStackTraces = function () { }, debugging = !1),
        function () { return debugging }
    }
  }, { "./async.js": 2, "./errors.js": 13, "./util.js": 38 }],
  11: [function (_dereq_, module, exports) {
    "use strict"; var util = _dereq_("./util.js"),
      isPrimitive = util.isPrimitive;
    module.exports = function (Promise) {
      var returner = function () { return this },
      thrower = function () { throw this },
      returnUndefined = function () { },
      throwUndefined = function () { throw void 0 },
      wrapper = function (value, action) { return 1 === action ? function () { throw value } : 2 === action ? function () { return value } : void 0 };
      Promise.prototype.return = Promise.prototype.thenReturn = function (value) { return void 0 === value ? this.then(returnUndefined) : isPrimitive(value) ? this._then(wrapper(value, 2), void 0, void 0, void 0, void 0) : (value instanceof Promise && value._ignoreRejections(), this._then(returner, void 0, void 0, value, void 0)) }, Promise.prototype.throw = Promise.prototype.thenThrow = function (reason) { return void 0 === reason ? this.then(throwUndefined) : isPrimitive(reason) ? this._then(wrapper(reason, 1), void 0, void 0, void 0, void 0) : this._then(thrower, void 0, void 0, reason, void 0) }
    }
  }, { "./util.js": 38 }],
  12: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, INTERNAL) {
      var PromiseReduce = Promise.reduce;
      Promise.prototype.each = function (fn) { return PromiseReduce(this, fn, null, INTERNAL) }, Promise.each = function (promises, fn) { return PromiseReduce(promises, fn, null, INTERNAL) }
    }
  }, {}],
  13: [function (_dereq_, module, exports) {
    "use strict";

    function subError(nameProperty, defaultMessage) {
      function SubError(message) { return this instanceof SubError ? (notEnumerableProp(this, "message", "string" == typeof message ? message : defaultMessage), notEnumerableProp(this, "name", nameProperty), void (Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this))) : new SubError(message) } return inherits(SubError, Error), SubError
    }

    function OperationalError(message) { return this instanceof OperationalError ? (notEnumerableProp(this, "name", "OperationalError"), notEnumerableProp(this, "message", message), this.cause = message, this.isOperational = !0, void (message instanceof Error ? (notEnumerableProp(this, "message", message.message), notEnumerableProp(this, "stack", message.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor))) : new OperationalError(message) } var _TypeError, _RangeError, es5 = _dereq_("./es5.js"),
      Objectfreeze = es5.freeze,
      util = _dereq_("./util.js"),
      inherits = util.inherits,
      notEnumerableProp = util.notEnumerableProp,
      Warning = subError("Warning", "warning"),
      CancellationError = subError("CancellationError", "cancellation error"),
      TimeoutError = subError("TimeoutError", "timeout error"),
      AggregateError = subError("AggregateError", "aggregate error"); try { _TypeError = TypeError, _RangeError = RangeError } catch (e) { _TypeError = subError("TypeError", "type error"), _RangeError = subError("RangeError", "range error") } for (var methods = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), i = 0; i < methods.length; ++i) "function" == typeof Array.prototype[methods[i]] && (AggregateError.prototype[methods[i]] = Array.prototype[methods[i]]);
    es5.defineProperty(AggregateError.prototype, "length", { value: 0, configurable: !1, writable: !0, enumerable: !0 }), AggregateError.prototype.isOperational = !0; var level = 0;
    AggregateError.prototype.toString = function () {
      var indent = Array(4 * level + 1).join(" "),
      ret = "\n" + indent + "AggregateError of:\n";
      level++ , indent = Array(4 * level + 1).join(" "); for (var i = 0; i < this.length; ++i) {
        for (var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "", lines = str.split("\n"), j = 0; j < lines.length; ++j) lines[j] = indent + lines[j];
        str = lines.join("\n"), ret += str + "\n"
      } return level-- , ret
    }, inherits(OperationalError, Error); var errorTypes = Error.__BluebirdErrorTypes__;
    errorTypes || (errorTypes = Objectfreeze({ CancellationError: CancellationError, TimeoutError: TimeoutError, OperationalError: OperationalError, RejectionError: OperationalError, AggregateError: AggregateError }), notEnumerableProp(Error, "__BluebirdErrorTypes__", errorTypes)), module.exports = { Error: Error, TypeError: _TypeError, RangeError: _RangeError, CancellationError: errorTypes.CancellationError, OperationalError: errorTypes.OperationalError, TimeoutError: errorTypes.TimeoutError, AggregateError: errorTypes.AggregateError, Warning: Warning }
  }, { "./es5.js": 14, "./util.js": 38 }],
  14: [function (_dereq_, module, exports) {
    var isES5 = function () { "use strict"; return void 0 === this }(); if (isES5) module.exports = { freeze: Object.freeze, defineProperty: Object.defineProperty, getDescriptor: Object.getOwnPropertyDescriptor, keys: Object.keys, names: Object.getOwnPropertyNames, getPrototypeOf: Object.getPrototypeOf, isArray: Array.isArray, isES5: isES5, propertyIsWritable: function (obj, prop) { var descriptor = Object.getOwnPropertyDescriptor(obj, prop); return !(descriptor && !descriptor.writable && !descriptor.set) } };
    else {
      var has = {}.hasOwnProperty,
      str = {}.toString,
      proto = {}.constructor.prototype,
      ObjectKeys = function (o) { var ret = []; for (var key in o) has.call(o, key) && ret.push(key); return ret },
      ObjectGetDescriptor = function (o, key) { return { value: o[key] } },
      ObjectDefineProperty = function (o, key, desc) { return o[key] = desc.value, o },
      ObjectFreeze = function (obj) { return obj },
      ObjectGetPrototypeOf = function (obj) { try { return Object(obj).constructor.prototype } catch (e) { return proto } },
      ArrayIsArray = function (obj) { try { return "[object Array]" === str.call(obj) } catch (e) { return !1 } };
      module.exports = { isArray: ArrayIsArray, keys: ObjectKeys, names: ObjectKeys, defineProperty: ObjectDefineProperty, getDescriptor: ObjectGetDescriptor, freeze: ObjectFreeze, getPrototypeOf: ObjectGetPrototypeOf, isES5: isES5, propertyIsWritable: function () { return !0 } }
    }
  }, {}],
  15: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, INTERNAL) {
      var PromiseMap = Promise.map;
      Promise.prototype.filter = function (fn, options) { return PromiseMap(this, fn, options, INTERNAL) }, Promise.filter = function (promises, fn, options) { return PromiseMap(promises, fn, options, INTERNAL) }
    }
  }, {}],
  16: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, NEXT_FILTER, tryConvertToPromise) {
      function returnThis() { return this }

      function throwThis() { throw this }

      function return$(r) { return function () { return r } }

      function throw$(r) { return function () { throw r } }

      function promisedFinally(ret, reasonOrValue, isFulfilled) { var then; return then = isPrimitive(reasonOrValue) ? isFulfilled ? return$(reasonOrValue) : throw$(reasonOrValue) : isFulfilled ? returnThis : throwThis, ret._then(then, thrower, void 0, reasonOrValue, void 0) }

      function finallyHandler(reasonOrValue) {
        var promise = this.promise,
        handler = this.handler,
        ret = promise._isBound() ? handler.call(promise._boundValue()) : handler(); if (void 0 !== ret) { var maybePromise = tryConvertToPromise(ret, promise); if (maybePromise instanceof Promise) return maybePromise = maybePromise._target(), promisedFinally(maybePromise, reasonOrValue, promise.isFulfilled()) } return promise.isRejected() ? (NEXT_FILTER.e = reasonOrValue, NEXT_FILTER) : reasonOrValue
      }

      function tapHandler(value) {
        var promise = this.promise,
        handler = this.handler,
        ret = promise._isBound() ? handler.call(promise._boundValue(), value) : handler(value); if (void 0 !== ret) { var maybePromise = tryConvertToPromise(ret, promise); if (maybePromise instanceof Promise) return maybePromise = maybePromise._target(), promisedFinally(maybePromise, value, !0) } return value
      } var util = _dereq_("./util.js"),
        isPrimitive = util.isPrimitive,
        thrower = util.thrower;
      Promise.prototype._passThroughHandler = function (handler, isFinally) { if ("function" != typeof handler) return this.then(); var promiseAndHandler = { promise: this, handler: handler }; return this._then(isFinally ? finallyHandler : tapHandler, isFinally ? finallyHandler : void 0, void 0, promiseAndHandler, void 0) }, Promise.prototype.lastly = Promise.prototype.finally = function (handler) { return this._passThroughHandler(handler, !0) }, Promise.prototype.tap = function (handler) { return this._passThroughHandler(handler, !1) }
    }
  }, { "./util.js": 38 }],
  17: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, apiRejection, INTERNAL, tryConvertToPromise) {
      function promiseFromYieldHandler(value, yieldHandlers, traceParent) { for (var i = 0; i < yieldHandlers.length; ++i) { traceParent._pushContext(); var result = tryCatch(yieldHandlers[i])(value); if (traceParent._popContext(), result === errorObj) { traceParent._pushContext(); var ret = Promise.reject(errorObj.e); return traceParent._popContext(), ret } var maybePromise = tryConvertToPromise(result, traceParent); if (maybePromise instanceof Promise) return maybePromise } return null }

      function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
        var promise = this._promise = new Promise(INTERNAL);
        promise._captureStackTrace(), this._stack = stack, this._generatorFunction = generatorFunction, this._receiver = receiver, this._generator = void 0, this._yieldHandlers = "function" == typeof yieldHandler ? [yieldHandler].concat(yieldHandlers) : yieldHandlers
      }
      var errors = _dereq_("./errors.js"),
        TypeError = errors.TypeError,
        util = _dereq_("./util.js"),
        errorObj = util.errorObj,
        tryCatch = util.tryCatch,
        yieldHandlers = [];
      PromiseSpawn.prototype.promise = function () { return this._promise }, PromiseSpawn.prototype._run = function () { this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, this._next(void 0) }, PromiseSpawn.prototype._continue = function (result) {
        if (result === errorObj) return this._promise._rejectCallback(result.e, !1, !0); var value = result.value; if (result.done === !0) this._promise._resolveCallback(value);
        else {
          var maybePromise = tryConvertToPromise(value, this._promise); if (!(maybePromise instanceof Promise) && (maybePromise = promiseFromYieldHandler(maybePromise, this._yieldHandlers, this._promise), null === maybePromise)) return void this._throw(new TypeError("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/4Y4pDk\n\n".replace("%s", value) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
          maybePromise._then(this._next, this._throw, void 0, this, null)
        }
      }, PromiseSpawn.prototype._throw = function (reason) {
        this._promise._attachExtraTrace(reason), this._promise._pushContext(); var result = tryCatch(this._generator.throw).call(this._generator, reason);
        this._promise._popContext(), this._continue(result)
      }, PromiseSpawn.prototype._next = function (value) {
        this._promise._pushContext(); var result = tryCatch(this._generator.next).call(this._generator, value);
        this._promise._popContext(), this._continue(result)
      }, Promise.coroutine = function (generatorFunction, options) {
        if ("function" != typeof generatorFunction) throw new TypeError("generatorFunction must be a function\n\n    See http://goo.gl/6Vqhm0\n");
        var yieldHandler = Object(options).yieldHandler,
          PromiseSpawn$ = PromiseSpawn,
          stack = (new Error).stack;
        return function () {
          var generator = generatorFunction.apply(this, arguments),
            spawn = new PromiseSpawn$(void 0, void 0, yieldHandler, stack);
          return spawn._generator = generator,
            spawn._next(void 0), spawn.promise()
        }
      }, Promise.coroutine.addYieldHandler = function (fn) {
        if ("function" != typeof fn) throw new TypeError("fn must be a function\n\n    See http://goo.gl/916lJJ\n");
        yieldHandlers.push(fn)
      }, Promise.spawn = function (generatorFunction) {
        if ("function" != typeof generatorFunction) return apiRejection("generatorFunction must be a function\n\n    See http://goo.gl/6Vqhm0\n"); var spawn = new PromiseSpawn(generatorFunction, this),
          ret = spawn.promise(); return spawn._run(Promise.spawn), ret
      }
    }
  }, { "./errors.js": 13, "./util.js": 38 }],
  18: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, PromiseArray, tryConvertToPromise, INTERNAL) {
      var util = _dereq_("./util.js");
      util.canEvaluate, util.tryCatch, util.errorObj;
      Promise.join = function () {
        var fn, last = arguments.length - 1; if (last > 0 && "function" == typeof arguments[last]) { fn = arguments[last]; var ret } for (var $_len = arguments.length, args = new Array($_len), $_i = 0; $_i < $_len; ++$_i) args[$_i] = arguments[$_i];
        fn && args.pop(); var ret = new PromiseArray(args).promise(); return void 0 !== fn ? ret.spread(fn) : ret
      }
    }
  }, { "./util.js": 38 }],
  19: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL) {
      function MappingPromiseArray(promises, fn, limit, _filter) {
        this.constructor$(promises), this._promise._captureStackTrace(); var domain = getDomain();
        this._callback = null === domain ? fn : domain.bind(fn), this._preservedValues = _filter === INTERNAL ? new Array(this.length()) : null, this._limit = limit, this._inFlight = 0, this._queue = limit >= 1 ? [] : EMPTY_ARRAY, async.invoke(init, this, void 0)
      }

      function init() { this._init$(void 0, -2) }

      function map(promises, fn, options, _filter) { var limit = "object" == typeof options && null !== options ? options.concurrency : 0; return limit = "number" == typeof limit && isFinite(limit) && limit >= 1 ? limit : 0, new MappingPromiseArray(promises, fn, limit, _filter) } var getDomain = Promise._getDomain,
        async = _dereq_("./async.js"),
        util = _dereq_("./util.js"),
        tryCatch = util.tryCatch,
        errorObj = util.errorObj,
        PENDING = {},
        EMPTY_ARRAY = [];
      util.inherits(MappingPromiseArray, PromiseArray), MappingPromiseArray.prototype._init = function () { }, MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
        var values = this._values,
        length = this.length(),
        preservedValues = this._preservedValues,
        limit = this._limit; if (values[index] === PENDING) { if (values[index] = value, limit >= 1 && (this._inFlight-- , this._drainQueue(), this._isResolved())) return } else {
          if (limit >= 1 && this._inFlight >= limit) return values[index] = value, void this._queue.push(index);
          null !== preservedValues && (preservedValues[index] = value); var callback = this._callback,
            receiver = this._promise._boundValue();
          this._promise._pushContext(); var ret = tryCatch(callback).call(receiver, value, index, length); if (this._promise._popContext(), ret === errorObj) return this._reject(ret.e); var maybePromise = tryConvertToPromise(ret, this._promise); if (maybePromise instanceof Promise) {
            if (maybePromise = maybePromise._target(), maybePromise._isPending()) return limit >= 1 && this._inFlight++ , values[index] = PENDING, maybePromise._proxyPromiseArray(this, index); if (!maybePromise._isFulfilled()) return this._reject(maybePromise._reason());
            ret = maybePromise._value()
          } values[index] = ret
        } var totalResolved = ++this._totalResolved;
        totalResolved >= length && (null !== preservedValues ? this._filter(values, preservedValues) : this._resolve(values))
      }, MappingPromiseArray.prototype._drainQueue = function () {
        for (var queue = this._queue, limit = this._limit, values = this._values; queue.length > 0 && this._inFlight < limit;) {
          if (this._isResolved()) return; var index = queue.pop();
          this._promiseFulfilled(values[index], index)
        }
      }, MappingPromiseArray.prototype._filter = function (booleans, values) {
        for (var len = values.length, ret = new Array(len), j = 0, i = 0; i < len; ++i) booleans[i] && (ret[j++] = values[i]);
        ret.length = j, this._resolve(ret)
      }, MappingPromiseArray.prototype.preservedValues = function () { return this._preservedValues }, Promise.prototype.map = function (fn, options) { return "function" != typeof fn ? apiRejection("fn must be a function\n\n    See http://goo.gl/916lJJ\n") : map(this, fn, options, null).promise() }, Promise.map = function (promises, fn, options, _filter) { return "function" != typeof fn ? apiRejection("fn must be a function\n\n    See http://goo.gl/916lJJ\n") : map(promises, fn, options, _filter).promise() }
    }
  }, { "./async.js": 2, "./util.js": 38 }],
  20: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, INTERNAL, tryConvertToPromise, apiRejection) {
      var util = _dereq_("./util.js"),
      tryCatch = util.tryCatch;
      Promise.method = function (fn) {
        if ("function" != typeof fn) throw new Promise.TypeError("fn must be a function\n\n    See http://goo.gl/916lJJ\n"); return function () {
          var ret = new Promise(INTERNAL);
          ret._captureStackTrace(), ret._pushContext(); var value = tryCatch(fn).apply(this, arguments); return ret._popContext(), ret._resolveFromSyncValue(value), ret
        }
      }, Promise.attempt = Promise.try = function (fn, args, ctx) {
        if ("function" != typeof fn) return apiRejection("fn must be a function\n\n    See http://goo.gl/916lJJ\n"); var ret = new Promise(INTERNAL);
        ret._captureStackTrace(), ret._pushContext(); var value = util.isArray(args) ? tryCatch(fn).apply(ctx, args) : tryCatch(fn).call(ctx, args); return ret._popContext(), ret._resolveFromSyncValue(value), ret
      }, Promise.prototype._resolveFromSyncValue = function (value) { value === util.errorObj ? this._rejectCallback(value.e, !1, !0) : this._resolveCallback(value, !0) }
    }
  }, { "./util.js": 38 }],
  21: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise) {
      function spreadAdapter(val, nodeback) {
        var promise = this; if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback); var ret = tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
        ret === errorObj && async.throwLater(ret.e)
      }

      function successAdapter(val, nodeback) {
        var promise = this,
        receiver = promise._boundValue(),
        ret = void 0 === val ? tryCatch(nodeback).call(receiver, null) : tryCatch(nodeback).call(receiver, null, val);
        ret === errorObj && async.throwLater(ret.e)
      }

      function errorAdapter(reason, nodeback) {
        var promise = this; if (!reason) {
          var target = promise._target(),
          newReason = target._getCarriedStackTrace();
          newReason.cause = reason, reason = newReason
        } var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
        ret === errorObj && async.throwLater(ret.e)
      } var util = _dereq_("./util.js"),
        async = _dereq_("./async.js"),
        tryCatch = util.tryCatch,
        errorObj = util.errorObj;
      Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback, options) {
        if ("function" == typeof nodeback) {
          var adapter = successAdapter;
          void 0 !== options && Object(options).spread && (adapter = spreadAdapter), this._then(adapter, errorAdapter, void 0, this, nodeback)
        } return this
      }
    }
  }, { "./async.js": 2, "./util.js": 38 }],
  22: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, PromiseArray) {
      var util = _dereq_("./util.js"),
      async = _dereq_("./async.js"),
      tryCatch = util.tryCatch,
      errorObj = util.errorObj;
      Promise.prototype.progressed = function (handler) { return this._then(void 0, void 0, handler, void 0, void 0) }, Promise.prototype._progress = function (progressValue) { this._isFollowingOrFulfilledOrRejected() || this._target()._progressUnchecked(progressValue) }, Promise.prototype._progressHandlerAt = function (index) { return 0 === index ? this._progressHandler0 : this[(index << 2) + index - 5 + 2] }, Promise.prototype._doProgressWith = function (progression) {
        var progressValue = progression.value,
        handler = progression.handler,
        promise = progression.promise,
        receiver = progression.receiver,
        ret = tryCatch(handler).call(receiver, progressValue); if (ret === errorObj) {
          if (null != ret.e && "StopProgressPropagation" !== ret.e.name) {
            var trace = util.canAttachTrace(ret.e) ? ret.e : new Error(util.toString(ret.e));
            promise._attachExtraTrace(trace), promise._progress(ret.e)
          }
        } else ret instanceof Promise ? ret._then(promise._progress, null, null, promise, void 0) : promise._progress(ret)
      }, Promise.prototype._progressUnchecked = function (progressValue) {
        for (var len = this._length(), progress = this._progress, i = 0; i < len; i++) {
          var handler = this._progressHandlerAt(i),
          promise = this._promiseAt(i); if (promise instanceof Promise) "function" == typeof handler ? async.invoke(this._doProgressWith, this, { handler: handler, promise: promise, receiver: this._receiverAt(i), value: progressValue }) : async.invoke(progress, promise, progressValue);
          else { var receiver = this._receiverAt(i); "function" == typeof handler ? handler.call(receiver, progressValue, promise) : receiver instanceof PromiseArray && !receiver._isResolved() && receiver._promiseProgressed(progressValue, promise) }
        }
      }
    }
  }, { "./async.js": 2, "./util.js": 38 }],
  23: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function () {
      function Promise(resolver) {
        if ("function" != typeof resolver) throw new TypeError("the promise constructor requires a resolver function\n\n    See http://goo.gl/EC22Yn\n"); if (this.constructor !== Promise) throw new TypeError("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/KsIlge\n");
        this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._progressHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, this._settledValue = void 0, resolver !== INTERNAL && this._resolveFromResolver(resolver)
      }

      function fillTypes(value) {
        var p = new Promise(INTERNAL);
        p._fulfillmentHandler0 = value, p._rejectionHandler0 = value, p._progressHandler0 = value, p._promise0 = value, p._receiver0 = value, p._settledValue = value
      } var getDomain, makeSelfResolutionError = function () { return new TypeError("circular promise resolution chain\n\n    See http://goo.gl/LhFpo0\n") },
        reflect = function () { return new Promise.PromiseInspection(this._target()) },
        apiRejection = function (msg) { return Promise.reject(new TypeError(msg)) },
        util = _dereq_("./util.js");
      getDomain = util.isNode ? function () { var ret = process.domain; return void 0 === ret && (ret = null), ret } : function () { return null }, util.notEnumerableProp(Promise, "_getDomain", getDomain); var UNDEFINED_BINDING = {},
        async = _dereq_("./async.js"),
        errors = _dereq_("./errors.js"),
        TypeError = Promise.TypeError = errors.TypeError;
      Promise.RangeError = errors.RangeError, Promise.CancellationError = errors.CancellationError, Promise.TimeoutError = errors.TimeoutError, Promise.OperationalError = errors.OperationalError, Promise.RejectionError = errors.OperationalError, Promise.AggregateError = errors.AggregateError; var INTERNAL = function () { },
        APPLY = {},
        NEXT_FILTER = { e: null },
        tryConvertToPromise = _dereq_("./thenables.js")(Promise, INTERNAL),
        PromiseArray = _dereq_("./promise_array.js")(Promise, INTERNAL, tryConvertToPromise, apiRejection),
        CapturedTrace = _dereq_("./captured_trace.js")(),
        isDebugging = _dereq_("./debuggability.js")(Promise, CapturedTrace),
        createContext = _dereq_("./context.js")(Promise, CapturedTrace, isDebugging),
        CatchFilter = _dereq_("./catch_filter.js")(NEXT_FILTER),
        PromiseResolver = _dereq_("./promise_resolver.js"),
        nodebackForPromise = PromiseResolver._nodebackForPromise,
        errorObj = util.errorObj,
        tryCatch = util.tryCatch; return Promise.prototype.toString = function () { return "[object Promise]" }, Promise.prototype.caught = Promise.prototype.catch = function (fn) {
          var len = arguments.length; if (len > 1) {
            var i, catchInstances = new Array(len - 1),
            j = 0; for (i = 0; i < len - 1; ++i) {
              var item = arguments[i]; if ("function" != typeof item) return Promise.reject(new TypeError("Catch filter must inherit from Error or be a simple predicate function\n\n    See http://goo.gl/o84o68\n"));
              catchInstances[j++] = item
            } catchInstances.length = j, fn = arguments[i]; var catchFilter = new CatchFilter(catchInstances, fn, this); return this._then(void 0, catchFilter.doFilter, void 0, catchFilter, void 0)
          } return this._then(void 0, fn, void 0, void 0, void 0)
        }, Promise.prototype.reflect = function () { return this._then(reflect, reflect, void 0, this, void 0) }, Promise.prototype.then = function (didFulfill, didReject, didProgress) {
          if (isDebugging() && arguments.length > 0 && "function" != typeof didFulfill && "function" != typeof didReject) {
            var msg = ".then() only accepts functions but was passed: " + util.classString(didFulfill);
            arguments.length > 1 && (msg += ", " + util.classString(didReject)), this._warn(msg)
          } return this._then(didFulfill, didReject, didProgress, void 0, void 0)
        }, Promise.prototype.done = function (didFulfill, didReject, didProgress) {
          var promise = this._then(didFulfill, didReject, didProgress, void 0, void 0);
          promise._setIsFinal()
        }, Promise.prototype.spread = function (didFulfill, didReject) { return this.all()._then(didFulfill, didReject, void 0, APPLY, void 0) }, Promise.prototype.isCancellable = function () { return !this.isResolved() && this._cancellable() }, Promise.prototype.toJSON = function () { var ret = { isFulfilled: !1, isRejected: !1, fulfillmentValue: void 0, rejectionReason: void 0 }; return this.isFulfilled() ? (ret.fulfillmentValue = this.value(), ret.isFulfilled = !0) : this.isRejected() && (ret.rejectionReason = this.reason(), ret.isRejected = !0), ret }, Promise.prototype.all = function () { return new PromiseArray(this).promise() }, Promise.prototype.error = function (fn) { return this.caught(util.originatesFromRejection, fn) }, Promise.getNewLibraryCopy = module.exports, Promise.is = function (val) { return val instanceof Promise }, Promise.fromNode = function (fn) {
          var ret = new Promise(INTERNAL),
          result = tryCatch(fn)(nodebackForPromise(ret)); return result === errorObj && ret._rejectCallback(result.e, !0, !0), ret
        }, Promise.all = function (promises) { return new PromiseArray(promises).promise() }, Promise.defer = Promise.pending = function () { var promise = new Promise(INTERNAL); return new PromiseResolver(promise) }, Promise.cast = function (obj) {
          var ret = tryConvertToPromise(obj); if (!(ret instanceof Promise)) {
            var val = ret;
            ret = new Promise(INTERNAL), ret._fulfillUnchecked(val)
          } return ret
        }, Promise.resolve = Promise.fulfilled = Promise.cast, Promise.reject = Promise.rejected = function (reason) { var ret = new Promise(INTERNAL); return ret._captureStackTrace(), ret._rejectCallback(reason, !0), ret }, Promise.setScheduler = function (fn) { if ("function" != typeof fn) throw new TypeError("fn must be a function\n\n    See http://goo.gl/916lJJ\n"); var prev = async._schedule; return async._schedule = fn, prev }, Promise.prototype._then = function (didFulfill, didReject, didProgress, receiver, internalData) {
          var haveInternalData = void 0 !== internalData,
          ret = haveInternalData ? internalData : new Promise(INTERNAL);
          haveInternalData || (ret._propagateFrom(this, 5), ret._captureStackTrace()); var target = this._target();
          target !== this && (void 0 === receiver && (receiver = this._boundTo), haveInternalData || ret._setIsMigrated()); var callbackIndex = target._addCallbacks(didFulfill, didReject, didProgress, ret, receiver, getDomain()); return target._isResolved() && !target._isSettlePromisesQueued() && async.invoke(target._settlePromiseAtPostResolution, target, callbackIndex), ret
        }, Promise.prototype._settlePromiseAtPostResolution = function (index) { this._isRejectionUnhandled() && this._unsetRejectionIsUnhandled(), this._settlePromiseAt(index) }, Promise.prototype._length = function () { return 131071 & this._bitField }, Promise.prototype._isFollowingOrFulfilledOrRejected = function () { return (939524096 & this._bitField) > 0 }, Promise.prototype._isFollowing = function () { return 536870912 === (536870912 & this._bitField) }, Promise.prototype._setLength = function (len) { this._bitField = this._bitField & -131072 | 131071 & len }, Promise.prototype._setFulfilled = function () { this._bitField = 268435456 | this._bitField }, Promise.prototype._setRejected = function () { this._bitField = 134217728 | this._bitField }, Promise.prototype._setFollowing = function () { this._bitField = 536870912 | this._bitField }, Promise.prototype._setIsFinal = function () { this._bitField = 33554432 | this._bitField }, Promise.prototype._isFinal = function () { return (33554432 & this._bitField) > 0 }, Promise.prototype._cancellable = function () { return (67108864 & this._bitField) > 0 }, Promise.prototype._setCancellable = function () { this._bitField = 67108864 | this._bitField }, Promise.prototype._unsetCancellable = function () { this._bitField = this._bitField & -67108865 }, Promise.prototype._setIsMigrated = function () { this._bitField = 4194304 | this._bitField }, Promise.prototype._unsetIsMigrated = function () { this._bitField = this._bitField & -4194305 }, Promise.prototype._isMigrated = function () { return (4194304 & this._bitField) > 0 }, Promise.prototype._receiverAt = function (index) { var ret = 0 === index ? this._receiver0 : this[5 * index - 5 + 4]; if (ret !== UNDEFINED_BINDING) return void 0 === ret && this._isBound() ? this._boundValue() : ret }, Promise.prototype._promiseAt = function (index) { return 0 === index ? this._promise0 : this[5 * index - 5 + 3] }, Promise.prototype._fulfillmentHandlerAt = function (index) { return 0 === index ? this._fulfillmentHandler0 : this[5 * index - 5 + 0] }, Promise.prototype._rejectionHandlerAt = function (index) { return 0 === index ? this._rejectionHandler0 : this[5 * index - 5 + 1] }, Promise.prototype._boundValue = function () { var ret = this._boundTo; return void 0 !== ret && ret instanceof Promise ? ret.isFulfilled() ? ret.value() : void 0 : ret }, Promise.prototype._migrateCallbacks = function (follower, index) {
          var fulfill = follower._fulfillmentHandlerAt(index),
          reject = follower._rejectionHandlerAt(index),
          progress = follower._progressHandlerAt(index),
          promise = follower._promiseAt(index),
          receiver = follower._receiverAt(index);
          promise instanceof Promise && promise._setIsMigrated(), void 0 === receiver && (receiver = UNDEFINED_BINDING), this._addCallbacks(fulfill, reject, progress, promise, receiver, null)
        }, Promise.prototype._addCallbacks = function (fulfill, reject, progress, promise, receiver, domain) {
          var index = this._length(); if (index >= 131066 && (index = 0, this._setLength(0)), 0 === index) this._promise0 = promise, void 0 !== receiver && (this._receiver0 = receiver), "function" != typeof fulfill || this._isCarryingStackTrace() || (this._fulfillmentHandler0 = null === domain ? fulfill : domain.bind(fulfill)), "function" == typeof reject && (this._rejectionHandler0 = null === domain ? reject : domain.bind(reject)), "function" == typeof progress && (this._progressHandler0 = null === domain ? progress : domain.bind(progress));
          else {
            var base = 5 * index - 5;
            this[base + 3] = promise, this[base + 4] = receiver, "function" == typeof fulfill && (this[base + 0] = null === domain ? fulfill : domain.bind(fulfill)), "function" == typeof reject && (this[base + 1] = null === domain ? reject : domain.bind(reject)), "function" == typeof progress && (this[base + 2] = null === domain ? progress : domain.bind(progress))
          } return this._setLength(index + 1), index
        }, Promise.prototype._setProxyHandlers = function (receiver, promiseSlotValue) {
          var index = this._length(); if (index >= 131066 && (index = 0, this._setLength(0)), 0 === index) this._promise0 = promiseSlotValue, this._receiver0 = receiver;
          else {
            var base = 5 * index - 5;
            this[base + 3] = promiseSlotValue, this[base + 4] = receiver
          } this._setLength(index + 1)
        }, Promise.prototype._proxyPromiseArray = function (promiseArray, index) { this._setProxyHandlers(promiseArray, index) }, Promise.prototype._resolveCallback = function (value, shouldBind) {
          if (!this._isFollowingOrFulfilledOrRejected()) {
            if (value === this) return this._rejectCallback(makeSelfResolutionError(), !1, !0); var maybePromise = tryConvertToPromise(value, this); if (!(maybePromise instanceof Promise)) return this._fulfill(value); var propagationFlags = 1 | (shouldBind ? 4 : 0);
            this._propagateFrom(maybePromise, propagationFlags); var promise = maybePromise._target(); if (promise._isPending()) {
              for (var len = this._length(), i = 0; i < len; ++i) promise._migrateCallbacks(this, i);
              this._setFollowing(), this._setLength(0), this._setFollowee(promise)
            } else promise._isFulfilled() ? this._fulfillUnchecked(promise._value()) : this._rejectUnchecked(promise._reason(), promise._getCarriedStackTrace())
          }
        }, Promise.prototype._rejectCallback = function (reason, synchronous, shouldNotMarkOriginatingFromRejection) {
          shouldNotMarkOriginatingFromRejection || util.markAsOriginatingFromRejection(reason); var trace = util.ensureErrorObject(reason),
            hasStack = trace === reason;
          this._attachExtraTrace(trace, !!synchronous && hasStack), this._reject(reason, hasStack ? void 0 : trace)
        }, Promise.prototype._resolveFromResolver = function (resolver) {
          var promise = this;
          this._captureStackTrace(), this._pushContext(); var synchronous = !0,
            r = tryCatch(resolver)(function (value) { null !== promise && (promise._resolveCallback(value), promise = null) }, function (reason) { null !== promise && (promise._rejectCallback(reason, synchronous), promise = null) });
          synchronous = !1, this._popContext(), void 0 !== r && r === errorObj && null !== promise && (promise._rejectCallback(r.e, !0, !0), promise = null)
        }, Promise.prototype._settlePromiseFromHandler = function (handler, receiver, value, promise) {
          if (!promise._isRejected()) {
            promise._pushContext(); var x; if (x = receiver !== APPLY || this._isRejected() ? tryCatch(handler).call(receiver, value) : tryCatch(handler).apply(this._boundValue(), value), promise._popContext(), x === errorObj || x === promise || x === NEXT_FILTER) {
              var err = x === promise ? makeSelfResolutionError() : x.e;
              promise._rejectCallback(err, !1, !0)
            } else promise._resolveCallback(x)
          }
        }, Promise.prototype._target = function () { for (var ret = this; ret._isFollowing();) ret = ret._followee(); return ret }, Promise.prototype._followee = function () { return this._rejectionHandler0 }, Promise.prototype._setFollowee = function (promise) { this._rejectionHandler0 = promise }, Promise.prototype._cleanValues = function () { this._cancellable() && (this._cancellationParent = void 0) }, Promise.prototype._propagateFrom = function (parent, flags) {
          (1 & flags) > 0 && parent._cancellable() && (this._setCancellable(), this._cancellationParent = parent), (4 & flags) > 0 && parent._isBound() && this._setBoundTo(parent._boundTo)
        }, Promise.prototype._fulfill = function (value) { this._isFollowingOrFulfilledOrRejected() || this._fulfillUnchecked(value) }, Promise.prototype._reject = function (reason, carriedStackTrace) { this._isFollowingOrFulfilledOrRejected() || this._rejectUnchecked(reason, carriedStackTrace) }, Promise.prototype._settlePromiseAt = function (index) {
          var promise = this._promiseAt(index),
          isPromise = promise instanceof Promise; if (isPromise && promise._isMigrated()) return promise._unsetIsMigrated(), async.invoke(this._settlePromiseAt, this, index); var handler = this._isFulfilled() ? this._fulfillmentHandlerAt(index) : this._rejectionHandlerAt(index),
            carriedStackTrace = this._isCarryingStackTrace() ? this._getCarriedStackTrace() : void 0,
            value = this._settledValue,
            receiver = this._receiverAt(index);
          this._clearCallbackDataAtIndex(index), "function" == typeof handler ? isPromise ? this._settlePromiseFromHandler(handler, receiver, value, promise) : handler.call(receiver, value, promise) : receiver instanceof PromiseArray ? receiver._isResolved() || (this._isFulfilled() ? receiver._promiseFulfilled(value, promise) : receiver._promiseRejected(value, promise)) : isPromise && (this._isFulfilled() ? promise._fulfill(value) : promise._reject(value, carriedStackTrace)), index >= 4 && 4 === (31 & index) && async.invokeLater(this._setLength, this, 0)
        }, Promise.prototype._clearCallbackDataAtIndex = function (index) {
          if (0 === index) this._isCarryingStackTrace() || (this._fulfillmentHandler0 = void 0), this._rejectionHandler0 = this._progressHandler0 = this._receiver0 = this._promise0 = void 0;
          else {
            var base = 5 * index - 5;
            this[base + 3] = this[base + 4] = this[base + 0] = this[base + 1] = this[base + 2] = void 0
          }
        }, Promise.prototype._isSettlePromisesQueued = function () { return (this._bitField & -1073741824) === -1073741824 }, Promise.prototype._setSettlePromisesQueued = function () { this._bitField = this._bitField | -1073741824 }, Promise.prototype._unsetSettlePromisesQueued = function () { this._bitField = 1073741823 & this._bitField }, Promise.prototype._queueSettlePromises = function () { async.settlePromises(this), this._setSettlePromisesQueued() }, Promise.prototype._fulfillUnchecked = function (value) { if (value === this) { var err = makeSelfResolutionError(); return this._attachExtraTrace(err), this._rejectUnchecked(err, void 0) } this._setFulfilled(), this._settledValue = value, this._cleanValues(), this._length() > 0 && this._queueSettlePromises() }, Promise.prototype._rejectUncheckedCheckError = function (reason) {
          var trace = util.ensureErrorObject(reason);
          this._rejectUnchecked(reason, trace === reason ? void 0 : trace)
        }, Promise.prototype._rejectUnchecked = function (reason, trace) { if (reason === this) { var err = makeSelfResolutionError(); return this._attachExtraTrace(err), this._rejectUnchecked(err) } return this._setRejected(), this._settledValue = reason, this._cleanValues(), this._isFinal() ? void async.throwLater(function (e) { throw "stack" in e && async.invokeFirst(CapturedTrace.unhandledRejection, void 0, e), e }, void 0 === trace ? reason : trace) : (void 0 !== trace && trace !== reason && this._setCarriedStackTrace(trace), void (this._length() > 0 ? this._queueSettlePromises() : this._ensurePossibleRejectionHandled())) }, Promise.prototype._settlePromises = function () { this._unsetSettlePromisesQueued(); for (var len = this._length(), i = 0; i < len; i++) this._settlePromiseAt(i) }, util.notEnumerableProp(Promise, "_makeSelfResolutionError", makeSelfResolutionError), _dereq_("./progress.js")(Promise, PromiseArray), _dereq_("./method.js")(Promise, INTERNAL, tryConvertToPromise, apiRejection), _dereq_("./bind.js")(Promise, INTERNAL, tryConvertToPromise), _dereq_("./finally.js")(Promise, NEXT_FILTER, tryConvertToPromise), _dereq_("./direct_resolve.js")(Promise), _dereq_("./synchronous_inspection.js")(Promise), _dereq_("./join.js")(Promise, PromiseArray, tryConvertToPromise, INTERNAL), Promise.version = "2.11.0", Promise.Promise = Promise, _dereq_("./map.js")(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL), _dereq_("./cancel.js")(Promise), _dereq_("./using.js")(Promise, apiRejection, tryConvertToPromise, createContext), _dereq_("./generators.js")(Promise, apiRejection, INTERNAL, tryConvertToPromise), _dereq_("./nodeify.js")(Promise), _dereq_("./call_get.js")(Promise), _dereq_("./props.js")(Promise, PromiseArray, tryConvertToPromise, apiRejection), _dereq_("./race.js")(Promise, INTERNAL, tryConvertToPromise, apiRejection), _dereq_("./reduce.js")(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL), _dereq_("./settle.js")(Promise, PromiseArray), _dereq_("./some.js")(Promise, PromiseArray, apiRejection), _dereq_("./promisify.js")(Promise, INTERNAL), _dereq_("./any.js")(Promise), _dereq_("./each.js")(Promise, INTERNAL), _dereq_("./timers.js")(Promise, INTERNAL), _dereq_("./filter.js")(Promise, INTERNAL), util.toFastProperties(Promise), util.toFastProperties(Promise.prototype), fillTypes({ a: 1 }), fillTypes({ b: 2 }), fillTypes({ c: 3 }), fillTypes(1), fillTypes(function () { }), fillTypes(void 0), fillTypes(!1), fillTypes(new Promise(INTERNAL)), CapturedTrace.setBounds(async.firstLineError, util.lastLineError), Promise
    }
  }, { "./any.js": 1, "./async.js": 2, "./bind.js": 3, "./call_get.js": 5, "./cancel.js": 6, "./captured_trace.js": 7, "./catch_filter.js": 8, "./context.js": 9, "./debuggability.js": 10, "./direct_resolve.js": 11, "./each.js": 12, "./errors.js": 13, "./filter.js": 15, "./finally.js": 16, "./generators.js": 17, "./join.js": 18, "./map.js": 19, "./method.js": 20, "./nodeify.js": 21, "./progress.js": 22, "./promise_array.js": 24, "./promise_resolver.js": 25, "./promisify.js": 26, "./props.js": 27, "./race.js": 29, "./reduce.js": 30, "./settle.js": 32, "./some.js": 33, "./synchronous_inspection.js": 34, "./thenables.js": 35, "./timers.js": 36, "./using.js": 37, "./util.js": 38 }],
  24: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, INTERNAL, tryConvertToPromise, apiRejection) {
      function toResolutionValue(val) {
        switch (val) {
          case -2:
            return [];
          case -3:
            return {}
        }
      }

      function PromiseArray(values) {
        var parent, promise = this._promise = new Promise(INTERNAL);
        values instanceof Promise && (parent = values, promise._propagateFrom(parent, 5)), this._values = values, this._length = 0, this._totalResolved = 0, this._init(void 0, -2)
      } var util = _dereq_("./util.js"),
        isArray = util.isArray; return PromiseArray.prototype.length = function () { return this._length }, PromiseArray.prototype.promise = function () { return this._promise }, PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
          var values = tryConvertToPromise(this._values, this._promise); if (values instanceof Promise) { if (values = values._target(), this._values = values, !values._isFulfilled()) return values._isPending() ? void values._then(init, this._reject, void 0, this, resolveValueIfEmpty) : void this._reject(values._reason()); if (values = values._value(), !isArray(values)) { var err = new Promise.TypeError("expecting an array, a promise or a thenable\n\n    See http://goo.gl/s8MMhc\n"); return void this.__hardReject__(err) } } else if (!isArray(values)) return void this._promise._reject(apiRejection("expecting an array, a promise or a thenable\n\n    See http://goo.gl/s8MMhc\n")._reason()); if (0 === values.length) return void (resolveValueIfEmpty === -5 ? this._resolveEmptyArray() : this._resolve(toResolutionValue(resolveValueIfEmpty))); var len = this.getActualLength(values.length);
          this._length = len, this._values = this.shouldCopyValues() ? new Array(len) : this._values; for (var promise = this._promise, i = 0; i < len; ++i) {
            var isResolved = this._isResolved(),
            maybePromise = tryConvertToPromise(values[i], promise);
            maybePromise instanceof Promise ? (maybePromise = maybePromise._target(), isResolved ? maybePromise._ignoreRejections() : maybePromise._isPending() ? maybePromise._proxyPromiseArray(this, i) : maybePromise._isFulfilled() ? this._promiseFulfilled(maybePromise._value(), i) : this._promiseRejected(maybePromise._reason(), i)) : isResolved || this._promiseFulfilled(maybePromise, i)
          }
        }, PromiseArray.prototype._isResolved = function () { return null === this._values }, PromiseArray.prototype._resolve = function (value) { this._values = null, this._promise._fulfill(value) }, PromiseArray.prototype.__hardReject__ = PromiseArray.prototype._reject = function (reason) { this._values = null, this._promise._rejectCallback(reason, !1, !0) }, PromiseArray.prototype._promiseProgressed = function (progressValue, index) { this._promise._progress({ index: index, value: progressValue }) }, PromiseArray.prototype._promiseFulfilled = function (value, index) {
        this._values[index] = value; var totalResolved = ++this._totalResolved;
          totalResolved >= this._length && this._resolve(this._values)
        }, PromiseArray.prototype._promiseRejected = function (reason, index) { this._totalResolved++ , this._reject(reason) }, PromiseArray.prototype.shouldCopyValues = function () { return !0 }, PromiseArray.prototype.getActualLength = function (len) { return len }, PromiseArray
    }
  }, { "./util.js": 38 }],
  25: [function (_dereq_, module, exports) {
    "use strict";

    function isUntypedError(obj) { return obj instanceof Error && es5.getPrototypeOf(obj) === Error.prototype }

    function wrapAsOperationalError(obj) {
      var ret; if (isUntypedError(obj)) {
      ret = new OperationalError(obj), ret.name = obj.name, ret.message = obj.message, ret.stack = obj.stack; for (var keys = es5.keys(obj), i = 0; i < keys.length; ++i) {
        var key = keys[i];
        rErrorKey.test(key) || (ret[key] = obj[key])
      } return ret
      } return util.markAsOriginatingFromRejection(obj), obj
    }

    function nodebackForPromise(promise) {
      return function (err, value) {
        if (null !== promise) {
          if (err) {
            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
            promise._attachExtraTrace(wrapped), promise._reject(wrapped)
          } else if (arguments.length > 2) {
            for (var $_len = arguments.length, args = new Array($_len - 1), $_i = 1; $_i < $_len; ++$_i) args[$_i - 1] = arguments[$_i];
            promise._fulfill(args)
          } else promise._fulfill(value);
          promise = null
        }
      }
    }
    var PromiseResolver, util = _dereq_("./util.js"),
      maybeWrapAsError = util.maybeWrapAsError,
      errors = _dereq_("./errors.js"),
      TimeoutError = errors.TimeoutError,
      OperationalError = errors.OperationalError,
      haveGetters = util.haveGetters,
      es5 = _dereq_("./es5.js"),
      rErrorKey = /^(?:name|message|stack|cause)$/;
    if (PromiseResolver = haveGetters ? function (promise) { this.promise = promise } : function (promise) { this.promise = promise, this.asCallback = nodebackForPromise(promise), this.callback = this.asCallback }, haveGetters) {
      var prop = { get: function () { return nodebackForPromise(this.promise) } };
      es5.defineProperty(PromiseResolver.prototype, "asCallback", prop), es5.defineProperty(PromiseResolver.prototype, "callback", prop)
    } PromiseResolver._nodebackForPromise = nodebackForPromise, PromiseResolver.prototype.toString = function () { return "[object PromiseResolver]" }, PromiseResolver.prototype.resolve = PromiseResolver.prototype.fulfill = function (value) {
      if (!(this instanceof PromiseResolver)) throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\n\n    See http://goo.gl/sdkXL9\n");
      this.promise._resolveCallback(value)
    }, PromiseResolver.prototype.reject = function (reason) {
      if (!(this instanceof PromiseResolver)) throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\n\n    See http://goo.gl/sdkXL9\n");
      this.promise._rejectCallback(reason)
    }, PromiseResolver.prototype.progress = function (value) {
      if (!(this instanceof PromiseResolver)) throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.\n\n    See http://goo.gl/sdkXL9\n");
      this.promise._progress(value)
    }, PromiseResolver.prototype.cancel = function (err) { this.promise.cancel(err) }, PromiseResolver.prototype.timeout = function () { this.reject(new TimeoutError("timeout")) }, PromiseResolver.prototype.isResolved = function () {
      return this.promise.isResolved()
    }, PromiseResolver.prototype.toJSON = function () { return this.promise.toJSON() }, module.exports = PromiseResolver
  }, { "./errors.js": 13, "./es5.js": 14, "./util.js": 38 }],
  26: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, INTERNAL) {
      function propsFilter(key) { return !noCopyPropsPattern.test(key) }

      function isPromisified(fn) { try { return fn.__isPromisified__ === !0 } catch (e) { return !1 } }

      function hasPromisified(obj, key, suffix) { var val = util.getDataPropertyOrDefault(obj, key + suffix, defaultPromisified); return !!val && isPromisified(val) }

      function checkValid(ret, suffix, suffixRegexp) {
        for (var i = 0; i < ret.length; i += 2) {
          var key = ret[i]; if (suffixRegexp.test(key))
            for (var keyWithoutAsyncSuffix = key.replace(suffixRegexp, ""), j = 0; j < ret.length; j += 2)
              if (ret[j] === keyWithoutAsyncSuffix) throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/iWrZbw\n".replace("%s", suffix))
        }
      }

      function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
        for (var keys = util.inheritedDataKeys(obj), ret = [], i = 0; i < keys.length; ++i) {
          var key = keys[i],
          value = obj[key],
          passesDefaultFilter = filter === defaultFilter || defaultFilter(key, value, obj); "function" != typeof value || isPromisified(value) || hasPromisified(obj, key, suffix) || !filter(key, value, obj, passesDefaultFilter) || ret.push(key, value)
        } return checkValid(ret, suffix, suffixRegexp), ret
      }

      function makeNodePromisifiedClosure(callback, receiver, _, fn) {
        function promisified() {
          var _receiver = receiver;
          receiver === THIS && (_receiver = this); var promise = new Promise(INTERNAL);
          promise._captureStackTrace(); var cb = "string" == typeof method && this !== defaultThis ? this[method] : callback,
            fn = nodebackForPromise(promise); try { cb.apply(_receiver, withAppended(arguments, fn)) } catch (e) { promise._rejectCallback(maybeWrapAsError(e), !0, !0) } return promise
        } var defaultThis = function () { return this }(),
          method = callback; return "string" == typeof method && (callback = fn), util.notEnumerableProp(promisified, "__isPromisified__", !0), promisified
      }

      function promisifyAll(obj, suffix, filter, promisifier) {
        for (var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$"), methods = promisifiableMethods(obj, suffix, suffixRegexp, filter), i = 0, len = methods.length; i < len; i += 2) {
          var key = methods[i],
          fn = methods[i + 1],
          promisifiedKey = key + suffix; if (promisifier === makeNodePromisified) obj[promisifiedKey] = makeNodePromisified(key, THIS, key, fn, suffix);
          else {
            var promisified = promisifier(fn, function () { return makeNodePromisified(key, THIS, key, fn, suffix) });
            util.notEnumerableProp(promisified, "__isPromisified__", !0), obj[promisifiedKey] = promisified
          }
        } return util.toFastProperties(obj), obj
      }

      function promisify(callback, receiver) { return makeNodePromisified(callback, receiver, void 0, callback) } var makeNodePromisifiedEval, THIS = {},
        util = _dereq_("./util.js"),
        nodebackForPromise = _dereq_("./promise_resolver.js")._nodebackForPromise,
        withAppended = util.withAppended,
        maybeWrapAsError = util.maybeWrapAsError,
        canEvaluate = util.canEvaluate,
        TypeError = _dereq_("./errors").TypeError,
        defaultSuffix = "Async",
        defaultPromisified = { __isPromisified__: !0 },
        noCopyProps = ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"],
        noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$"),
        defaultFilter = function (name) { return util.isIdentifier(name) && "_" !== name.charAt(0) && "constructor" !== name },
        escapeIdentRegex = function (str) { return str.replace(/([$])/, "\\$") },
        makeNodePromisified = canEvaluate ? makeNodePromisifiedEval : makeNodePromisifiedClosure;
      Promise.promisify = function (fn, receiver) { if ("function" != typeof fn) throw new TypeError("fn must be a function\n\n    See http://goo.gl/916lJJ\n"); if (isPromisified(fn)) return fn; var ret = promisify(fn, arguments.length < 2 ? THIS : receiver); return util.copyDescriptors(fn, ret, propsFilter), ret }, Promise.promisifyAll = function (target, options) {
        if ("function" != typeof target && "object" != typeof target) throw new TypeError("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/9ITlV0\n");
        options = Object(options); var suffix = options.suffix; "string" != typeof suffix && (suffix = defaultSuffix); var filter = options.filter; "function" != typeof filter && (filter = defaultFilter); var promisifier = options.promisifier; if ("function" != typeof promisifier && (promisifier = makeNodePromisified), !util.isIdentifier(suffix)) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/8FZo5V\n"); for (var keys = util.inheritedDataKeys(target), i = 0; i < keys.length; ++i) { var value = target[keys[i]]; "constructor" !== keys[i] && util.isClass(value) && (promisifyAll(value.prototype, suffix, filter, promisifier), promisifyAll(value, suffix, filter, promisifier)) } return promisifyAll(target, suffix, filter, promisifier)
      }
    }
  }, { "./errors": 13, "./promise_resolver.js": 25, "./util.js": 38 }],
  27: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, PromiseArray, tryConvertToPromise, apiRejection) {
      function PropertiesPromiseArray(obj) {
        for (var keys = es5.keys(obj), len = keys.length, values = new Array(2 * len), i = 0; i < len; ++i) {
          var key = keys[i];
          values[i] = obj[key], values[i + len] = key
        } this.constructor$(values)
      }

      function props(promises) { var ret, castValue = tryConvertToPromise(promises); return isObject(castValue) ? (ret = castValue instanceof Promise ? castValue._then(Promise.props, void 0, void 0, void 0, void 0) : new PropertiesPromiseArray(castValue).promise(), castValue instanceof Promise && ret._propagateFrom(castValue, 4), ret) : apiRejection("cannot await properties of a non-object\n\n    See http://goo.gl/OsFKC8\n") } var util = _dereq_("./util.js"),
        isObject = util.isObject,
        es5 = _dereq_("./es5.js");
      util.inherits(PropertiesPromiseArray, PromiseArray), PropertiesPromiseArray.prototype._init = function () { this._init$(void 0, -3) }, PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
      this._values[index] = value; var totalResolved = ++this._totalResolved; if (totalResolved >= this._length) {
        for (var val = {}, keyOffset = this.length(), i = 0, len = this.length(); i < len; ++i) val[this._values[i + keyOffset]] = this._values[i];
        this._resolve(val)
      }
      }, PropertiesPromiseArray.prototype._promiseProgressed = function (value, index) { this._promise._progress({ key: this._values[index + this.length()], value: value }) }, PropertiesPromiseArray.prototype.shouldCopyValues = function () { return !1 }, PropertiesPromiseArray.prototype.getActualLength = function (len) { return len >> 1 }, Promise.prototype.props = function () { return props(this) }, Promise.props = function (promises) { return props(promises) }
    }
  }, { "./es5.js": 14, "./util.js": 38 }],
  28: [function (_dereq_, module, exports) {
    "use strict";

    function arrayMove(src, srcIndex, dst, dstIndex, len) { for (var j = 0; j < len; ++j) dst[j + dstIndex] = src[j + srcIndex], src[j + srcIndex] = void 0 }

    function Queue(capacity) { this._capacity = capacity, this._length = 0, this._front = 0 } Queue.prototype._willBeOverCapacity = function (size) { return this._capacity < size }, Queue.prototype._pushOne = function (arg) {
      var length = this.length();
      this._checkCapacity(length + 1); var i = this._front + length & this._capacity - 1;
      this[i] = arg, this._length = length + 1
    }, Queue.prototype._unshiftOne = function (value) {
      var capacity = this._capacity;
      this._checkCapacity(this.length() + 1); var front = this._front,
        i = (front - 1 & capacity - 1 ^ capacity) - capacity;
      this[i] = value, this._front = i, this._length = this.length() + 1
    }, Queue.prototype.unshift = function (fn, receiver, arg) { this._unshiftOne(arg), this._unshiftOne(receiver), this._unshiftOne(fn) }, Queue.prototype.push = function (fn, receiver, arg) {
      var length = this.length() + 3; if (this._willBeOverCapacity(length)) return this._pushOne(fn), this._pushOne(receiver), void this._pushOne(arg); var j = this._front + length - 3;
      this._checkCapacity(length); var wrapMask = this._capacity - 1;
      this[j + 0 & wrapMask] = fn, this[j + 1 & wrapMask] = receiver, this[j + 2 & wrapMask] = arg, this._length = length
    }, Queue.prototype.shift = function () {
      var front = this._front,
      ret = this[front]; return this[front] = void 0, this._front = front + 1 & this._capacity - 1, this._length-- , ret
    }, Queue.prototype.length = function () { return this._length }, Queue.prototype._checkCapacity = function (size) { this._capacity < size && this._resizeTo(this._capacity << 1) }, Queue.prototype._resizeTo = function (capacity) {
      var oldCapacity = this._capacity;
      this._capacity = capacity; var front = this._front,
        length = this._length,
        moveItemsCount = front + length & oldCapacity - 1;
      arrayMove(this, 0, this, oldCapacity, moveItemsCount)
    }, module.exports = Queue
  }, {}],
  29: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, INTERNAL, tryConvertToPromise, apiRejection) {
      function race(promises, parent) {
        var maybePromise = tryConvertToPromise(promises); if (maybePromise instanceof Promise) return raceLater(maybePromise); if (!isArray(promises)) return apiRejection("expecting an array, a promise or a thenable\n\n    See http://goo.gl/s8MMhc\n"); var ret = new Promise(INTERNAL);
        void 0 !== parent && ret._propagateFrom(parent, 5); for (var fulfill = ret._fulfill, reject = ret._reject, i = 0, len = promises.length; i < len; ++i) {
          var val = promises[i];
          (void 0 !== val || i in promises) && Promise.cast(val)._then(fulfill, reject, void 0, ret, null)
        } return ret
      } var isArray = _dereq_("./util.js").isArray,
        raceLater = function (promise) { return promise.then(function (array) { return race(array, promise) }) };
      Promise.race = function (promises) { return race(promises, void 0) }, Promise.prototype.race = function () { return race(this, void 0) }
    }
  }, { "./util.js": 38 }],
  30: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL) {
      function ReductionPromiseArray(promises, fn, accum, _each) {
        this.constructor$(promises), this._promise._captureStackTrace(), this._preservedValues = _each === INTERNAL ? [] : null, this._zerothIsAccum = void 0 === accum, this._gotAccum = !1, this._reducingIndex = this._zerothIsAccum ? 1 : 0, this._valuesPhase = void 0; var maybePromise = tryConvertToPromise(accum, this._promise),
          rejected = !1,
          isPromise = maybePromise instanceof Promise;
        isPromise && (maybePromise = maybePromise._target(), maybePromise._isPending() ? maybePromise._proxyPromiseArray(this, -1) : maybePromise._isFulfilled() ? (accum = maybePromise._value(), this._gotAccum = !0) : (this._reject(maybePromise._reason()), rejected = !0)), isPromise || this._zerothIsAccum || (this._gotAccum = !0); var domain = getDomain();
        this._callback = null === domain ? fn : domain.bind(fn), this._accum = accum, rejected || async.invoke(init, this, void 0)
      }

      function init() { this._init$(void 0, -5) }

      function reduce(promises, fn, initialValue, _each) { if ("function" != typeof fn) return apiRejection("fn must be a function\n\n    See http://goo.gl/916lJJ\n"); var array = new ReductionPromiseArray(promises, fn, initialValue, _each); return array.promise() } var getDomain = Promise._getDomain,
        async = _dereq_("./async.js"),
        util = _dereq_("./util.js"),
        tryCatch = util.tryCatch,
        errorObj = util.errorObj;
      util.inherits(ReductionPromiseArray, PromiseArray), ReductionPromiseArray.prototype._init = function () { }, ReductionPromiseArray.prototype._resolveEmptyArray = function () {
        (this._gotAccum || this._zerothIsAccum) && this._resolve(null !== this._preservedValues ? [] : this._accum)
      }, ReductionPromiseArray.prototype._promiseFulfilled = function (value, index) {
        var values = this._values;
        values[index] = value; var valuesPhaseIndex, length = this.length(),
          preservedValues = this._preservedValues,
          isEach = null !== preservedValues,
          gotAccum = this._gotAccum,
          valuesPhase = this._valuesPhase; if (!valuesPhase)
          for (valuesPhase = this._valuesPhase = new Array(length), valuesPhaseIndex = 0; valuesPhaseIndex < length; ++valuesPhaseIndex) valuesPhase[valuesPhaseIndex] = 0; if (valuesPhaseIndex = valuesPhase[index], 0 === index && this._zerothIsAccum ? (this._accum = value, this._gotAccum = gotAccum = !0, valuesPhase[index] = 0 === valuesPhaseIndex ? 1 : 2) : index === -1 ? (this._accum = value, this._gotAccum = gotAccum = !0) : 0 === valuesPhaseIndex ? valuesPhase[index] = 1 : (valuesPhase[index] = 2, this._accum = value), gotAccum) {
            for (var ret, callback = this._callback, receiver = this._promise._boundValue(), i = this._reducingIndex; i < length; ++i)
              if (valuesPhaseIndex = valuesPhase[i], 2 !== valuesPhaseIndex) {
                if (1 !== valuesPhaseIndex) return; if (value = values[i], this._promise._pushContext(), isEach ? (preservedValues.push(value), ret = tryCatch(callback).call(receiver, value, i, length)) : ret = tryCatch(callback).call(receiver, this._accum, value, i, length), this._promise._popContext(), ret === errorObj) return this._reject(ret.e); var maybePromise = tryConvertToPromise(ret, this._promise); if (maybePromise instanceof Promise) {
                  if (maybePromise = maybePromise._target(), maybePromise._isPending()) return valuesPhase[i] = 4, maybePromise._proxyPromiseArray(this, i); if (!maybePromise._isFulfilled()) return this._reject(maybePromise._reason());
                  ret = maybePromise._value()
                } this._reducingIndex = i + 1, this._accum = ret
              } else this._reducingIndex = i + 1;
            this._resolve(isEach ? preservedValues : this._accum)
          }
      }, Promise.prototype.reduce = function (fn, initialValue) { return reduce(this, fn, initialValue, null) }, Promise.reduce = function (promises, fn, initialValue, _each) { return reduce(promises, fn, initialValue, _each) }
    }
  }, { "./async.js": 2, "./util.js": 38 }],
  31: [function (_dereq_, module, exports) {
    "use strict"; var schedule, util = _dereq_("./util"),
      noAsyncScheduler = function () { throw new Error("No async scheduler available\n\n    See http://goo.gl/m3OTXk\n") }; if (util.isNode && "undefined" == typeof MutationObserver) {
        var GlobalSetImmediate = global.setImmediate,
        ProcessNextTick = process.nextTick;
        schedule = util.isRecentNode ? function (fn) { GlobalSetImmediate.call(global, fn) } : function (fn) { ProcessNextTick.call(process, fn) }
      } else "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && window.navigator.standalone ? schedule = "undefined" != typeof setImmediate ? function (fn) { setImmediate(fn) } : "undefined" != typeof setTimeout ? function (fn) { setTimeout(fn, 0) } : noAsyncScheduler : (schedule = function (fn) {
        var div = document.createElement("div"),
        observer = new MutationObserver(fn); return observer.observe(div, { attributes: !0 }),
          function () { div.classList.toggle("foo") }
      }, schedule.isStatic = !0);
    module.exports = schedule
  }, { "./util": 38 }],
  32: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, PromiseArray) {
      function SettledPromiseArray(values) { this.constructor$(values) } var PromiseInspection = Promise.PromiseInspection,
        util = _dereq_("./util.js");
      util.inherits(SettledPromiseArray, PromiseArray), SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
      this._values[index] = inspection; var totalResolved = ++this._totalResolved;
        totalResolved >= this._length && this._resolve(this._values)
      }, SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
        var ret = new PromiseInspection;
        ret._bitField = 268435456, ret._settledValue = value, this._promiseResolved(index, ret)
      }, SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
        var ret = new PromiseInspection;
        ret._bitField = 134217728, ret._settledValue = reason, this._promiseResolved(index, ret)
      }, Promise.settle = function (promises) { return new SettledPromiseArray(promises).promise() }, Promise.prototype.settle = function () { return new SettledPromiseArray(this).promise() }
    }
  }, { "./util.js": 38 }],
  33: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, PromiseArray, apiRejection) {
      function SomePromiseArray(values) { this.constructor$(values), this._howMany = 0, this._unwrap = !1, this._initialized = !1 }

      function some(promises, howMany) {
        if ((0 | howMany) !== howMany || howMany < 0) return apiRejection("expecting a positive integer\n\n    See http://goo.gl/1wAmHx\n"); var ret = new SomePromiseArray(promises),
          promise = ret.promise(); return ret.setHowMany(howMany), ret.init(), promise
      } var util = _dereq_("./util.js"),
        RangeError = _dereq_("./errors.js").RangeError,
        AggregateError = _dereq_("./errors.js").AggregateError,
        isArray = util.isArray;
      util.inherits(SomePromiseArray, PromiseArray), SomePromiseArray.prototype._init = function () {
        if (this._initialized) {
          if (0 === this._howMany) return void this._resolve([]);
          this._init$(void 0, -5); var isArrayResolved = isArray(this._values); !this._isResolved() && isArrayResolved && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()))
        }
      }, SomePromiseArray.prototype.init = function () { this._initialized = !0, this._init() }, SomePromiseArray.prototype.setUnwrap = function () { this._unwrap = !0 }, SomePromiseArray.prototype.howMany = function () { return this._howMany }, SomePromiseArray.prototype.setHowMany = function (count) { this._howMany = count }, SomePromiseArray.prototype._promiseFulfilled = function (value) { this._addFulfilled(value), this._fulfilled() === this.howMany() && (this._values.length = this.howMany(), 1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values)) }, SomePromiseArray.prototype._promiseRejected = function (reason) {
        if (this._addRejected(reason), this.howMany() > this._canPossiblyFulfill()) {
          for (var e = new AggregateError, i = this.length(); i < this._values.length; ++i) e.push(this._values[i]);
          this._reject(e)
        }
      }, SomePromiseArray.prototype._fulfilled = function () { return this._totalResolved }, SomePromiseArray.prototype._rejected = function () { return this._values.length - this.length() }, SomePromiseArray.prototype._addRejected = function (reason) { this._values.push(reason) }, SomePromiseArray.prototype._addFulfilled = function (value) { this._values[this._totalResolved++] = value }, SomePromiseArray.prototype._canPossiblyFulfill = function () { return this.length() - this._rejected() }, SomePromiseArray.prototype._getRangeError = function (count) { var message = "Input array must contain at least " + this._howMany + " items but contains only " + count + " items"; return new RangeError(message) }, SomePromiseArray.prototype._resolveEmptyArray = function () { this._reject(this._getRangeError(0)) }, Promise.some = function (promises, howMany) { return some(promises, howMany) }, Promise.prototype.some = function (howMany) { return some(this, howMany) }, Promise._SomePromiseArray = SomePromiseArray
    }
  }, { "./errors.js": 13, "./util.js": 38 }],
  34: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise) {
      function PromiseInspection(promise) { void 0 !== promise ? (promise = promise._target(), this._bitField = promise._bitField, this._settledValue = promise._settledValue) : (this._bitField = 0, this._settledValue = void 0) } PromiseInspection.prototype.value = function () { if (!this.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/hc1DLj\n"); return this._settledValue }, PromiseInspection.prototype.error = PromiseInspection.prototype.reason = function () { if (!this.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/hPuiwB\n"); return this._settledValue }, PromiseInspection.prototype.isFulfilled = Promise.prototype._isFulfilled = function () { return (268435456 & this._bitField) > 0 }, PromiseInspection.prototype.isRejected = Promise.prototype._isRejected = function () { return (134217728 & this._bitField) > 0 }, PromiseInspection.prototype.isPending = Promise.prototype._isPending = function () { return 0 === (402653184 & this._bitField) }, PromiseInspection.prototype.isResolved = Promise.prototype._isResolved = function () { return (402653184 & this._bitField) > 0 }, Promise.prototype.isPending = function () { return this._target()._isPending() }, Promise.prototype.isRejected = function () { return this._target()._isRejected() }, Promise.prototype.isFulfilled = function () { return this._target()._isFulfilled() }, Promise.prototype.isResolved = function () { return this._target()._isResolved() }, Promise.prototype._value = function () { return this._settledValue }, Promise.prototype._reason = function () { return this._unsetRejectionIsUnhandled(), this._settledValue }, Promise.prototype.value = function () { var target = this._target(); if (!target.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/hc1DLj\n"); return target._settledValue }, Promise.prototype.reason = function () { var target = this._target(); if (!target.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/hPuiwB\n"); return target._unsetRejectionIsUnhandled(), target._settledValue }, Promise.PromiseInspection = PromiseInspection
    }
  }, {}],
  35: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, INTERNAL) {
      function tryConvertToPromise(obj, context) { if (isObject(obj)) { if (obj instanceof Promise) return obj; if (isAnyBluebirdPromise(obj)) { var ret = new Promise(INTERNAL); return obj._then(ret._fulfillUnchecked, ret._rejectUncheckedCheckError, ret._progressUnchecked, ret, null), ret } var then = util.tryCatch(getThen)(obj); if (then === errorObj) { context && context._pushContext(); var ret = Promise.reject(then.e); return context && context._popContext(), ret } if ("function" == typeof then) return doThenable(obj, then, context) } return obj }

      function getThen(obj) { return obj.then }

      function isAnyBluebirdPromise(obj) { return hasProp.call(obj, "_promise0") }

      function doThenable(x, then, context) {
        function resolveFromThenable(value) { promise && (promise._resolveCallback(value), promise = null) }

        function rejectFromThenable(reason) { promise && (promise._rejectCallback(reason, synchronous, !0), promise = null) }

        function progressFromThenable(value) { promise && "function" == typeof promise._progress && promise._progress(value) } var promise = new Promise(INTERNAL),
          ret = promise;
        context && context._pushContext(), promise._captureStackTrace(), context && context._popContext(); var synchronous = !0,
          result = util.tryCatch(then).call(x, resolveFromThenable, rejectFromThenable, progressFromThenable); return synchronous = !1, promise && result === errorObj && (promise._rejectCallback(result.e, !0, !0), promise = null), ret
      } var util = _dereq_("./util.js"),
        errorObj = util.errorObj,
        isObject = util.isObject,
        hasProp = {}.hasOwnProperty; return tryConvertToPromise
    }
  }, { "./util.js": 38 }],
  36: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, INTERNAL) {
      function successClear(value) { var handle = this; return handle instanceof Number && (handle = +handle), clearTimeout(handle), value }

      function failureClear(reason) { var handle = this; throw handle instanceof Number && (handle = +handle), clearTimeout(handle), reason } var util = _dereq_("./util.js"),
        TimeoutError = Promise.TimeoutError,
        afterTimeout = function (promise, message) { if (promise.isPending()) { var err; !util.isPrimitive(message) && message instanceof Error ? err = message : ("string" != typeof message && (message = "operation timed out"), err = new TimeoutError(message)), util.markAsOriginatingFromRejection(err), promise._attachExtraTrace(err), promise._cancel(err) } },
        afterValue = function (value) { return delay(+this).thenReturn(value) },
        delay = Promise.delay = function (value, ms) { if (void 0 === ms) { ms = value, value = void 0; var ret = new Promise(INTERNAL); return setTimeout(function () { ret._fulfill() }, ms), ret } return ms = +ms, Promise.resolve(value)._then(afterValue, null, null, ms, void 0) };
      Promise.prototype.delay = function (ms) { return delay(this, ms) }, Promise.prototype.timeout = function (ms, message) {
        ms = +ms; var ret = this.then().cancellable();
        ret._cancellationParent = this; var handle = setTimeout(function () { afterTimeout(ret, message) }, ms); return ret._then(successClear, failureClear, void 0, handle, void 0)
      }
    }
  }, { "./util.js": 38 }],
  37: [function (_dereq_, module, exports) {
    "use strict";
    module.exports = function (Promise, apiRejection, tryConvertToPromise, createContext) {
      function inspectionMapper(inspections) {
        for (var len = inspections.length, i = 0; i < len; ++i) {
          var inspection = inspections[i]; if (inspection.isRejected()) return Promise.reject(inspection.error());
          inspections[i] = inspection._settledValue
        } return inspections
      }

      function thrower(e) { setTimeout(function () { throw e }, 0) }

      function castPreservingDisposable(thenable) { var maybePromise = tryConvertToPromise(thenable); return maybePromise !== thenable && "function" == typeof thenable._isDisposable && "function" == typeof thenable._getDisposer && thenable._isDisposable() && maybePromise._setDisposable(thenable._getDisposer()), maybePromise }

      function dispose(resources, inspection) {
        function iterator() { if (i >= len) return ret.resolve(); var maybePromise = castPreservingDisposable(resources[i++]); if (maybePromise instanceof Promise && maybePromise._isDisposable()) { try { maybePromise = tryConvertToPromise(maybePromise._getDisposer().tryDispose(inspection), resources.promise) } catch (e) { return thrower(e) } if (maybePromise instanceof Promise) return maybePromise._then(iterator, thrower, null, null, null) } iterator() } var i = 0,
          len = resources.length,
          ret = Promise.defer(); return iterator(), ret.promise
      }

      function disposerSuccess(value) { var inspection = new PromiseInspection; return inspection._settledValue = value, inspection._bitField = 268435456, dispose(this, inspection).thenReturn(value) }

      function disposerFail(reason) { var inspection = new PromiseInspection; return inspection._settledValue = reason, inspection._bitField = 134217728, dispose(this, inspection).thenThrow(reason) }

      function Disposer(data, promise, context) { this._data = data, this._promise = promise, this._context = context }

      function FunctionDisposer(fn, promise, context) { this.constructor$(fn, promise, context) }

      function maybeUnwrapDisposer(value) { return Disposer.isDisposer(value) ? (this.resources[this.index]._setDisposable(value), value.promise()) : value } var TypeError = _dereq_("./errors.js").TypeError,
        inherits = _dereq_("./util.js").inherits,
        PromiseInspection = Promise.PromiseInspection;
      Disposer.prototype.data = function () { return this._data }, Disposer.prototype.promise = function () { return this._promise }, Disposer.prototype.resource = function () { return this.promise().isFulfilled() ? this.promise().value() : null }, Disposer.prototype.tryDispose = function (inspection) {
        var resource = this.resource(),
        context = this._context;
        void 0 !== context && context._pushContext(); var ret = null !== resource ? this.doDispose(resource, inspection) : null; return void 0 !== context && context._popContext(), this._promise._unsetDisposable(), this._data = null, ret
      }, Disposer.isDisposer = function (d) { return null != d && "function" == typeof d.resource && "function" == typeof d.tryDispose }, inherits(FunctionDisposer, Disposer), FunctionDisposer.prototype.doDispose = function (resource, inspection) { var fn = this.data(); return fn.call(resource, resource, inspection) }, Promise.using = function () {
        var len = arguments.length; if (len < 2) return apiRejection("you must pass at least 2 arguments to Promise.using"); var fn = arguments[len - 1]; if ("function" != typeof fn) return apiRejection("fn must be a function\n\n    See http://goo.gl/916lJJ\n"); var input, spreadArgs = !0;
        2 === len && Array.isArray(arguments[0]) ? (input = arguments[0], len = input.length, spreadArgs = !1) : (input = arguments, len--); for (var resources = new Array(len), i = 0; i < len; ++i) {
          var resource = input[i]; if (Disposer.isDisposer(resource)) {
            var disposer = resource;
            resource = resource.promise(), resource._setDisposable(disposer)
          } else {
            var maybePromise = tryConvertToPromise(resource);
            maybePromise instanceof Promise && (resource = maybePromise._then(maybeUnwrapDisposer, null, null, { resources: resources, index: i }, void 0))
          } resources[i] = resource
        } var promise = Promise.settle(resources).then(inspectionMapper).then(function (vals) { promise._pushContext(); var ret; try { ret = spreadArgs ? fn.apply(void 0, vals) : fn.call(void 0, vals) } finally { promise._popContext() } return ret })._then(disposerSuccess, disposerFail, void 0, resources, void 0); return resources.promise = promise, promise
      }, Promise.prototype._setDisposable = function (disposer) { this._bitField = 262144 | this._bitField, this._disposer = disposer }, Promise.prototype._isDisposable = function () { return (262144 & this._bitField) > 0 }, Promise.prototype._getDisposer = function () { return this._disposer }, Promise.prototype._unsetDisposable = function () { this._bitField = this._bitField & -262145, this._disposer = void 0 }, Promise.prototype.disposer = function (fn) { if ("function" == typeof fn) return new FunctionDisposer(fn, this, createContext()); throw new TypeError }
    }
  }, { "./errors.js": 13, "./util.js": 38 }],
  38: [function (_dereq_, module, exports) {
    "use strict";

    function tryCatcher() { try { var target = tryCatchTarget; return tryCatchTarget = null, target.apply(this, arguments) } catch (e) { return errorObj.e = e, errorObj } }

    function tryCatch(fn) { return tryCatchTarget = fn, tryCatcher }

    function isPrimitive(val) { return null == val || val === !0 || val === !1 || "string" == typeof val || "number" == typeof val }

    function isObject(value) { return !isPrimitive(value) }

    function maybeWrapAsError(maybeError) { return isPrimitive(maybeError) ? new Error(safeToString(maybeError)) : maybeError }

    function withAppended(target, appendee) {
      var i, len = target.length,
      ret = new Array(len + 1); for (i = 0; i < len; ++i) ret[i] = target[i]; return ret[i] = appendee, ret
    }

    function getDataPropertyOrDefault(obj, key, defaultValue) { if (!es5.isES5) return {}.hasOwnProperty.call(obj, key) ? obj[key] : void 0; var desc = Object.getOwnPropertyDescriptor(obj, key); return null != desc ? null == desc.get && null == desc.set ? desc.value : defaultValue : void 0 }

    function notEnumerableProp(obj, name, value) { if (isPrimitive(obj)) return obj; var descriptor = { value: value, configurable: !0, enumerable: !1, writable: !0 }; return es5.defineProperty(obj, name, descriptor), obj }

    function thrower(r) { throw r }

    function isClass(fn) {
      try {
        if ("function" == typeof fn) {
          var keys = es5.names(fn.prototype),
          hasMethods = es5.isES5 && keys.length > 1,
          hasMethodsOtherThanConstructor = keys.length > 0 && !(1 === keys.length && "constructor" === keys[0]),
          hasThisAssignmentAndStaticMethods = thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0; if (hasMethods || hasMethodsOtherThanConstructor || hasThisAssignmentAndStaticMethods) return !0
        } return !1
      } catch (e) { return !1 }
    }

    function toFastProperties(obj) {
      function f() { } f.prototype = obj; for (var l = 8; l--;) new f; return obj
    }

    function isIdentifier(str) { return rident.test(str) }

    function filledRange(count, prefix, suffix) { for (var ret = new Array(count), i = 0; i < count; ++i) ret[i] = prefix + i + suffix; return ret }

    function safeToString(obj) { try { return obj + "" } catch (e) { return "[no string representation]" } }

    function markAsOriginatingFromRejection(e) { try { notEnumerableProp(e, "isOperational", !0) } catch (ignore) { } }

    function originatesFromRejection(e) { return null != e && (e instanceof Error.__BluebirdErrorTypes__.OperationalError || e.isOperational === !0) }

    function canAttachTrace(obj) { return obj instanceof Error && es5.propertyIsWritable(obj, "stack") }

    function classString(obj) { return {}.toString.call(obj) }

    function copyDescriptors(from, to, filter) { for (var keys = es5.names(from), i = 0; i < keys.length; ++i) { var key = keys[i]; if (filter(key)) try { es5.defineProperty(to, key, es5.getDescriptor(from, key)) } catch (ignore) { } } }
    var es5 = _dereq_("./es5.js"),
      canEvaluate = "undefined" == typeof navigator,
      haveGetters = function () { try { var o = {}; return es5.defineProperty(o, "f", { get: function () { return 3 } }), 3 === o.f } catch (e) { return !1 } }(),
      errorObj = { e: {} },
      tryCatchTarget, inherits = function (Child, Parent) {
        function T() { this.constructor = Child, this.constructor$ = Parent; for (var propertyName in Parent.prototype) hasProp.call(Parent.prototype, propertyName) && "$" !== propertyName.charAt(propertyName.length - 1) && (this[propertyName + "$"] = Parent.prototype[propertyName]) } var hasProp = {}.hasOwnProperty; return T.prototype = Parent.prototype, Child.prototype = new T, Child.prototype
      },
      inheritedDataKeys = function () {
        var excludedPrototypes = [Array.prototype, Object.prototype, Function.prototype],
        isExcludedProto = function (val) {
          for (var i = 0; i < excludedPrototypes.length; ++i)
            if (excludedPrototypes[i] === val) return !0; return !1
        }; if (es5.isES5) {
          var getKeys = Object.getOwnPropertyNames; return function (obj) {
            for (var ret = [], visitedKeys = Object.create(null); null != obj && !isExcludedProto(obj);) {
              var keys; try { keys = getKeys(obj) } catch (e) { return ret } for (var i = 0; i < keys.length; ++i) {
                var key = keys[i]; if (!visitedKeys[key]) {
                visitedKeys[key] = !0; var desc = Object.getOwnPropertyDescriptor(obj, key);
                  null != desc && null == desc.get && null == desc.set && ret.push(key)
                }
              } obj = es5.getPrototypeOf(obj)
            } return ret
          }
        } var hasProp = {}.hasOwnProperty; return function (obj) {
          if (isExcludedProto(obj)) return []; var ret = [];
          enumeration: for (var key in obj)
            if (hasProp.call(obj, key)) ret.push(key);
            else {
              for (var i = 0; i < excludedPrototypes.length; ++i)
                if (hasProp.call(excludedPrototypes[i], key)) continue enumeration;
              ret.push(key)
            } return ret
        }
      }(),
      thisAssignmentPattern = /this\s*\.\s*\S+\s*=/,
      rident = /^[a-z$_][a-z$_0-9]*$/i,
      ensureErrorObject = function () { return "stack" in new Error ? function (value) { return canAttachTrace(value) ? value : new Error(safeToString(value)) } : function (value) { if (canAttachTrace(value)) return value; try { throw new Error(safeToString(value)) } catch (err) { return err } } }(),
      ret = {
        isClass: isClass,
        isIdentifier: isIdentifier,
        inheritedDataKeys: inheritedDataKeys,
        getDataPropertyOrDefault: getDataPropertyOrDefault,
        thrower: thrower,
        isArray: es5.isArray,
        haveGetters: haveGetters,
        notEnumerableProp: notEnumerableProp,
        isPrimitive: isPrimitive,
        isObject: isObject,
        canEvaluate: canEvaluate,
        errorObj: errorObj,
        tryCatch: tryCatch,
        inherits: inherits,
        withAppended: withAppended,
        maybeWrapAsError: maybeWrapAsError,
        toFastProperties: toFastProperties,
        filledRange: filledRange,
        toString: safeToString,
        canAttachTrace: canAttachTrace,
        ensureErrorObject: ensureErrorObject,
        originatesFromRejection: originatesFromRejection,
        markAsOriginatingFromRejection: markAsOriginatingFromRejection,
        classString: classString,
        copyDescriptors: copyDescriptors,
        hasDevTools: "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes,
        isNode: "undefined" != typeof process && "[object process]" === classString(process).toLowerCase()
      };
    ret.isRecentNode = ret.isNode && function () { var version = process.versions.node.split(".").map(Number); return 0 === version[0] && version[1] > 10 || version[0] > 0 }(), ret.isNode && ret.toFastProperties(process);
    try { throw new Error } catch (e) { ret.lastLineError = e } module.exports = ret
  }, { "./es5.js": 14 }]
}, {}, [4])(4)
            }), "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise)
        }).call(this, require("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, { _process: 44 }],
43: [function (require, module, exports) {
  (function (process) {
    function normalizeArray(parts, allowAboveRoot) {
      for (var up = 0, i = parts.length - 1; i >= 0; i--) { var last = parts[i]; "." === last ? parts.splice(i, 1) : ".." === last ? (parts.splice(i, 1), up++) : up && (parts.splice(i, 1), up--) } if (allowAboveRoot)
        for (; up--; up) parts.unshift(".."); return parts
    }

    function filter(xs, f) { if (xs.filter) return xs.filter(f); for (var res = [], i = 0; i < xs.length; i++) f(xs[i], i, xs) && res.push(xs[i]); return res } var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
      splitPath = function (filename) { return splitPathRe.exec(filename).slice(1) };
    exports.resolve = function () {
      for (var resolvedPath = "", resolvedAbsolute = !1, i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = i >= 0 ? arguments[i] : process.cwd(); if ("string" != typeof path) throw new TypeError("Arguments to path.resolve must be strings");
        path && (resolvedPath = path + "/" + resolvedPath, resolvedAbsolute = "/" === path.charAt(0))
      } return resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function (p) { return !!p }), !resolvedAbsolute).join("/"), (resolvedAbsolute ? "/" : "") + resolvedPath || "."
    }, exports.normalize = function (path) {
      var isAbsolute = exports.isAbsolute(path),
      trailingSlash = "/" === substr(path, -1); return path = normalizeArray(filter(path.split("/"), function (p) { return !!p }), !isAbsolute).join("/"), path || isAbsolute || (path = "."), path && trailingSlash && (path += "/"), (isAbsolute ? "/" : "") + path
    }, exports.isAbsolute = function (path) { return "/" === path.charAt(0) }, exports.join = function () { var paths = Array.prototype.slice.call(arguments, 0); return exports.normalize(filter(paths, function (p, index) { if ("string" != typeof p) throw new TypeError("Arguments to path.join must be strings"); return p }).join("/")) }, exports.relative = function (from, to) {
      function trim(arr) { for (var start = 0; start < arr.length && "" === arr[start]; start++); for (var end = arr.length - 1; end >= 0 && "" === arr[end]; end--); return start > end ? [] : arr.slice(start, end - start + 1) } from = exports.resolve(from).substr(1), to = exports.resolve(to).substr(1); for (var fromParts = trim(from.split("/")), toParts = trim(to.split("/")), length = Math.min(fromParts.length, toParts.length), samePartsLength = length, i = 0; i < length; i++)
        if (fromParts[i] !== toParts[i]) { samePartsLength = i; break }
      for (var outputParts = [], i = samePartsLength; i < fromParts.length; i++) outputParts.push(".."); return outputParts = outputParts.concat(toParts.slice(samePartsLength)), outputParts.join("/")
    }, exports.sep = "/", exports.delimiter = ":", exports.dirname = function (path) {
      var result = splitPath(path),
      root = result[0],
      dir = result[1]; return root || dir ? (dir && (dir = dir.substr(0, dir.length - 1)), root + dir) : "."
    }, exports.basename = function (path, ext) { var f = splitPath(path)[2]; return ext && f.substr(-1 * ext.length) === ext && (f = f.substr(0, f.length - ext.length)), f }, exports.extname = function (path) { return splitPath(path)[3] }; var substr = "b" === "ab".substr(-1) ? function (str, start, len) { return str.substr(start, len) } : function (str, start, len) { return start < 0 && (start = str.length + start), str.substr(start, len) }
  }).call(this, require("_process"))
}, { _process: 44 }],
  44: [function (require, module, exports) {
    function defaultSetTimout() { throw new Error("setTimeout has not been defined") }

    function defaultClearTimeout() { throw new Error("clearTimeout has not been defined") }

    function runTimeout(fun) { if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0); if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, setTimeout(fun, 0); try { return cachedSetTimeout(fun, 0) } catch (e) { try { return cachedSetTimeout.call(null, fun, 0) } catch (e) { return cachedSetTimeout.call(this, fun, 0) } } }

    function runClearTimeout(marker) { if (cachedClearTimeout === clearTimeout) return clearTimeout(marker); if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, clearTimeout(marker); try { return cachedClearTimeout(marker) } catch (e) { try { return cachedClearTimeout.call(null, marker) } catch (e) { return cachedClearTimeout.call(this, marker) } } }

    function cleanUpNextTick() { draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue()) }

    function drainQueue() {
      if (!draining) {
        var timeout = runTimeout(cleanUpNextTick);
        draining = !0; for (var len = queue.length; len;) {
          for (currentQueue = queue, queue = []; ++queueIndex < len;) currentQueue && currentQueue[queueIndex].run();
          queueIndex = -1, len = queue.length
        } currentQueue = null, draining = !1, runClearTimeout(timeout)
      }
    }

    function Item(fun, array) { this.fun = fun, this.array = array }

    function noop() { } var cachedSetTimeout, cachedClearTimeout, process = module.exports = {}; ! function () { try { cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout } catch (e) { cachedSetTimeout = defaultSetTimout } try { cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout } catch (e) { cachedClearTimeout = defaultClearTimeout } }(); var currentQueue, queue = [],
      draining = !1,
      queueIndex = -1;
    process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1); if (arguments.length > 1)
        for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
      queue.push(new Item(fun, args)), 1 !== queue.length || draining || runTimeout(drainQueue)
    }, Item.prototype.run = function () { this.fun.apply(null, this.array) }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, process.emit = noop, process.binding = function (name) { throw new Error("process.binding is not supported") }, process.cwd = function () { return "/" }, process.chdir = function (dir) { throw new Error("process.chdir is not supported") }, process.umask = function () { return 0 }
  }, {}],
    45: [function (require, module, exports) {
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
      46: [function (require, module, exports) {
        ! function (global, factory) { "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function (w) { if (!w.document) throw new Error("jQuery requires a window with a document"); return factory(w) } : factory(global) }("undefined" != typeof window ? window : this, function (window, noGlobal) {
          function isArrayLike(obj) {
            var length = !!obj && "length" in obj && obj.length,
            type = jQuery.type(obj); return "function" !== type && !jQuery.isWindow(obj) && ("array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj)
          }

          function winnow(elements, qualifier, not) {
            if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function (elem, i) { return !!qualifier.call(elem, i, elem) !== not }); if (qualifier.nodeType) return jQuery.grep(elements, function (elem) { return elem === qualifier !== not }); if ("string" == typeof qualifier) {
              if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
              qualifier = jQuery.filter(qualifier, elements)
            } return jQuery.grep(elements, function (elem) { return indexOf.call(qualifier, elem) > -1 !== not })
          }

          function sibling(cur, dir) {
            for (;
              (cur = cur[dir]) && 1 !== cur.nodeType;); return cur
          }

          function createOptions(options) { var object = {}; return jQuery.each(options.match(rnotwhite) || [], function (_, flag) { object[flag] = !0 }), object }

          function completed() { document.removeEventListener("DOMContentLoaded", completed), window.removeEventListener("load", completed), jQuery.ready() }

          function Data() { this.expando = jQuery.expando + Data.uid++ }

          function dataAttr(elem, key, data) {
            var name; if (void 0 === data && 1 === elem.nodeType)
              if (name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase(), data = elem.getAttribute(name), "string" == typeof data) { try { data = "true" === data || "false" !== data && ("null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data) } catch (e) { } dataUser.set(elem, key, data) } else data = void 0; return data
          }

          function adjustCSS(elem, prop, valueParts, tween) {
            var adjusted, scale = 1,
            maxIterations = 20,
            currentValue = tween ? function () { return tween.cur() } : function () { return jQuery.css(elem, prop, "") },
            initial = currentValue(),
            unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
            initialInUnit = (jQuery.cssNumber[prop] || "px" !== unit && +initial) && rcssNum.exec(jQuery.css(elem, prop)); if (initialInUnit && initialInUnit[3] !== unit) {
            unit = unit || initialInUnit[3], valueParts = valueParts || [], initialInUnit = +initial || 1;
              do scale = scale || ".5", initialInUnit /= scale, jQuery.style(elem, prop, initialInUnit + unit); while (scale !== (scale = currentValue() / initial) && 1 !== scale && --maxIterations)
            } return valueParts && (initialInUnit = +initialInUnit || +initial || 0, adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2], tween && (tween.unit = unit, tween.start = initialInUnit, tween.end = adjusted)), adjusted
          }

          function getAll(context, tag) { var ret = "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : "undefined" != typeof context.querySelectorAll ? context.querySelectorAll(tag || "*") : []; return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret }

          function setGlobalEval(elems, refElements) { for (var i = 0, l = elems.length; i < l; i++) dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval")) }

          function buildFragment(elems, context, scripts, selection, ignored) {
            for (var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length; i < l; i++)
              if (elem = elems[i], elem || 0 === elem)
                if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                else if (rhtml.test(elem)) {
                  for (tmp = tmp || fragment.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2], j = wrap[0]; j--;) tmp = tmp.lastChild;
                  jQuery.merge(nodes, tmp.childNodes), tmp = fragment.firstChild, tmp.textContent = ""
                } else nodes.push(context.createTextNode(elem)); for (fragment.textContent = "", i = 0; elem = nodes[i++];)
              if (selection && jQuery.inArray(elem, selection) > -1) ignored && ignored.push(elem);
              else if (contains = jQuery.contains(elem.ownerDocument, elem), tmp = getAll(fragment.appendChild(elem), "script"), contains && setGlobalEval(tmp), scripts)
                for (j = 0; elem = tmp[j++];) rscriptType.test(elem.type || "") && scripts.push(elem); return fragment
          }

          function returnTrue() { return !0 }

          function returnFalse() { return !1 }

          function safeActiveElement() { try { return document.activeElement } catch (err) { } }

          function on(elem, types, selector, data, fn, one) {
            var origFn, type; if ("object" == typeof types) { "string" != typeof selector && (data = data || selector, selector = void 0); for (type in types) on(elem, type, selector, data, types[type], one); return elem } if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse;
            else if (!fn) return elem; return 1 === one && (origFn = fn, fn = function (event) { return jQuery().off(event), origFn.apply(this, arguments) }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), elem.each(function () { jQuery.event.add(this, types, fn, data, selector) })
          }

          function manipulationTarget(elem, content) { return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem }

          function disableScript(elem) { return elem.type = (null !== elem.getAttribute("type")) + "/" + elem.type, elem }

          function restoreScript(elem) { var match = rscriptTypeMasked.exec(elem.type); return match ? elem.type = match[1] : elem.removeAttribute("type"), elem }

          function cloneCopyEvent(src, dest) {
            var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events; if (1 === dest.nodeType) {
              if (dataPriv.hasData(src) && (pdataOld = dataPriv.access(src), pdataCur = dataPriv.set(dest, pdataOld), events = pdataOld.events)) {
              delete pdataCur.handle, pdataCur.events = {}; for (type in events)
                for (i = 0, l = events[type].length; i < l; i++) jQuery.event.add(dest, type, events[type][i])
              } dataUser.hasData(src) && (udataOld = dataUser.access(src), udataCur = jQuery.extend({}, udataOld), dataUser.set(dest, udataCur))
            }
          }

          function fixInput(src, dest) { var nodeName = dest.nodeName.toLowerCase(); "input" === nodeName && rcheckableType.test(src.type) ? dest.checked = src.checked : "input" !== nodeName && "textarea" !== nodeName || (dest.defaultValue = src.defaultValue) }

          function domManip(collection, args, callback, ignored) {
            args = concat.apply([], args); var fragment, first, scripts, hasScripts, node, doc, i = 0,
              l = collection.length,
              iNoClone = l - 1,
              value = args[0],
              isFunction = jQuery.isFunction(value); if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return collection.each(function (index) {
                var self = collection.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())), domManip(self, args, callback, ignored)
              }); if (l && (fragment = buildFragment(args, collection[0].ownerDocument, !1, collection, ignored), first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), first || ignored)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; i < l; i++) node = fragment, i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), callback.call(collection[i], node, i); if (hasScripts)
                  for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), i = 0; i < hasScripts; i++) node = scripts[i], rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval(node.textContent.replace(rcleanScript, "")))
              } return collection
          }

          function remove(elem, selector, keepData) { for (var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0; null != (node = nodes[i]); i++) keepData || 1 !== node.nodeType || jQuery.cleanData(getAll(node)), node.parentNode && (keepData && jQuery.contains(node.ownerDocument, node) && setGlobalEval(getAll(node, "script")), node.parentNode.removeChild(node)); return elem }

          function actualDisplay(name, doc) {
            var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
            display = jQuery.css(elem[0], "display"); return elem.detach(), display
          }

          function defaultDisplay(nodeName) {
            var doc = document,
            display = elemdisplay[nodeName]; return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), doc = iframe[0].contentDocument, doc.write(), doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), display
          }

          function curCSS(elem, name, computed) { var width, minWidth, maxWidth, ret, style = elem.style; return computed = computed || getStyles(elem), ret = computed ? computed.getPropertyValue(name) || computed[name] : void 0, "" !== ret && void 0 !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), computed && !support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth), void 0 !== ret ? ret + "" : ret }

          function addGetHookIf(conditionFn, hookFn) { return { get: function () { return conditionFn() ? void delete this.get : (this.get = hookFn).apply(this, arguments) } } }

          function vendorPropName(name) {
            if (name in emptyStyle) return name; for (var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length; i--;)
              if (name = cssPrefixes[i] + capName, name in emptyStyle) return name
          }

          function setPositiveNumber(elem, value, subtract) { var matches = rcssNum.exec(value); return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value }

          function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) { for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; i < 4; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))); return val }

          function getWidthOrHeight(elem, name, extra) {
            var valueIsBorderBox = !0,
            val = "width" === name ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles(elem),
            isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", !1, styles); if (document.msFullscreenElement && window.top !== window && elem.getClientRects().length && (val = Math.round(100 * elem.getBoundingClientRect()[name])), val <= 0 || null == val) {
              if (val = curCSS(elem, name, styles), (val < 0 || null == val) && (val = elem.style[name]), rnumnonpx.test(val)) return val;
              valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), val = parseFloat(val) || 0
            } return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px"
          }

          function showHide(elements, show) { for (var display, elem, hidden, values = [], index = 0, length = elements.length; index < length; index++) elem = elements[index], elem.style && (values[index] = dataPriv.get(elem, "olddisplay"), display = elem.style.display, show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem), "none" === display && hidden || dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display")))); for (index = 0; index < length; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none")); return elements }

          function Tween(elem, options, prop, end, easing) { return new Tween.prototype.init(elem, options, prop, end, easing) }

          function createFxNow() { return window.setTimeout(function () { fxNow = void 0 }), fxNow = jQuery.now() }

          function genFx(type, includeWidth) {
            var which, i = 0,
            attrs = { height: type }; for (includeWidth = includeWidth ? 1 : 0; i < 4; i += 2 - includeWidth) which = cssExpand[i], attrs["margin" + which] = attrs["padding" + which] = type; return includeWidth && (attrs.opacity = attrs.width = type), attrs
          }

          function createTween(value, prop, animation) {
            for (var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length; index < length; index++)
              if (tween = collection[index].call(animation, prop, value)) return tween
          }

          function defaultPrefilter(elem, props, opts) {
            var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHidden(elem),
            dataShow = dataPriv.get(elem, "fxshow");
            opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function () { hooks.unqueued || oldfire() }), hooks.unqueued++ , anim.always(function () { anim.always(function () { hooks.unqueued-- , jQuery.queue(elem, "fx").length || hooks.empty.fire() }) })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [style.overflow, style.overflowX, style.overflowY], display = jQuery.css(elem, "display"), checkDisplay = "none" === display ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display, "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (style.display = "inline-block")), opts.overflow && (style.overflow = "hidden", anim.always(function () { style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2] })); for (prop in props)
              if (value = props[prop], rfxtypes.exec(value)) {
                if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                  if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                  hidden = !0
                } orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
              } else display = void 0; if (jQuery.isEmptyObject(orig)) "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display);
            else {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = dataPriv.access(elem, "fxshow", {}), toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function () { jQuery(elem).hide() }), anim.done(function () {
              var prop;
              dataPriv.remove(elem, "fxshow"); for (prop in orig) jQuery.style(elem, prop, orig[prop])
            }); for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 : 0))
            }
          }

          function propFilter(props, specialEasing) {
            var index, name, easing, value, hooks; for (index in props)
              if (name = jQuery.camelCase(index), easing = specialEasing[name], value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) { value = hooks.expand(value), delete props[name]; for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing) } else specialEasing[name] = easing
          }

          function Animation(elem, properties, options) {
            var result, stopped, index = 0,
              length = Animation.prefilters.length,
              deferred = jQuery.Deferred().always(function () { delete tick.elem }),
              tick = function () { if (stopped) return !1; for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; index < length; index++) animation.tweens[index].run(percent); return deferred.notifyWith(elem, [animation, percent, remaining]), percent < 1 && length ? remaining : (deferred.resolveWith(elem, [animation]), !1) },
              animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(!0, { specialEasing: {}, easing: jQuery.easing._default }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function (prop, end) { var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing); return animation.tweens.push(tween), tween },
                stop: function (gotoEnd) {
                  var index = 0,
                    length = gotoEnd ? animation.tweens.length : 0;
                  if (stopped) return this;
                  for (stopped = !0; index < length; index++) animation.tweens[index].run(1);
                  return gotoEnd ? (deferred.notifyWith(elem, [animation, 1, 0]),
                    deferred.resolveWith(elem, [animation, gotoEnd])) : deferred.rejectWith(elem, [animation, gotoEnd]), this
                }
              }),
              props = animation.props;
            for (propFilter(props, animation.opts.specialEasing); index < length; index++)
              if (result = Animation.prefilters[index].call(animation, elem, props, animation.opts)) return jQuery.isFunction(result.stop) && (jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result)), result;
            return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, { elem: elem, anim: animation, queue: animation.opts.queue })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
          }

          function getClass(elem) { return elem.getAttribute && elem.getAttribute("class") || "" }

          function addToPrefiltersOrTransports(structure) {
            return function (dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*"); var dataType, i = 0,
              dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || []; if (jQuery.isFunction(func))
                for (; dataType = dataTypes[i++];) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func)
            }
          }

          function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
            function inspect(dataType) { var selected; return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) { var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR); return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), inspect(dataTypeOrTransport), !1) }), selected } var inspected = {},
              seekingTransport = structure === transports; return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
          }

          function ajaxExtend(target, src) { var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {}; for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]); return deep && jQuery.extend(!0, target, deep), target }

          function ajaxHandleResponses(s, jqXHR, responses) {
            for (var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
              "*" === dataTypes[0];) dataTypes.shift(), void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type")); if (ct)
              for (type in contents)
                if (contents[type] && contents[type].test(ct)) { dataTypes.unshift(type); break }
            if (dataTypes[0] in responses) finalDataType = dataTypes[0];
            else { for (type in responses) { if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) { finalDataType = type; break } firstDataType || (firstDataType = type) } finalDataType = finalDataType || firstDataType } if (finalDataType) return finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]
          }

          function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2, current, conv, tmp, prev, converters = {},
            dataTypes = s.dataTypes.slice(); if (dataTypes[1])
              for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv]; for (current = dataTypes.shift(); current;)
              if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), prev = current, current = dataTypes.shift())
                if ("*" === current) current = prev;
                else if ("*" !== prev && prev !== current) {
                  if (conv = converters[prev + " " + current] || converters["* " + current], !conv)
                    for (conv2 in converters)
                      if (tmp = conv2.split(" "), tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) { conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], dataTypes.unshift(tmp[1])); break }
                  if (conv !== !0)
                    if (conv && s.throws) response = conv(response);
                    else try { response = conv(response) } catch (e) { return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current } }
                } return { state: "success", data: response }
          }

          function buildParams(prefix, obj, traditional, add) {
            var name; if (jQuery.isArray(obj)) jQuery.each(obj, function (i, v) { traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v && null != v ? i : "") + "]", v, traditional, add) });
            else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj);
            else
              for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
          }

          function getWindow(elem) { return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType && elem.defaultView }
          var arr = [],
            document = window.document,
            slice = arr.slice,
            concat = arr.concat,
            push = arr.push,
            indexOf = arr.indexOf,
            class2type = {},
            toString = class2type.toString,
            hasOwn = class2type.hasOwnProperty,
            support = {},
            version = "2.2.3",
            jQuery = function (selector, context) { return new jQuery.fn.init(selector, context) },
            rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            rmsPrefix = /^-ms-/,
            rdashAlpha = /-([\da-z])/gi,
            fcamelCase = function (all, letter) { return letter.toUpperCase() };
          jQuery.fn = jQuery.prototype = {
            jquery: version, constructor: jQuery, selector: "", length: 0, toArray: function () { return slice.call(this) }, get: function (num) { return null != num ? num < 0 ? this[num + this.length] : this[num] : slice.call(this) }, pushStack: function (elems) { var ret = jQuery.merge(this.constructor(), elems); return ret.prevObject = this, ret.context = this.context, ret }, each: function (callback) { return jQuery.each(this, callback) }, map: function (callback) { return this.pushStack(jQuery.map(this, function (elem, i) { return callback.call(elem, i, elem) })) }, slice: function () { return this.pushStack(slice.apply(this, arguments)) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, eq: function (i) {
              var len = this.length,
              j = +i + (i < 0 ? len : 0); return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
            }, end: function () { return this.prevObject || this.constructor() }, push: push, sort: arr.sort, splice: arr.splice
          }, jQuery.extend = jQuery.fn.extend = function () {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = !1; for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, i--); i < length; i++)
              if (null != (options = arguments[i]))
                for (name in options) src = target[name], copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy)); return target
          }, jQuery.extend({
            expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (msg) { throw new Error(msg) }, noop: function () { }, isFunction: function (obj) { return "function" === jQuery.type(obj) }, isArray: Array.isArray, isWindow: function (obj) { return null != obj && obj === obj.window }, isNumeric: function (obj) { var realStringObj = obj && obj.toString(); return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0 }, isPlainObject: function (obj) { var key; if ("object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1; if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")) return !1; for (key in obj); return void 0 === key || hasOwn.call(obj, key) }, isEmptyObject: function (obj) { var name; for (name in obj) return !1; return !0 }, type: function (obj) { return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj }, globalEval: function (code) {
              var script, indirect = eval;
              code = jQuery.trim(code), code && (1 === code.indexOf("use strict") ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
            }, camelCase: function (string) { return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase) }, nodeName: function (elem, name) { return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase() }, each: function (obj, callback) {
              var length, i = 0; if (isArrayLike(obj))
                for (length = obj.length; i < length && callback.call(obj[i], i, obj[i]) !== !1; i++);
              else
                for (i in obj)
                  if (callback.call(obj[i], i, obj[i]) === !1) break; return obj
            }, trim: function (text) { return null == text ? "" : (text + "").replace(rtrim, "") }, makeArray: function (arr, results) { var ret = results || []; return null != arr && (isArrayLike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [arr] : arr) : push.call(ret, arr)), ret }, inArray: function (elem, arr, i) { return null == arr ? -1 : indexOf.call(arr, elem, i) }, merge: function (first, second) { for (var len = +second.length, j = 0, i = first.length; j < len; j++) first[i++] = second[j]; return first.length = i, first }, grep: function (elems, callback, invert) { for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; i < length; i++) callbackInverse = !callback(elems[i], i), callbackInverse !== callbackExpect && matches.push(elems[i]); return matches }, map: function (elems, callback, arg) {
              var length, value, i = 0,
              ret = []; if (isArrayLike(elems))
                for (length = elems.length; i < length; i++) value = callback(elems[i], i, arg), null != value && ret.push(value);
              else
                for (i in elems) value = callback(elems[i], i, arg), null != value && ret.push(value); return concat.apply([], ret)
            }, guid: 1, proxy: function (fn, context) { var tmp, args, proxy; if ("string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), jQuery.isFunction(fn)) return args = slice.call(arguments, 2), proxy = function () { return fn.apply(context || this, args.concat(slice.call(arguments))) }, proxy.guid = fn.guid = fn.guid || jQuery.guid++ , proxy }, now: Date.now, support: support
          }), "function" == typeof Symbol && (jQuery.fn[Symbol.iterator] = arr[Symbol.iterator]), jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) { class2type["[object " + name + "]"] = name.toLowerCase() });
          var Sizzle = function (window) {
            function Sizzle(selector, context, results, seed) {
              var m, i, elem, nid, nidselect, match, groups, newSelector, newContext = context && context.ownerDocument,
              nodeType = context ? context.nodeType : 9; if (results = results || [], "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType) return results; if (!seed && ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), context = context || document, documentIsHTML)) {
                if (11 !== nodeType && (match = rquickExpr.exec(selector)))
                  if (m = match[1]) { if (9 === nodeType) { if (!(elem = context.getElementById(m))) return results; if (elem.id === m) return results.push(elem), results } else if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), results } else { if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), results; if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), results }
                if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                  if (1 !== nodeType) newContext = context, newSelector = selector;
                  else if ("object" !== context.nodeName.toLowerCase()) {
                    for ((nid = context.getAttribute("id")) ? nid = nid.replace(rescape, "\\$&") : context.setAttribute("id", nid = expando), groups = tokenize(selector), i = groups.length, nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']"; i--;) groups[i] = nidselect + " " + toSelector(groups[i]);
                    newSelector = groups.join(","), newContext = rsibling.test(selector) && testContext(context.parentNode) || context
                  } if (newSelector) try { return push.apply(results, newContext.querySelectorAll(newSelector)), results } catch (qsaError) { } finally { nid === expando && context.removeAttribute("id") }
                }
              } return select(selector.replace(rtrim, "$1"), context, results, seed)
            }

            function createCache() {
              function cache(key, value) { return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value } var keys = []; return cache
            }

            function markFunction(fn) { return fn[expando] = !0, fn }

            function assert(fn) { var div = document.createElement("div"); try { return !!fn(div) } catch (e) { return !1 } finally { div.parentNode && div.parentNode.removeChild(div), div = null } }

            function addHandle(attrs, handler) { for (var arr = attrs.split("|"), i = arr.length; i--;) Expr.attrHandle[arr[i]] = handler }

            function siblingCheck(a, b) {
              var cur = b && a,
              diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE); if (diff) return diff; if (cur)
                for (; cur = cur.nextSibling;)
                  if (cur === b) return -1; return a ? 1 : -1
            }

            function createInputPseudo(type) { return function (elem) { var name = elem.nodeName.toLowerCase(); return "input" === name && elem.type === type } }

            function createButtonPseudo(type) { return function (elem) { var name = elem.nodeName.toLowerCase(); return ("input" === name || "button" === name) && elem.type === type } }

            function createPositionalPseudo(fn) { return markFunction(function (argument) { return argument = +argument, markFunction(function (seed, matches) { for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--;) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j])) }) }) }

            function testContext(context) { return context && "undefined" != typeof context.getElementsByTagName && context }

            function setFilters() { }

            function toSelector(tokens) { for (var i = 0, len = tokens.length, selector = ""; i < len; i++) selector += tokens[i].value; return selector }

            function addCombinator(matcher, combinator, base) {
              var dir = combinator.dir,
              checkNonElements = base && "parentNode" === dir,
              doneName = done++; return combinator.first ? function (elem, context, xml) {
                for (; elem = elem[dir];)
                  if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml)
              } : function (elem, context, xml) {
                var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName]; if (xml) {
                  for (; elem = elem[dir];)
                    if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0
                } else
                  for (; elem = elem[dir];)
                    if (1 === elem.nodeType || checkNonElements) { if (outerCache = elem[expando] || (elem[expando] = {}), uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {}), (oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2]; if (uniqueCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0 }
              }
            }

            function elementMatcher(matchers) {
              return matchers.length > 1 ? function (elem, context, xml) {
                for (var i = matchers.length; i--;)
                  if (!matchers[i](elem, context, xml)) return !1; return !0
              } : matchers[0]
            }

            function multipleContexts(selector, contexts, results) { for (var i = 0, len = contexts.length; i < len; i++) Sizzle(selector, contexts[i], results); return results }

            function condense(unmatched, map, filter, context, xml) { for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; i < len; i++)(elem = unmatched[i]) && (filter && !filter(elem, context, xml) || (newUnmatched.push(elem), mapped && map.push(i))); return newUnmatched }

            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
              return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), markFunction(function (seed, results, context, xml) {
                var temp, i, elem, preMap = [],
                postMap = [],
                preexisting = results.length,
                elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml),
                matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn; if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter)
                  for (temp = condense(matcherOut, postMap), postFilter(temp, [], context, xml), i = temp.length; i--;)(elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)); if (seed) {
                    if (postFinder || preFilter) {
                      if (postFinder) {
                        for (temp = [], i = matcherOut.length; i--;)(elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                        postFinder(null, matcherOut = [], temp, xml)
                      } for (i = matcherOut.length; i--;)(elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem))
                    }
                  } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut)
              })
            }

            function matcherFromTokens(tokens) {
              for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function (elem) { return elem === checkContext }, implicitRelative, !0), matchAnyContext = addCombinator(function (elem) { return indexOf(checkContext, elem) > -1 }, implicitRelative, !0), matchers = [function (elem, context, xml) { var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml)); return checkContext = null, ret }]; i < len; i++)
                if (matcher = Expr.relative[tokens[i].type]) matchers = [addCombinator(elementMatcher(matchers), matcher)];
                else { if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) { for (j = ++i; j < len && !Expr.relative[tokens[j].type]; j++); return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({ value: " " === tokens[i - 2].type ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens)) } matchers.push(matcher) }
              return elementMatcher(matchers)
            }

            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
              var bySet = setMatchers.length > 0,
              byElement = elementMatchers.length > 0,
              superMatcher = function (seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                elems = seed || byElement && Expr.find.TAG("*", outermost),
                dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1,
                len = elems.length; for (outermost && (outermostContext = context === document || context || outermost); i !== len && null != (elem = elems[i]); i++) {
                  if (byElement && elem) {
                    for (j = 0, context || elem.ownerDocument === document || (setDocument(elem), xml = !documentIsHTML); matcher = elementMatchers[j++];)
                      if (matcher(elem, context || document, xml)) { results.push(elem); break }
                    outermost && (dirruns = dirrunsUnique)
                  } bySet && ((elem = !matcher && elem) && matchedCount-- , seed && unmatched.push(elem))
                } if (matchedCount += i, bySet && i !== matchedCount) {
                  for (j = 0; matcher = setMatchers[j++];) matcher(unmatched, setMatched, context, xml); if (seed) {
                    if (matchedCount > 0)
                      for (; i--;) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                    setMatched = condense(setMatched)
                  } push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results)
                } return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched
              }; return bySet ? markFunction(superMatcher) : superMatcher
            }
            var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date,
              preferredDoc = window.document,
              dirruns = 0,
              done = 0,
              classCache = createCache(),
              tokenCache = createCache(),
              compilerCache = createCache(),
              sortOrder = function (a, b) { return a === b && (hasDuplicate = !0), 0 },
              MAX_NEGATIVE = 1 << 31,
              hasOwn = {}.hasOwnProperty,
              arr = [],
              pop = arr.pop,
              push_native = arr.push,
              push = arr.push,
              slice = arr.slice,
              indexOf = function (list, elem) {
                for (var i = 0, len = list.length; i < len; i++)
                  if (list[i] === elem) return i; return -1
              },
              booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
              whitespace = "[\\x20\\t\\r\\n\\f]",
              identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
              attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
              pseudos = ":(" + identifier + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)",
              rwhitespace = new RegExp(whitespace + "+", "g"),
              rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
              rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
              rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
              rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
              rpseudo = new RegExp(pseudos),
              ridentifier = new RegExp("^" + identifier + "$"),
              matchExpr = { ID: new RegExp("^#(" + identifier + ")"), CLASS: new RegExp("^\\.(" + identifier + ")"), TAG: new RegExp("^(" + identifier + "|[*])"), ATTR: new RegExp("^" + attributes), PSEUDO: new RegExp("^" + pseudos), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"), bool: new RegExp("^(?:" + booleans + ")$", "i"), needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i") },
              rinputs = /^(?:input|select|textarea|button)$/i,
              rheader = /^h\d$/i,
              rnative = /^[^{]+\{\s*\[native \w/,
              rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
              rsibling = /[+~]/,
              rescape = /'|\\/g,
              runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
              funescape = function (_, escaped, escapedWhitespace) { var high = "0x" + escaped - 65536; return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320) },
              unloadHandler = function () { setDocument() };
            try { push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), arr[preferredDoc.childNodes.length].nodeType } catch (e) {
              push = {
                apply: arr.length ? function (target, els) { push_native.apply(target, slice.call(els)) } : function (target, els) {
                  for (var j = target.length, i = 0; target[j++] = els[i++];);
                  target.length = j - 1
                }
              }
            } support = Sizzle.support = {}, isXML = Sizzle.isXML = function (elem) { var documentElement = elem && (elem.ownerDocument || elem).documentElement; return !!documentElement && "HTML" !== documentElement.nodeName }, setDocument = Sizzle.setDocument = function (node) {
              var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc; return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, docElem = document.documentElement, documentIsHTML = !isXML(document), (parent = document.defaultView) && parent.top !== parent && (parent.addEventListener ? parent.addEventListener("unload", unloadHandler, !1) : parent.attachEvent && parent.attachEvent("onunload", unloadHandler)), support.attributes = assert(function (div) { return div.className = "i", !div.getAttribute("className") }), support.getElementsByTagName = assert(function (div) { return div.appendChild(document.createComment("")), !div.getElementsByTagName("*").length }), support.getElementsByClassName = rnative.test(document.getElementsByClassName), support.getById = assert(function (div) { return docElem.appendChild(div).id = expando, !document.getElementsByName || !document.getElementsByName(expando).length }), support.getById ? (Expr.find.ID = function (id, context) { if ("undefined" != typeof context.getElementById && documentIsHTML) { var m = context.getElementById(id); return m ? [m] : [] } }, Expr.filter.ID = function (id) { var attrId = id.replace(runescape, funescape); return function (elem) { return elem.getAttribute("id") === attrId } }) : (delete Expr.find.ID, Expr.filter.ID = function (id) { var attrId = id.replace(runescape, funescape); return function (elem) { var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id"); return node && node.value === attrId } }), Expr.find.TAG = support.getElementsByTagName ? function (tag, context) { return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0 } : function (tag, context) {
                var elem, tmp = [],
                i = 0,
                results = context.getElementsByTagName(tag); if ("*" === tag) { for (; elem = results[i++];) 1 === elem.nodeType && tmp.push(elem); return tmp } return results
              }, Expr.find.CLASS = support.getElementsByClassName && function (className, context) { if ("undefined" != typeof context.getElementsByClassName && documentIsHTML) return context.getElementsByClassName(className) }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(document.querySelectorAll)) && (assert(function (div) { docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>", div.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), div.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"), div.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]") }), assert(function (div) {
                var input = document.createElement("input");
                input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:")
              })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function (div) { support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), rbuggyMatches.push("!=", pseudos) }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a,
                bup = b && b.parentNode; return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)))
              } : function (a, b) {
                if (b)
                  for (; b = b.parentNode;)
                    if (b === a) return !0; return !1
              }, sortOrder = hasCompare ? function (a, b) { if (a === b) return hasDuplicate = !0, 0; var compare = !a.compareDocumentPosition - !b.compareDocumentPosition; return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1) } : function (a, b) {
                if (a === b) return hasDuplicate = !0, 0; var cur, i = 0,
                  aup = a.parentNode,
                  bup = b.parentNode,
                  ap = [a],
                  bp = [b]; if (!aup || !bup) return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0; if (aup === bup) return siblingCheck(a, b); for (cur = a; cur = cur.parentNode;) ap.unshift(cur); for (cur = b; cur = cur.parentNode;) bp.unshift(cur); for (; ap[i] === bp[i];) i++; return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
              }, document) : document
            }, Sizzle.matches = function (expr, elements) { return Sizzle(expr, null, null, elements) }, Sizzle.matchesSelector = function (elem, expr) {
              if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try { var ret = matches.call(elem, expr); if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret } catch (e) { }
              return Sizzle(expr, document, null, [elem]).length > 0
            }, Sizzle.contains = function (context, elem) { return (context.ownerDocument || context) !== document && setDocument(context), contains(context, elem) }, Sizzle.attr = function (elem, name) {
              (elem.ownerDocument || elem) !== document && setDocument(elem); var fn = Expr.attrHandle[name.toLowerCase()],
                val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0; return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
            }, Sizzle.error = function (msg) { throw new Error("Syntax error, unrecognized expression: " + msg) }, Sizzle.uniqueSort = function (results) {
              var elem, duplicates = [],
              j = 0,
              i = 0; if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), results.sort(sortOrder), hasDuplicate) { for (; elem = results[i++];) elem === results[i] && (j = duplicates.push(i)); for (; j--;) results.splice(duplicates[j], 1) } return sortInput = null, results
            }, getText = Sizzle.getText = function (elem) {
              var node, ret = "",
              i = 0,
              nodeType = elem.nodeType; if (nodeType) { if (1 === nodeType || 9 === nodeType || 11 === nodeType) { if ("string" == typeof elem.textContent) return elem.textContent; for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem) } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue } else
                for (; node = elem[i++];) ret += getText(node); return ret
            }, Expr = Sizzle.selectors = {
              cacheLength: 50,
              createPseudo: markFunction,
              match: matchExpr,
              attrHandle: {},
              find: {},
              relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
              preFilter: { ATTR: function (match) { return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4) }, CHILD: function (match) { return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), match }, PSEUDO: function (match) { var excess, unquoted = !match[6] && match[2]; return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess)), match.slice(0, 3)) } },
              filter: {
                TAG: function (nodeNameSelector) { var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase(); return "*" === nodeNameSelector ? function () { return !0 } : function (elem) { return elem.nodeName && elem.nodeName.toLowerCase() === nodeName } },
                CLASS: function (className) { var pattern = classCache[className + " "]; return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) { return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "") }) },
                ATTR: function (name, operator, check) { return function (elem) { var result = Sizzle.attr(elem, name); return null == result ? "!=" === operator : !operator || (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator && (result === check || result.slice(0, check.length + 1) === check + "-")) } },
                CHILD: function (type, what, argument, first, last) {
                  var simple = "nth" !== type.slice(0, 3),
                    forward = "last" !== type.slice(-4),
                    ofType = "of-type" === what;
                  return 1 === first && 0 === last ? function (elem) { return !!elem.parentNode } : function (elem, context, xml) {
                    var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
                      parent = elem.parentNode,
                      name = ofType && elem.nodeName.toLowerCase(),
                      useCache = !xml && !ofType,
                      diff = !1;
                    if (parent) {
                      if (simple) {
                        for (; dir;) {
                          for (node = elem; node = node[dir];)
                            if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                          start = dir = "only" === type && !start && "nextSibling"
                        } return !0
                      }
                      if (start = [forward ? parent.firstChild : parent.lastChild], forward && useCache) {
                        for (node = parent, outerCache = node[expando] || (node[expando] = {}), uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), cache = uniqueCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = nodeIndex && cache[2], node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();)
                          if (1 === node.nodeType && ++diff && node === elem) { uniqueCache[type] = [dirruns, nodeIndex, diff]; break }
                      } else if (useCache && (node = elem, outerCache = node[expando] || (node[expando] = {}), uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), cache = uniqueCache[type] || [], nodeIndex = cache[0] === dirruns && cache[1], diff = nodeIndex), diff === !1)
                        for (;
                          (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && (outerCache = node[expando] || (node[expando] = {}),
                            uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {}), uniqueCache[type] = [dirruns, diff]), node !== elem)););
                      return diff -= last, diff === first || diff % first === 0 && diff / first >= 0
                    }
                  }
                },
                PSEUDO: function (pseudo, argument) { var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo); return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) { for (var idx, matched = fn(seed, argument), i = matched.length; i--;) idx = indexOf(seed, matched[i]), seed[idx] = !(matches[idx] = matched[i]) }) : function (elem) { return fn(elem, 0, args) }) : fn }
              },
              pseudos: {
                not: markFunction(function (selector) {
                  var input = [],
                  results = [],
                  matcher = compile(selector.replace(rtrim, "$1")); return matcher[expando] ? markFunction(function (seed, matches, context, xml) { for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--;)(elem = unmatched[i]) && (seed[i] = !(matches[i] = elem)) }) : function (elem, context, xml) { return input[0] = elem, matcher(input, null, xml, results), input[0] = null, !results.pop() }
                }), has: markFunction(function (selector) { return function (elem) { return Sizzle(selector, elem).length > 0 } }), contains: markFunction(function (text) {
                  return text = text.replace(runescape, funescape),
                    function (elem) { return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1 }
                }), lang: markFunction(function (lang) {
                  return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), lang = lang.replace(runescape, funescape).toLowerCase(),
                    function (elem) {
                      var elemLang;
                      do
                        if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType); return !1
                    }
                }), target: function (elem) { var hash = window.location && window.location.hash; return hash && hash.slice(1) === elem.id }, root: function (elem) { return elem === docElem }, focus: function (elem) { return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex) }, enabled: function (elem) { return elem.disabled === !1 }, disabled: function (elem) { return elem.disabled === !0 }, checked: function (elem) { var nodeName = elem.nodeName.toLowerCase(); return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected }, selected: function (elem) { return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0 }, empty: function (elem) {
                  for (elem = elem.firstChild; elem; elem = elem.nextSibling)
                    if (elem.nodeType < 6) return !1; return !0
                }, parent: function (elem) { return !Expr.pseudos.empty(elem) }, header: function (elem) { return rheader.test(elem.nodeName) }, input: function (elem) { return rinputs.test(elem.nodeName) }, button: function (elem) { var name = elem.nodeName.toLowerCase(); return "input" === name && "button" === elem.type || "button" === name }, text: function (elem) { var attr; return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase()) }, first: createPositionalPseudo(function () { return [0] }), last: createPositionalPseudo(function (matchIndexes, length) { return [length - 1] }), eq: createPositionalPseudo(function (matchIndexes, length, argument) { return [argument < 0 ? argument + length : argument] }), even: createPositionalPseudo(function (matchIndexes, length) { for (var i = 0; i < length; i += 2) matchIndexes.push(i); return matchIndexes }), odd: createPositionalPseudo(function (matchIndexes, length) { for (var i = 1; i < length; i += 2) matchIndexes.push(i); return matchIndexes }), lt: createPositionalPseudo(function (matchIndexes, length, argument) { for (var i = argument < 0 ? argument + length : argument; --i >= 0;) matchIndexes.push(i); return matchIndexes }), gt: createPositionalPseudo(function (matchIndexes, length, argument) { for (var i = argument < 0 ? argument + length : argument; ++i < length;) matchIndexes.push(i); return matchIndexes })
              }
            }, Expr.pseudos.nth = Expr.pseudos.eq;
            for (i in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) Expr.pseudos[i] = createInputPseudo(i);
            for (i in { submit: !0, reset: !0 }) Expr.pseudos[i] = createButtonPseudo(i);
            return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters, tokenize = Sizzle.tokenize = function (selector, parseOnly) { var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "]; if (cached) return parseOnly ? 0 : cached.slice(0); for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar;) { matched && !(match = rcomma.exec(soFar)) || (match && (soFar = soFar.slice(match[0].length) || soFar), groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), tokens.push({ value: matched, type: match[0].replace(rtrim, " ") }), soFar = soFar.slice(matched.length)); for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), tokens.push({ value: matched, type: type, matches: match }), soFar = soFar.slice(matched.length)); if (!matched) break } return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0) }, compile = Sizzle.compile = function (selector, match) {
              var i, setMatchers = [],
              elementMatchers = [],
              cached = compilerCache[selector + " "]; if (!cached) {
                for (match || (match = tokenize(selector)), i = match.length; i--;) cached = matcherFromTokens(match[i]), cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), cached.selector = selector
              } return cached
            }, select = Sizzle.select = function (selector, context, results, seed) {
              var i, tokens, token, type, find, compiled = "function" == typeof selector && selector,
              match = !seed && tokenize(selector = compiled.selector || selector); if (results = results || [], 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                  if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], !context) return results;
                  compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length)
                } for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], !Expr.relative[type = token.type]);)
                  if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) { if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), results; break }
              } return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context), results
            }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function (div1) { return 1 & div1.compareDocumentPosition(document.createElement("div")) }), assert(function (div) { return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href") }) || addHandle("type|href|height|width", function (elem, name, isXML) { if (!isXML) return elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2) }), support.attributes && assert(function (div) { return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value") }) || addHandle("value", function (elem, name, isXML) { if (!isXML && "input" === elem.nodeName.toLowerCase()) return elem.defaultValue }), assert(function (div) { return null == div.getAttribute("disabled") }) || addHandle(booleans, function (elem, name, isXML) { var val; if (!isXML) return elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null }), Sizzle
          }(window);
          jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
          var dir = function (elem, dir, until) {
            for (var matched = [], truncate = void 0 !== until;
              (elem = elem[dir]) && 9 !== elem.nodeType;)
              if (1 === elem.nodeType) {
                if (truncate && jQuery(elem).is(until)) break;
                matched.push(elem)
              }
            return matched
          },
            siblings = function (n, elem) { for (var matched = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && matched.push(n); return matched },
            rneedsContext = jQuery.expr.match.needsContext,
            rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
            risSimple = /^.[^:#\[\.,]*$/;
          jQuery.filter = function (expr, elems, not) { var elem = elems[0]; return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) { return 1 === elem.nodeType })) }, jQuery.fn.extend({
            find: function (selector) {
              var i, len = this.length,
              ret = [],
              self = this; if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function () {
                for (i = 0; i < len; i++)
                  if (jQuery.contains(self[i], this)) return !0
              })); for (i = 0; i < len; i++) jQuery.find(selector, self[i], ret); return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, ret
            }, filter: function (selector) { return this.pushStack(winnow(this, selector || [], !1)) }, not: function (selector) { return this.pushStack(winnow(this, selector || [], !0)) }, is: function (selector) { return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length }
          });
          var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            init = jQuery.fn.init = function (selector, context, root) {
              var match, elem; if (!selector) return this; if (root = root || rootjQuery, "string" == typeof selector) {
                if (match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [null, selector, null] : rquickExpr.exec(selector), !match || !match[1] && context) return !context || context.jquery ? (context || root).find(selector) : this.constructor(context).find(selector); if (match[1]) {
                  if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context))
                    for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]); return this
                } return elem = document.getElementById(match[2]), elem && elem.parentNode && (this.length = 1, this[0] = elem), this.context = document, this.selector = selector, this
              } return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? void 0 !== root.ready ? root.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this))
            };
          init.prototype = jQuery.fn, rootjQuery = jQuery(document);
          var rparentsprev = /^(?:parents|prev(?:Until|All))/,
            guaranteedUnique = { children: !0, contents: !0, next: !0, prev: !0 };
          jQuery.fn.extend({
            has: function (target) {
              var targets = jQuery(target, this),
              l = targets.length; return this.filter(function () {
                for (var i = 0; i < l; i++)
                  if (jQuery.contains(this, targets[i])) return !0
              })
            }, closest: function (selectors, context) {
              for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; i < l; i++)
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode)
                  if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) { matched.push(cur); break }
              return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched)
            }, index: function (elem) { return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function (selector, context) { return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context)))) }, addBack: function (selector) { return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector)) }
          }), jQuery.each({ parent: function (elem) { var parent = elem.parentNode; return parent && 11 !== parent.nodeType ? parent : null }, parents: function (elem) { return dir(elem, "parentNode") }, parentsUntil: function (elem, i, until) { return dir(elem, "parentNode", until) }, next: function (elem) { return sibling(elem, "nextSibling") }, prev: function (elem) { return sibling(elem, "previousSibling") }, nextAll: function (elem) { return dir(elem, "nextSibling") }, prevAll: function (elem) { return dir(elem, "previousSibling") }, nextUntil: function (elem, i, until) { return dir(elem, "nextSibling", until) }, prevUntil: function (elem, i, until) { return dir(elem, "previousSibling", until) }, siblings: function (elem) { return siblings((elem.parentNode || {}).firstChild, elem) }, children: function (elem) { return siblings(elem.firstChild) }, contents: function (elem) { return elem.contentDocument || jQuery.merge([], elem.childNodes) } }, function (name, fn) { jQuery.fn[name] = function (until, selector) { var matched = jQuery.map(this, fn, until); return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (matched = jQuery.filter(selector, matched)), this.length > 1 && (guaranteedUnique[name] || jQuery.uniqueSort(matched), rparentsprev.test(name) && matched.reverse()), this.pushStack(matched) } });
          var rnotwhite = /\S+/g;
          jQuery.Callbacks = function (options) {
            options = "string" == typeof options ? createOptions(options) : jQuery.extend({}, options); var firing, memory, fired, locked, list = [],
              queue = [],
              firingIndex = -1,
              fire = function () {
                for (locked = options.once, fired = firing = !0; queue.length; firingIndex = -1)
                  for (memory = queue.shift(); ++firingIndex < list.length;) list[firingIndex].apply(memory[0], memory[1]) === !1 && options.stopOnFalse && (firingIndex = list.length, memory = !1);
                options.memory || (memory = !1), firing = !1, locked && (list = memory ? [] : "")
              },
              self = {
                add: function () { return list && (memory && !firing && (firingIndex = list.length - 1, queue.push(memory)), function add(args) { jQuery.each(args, function (_, arg) { jQuery.isFunction(arg) ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== jQuery.type(arg) && add(arg) }) }(arguments), memory && !firing && fire()), this }, remove: function () {
                  return jQuery.each(arguments, function (_, arg) {
                    for (var index;
                      (index = jQuery.inArray(arg, list, index)) > -1;) list.splice(index, 1), index <= firingIndex && firingIndex--
                  }), this
                }, has: function (fn) { return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0 }, empty: function () { return list && (list = []), this }, disable: function () { return locked = queue = [], list = memory = "", this }, disabled: function () { return !list }, lock: function () { return locked = queue = [], memory || (list = memory = ""), this }, locked: function () { return !!locked }, fireWith: function (context, args) { return locked || (args = args || [], args = [context, args.slice ? args.slice() : args], queue.push(args), firing || fire()), this }, fire: function () { return self.fireWith(this, arguments), this }, fired: function () { return !!fired }
              }; return self
          }, jQuery.extend({
            Deferred: function (func) {
              var tuples = [
                ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                ["notify", "progress", jQuery.Callbacks("memory")]
              ],
              state = "pending",
              promise = {
                state: function () { return state }, always: function () { return deferred.done(arguments).fail(arguments), this }, then: function () {
                  var fns = arguments; return jQuery.Deferred(function (newDefer) {
                    jQuery.each(tuples, function (i, tuple) {
                      var fn = jQuery.isFunction(fns[i]) && fns[i];
                      deferred[tuple[1]](function () {
                        var returned = fn && fn.apply(this, arguments);
                        returned && jQuery.isFunction(returned.promise) ? returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                      })
                    }), fns = null
                  }).promise()
                }, promise: function (obj) { return null != obj ? jQuery.extend(obj, promise) : promise }
              },
              deferred = {}; return promise.pipe = promise.then, jQuery.each(tuples, function (i, tuple) {
                var list = tuple[2],
                stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function () { state = stateString }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function () { return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this }, deferred[tuple[0] + "With"] = list.fireWith
              }), promise.promise(deferred), func && func.call(deferred, deferred), deferred
            }, when: function (subordinate) {
              var progressValues, progressContexts, resolveContexts, i = 0,
              resolveValues = slice.call(arguments),
              length = resolveValues.length,
              remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
              deferred = 1 === remaining ? subordinate : jQuery.Deferred(),
              updateFunc = function (i, contexts, values) { return function (value) { contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values) } }; if (length > 1)
                for (progressValues = new Array(length), progressContexts = new Array(length), resolveContexts = new Array(length); i < length; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject) : --remaining; return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise()
            }
          });
          var readyList;
          jQuery.fn.ready = function (fn) { return jQuery.ready.promise().done(fn), this }, jQuery.extend({
            isReady: !1, readyWait: 1, holdReady: function (hold) { hold ? jQuery.readyWait++ : jQuery.ready(!0) }, ready: function (wait) {
              (wait === !0 ? --jQuery.readyWait : jQuery.isReady) || (jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [jQuery]), jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready"))))
            }
          }), jQuery.ready.promise = function (obj) { return readyList || (readyList = jQuery.Deferred(), "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? window.setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed), window.addEventListener("load", completed))), readyList.promise(obj) }, jQuery.ready.promise();
          var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0,
            len = elems.length,
            bulk = null == key; if ("object" === jQuery.type(key)) { chainable = !0; for (i in key) access(elems, fn, i, key[i], !0, emptyGet, raw) } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function (elem, key, value) { return bulk.call(jQuery(elem), value) })), fn))
              for (; i < len; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key))); return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet
          },
            acceptData = function (owner) { return 1 === owner.nodeType || 9 === owner.nodeType || !+owner.nodeType };
          Data.uid = 1, Data.prototype = {
            register: function (owner, initial) { var value = initial || {}; return owner.nodeType ? owner[this.expando] = value : Object.defineProperty(owner, this.expando, { value: value, writable: !0, configurable: !0 }), owner[this.expando] }, cache: function (owner) { if (!acceptData(owner)) return {}; var value = owner[this.expando]; return value || (value = {}, acceptData(owner) && (owner.nodeType ? owner[this.expando] = value : Object.defineProperty(owner, this.expando, { value: value, configurable: !0 }))), value }, set: function (owner, data, value) {
              var prop, cache = this.cache(owner); if ("string" == typeof data) cache[data] = value;
              else
                for (prop in data) cache[prop] = data[prop]; return cache
            }, get: function (owner, key) { return void 0 === key ? this.cache(owner) : owner[this.expando] && owner[this.expando][key] }, access: function (owner, key, value) { var stored; return void 0 === key || key && "string" == typeof key && void 0 === value ? (stored = this.get(owner, key), void 0 !== stored ? stored : this.get(owner, jQuery.camelCase(key))) : (this.set(owner, key, value), void 0 !== value ? value : key) }, remove: function (owner, key) {
              var i, name, camel, cache = owner[this.expando]; if (void 0 !== cache) {
                if (void 0 === key) this.register(owner);
                else { jQuery.isArray(key) ? name = key.concat(key.map(jQuery.camelCase)) : (camel = jQuery.camelCase(key), key in cache ? name = [key, camel] : (name = camel, name = name in cache ? [name] : name.match(rnotwhite) || [])), i = name.length; for (; i--;) delete cache[name[i]] } (void 0 === key || jQuery.isEmptyObject(cache)) && (owner.nodeType ? owner[this.expando] = void 0 : delete owner[this.expando])
              }
            }, hasData: function (owner) { var cache = owner[this.expando]; return void 0 !== cache && !jQuery.isEmptyObject(cache) }
          };
          var dataPriv = new Data,
            dataUser = new Data,
            rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            rmultiDash = /[A-Z]/g;
          jQuery.extend({ hasData: function (elem) { return dataUser.hasData(elem) || dataPriv.hasData(elem) }, data: function (elem, name, data) { return dataUser.access(elem, name, data) }, removeData: function (elem, name) { dataUser.remove(elem, name) }, _data: function (elem, name, data) { return dataPriv.access(elem, name, data) }, _removeData: function (elem, name) { dataPriv.remove(elem, name) } }), jQuery.fn.extend({
            data: function (key, value) {
              var i, name, data, elem = this[0],
              attrs = elem && elem.attributes; if (void 0 === key) {
                if (this.length && (data = dataUser.get(elem), 1 === elem.nodeType && !dataPriv.get(elem, "hasDataAttrs"))) {
                  for (i = attrs.length; i--;) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), dataAttr(elem, name, data[name])));
                  dataPriv.set(elem, "hasDataAttrs", !0)
                } return data
              } return "object" == typeof key ? this.each(function () { dataUser.set(this, key) }) : access(this, function (value) {
                var data, camelKey; if (elem && void 0 === value) { if (data = dataUser.get(elem, key) || dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase()), void 0 !== data) return data; if (camelKey = jQuery.camelCase(key), data = dataUser.get(elem, camelKey), void 0 !== data) return data; if (data = dataAttr(elem, camelKey, void 0), void 0 !== data) return data } else camelKey = jQuery.camelCase(key), this.each(function () {
                  var data = dataUser.get(this, camelKey);
                  dataUser.set(this, camelKey, value), key.indexOf("-") > -1 && void 0 !== data && dataUser.set(this, key, value)
                })
              }, null, value, arguments.length > 1, null, !0)
            }, removeData: function (key) { return this.each(function () { dataUser.remove(this, key) }) }
          }), jQuery.extend({
            queue: function (elem, type, data) { var queue; if (elem) return type = (type || "fx") + "queue", queue = dataPriv.get(elem, type), data && (!queue || jQuery.isArray(data) ? queue = dataPriv.access(elem, type, jQuery.makeArray(data)) : queue.push(data)), queue || [] }, dequeue: function (elem, type) {
              type = type || "fx"; var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function () { jQuery.dequeue(elem, type) }; "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire()
            }, _queueHooks: function (elem, type) { var key = type + "queueHooks"; return dataPriv.get(elem, key) || dataPriv.access(elem, key, { empty: jQuery.Callbacks("once memory").add(function () { dataPriv.remove(elem, [type + "queue", key]) }) }) }
          }), jQuery.fn.extend({
            queue: function (type, data) {
              var setter = 2; return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function () {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type)
              })
            }, dequeue: function (type) { return this.each(function () { jQuery.dequeue(this, type) }) }, clearQueue: function (type) { return this.queue(type || "fx", []) }, promise: function (type, obj) {
              var tmp, count = 1,
              defer = jQuery.Deferred(),
              elements = this,
              i = this.length,
              resolve = function () { --count || defer.resolveWith(elements, [elements]) }; for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--;) tmp = dataPriv.get(elements[i], type + "queueHooks"), tmp && tmp.empty && (count++ , tmp.empty.add(resolve)); return resolve(), defer.promise(obj)
            }
          });
          var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
            cssExpand = ["Top", "Right", "Bottom", "Left"],
            isHidden = function (elem, el) { return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem) },
            rcheckableType = /^(?:checkbox|radio)$/i,
            rtagName = /<([\w:-]+)/,
            rscriptType = /^$|\/(?:java|ecma)script/i,
            wrapMap = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };
          wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td;
          var rhtml = /<|&#?\w+;/;
          ! function () {
            var fragment = document.createDocumentFragment(),
            div = fragment.appendChild(document.createElement("div")),
            input = document.createElement("input");
            input.setAttribute("type", "radio"), input.setAttribute("checked", "checked"), input.setAttribute("name", "t"), div.appendChild(input), support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue
          }();
          var rkeyEvent = /^key/,
            rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
          jQuery.event = {
            global: {}, add: function (elem, types, handler, data, selector) {
              var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem); if (elemData)
                for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function (e) { return "undefined" != typeof jQuery && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0 }), types = (types || "").match(rnotwhite) || [""], t = types.length; t--;) tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, handleObj = jQuery.extend({ type: type, origType: origType, data: data, handler: handler, guid: handler.guid, selector: selector, needsContext: selector && jQuery.expr.match.needsContext.test(selector), namespace: namespaces.join(".") }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || elem.addEventListener && elem.addEventListener(type, eventHandle)), special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), jQuery.event.global[type] = !0)
            }, remove: function (elem, types, handler, selector, mappedTypes) {
              var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem); if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnotwhite) || [""], t = types.length; t--;)
                  if (tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), origCount = j = handlers.length; j--;) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), handleObj.selector && handlers.delegateCount-- , special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), delete events[type])
                  } else
                    for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && dataPriv.remove(elem, "handle events")
              }
            }, dispatch: function (event) {
              event = jQuery.event.fix(event); var i, j, ret, matched, handleObj, handlerQueue = [],
                args = slice.call(arguments),
                handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
                special = jQuery.event.special[event.type] || {}; if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                  for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0;
                    (matched = handlerQueue[i++]) && !event.isPropagationStopped();)
                    for (event.currentTarget = matched.elem, j = 0;
                      (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();) event.rnamespace && !event.rnamespace.test(handleObj.namespace) || (event.handleObj = handleObj, event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation())); return special.postDispatch && special.postDispatch.call(this, event), event.result
                }
            }, handlers: function (event, handlers) {
              var i, matches, sel, handleObj, handlerQueue = [],
              delegateCount = handlers.delegateCount,
              cur = event.target; if (delegateCount && cur.nodeType && ("click" !== event.type || isNaN(event.button) || event.button < 1))
                for (; cur !== this; cur = cur.parentNode || this)
                  if (1 === cur.nodeType && (cur.disabled !== !0 || "click" !== event.type)) {
                    for (matches = [], i = 0; i < delegateCount; i++) handleObj = handlers[i], sel = handleObj.selector + " ", void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length), matches[sel] && matches.push(handleObj);
                    matches.length && handlerQueue.push({ elem: cur, handlers: matches })
                  }
              return delegateCount < handlers.length && handlerQueue.push({ elem: this, handlers: handlers.slice(delegateCount) }), handlerQueue
            }, props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function (event, original) { return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), event } }, mouseHooks: { props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (event, original) { var eventDoc, doc, body, button = original.button; return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), event } }, fix: function (event) {
              if (event[jQuery.expando]) return event; var i, prop, copy, type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[type]; for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), i = copy.length; i--;) prop = copy[i], event[prop] = originalEvent[prop]; return event.target || (event.target = document), 3 === event.target.nodeType && (event.target = event.target.parentNode), fixHook.filter ? fixHook.filter(event, originalEvent) : event
            }, special: { load: { noBubble: !0 }, focus: { trigger: function () { if (this !== safeActiveElement() && this.focus) return this.focus(), !1 }, delegateType: "focusin" }, blur: { trigger: function () { if (this === safeActiveElement() && this.blur) return this.blur(), !1 }, delegateType: "focusout" }, click: { trigger: function () { if ("checkbox" === this.type && this.click && jQuery.nodeName(this, "input")) return this.click(), !1 }, _default: function (event) { return jQuery.nodeName(event.target, "a") } }, beforeunload: { postDispatch: function (event) { void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result) } } }
          }, jQuery.removeEvent = function (elem, type, handle) { elem.removeEventListener && elem.removeEventListener(type, handle) }, jQuery.Event = function (src, props) { return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src, props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props) }, jQuery.Event.prototype = {
            constructor: jQuery.Event,
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            preventDefault: function () {
              var e = this.originalEvent;
              this.isDefaultPrevented = returnTrue, e && e.preventDefault()
            },
            stopPropagation: function () {
              var e = this.originalEvent;
              this.isPropagationStopped = returnTrue, e && e.stopPropagation()
            },
            stopImmediatePropagation: function () {
              var e = this.originalEvent;
              this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation(), this.stopPropagation()
            }
          }, jQuery.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (orig, fix) {
            jQuery.event.special[orig] = {
              delegateType: fix, bindType: fix, handle: function (event) {
                var ret, target = this,
                related = event.relatedTarget,
                handleObj = event.handleObj; return related && (related === target || jQuery.contains(target, related)) || (event.type = handleObj.origType, ret = handleObj.handler.apply(this, arguments), event.type = fix), ret
              }
            }
          }), jQuery.fn.extend({ on: function (types, selector, data, fn) { return on(this, types, selector, data, fn) }, one: function (types, selector, data, fn) { return on(this, types, selector, data, fn, 1) }, off: function (types, selector, fn) { var handleObj, type; if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this; if ("object" == typeof types) { for (type in types) this.off(type, selector, types[type]); return this } return selector !== !1 && "function" != typeof selector || (fn = selector, selector = void 0), fn === !1 && (fn = returnFalse), this.each(function () { jQuery.event.remove(this, types, fn, selector) }) } });
          var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
            rnoInnerhtml = /<script|<style|<link/i,
            rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
            rscriptTypeMasked = /^true\/(.*)/,
            rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
          jQuery.extend({
            htmlPrefilter: function (html) { return html.replace(rxhtmlTag, "<$1></$2>") }, clone: function (elem, dataAndEvents, deepDataAndEvents) {
              var i, l, srcElements, destElements, clone = elem.cloneNode(!0),
              inPage = jQuery.contains(elem.ownerDocument, elem); if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem)))
                for (destElements = getAll(clone), srcElements = getAll(elem), i = 0, l = srcElements.length; i < l; i++) fixInput(srcElements[i], destElements[i]); if (dataAndEvents)
                if (deepDataAndEvents)
                  for (srcElements = srcElements || getAll(elem), destElements = destElements || getAll(clone), i = 0, l = srcElements.length; i < l; i++) cloneCopyEvent(srcElements[i], destElements[i]);
                else cloneCopyEvent(elem, clone); return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), clone
            }, cleanData: function (elems) {
              for (var data, elem, type, special = jQuery.event.special, i = 0; void 0 !== (elem = elems[i]); i++)
                if (acceptData(elem)) {
                  if (data = elem[dataPriv.expando]) {
                    if (data.events)
                      for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                    elem[dataPriv.expando] = void 0
                  } elem[dataUser.expando] && (elem[dataUser.expando] = void 0)
                }
            }
          }), jQuery.fn.extend({
            domManip: domManip, detach: function (selector) { return remove(this, selector, !0) }, remove: function (selector) { return remove(this, selector) }, text: function (value) { return access(this, function (value) { return void 0 === value ? jQuery.text(this) : this.empty().each(function () { 1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = value) }) }, null, value, arguments.length) }, append: function () {
              return domManip(this, arguments, function (elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                  var target = manipulationTarget(this, elem);
                  target.appendChild(elem)
                }
              })
            }, prepend: function () {
              return domManip(this, arguments, function (elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                  var target = manipulationTarget(this, elem);
                  target.insertBefore(elem, target.firstChild)
                }
              })
            }, before: function () { return domManip(this, arguments, function (elem) { this.parentNode && this.parentNode.insertBefore(elem, this) }) }, after: function () { return domManip(this, arguments, function (elem) { this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling) }) }, empty: function () { for (var elem, i = 0; null != (elem = this[i]); i++) 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.textContent = ""); return this }, clone: function (dataAndEvents, deepDataAndEvents) { return dataAndEvents = null != dataAndEvents && dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, this.map(function () { return jQuery.clone(this, dataAndEvents, deepDataAndEvents) }) }, html: function (value) {
              return access(this, function (value) {
                var elem = this[0] || {},
                i = 0,
                l = this.length; if (void 0 === value && 1 === elem.nodeType) return elem.innerHTML; if ("string" == typeof value && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                  value = jQuery.htmlPrefilter(value); try {
                    for (; i < l; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), elem.innerHTML = value);
                    elem = 0
                  } catch (e) { }
                } elem && this.empty().append(value)
              }, null, value, arguments.length)
            }, replaceWith: function () {
              var ignored = []; return domManip(this, arguments, function (elem) {
                var parent = this.parentNode;
                jQuery.inArray(this, ignored) < 0 && (jQuery.cleanData(getAll(this)), parent && parent.replaceChild(elem, this))
              }, ignored)
            }
          }), jQuery.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (name, original) { jQuery.fn[name] = function (selector) { for (var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0; i <= last; i++) elems = i === last ? this : this.clone(!0), jQuery(insert[i])[original](elems), push.apply(ret, elems.get()); return this.pushStack(ret) } });
          var iframe, elemdisplay = { HTML: "block", BODY: "block" },
            rmargin = /^margin/,
            rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"),
            getStyles = function (elem) { var view = elem.ownerDocument.defaultView; return view && view.opener || (view = window), view.getComputedStyle(elem) },
            swap = function (elem, options, callback, args) {
              var ret, name, old = {}; for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
              ret = callback.apply(elem, args || []); for (name in options) elem.style[name] = old[name]; return ret
            },
            documentElement = document.documentElement;
          ! function () {
            function computeStyleTests() {
              div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", div.innerHTML = "", documentElement.appendChild(container); var divStyle = window.getComputedStyle(div);
              pixelPositionVal = "1%" !== divStyle.top, reliableMarginLeftVal = "2px" === divStyle.marginLeft, boxSizingReliableVal = "4px" === divStyle.width, div.style.marginRight = "50%", pixelMarginRightVal = "4px" === divStyle.marginRight, documentElement.removeChild(container)
            } var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal, container = document.createElement("div"),
              div = document.createElement("div");
            div.style && (div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", support.clearCloneStyle = "content-box" === div.style.backgroundClip, container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", container.appendChild(div), jQuery.extend(support, { pixelPosition: function () { return computeStyleTests(), pixelPositionVal }, boxSizingReliable: function () { return null == boxSizingReliableVal && computeStyleTests(), boxSizingReliableVal }, pixelMarginRight: function () { return null == boxSizingReliableVal && computeStyleTests(), pixelMarginRightVal }, reliableMarginLeft: function () { return null == boxSizingReliableVal && computeStyleTests(), reliableMarginLeftVal }, reliableMarginRight: function () { var ret, marginDiv = div.appendChild(document.createElement("div")); return marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", documentElement.appendChild(container), ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight), documentElement.removeChild(container), div.removeChild(marginDiv), ret } }))
          }();
          var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
            cssShow = { position: "absolute", visibility: "hidden", display: "block" },
            cssNormalTransform = { letterSpacing: "0", fontWeight: "400" },
            cssPrefixes = ["Webkit", "O", "Moz", "ms"],
            emptyStyle = document.createElement("div").style;
          jQuery.extend({
            cssHooks: { opacity: { get: function (elem, computed) { if (computed) { var ret = curCSS(elem, "opacity"); return "" === ret ? "1" : ret } } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { float: "cssFloat" }, style: function (elem, name, value, extra) {
              if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name),
                style = elem.style; return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value ? hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name] : (type = typeof value, "string" === type && (ret = rcssNum.exec(value)) && ret[1] && (value = adjustCSS(elem, name, ret), type = "number"), null != value && value === value && ("number" === type && (value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px")), support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)) || (style[name] = value)), void 0)
              }
            }, css: function (elem, name, extra, styles) { var val, num, hooks, origName = jQuery.camelCase(name); return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), "" === extra || extra ? (num = parseFloat(val), extra === !0 || isFinite(num) ? num || 0 : val) : val }
          }), jQuery.each(["height", "width"], function (i, name) {
          jQuery.cssHooks[name] = {
            get: function (elem, computed, extra) { if (computed) return rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? swap(elem, cssShow, function () { return getWidthOrHeight(elem, name, extra) }) : getWidthOrHeight(elem, name, extra) }, set: function (elem, value, extra) {
              var matches, styles = extra && getStyles(elem),
              subtract = extra && augmentWidthOrHeight(elem, name, extra, "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles); return subtract && (matches = rcssNum.exec(value)) && "px" !== (matches[3] || "px") && (elem.style[name] = value, value = jQuery.css(elem, name)), setPositiveNumber(elem, value, subtract)
            }
          }
          }), jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) { if (computed) return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () { return elem.getBoundingClientRect().left })) + "px" }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function (elem, computed) { if (computed) return swap(elem, { display: "inline-block" }, curCSS, [elem, "marginRight"]) }), jQuery.each({ margin: "", padding: "", border: "Width" }, function (prefix, suffix) { jQuery.cssHooks[prefix + suffix] = { expand: function (value) { for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [value]; i < 4; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]; return expanded } }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber) }), jQuery.fn.extend({
            css: function (name, value) {
              return access(this, function (elem, name, value) {
                var styles, len, map = {},
                i = 0; if (jQuery.isArray(name)) { for (styles = getStyles(elem), len = name.length; i < len; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles); return map } return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
              }, name, value, arguments.length > 1)
            }, show: function () { return showHide(this, !0) }, hide: function () { return showHide(this) }, toggle: function (state) { return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function () { isHidden(this) ? jQuery(this).show() : jQuery(this).hide() }) }
          }), jQuery.Tween = Tween, Tween.prototype = { constructor: Tween, init: function (elem, options, prop, end, easing, unit) { this.elem = elem, this.prop = prop, this.easing = easing || jQuery.easing._default, this.options = options, this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px") }, cur: function () { var hooks = Tween.propHooks[this.prop]; return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this) }, run: function (percent) { var eased, hooks = Tween.propHooks[this.prop]; return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this } }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = { _default: { get: function (tween) { var result; return 1 !== tween.elem.nodeType || null != tween.elem[tween.prop] && null == tween.elem.style[tween.prop] ? tween.elem[tween.prop] : (result = jQuery.css(tween.elem, tween.prop, ""), result && "auto" !== result ? result : 0) }, set: function (tween) { jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : 1 !== tween.elem.nodeType || null == tween.elem.style[jQuery.cssProps[tween.prop]] && !jQuery.cssHooks[tween.prop] ? tween.elem[tween.prop] = tween.now : jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) } } }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = { set: function (tween) { tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now) } }, jQuery.easing = { linear: function (p) { return p }, swing: function (p) { return .5 - Math.cos(p * Math.PI) / 2 }, _default: "swing" }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
          var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
            rrun = /queueHooks$/;
          jQuery.Animation = jQuery.extend(Animation, { tweeners: { "*": [function (prop, value) { var tween = this.createTween(prop, value); return adjustCSS(tween.elem, prop, rcssNum.exec(value), tween), tween }] }, tweener: function (props, callback) { jQuery.isFunction(props) ? (callback = props, props = ["*"]) : props = props.match(rnotwhite); for (var prop, index = 0, length = props.length; index < length; index++) prop = props[index], Animation.tweeners[prop] = Animation.tweeners[prop] || [], Animation.tweeners[prop].unshift(callback) }, prefilters: [defaultPrefilter], prefilter: function (callback, prepend) { prepend ? Animation.prefilters.unshift(callback) : Animation.prefilters.push(callback) } }), jQuery.speed = function (speed, easing, fn) { var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : { complete: fn || !fn && easing || jQuery.isFunction(speed) && speed, duration: speed, easing: fn && easing || easing && !jQuery.isFunction(easing) && easing }; return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, null != opt.queue && opt.queue !== !0 || (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function () { jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue) }, opt }, jQuery.fn.extend({
            fadeTo: function (speed, to, easing, callback) { return this.filter(isHidden).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback) }, animate: function (prop, speed, easing, callback) {
              var empty = jQuery.isEmptyObject(prop),
              optall = jQuery.speed(speed, easing, callback),
              doAnimation = function () {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || dataPriv.get(this, "finish")) && anim.stop(!0)
              }; return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
            }, stop: function (type, clearQueue, gotoEnd) {
              var stopQueue = function (hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd)
              }; return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function () {
                var dequeue = !0,
                index = null != type && type + "queueHooks",
                timers = jQuery.timers,
                data = dataPriv.get(this); if (index) data[index] && data[index].stop && stopQueue(data[index]);
                else
                  for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]); for (index = timers.length; index--;) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), dequeue = !1, timers.splice(index, 1)); !dequeue && gotoEnd || jQuery.dequeue(this, type)
              })
            }, finish: function (type) {
              return type !== !1 && (type = type || "fx"), this.each(function () {
                var index, data = dataPriv.get(this),
                queue = data[type + "queue"],
                hooks = data[type + "queueHooks"],
                timers = jQuery.timers,
                length = queue ? queue.length : 0; for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), index = timers.length; index--;) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), timers.splice(index, 1)); for (index = 0; index < length; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish
              })
            }
          }), jQuery.each(["toggle", "show", "hide"], function (i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function (speed, easing, callback) { return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback) }
          }), jQuery.each({ slideDown: genFx("show"), slideUp: genFx("hide"), slideToggle: genFx("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (name, props) { jQuery.fn[name] = function (speed, easing, callback) { return this.animate(props, speed, easing, callback) } }), jQuery.timers = [], jQuery.fx.tick = function () {
            var timer, i = 0,
            timers = jQuery.timers; for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
            timers.length || jQuery.fx.stop(), fxNow = void 0
          }, jQuery.fx.timer = function (timer) { jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop() }, jQuery.fx.interval = 13, jQuery.fx.start = function () { timerId || (timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval)) }, jQuery.fx.stop = function () { window.clearInterval(timerId), timerId = null }, jQuery.fx.speeds = { slow: 600, fast: 200, _default: 400 }, jQuery.fn.delay = function (time, type) {
            return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function (next, hooks) {
              var timeout = window.setTimeout(next, time);
              hooks.stop = function () { window.clearTimeout(timeout) }
            })
          },
            function () {
              var input = document.createElement("input"),
              select = document.createElement("select"),
              opt = select.appendChild(document.createElement("option"));
              input.type = "checkbox", support.checkOn = "" !== input.value, support.optSelected = opt.selected, select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), input.value = "t", input.type = "radio", support.radioValue = "t" === input.value
            }();
          var boolHook, attrHandle = jQuery.expr.attrHandle;
          jQuery.fn.extend({ attr: function (name, value) { return access(this, jQuery.attr, name, value, arguments.length > 1) }, removeAttr: function (name) { return this.each(function () { jQuery.removeAttr(this, name) }) } }), jQuery.extend({
            attr: function (elem, name, value) { var ret, hooks, nType = elem.nodeType; if (3 !== nType && 8 !== nType && 2 !== nType) return "undefined" == typeof elem.getAttribute ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : void 0)), void 0 !== value ? null === value ? void jQuery.removeAttr(elem, name) : hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), value) : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), null == ret ? void 0 : ret)) }, attrHooks: { type: { set: function (elem, value) { if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) { var val = elem.value; return elem.setAttribute("type", value), val && (elem.value = val), value } } } }, removeAttr: function (elem, value) {
              var name, propName, i = 0,
              attrNames = value && value.match(rnotwhite); if (attrNames && 1 === elem.nodeType)
                for (; name = attrNames[i++];) propName = jQuery.propFix[name] || name, jQuery.expr.match.bool.test(name) && (elem[propName] = !1), elem.removeAttribute(name)
            }
          }), boolHook = { set: function (elem, value, name) { return value === !1 ? jQuery.removeAttr(elem, name) : elem.setAttribute(name, name), name } }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
            var getter = attrHandle[name] || jQuery.find.attr;
            attrHandle[name] = function (elem, name, isXML) { var ret, handle; return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, attrHandle[name] = handle), ret }
          });
          var rfocusable = /^(?:input|select|textarea|button)$/i,
            rclickable = /^(?:a|area)$/i;
          jQuery.fn.extend({ prop: function (name, value) { return access(this, jQuery.prop, name, value, arguments.length > 1) }, removeProp: function (name) { return this.each(function () { delete this[jQuery.propFix[name] || name] }) } }), jQuery.extend({ prop: function (elem, name, value) { var ret, hooks, nType = elem.nodeType; if (3 !== nType && 8 !== nType && 2 !== nType) return 1 === nType && jQuery.isXMLDoc(elem) || (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name] }, propHooks: { tabIndex: { get: function (elem) { var tabindex = jQuery.find.attr(elem, "tabindex"); return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1 } } }, propFix: { for: "htmlFor", class: "className" } }), support.optSelected || (jQuery.propHooks.selected = {
            get: function (elem) { var parent = elem.parentNode; return parent && parent.parentNode && parent.parentNode.selectedIndex, null }, set: function (elem) {
              var parent = elem.parentNode;
              parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex)
            }
          }), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () { jQuery.propFix[this.toLowerCase()] = this });
          var rclass = /[\t\r\n\f]/g;
          jQuery.fn.extend({
            addClass: function (value) {
              var classes, elem, cur, curValue, clazz, j, finalValue, i = 0; if (jQuery.isFunction(value)) return this.each(function (j) { jQuery(this).addClass(value.call(this, j, getClass(this))) }); if ("string" == typeof value && value)
                for (classes = value.match(rnotwhite) || []; elem = this[i++];)
                  if (curValue = getClass(elem), cur = 1 === elem.nodeType && (" " + curValue + " ").replace(rclass, " ")) {
                    for (j = 0; clazz = classes[j++];) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                    finalValue = jQuery.trim(cur), curValue !== finalValue && elem.setAttribute("class", finalValue)
                  }
              return this
            }, removeClass: function (value) {
              var classes, elem, cur, curValue, clazz, j, finalValue, i = 0; if (jQuery.isFunction(value)) return this.each(function (j) { jQuery(this).removeClass(value.call(this, j, getClass(this))) }); if (!arguments.length) return this.attr("class", ""); if ("string" == typeof value && value)
                for (classes = value.match(rnotwhite) || []; elem = this[i++];)
                  if (curValue = getClass(elem), cur = 1 === elem.nodeType && (" " + curValue + " ").replace(rclass, " ")) {
                    for (j = 0; clazz = classes[j++];)
                      for (; cur.indexOf(" " + clazz + " ") > -1;) cur = cur.replace(" " + clazz + " ", " ");
                    finalValue = jQuery.trim(cur), curValue !== finalValue && elem.setAttribute("class", finalValue)
                  }
              return this
            }, toggleClass: function (value, stateVal) {
              var type = typeof value; return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function (i) { jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal) }) : this.each(function () {
                var className, i, self, classNames; if ("string" === type)
                  for (i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++];) self.hasClass(className) ? self.removeClass(className) : self.addClass(className);
                else void 0 !== value && "boolean" !== type || (className = getClass(this), className && dataPriv.set(this, "__className__", className), this.setAttribute && this.setAttribute("class", className || value === !1 ? "" : dataPriv.get(this, "__className__") || ""))
              })
            }, hasClass: function (selector) {
              var className, elem, i = 0; for (className = " " + selector + " "; elem = this[i++];)
                if (1 === elem.nodeType && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) return !0; return !1
            }
          });
          var rreturn = /\r/g,
            rspaces = /[\x20\t\r\n\f]+/g;
          jQuery.fn.extend({
            val: function (value) {
              var hooks, ret, isFunction, elem = this[0]; {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function (i) {
                  var val;
                  1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function (value) { return null == value ? "" : value + "" })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val))
                }); if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret)
              }
            }
          }), jQuery.extend({
            valHooks: {
              option: { get: function (elem) { var val = jQuery.find.attr(elem, "value"); return null != val ? val : jQuery.trim(jQuery.text(elem)).replace(rspaces, " ") } }, select: {
                get: function (elem) {
                  for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0; i < max; i++)
                    if (option = options[i], (option.selected || i === index) && (support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                      if (value = jQuery(option).val(), one) return value;
                      values.push(value)
                    }
                  return values
                }, set: function (elem, value) { for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--;) option = options[i], (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) && (optionSet = !0); return optionSet || (elem.selectedIndex = -1), values }
              }
            }
          }), jQuery.each(["radio", "checkbox"], function () { jQuery.valHooks[this] = { set: function (elem, value) { if (jQuery.isArray(value)) return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1 } }, support.checkOn || (jQuery.valHooks[this].get = function (elem) { return null === elem.getAttribute("value") ? "on" : elem.value }) });
          var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
          jQuery.extend(jQuery.event, {
            trigger: function (event, data, elem, onlyHandlers) {
              var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document],
              type = hasOwn.call(event, "type") ? event.type : event,
              namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : []; if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") > -1 && (namespaces = type.split("."), type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = void 0, event.target || (event.target = elem), data = null == data ? [event] : jQuery.makeArray(data, [event]), special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                  for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), tmp = cur;
                  tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                } for (i = 0;
                  (cur = eventPath[i++]) && !event.isPropagationStopped();) event.type = i > 1 ? bubbleType : special.bindType || type, handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle"), handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && acceptData(cur) && (event.result = handle.apply(cur, data), event.result === !1 && event.preventDefault()); return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(eventPath.pop(), data) !== !1 || !acceptData(elem) || ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem) && (tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = void 0, tmp && (elem[ontype] = tmp)), event.result
              }
            }, simulate: function (type, elem, event) {
              var e = jQuery.extend(new jQuery.Event, event, { type: type, isSimulated: !0 });
              jQuery.event.trigger(e, null, elem), e.isDefaultPrevented() && event.preventDefault()
            }
          }), jQuery.fn.extend({ trigger: function (type, data) { return this.each(function () { jQuery.event.trigger(type, data, this) }) }, triggerHandler: function (type, data) { var elem = this[0]; if (elem) return jQuery.event.trigger(type, data, elem, !0) } }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (i, name) { jQuery.fn[name] = function (data, fn) { return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name) } }), jQuery.fn.extend({ hover: function (fnOver, fnOut) { return this.mouseenter(fnOver).mouseleave(fnOut || fnOver) } }), support.focusin = "onfocusin" in window, support.focusin || jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {
            var handler = function (event) { jQuery.event.simulate(fix, event.target, jQuery.event.fix(event)) };
            jQuery.event.special[fix] = {
              setup: function () {
                var doc = this.ownerDocument || this,
                attaches = dataPriv.access(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0), dataPriv.access(doc, fix, (attaches || 0) + 1)
              }, teardown: function () {
                var doc = this.ownerDocument || this,
                attaches = dataPriv.access(doc, fix) - 1;
                attaches ? dataPriv.access(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), dataPriv.remove(doc, fix))
              }
            }
          });
          var location = window.location,
            nonce = jQuery.now(),
            rquery = /\?/;
          jQuery.parseJSON = function (data) { return JSON.parse(data + "") }, jQuery.parseXML = function (data) { var xml; if (!data || "string" != typeof data) return null; try { xml = (new window.DOMParser).parseFromString(data, "text/xml") } catch (e) { xml = void 0 } return xml && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), xml };
          var rhash = /#.*$/,
            rts = /([?&])_=[^&]*/,
            rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            rnoContent = /^(?:GET|HEAD)$/,
            rprotocol = /^\/\//,
            prefilters = {},
            transports = {},
            allTypes = "*/".concat("*"),
            originAnchor = document.createElement("a");
          originAnchor.href = location.href, jQuery.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: { url: location.href, type: "GET", isLocal: rlocalProtocol.test(location.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": allTypes, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": jQuery.parseJSON, "text xml": jQuery.parseXML }, flatOptions: { url: !0, context: !0 } },
            ajaxSetup: function (target, settings) { return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target) },
            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),
            ajax: function (url, options) {
              function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && window.clearTimeout(timeoutTimer), transport = void 0, responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && status < 300 || 304 === status, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess),
                  isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, !status && statusText || (statusText = "error", status < 0 && (status = 0))), jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", isSuccess ? deferred.resolveWith(callbackContext, [success, statusText, jqXHR]) : deferred.rejectWith(callbackContext, [jqXHR, statusText, error]), jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]), completeDeferred.fireWith(callbackContext, [jqXHR, statusText]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [jqXHR, s]), --jQuery.active || jQuery.event.trigger("ajaxStop")))
              }
              "object" == typeof url && (options = url, url = void 0), options = options || {};
              var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, fireGlobals, i, s = jQuery.ajaxSetup({}, options),
                callbackContext = s.context || s,
                globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                statusCode = s.statusCode || {},
                requestHeaders = {},
                requestHeadersNames = {},
                state = 0,
                strAbort = "canceled",
                jqXHR = {
                  readyState: 0, getResponseHeader: function (key) {
                    var match; if (2 === state) {
                      if (!responseHeaders)
                        for (responseHeaders = {}; match = rheaders.exec(responseHeadersString);) responseHeaders[match[1].toLowerCase()] = match[2];
                      match = responseHeaders[key.toLowerCase()]
                    } return null == match ? null : match
                  }, getAllResponseHeaders: function () { return 2 === state ? responseHeadersString : null }, setRequestHeader: function (name, value) { var lname = name.toLowerCase(); return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value), this }, overrideMimeType: function (type) { return state || (s.mimeType = type), this }, statusCode: function (map) {
                    var code; if (map)
                      if (state < 2)
                        for (code in map) statusCode[code] = [statusCode[code], map[code]];
                      else jqXHR.always(map[jqXHR.status]); return this
                  }, abort: function (statusText) { var finalText = statusText || strAbort; return transport && transport.abort(finalText), done(0, finalText), this }
                };
              if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//"), s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""], null == s.crossDomain) { urlAnchor = document.createElement("a"); try { urlAnchor.href = s.url, urlAnchor.href = urlAnchor.href, s.crossDomain = originAnchor.protocol + "//" + originAnchor.host != urlAnchor.protocol + "//" + urlAnchor.host } catch (e) { s.crossDomain = !0 } }
              if (s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
              fireGlobals = jQuery.event && s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
              for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
              if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
              strAbort = "abort";
              for (i in { success: 1, error: 1, complete: 1 }) jqXHR[i](s[i]);
              if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                if (jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [jqXHR, s]), 2 === state) return jqXHR;
                s.async && s.timeout > 0 && (timeoutTimer = window.setTimeout(function () { jqXHR.abort("timeout") }, s.timeout)); try { state = 1, transport.send(requestHeaders, done) } catch (e) {
                  if (!(state < 2)) throw e;
                  done(-1, e)
                }
              } else done(-1, "No Transport");
              return jqXHR
            },
            getJSON: function (url, data, callback) { return jQuery.get(url, data, callback, "json") },
            getScript: function (url, callback) { return jQuery.get(url, void 0, callback, "script") }
          }), jQuery.each(["get", "post"], function (i, method) { jQuery[method] = function (url, data, callback, type) { return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), jQuery.ajax(jQuery.extend({ url: url, type: method, dataType: type, data: data, success: callback }, jQuery.isPlainObject(url) && url)) } }), jQuery._evalUrl = function (url) { return jQuery.ajax({ url: url, type: "GET", dataType: "script", async: !1, global: !1, throws: !0 }) }, jQuery.fn.extend({
            wrapAll: function (html) { var wrap; return jQuery.isFunction(html) ? this.each(function (i) { jQuery(this).wrapAll(html.call(this, i)) }) : (this[0] && (wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function () { for (var elem = this; elem.firstElementChild;) elem = elem.firstElementChild; return elem }).append(this)), this) }, wrapInner: function (html) {
              return jQuery.isFunction(html) ? this.each(function (i) { jQuery(this).wrapInner(html.call(this, i)) }) : this.each(function () {
                var self = jQuery(this),
                contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html)
              })
            }, wrap: function (html) { var isFunction = jQuery.isFunction(html); return this.each(function (i) { jQuery(this).wrapAll(isFunction ? html.call(this, i) : html) }) }, unwrap: function () { return this.parent().each(function () { jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes) }).end() }
          }), jQuery.expr.filters.hidden = function (elem) { return !jQuery.expr.filters.visible(elem) }, jQuery.expr.filters.visible = function (elem) { return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0 };
          var r20 = /%20/g,
            rbracket = /\[\]$/,
            rCRLF = /\r?\n/g,
            rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
            rsubmittable = /^(?:input|select|textarea|keygen)/i;
          jQuery.param = function (a, traditional) {
            var prefix, s = [],
            add = function (key, value) { value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value) }; if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function () { add(this.name, this.value) });
            else
              for (prefix in a) buildParams(prefix, a[prefix], traditional, add); return s.join("&").replace(r20, "+")
          }, jQuery.fn.extend({ serialize: function () { return jQuery.param(this.serializeArray()) }, serializeArray: function () { return this.map(function () { var elements = jQuery.prop(this, "elements"); return elements ? jQuery.makeArray(elements) : this }).filter(function () { var type = this.type; return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type)) }).map(function (i, elem) { var val = jQuery(this).val(); return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) { return { name: elem.name, value: val.replace(rCRLF, "\r\n") } }) : { name: elem.name, value: val.replace(rCRLF, "\r\n") } }).get() } }), jQuery.ajaxSettings.xhr = function () { try { return new window.XMLHttpRequest } catch (e) { } };
          var xhrSuccessStatus = { 0: 200, 1223: 204 },
            xhrSupported = jQuery.ajaxSettings.xhr();
          support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, jQuery.ajaxTransport(function (options) {
            var callback, errorCallback; if (support.cors || xhrSupported && !options.crossDomain) return {
              send: function (headers, complete) {
                var i, xhr = options.xhr(); if (xhr.open(options.type, options.url, options.async, options.username, options.password), options.xhrFields)
                  for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest"); for (i in headers) xhr.setRequestHeader(i, headers[i]);
                callback = function (type) { return function () { callback && (callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null, "abort" === type ? xhr.abort() : "error" === type ? "number" != typeof xhr.status ? complete(0, "error") : complete(xhr.status, xhr.statusText) : complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "text" !== (xhr.responseType || "text") || "string" != typeof xhr.responseText ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders())) } }, xhr.onload = callback(), errorCallback = xhr.onerror = callback("error"), void 0 !== xhr.onabort ? xhr.onabort = errorCallback : xhr.onreadystatechange = function () { 4 === xhr.readyState && window.setTimeout(function () { callback && errorCallback() }) }, callback = callback("abort"); try { xhr.send(options.hasContent && options.data || null) } catch (e) { if (callback) throw e }
              }, abort: function () { callback && callback() }
            }
          }), jQuery.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function (text) { return jQuery.globalEval(text), text } } }), jQuery.ajaxPrefilter("script", function (s) { void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET") }), jQuery.ajaxTransport("script", function (s) { if (s.crossDomain) { var script, callback; return { send: function (_, complete) { script = jQuery("<script>").prop({ charset: s.scriptCharset, src: s.url }).on("load error", callback = function (evt) { script.remove(), callback = null, evt && complete("error" === evt.type ? 404 : 200, evt.type) }), document.head.appendChild(script[0]) }, abort: function () { callback && callback() } } } });
          var oldCallbacks = [],
            rjsonp = /(=)\?(?=&|$)|\?\?/;
          jQuery.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++; return this[callback] = !0, callback } }), jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) { var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data"); if (jsonProp || "jsonp" === s.dataTypes[0]) return callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function () { return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0] }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function () { responseContainer = arguments }, jqXHR.always(function () { void 0 === overwritten ? jQuery(window).removeProp(callbackName) : window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), responseContainer = overwritten = void 0 }), "script" }), jQuery.parseHTML = function (data, context, keepScripts) {
            if (!data || "string" != typeof data) return null; "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document; var parsed = rsingleTag.exec(data),
              scripts = !keepScripts && []; return parsed ? [context.createElement(parsed[1])] : (parsed = buildFragment([data], context, scripts), scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes))
          };
          var _load = jQuery.fn.load;
          jQuery.fn.load = function (url, params, callback) {
            if ("string" != typeof url && _load) return _load.apply(this, arguments); var selector, type, response, self = this,
              off = url.indexOf(" "); return off > -1 && (selector = jQuery.trim(url.slice(off)), url = url.slice(0, off)), jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), self.length > 0 && jQuery.ajax({ url: url, type: type || "GET", dataType: "html", data: params }).done(function (responseText) { response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText) }).always(callback && function (jqXHR, status) { self.each(function () { callback.apply(this, response || [jqXHR.responseText, status, jqXHR]) }) }), this
          }, jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) { jQuery.fn[type] = function (fn) { return this.on(type, fn) } }), jQuery.expr.filters.animated = function (elem) { return jQuery.grep(jQuery.timers, function (fn) { return elem === fn.elem }).length }, jQuery.offset = {
            setOffset: function (elem, options, i) {
              var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"),
              curElem = jQuery(elem),
              props = {}; "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && (curCSSTop + curCSSLeft).indexOf("auto") > -1, calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), jQuery.isFunction(options) && (options = options.call(elem, i, jQuery.extend({}, curOffset))), null != options.top && (props.top = options.top - curOffset.top + curTop), null != options.left && (props.left = options.left - curOffset.left + curLeft), "using" in options ? options.using.call(elem, props) : curElem.css(props)
            }
          }, jQuery.fn.extend({
            offset: function (options) {
              if (arguments.length) return void 0 === options ? this : this.each(function (i) { jQuery.offset.setOffset(this, options, i) }); var docElem, win, elem = this[0],
                box = { top: 0, left: 0 },
                doc = elem && elem.ownerDocument; if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (box = elem.getBoundingClientRect(), win = getWindow(doc), { top: box.top + win.pageYOffset - docElem.clientTop, left: box.left + win.pageXOffset - docElem.clientLeft }) : box
            }, position: function () {
              if (this[0]) {
                var offsetParent, offset, elem = this[0],
                parentOffset = { top: 0, left: 0 }; return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), { top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0), left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0) }
              }
            }, offsetParent: function () { return this.map(function () { for (var offsetParent = this.offsetParent; offsetParent && "static" === jQuery.css(offsetParent, "position");) offsetParent = offsetParent.offsetParent; return offsetParent || documentElement }) }
          }), jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
            var top = "pageYOffset" === prop;
            jQuery.fn[method] = function (val) { return access(this, function (elem, method, val) { var win = getWindow(elem); return void 0 === val ? win ? win[prop] : elem[method] : void (win ? win.scrollTo(top ? win.pageXOffset : val, top ? val : win.pageYOffset) : elem[method] = val) }, method, val, arguments.length) }
          }), jQuery.each(["top", "left"], function (i, prop) { jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) { if (computed) return computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed }) }), jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
            jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {
            jQuery.fn[funcName] = function (margin, value) {
              var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin),
              extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border"); return access(this, function (elem, type, value) { var doc; return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra) }, type, chainable ? margin : void 0, chainable, null)
            }
            })
          }), jQuery.fn.extend({ bind: function (types, data, fn) { return this.on(types, null, data, fn) }, unbind: function (types, fn) { return this.off(types, null, fn) }, delegate: function (selector, types, data, fn) { return this.on(types, selector, data, fn) }, undelegate: function (selector, types, fn) { return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn) }, size: function () { return this.length } }), jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () { return jQuery });
          var _jQuery = window.jQuery,
            _$ = window.$;
          return jQuery.noConflict = function (deep) { return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery }, noGlobal || (window.jQuery = window.$ = jQuery), jQuery
        })
      }, {}],
        47: [function (require, module, exports) {
          (function (global) {
            (function () {
              function addMapEntry(map, pair) { return map.set(pair[0], pair[1]), map }

              function addSetEntry(set, value) { return set.add(value), set }

              function apply(func, thisArg, args) {
                switch (args.length) {
                  case 0:
                    return func.call(thisArg);
                  case 1:
                    return func.call(thisArg, args[0]);
                  case 2:
                    return func.call(thisArg, args[0], args[1]);
                  case 3:
                    return func.call(thisArg, args[0], args[1], args[2])
                } return func.apply(thisArg, args)
              }

              function arrayAggregator(array, setter, iteratee, accumulator) {
                for (var index = -1, length = null == array ? 0 : array.length; ++index < length;) {
                  var value = array[index];
                  setter(accumulator, value, iteratee(value), array)
                } return accumulator
              }

              function arrayEach(array, iteratee) { for (var index = -1, length = null == array ? 0 : array.length; ++index < length && iteratee(array[index], index, array) !== !1;); return array }

              function arrayEachRight(array, iteratee) { for (var length = null == array ? 0 : array.length; length-- && iteratee(array[length], length, array) !== !1;); return array }

              function arrayEvery(array, predicate) {
                for (var index = -1, length = null == array ? 0 : array.length; ++index < length;)
                  if (!predicate(array[index], index, array)) return !1; return !0
              }

              function arrayFilter(array, predicate) {
                for (var index = -1, length = null == array ? 0 : array.length, resIndex = 0, result = []; ++index < length;) {
                  var value = array[index];
                  predicate(value, index, array) && (result[resIndex++] = value)
                } return result
              }

              function arrayIncludes(array, value) { var length = null == array ? 0 : array.length; return !!length && baseIndexOf(array, value, 0) > -1 }

              function arrayIncludesWith(array, value, comparator) {
                for (var index = -1, length = null == array ? 0 : array.length; ++index < length;)
                  if (comparator(value, array[index])) return !0; return !1
              }

              function arrayMap(array, iteratee) { for (var index = -1, length = null == array ? 0 : array.length, result = Array(length); ++index < length;) result[index] = iteratee(array[index], index, array); return result }

              function arrayPush(array, values) { for (var index = -1, length = values.length, offset = array.length; ++index < length;) array[offset + index] = values[index]; return array }

              function arrayReduce(array, iteratee, accumulator, initAccum) {
                var index = -1,
                length = null == array ? 0 : array.length; for (initAccum && length && (accumulator = array[++index]); ++index < length;) accumulator = iteratee(accumulator, array[index], index, array); return accumulator
              }

              function arrayReduceRight(array, iteratee, accumulator, initAccum) { var length = null == array ? 0 : array.length; for (initAccum && length && (accumulator = array[--length]); length--;) accumulator = iteratee(accumulator, array[length], length, array); return accumulator }

              function arraySome(array, predicate) {
                for (var index = -1, length = null == array ? 0 : array.length; ++index < length;)
                  if (predicate(array[index], index, array)) return !0; return !1
              }

              function asciiToArray(string) { return string.split("") }

              function asciiWords(string) { return string.match(reAsciiWord) || [] }

              function baseFindKey(collection, predicate, eachFunc) { var result; return eachFunc(collection, function (value, key, collection) { if (predicate(value, key, collection)) return result = key, !1 }), result }

              function baseFindIndex(array, predicate, fromIndex, fromRight) {
                for (var length = array.length, index = fromIndex + (fromRight ? 1 : -1); fromRight ? index-- : ++index < length;)
                  if (predicate(array[index], index, array)) return index; return -1
              }

              function baseIndexOf(array, value, fromIndex) { return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex) }

              function baseIndexOfWith(array, value, fromIndex, comparator) {
                for (var index = fromIndex - 1, length = array.length; ++index < length;)
                  if (comparator(array[index], value)) return index; return -1
              }

              function baseIsNaN(value) { return value !== value }

              function baseMean(array, iteratee) { var length = null == array ? 0 : array.length; return length ? baseSum(array, iteratee) / length : NAN }

              function baseProperty(key) { return function (object) { return null == object ? undefined : object[key] } }

              function basePropertyOf(object) { return function (key) { return null == object ? undefined : object[key] } }

              function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) { return eachFunc(collection, function (value, index, collection) { accumulator = initAccum ? (initAccum = !1, value) : iteratee(accumulator, value, index, collection) }), accumulator }

              function baseSortBy(array, comparer) { var length = array.length; for (array.sort(comparer); length--;) array[length] = array[length].value; return array }

              function baseSum(array, iteratee) {
                for (var result, index = -1, length = array.length; ++index < length;) {
                  var current = iteratee(array[index]);
                  current !== undefined && (result = result === undefined ? current : result + current)
                } return result
              }

              function baseTimes(n, iteratee) { for (var index = -1, result = Array(n); ++index < n;) result[index] = iteratee(index); return result }

              function baseToPairs(object, props) { return arrayMap(props, function (key) { return [key, object[key]] }) }

              function baseUnary(func) { return function (value) { return func(value) } }

              function baseValues(object, props) { return arrayMap(props, function (key) { return object[key] }) }

              function cacheHas(cache, key) { return cache.has(key) }

              function charsStartIndex(strSymbols, chrSymbols) { for (var index = -1, length = strSymbols.length; ++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1;); return index }

              function charsEndIndex(strSymbols, chrSymbols) { for (var index = strSymbols.length; index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1;); return index }

              function countHolders(array, placeholder) { for (var length = array.length, result = 0; length--;) array[length] === placeholder && ++result; return result }

              function escapeStringChar(chr) { return "\\" + stringEscapes[chr] }

              function getValue(object, key) { return null == object ? undefined : object[key] }

              function hasUnicode(string) { return reHasUnicode.test(string) }

              function hasUnicodeWord(string) { return reHasUnicodeWord.test(string) }

              function iteratorToArray(iterator) { for (var data, result = []; !(data = iterator.next()).done;) result.push(data.value); return result }

              function mapToArray(map) {
                var index = -1,
                result = Array(map.size); return map.forEach(function (value, key) { result[++index] = [key, value] }), result
              }

              function overArg(func, transform) { return function (arg) { return func(transform(arg)) } }

              function replaceHolders(array, placeholder) {
                for (var index = -1, length = array.length, resIndex = 0, result = []; ++index < length;) {
                  var value = array[index];
                  value !== placeholder && value !== PLACEHOLDER || (array[index] = PLACEHOLDER, result[resIndex++] = index)
                } return result
              }

              function setToArray(set) {
                var index = -1,
                result = Array(set.size); return set.forEach(function (value) { result[++index] = value }), result
              }

              function setToPairs(set) {
                var index = -1,
                result = Array(set.size); return set.forEach(function (value) { result[++index] = [value, value] }), result
              }

              function strictIndexOf(array, value, fromIndex) {
                for (var index = fromIndex - 1, length = array.length; ++index < length;)
                  if (array[index] === value) return index; return -1
              }

              function strictLastIndexOf(array, value, fromIndex) {
                for (var index = fromIndex + 1; index--;)
                  if (array[index] === value) return index; return index
              }

              function stringSize(string) { return hasUnicode(string) ? unicodeSize(string) : asciiSize(string) }

              function stringToArray(string) { return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string) }

              function unicodeSize(string) { for (var result = reUnicode.lastIndex = 0; reUnicode.test(string);)++result; return result }

              function unicodeToArray(string) { return string.match(reUnicode) || [] }

              function unicodeWords(string) { return string.match(reUnicodeWord) || [] }
              var undefined, VERSION = "4.17.4",
                LARGE_ARRAY_SIZE = 200,
                CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",
                FUNC_ERROR_TEXT = "Expected a function",
                HASH_UNDEFINED = "__lodash_hash_undefined__",
                MAX_MEMOIZE_SIZE = 500,
                PLACEHOLDER = "__lodash_placeholder__",
                CLONE_DEEP_FLAG = 1,
                CLONE_FLAT_FLAG = 2,
                CLONE_SYMBOLS_FLAG = 4,
                COMPARE_PARTIAL_FLAG = 1,
                COMPARE_UNORDERED_FLAG = 2,
                WRAP_BIND_FLAG = 1,
                WRAP_BIND_KEY_FLAG = 2,
                WRAP_CURRY_BOUND_FLAG = 4,
                WRAP_CURRY_FLAG = 8,
                WRAP_CURRY_RIGHT_FLAG = 16,
                WRAP_PARTIAL_FLAG = 32,
                WRAP_PARTIAL_RIGHT_FLAG = 64,
                WRAP_ARY_FLAG = 128,
                WRAP_REARG_FLAG = 256,
                WRAP_FLIP_FLAG = 512,
                DEFAULT_TRUNC_LENGTH = 30,
                DEFAULT_TRUNC_OMISSION = "...",
                HOT_COUNT = 800,
                HOT_SPAN = 16,
                LAZY_FILTER_FLAG = 1,
                LAZY_MAP_FLAG = 2,
                LAZY_WHILE_FLAG = 3,
                INFINITY = 1 / 0,
                MAX_SAFE_INTEGER = 9007199254740991,
                MAX_INTEGER = 1.7976931348623157e308,
                NAN = NaN,
                MAX_ARRAY_LENGTH = 4294967295,
                MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
                HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1,
                wrapFlags = [
                  ["ary", WRAP_ARY_FLAG],
                  ["bind", WRAP_BIND_FLAG],
                  ["bindKey", WRAP_BIND_KEY_FLAG],
                  ["curry", WRAP_CURRY_FLAG],
                  ["curryRight", WRAP_CURRY_RIGHT_FLAG],
                  ["flip", WRAP_FLIP_FLAG],
                  ["partial", WRAP_PARTIAL_FLAG],
                  ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
                  ["rearg", WRAP_REARG_FLAG]
                ],
                argsTag = "[object Arguments]",
                arrayTag = "[object Array]",
                asyncTag = "[object AsyncFunction]",
                boolTag = "[object Boolean]",
                dateTag = "[object Date]",
                domExcTag = "[object DOMException]",
                errorTag = "[object Error]",
                funcTag = "[object Function]",
                genTag = "[object GeneratorFunction]",
                mapTag = "[object Map]",
                numberTag = "[object Number]",
                nullTag = "[object Null]",
                objectTag = "[object Object]",
                promiseTag = "[object Promise]",
                proxyTag = "[object Proxy]",
                regexpTag = "[object RegExp]",
                setTag = "[object Set]",
                stringTag = "[object String]",
                symbolTag = "[object Symbol]",
                undefinedTag = "[object Undefined]",
                weakMapTag = "[object WeakMap]",
                weakSetTag = "[object WeakSet]",
                arrayBufferTag = "[object ArrayBuffer]",
                dataViewTag = "[object DataView]",
                float32Tag = "[object Float32Array]",
                float64Tag = "[object Float64Array]",
                int8Tag = "[object Int8Array]",
                int16Tag = "[object Int16Array]",
                int32Tag = "[object Int32Array]",
                uint8Tag = "[object Uint8Array]",
                uint8ClampedTag = "[object Uint8ClampedArray]",
                uint16Tag = "[object Uint16Array]",
                uint32Tag = "[object Uint32Array]",
                reEmptyStringLeading = /\b__p \+= '';/g,
                reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
                reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
                reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
                reUnescapedHtml = /[&<>"']/g,
                reHasEscapedHtml = RegExp(reEscapedHtml.source),
                reHasUnescapedHtml = RegExp(reUnescapedHtml.source),
                reEscape = /<%-([\s\S]+?)%>/g,
                reEvaluate = /<%([\s\S]+?)%>/g,
                reInterpolate = /<%=([\s\S]+?)%>/g,
                reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
                reIsPlainProp = /^\w*$/,
                reLeadingDot = /^\./,
                rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
                reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
                reHasRegExpChar = RegExp(reRegExpChar.source),
                reTrim = /^\s+|\s+$/g,
                reTrimStart = /^\s+/,
                reTrimEnd = /\s+$/,
                reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
                reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
                reSplitDetails = /,? & /,
                reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
                reEscapeChar = /\\(\\)?/g,
                reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
                reFlags = /\w*$/,
                reIsBadHex = /^[-+]0x[0-9a-f]+$/i,
                reIsBinary = /^0b[01]+$/i,
                reIsHostCtor = /^\[object .+?Constructor\]$/,
                reIsOctal = /^0o[0-7]+$/i,
                reIsUint = /^(?:0|[1-9]\d*)$/,
                reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
                reNoMatch = /($^)/,
                reUnescapedString = /['\n\r\u2028\u2029\\]/g,
                rsAstralRange = "\\ud800-\\udfff",
                rsComboMarksRange = "\\u0300-\\u036f",
                reComboHalfMarksRange = "\\ufe20-\\ufe2f",
                rsComboSymbolsRange = "\\u20d0-\\u20ff",
                rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
                rsDingbatRange = "\\u2700-\\u27bf",
                rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff",
                rsMathOpRange = "\\xac\\xb1\\xd7\\xf7",
                rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
                rsPunctuationRange = "\\u2000-\\u206f",
                rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
                rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde",
                rsVarRange = "\\ufe0e\\ufe0f",
                rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange,
                rsApos = "['’]",
                rsAstral = "[" + rsAstralRange + "]",
                rsBreak = "[" + rsBreakRange + "]",
                rsCombo = "[" + rsComboRange + "]",
                rsDigits = "\\d+",
                rsDingbat = "[" + rsDingbatRange + "]",
                rsLower = "[" + rsLowerRange + "]",
                rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]",
                rsFitz = "\\ud83c[\\udffb-\\udfff]",
                rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")",
                rsNonAstral = "[^" + rsAstralRange + "]",
                rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
                rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
                rsUpper = "[" + rsUpperRange + "]",
                rsZWJ = "\\u200d",
                rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")",
                rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")",
                rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?",
                rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?",
                reOptMod = rsModifier + "?",
                rsOptVar = "[" + rsVarRange + "]?",
                rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*",
                rsOrdLower = "\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)",
                rsOrdUpper = "\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)",
                rsSeq = rsOptVar + reOptMod + rsOptJoin,
                rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq,
                rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")",
                reApos = RegExp(rsApos, "g"),
                reComboMark = RegExp(rsCombo, "g"),
                reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g"),
                reUnicodeWord = RegExp([rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")", rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")", rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower, rsUpper + "+" + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join("|"), "g"),
                reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]"),
                reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
                contextProps = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"],
                templateCounter = -1,
                typedArrayTags = {};
              typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = !0, typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = !1;
              var cloneableTags = {};
              cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = !0,
                cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = !1;
              var deburredLetters = { "À": "A", "Á": "A", "Â": "A", "Ã": "A", "Ä": "A", "Å": "A", "à": "a", "á": "a", "â": "a", "ã": "a", "ä": "a", "å": "a", "Ç": "C", "ç": "c", "Ð": "D", "ð": "d", "È": "E", "É": "E", "Ê": "E", "Ë": "E", "è": "e", "é": "e", "ê": "e", "ë": "e", "Ì": "I", "Í": "I", "Î": "I", "Ï": "I", "ì": "i", "í": "i", "î": "i", "ï": "i", "Ñ": "N", "ñ": "n", "Ò": "O", "Ó": "O", "Ô": "O", "Õ": "O", "Ö": "O", "Ø": "O", "ò": "o", "ó": "o", "ô": "o", "õ": "o", "ö": "o", "ø": "o", "Ù": "U", "Ú": "U", "Û": "U", "Ü": "U", "ù": "u", "ú": "u", "û": "u", "ü": "u", "Ý": "Y", "ý": "y", "ÿ": "y", "Æ": "Ae", "æ": "ae", "Þ": "Th", "þ": "th", "ß": "ss", "Ā": "A", "Ă": "A", "Ą": "A", "ā": "a", "ă": "a", "ą": "a", "Ć": "C", "Ĉ": "C", "Ċ": "C", "Č": "C", "ć": "c", "ĉ": "c", "ċ": "c", "č": "c", "Ď": "D", "Đ": "D", "ď": "d", "đ": "d", "Ē": "E", "Ĕ": "E", "Ė": "E", "Ę": "E", "Ě": "E", "ē": "e", "ĕ": "e", "ė": "e", "ę": "e", "ě": "e", "Ĝ": "G", "Ğ": "G", "Ġ": "G", "Ģ": "G", "ĝ": "g", "ğ": "g", "ġ": "g", "ģ": "g", "Ĥ": "H", "Ħ": "H", "ĥ": "h", "ħ": "h", "Ĩ": "I", "Ī": "I", "Ĭ": "I", "Į": "I", "İ": "I", "ĩ": "i", "ī": "i", "ĭ": "i", "į": "i", "ı": "i", "Ĵ": "J", "ĵ": "j", "Ķ": "K", "ķ": "k", "ĸ": "k", "Ĺ": "L", "Ļ": "L", "Ľ": "L", "Ŀ": "L", "Ł": "L", "ĺ": "l", "ļ": "l", "ľ": "l", "ŀ": "l", "ł": "l", "Ń": "N", "Ņ": "N", "Ň": "N", "Ŋ": "N", "ń": "n", "ņ": "n", "ň": "n", "ŋ": "n", "Ō": "O", "Ŏ": "O", "Ő": "O", "ō": "o", "ŏ": "o", "ő": "o", "Ŕ": "R", "Ŗ": "R", "Ř": "R", "ŕ": "r", "ŗ": "r", "ř": "r", "Ś": "S", "Ŝ": "S", "Ş": "S", "Š": "S", "ś": "s", "ŝ": "s", "ş": "s", "š": "s", "Ţ": "T", "Ť": "T", "Ŧ": "T", "ţ": "t", "ť": "t", "ŧ": "t", "Ũ": "U", "Ū": "U", "Ŭ": "U", "Ů": "U", "Ű": "U", "Ų": "U", "ũ": "u", "ū": "u", "ŭ": "u", "ů": "u", "ű": "u", "ų": "u", "Ŵ": "W", "ŵ": "w", "Ŷ": "Y", "ŷ": "y", "Ÿ": "Y", "Ź": "Z", "Ż": "Z", "Ž": "Z", "ź": "z", "ż": "z", "ž": "z", "Ĳ": "IJ", "ĳ": "ij", "Œ": "Oe", "œ": "oe", "ŉ": "'n", "ſ": "s" },
                htmlEscapes = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },
                htmlUnescapes = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" },
                stringEscapes = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" },
                freeParseFloat = parseFloat,
                freeParseInt = parseInt,
                freeGlobal = "object" == typeof global && global && global.Object === Object && global,
                freeSelf = "object" == typeof self && self && self.Object === Object && self,
                root = freeGlobal || freeSelf || Function("return this")(),
                freeExports = "object" == typeof exports && exports && !exports.nodeType && exports,
                freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module,
                moduleExports = freeModule && freeModule.exports === freeExports,
                freeProcess = moduleExports && freeGlobal.process,
                nodeUtil = function () { try { return freeProcess && freeProcess.binding && freeProcess.binding("util") } catch (e) { } }(),
                nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
                nodeIsDate = nodeUtil && nodeUtil.isDate,
                nodeIsMap = nodeUtil && nodeUtil.isMap,
                nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
                nodeIsSet = nodeUtil && nodeUtil.isSet,
                nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray,
                asciiSize = baseProperty("length"),
                deburrLetter = basePropertyOf(deburredLetters),
                escapeHtmlChar = basePropertyOf(htmlEscapes),
                unescapeHtmlChar = basePropertyOf(htmlUnescapes),
                runInContext = function runInContext(context) {
                  function lodash(value) { if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) { if (value instanceof LodashWrapper) return value; if (hasOwnProperty.call(value, "__wrapped__")) return wrapperClone(value) } return new LodashWrapper(value) }

                  function baseLodash() { }

                  function LodashWrapper(value, chainAll) { this.__wrapped__ = value, this.__actions__ = [], this.__chain__ = !!chainAll, this.__index__ = 0, this.__values__ = undefined }

                  function LazyWrapper(value) { this.__wrapped__ = value, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = MAX_ARRAY_LENGTH, this.__views__ = [] }

                  function lazyClone() { var result = new LazyWrapper(this.__wrapped__); return result.__actions__ = copyArray(this.__actions__), result.__dir__ = this.__dir__, result.__filtered__ = this.__filtered__, result.__iteratees__ = copyArray(this.__iteratees__), result.__takeCount__ = this.__takeCount__, result.__views__ = copyArray(this.__views__), result }

                  function lazyReverse() {
                    if (this.__filtered__) {
                      var result = new LazyWrapper(this);
                      result.__dir__ = -1, result.__filtered__ = !0
                    } else result = this.clone(), result.__dir__ *= -1; return result
                  }

                  function lazyValue() {
                    var array = this.__wrapped__.value(),
                    dir = this.__dir__,
                    isArr = isArray(array),
                    isRight = dir < 0,
                    arrLength = isArr ? array.length : 0,
                    view = getView(0, arrLength, this.__views__),
                    start = view.start,
                    end = view.end,
                    length = end - start,
                    index = isRight ? end : start - 1,
                    iteratees = this.__iteratees__,
                    iterLength = iteratees.length,
                    resIndex = 0,
                    takeCount = nativeMin(length, this.__takeCount__); if (!isArr || !isRight && arrLength == length && takeCount == length) return baseWrapperValue(array, this.__actions__); var result = [];
                    outer: for (; length-- && resIndex < takeCount;) {
                      index += dir; for (var iterIndex = -1, value = array[index]; ++iterIndex < iterLength;) {
                        var data = iteratees[iterIndex],
                        iteratee = data.iteratee,
                        type = data.type,
                        computed = iteratee(value); if (type == LAZY_MAP_FLAG) value = computed;
                        else if (!computed) { if (type == LAZY_FILTER_FLAG) continue outer; break outer }
                      } result[resIndex++] = value
                    }
                    return result
                  }

                  function Hash(entries) {
                    var index = -1,
                    length = null == entries ? 0 : entries.length; for (this.clear(); ++index < length;) {
                      var entry = entries[index];
                      this.set(entry[0], entry[1])
                    }
                  }

                  function hashClear() { this.__data__ = nativeCreate ? nativeCreate(null) : {}, this.size = 0 }

                  function hashDelete(key) { var result = this.has(key) && delete this.__data__[key]; return this.size -= result ? 1 : 0, result }

                  function hashGet(key) { var data = this.__data__; if (nativeCreate) { var result = data[key]; return result === HASH_UNDEFINED ? undefined : result } return hasOwnProperty.call(data, key) ? data[key] : undefined }

                  function hashHas(key) { var data = this.__data__; return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key) }

                  function hashSet(key, value) { var data = this.__data__; return this.size += this.has(key) ? 0 : 1, data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value, this }

                  function ListCache(entries) {
                    var index = -1,
                    length = null == entries ? 0 : entries.length; for (this.clear(); ++index < length;) {
                      var entry = entries[index];
                      this.set(entry[0], entry[1])
                    }
                  }

                  function listCacheClear() { this.__data__ = [], this.size = 0 }

                  function listCacheDelete(key) {
                    var data = this.__data__,
                    index = assocIndexOf(data, key); if (index < 0) return !1; var lastIndex = data.length - 1; return index == lastIndex ? data.pop() : splice.call(data, index, 1), --this.size, !0
                  }

                  function listCacheGet(key) {
                    var data = this.__data__,
                    index = assocIndexOf(data, key); return index < 0 ? undefined : data[index][1]
                  }

                  function listCacheHas(key) { return assocIndexOf(this.__data__, key) > -1 }

                  function listCacheSet(key, value) {
                    var data = this.__data__,
                    index = assocIndexOf(data, key); return index < 0 ? (++this.size, data.push([key, value])) : data[index][1] = value, this
                  }

                  function MapCache(entries) {
                    var index = -1,
                    length = null == entries ? 0 : entries.length; for (this.clear(); ++index < length;) {
                      var entry = entries[index];
                      this.set(entry[0], entry[1])
                    }
                  }

                  function mapCacheClear() { this.size = 0, this.__data__ = { hash: new Hash, map: new (Map || ListCache), string: new Hash } }

                  function mapCacheDelete(key) { var result = getMapData(this, key).delete(key); return this.size -= result ? 1 : 0, result }

                  function mapCacheGet(key) { return getMapData(this, key).get(key) }

                  function mapCacheHas(key) { return getMapData(this, key).has(key) }

                  function mapCacheSet(key, value) {
                    var data = getMapData(this, key),
                    size = data.size; return data.set(key, value), this.size += data.size == size ? 0 : 1, this
                  }

                  function SetCache(values) {
                    var index = -1,
                    length = null == values ? 0 : values.length; for (this.__data__ = new MapCache; ++index < length;) this.add(values[index])
                  }

                  function setCacheAdd(value) { return this.__data__.set(value, HASH_UNDEFINED), this }

                  function setCacheHas(value) { return this.__data__.has(value) }

                  function Stack(entries) {
                    var data = this.__data__ = new ListCache(entries);
                    this.size = data.size
                  }

                  function stackClear() { this.__data__ = new ListCache, this.size = 0 }

                  function stackDelete(key) {
                    var data = this.__data__,
                    result = data.delete(key); return this.size = data.size, result
                  }

                  function stackGet(key) { return this.__data__.get(key) }

                  function stackHas(key) { return this.__data__.has(key) }

                  function stackSet(key, value) {
                    var data = this.__data__; if (data instanceof ListCache) {
                      var pairs = data.__data__; if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) return pairs.push([key, value]), this.size = ++data.size, this;
                      data = this.__data__ = new MapCache(pairs)
                    } return data.set(key, value), this.size = data.size, this
                  }

                  function arrayLikeKeys(value, inherited) {
                    var isArr = isArray(value),
                    isArg = !isArr && isArguments(value),
                    isBuff = !isArr && !isArg && isBuffer(value),
                    isType = !isArr && !isArg && !isBuff && isTypedArray(value),
                    skipIndexes = isArr || isArg || isBuff || isType,
                    result = skipIndexes ? baseTimes(value.length, String) : [],
                    length = result.length; for (var key in value) !inherited && !hasOwnProperty.call(value, key) || skipIndexes && ("length" == key || isBuff && ("offset" == key || "parent" == key) || isType && ("buffer" == key || "byteLength" == key || "byteOffset" == key) || isIndex(key, length)) || result.push(key); return result
                  }

                  function arraySample(array) { var length = array.length; return length ? array[baseRandom(0, length - 1)] : undefined }

                  function arraySampleSize(array, n) { return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length)) }

                  function arrayShuffle(array) { return shuffleSelf(copyArray(array)) }

                  function assignMergeValue(object, key, value) {
                    (value === undefined || eq(object[key], value)) && (value !== undefined || key in object) || baseAssignValue(object, key, value)
                  }

                  function assignValue(object, key, value) {
                    var objValue = object[key];
                    hasOwnProperty.call(object, key) && eq(objValue, value) && (value !== undefined || key in object) || baseAssignValue(object, key, value)
                  }

                  function assocIndexOf(array, key) {
                    for (var length = array.length; length--;)
                      if (eq(array[length][0], key)) return length; return -1
                  }

                  function baseAggregator(collection, setter, iteratee, accumulator) { return baseEach(collection, function (value, key, collection) { setter(accumulator, value, iteratee(value), collection) }), accumulator }

                  function baseAssign(object, source) { return object && copyObject(source, keys(source), object) }

                  function baseAssignIn(object, source) { return object && copyObject(source, keysIn(source), object) }

                  function baseAssignValue(object, key, value) { "__proto__" == key && defineProperty ? defineProperty(object, key, { configurable: !0, enumerable: !0, value: value, writable: !0 }) : object[key] = value }

                  function baseAt(object, paths) { for (var index = -1, length = paths.length, result = Array(length), skip = null == object; ++index < length;) result[index] = skip ? undefined : get(object, paths[index]); return result }

                  function baseClamp(number, lower, upper) { return number === number && (upper !== undefined && (number = number <= upper ? number : upper), lower !== undefined && (number = number >= lower ? number : lower)), number }

                  function baseClone(value, bitmask, customizer, key, object, stack) {
                    var result, isDeep = bitmask & CLONE_DEEP_FLAG,
                    isFlat = bitmask & CLONE_FLAT_FLAG,
                    isFull = bitmask & CLONE_SYMBOLS_FLAG; if (customizer && (result = object ? customizer(value, key, object, stack) : customizer(value)), result !== undefined) return result; if (!isObject(value)) return value; var isArr = isArray(value); if (isArr) { if (result = initCloneArray(value), !isDeep) return copyArray(value, result) } else {
                      var tag = getTag(value),
                      isFunc = tag == funcTag || tag == genTag; if (isBuffer(value)) return cloneBuffer(value, isDeep); if (tag == objectTag || tag == argsTag || isFunc && !object) { if (result = isFlat || isFunc ? {} : initCloneObject(value), !isDeep) return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value)) } else {
                        if (!cloneableTags[tag]) return object ? value : {};
                        result = initCloneByTag(value, tag, baseClone, isDeep)
                      }
                    } stack || (stack = new Stack); var stacked = stack.get(value); if (stacked) return stacked;
                    stack.set(value, result); var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys,
                      props = isArr ? undefined : keysFunc(value); return arrayEach(props || value, function (subValue, key) { props && (key = subValue, subValue = value[key]), assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack)) }), result
                  }

                  function baseConforms(source) { var props = keys(source); return function (object) { return baseConformsTo(object, source, props) } }

                  function baseConformsTo(object, source, props) {
                    var length = props.length; if (null == object) return !length; for (object = Object(object); length--;) {
                      var key = props[length],
                      predicate = source[key],
                      value = object[key]; if (value === undefined && !(key in object) || !predicate(value)) return !1
                    } return !0
                  }

                  function baseDelay(func, wait, args) { if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT); return setTimeout(function () { func.apply(undefined, args) }, wait) }

                  function baseDifference(array, values, iteratee, comparator) {
                    var index = -1,
                    includes = arrayIncludes,
                    isCommon = !0,
                    length = array.length,
                    result = [],
                    valuesLength = values.length; if (!length) return result;
                    iteratee && (values = arrayMap(values, baseUnary(iteratee))), comparator ? (includes = arrayIncludesWith, isCommon = !1) : values.length >= LARGE_ARRAY_SIZE && (includes = cacheHas, isCommon = !1, values = new SetCache(values));
                    outer: for (; ++index < length;) {
                      var value = array[index],
                      computed = null == iteratee ? value : iteratee(value); if (value = comparator || 0 !== value ? value : 0, isCommon && computed === computed) {
                        for (var valuesIndex = valuesLength; valuesIndex--;)
                          if (values[valuesIndex] === computed) continue outer;
                        result.push(value)
                      } else includes(values, computed, comparator) || result.push(value)
                    }
                    return result
                  }

                  function baseEvery(collection, predicate) { var result = !0; return baseEach(collection, function (value, index, collection) { return result = !!predicate(value, index, collection) }), result }

                  function baseExtremum(array, iteratee, comparator) {
                    for (var index = -1, length = array.length; ++index < length;) {
                      var value = array[index],
                      current = iteratee(value); if (null != current && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) var computed = current,
                        result = value
                    } return result
                  }

                  function baseFill(array, value, start, end) { var length = array.length; for (start = toInteger(start), start < 0 && (start = -start > length ? 0 : length + start), end = end === undefined || end > length ? length : toInteger(end), end < 0 && (end += length), end = start > end ? 0 : toLength(end); start < end;) array[start++] = value; return array }

                  function baseFilter(collection, predicate) { var result = []; return baseEach(collection, function (value, index, collection) { predicate(value, index, collection) && result.push(value) }), result }

                  function baseFlatten(array, depth, predicate, isStrict, result) {
                    var index = -1,
                    length = array.length; for (predicate || (predicate = isFlattenable), result || (result = []); ++index < length;) {
                      var value = array[index];
                      depth > 0 && predicate(value) ? depth > 1 ? baseFlatten(value, depth - 1, predicate, isStrict, result) : arrayPush(result, value) : isStrict || (result[result.length] = value)
                    } return result
                  }

                  function baseForOwn(object, iteratee) { return object && baseFor(object, iteratee, keys) }

                  function baseForOwnRight(object, iteratee) { return object && baseForRight(object, iteratee, keys) }

                  function baseFunctions(object, props) { return arrayFilter(props, function (key) { return isFunction(object[key]) }) }

                  function baseGet(object, path) { path = castPath(path, object); for (var index = 0, length = path.length; null != object && index < length;) object = object[toKey(path[index++])]; return index && index == length ? object : undefined }

                  function baseGetAllKeys(object, keysFunc, symbolsFunc) { var result = keysFunc(object); return isArray(object) ? result : arrayPush(result, symbolsFunc(object)) }

                  function baseGetTag(value) { return null == value ? value === undefined ? undefinedTag : nullTag : symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value) }

                  function baseGt(value, other) { return value > other }

                  function baseHas(object, key) { return null != object && hasOwnProperty.call(object, key) }

                  function baseHasIn(object, key) { return null != object && key in Object(object) }

                  function baseInRange(number, start, end) { return number >= nativeMin(start, end) && number < nativeMax(start, end) }

                  function baseIntersection(arrays, iteratee, comparator) {
                    for (var includes = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = 1 / 0, result = []; othIndex--;) {
                      var array = arrays[othIndex];
                      othIndex && iteratee && (array = arrayMap(array, baseUnary(iteratee))), maxLength = nativeMin(array.length, maxLength), caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined
                    } array = arrays[0]; var index = -1,
                      seen = caches[0];
                    outer: for (; ++index < length && result.length < maxLength;) {
                      var value = array[index],
                      computed = iteratee ? iteratee(value) : value; if (value = comparator || 0 !== value ? value : 0, !(seen ? cacheHas(seen, computed) : includes(result, computed, comparator))) { for (othIndex = othLength; --othIndex;) { var cache = caches[othIndex]; if (!(cache ? cacheHas(cache, computed) : includes(arrays[othIndex], computed, comparator))) continue outer } seen && seen.push(computed), result.push(value) }
                    }
                    return result
                  }

                  function baseInverter(object, setter, iteratee, accumulator) { return baseForOwn(object, function (value, key, object) { setter(accumulator, iteratee(value), key, object) }), accumulator }

                  function baseInvoke(object, path, args) { path = castPath(path, object), object = parent(object, path); var func = null == object ? object : object[toKey(last(path))]; return null == func ? undefined : apply(func, object, args) }

                  function baseIsArguments(value) { return isObjectLike(value) && baseGetTag(value) == argsTag }

                  function baseIsArrayBuffer(value) { return isObjectLike(value) && baseGetTag(value) == arrayBufferTag }

                  function baseIsDate(value) { return isObjectLike(value) && baseGetTag(value) == dateTag }

                  function baseIsEqual(value, other, bitmask, customizer, stack) { return value === other || (null == value || null == other || !isObjectLike(value) && !isObjectLike(other) ? value !== value && other !== other : baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack)) }

                  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
                    var objIsArr = isArray(object),
                    othIsArr = isArray(other),
                    objTag = objIsArr ? arrayTag : getTag(object),
                    othTag = othIsArr ? arrayTag : getTag(other);
                    objTag = objTag == argsTag ? objectTag : objTag, othTag = othTag == argsTag ? objectTag : othTag; var objIsObj = objTag == objectTag,
                      othIsObj = othTag == objectTag,
                      isSameTag = objTag == othTag; if (isSameTag && isBuffer(object)) {
                        if (!isBuffer(other)) return !1;
                        objIsArr = !0, objIsObj = !1
                      } if (isSameTag && !objIsObj) return stack || (stack = new Stack), objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack); if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
                        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"),
                        othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__"); if (objIsWrapped || othIsWrapped) {
                          var objUnwrapped = objIsWrapped ? object.value() : object,
                          othUnwrapped = othIsWrapped ? other.value() : other; return stack || (stack = new Stack), equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack)
                        }
                      } return !!isSameTag && (stack || (stack = new Stack), equalObjects(object, other, bitmask, customizer, equalFunc, stack))
                  }

                  function baseIsMap(value) { return isObjectLike(value) && getTag(value) == mapTag }

                  function baseIsMatch(object, source, matchData, customizer) {
                    var index = matchData.length,
                    length = index,
                    noCustomizer = !customizer; if (null == object) return !length; for (object = Object(object); index--;) { var data = matchData[index]; if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) return !1 } for (; ++index < length;) {
                      data = matchData[index]; var key = data[0],
                        objValue = object[key],
                        srcValue = data[1]; if (noCustomizer && data[2]) { if (objValue === undefined && !(key in object)) return !1 } else { var stack = new Stack; if (customizer) var result = customizer(objValue, srcValue, key, object, source, stack); if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) return !1 }
                    } return !0
                  }

                  function baseIsNative(value) { if (!isObject(value) || isMasked(value)) return !1; var pattern = isFunction(value) ? reIsNative : reIsHostCtor; return pattern.test(toSource(value)) }

                  function baseIsRegExp(value) { return isObjectLike(value) && baseGetTag(value) == regexpTag }

                  function baseIsSet(value) { return isObjectLike(value) && getTag(value) == setTag }

                  function baseIsTypedArray(value) { return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)] }

                  function baseIteratee(value) { return "function" == typeof value ? value : null == value ? identity : "object" == typeof value ? isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value) : property(value) }

                  function baseKeys(object) { if (!isPrototype(object)) return nativeKeys(object); var result = []; for (var key in Object(object)) hasOwnProperty.call(object, key) && "constructor" != key && result.push(key); return result }

                  function baseKeysIn(object) {
                    if (!isObject(object)) return nativeKeysIn(object); var isProto = isPrototype(object),
                      result = []; for (var key in object) ("constructor" != key || !isProto && hasOwnProperty.call(object, key)) && result.push(key); return result
                  }

                  function baseLt(value, other) { return value < other }

                  function baseMap(collection, iteratee) {
                    var index = -1,
                    result = isArrayLike(collection) ? Array(collection.length) : []; return baseEach(collection, function (value, key, collection) { result[++index] = iteratee(value, key, collection) }), result
                  }

                  function baseMatches(source) { var matchData = getMatchData(source); return 1 == matchData.length && matchData[0][2] ? matchesStrictComparable(matchData[0][0], matchData[0][1]) : function (object) { return object === source || baseIsMatch(object, source, matchData) } }

                  function baseMatchesProperty(path, srcValue) { return isKey(path) && isStrictComparable(srcValue) ? matchesStrictComparable(toKey(path), srcValue) : function (object) { var objValue = get(object, path); return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG) } }

                  function baseMerge(object, source, srcIndex, customizer, stack) {
                  object !== source && baseFor(source, function (srcValue, key) {
                    if (isObject(srcValue)) stack || (stack = new Stack), baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
                    else {
                      var newValue = customizer ? customizer(object[key], srcValue, key + "", object, source, stack) : undefined;
                      newValue === undefined && (newValue = srcValue), assignMergeValue(object, key, newValue)
                    }
                  }, keysIn)
                  }

                  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
                    var objValue = object[key],
                    srcValue = source[key],
                    stacked = stack.get(srcValue); if (stacked) return void assignMergeValue(object, key, stacked); var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined,
                      isCommon = newValue === undefined; if (isCommon) {
                        var isArr = isArray(srcValue),
                        isBuff = !isArr && isBuffer(srcValue),
                        isTyped = !isArr && !isBuff && isTypedArray(srcValue);
                        newValue = srcValue, isArr || isBuff || isTyped ? isArray(objValue) ? newValue = objValue : isArrayLikeObject(objValue) ? newValue = copyArray(objValue) : isBuff ? (isCommon = !1, newValue = cloneBuffer(srcValue, !0)) : isTyped ? (isCommon = !1, newValue = cloneTypedArray(srcValue, !0)) : newValue = [] : isPlainObject(srcValue) || isArguments(srcValue) ? (newValue = objValue, isArguments(objValue) ? newValue = toPlainObject(objValue) : (!isObject(objValue) || srcIndex && isFunction(objValue)) && (newValue = initCloneObject(srcValue))) : isCommon = !1
                      } isCommon && (stack.set(srcValue, newValue), mergeFunc(newValue, srcValue, srcIndex, customizer, stack), stack.delete(srcValue)), assignMergeValue(object, key, newValue)
                  }

                  function baseNth(array, n) { var length = array.length; if (length) return n += n < 0 ? length : 0, isIndex(n, length) ? array[n] : undefined }

                  function baseOrderBy(collection, iteratees, orders) {
                    var index = -1;
                    iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(getIteratee())); var result = baseMap(collection, function (value, key, collection) { var criteria = arrayMap(iteratees, function (iteratee) { return iteratee(value) }); return { criteria: criteria, index: ++index, value: value } }); return baseSortBy(result, function (object, other) { return compareMultiple(object, other, orders) })
                  }

                  function basePick(object, paths) { return basePickBy(object, paths, function (value, path) { return hasIn(object, path) }) }

                  function basePickBy(object, paths, predicate) {
                    for (var index = -1, length = paths.length, result = {}; ++index < length;) {
                      var path = paths[index],
                      value = baseGet(object, path);
                      predicate(value, path) && baseSet(result, castPath(path, object), value)
                    } return result
                  }

                  function basePropertyDeep(path) { return function (object) { return baseGet(object, path) } }

                  function basePullAll(array, values, iteratee, comparator) {
                    var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
                    index = -1,
                    length = values.length,
                    seen = array; for (array === values && (values = copyArray(values)), iteratee && (seen = arrayMap(array, baseUnary(iteratee))); ++index < length;)
                      for (var fromIndex = 0, value = values[index], computed = iteratee ? iteratee(value) : value;
                        (fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1;) seen !== array && splice.call(seen, fromIndex, 1), splice.call(array, fromIndex, 1); return array
                  }

                  function basePullAt(array, indexes) {
                    for (var length = array ? indexes.length : 0, lastIndex = length - 1; length--;) {
                      var index = indexes[length]; if (length == lastIndex || index !== previous) {
                        var previous = index;
                        isIndex(index) ? splice.call(array, index, 1) : baseUnset(array, index)
                      }
                    } return array
                  }

                  function baseRandom(lower, upper) { return lower + nativeFloor(nativeRandom() * (upper - lower + 1)) }

                  function baseRange(start, end, step, fromRight) { for (var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length); length--;) result[fromRight ? length : ++index] = start, start += step; return result }

                  function baseRepeat(string, n) {
                    var result = ""; if (!string || n < 1 || n > MAX_SAFE_INTEGER) return result;
                    do n % 2 && (result += string), n = nativeFloor(n / 2), n && (string += string); while (n); return result
                  }

                  function baseRest(func, start) { return setToString(overRest(func, start, identity), func + "") }

                  function baseSample(collection) { return arraySample(values(collection)) }

                  function baseSampleSize(collection, n) { var array = values(collection); return shuffleSelf(array, baseClamp(n, 0, array.length)) }

                  function baseSet(object, path, value, customizer) {
                    if (!isObject(object)) return object;
                    path = castPath(path, object); for (var index = -1, length = path.length, lastIndex = length - 1, nested = object; null != nested && ++index < length;) {
                      var key = toKey(path[index]),
                      newValue = value; if (index != lastIndex) {
                        var objValue = nested[key];
                        newValue = customizer ? customizer(objValue, key, nested) : undefined, newValue === undefined && (newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {})
                      } assignValue(nested, key, newValue), nested = nested[key]
                    } return object
                  }

                  function baseShuffle(collection) { return shuffleSelf(values(collection)) }

                  function baseSlice(array, start, end) {
                    var index = -1,
                    length = array.length;
                    start < 0 && (start = -start > length ? 0 : length + start), end = end > length ? length : end, end < 0 && (end += length), length = start > end ? 0 : end - start >>> 0, start >>>= 0; for (var result = Array(length); ++index < length;) result[index] = array[index + start]; return result
                  }

                  function baseSome(collection, predicate) { var result; return baseEach(collection, function (value, index, collection) { return result = predicate(value, index, collection), !result }), !!result }

                  function baseSortedIndex(array, value, retHighest) {
                    var low = 0,
                    high = null == array ? low : array.length; if ("number" == typeof value && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
                      for (; low < high;) {
                        var mid = low + high >>> 1,
                        computed = array[mid];
                        null !== computed && !isSymbol(computed) && (retHighest ? computed <= value : computed < value) ? low = mid + 1 : high = mid
                      } return high
                    } return baseSortedIndexBy(array, value, identity, retHighest)
                  }

                  function baseSortedIndexBy(array, value, iteratee, retHighest) {
                    value = iteratee(value); for (var low = 0, high = null == array ? 0 : array.length, valIsNaN = value !== value, valIsNull = null === value, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined; low < high;) {
                      var mid = nativeFloor((low + high) / 2),
                      computed = iteratee(array[mid]),
                      othIsDefined = computed !== undefined,
                      othIsNull = null === computed,
                      othIsReflexive = computed === computed,
                      othIsSymbol = isSymbol(computed); if (valIsNaN) var setLow = retHighest || othIsReflexive;
                      else setLow = valIsUndefined ? othIsReflexive && (retHighest || othIsDefined) : valIsNull ? othIsReflexive && othIsDefined && (retHighest || !othIsNull) : valIsSymbol ? othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol) : !othIsNull && !othIsSymbol && (retHighest ? computed <= value : computed < value);
                      setLow ? low = mid + 1 : high = mid
                    } return nativeMin(high, MAX_ARRAY_INDEX)
                  }

                  function baseSortedUniq(array, iteratee) {
                    for (var index = -1, length = array.length, resIndex = 0, result = []; ++index < length;) {
                      var value = array[index],
                      computed = iteratee ? iteratee(value) : value; if (!index || !eq(computed, seen)) {
                        var seen = computed;
                        result[resIndex++] = 0 === value ? 0 : value
                      }
                    } return result
                  }

                  function baseToNumber(value) { return "number" == typeof value ? value : isSymbol(value) ? NAN : +value }

                  function baseToString(value) { if ("string" == typeof value) return value; if (isArray(value)) return arrayMap(value, baseToString) + ""; if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : ""; var result = value + ""; return "0" == result && 1 / value == -INFINITY ? "-0" : result }

                  function baseUniq(array, iteratee, comparator) {
                    var index = -1,
                    includes = arrayIncludes,
                    length = array.length,
                    isCommon = !0,
                    result = [],
                    seen = result; if (comparator) isCommon = !1, includes = arrayIncludesWith;
                    else if (length >= LARGE_ARRAY_SIZE) {
                      var set = iteratee ? null : createSet(array); if (set) return setToArray(set);
                      isCommon = !1, includes = cacheHas, seen = new SetCache
                    } else seen = iteratee ? [] : result;
                    outer: for (; ++index < length;) {
                      var value = array[index],
                      computed = iteratee ? iteratee(value) : value; if (value = comparator || 0 !== value ? value : 0, isCommon && computed === computed) {
                        for (var seenIndex = seen.length; seenIndex--;)
                          if (seen[seenIndex] === computed) continue outer;
                        iteratee && seen.push(computed), result.push(value)
                      } else includes(seen, computed, comparator) || (seen !== result && seen.push(computed), result.push(value))
                    }
                    return result
                  }

                  function baseUnset(object, path) { return path = castPath(path, object), object = parent(object, path), null == object || delete object[toKey(last(path))] }

                  function baseUpdate(object, path, updater, customizer) { return baseSet(object, path, updater(baseGet(object, path)), customizer) }

                  function baseWhile(array, predicate, isDrop, fromRight) {
                    for (var length = array.length, index = fromRight ? length : -1;
                      (fromRight ? index-- : ++index < length) && predicate(array[index], index, array);); return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index)
                  }

                  function baseWrapperValue(value, actions) { var result = value; return result instanceof LazyWrapper && (result = result.value()), arrayReduce(actions, function (result, action) { return action.func.apply(action.thisArg, arrayPush([result], action.args)) }, result) }

                  function baseXor(arrays, iteratee, comparator) {
                    var length = arrays.length; if (length < 2) return length ? baseUniq(arrays[0]) : []; for (var index = -1, result = Array(length); ++index < length;)
                      for (var array = arrays[index], othIndex = -1; ++othIndex < length;) othIndex != index && (result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator)); return baseUniq(baseFlatten(result, 1), iteratee, comparator)
                  }

                  function baseZipObject(props, values, assignFunc) {
                    for (var index = -1, length = props.length, valsLength = values.length, result = {}; ++index < length;) {
                      var value = index < valsLength ? values[index] : undefined;
                      assignFunc(result, props[index], value)
                    } return result
                  }

                  function castArrayLikeObject(value) { return isArrayLikeObject(value) ? value : [] }

                  function castFunction(value) { return "function" == typeof value ? value : identity }

                  function castPath(value, object) { return isArray(value) ? value : isKey(value, object) ? [value] : stringToPath(toString(value)) }

                  function castSlice(array, start, end) { var length = array.length; return end = end === undefined ? length : end, !start && end >= length ? array : baseSlice(array, start, end) }

                  function cloneBuffer(buffer, isDeep) {
                    if (isDeep) return buffer.slice(); var length = buffer.length,
                      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length); return buffer.copy(result), result
                  }

                  function cloneArrayBuffer(arrayBuffer) { var result = new arrayBuffer.constructor(arrayBuffer.byteLength); return new Uint8Array(result).set(new Uint8Array(arrayBuffer)), result }

                  function cloneDataView(dataView, isDeep) { var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer; return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength) }

                  function cloneMap(map, isDeep, cloneFunc) { var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map); return arrayReduce(array, addMapEntry, new map.constructor) }

                  function cloneRegExp(regexp) { var result = new regexp.constructor(regexp.source, reFlags.exec(regexp)); return result.lastIndex = regexp.lastIndex, result }

                  function cloneSet(set, isDeep, cloneFunc) { var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set); return arrayReduce(array, addSetEntry, new set.constructor) }

                  function cloneSymbol(symbol) { return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {} }

                  function cloneTypedArray(typedArray, isDeep) { var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer; return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length) }

                  function compareAscending(value, other) {
                    if (value !== other) {
                      var valIsDefined = value !== undefined,
                      valIsNull = null === value,
                      valIsReflexive = value === value,
                      valIsSymbol = isSymbol(value),
                      othIsDefined = other !== undefined,
                      othIsNull = null === other,
                      othIsReflexive = other === other,
                      othIsSymbol = isSymbol(other); if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) return 1; if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) return -1
                    }
                    return 0
                  }

                  function compareMultiple(object, other, orders) { for (var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length; ++index < length;) { var result = compareAscending(objCriteria[index], othCriteria[index]); if (result) { if (index >= ordersLength) return result; var order = orders[index]; return result * ("desc" == order ? -1 : 1) } } return object.index - other.index }

                  function composeArgs(args, partials, holders, isCurried) { for (var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(leftLength + rangeLength), isUncurried = !isCurried; ++leftIndex < leftLength;) result[leftIndex] = partials[leftIndex]; for (; ++argsIndex < holdersLength;)(isUncurried || argsIndex < argsLength) && (result[holders[argsIndex]] = args[argsIndex]); for (; rangeLength--;) result[leftIndex++] = args[argsIndex++]; return result }

                  function composeArgsRight(args, partials, holders, isCurried) { for (var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(rangeLength + rightLength), isUncurried = !isCurried; ++argsIndex < rangeLength;) result[argsIndex] = args[argsIndex]; for (var offset = argsIndex; ++rightIndex < rightLength;) result[offset + rightIndex] = partials[rightIndex]; for (; ++holdersIndex < holdersLength;)(isUncurried || argsIndex < argsLength) && (result[offset + holders[holdersIndex]] = args[argsIndex++]); return result }

                  function copyArray(source, array) {
                    var index = -1,
                    length = source.length; for (array || (array = Array(length)); ++index < length;) array[index] = source[index]; return array
                  }

                  function copyObject(source, props, object, customizer) {
                    var isNew = !object;
                    object || (object = {}); for (var index = -1, length = props.length; ++index < length;) {
                      var key = props[index],
                      newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
                      newValue === undefined && (newValue = source[key]), isNew ? baseAssignValue(object, key, newValue) : assignValue(object, key, newValue)
                    } return object
                  }

                  function copySymbols(source, object) { return copyObject(source, getSymbols(source), object) }

                  function copySymbolsIn(source, object) { return copyObject(source, getSymbolsIn(source), object) }

                  function createAggregator(setter, initializer) {
                    return function (collection, iteratee) {
                      var func = isArray(collection) ? arrayAggregator : baseAggregator,
                      accumulator = initializer ? initializer() : {}; return func(collection, setter, getIteratee(iteratee, 2), accumulator)
                    }
                  }

                  function createAssigner(assigner) {
                    return baseRest(function (object, sources) {
                      var index = -1,
                      length = sources.length,
                      customizer = length > 1 ? sources[length - 1] : undefined,
                      guard = length > 2 ? sources[2] : undefined; for (customizer = assigner.length > 3 && "function" == typeof customizer ? (length-- , customizer) : undefined, guard && isIterateeCall(sources[0], sources[1], guard) && (customizer = length < 3 ? undefined : customizer, length = 1), object = Object(object); ++index < length;) {
                        var source = sources[index];
                        source && assigner(object, source, index, customizer)
                      } return object
                    })
                  }

                  function createBaseEach(eachFunc, fromRight) {
                    return function (collection, iteratee) {
                      if (null == collection) return collection; if (!isArrayLike(collection)) return eachFunc(collection, iteratee); for (var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
                        (fromRight ? index-- : ++index < length) && iteratee(iterable[index], index, iterable) !== !1;); return collection
                    }
                  }

                  function createBaseFor(fromRight) { return function (object, iteratee, keysFunc) { for (var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length; length--;) { var key = props[fromRight ? length : ++index]; if (iteratee(iterable[key], key, iterable) === !1) break } return object } }

                  function createBind(func, bitmask, thisArg) {
                    function wrapper() { var fn = this && this !== root && this instanceof wrapper ? Ctor : func; return fn.apply(isBind ? thisArg : this, arguments) } var isBind = bitmask & WRAP_BIND_FLAG,
                      Ctor = createCtor(func); return wrapper
                  }

                  function createCaseFirst(methodName) {
                    return function (string) {
                      string = toString(string); var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined,
                        chr = strSymbols ? strSymbols[0] : string.charAt(0),
                        trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1); return chr[methodName]() + trailing
                    }
                  }

                  function createCompounder(callback) { return function (string) { return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "") } }

                  function createCtor(Ctor) {
                    return function () {
                      var args = arguments; switch (args.length) {
                        case 0:
                          return new Ctor;
                        case 1:
                          return new Ctor(args[0]);
                        case 2:
                          return new Ctor(args[0], args[1]);
                        case 3:
                          return new Ctor(args[0], args[1], args[2]);
                        case 4:
                          return new Ctor(args[0], args[1], args[2], args[3]);
                        case 5:
                          return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                        case 6:
                          return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                        case 7:
                          return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6])
                      } var thisBinding = baseCreate(Ctor.prototype),
                        result = Ctor.apply(thisBinding, args); return isObject(result) ? result : thisBinding
                    }
                  }

                  function createCurry(func, bitmask, arity) {
                    function wrapper() { for (var length = arguments.length, args = Array(length), index = length, placeholder = getHolder(wrapper); index--;) args[index] = arguments[index]; var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder); if (length -= holders.length, length < arity) return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length); var fn = this && this !== root && this instanceof wrapper ? Ctor : func; return apply(fn, this, args) } var Ctor = createCtor(func); return wrapper
                  }

                  function createFind(findIndexFunc) {
                    return function (collection, predicate, fromIndex) {
                      var iterable = Object(collection); if (!isArrayLike(collection)) {
                        var iteratee = getIteratee(predicate, 3);
                        collection = keys(collection), predicate = function (key) { return iteratee(iterable[key], key, iterable) }
                      } var index = findIndexFunc(collection, predicate, fromIndex); return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined
                    }
                  }

                  function createFlow(fromRight) {
                    return flatRest(function (funcs) {
                      var length = funcs.length,
                      index = length,
                      prereq = LodashWrapper.prototype.thru; for (fromRight && funcs.reverse(); index--;) { var func = funcs[index]; if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT); if (prereq && !wrapper && "wrapper" == getFuncName(func)) var wrapper = new LodashWrapper([], !0) } for (index = wrapper ? index : length; ++index < length;) {
                        func = funcs[index]; var funcName = getFuncName(func),
                          data = "wrapper" == funcName ? getData(func) : undefined;
                        wrapper = data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && 1 == data[9] ? wrapper[getFuncName(data[0])].apply(wrapper, data[3]) : 1 == func.length && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func)
                      } return function () {
                        var args = arguments,
                        value = args[0]; if (wrapper && 1 == args.length && isArray(value)) return wrapper.plant(value).value(); for (var index = 0, result = length ? funcs[index].apply(this, args) : value; ++index < length;) result = funcs[index].call(this, result); return result
                      }
                    })
                  }

                  function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
                    function wrapper() {
                      for (var length = arguments.length, args = Array(length), index = length; index--;) args[index] = arguments[index]; if (isCurried) var placeholder = getHolder(wrapper),
                        holdersCount = countHolders(args, placeholder); if (partials && (args = composeArgs(args, partials, holders, isCurried)), partialsRight && (args = composeArgsRight(args, partialsRight, holdersRight, isCurried)), length -= holdersCount, isCurried && length < arity) { var newHolders = replaceHolders(args, placeholder); return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length) } var thisBinding = isBind ? thisArg : this,
                          fn = isBindKey ? thisBinding[func] : func; return length = args.length, argPos ? args = reorder(args, argPos) : isFlip && length > 1 && args.reverse(), isAry && ary < length && (args.length = ary), this && this !== root && this instanceof wrapper && (fn = Ctor || createCtor(fn)), fn.apply(thisBinding, args)
                    } var isAry = bitmask & WRAP_ARY_FLAG,
                      isBind = bitmask & WRAP_BIND_FLAG,
                      isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
                      isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
                      isFlip = bitmask & WRAP_FLIP_FLAG,
                      Ctor = isBindKey ? undefined : createCtor(func); return wrapper
                  }

                  function createInverter(setter, toIteratee) { return function (object, iteratee) { return baseInverter(object, setter, toIteratee(iteratee), {}) } }

                  function createMathOperation(operator, defaultValue) { return function (value, other) { var result; if (value === undefined && other === undefined) return defaultValue; if (value !== undefined && (result = value), other !== undefined) { if (result === undefined) return other; "string" == typeof value || "string" == typeof other ? (value = baseToString(value), other = baseToString(other)) : (value = baseToNumber(value), other = baseToNumber(other)), result = operator(value, other) } return result } }

                  function createOver(arrayFunc) { return flatRest(function (iteratees) { return iteratees = arrayMap(iteratees, baseUnary(getIteratee())), baseRest(function (args) { var thisArg = this; return arrayFunc(iteratees, function (iteratee) { return apply(iteratee, thisArg, args) }) }) }) }

                  function createPadding(length, chars) { chars = chars === undefined ? " " : baseToString(chars); var charsLength = chars.length; if (charsLength < 2) return charsLength ? baseRepeat(chars, length) : chars; var result = baseRepeat(chars, nativeCeil(length / stringSize(chars))); return hasUnicode(chars) ? castSlice(stringToArray(result), 0, length).join("") : result.slice(0, length) }

                  function createPartial(func, bitmask, thisArg, partials) {
                    function wrapper() { for (var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func; ++leftIndex < leftLength;) args[leftIndex] = partials[leftIndex]; for (; argsLength--;) args[leftIndex++] = arguments[++argsIndex]; return apply(fn, isBind ? thisArg : this, args) } var isBind = bitmask & WRAP_BIND_FLAG,
                      Ctor = createCtor(func); return wrapper
                  }

                  function createRange(fromRight) { return function (start, end, step) { return step && "number" != typeof step && isIterateeCall(start, end, step) && (end = step = undefined), start = toFinite(start), end === undefined ? (end = start, start = 0) : end = toFinite(end), step = step === undefined ? start < end ? 1 : -1 : toFinite(step), baseRange(start, end, step, fromRight) } }

                  function createRelationalOperation(operator) { return function (value, other) { return "string" == typeof value && "string" == typeof other || (value = toNumber(value), other = toNumber(other)), operator(value, other) } }

                  function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
                    var isCurry = bitmask & WRAP_CURRY_FLAG,
                    newHolders = isCurry ? holders : undefined,
                    newHoldersRight = isCurry ? undefined : holders,
                    newPartials = isCurry ? partials : undefined,
                    newPartialsRight = isCurry ? undefined : partials;
                    bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG, bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG), bitmask & WRAP_CURRY_BOUND_FLAG || (bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG)); var newData = [func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity],
                      result = wrapFunc.apply(undefined, newData); return isLaziable(func) && setData(result, newData), result.placeholder = placeholder, setWrapToString(result, func, bitmask)
                  }

                  function createRound(methodName) {
                    var func = Math[methodName]; return function (number, precision) {
                      if (number = toNumber(number), precision = null == precision ? 0 : nativeMin(toInteger(precision), 292)) {
                        var pair = (toString(number) + "e").split("e"),
                        value = func(pair[0] + "e" + (+pair[1] + precision)); return pair = (toString(value) + "e").split("e"), +(pair[0] + "e" + (+pair[1] - precision))
                      } return func(number)
                    }
                  }

                  function createToPairs(keysFunc) { return function (object) { var tag = getTag(object); return tag == mapTag ? mapToArray(object) : tag == setTag ? setToPairs(object) : baseToPairs(object, keysFunc(object)) } }

                  function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
                    var isBindKey = bitmask & WRAP_BIND_KEY_FLAG; if (!isBindKey && "function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT); var length = partials ? partials.length : 0; if (length || (bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG), partials = holders = undefined), ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0), arity = arity === undefined ? arity : toInteger(arity), length -= holders ? holders.length : 0, bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
                      var partialsRight = partials,
                      holdersRight = holders;
                      partials = holders = undefined
                    } var data = isBindKey ? undefined : getData(func),
                      newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity]; if (data && mergeData(newData, data), func = newData[0], bitmask = newData[1], thisArg = newData[2], partials = newData[3], holders = newData[4], arity = newData[9] = newData[9] === undefined ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0), !arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG) && (bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)), bitmask && bitmask != WRAP_BIND_FLAG) result = bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG ? createCurry(func, bitmask, arity) : bitmask != WRAP_PARTIAL_FLAG && bitmask != (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG) || holders.length ? createHybrid.apply(undefined, newData) : createPartial(func, bitmask, thisArg, partials);
                    else var result = createBind(func, bitmask, thisArg); var setter = data ? baseSetData : setData; return setWrapToString(setter(result, newData), func, bitmask)
                  }

                  function customDefaultsAssignIn(objValue, srcValue, key, object) { return objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key) ? srcValue : objValue }

                  function customDefaultsMerge(objValue, srcValue, key, object, source, stack) { return isObject(objValue) && isObject(srcValue) && (stack.set(srcValue, objValue), baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack), stack.delete(srcValue)), objValue }

                  function customOmitClone(value) { return isPlainObject(value) ? undefined : value }

                  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
                    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
                    arrLength = array.length,
                    othLength = other.length; if (arrLength != othLength && !(isPartial && othLength > arrLength)) return !1; var stacked = stack.get(array); if (stacked && stack.get(other)) return stacked == other; var index = -1,
                      result = !0,
                      seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache : undefined; for (stack.set(array, other), stack.set(other, array); ++index < arrLength;) {
                        var arrValue = array[index],
                        othValue = other[index]; if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack); if (compared !== undefined) {
                          if (compared) continue;
                          result = !1; break
                        } if (seen) { if (!arraySome(other, function (othValue, othIndex) { if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) return seen.push(othIndex) })) { result = !1; break } } else if (arrValue !== othValue && !equalFunc(arrValue, othValue, bitmask, customizer, stack)) { result = !1; break }
                      } return stack.delete(array), stack.delete(other), result
                  }

                  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
                    switch (tag) {
                      case dataViewTag:
                        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return !1;
                        object = object.buffer, other = other.buffer;
                      case arrayBufferTag:
                        return !(object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other)));
                      case boolTag:
                      case dateTag:
                      case numberTag:
                        return eq(+object, +other);
                      case errorTag:
                        return object.name == other.name && object.message == other.message;
                      case regexpTag:
                      case stringTag:
                        return object == other + "";
                      case mapTag:
                        var convert = mapToArray;
                      case setTag:
                        var isPartial = bitmask & COMPARE_PARTIAL_FLAG; if (convert || (convert = setToArray), object.size != other.size && !isPartial) return !1; var stacked = stack.get(object); if (stacked) return stacked == other;
                        bitmask |= COMPARE_UNORDERED_FLAG, stack.set(object, other); var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack); return stack.delete(object), result;
                      case symbolTag:
                        if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other)
                    } return !1
                  }

                  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
                    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
                    objProps = getAllKeys(object),
                    objLength = objProps.length,
                    othProps = getAllKeys(other),
                    othLength = othProps.length; if (objLength != othLength && !isPartial) return !1; for (var index = objLength; index--;) { var key = objProps[index]; if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) return !1 } var stacked = stack.get(object); if (stacked && stack.get(other)) return stacked == other; var result = !0;
                    stack.set(object, other), stack.set(other, object); for (var skipCtor = isPartial; ++index < objLength;) {
                      key = objProps[index]; var objValue = object[key],
                        othValue = other[key]; if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack); if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) { result = !1; break } skipCtor || (skipCtor = "constructor" == key)
                    } if (result && !skipCtor) {
                      var objCtor = object.constructor,
                      othCtor = other.constructor;
                      objCtor != othCtor && "constructor" in object && "constructor" in other && !("function" == typeof objCtor && objCtor instanceof objCtor && "function" == typeof othCtor && othCtor instanceof othCtor) && (result = !1)
                    } return stack.delete(object), stack.delete(other), result
                  }

                  function flatRest(func) { return setToString(overRest(func, undefined, flatten), func + "") }

                  function getAllKeys(object) { return baseGetAllKeys(object, keys, getSymbols) }

                  function getAllKeysIn(object) { return baseGetAllKeys(object, keysIn, getSymbolsIn) }

                  function getFuncName(func) {
                    for (var result = func.name + "", array = realNames[result], length = hasOwnProperty.call(realNames, result) ? array.length : 0; length--;) {
                      var data = array[length],
                      otherFunc = data.func; if (null == otherFunc || otherFunc == func) return data.name
                    } return result
                  }

                  function getHolder(func) { var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func; return object.placeholder }

                  function getIteratee() { var result = lodash.iteratee || iteratee; return result = result === iteratee ? baseIteratee : result, arguments.length ? result(arguments[0], arguments[1]) : result }

                  function getMapData(map, key) { var data = map.__data__; return isKeyable(key) ? data["string" == typeof key ? "string" : "hash"] : data.map }

                  function getMatchData(object) {
                    for (var result = keys(object), length = result.length; length--;) {
                      var key = result[length],
                      value = object[key];
                      result[length] = [key, value, isStrictComparable(value)]
                    } return result
                  }

                  function getNative(object, key) { var value = getValue(object, key); return baseIsNative(value) ? value : undefined }

                  function getRawTag(value) {
                    var isOwn = hasOwnProperty.call(value, symToStringTag),
                    tag = value[symToStringTag]; try { value[symToStringTag] = undefined; var unmasked = !0 } catch (e) { } var result = nativeObjectToString.call(value); return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]), result
                  }

                  function getView(start, end, transforms) {
                    for (var index = -1, length = transforms.length; ++index < length;) {
                      var data = transforms[index],
                      size = data.size; switch (data.type) {
                        case "drop":
                          start += size; break;
                        case "dropRight":
                          end -= size; break;
                        case "take":
                          end = nativeMin(end, start + size); break;
                        case "takeRight":
                          start = nativeMax(start, end - size)
                      }
                    } return { start: start, end: end }
                  }

                  function getWrapDetails(source) { var match = source.match(reWrapDetails); return match ? match[1].split(reSplitDetails) : [] }

                  function hasPath(object, path, hasFunc) {
                    path = castPath(path, object); for (var index = -1, length = path.length, result = !1; ++index < length;) {
                      var key = toKey(path[index]); if (!(result = null != object && hasFunc(object, key))) break;
                      object = object[key]
                    } return result || ++index != length ? result : (length = null == object ? 0 : object.length, !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object)))
                  }

                  function initCloneArray(array) {
                    var length = array.length,
                    result = array.constructor(length); return length && "string" == typeof array[0] && hasOwnProperty.call(array, "index") && (result.index = array.index, result.input = array.input), result
                  }

                  function initCloneObject(object) { return "function" != typeof object.constructor || isPrototype(object) ? {} : baseCreate(getPrototype(object)) }

                  function initCloneByTag(object, tag, cloneFunc, isDeep) {
                    var Ctor = object.constructor; switch (tag) {
                      case arrayBufferTag:
                        return cloneArrayBuffer(object);
                      case boolTag:
                      case dateTag:
                        return new Ctor(+object);
                      case dataViewTag:
                        return cloneDataView(object, isDeep);
                      case float32Tag:
                      case float64Tag:
                      case int8Tag:
                      case int16Tag:
                      case int32Tag:
                      case uint8Tag:
                      case uint8ClampedTag:
                      case uint16Tag:
                      case uint32Tag:
                        return cloneTypedArray(object, isDeep);
                      case mapTag:
                        return cloneMap(object, isDeep, cloneFunc);
                      case numberTag:
                      case stringTag:
                        return new Ctor(object);
                      case regexpTag:
                        return cloneRegExp(object);
                      case setTag:
                        return cloneSet(object, isDeep, cloneFunc);
                      case symbolTag:
                        return cloneSymbol(object)
                    }
                  }

                  function insertWrapDetails(source, details) { var length = details.length; if (!length) return source; var lastIndex = length - 1; return details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex], details = details.join(length > 2 ? ", " : " "), source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n") }

                  function isFlattenable(value) { return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]) }

                  function isIndex(value, length) { return length = null == length ? MAX_SAFE_INTEGER : length, !!length && ("number" == typeof value || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length }

                  function isIterateeCall(value, index, object) { if (!isObject(object)) return !1; var type = typeof index; return !!("number" == type ? isArrayLike(object) && isIndex(index, object.length) : "string" == type && index in object) && eq(object[index], value) }

                  function isKey(value, object) { if (isArray(value)) return !1; var type = typeof value; return !("number" != type && "symbol" != type && "boolean" != type && null != value && !isSymbol(value)) || (reIsPlainProp.test(value) || !reIsDeepProp.test(value) || null != object && value in Object(object)) }

                  function isKeyable(value) { var type = typeof value; return "string" == type || "number" == type || "symbol" == type || "boolean" == type ? "__proto__" !== value : null === value }

                  function isLaziable(func) {
                    var funcName = getFuncName(func),
                    other = lodash[funcName]; if ("function" != typeof other || !(funcName in LazyWrapper.prototype)) return !1; if (func === other) return !0; var data = getData(other); return !!data && func === data[0]
                  }

                  function isMasked(func) { return !!maskSrcKey && maskSrcKey in func }

                  function isPrototype(value) {
                    var Ctor = value && value.constructor,
                    proto = "function" == typeof Ctor && Ctor.prototype || objectProto; return value === proto
                  }

                  function isStrictComparable(value) { return value === value && !isObject(value) }

                  function matchesStrictComparable(key, srcValue) { return function (object) { return null != object && (object[key] === srcValue && (srcValue !== undefined || key in Object(object))) } }

                  function memoizeCapped(func) {
                    var result = memoize(func, function (key) { return cache.size === MAX_MEMOIZE_SIZE && cache.clear(), key }),
                    cache = result.cache; return result
                  }

                  function mergeData(data, source) {
                    var bitmask = data[1],
                    srcBitmask = source[1],
                    newBitmask = bitmask | srcBitmask,
                    isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG),
                    isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG; if (!isCommon && !isCombo) return data;
                    srcBitmask & WRAP_BIND_FLAG && (data[2] = source[2], newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG); var value = source[3]; if (value) {
                      var partials = data[3];
                      data[3] = partials ? composeArgs(partials, value, source[4]) : value, data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4]
                    } return value = source[5], value && (partials = data[5], data[5] = partials ? composeArgsRight(partials, value, source[6]) : value, data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6]), value = source[7], value && (data[7] = value), srcBitmask & WRAP_ARY_FLAG && (data[8] = null == data[8] ? source[8] : nativeMin(data[8], source[8])), null == data[9] && (data[9] = source[9]), data[0] = source[0], data[1] = newBitmask, data
                  }

                  function nativeKeysIn(object) {
                    var result = []; if (null != object)
                      for (var key in Object(object)) result.push(key); return result
                  }

                  function objectToString(value) { return nativeObjectToString.call(value) }

                  function overRest(func, start, transform) {
                    return start = nativeMax(start === undefined ? func.length - 1 : start, 0),
                      function () {
                        for (var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length); ++index < length;) array[index] = args[start + index];
                        index = -1; for (var otherArgs = Array(start + 1); ++index < start;) otherArgs[index] = args[index]; return otherArgs[start] = transform(array), apply(func, this, otherArgs)
                      }
                  }

                  function parent(object, path) { return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1)) }

                  function reorder(array, indexes) {
                    for (var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array); length--;) {
                      var index = indexes[length];
                      array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined
                    } return array
                  }

                  function setWrapToString(wrapper, reference, bitmask) { var source = reference + ""; return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask))) }

                  function shortOut(func) {
                    var count = 0,
                    lastCalled = 0; return function () {
                      var stamp = nativeNow(),
                      remaining = HOT_SPAN - (stamp - lastCalled); if (lastCalled = stamp, remaining > 0) { if (++count >= HOT_COUNT) return arguments[0] } else count = 0; return func.apply(undefined, arguments)
                    }
                  }

                  function shuffleSelf(array, size) {
                    var index = -1,
                    length = array.length,
                    lastIndex = length - 1; for (size = size === undefined ? length : size; ++index < size;) {
                      var rand = baseRandom(index, lastIndex),
                      value = array[rand];
                      array[rand] = array[index], array[index] = value
                    } return array.length = size, array
                  }

                  function toKey(value) { if ("string" == typeof value || isSymbol(value)) return value; var result = value + ""; return "0" == result && 1 / value == -INFINITY ? "-0" : result }

                  function toSource(func) { if (null != func) { try { return funcToString.call(func) } catch (e) { } try { return func + "" } catch (e) { } } return "" }

                  function updateWrapDetails(details, bitmask) {
                    return arrayEach(wrapFlags, function (pair) {
                      var value = "_." + pair[0];
                      bitmask & pair[1] && !arrayIncludes(details, value) && details.push(value)
                    }), details.sort()
                  }

                  function wrapperClone(wrapper) { if (wrapper instanceof LazyWrapper) return wrapper.clone(); var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__); return result.__actions__ = copyArray(wrapper.__actions__), result.__index__ = wrapper.__index__, result.__values__ = wrapper.__values__, result }

                  function chunk(array, size, guard) { size = (guard ? isIterateeCall(array, size, guard) : size === undefined) ? 1 : nativeMax(toInteger(size), 0); var length = null == array ? 0 : array.length; if (!length || size < 1) return []; for (var index = 0, resIndex = 0, result = Array(nativeCeil(length / size)); index < length;) result[resIndex++] = baseSlice(array, index, index += size); return result }

                  function compact(array) {
                    for (var index = -1, length = null == array ? 0 : array.length, resIndex = 0, result = []; ++index < length;) {
                      var value = array[index];
                      value && (result[resIndex++] = value)
                    } return result
                  }

                  function concat() { var length = arguments.length; if (!length) return []; for (var args = Array(length - 1), array = arguments[0], index = length; index--;) args[index - 1] = arguments[index]; return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1)) }

                  function drop(array, n, guard) { var length = null == array ? 0 : array.length; return length ? (n = guard || n === undefined ? 1 : toInteger(n), baseSlice(array, n < 0 ? 0 : n, length)) : [] }

                  function dropRight(array, n, guard) { var length = null == array ? 0 : array.length; return length ? (n = guard || n === undefined ? 1 : toInteger(n), n = length - n, baseSlice(array, 0, n < 0 ? 0 : n)) : [] }

                  function dropRightWhile(array, predicate) { return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !0, !0) : [] }

                  function dropWhile(array, predicate) { return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !0) : [] }

                  function fill(array, value, start, end) { var length = null == array ? 0 : array.length; return length ? (start && "number" != typeof start && isIterateeCall(array, value, start) && (start = 0, end = length), baseFill(array, value, start, end)) : [] }

                  function findIndex(array, predicate, fromIndex) { var length = null == array ? 0 : array.length; if (!length) return -1; var index = null == fromIndex ? 0 : toInteger(fromIndex); return index < 0 && (index = nativeMax(length + index, 0)), baseFindIndex(array, getIteratee(predicate, 3), index) }

                  function findLastIndex(array, predicate, fromIndex) { var length = null == array ? 0 : array.length; if (!length) return -1; var index = length - 1; return fromIndex !== undefined && (index = toInteger(fromIndex), index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1)), baseFindIndex(array, getIteratee(predicate, 3), index, !0) }

                  function flatten(array) { var length = null == array ? 0 : array.length; return length ? baseFlatten(array, 1) : [] }

                  function flattenDeep(array) { var length = null == array ? 0 : array.length; return length ? baseFlatten(array, INFINITY) : [] }

                  function flattenDepth(array, depth) { var length = null == array ? 0 : array.length; return length ? (depth = depth === undefined ? 1 : toInteger(depth), baseFlatten(array, depth)) : [] }

                  function fromPairs(pairs) {
                    for (var index = -1, length = null == pairs ? 0 : pairs.length, result = {}; ++index < length;) {
                      var pair = pairs[index];
                      result[pair[0]] = pair[1]
                    } return result
                  }

                  function head(array) { return array && array.length ? array[0] : undefined }

                  function indexOf(array, value, fromIndex) { var length = null == array ? 0 : array.length; if (!length) return -1; var index = null == fromIndex ? 0 : toInteger(fromIndex); return index < 0 && (index = nativeMax(length + index, 0)), baseIndexOf(array, value, index) }

                  function initial(array) { var length = null == array ? 0 : array.length; return length ? baseSlice(array, 0, -1) : [] }

                  function join(array, separator) { return null == array ? "" : nativeJoin.call(array, separator) }

                  function last(array) { var length = null == array ? 0 : array.length; return length ? array[length - 1] : undefined }

                  function lastIndexOf(array, value, fromIndex) { var length = null == array ? 0 : array.length; if (!length) return -1; var index = length; return fromIndex !== undefined && (index = toInteger(fromIndex), index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1)), value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, !0) }

                  function nth(array, n) { return array && array.length ? baseNth(array, toInteger(n)) : undefined }

                  function pullAll(array, values) { return array && array.length && values && values.length ? basePullAll(array, values) : array }

                  function pullAllBy(array, values, iteratee) { return array && array.length && values && values.length ? basePullAll(array, values, getIteratee(iteratee, 2)) : array }

                  function pullAllWith(array, values, comparator) { return array && array.length && values && values.length ? basePullAll(array, values, undefined, comparator) : array }

                  function remove(array, predicate) {
                    var result = []; if (!array || !array.length) return result; var index = -1,
                      indexes = [],
                      length = array.length; for (predicate = getIteratee(predicate, 3); ++index < length;) {
                        var value = array[index];
                        predicate(value, index, array) && (result.push(value), indexes.push(index))
                      } return basePullAt(array, indexes), result
                  }

                  function reverse(array) { return null == array ? array : nativeReverse.call(array) }

                  function slice(array, start, end) { var length = null == array ? 0 : array.length; return length ? (end && "number" != typeof end && isIterateeCall(array, start, end) ? (start = 0, end = length) : (start = null == start ? 0 : toInteger(start), end = end === undefined ? length : toInteger(end)), baseSlice(array, start, end)) : [] }

                  function sortedIndex(array, value) { return baseSortedIndex(array, value) }

                  function sortedIndexBy(array, value, iteratee) { return baseSortedIndexBy(array, value, getIteratee(iteratee, 2)) }

                  function sortedIndexOf(array, value) { var length = null == array ? 0 : array.length; if (length) { var index = baseSortedIndex(array, value); if (index < length && eq(array[index], value)) return index } return -1 }

                  function sortedLastIndex(array, value) { return baseSortedIndex(array, value, !0) }

                  function sortedLastIndexBy(array, value, iteratee) {
                    return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), !0);
                  }

                  function sortedLastIndexOf(array, value) { var length = null == array ? 0 : array.length; if (length) { var index = baseSortedIndex(array, value, !0) - 1; if (eq(array[index], value)) return index } return -1 }

                  function sortedUniq(array) { return array && array.length ? baseSortedUniq(array) : [] }

                  function sortedUniqBy(array, iteratee) { return array && array.length ? baseSortedUniq(array, getIteratee(iteratee, 2)) : [] }

                  function tail(array) { var length = null == array ? 0 : array.length; return length ? baseSlice(array, 1, length) : [] }

                  function take(array, n, guard) { return array && array.length ? (n = guard || n === undefined ? 1 : toInteger(n), baseSlice(array, 0, n < 0 ? 0 : n)) : [] }

                  function takeRight(array, n, guard) { var length = null == array ? 0 : array.length; return length ? (n = guard || n === undefined ? 1 : toInteger(n), n = length - n, baseSlice(array, n < 0 ? 0 : n, length)) : [] }

                  function takeRightWhile(array, predicate) { return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !1, !0) : [] }

                  function takeWhile(array, predicate) { return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [] }

                  function uniq(array) { return array && array.length ? baseUniq(array) : [] }

                  function uniqBy(array, iteratee) { return array && array.length ? baseUniq(array, getIteratee(iteratee, 2)) : [] }

                  function uniqWith(array, comparator) { return comparator = "function" == typeof comparator ? comparator : undefined, array && array.length ? baseUniq(array, undefined, comparator) : [] }

                  function unzip(array) { if (!array || !array.length) return []; var length = 0; return array = arrayFilter(array, function (group) { if (isArrayLikeObject(group)) return length = nativeMax(group.length, length), !0 }), baseTimes(length, function (index) { return arrayMap(array, baseProperty(index)) }) }

                  function unzipWith(array, iteratee) { if (!array || !array.length) return []; var result = unzip(array); return null == iteratee ? result : arrayMap(result, function (group) { return apply(iteratee, undefined, group) }) }

                  function zipObject(props, values) { return baseZipObject(props || [], values || [], assignValue) }

                  function zipObjectDeep(props, values) { return baseZipObject(props || [], values || [], baseSet) }

                  function chain(value) { var result = lodash(value); return result.__chain__ = !0, result }

                  function tap(value, interceptor) { return interceptor(value), value }

                  function thru(value, interceptor) { return interceptor(value) }

                  function wrapperChain() { return chain(this) }

                  function wrapperCommit() { return new LodashWrapper(this.value(), this.__chain__) }

                  function wrapperNext() {
                  this.__values__ === undefined && (this.__values__ = toArray(this.value())); var done = this.__index__ >= this.__values__.length,
                    value = done ? undefined : this.__values__[this.__index__++]; return { done: done, value: value }
                  }

                  function wrapperToIterator() { return this }

                  function wrapperPlant(value) {
                    for (var result, parent = this; parent instanceof baseLodash;) {
                      var clone = wrapperClone(parent);
                      clone.__index__ = 0, clone.__values__ = undefined, result ? previous.__wrapped__ = clone : result = clone; var previous = clone;
                      parent = parent.__wrapped__
                    } return previous.__wrapped__ = value, result
                  }

                  function wrapperReverse() { var value = this.__wrapped__; if (value instanceof LazyWrapper) { var wrapped = value; return this.__actions__.length && (wrapped = new LazyWrapper(this)), wrapped = wrapped.reverse(), wrapped.__actions__.push({ func: thru, args: [reverse], thisArg: undefined }), new LodashWrapper(wrapped, this.__chain__) } return this.thru(reverse) }

                  function wrapperValue() { return baseWrapperValue(this.__wrapped__, this.__actions__) }

                  function every(collection, predicate, guard) { var func = isArray(collection) ? arrayEvery : baseEvery; return guard && isIterateeCall(collection, predicate, guard) && (predicate = undefined), func(collection, getIteratee(predicate, 3)) }

                  function filter(collection, predicate) { var func = isArray(collection) ? arrayFilter : baseFilter; return func(collection, getIteratee(predicate, 3)) }

                  function flatMap(collection, iteratee) { return baseFlatten(map(collection, iteratee), 1) }

                  function flatMapDeep(collection, iteratee) { return baseFlatten(map(collection, iteratee), INFINITY) }

                  function flatMapDepth(collection, iteratee, depth) { return depth = depth === undefined ? 1 : toInteger(depth), baseFlatten(map(collection, iteratee), depth) }

                  function forEach(collection, iteratee) { var func = isArray(collection) ? arrayEach : baseEach; return func(collection, getIteratee(iteratee, 3)) }

                  function forEachRight(collection, iteratee) { var func = isArray(collection) ? arrayEachRight : baseEachRight; return func(collection, getIteratee(iteratee, 3)) }

                  function includes(collection, value, fromIndex, guard) { collection = isArrayLike(collection) ? collection : values(collection), fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0; var length = collection.length; return fromIndex < 0 && (fromIndex = nativeMax(length + fromIndex, 0)), isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1 }

                  function map(collection, iteratee) { var func = isArray(collection) ? arrayMap : baseMap; return func(collection, getIteratee(iteratee, 3)) }

                  function orderBy(collection, iteratees, orders, guard) { return null == collection ? [] : (isArray(iteratees) || (iteratees = null == iteratees ? [] : [iteratees]), orders = guard ? undefined : orders, isArray(orders) || (orders = null == orders ? [] : [orders]), baseOrderBy(collection, iteratees, orders)) }

                  function reduce(collection, iteratee, accumulator) {
                    var func = isArray(collection) ? arrayReduce : baseReduce,
                    initAccum = arguments.length < 3; return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach)
                  }

                  function reduceRight(collection, iteratee, accumulator) {
                    var func = isArray(collection) ? arrayReduceRight : baseReduce,
                    initAccum = arguments.length < 3; return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight)
                  }

                  function reject(collection, predicate) { var func = isArray(collection) ? arrayFilter : baseFilter; return func(collection, negate(getIteratee(predicate, 3))) }

                  function sample(collection) { var func = isArray(collection) ? arraySample : baseSample; return func(collection) }

                  function sampleSize(collection, n, guard) { n = (guard ? isIterateeCall(collection, n, guard) : n === undefined) ? 1 : toInteger(n); var func = isArray(collection) ? arraySampleSize : baseSampleSize; return func(collection, n) }

                  function shuffle(collection) { var func = isArray(collection) ? arrayShuffle : baseShuffle; return func(collection) }

                  function size(collection) { if (null == collection) return 0; if (isArrayLike(collection)) return isString(collection) ? stringSize(collection) : collection.length; var tag = getTag(collection); return tag == mapTag || tag == setTag ? collection.size : baseKeys(collection).length }

                  function some(collection, predicate, guard) { var func = isArray(collection) ? arraySome : baseSome; return guard && isIterateeCall(collection, predicate, guard) && (predicate = undefined), func(collection, getIteratee(predicate, 3)) }

                  function after(n, func) {
                    if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT); return n = toInteger(n),
                      function () { if (--n < 1) return func.apply(this, arguments) }
                  }

                  function ary(func, n, guard) { return n = guard ? undefined : n, n = func && null == n ? func.length : n, createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n) }

                  function before(n, func) {
                    var result; if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT); return n = toInteger(n),
                      function () { return --n > 0 && (result = func.apply(this, arguments)), n <= 1 && (func = undefined), result }
                  }

                  function curry(func, arity, guard) { arity = guard ? undefined : arity; var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity); return result.placeholder = curry.placeholder, result }

                  function curryRight(func, arity, guard) { arity = guard ? undefined : arity; var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity); return result.placeholder = curryRight.placeholder, result }

                  function debounce(func, wait, options) {
                    function invokeFunc(time) {
                      var args = lastArgs,
                      thisArg = lastThis; return lastArgs = lastThis = undefined, lastInvokeTime = time, result = func.apply(thisArg, args)
                    }

                    function leadingEdge(time) { return lastInvokeTime = time, timerId = setTimeout(timerExpired, wait), leading ? invokeFunc(time) : result }

                    function remainingWait(time) {
                      var timeSinceLastCall = time - lastCallTime,
                      timeSinceLastInvoke = time - lastInvokeTime,
                      result = wait - timeSinceLastCall; return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result
                    }

                    function shouldInvoke(time) {
                      var timeSinceLastCall = time - lastCallTime,
                      timeSinceLastInvoke = time - lastInvokeTime; return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait
                    }

                    function timerExpired() { var time = now(); return shouldInvoke(time) ? trailingEdge(time) : void (timerId = setTimeout(timerExpired, remainingWait(time))) }

                    function trailingEdge(time) { return timerId = undefined, trailing && lastArgs ? invokeFunc(time) : (lastArgs = lastThis = undefined, result) }

                    function cancel() { timerId !== undefined && clearTimeout(timerId), lastInvokeTime = 0, lastArgs = lastCallTime = lastThis = timerId = undefined }

                    function flush() { return timerId === undefined ? result : trailingEdge(now()) }

                    function debounced() {
                      var time = now(),
                      isInvoking = shouldInvoke(time); if (lastArgs = arguments, lastThis = this, lastCallTime = time, isInvoking) { if (timerId === undefined) return leadingEdge(lastCallTime); if (maxing) return timerId = setTimeout(timerExpired, wait), invokeFunc(lastCallTime) } return timerId === undefined && (timerId = setTimeout(timerExpired, wait)), result
                    } var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0,
                      leading = !1,
                      maxing = !1,
                      trailing = !0; if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT); return wait = toNumber(wait) || 0, isObject(options) && (leading = !!options.leading, maxing = "maxWait" in options, maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait, trailing = "trailing" in options ? !!options.trailing : trailing), debounced.cancel = cancel, debounced.flush = flush, debounced
                  }

                  function flip(func) { return createWrap(func, WRAP_FLIP_FLAG) }

                  function memoize(func, resolver) {
                    if ("function" != typeof func || null != resolver && "function" != typeof resolver) throw new TypeError(FUNC_ERROR_TEXT); var memoized = function () {
                      var args = arguments,
                      key = resolver ? resolver.apply(this, args) : args[0],
                      cache = memoized.cache; if (cache.has(key)) return cache.get(key); var result = func.apply(this, args); return memoized.cache = cache.set(key, result) || cache, result
                    }; return memoized.cache = new (memoize.Cache || MapCache), memoized
                  }

                  function negate(predicate) {
                    if ("function" != typeof predicate) throw new TypeError(FUNC_ERROR_TEXT); return function () {
                      var args = arguments; switch (args.length) {
                        case 0:
                          return !predicate.call(this);
                        case 1:
                          return !predicate.call(this, args[0]);
                        case 2:
                          return !predicate.call(this, args[0], args[1]);
                        case 3:
                          return !predicate.call(this, args[0], args[1], args[2])
                      } return !predicate.apply(this, args)
                    }
                  }

                  function once(func) { return before(2, func) }

                  function rest(func, start) { if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT); return start = start === undefined ? start : toInteger(start), baseRest(func, start) }

                  function spread(func, start) {
                    if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT); return start = null == start ? 0 : nativeMax(toInteger(start), 0), baseRest(function (args) {
                      var array = args[start],
                      otherArgs = castSlice(args, 0, start); return array && arrayPush(otherArgs, array), apply(func, this, otherArgs)
                    })
                  }

                  function throttle(func, wait, options) {
                    var leading = !0,
                    trailing = !0; if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT); return isObject(options) && (leading = "leading" in options ? !!options.leading : leading, trailing = "trailing" in options ? !!options.trailing : trailing), debounce(func, wait, { leading: leading, maxWait: wait, trailing: trailing })
                  }

                  function unary(func) { return ary(func, 1) }

                  function wrap(value, wrapper) { return partial(castFunction(wrapper), value) }

                  function castArray() { if (!arguments.length) return []; var value = arguments[0]; return isArray(value) ? value : [value] }

                  function clone(value) { return baseClone(value, CLONE_SYMBOLS_FLAG) }

                  function cloneWith(value, customizer) { return customizer = "function" == typeof customizer ? customizer : undefined, baseClone(value, CLONE_SYMBOLS_FLAG, customizer) }

                  function cloneDeep(value) { return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG) }

                  function cloneDeepWith(value, customizer) { return customizer = "function" == typeof customizer ? customizer : undefined, baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer) }

                  function conformsTo(object, source) { return null == source || baseConformsTo(object, source, keys(source)) }

                  function eq(value, other) { return value === other || value !== value && other !== other }

                  function isArrayLike(value) { return null != value && isLength(value.length) && !isFunction(value) }

                  function isArrayLikeObject(value) { return isObjectLike(value) && isArrayLike(value) }

                  function isBoolean(value) { return value === !0 || value === !1 || isObjectLike(value) && baseGetTag(value) == boolTag }

                  function isElement(value) { return isObjectLike(value) && 1 === value.nodeType && !isPlainObject(value) }

                  function isEmpty(value) {
                    if (null == value) return !0; if (isArrayLike(value) && (isArray(value) || "string" == typeof value || "function" == typeof value.splice || isBuffer(value) || isTypedArray(value) || isArguments(value))) return !value.length; var tag = getTag(value); if (tag == mapTag || tag == setTag) return !value.size; if (isPrototype(value)) return !baseKeys(value).length; for (var key in value)
                      if (hasOwnProperty.call(value, key)) return !1; return !0
                  }

                  function isEqual(value, other) { return baseIsEqual(value, other) }

                  function isEqualWith(value, other, customizer) { customizer = "function" == typeof customizer ? customizer : undefined; var result = customizer ? customizer(value, other) : undefined; return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result }

                  function isError(value) { if (!isObjectLike(value)) return !1; var tag = baseGetTag(value); return tag == errorTag || tag == domExcTag || "string" == typeof value.message && "string" == typeof value.name && !isPlainObject(value) }

                  function isFinite(value) { return "number" == typeof value && nativeIsFinite(value) }

                  function isFunction(value) { if (!isObject(value)) return !1; var tag = baseGetTag(value); return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag }

                  function isInteger(value) { return "number" == typeof value && value == toInteger(value) }

                  function isLength(value) { return "number" == typeof value && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER }

                  function isObject(value) { var type = typeof value; return null != value && ("object" == type || "function" == type) }

                  function isObjectLike(value) { return null != value && "object" == typeof value }

                  function isMatch(object, source) { return object === source || baseIsMatch(object, source, getMatchData(source)) }

                  function isMatchWith(object, source, customizer) { return customizer = "function" == typeof customizer ? customizer : undefined, baseIsMatch(object, source, getMatchData(source), customizer) }

                  function isNaN(value) { return isNumber(value) && value != +value }

                  function isNative(value) { if (isMaskable(value)) throw new Error(CORE_ERROR_TEXT); return baseIsNative(value) }

                  function isNull(value) { return null === value }

                  function isNil(value) { return null == value }

                  function isNumber(value) { return "number" == typeof value || isObjectLike(value) && baseGetTag(value) == numberTag }

                  function isPlainObject(value) { if (!isObjectLike(value) || baseGetTag(value) != objectTag) return !1; var proto = getPrototype(value); if (null === proto) return !0; var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor; return "function" == typeof Ctor && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString }

                  function isSafeInteger(value) { return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER }

                  function isString(value) { return "string" == typeof value || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag }

                  function isSymbol(value) { return "symbol" == typeof value || isObjectLike(value) && baseGetTag(value) == symbolTag }

                  function isUndefined(value) { return value === undefined }

                  function isWeakMap(value) { return isObjectLike(value) && getTag(value) == weakMapTag }

                  function isWeakSet(value) { return isObjectLike(value) && baseGetTag(value) == weakSetTag }

                  function toArray(value) {
                    if (!value) return []; if (isArrayLike(value)) return isString(value) ? stringToArray(value) : copyArray(value); if (symIterator && value[symIterator]) return iteratorToArray(value[symIterator]()); var tag = getTag(value),
                      func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values; return func(value)
                  }

                  function toFinite(value) { if (!value) return 0 === value ? value : 0; if (value = toNumber(value), value === INFINITY || value === -INFINITY) { var sign = value < 0 ? -1 : 1; return sign * MAX_INTEGER } return value === value ? value : 0 }

                  function toInteger(value) {
                    var result = toFinite(value),
                    remainder = result % 1; return result === result ? remainder ? result - remainder : result : 0
                  }

                  function toLength(value) { return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0 }

                  function toNumber(value) {
                    if ("number" == typeof value) return value; if (isSymbol(value)) return NAN; if (isObject(value)) {
                      var other = "function" == typeof value.valueOf ? value.valueOf() : value;
                      value = isObject(other) ? other + "" : other
                    } if ("string" != typeof value) return 0 === value ? value : +value;
                    value = value.replace(reTrim, ""); var isBinary = reIsBinary.test(value); return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value
                  }

                  function toPlainObject(value) { return copyObject(value, keysIn(value)) }

                  function toSafeInteger(value) { return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : 0 === value ? value : 0 }

                  function toString(value) { return null == value ? "" : baseToString(value) }

                  function create(prototype, properties) { var result = baseCreate(prototype); return null == properties ? result : baseAssign(result, properties) }

                  function findKey(object, predicate) { return baseFindKey(object, getIteratee(predicate, 3), baseForOwn) }

                  function findLastKey(object, predicate) { return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight) }

                  function forIn(object, iteratee) { return null == object ? object : baseFor(object, getIteratee(iteratee, 3), keysIn) }

                  function forInRight(object, iteratee) { return null == object ? object : baseForRight(object, getIteratee(iteratee, 3), keysIn) }

                  function forOwn(object, iteratee) { return object && baseForOwn(object, getIteratee(iteratee, 3)) }

                  function forOwnRight(object, iteratee) { return object && baseForOwnRight(object, getIteratee(iteratee, 3)) }

                  function functions(object) { return null == object ? [] : baseFunctions(object, keys(object)) }

                  function functionsIn(object) { return null == object ? [] : baseFunctions(object, keysIn(object)) }

                  function get(object, path, defaultValue) { var result = null == object ? undefined : baseGet(object, path); return result === undefined ? defaultValue : result }

                  function has(object, path) { return null != object && hasPath(object, path, baseHas) }

                  function hasIn(object, path) { return null != object && hasPath(object, path, baseHasIn) }

                  function keys(object) { return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object) }

                  function keysIn(object) { return isArrayLike(object) ? arrayLikeKeys(object, !0) : baseKeysIn(object) }

                  function mapKeys(object, iteratee) { var result = {}; return iteratee = getIteratee(iteratee, 3), baseForOwn(object, function (value, key, object) { baseAssignValue(result, iteratee(value, key, object), value) }), result }

                  function mapValues(object, iteratee) { var result = {}; return iteratee = getIteratee(iteratee, 3), baseForOwn(object, function (value, key, object) { baseAssignValue(result, key, iteratee(value, key, object)) }), result }

                  function omitBy(object, predicate) { return pickBy(object, negate(getIteratee(predicate))) }

                  function pickBy(object, predicate) { if (null == object) return {}; var props = arrayMap(getAllKeysIn(object), function (prop) { return [prop] }); return predicate = getIteratee(predicate), basePickBy(object, props, function (value, path) { return predicate(value, path[0]) }) }

                  function result(object, path, defaultValue) {
                    path = castPath(path, object); var index = -1,
                      length = path.length; for (length || (length = 1, object = undefined); ++index < length;) {
                        var value = null == object ? undefined : object[toKey(path[index])];
                        value === undefined && (index = length, value = defaultValue), object = isFunction(value) ? value.call(object) : value
                      } return object
                  }

                  function set(object, path, value) { return null == object ? object : baseSet(object, path, value) }

                  function setWith(object, path, value, customizer) { return customizer = "function" == typeof customizer ? customizer : undefined, null == object ? object : baseSet(object, path, value, customizer) }

                  function transform(object, iteratee, accumulator) {
                    var isArr = isArray(object),
                    isArrLike = isArr || isBuffer(object) || isTypedArray(object); if (iteratee = getIteratee(iteratee, 4), null == accumulator) {
                      var Ctor = object && object.constructor;
                      accumulator = isArrLike ? isArr ? new Ctor : [] : isObject(object) && isFunction(Ctor) ? baseCreate(getPrototype(object)) : {}
                    } return (isArrLike ? arrayEach : baseForOwn)(object, function (value, index, object) { return iteratee(accumulator, value, index, object) }), accumulator
                  }

                  function unset(object, path) { return null == object || baseUnset(object, path) }

                  function update(object, path, updater) { return null == object ? object : baseUpdate(object, path, castFunction(updater)) }

                  function updateWith(object, path, updater, customizer) { return customizer = "function" == typeof customizer ? customizer : undefined, null == object ? object : baseUpdate(object, path, castFunction(updater), customizer) }

                  function values(object) { return null == object ? [] : baseValues(object, keys(object)) }

                  function valuesIn(object) { return null == object ? [] : baseValues(object, keysIn(object)) }

                  function clamp(number, lower, upper) { return upper === undefined && (upper = lower, lower = undefined), upper !== undefined && (upper = toNumber(upper), upper = upper === upper ? upper : 0), lower !== undefined && (lower = toNumber(lower), lower = lower === lower ? lower : 0), baseClamp(toNumber(number), lower, upper) }

                  function inRange(number, start, end) { return start = toFinite(start), end === undefined ? (end = start, start = 0) : end = toFinite(end), number = toNumber(number), baseInRange(number, start, end) }

                  function random(lower, upper, floating) {
                    if (floating && "boolean" != typeof floating && isIterateeCall(lower, upper, floating) && (upper = floating = undefined), floating === undefined && ("boolean" == typeof upper ? (floating = upper, upper = undefined) : "boolean" == typeof lower && (floating = lower, lower = undefined)), lower === undefined && upper === undefined ? (lower = 0, upper = 1) : (lower = toFinite(lower), upper === undefined ? (upper = lower, lower = 0) : upper = toFinite(upper)), lower > upper) {
                      var temp = lower;
                      lower = upper, upper = temp
                    } if (floating || lower % 1 || upper % 1) { var rand = nativeRandom(); return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper) } return baseRandom(lower, upper)
                  }

                  function capitalize(string) { return upperFirst(toString(string).toLowerCase()) }

                  function deburr(string) { return string = toString(string), string && string.replace(reLatin, deburrLetter).replace(reComboMark, "") }

                  function endsWith(string, target, position) {
                  string = toString(string), target = baseToString(target); var length = string.length;
                    position = position === undefined ? length : baseClamp(toInteger(position), 0, length); var end = position; return position -= target.length, position >= 0 && string.slice(position, end) == target
                  }

                  function escape(string) { return string = toString(string), string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string }

                  function escapeRegExp(string) { return string = toString(string), string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string }

                  function pad(string, length, chars) { string = toString(string), length = toInteger(length); var strLength = length ? stringSize(string) : 0; if (!length || strLength >= length) return string; var mid = (length - strLength) / 2; return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars) }

                  function padEnd(string, length, chars) { string = toString(string), length = toInteger(length); var strLength = length ? stringSize(string) : 0; return length && strLength < length ? string + createPadding(length - strLength, chars) : string }

                  function padStart(string, length, chars) { string = toString(string), length = toInteger(length); var strLength = length ? stringSize(string) : 0; return length && strLength < length ? createPadding(length - strLength, chars) + string : string }

                  function parseInt(string, radix, guard) { return guard || null == radix ? radix = 0 : radix && (radix = +radix), nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0) }

                  function repeat(string, n, guard) { return n = (guard ? isIterateeCall(string, n, guard) : n === undefined) ? 1 : toInteger(n), baseRepeat(toString(string), n) }

                  function replace() {
                    var args = arguments,
                    string = toString(args[0]); return args.length < 3 ? string : string.replace(args[1], args[2])
                  }

                  function split(string, separator, limit) { return limit && "number" != typeof limit && isIterateeCall(string, separator, limit) && (separator = limit = undefined), (limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0) ? (string = toString(string), string && ("string" == typeof separator || null != separator && !isRegExp(separator)) && (separator = baseToString(separator), !separator && hasUnicode(string)) ? castSlice(stringToArray(string), 0, limit) : string.split(separator, limit)) : [] }

                  function startsWith(string, target, position) { return string = toString(string), position = null == position ? 0 : baseClamp(toInteger(position), 0, string.length), target = baseToString(target), string.slice(position, position + target.length) == target }

                  function template(string, options, guard) {
                    var settings = lodash.templateSettings;
                    guard && isIterateeCall(string, options, guard) && (options = undefined), string = toString(string), options = assignInWith({}, options, settings, customDefaultsAssignIn); var isEscaping, isEvaluating, imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
                      importsKeys = keys(imports),
                      importsValues = baseValues(imports, importsKeys),
                      index = 0,
                      interpolate = options.interpolate || reNoMatch,
                      source = "__p += '",
                      reDelimiters = RegExp((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g"),
                      sourceURL = "//# sourceURL=" + ("sourceURL" in options ? options.sourceURL : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
                    string.replace(reDelimiters, function (match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) { return interpolateValue || (interpolateValue = esTemplateValue), source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar), escapeValue && (isEscaping = !0, source += "' +\n__e(" + escapeValue + ") +\n'"), evaluateValue && (isEvaluating = !0, source += "';\n" + evaluateValue + ";\n__p += '"), interpolateValue && (source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'"), index = offset + match.length, match }), source += "';\n"; var variable = options.variable;
                    variable || (source = "with (obj) {\n" + source + "\n}\n"), source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;"), source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}"; var result = attempt(function () { return Function(importsKeys, sourceURL + "return " + source).apply(undefined, importsValues) }); if (result.source = source, isError(result)) throw result; return result
                  }

                  function toLower(value) { return toString(value).toLowerCase() }

                  function toUpper(value) { return toString(value).toUpperCase() }

                  function trim(string, chars, guard) {
                    if (string = toString(string), string && (guard || chars === undefined)) return string.replace(reTrim, ""); if (!string || !(chars = baseToString(chars))) return string; var strSymbols = stringToArray(string),
                      chrSymbols = stringToArray(chars),
                      start = charsStartIndex(strSymbols, chrSymbols),
                      end = charsEndIndex(strSymbols, chrSymbols) + 1; return castSlice(strSymbols, start, end).join("")
                  }

                  function trimEnd(string, chars, guard) {
                    if (string = toString(string), string && (guard || chars === undefined)) return string.replace(reTrimEnd, ""); if (!string || !(chars = baseToString(chars))) return string; var strSymbols = stringToArray(string),
                      end = charsEndIndex(strSymbols, stringToArray(chars)) + 1; return castSlice(strSymbols, 0, end).join("")
                  }

                  function trimStart(string, chars, guard) {
                    if (string = toString(string), string && (guard || chars === undefined)) return string.replace(reTrimStart, ""); if (!string || !(chars = baseToString(chars))) return string; var strSymbols = stringToArray(string),
                      start = charsStartIndex(strSymbols, stringToArray(chars)); return castSlice(strSymbols, start).join("")
                  }

                  function truncate(string, options) {
                    var length = DEFAULT_TRUNC_LENGTH,
                    omission = DEFAULT_TRUNC_OMISSION; if (isObject(options)) {
                      var separator = "separator" in options ? options.separator : separator;
                      length = "length" in options ? toInteger(options.length) : length, omission = "omission" in options ? baseToString(options.omission) : omission
                    } string = toString(string); var strLength = string.length; if (hasUnicode(string)) {
                      var strSymbols = stringToArray(string);
                      strLength = strSymbols.length
                    } if (length >= strLength) return string; var end = length - stringSize(omission); if (end < 1) return omission; var result = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end); if (separator === undefined) return result + omission; if (strSymbols && (end += result.length - end), isRegExp(separator)) {
                      if (string.slice(end).search(separator)) {
                        var match, substring = result; for (separator.global || (separator = RegExp(separator.source, toString(reFlags.exec(separator)) + "g")), separator.lastIndex = 0; match = separator.exec(substring);) var newEnd = match.index;
                        result = result.slice(0, newEnd === undefined ? end : newEnd)
                      }
                    } else if (string.indexOf(baseToString(separator), end) != end) {
                      var index = result.lastIndexOf(separator);
                      index > -1 && (result = result.slice(0, index))
                    } return result + omission
                  }

                  function unescape(string) { return string = toString(string), string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string }

                  function words(string, pattern, guard) { return string = toString(string), pattern = guard ? undefined : pattern, pattern === undefined ? hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string) : string.match(pattern) || [] }

                  function cond(pairs) {
                    var length = null == pairs ? 0 : pairs.length,
                    toIteratee = getIteratee(); return pairs = length ? arrayMap(pairs, function (pair) { if ("function" != typeof pair[1]) throw new TypeError(FUNC_ERROR_TEXT); return [toIteratee(pair[0]), pair[1]] }) : [], baseRest(function (args) { for (var index = -1; ++index < length;) { var pair = pairs[index]; if (apply(pair[0], this, args)) return apply(pair[1], this, args) } })
                  }

                  function conforms(source) { return baseConforms(baseClone(source, CLONE_DEEP_FLAG)) }

                  function constant(value) { return function () { return value } }

                  function defaultTo(value, defaultValue) { return null == value || value !== value ? defaultValue : value }

                  function identity(value) { return value }

                  function iteratee(func) { return baseIteratee("function" == typeof func ? func : baseClone(func, CLONE_DEEP_FLAG)) }

                  function matches(source) { return baseMatches(baseClone(source, CLONE_DEEP_FLAG)) }

                  function matchesProperty(path, srcValue) { return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG)) }

                  function mixin(object, source, options) {
                    var props = keys(source),
                    methodNames = baseFunctions(source, props);
                    null != options || isObject(source) && (methodNames.length || !props.length) || (options = source, source = object, object = this, methodNames = baseFunctions(source, keys(source))); var chain = !(isObject(options) && "chain" in options && !options.chain),
                      isFunc = isFunction(object); return arrayEach(methodNames, function (methodName) {
                        var func = source[methodName];
                        object[methodName] = func, isFunc && (object.prototype[methodName] = function () {
                          var chainAll = this.__chain__; if (chain || chainAll) {
                            var result = object(this.__wrapped__),
                            actions = result.__actions__ = copyArray(this.__actions__); return actions.push({ func: func, args: arguments, thisArg: object }), result.__chain__ = chainAll, result
                          } return func.apply(object, arrayPush([this.value()], arguments))
                        })
                      }), object
                  }

                  function noConflict() { return root._ === this && (root._ = oldDash), this }

                  function noop() { }

                  function nthArg(n) { return n = toInteger(n), baseRest(function (args) { return baseNth(args, n) }) }

                  function property(path) { return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path) }

                  function propertyOf(object) { return function (path) { return null == object ? undefined : baseGet(object, path) } }

                  function stubArray() { return [] }

                  function stubFalse() { return !1 }

                  function stubObject() { return {} }

                  function stubString() { return "" }

                  function stubTrue() { return !0 }

                  function times(n, iteratee) {
                    if (n = toInteger(n), n < 1 || n > MAX_SAFE_INTEGER) return []; var index = MAX_ARRAY_LENGTH,
                      length = nativeMin(n, MAX_ARRAY_LENGTH);
                    iteratee = getIteratee(iteratee), n -= MAX_ARRAY_LENGTH; for (var result = baseTimes(length, iteratee); ++index < n;) iteratee(index); return result
                  }

                  function toPath(value) { return isArray(value) ? arrayMap(value, toKey) : isSymbol(value) ? [value] : copyArray(stringToPath(toString(value))) }

                  function uniqueId(prefix) { var id = ++idCounter; return toString(prefix) + id }

                  function max(array) { return array && array.length ? baseExtremum(array, identity, baseGt) : undefined }

                  function maxBy(array, iteratee) { return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseGt) : undefined }

                  function mean(array) {
                    return baseMean(array, identity)
                  }

                  function meanBy(array, iteratee) { return baseMean(array, getIteratee(iteratee, 2)) }

                  function min(array) { return array && array.length ? baseExtremum(array, identity, baseLt) : undefined }

                  function minBy(array, iteratee) { return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseLt) : undefined }

                  function sum(array) { return array && array.length ? baseSum(array, identity) : 0 }

                  function sumBy(array, iteratee) { return array && array.length ? baseSum(array, getIteratee(iteratee, 2)) : 0 } context = null == context ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
                  var Array = context.Array,
                    Date = context.Date,
                    Error = context.Error,
                    Function = context.Function,
                    Math = context.Math,
                    Object = context.Object,
                    RegExp = context.RegExp,
                    String = context.String,
                    TypeError = context.TypeError,
                    arrayProto = Array.prototype,
                    funcProto = Function.prototype,
                    objectProto = Object.prototype,
                    coreJsData = context["__core-js_shared__"],
                    funcToString = funcProto.toString,
                    hasOwnProperty = objectProto.hasOwnProperty,
                    idCounter = 0,
                    maskSrcKey = function () { var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || ""); return uid ? "Symbol(src)_1." + uid : "" }(),
                    nativeObjectToString = objectProto.toString,
                    objectCtorString = funcToString.call(Object),
                    oldDash = root._,
                    reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                    Buffer = moduleExports ? context.Buffer : undefined,
                    Symbol = context.Symbol,
                    Uint8Array = context.Uint8Array,
                    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
                    getPrototype = overArg(Object.getPrototypeOf, Object),
                    objectCreate = Object.create,
                    propertyIsEnumerable = objectProto.propertyIsEnumerable,
                    splice = arrayProto.splice,
                    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
                    symIterator = Symbol ? Symbol.iterator : undefined,
                    symToStringTag = Symbol ? Symbol.toStringTag : undefined,
                    defineProperty = function () { try { var func = getNative(Object, "defineProperty"); return func({}, "", {}), func } catch (e) { } }(),
                    ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
                    ctxNow = Date && Date.now !== root.Date.now && Date.now,
                    ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout,
                    nativeCeil = Math.ceil,
                    nativeFloor = Math.floor,
                    nativeGetSymbols = Object.getOwnPropertySymbols,
                    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
                    nativeIsFinite = context.isFinite,
                    nativeJoin = arrayProto.join,
                    nativeKeys = overArg(Object.keys, Object),
                    nativeMax = Math.max,
                    nativeMin = Math.min,
                    nativeNow = Date.now,
                    nativeParseInt = context.parseInt,
                    nativeRandom = Math.random,
                    nativeReverse = arrayProto.reverse,
                    DataView = getNative(context, "DataView"),
                    Map = getNative(context, "Map"),
                    Promise = getNative(context, "Promise"),
                    Set = getNative(context, "Set"),
                    WeakMap = getNative(context, "WeakMap"),
                    nativeCreate = getNative(Object, "create"),
                    metaMap = WeakMap && new WeakMap,
                    realNames = {},
                    dataViewCtorString = toSource(DataView),
                    mapCtorString = toSource(Map),
                    promiseCtorString = toSource(Promise),
                    setCtorString = toSource(Set),
                    weakMapCtorString = toSource(WeakMap),
                    symbolProto = Symbol ? Symbol.prototype : undefined,
                    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
                    symbolToString = symbolProto ? symbolProto.toString : undefined,
                    baseCreate = function () {
                      function object() { } return function (proto) {
                        if (!isObject(proto)) return {}; if (objectCreate) return objectCreate(proto);
                        object.prototype = proto; var result = new object; return object.prototype = undefined, result
                      }
                    }();
                  lodash.templateSettings = { escape: reEscape, evaluate: reEvaluate, interpolate: reInterpolate, variable: "", imports: { _: lodash } }, lodash.prototype = baseLodash.prototype, lodash.prototype.constructor = lodash, LodashWrapper.prototype = baseCreate(baseLodash.prototype), LodashWrapper.prototype.constructor = LodashWrapper, LazyWrapper.prototype = baseCreate(baseLodash.prototype), LazyWrapper.prototype.constructor = LazyWrapper, Hash.prototype.clear = hashClear, Hash.prototype.delete = hashDelete, Hash.prototype.get = hashGet, Hash.prototype.has = hashHas, Hash.prototype.set = hashSet, ListCache.prototype.clear = listCacheClear, ListCache.prototype.delete = listCacheDelete, ListCache.prototype.get = listCacheGet, ListCache.prototype.has = listCacheHas, ListCache.prototype.set = listCacheSet, MapCache.prototype.clear = mapCacheClear, MapCache.prototype.delete = mapCacheDelete, MapCache.prototype.get = mapCacheGet, MapCache.prototype.has = mapCacheHas, MapCache.prototype.set = mapCacheSet, SetCache.prototype.add = SetCache.prototype.push = setCacheAdd, SetCache.prototype.has = setCacheHas, Stack.prototype.clear = stackClear, Stack.prototype.delete = stackDelete, Stack.prototype.get = stackGet, Stack.prototype.has = stackHas, Stack.prototype.set = stackSet;
                  var baseEach = createBaseEach(baseForOwn),
                    baseEachRight = createBaseEach(baseForOwnRight, !0),
                    baseFor = createBaseFor(),
                    baseForRight = createBaseFor(!0),
                    baseSetData = metaMap ? function (func, data) { return metaMap.set(func, data), func } : identity,
                    baseSetToString = defineProperty ? function (func, string) { return defineProperty(func, "toString", { configurable: !0, enumerable: !1, value: constant(string), writable: !0 }) } : identity,
                    castRest = baseRest,
                    clearTimeout = ctxClearTimeout || function (id) { return root.clearTimeout(id) },
                    createSet = Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY ? function (values) { return new Set(values) } : noop,
                    getData = metaMap ? function (func) { return metaMap.get(func) } : noop,
                    getSymbols = nativeGetSymbols ? function (object) { return null == object ? [] : (object = Object(object), arrayFilter(nativeGetSymbols(object), function (symbol) { return propertyIsEnumerable.call(object, symbol) })) } : stubArray,
                    getSymbolsIn = nativeGetSymbols ? function (object) { for (var result = []; object;) arrayPush(result, getSymbols(object)), object = getPrototype(object); return result } : stubArray,
                    getTag = baseGetTag;
                  (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set) != setTag || WeakMap && getTag(new WeakMap) != weakMapTag) && (getTag = function (value) {
                    var result = baseGetTag(value),
                    Ctor = result == objectTag ? value.constructor : undefined,
                    ctorString = Ctor ? toSource(Ctor) : ""; if (ctorString) switch (ctorString) {
                      case dataViewCtorString:
                        return dataViewTag;
                      case mapCtorString:
                        return mapTag;
                      case promiseCtorString:
                        return promiseTag;
                      case setCtorString:
                        return setTag;
                      case weakMapCtorString:
                        return weakMapTag
                    }
                    return result
                  });
                  var isMaskable = coreJsData ? isFunction : stubFalse,
                    setData = shortOut(baseSetData),
                    setTimeout = ctxSetTimeout || function (func, wait) { return root.setTimeout(func, wait) },
                    setToString = shortOut(baseSetToString),
                    stringToPath = memoizeCapped(function (string) { var result = []; return reLeadingDot.test(string) && result.push(""), string.replace(rePropName, function (match, number, quote, string) { result.push(quote ? string.replace(reEscapeChar, "$1") : number || match) }), result }),
                    difference = baseRest(function (array, values) { return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, !0)) : [] }),
                    differenceBy = baseRest(function (array, values) { var iteratee = last(values); return isArrayLikeObject(iteratee) && (iteratee = undefined), isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, !0), getIteratee(iteratee, 2)) : [] }),
                    differenceWith = baseRest(function (array, values) { var comparator = last(values); return isArrayLikeObject(comparator) && (comparator = undefined), isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, !0), undefined, comparator) : [] }),
                    intersection = baseRest(function (arrays) { var mapped = arrayMap(arrays, castArrayLikeObject); return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [] }),
                    intersectionBy = baseRest(function (arrays) {
                      var iteratee = last(arrays),
                      mapped = arrayMap(arrays, castArrayLikeObject); return iteratee === last(mapped) ? iteratee = undefined : mapped.pop(), mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee, 2)) : []
                    }),
                    intersectionWith = baseRest(function (arrays) {
                      var comparator = last(arrays),
                      mapped = arrayMap(arrays, castArrayLikeObject); return comparator = "function" == typeof comparator ? comparator : undefined, comparator && mapped.pop(), mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined, comparator) : []
                    }),
                    pull = baseRest(pullAll),
                    pullAt = flatRest(function (array, indexes) {
                      var length = null == array ? 0 : array.length,
                      result = baseAt(array, indexes); return basePullAt(array, arrayMap(indexes, function (index) { return isIndex(index, length) ? +index : index }).sort(compareAscending)), result
                    }),
                    union = baseRest(function (arrays) { return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, !0)) }),
                    unionBy = baseRest(function (arrays) { var iteratee = last(arrays); return isArrayLikeObject(iteratee) && (iteratee = undefined), baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, !0), getIteratee(iteratee, 2)) }),
                    unionWith = baseRest(function (arrays) { var comparator = last(arrays); return comparator = "function" == typeof comparator ? comparator : undefined, baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, !0), undefined, comparator) }),
                    without = baseRest(function (array, values) { return isArrayLikeObject(array) ? baseDifference(array, values) : [] }),
                    xor = baseRest(function (arrays) { return baseXor(arrayFilter(arrays, isArrayLikeObject)) }),
                    xorBy = baseRest(function (arrays) { var iteratee = last(arrays); return isArrayLikeObject(iteratee) && (iteratee = undefined), baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2)) }),
                    xorWith = baseRest(function (arrays) { var comparator = last(arrays); return comparator = "function" == typeof comparator ? comparator : undefined, baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator) }),
                    zip = baseRest(unzip),
                    zipWith = baseRest(function (arrays) {
                      var length = arrays.length,
                      iteratee = length > 1 ? arrays[length - 1] : undefined; return iteratee = "function" == typeof iteratee ? (arrays.pop(), iteratee) : undefined, unzipWith(arrays, iteratee)
                    }),
                    wrapperAt = flatRest(function (paths) {
                      var length = paths.length,
                      start = length ? paths[0] : 0,
                      value = this.__wrapped__,
                      interceptor = function (object) { return baseAt(object, paths) }; return !(length > 1 || this.__actions__.length) && value instanceof LazyWrapper && isIndex(start) ? (value = value.slice(start, +start + (length ? 1 : 0)), value.__actions__.push({ func: thru, args: [interceptor], thisArg: undefined }), new LodashWrapper(value, this.__chain__).thru(function (array) { return length && !array.length && array.push(undefined), array })) : this.thru(interceptor)
                    }),
                    countBy = createAggregator(function (result, value, key) { hasOwnProperty.call(result, key) ? ++result[key] : baseAssignValue(result, key, 1) }),
                    find = createFind(findIndex),
                    findLast = createFind(findLastIndex),
                    groupBy = createAggregator(function (result, value, key) { hasOwnProperty.call(result, key) ? result[key].push(value) : baseAssignValue(result, key, [value]) }),
                    invokeMap = baseRest(function (collection, path, args) {
                      var index = -1,
                      isFunc = "function" == typeof path,
                      result = isArrayLike(collection) ? Array(collection.length) : []; return baseEach(collection, function (value) { result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args) }), result
                    }),
                    keyBy = createAggregator(function (result, value, key) { baseAssignValue(result, key, value) }),
                    partition = createAggregator(function (result, value, key) { result[key ? 0 : 1].push(value) }, function () {
                      return [
                        [],
                        []
                      ]
                    }),
                    sortBy = baseRest(function (collection, iteratees) { if (null == collection) return []; var length = iteratees.length; return length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1]) ? iteratees = [] : length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2]) && (iteratees = [iteratees[0]]), baseOrderBy(collection, baseFlatten(iteratees, 1), []) }),
                    now = ctxNow || function () { return root.Date.now() },
                    bind = baseRest(function (func, thisArg, partials) {
                      var bitmask = WRAP_BIND_FLAG; if (partials.length) {
                        var holders = replaceHolders(partials, getHolder(bind));
                        bitmask |= WRAP_PARTIAL_FLAG
                      } return createWrap(func, bitmask, thisArg, partials, holders)
                    }),
                    bindKey = baseRest(function (object, key, partials) {
                      var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG; if (partials.length) {
                        var holders = replaceHolders(partials, getHolder(bindKey));
                        bitmask |= WRAP_PARTIAL_FLAG
                      } return createWrap(key, bitmask, object, partials, holders)
                    }),
                    defer = baseRest(function (func, args) { return baseDelay(func, 1, args) }),
                    delay = baseRest(function (func, wait, args) { return baseDelay(func, toNumber(wait) || 0, args) });
                  memoize.Cache = MapCache;
                  var overArgs = castRest(function (func, transforms) { transforms = 1 == transforms.length && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee())); var funcsLength = transforms.length; return baseRest(function (args) { for (var index = -1, length = nativeMin(args.length, funcsLength); ++index < length;) args[index] = transforms[index].call(this, args[index]); return apply(func, this, args) }) }),
                    partial = baseRest(function (func, partials) { var holders = replaceHolders(partials, getHolder(partial)); return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders) }),
                    partialRight = baseRest(function (func, partials) { var holders = replaceHolders(partials, getHolder(partialRight)); return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders) }),
                    rearg = flatRest(function (func, indexes) { return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes) }),
                    gt = createRelationalOperation(baseGt),
                    gte = createRelationalOperation(function (value, other) { return value >= other }),
                    isArguments = baseIsArguments(function () { return arguments }()) ? baseIsArguments : function (value) { return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee") },
                    isArray = Array.isArray,
                    isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer,
                    isBuffer = nativeIsBuffer || stubFalse,
                    isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate,
                    isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap,
                    isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp,
                    isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet,
                    isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray,
                    lt = createRelationalOperation(baseLt),
                    lte = createRelationalOperation(function (value, other) { return value <= other }),
                    assign = createAssigner(function (object, source) { if (isPrototype(source) || isArrayLike(source)) return void copyObject(source, keys(source), object); for (var key in source) hasOwnProperty.call(source, key) && assignValue(object, key, source[key]) }),
                    assignIn = createAssigner(function (object, source) { copyObject(source, keysIn(source), object) }),
                    assignInWith = createAssigner(function (object, source, srcIndex, customizer) { copyObject(source, keysIn(source), object, customizer) }),
                    assignWith = createAssigner(function (object, source, srcIndex, customizer) { copyObject(source, keys(source), object, customizer) }),
                    at = flatRest(baseAt),
                    defaults = baseRest(function (args) { return args.push(undefined, customDefaultsAssignIn), apply(assignInWith, undefined, args) }),
                    defaultsDeep = baseRest(function (args) { return args.push(undefined, customDefaultsMerge), apply(mergeWith, undefined, args) }),
                    invert = createInverter(function (result, value, key) { result[value] = key }, constant(identity)),
                    invertBy = createInverter(function (result, value, key) { hasOwnProperty.call(result, value) ? result[value].push(key) : result[value] = [key] }, getIteratee),
                    invoke = baseRest(baseInvoke),
                    merge = createAssigner(function (object, source, srcIndex) { baseMerge(object, source, srcIndex) }),
                    mergeWith = createAssigner(function (object, source, srcIndex, customizer) { baseMerge(object, source, srcIndex, customizer) }),
                    omit = flatRest(function (object, paths) {
                      var result = {}; if (null == object) return result; var isDeep = !1;
                      paths = arrayMap(paths, function (path) { return path = castPath(path, object), isDeep || (isDeep = path.length > 1), path }), copyObject(object, getAllKeysIn(object), result), isDeep && (result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone)); for (var length = paths.length; length--;) baseUnset(result, paths[length]); return result
                    }),
                    pick = flatRest(function (object, paths) { return null == object ? {} : basePick(object, paths) }),
                    toPairs = createToPairs(keys),
                    toPairsIn = createToPairs(keysIn),
                    camelCase = createCompounder(function (result, word, index) { return word = word.toLowerCase(), result + (index ? capitalize(word) : word) }),
                    kebabCase = createCompounder(function (result, word, index) { return result + (index ? "-" : "") + word.toLowerCase() }),
                    lowerCase = createCompounder(function (result, word, index) { return result + (index ? " " : "") + word.toLowerCase() }),
                    lowerFirst = createCaseFirst("toLowerCase"),
                    snakeCase = createCompounder(function (result, word, index) { return result + (index ? "_" : "") + word.toLowerCase() }),
                    startCase = createCompounder(function (result, word, index) { return result + (index ? " " : "") + upperFirst(word) }),
                    upperCase = createCompounder(function (result, word, index) { return result + (index ? " " : "") + word.toUpperCase() }),
                    upperFirst = createCaseFirst("toUpperCase"),
                    attempt = baseRest(function (func, args) { try { return apply(func, undefined, args) } catch (e) { return isError(e) ? e : new Error(e) } }),
                    bindAll = flatRest(function (object, methodNames) { return arrayEach(methodNames, function (key) { key = toKey(key), baseAssignValue(object, key, bind(object[key], object)) }), object }),
                    flow = createFlow(),
                    flowRight = createFlow(!0),
                    method = baseRest(function (path, args) { return function (object) { return baseInvoke(object, path, args) } }),
                    methodOf = baseRest(function (object, args) { return function (path) { return baseInvoke(object, path, args) } }),
                    over = createOver(arrayMap),
                    overEvery = createOver(arrayEvery),
                    overSome = createOver(arraySome),
                    range = createRange(),
                    rangeRight = createRange(!0),
                    add = createMathOperation(function (augend, addend) { return augend + addend }, 0),
                    ceil = createRound("ceil"),
                    divide = createMathOperation(function (dividend, divisor) { return dividend / divisor }, 1),
                    floor = createRound("floor"),
                    multiply = createMathOperation(function (multiplier, multiplicand) { return multiplier * multiplicand }, 1),
                    round = createRound("round"),
                    subtract = createMathOperation(function (minuend, subtrahend) { return minuend - subtrahend }, 0);
                  return lodash.after = after, lodash.ary = ary, lodash.assign = assign, lodash.assignIn = assignIn, lodash.assignInWith = assignInWith, lodash.assignWith = assignWith, lodash.at = at, lodash.before = before, lodash.bind = bind, lodash.bindAll = bindAll, lodash.bindKey = bindKey, lodash.castArray = castArray, lodash.chain = chain, lodash.chunk = chunk, lodash.compact = compact, lodash.concat = concat, lodash.cond = cond, lodash.conforms = conforms, lodash.constant = constant, lodash.countBy = countBy, lodash.create = create, lodash.curry = curry, lodash.curryRight = curryRight, lodash.debounce = debounce, lodash.defaults = defaults, lodash.defaultsDeep = defaultsDeep, lodash.defer = defer, lodash.delay = delay, lodash.difference = difference, lodash.differenceBy = differenceBy, lodash.differenceWith = differenceWith, lodash.drop = drop, lodash.dropRight = dropRight, lodash.dropRightWhile = dropRightWhile, lodash.dropWhile = dropWhile, lodash.fill = fill, lodash.filter = filter, lodash.flatMap = flatMap, lodash.flatMapDeep = flatMapDeep, lodash.flatMapDepth = flatMapDepth, lodash.flatten = flatten, lodash.flattenDeep = flattenDeep, lodash.flattenDepth = flattenDepth, lodash.flip = flip, lodash.flow = flow, lodash.flowRight = flowRight, lodash.fromPairs = fromPairs, lodash.functions = functions, lodash.functionsIn = functionsIn, lodash.groupBy = groupBy, lodash.initial = initial, lodash.intersection = intersection, lodash.intersectionBy = intersectionBy, lodash.intersectionWith = intersectionWith, lodash.invert = invert, lodash.invertBy = invertBy, lodash.invokeMap = invokeMap, lodash.iteratee = iteratee, lodash.keyBy = keyBy, lodash.keys = keys, lodash.keysIn = keysIn, lodash.map = map, lodash.mapKeys = mapKeys, lodash.mapValues = mapValues, lodash.matches = matches, lodash.matchesProperty = matchesProperty, lodash.memoize = memoize, lodash.merge = merge, lodash.mergeWith = mergeWith, lodash.method = method, lodash.methodOf = methodOf, lodash.mixin = mixin, lodash.negate = negate, lodash.nthArg = nthArg, lodash.omit = omit, lodash.omitBy = omitBy, lodash.once = once, lodash.orderBy = orderBy, lodash.over = over, lodash.overArgs = overArgs, lodash.overEvery = overEvery, lodash.overSome = overSome, lodash.partial = partial, lodash.partialRight = partialRight, lodash.partition = partition, lodash.pick = pick, lodash.pickBy = pickBy, lodash.property = property, lodash.propertyOf = propertyOf, lodash.pull = pull, lodash.pullAll = pullAll, lodash.pullAllBy = pullAllBy, lodash.pullAllWith = pullAllWith, lodash.pullAt = pullAt, lodash.range = range, lodash.rangeRight = rangeRight, lodash.rearg = rearg, lodash.reject = reject, lodash.remove = remove, lodash.rest = rest, lodash.reverse = reverse, lodash.sampleSize = sampleSize, lodash.set = set, lodash.setWith = setWith, lodash.shuffle = shuffle, lodash.slice = slice, lodash.sortBy = sortBy, lodash.sortedUniq = sortedUniq, lodash.sortedUniqBy = sortedUniqBy, lodash.split = split, lodash.spread = spread, lodash.tail = tail, lodash.take = take, lodash.takeRight = takeRight, lodash.takeRightWhile = takeRightWhile, lodash.takeWhile = takeWhile, lodash.tap = tap, lodash.throttle = throttle, lodash.thru = thru, lodash.toArray = toArray, lodash.toPairs = toPairs, lodash.toPairsIn = toPairsIn, lodash.toPath = toPath, lodash.toPlainObject = toPlainObject, lodash.transform = transform, lodash.unary = unary, lodash.union = union, lodash.unionBy = unionBy, lodash.unionWith = unionWith, lodash.uniq = uniq, lodash.uniqBy = uniqBy, lodash.uniqWith = uniqWith, lodash.unset = unset, lodash.unzip = unzip, lodash.unzipWith = unzipWith, lodash.update = update, lodash.updateWith = updateWith, lodash.values = values, lodash.valuesIn = valuesIn, lodash.without = without, lodash.words = words, lodash.wrap = wrap, lodash.xor = xor, lodash.xorBy = xorBy, lodash.xorWith = xorWith, lodash.zip = zip, lodash.zipObject = zipObject, lodash.zipObjectDeep = zipObjectDeep, lodash.zipWith = zipWith, lodash.entries = toPairs, lodash.entriesIn = toPairsIn, lodash.extend = assignIn, lodash.extendWith = assignInWith, mixin(lodash, lodash), lodash.add = add, lodash.attempt = attempt, lodash.camelCase = camelCase, lodash.capitalize = capitalize, lodash.ceil = ceil, lodash.clamp = clamp, lodash.clone = clone, lodash.cloneDeep = cloneDeep, lodash.cloneDeepWith = cloneDeepWith, lodash.cloneWith = cloneWith, lodash.conformsTo = conformsTo, lodash.deburr = deburr, lodash.defaultTo = defaultTo, lodash.divide = divide, lodash.endsWith = endsWith, lodash.eq = eq, lodash.escape = escape, lodash.escapeRegExp = escapeRegExp, lodash.every = every, lodash.find = find, lodash.findIndex = findIndex, lodash.findKey = findKey, lodash.findLast = findLast, lodash.findLastIndex = findLastIndex, lodash.findLastKey = findLastKey, lodash.floor = floor, lodash.forEach = forEach, lodash.forEachRight = forEachRight, lodash.forIn = forIn, lodash.forInRight = forInRight, lodash.forOwn = forOwn, lodash.forOwnRight = forOwnRight, lodash.get = get, lodash.gt = gt, lodash.gte = gte, lodash.has = has, lodash.hasIn = hasIn, lodash.head = head, lodash.identity = identity, lodash.includes = includes, lodash.indexOf = indexOf, lodash.inRange = inRange, lodash.invoke = invoke, lodash.isArguments = isArguments, lodash.isArray = isArray, lodash.isArrayBuffer = isArrayBuffer, lodash.isArrayLike = isArrayLike, lodash.isArrayLikeObject = isArrayLikeObject, lodash.isBoolean = isBoolean, lodash.isBuffer = isBuffer, lodash.isDate = isDate, lodash.isElement = isElement, lodash.isEmpty = isEmpty, lodash.isEqual = isEqual, lodash.isEqualWith = isEqualWith, lodash.isError = isError, lodash.isFinite = isFinite, lodash.isFunction = isFunction, lodash.isInteger = isInteger, lodash.isLength = isLength, lodash.isMap = isMap, lodash.isMatch = isMatch, lodash.isMatchWith = isMatchWith, lodash.isNaN = isNaN, lodash.isNative = isNative, lodash.isNil = isNil, lodash.isNull = isNull, lodash.isNumber = isNumber, lodash.isObject = isObject, lodash.isObjectLike = isObjectLike, lodash.isPlainObject = isPlainObject, lodash.isRegExp = isRegExp, lodash.isSafeInteger = isSafeInteger, lodash.isSet = isSet, lodash.isString = isString, lodash.isSymbol = isSymbol, lodash.isTypedArray = isTypedArray, lodash.isUndefined = isUndefined, lodash.isWeakMap = isWeakMap, lodash.isWeakSet = isWeakSet, lodash.join = join, lodash.kebabCase = kebabCase, lodash.last = last, lodash.lastIndexOf = lastIndexOf, lodash.lowerCase = lowerCase, lodash.lowerFirst = lowerFirst, lodash.lt = lt, lodash.lte = lte, lodash.max = max, lodash.maxBy = maxBy, lodash.mean = mean, lodash.meanBy = meanBy, lodash.min = min, lodash.minBy = minBy, lodash.stubArray = stubArray, lodash.stubFalse = stubFalse, lodash.stubObject = stubObject, lodash.stubString = stubString, lodash.stubTrue = stubTrue, lodash.multiply = multiply, lodash.nth = nth, lodash.noConflict = noConflict, lodash.noop = noop, lodash.now = now, lodash.pad = pad, lodash.padEnd = padEnd, lodash.padStart = padStart, lodash.parseInt = parseInt, lodash.random = random, lodash.reduce = reduce, lodash.reduceRight = reduceRight, lodash.repeat = repeat, lodash.replace = replace, lodash.result = result, lodash.round = round, lodash.runInContext = runInContext, lodash.sample = sample, lodash.size = size, lodash.snakeCase = snakeCase, lodash.some = some, lodash.sortedIndex = sortedIndex, lodash.sortedIndexBy = sortedIndexBy, lodash.sortedIndexOf = sortedIndexOf, lodash.sortedLastIndex = sortedLastIndex, lodash.sortedLastIndexBy = sortedLastIndexBy, lodash.sortedLastIndexOf = sortedLastIndexOf, lodash.startCase = startCase, lodash.startsWith = startsWith, lodash.subtract = subtract, lodash.sum = sum, lodash.sumBy = sumBy, lodash.template = template, lodash.times = times, lodash.toFinite = toFinite, lodash.toInteger = toInteger, lodash.toLength = toLength, lodash.toLower = toLower, lodash.toNumber = toNumber, lodash.toSafeInteger = toSafeInteger, lodash.toString = toString, lodash.toUpper = toUpper, lodash.trim = trim, lodash.trimEnd = trimEnd, lodash.trimStart = trimStart, lodash.truncate = truncate, lodash.unescape = unescape, lodash.uniqueId = uniqueId, lodash.upperCase = upperCase, lodash.upperFirst = upperFirst, lodash.each = forEach, lodash.eachRight = forEachRight, lodash.first = head, mixin(lodash, function () { var source = {}; return baseForOwn(lodash, function (func, methodName) { hasOwnProperty.call(lodash.prototype, methodName) || (source[methodName] = func) }), source }(), { chain: !1 }), lodash.VERSION = VERSION, arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function (methodName) { lodash[methodName].placeholder = lodash }), arrayEach(["drop", "take"], function (methodName, index) { LazyWrapper.prototype[methodName] = function (n) { n = n === undefined ? 1 : nativeMax(toInteger(n), 0); var result = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone(); return result.__filtered__ ? result.__takeCount__ = nativeMin(n, result.__takeCount__) : result.__views__.push({ size: nativeMin(n, MAX_ARRAY_LENGTH), type: methodName + (result.__dir__ < 0 ? "Right" : "") }), result }, LazyWrapper.prototype[methodName + "Right"] = function (n) { return this.reverse()[methodName](n).reverse() } }), arrayEach(["filter", "map", "takeWhile"], function (methodName, index) {
                    var type = index + 1,
                    isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
                    LazyWrapper.prototype[methodName] = function (iteratee) { var result = this.clone(); return result.__iteratees__.push({ iteratee: getIteratee(iteratee, 3), type: type }), result.__filtered__ = result.__filtered__ || isFilter, result }
                  }), arrayEach(["head", "last"], function (methodName, index) {
                    var takeName = "take" + (index ? "Right" : "");
                    LazyWrapper.prototype[methodName] = function () { return this[takeName](1).value()[0] }
                  }), arrayEach(["initial", "tail"], function (methodName, index) {
                    var dropName = "drop" + (index ? "" : "Right");
                    LazyWrapper.prototype[methodName] = function () { return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1) }
                  }), LazyWrapper.prototype.compact = function () { return this.filter(identity) }, LazyWrapper.prototype.find = function (predicate) { return this.filter(predicate).head() }, LazyWrapper.prototype.findLast = function (predicate) { return this.reverse().find(predicate) }, LazyWrapper.prototype.invokeMap = baseRest(function (path, args) { return "function" == typeof path ? new LazyWrapper(this) : this.map(function (value) { return baseInvoke(value, path, args) }) }), LazyWrapper.prototype.reject = function (predicate) { return this.filter(negate(getIteratee(predicate))) }, LazyWrapper.prototype.slice = function (start, end) { start = toInteger(start); var result = this; return result.__filtered__ && (start > 0 || end < 0) ? new LazyWrapper(result) : (start < 0 ? result = result.takeRight(-start) : start && (result = result.drop(start)), end !== undefined && (end = toInteger(end), result = end < 0 ? result.dropRight(-end) : result.take(end - start)), result) }, LazyWrapper.prototype.takeRightWhile = function (predicate) { return this.reverse().takeWhile(predicate).reverse() }, LazyWrapper.prototype.toArray = function () { return this.take(MAX_ARRAY_LENGTH) }, baseForOwn(LazyWrapper.prototype, function (func, methodName) {
                    var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
                    isTaker = /^(?:head|last)$/.test(methodName),
                    lodashFunc = lodash[isTaker ? "take" + ("last" == methodName ? "Right" : "") : methodName],
                    retUnwrapped = isTaker || /^find/.test(methodName);
                    lodashFunc && (lodash.prototype[methodName] = function () {
                      var value = this.__wrapped__,
                      args = isTaker ? [1] : arguments,
                      isLazy = value instanceof LazyWrapper,
                      iteratee = args[0],
                      useLazy = isLazy || isArray(value),
                      interceptor = function (value) { var result = lodashFunc.apply(lodash, arrayPush([value], args)); return isTaker && chainAll ? result[0] : result };
                      useLazy && checkIteratee && "function" == typeof iteratee && 1 != iteratee.length && (isLazy = useLazy = !1); var chainAll = this.__chain__,
                        isHybrid = !!this.__actions__.length,
                        isUnwrapped = retUnwrapped && !chainAll,
                        onlyLazy = isLazy && !isHybrid; if (!retUnwrapped && useLazy) { value = onlyLazy ? value : new LazyWrapper(this); var result = func.apply(value, args); return result.__actions__.push({ func: thru, args: [interceptor], thisArg: undefined }), new LodashWrapper(result, chainAll) } return isUnwrapped && onlyLazy ? func.apply(this, args) : (result = this.thru(interceptor), isUnwrapped ? isTaker ? result.value()[0] : result.value() : result)
                    })
                  }), arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function (methodName) {
                    var func = arrayProto[methodName],
                    chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru",
                    retUnwrapped = /^(?:pop|shift)$/.test(methodName);
                    lodash.prototype[methodName] = function () { var args = arguments; if (retUnwrapped && !this.__chain__) { var value = this.value(); return func.apply(isArray(value) ? value : [], args) } return this[chainName](function (value) { return func.apply(isArray(value) ? value : [], args) }) }
                  }), baseForOwn(LazyWrapper.prototype, function (func, methodName) {
                    var lodashFunc = lodash[methodName]; if (lodashFunc) {
                      var key = lodashFunc.name + "",
                      names = realNames[key] || (realNames[key] = []);
                      names.push({ name: methodName, func: lodashFunc })
                    }
                  }), realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{ name: "wrapper", func: undefined }], LazyWrapper.prototype.clone = lazyClone, LazyWrapper.prototype.reverse = lazyReverse, LazyWrapper.prototype.value = lazyValue, lodash.prototype.at = wrapperAt, lodash.prototype.chain = wrapperChain, lodash.prototype.commit = wrapperCommit, lodash.prototype.next = wrapperNext, lodash.prototype.plant = wrapperPlant, lodash.prototype.reverse = wrapperReverse, lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue, lodash.prototype.first = lodash.prototype.head, symIterator && (lodash.prototype[symIterator] = wrapperToIterator), lodash
                },
                _ = runInContext();
              "function" == typeof define && "object" == typeof define.amd && define.amd ? (root._ = _, define(function () { return _ })) : freeModule ? ((freeModule.exports = _)._ = _, freeExports._ = _) : root._ = _
            }).call(this)
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
          48: [function (require, module, exports) {
            "use strict";
            var tweenFunctions = {
              linear: function (t, b, _c, d) { var c = _c - b; return c * t / d + b },
              easeInQuad: function (t, b, _c, d) { var c = _c - b; return c * (t /= d) * t + b },
              easeOutQuad: function (t, b, _c, d) { var c = _c - b; return -c * (t /= d) * (t - 2) + b },
              easeInOutQuad: function (t, b, _c, d) { var c = _c - b; return (t /= d / 2) < 1 ? c / 2 * t * t + b : -c / 2 * (--t * (t - 2) - 1) + b },
              easeInCubic: function (t, b, _c, d) { var c = _c - b; return c * (t /= d) * t * t + b },
              easeOutCubic: function (t, b, _c, d) { var c = _c - b; return c * ((t = t / d - 1) * t * t + 1) + b },
              easeInOutCubic: function (t, b, _c, d) { var c = _c - b; return (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b },
              easeInQuart: function (t, b, _c, d) { var c = _c - b; return c * (t /= d) * t * t * t + b },
              easeOutQuart: function (t, b, _c, d) { var c = _c - b; return -c * ((t = t / d - 1) * t * t * t - 1) + b },
              easeInOutQuart: function (t, b, _c, d) { var c = _c - b; return (t /= d / 2) < 1 ? c / 2 * t * t * t * t + b : -c / 2 * ((t -= 2) * t * t * t - 2) + b },
              easeInQuint: function (t, b, _c, d) { var c = _c - b; return c * (t /= d) * t * t * t * t + b },
              easeOutQuint: function (t, b, _c, d) { var c = _c - b; return c * ((t = t / d - 1) * t * t * t * t + 1) + b },
              easeInOutQuint: function (t, b, _c, d) { var c = _c - b; return (t /= d / 2) < 1 ? c / 2 * t * t * t * t * t + b : c / 2 * ((t -= 2) * t * t * t * t + 2) + b },
              easeInSine: function (t, b, _c, d) { var c = _c - b; return -c * Math.cos(t / d * (Math.PI / 2)) + c + b },
              easeOutSine: function (t, b, _c, d) { var c = _c - b; return c * Math.sin(t / d * (Math.PI / 2)) + b },
              easeInOutSine: function (t, b, _c, d) { var c = _c - b; return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b },
              easeInExpo: function (t, b, _c, d) { var c = _c - b; return 0 == t ? b : c * Math.pow(2, 10 * (t / d - 1)) + b },
              easeOutExpo: function (t, b, _c, d) { var c = _c - b; return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b },
              easeInOutExpo: function (t, b, _c, d) { var c = _c - b; return 0 === t ? b : t === d ? b + c : (t /= d / 2) < 1 ? c / 2 * Math.pow(2, 10 * (t - 1)) + b : c / 2 * (-Math.pow(2, -10 * --t) + 2) + b },
              easeInCirc: function (t, b, _c, d) { var c = _c - b; return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b },
              easeOutCirc: function (t, b, _c, d) {
                var c = _c - b;
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
              },
              easeInOutCirc: function (t, b, _c, d) { var c = _c - b; return (t /= d / 2) < 1 ? -c / 2 * (Math.sqrt(1 - t * t) - 1) + b : c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b },
              easeInElastic: function (t, b, _c, d) { var a, p, s, c = _c - b; return s = 1.70158, p = 0, a = c, 0 === t ? b : 1 === (t /= d) ? b + c : (p || (p = .3 * d), a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a), -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b) },
              easeOutElastic: function (t, b, _c, d) { var a, p, s, c = _c - b; return s = 1.70158, p = 0, a = c, 0 === t ? b : 1 === (t /= d) ? b + c : (p || (p = .3 * d), a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a), a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b) },
              easeInOutElastic: function (t, b, _c, d) { var a, p, s, c = _c - b; return s = 1.70158, p = 0, a = c, 0 === t ? b : 2 === (t /= d / 2) ? b + c : (p || (p = d * (.3 * 1.5)), a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a), t < 1 ? -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b : a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b) },
              easeInBack: function (t, b, _c, d, s) { var c = _c - b; return void 0 === s && (s = 1.70158), c * (t /= d) * t * ((s + 1) * t - s) + b },
              easeOutBack: function (t, b, _c, d, s) { var c = _c - b; return void 0 === s && (s = 1.70158), c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b },
              easeInOutBack: function (t, b, _c, d, s) { var c = _c - b; return void 0 === s && (s = 1.70158), (t /= d / 2) < 1 ? c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b : c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b },
              easeInBounce: function (t, b, _c, d) { var v, c = _c - b; return v = tweenFunctions.easeOutBounce(d - t, 0, c, d), c - v + b },
              easeOutBounce: function (t, b, _c, d) { var c = _c - b; return (t /= d) < 1 / 2.75 ? c * (7.5625 * t * t) + b : t < 2 / 2.75 ? c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b : t < 2.5 / 2.75 ? c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b : c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b },
              easeInOutBounce: function (t, b, _c, d) { var v, c = _c - b; return t < d / 2 ? (v = tweenFunctions.easeInBounce(2 * t, 0, c, d), .5 * v + b) : (v = tweenFunctions.easeOutBounce(2 * t - d, 0, c, d), .5 * v + .5 * c + b) }
            };
            module.exports = tweenFunctions
          }, {}]
}, { }, [8]);