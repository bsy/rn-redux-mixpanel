import sendMixpanelRequest from './sendMixpanelRequest'

// Configuration Constants
const MIXPANEL_ENGAGE_ENDPOINT = '/engage'

export default function updateUserProfileSetData ({ token, distinctId, userProfileSetData }) {
  // Build request data for engage request
  const engageRequestSetData = {
    '$token': token,
    '$distinct_id': distinctId,
    '$set': userProfileSetData
  }

  return sendMixpanelRequest({
    endpoint: MIXPANEL_ENGAGE_ENDPOINT,
    data: engageRequestSetData,
  })
}
