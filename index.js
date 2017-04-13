'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n  &:required, &:invalid { box-shadow: none }\n  &:disabled { background-color: rgba(0,0,0,0) }\n'], ['\n  &:required, &:invalid { box-shadow: none }\n  &:disabled { background-color: rgba(0,0,0,0) }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Input = _styledComponents2.default.input(_templateObject);

var Textarea = _styledComponents2.default.textarea(_templateObject);

var EnhancedInput = function (_React$Component) {
  _inherits(EnhancedInput, _React$Component);

  function EnhancedInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EnhancedInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EnhancedInput.__proto__ || Object.getPrototypeOf(EnhancedInput)).call.apply(_ref, [this].concat(args))), _this), _this.style = {
      default: _this.props.style ? _this.props.style.default : {},
      onFocus: _this.props.style ? _this.props.style.onFocus : {},
      onError: _this.props.style ? _this.props.style.onError : {},
      normalizr: {
        borderBottom: 'none',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none'
      }
    }, _this.state = {
      value: _this.props.value,
      style: _this.style.default
    }, _this.onFocus = function () {
      _this.setState({ style: _extends({}, _this.style.normalizr, _this.style.default, _this.style.onFocus, _this.state.error ? _this.style.onError : null) });
    }, _this.componentWillReceiveProps = function (_ref2) {
      var value = _ref2.value;

      _this.setState({
        value: _this.props.format ? _this.props.format(value) : value
      }, _this.propagate);
    }, _this.onBlur = function () {
      _this.setState({
        style: _this.state.error ? _extends({}, _this.style.normalizr, _this.style.default, _this.style.onError) : _extends({}, _this.style.normalizr, _this.style.default)
      });
    }, _this.onChange = function (e) {
      _this.setState({
        value: _this.props.format ? _this.props.format(e.target.value) : e.target.value
      }, _this.propagate);

      if (_this.props.format) {
        var range = e.target.selectionStart;
        var lengthFormat = _this.props.format(e.target.value).length;
        var length = e.target.value.length;

        var newRange = range - (length - lengthFormat);
        _this.range = newRange;
      }
    }, _this.componentDidUpdate = function () {
      if (_this.range !== undefined) {
        console.log(_this.range, _this.input);
        _this.input.setSelectionRange(_this.range, _this.range);
        _this.range = undefined;
      }
    }, _this.propagate = function (init) {

      var value = _this.state.value;

      var error = !_this.props.check(value);
      if (value === '' && _this.props.required) error = true;
      if (value === '' && !_this.props.required) error = false;

      var onFocus = _extends({}, _this.style.normalizr, _this.style.default, _this.style.onFocus);
      var onError = _extends({}, _this.style.normalizr, _this.style.default, _this.style.onError);

      error ? _this.setState({ style: onError, error: error }, _this.next) : init ? _this.setState({ error: error }, _this.next(true)) : _this.setState({ style: onFocus, error: error }, _this.next);
    }, _this.next = function (init) {
      if (init && _this.props.onMount) _this.props.onMount(_this.state.value, _this.state.error);

      if (!init && _this.props.onChange) _this.props.onChange(_this.state.value, _this.state.error);
    }, _this.componentDidMount = function () {
      _this.next = (0, _debounce2.default)(_this.next, 500);
      _this.propagate(true);
    }, _this.byType = function (props) {
      switch (_this.props.type) {
        case 'textarea':
          return _react2.default.createElement(Textarea, _extends({ innerRef: function innerRef(ref) {
              _this.input = ref;
            } }, props));
        case 'text':
        default:
          return _react2.default.createElement(Input, _extends({ innerRef: function innerRef(ref) {
              _this.input = ref;
            } }, props));
      }
    }, _this.render = function () {

      var props = {
        onKeyDown: _this.props.onKeyDown,
        type: _this.props.type,
        disabled: _this.props.disabled,
        onBlur: _this.onBlur,
        onChange: _this.onChange,
        style: _this.state.style,
        onFocus: _this.onFocus,
        required: _this.props.required ? true : false,
        spellCheck: _this.props.spellcheck || _this.props.spellCheck || false,
        min: _this.props.min,
        step: _this.props.step,
        value: _this.state.value,
        placeholder: _this.props.placeholder
      };

      return _react2.default.createElement(
        'div',
        { onClick: _this.onClick },
        _this.byType(props)
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return EnhancedInput;
}(_react2.default.Component);

exports.default = EnhancedInput;
