import trackEvent from './api/trackEvent'
import updateUserProfileSetData from './api/updateUserProfileSetData'
import updateUserProfileUnionData from './api/updateUserProfileUnionData'

export default function mixpanel({
  token,
  selectDistinctId = () => null,
  selectUserProfileSetData = () => null,
  selectUserProfileUnionData = () => null,
  selectEventName = (action) => action.type,
  selectProperties = () => null,
  ignoreAction = (action) => false,
}) {
  return store => next => action => {
    // Don't track falsy actions or actions that should be ignored
    if (!action.type || ignoreAction(action)) {
      return next(action)
    }

    // Get store state; select distinct id for action & state
    const state = store.getState()
    const distinctId = selectDistinctId(action, state)
    const eventName = selectEventName(action, state)
    const properties = selectProperties(action, state)

    // Track action event with Mixpanel
    trackEvent({
      token,
      distinctId,
      eventName: eventName,
      eventData: properties
    })

    // Select user profile set data for action; if it selects truthy data,
    // update user profile on Mixpanel
    const userProfileSetData = selectUserProfileSetData(action, state)
    if (userProfileSetData) {
      updateUserProfileSetData({
        token,
        distinctId,
        userProfileSetData,
      })
    }

    // Select user profile union data for action; if it selects truthy data,
    // update user profile on Mixpanel
    const userProfileUnionData = selectUserProfileUnionData(action, state)
    if (userProfileUnionData) {
      updateUserProfileUnionData({
        token,
        distinctId,
        userProfileUnionData,
      })
    }


    return next(action)
  }
}
