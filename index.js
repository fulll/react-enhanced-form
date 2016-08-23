'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Textfield = require('./Textfield');

var _Textfield2 = _interopRequireDefault(_Textfield);

var _Textarea = require('./Textarea');

var _Textarea2 = _interopRequireDefault(_Textarea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = function Input(props) {
  switch (props.type) {
    case 'text':
      return _react2.default.createElement(_Textfield2.default, props);
    case 'textarea':
      return _react2.default.createElement(_Textarea2.default, props);
    default:
      return _react2.default.createElement(_Textfield2.default, props);
  }
};

exports.default = Input;
