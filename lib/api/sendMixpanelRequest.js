'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = sendMixpanelRequest;

var _buffer = require('buffer');

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configuration Constants
var DEBUG = (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && process.env && process.env['NODE_ENV'] === 'development';

// Mixpanel Service Constants
var MIXPANEL_REQUEST_PROTOCOL = 'https';
var MIXPANEL_HOST = 'api.mixpanel.com';

function sendMixpanelRequest(_ref) {
  var endpoint = _ref.endpoint;
  var data = _ref.data;

  var requestDataString = JSON.stringify(data);
  var requestDataBase64String = new _buffer.Buffer(requestDataString).toString('base64');

  var requestUrl = MIXPANEL_REQUEST_PROTOCOL + '://' + MIXPANEL_HOST + endpoint + '?ip=1';
  var req = _superagent2.default.get(requestUrl).query('data=' + requestDataBase64String).end(function (error, res) {
    if (!DEBUG) {
      return;
    }

    if (error) {
      console.log('mixpanel error:', error);
    }
  });

  return req;
}