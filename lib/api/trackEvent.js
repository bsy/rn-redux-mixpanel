'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = trackEvent;

var _sendMixpanelRequest = require('./sendMixpanelRequest');

var _sendMixpanelRequest2 = _interopRequireDefault(_sendMixpanelRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configuration Constants
var MIXPANEL_TRACK_ENDPOINT = '/track';

function trackEvent(_ref) {
  var token = _ref.token;
  var eventName = _ref.eventName;
  var distinctId = _ref.distinctId;
  var _ref$eventData = _ref.eventData;
  var eventData = _ref$eventData === undefined ? {} : _ref$eventData;

  // Build event properties
  var eventProperties = _extends({
    token: token,
    'distinct_id': distinctId
  }, eventData);

  // Build request data for event track request
  var trackRequestData = {
    event: eventName,
    properties: eventProperties
  };

  return (0, _sendMixpanelRequest2.default)({
    endpoint: MIXPANEL_TRACK_ENDPOINT,
    data: trackRequestData
  });
}