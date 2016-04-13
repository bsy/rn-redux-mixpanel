'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateUserProfileSetData;

var _sendMixpanelRequest = require('./sendMixpanelRequest');

var _sendMixpanelRequest2 = _interopRequireDefault(_sendMixpanelRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configuration Constants
var MIXPANEL_ENGAGE_ENDPOINT = '/engage';

function updateUserProfileSetData(_ref) {
  var token = _ref.token;
  var distinctId = _ref.distinctId;
  var userProfileSetData = _ref.userProfileSetData;

  // Build request data for engage request
  var engageRequestSetData = {
    '$token': token,
    '$distinct_id': distinctId,
    '$set': userProfileSetData
  };

  return (0, _sendMixpanelRequest2.default)({
    endpoint: MIXPANEL_ENGAGE_ENDPOINT,
    data: engageRequestSetData
  });
}