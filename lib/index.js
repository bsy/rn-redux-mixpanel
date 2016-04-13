'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mixpanel;

var _trackEvent = require('./api/trackEvent');

var _trackEvent2 = _interopRequireDefault(_trackEvent);

var _updateUserProfileSetData = require('./api/updateUserProfileSetData');

var _updateUserProfileSetData2 = _interopRequireDefault(_updateUserProfileSetData);

var _updateUserProfileUnionData = require('./api/updateUserProfileUnionData');

var _updateUserProfileUnionData2 = _interopRequireDefault(_updateUserProfileUnionData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mixpanel(_ref) {
  var token = _ref.token;
  var _ref$selectDistinctId = _ref.selectDistinctId;
  var selectDistinctId = _ref$selectDistinctId === undefined ? function () {
    return null;
  } : _ref$selectDistinctId;
  var _ref$selectUserProfil = _ref.selectUserProfileSetData;
  var selectUserProfileSetData = _ref$selectUserProfil === undefined ? function () {
    return null;
  } : _ref$selectUserProfil;
  var _ref$selectUserProfil2 = _ref.selectUserProfileUnionData;
  var selectUserProfileUnionData = _ref$selectUserProfil2 === undefined ? function () {
    return null;
  } : _ref$selectUserProfil2;
  var _ref$selectEventName = _ref.selectEventName;
  var selectEventName = _ref$selectEventName === undefined ? function (action) {
    return action.type;
  } : _ref$selectEventName;
  var _ref$selectProperties = _ref.selectProperties;
  var selectProperties = _ref$selectProperties === undefined ? function () {
    return null;
  } : _ref$selectProperties;
  var _ref$ignoreAction = _ref.ignoreAction;
  var ignoreAction = _ref$ignoreAction === undefined ? function (action) {
    return false;
  } : _ref$ignoreAction;

  return function (store) {
    return function (next) {
      return function (action) {
        // Don't track falsy actions or actions that should be ignored
        if (!action.type || ignoreAction(action)) {
          return next(action);
        }

        // Get store state; select distinct id for action & state
        var state = store.getState();
        var distinctId = selectDistinctId(action, state);
        var eventName = selectEventName(action, state);
        var properties = selectProperties(action, state);

        // Track action event with Mixpanel
        (0, _trackEvent2.default)({
          token: token,
          distinctId: distinctId,
          eventName: eventName,
          eventData: properties
        });

        // Select user profile set data for action; if it selects truthy data,
        // update user profile on Mixpanel
        var userProfileSetData = selectUserProfileSetData(action, state);
        if (userProfileSetData) {
          (0, _updateUserProfileSetData2.default)({
            token: token,
            distinctId: distinctId,
            userProfileSetData: userProfileSetData
          });
        }

        // Select user profile union data for action; if it selects truthy data,
        // update user profile on Mixpanel
        var userProfileUnionData = selectUserProfileUnionData(action, state);
        if (userProfileUnionData) {
          (0, _updateUserProfileUnionData2.default)({
            token: token,
            distinctId: distinctId,
            userProfileUnionData: userProfileUnionData
          });
        }

        return next(action);
      };
    };
  };
}