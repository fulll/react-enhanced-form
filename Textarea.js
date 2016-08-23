'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Input)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.style = {
      p: {
        margin: 0,
        height: 18,
        padding: '5px 10px'
      },
      input: {
        defaultStyle: _extends({
          display: 'inline',
          background: 'none',
          border: 'none',
          fontSize: 18,
          fontWeight: 100,
          fontFamily: 'Open Sans, sans-serif'
        }, _this.props.style),
        onFocus: {
          outline: 'none',
          color: '#F26F6F'
        }
      },
      icon: {
        defaultStyle: {
          fontSize: 18,
          opacity: 0,
          verticalAlign: 'top',
          color: '#F26F6F',
          padding: '2px 5px 0 0'
        },
        onMouseOver: {
          opacity: 1
        }
      }
    }, _this.state = {
      style: {
        input: _extends({}, _this.style.input.defaultStyle),
        icon: _this.style.icon.defaultStyle
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
    }, _this.onMouseEnter = function (e) {
      e.preventDefault();
      _this.setState({
        style: _extends({}, _this.state.style, {
          icon: _extends({}, _this.style.icon.defaultStyle, _this.style.icon.onMouseOver)
        })
      });
    }, _this.onMouseLeave = function (e) {
      e.preventDefault();
      _this.setState({
        style: _extends({}, _this.state.style, {
          icon: _extends({}, _this.style.icon.defaultStyle)
        })
      });
    }, _this.onClick = function (e) {

      var el = e.currentTarget.querySelector('textarea');
      el.removeAttribute('disabled');
      el.focus();
    }, _this.onFocus = function (e) {
      _this.setState({
        style: _extends({}, _this.state.style, {
          input: _extends({}, _this.style.input.defaultStyle, _this.style.input.onFocus)
        })
      });
    }, _this.onKeyPress = function (e) {
      if (e.key == 'Enter') e.target.blur();
    }, _this.onBlur = function (e) {

      e.target.setAttribute('disabled', true);

      _this.setState({
        style: _extends({}, _this.state.style, {
          input: _extends({}, _this.style.input.defaultStyle)
        })
      });

      if (_this.state.text.new != _this.state.text.old) {

        var o = void 0,
            i = void 0,
            l = e.target.closest('form').querySelectorAll('input:not([type=submit]), textarea');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = l[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            i = _step.value;

            if (i.name[0]) {
              switch (i.type) {
                case 'checkbox':
                  o = _extends({}, o, _defineProperty({}, i.name, i.checked));break;
                default:
                  o = _extends({}, o, _defineProperty({}, i.name, i.value));
              }
            }
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
    }, _this.componentWillReceiveProps = function (props) {
      _this.setState({
        style: _extends({}, _this.state.style, {
          input: _extends({}, _this.state.style.input, props.style)
        })
      });
    }, _this.render = function () {
      return _react2.default.createElement(
        'div',
        {
          onMouseEnter: _this.onMouseEnter,
          onMouseLeave: _this.onMouseLeave,
          onClick: _this.onClick,
          onBlur: _this.onBlur,
          style: _extends({}, _this.style.p, _this.props.style)
        },
        _this.props.icon ? _react2.default.cloneElement(_this.props.icon, { style: _this.state.style.icon }) : _react2.default.createElement(
          'span',
          { style: _this.state.style.icon },
          '✏️'
        ),
        _react2.default.createElement('textarea', {
          style: _extends({}, _this.state.style.input, {
            width: _this.props.width ? _this.props.width : 230
          }),
          value: _this.state.text.new,
          onChange: _this.onChange,
          onFocus: _this.onFocus
          // onKeyPress={this.onKeyPress}
          , placeholder: _this.props.placeholder,
          disabled: true,
          name: _this.props.name
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Input;
}(_react2.default.Component);

exports.default = Input;
