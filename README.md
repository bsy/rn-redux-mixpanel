# bsy/rn-redux-mixpanel
Configurable redux middleware that sends your actions & user profile data to Mixpanel.  It also works with React Native ;)

### Installation
```
npm install --save bsy/rn-redux-mixpanel
```
* * *


### Example
```javascript
// store/index.js
import mixpanel from 'rn-redux-mixpanel'
import { INIT_PERSISTENCE, HYDRATE, NOTIFICATION_REGISTER, SESSION_ACTIVITY, SIGN_IN } from '../../constants/ActionTypes'
import humanize from 'underscore.string'

// define a blacklist to be used in the ignoreAction filter
const blacklist = [
  INIT_PERSISTENCE,
  HYDRATE,
  SESSION_ACTIVITY,
];

// Export configured mixpanel redux middleware
export default mixpanel({

  // add ignore action filter
  ignoreAction: (action) => {
    return blacklist.indexOf(action.type) > -1;
  },

  // Mixpanel Token
  token: YOUR_MIXPANEL_TOKEN,

  // derive Mixpanel event name from action and/or state
  selectEventName: (action, state) => humanize(action.type),

  // Per-action selector: Mixpanel event `distinct_id`
  selectDistinctId: (action, state) => {
    if (state.session && state.session.userId) {
      return state.session.userId
    } else if (SIGN_IN === action.type && action.user) {
      return action.user._id
    }
  },

  // Per-action selector: Mixpanel Engage user profile set data
  selectUserProfileSetData: (action, state) => {
    const user = action.user

    // Only update user profile data on SIGN_IN action type
    if (SIGN_IN === action.type && user) {
      // User data to `$set` via Mixpanel Engage request
      const userProfileSetData = {
        '$first_name': user['first_name'],
        '$last_name': user['last_name'],
        '$email': user['email_address'],
        '$created': user['date_created'],
      }

      return userProfileSetData
    }
  },

  // Per-action selector: Mixpanel Engage user profile union data
  selectUserProfileUnionData: (action, state) => {

    // Only update user profile union data on NOTIFICATION_REGISTER action type
    if (NOTIFICATION_REGISTER === action.type) {
      // User data to `$union` via Mixpanel Engage request
      const userProfileUnionData = {
        '$ios_devices': [action.deviceToken]    
      }

      return userProfileUnionData
    }
  }
})
```


### Usage
Configure the `mixpanel` redux middleware by invoking with an options object, containing:

1. `token` – Your Mixpanel application token.
2. `ignoreAction` – An optional function, that receives an action and returns a truthy value, if it should be ignored.
3. `selectDistinctId` – A selector function that returns the `distinct_id` (user id), given the action and store state.
4. `selectUserProfileSetData` – A selector function that returns user profile set data for a Mixpanel Engage request, given the action and store state.
5. `selectUserProfileUnionData` – A selector function that returns user profile union data for a Mixpanel Engage request, given the action and store state.
6. `selectEventName` – A optional selector function that returns the Mixpanel event name, given the action and store state. By default action.type.
7. `selectProperties` - An optional selector function that returns Mixpanel properties to add to the request, given the action and store state.
