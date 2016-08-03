'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _defaultStyle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var style = {
  p: {
    margin: 0
  },
  input: {
    defaultStyle: (_defaultStyle = {
      display: 'inline',
      background: 'none',
      border: 'none',
      fontSize: '1rem',
      fontWeight: 100
    }, _defineProperty(_defaultStyle, 'background', 'none'), _defineProperty(_defaultStyle, 'border', 'none'), _defineProperty(_defaultStyle, 'paddingLeft', 10), _defineProperty(_defaultStyle, 'paddingBottom', 5), _defaultStyle),
    onFocus: {
      outline: 'none',
      fontStyle: 'italic',
      color: 'grey'
    }
  },
  icon: {
    defaultStyle: {
      fontSize: 18,
      opacity: 0,
      width: 16,
      lineHeight: '18px',
      verticalAlign: 'top',
      color: '#F26F6F'
    },
    onMouseOver: {
      opacity: 1
    }
  }
};

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Input)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      style: {
        input: _extends({}, style.input.defaultStyle, _this.props.style),
        icon: style.icon.defaultStyle
      },
      text: {
        new: _this.props.value,
        old: _this.props.value
      }
    }, _this.onChange = function (e) {
      _this.setState({
        text: _extends({}, _this.state.text, {
          new: e.target.value
        })
      });
    }, _this.onMouseOver = function (e) {
      _this.setState({
        style: _extends({}, _this.state.style, {
          icon: _extends({}, style.icon.defaultStyle, style.icon.onMouseOver)
        })
      });
    }, _this.onMouseLeave = function (e) {
      _this.setState({
        style: _extends({}, _this.state.style, {
          icon: _extends({}, style.icon.defaultStyle)
        })
      });
    }, _this.onClick = function (e) {

      var el = e.currentTarget.querySelector('input');
      el.removeAttribute('disabled');
      el.focus();
    }, _this.onFocus = function (e) {
      _this.setState({
        style: _extends({}, _this.state.style, {
          input: _extends({}, style.input.defaultStyle, style.input.onFocus)
        })
      });
    }, _this.onKeyPress = function (e) {
      if (e.key == 'Enter') e.target.blur();
    }, _this.onBlur = function (e) {

      e.target.setAttribute('disabled', true);

      _this.setState({
        style: _extends({}, _this.state.style, {
          input: _extends({}, style.input.defaultStyle)
        })
      });

      if (_this.state.text.new != _this.state.text.old) {

        var o = void 0,
            i = void 0,
            l = e.target.closest('form').querySelectorAll('input:not([type=submit])');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = l[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            i = _step.value;
            o = _extends({}, o, _defineProperty({}, i.name, i.value));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        _this.props.onValueChange(o);
      }
    }, _this.render = function () {
      return _react2.default.createElement(
        'div',
        {
          onMouseOver: _this.onMouseOver,
          onMouseLeave: _this.onMouseLeave,
          onClick: _this.onClick,
          onBlur: _this.onBlur,
          style: _extends({}, style.p, _this.props.style)
        },
        _this.props.icon ? _react2.default.cloneElement(_this.props.icon, { style: _this.state.style.icon }) : _react2.default.createElement(
          'span',
          { style: _this.state.style.icon },
          '✏️'
        ),
        _react2.default.createElement('input', {
          style: _extends({}, _this.state.style.input, {
            width: _this.props.width ? _this.props.width : 230
          }),
          value: _this.state.text.new,
          onChange: _this.onChange,
          onFocus: _this.onFocus,
          onKeyPress: _this.onKeyPress,
          disabled: true,
          name: _this.props.name
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Input;
}(_react2.default.Component);

exports.default = Input;
