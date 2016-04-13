'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateUserProfileUnionData;

var _sendMixpanelRequest = require('./sendMixpanelRequest');

var _sendMixpanelRequest2 = _interopRequireDefault(_sendMixpanelRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configuration Constants
var MIXPANEL_ENGAGE_ENDPOINT = '/engage';

function updateUserProfileUnionData(_ref) {
  var token = _ref.token;
  var distinctId = _ref.distinctId;
  var userProfileUnionData = _ref.userProfileUnionData;

  // Build request data for engage request
  var engageRequestUnionData = {
    '$token': token,
    '$distinct_id': distinctId,
    '$union': userProfileUnionData
  };

  return (0, _sendMixpanelRequest2.default)({
    endpoint: MIXPANEL_ENGAGE_ENDPOINT,
    data: engageRequestUnionData
  });
}