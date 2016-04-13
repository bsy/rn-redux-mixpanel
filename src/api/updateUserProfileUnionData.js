import sendMixpanelRequest from './sendMixpanelRequest'

// Configuration Constants
const MIXPANEL_ENGAGE_ENDPOINT = '/engage'

export default function updateUserProfileUnionData ({ token, distinctId, userProfileUnionData }) {
  // Build request data for engage request
  const engageRequestUnionData = {
    '$token': token,
    '$distinct_id': distinctId,
    '$union': userProfileUnionData
  }

  return sendMixpanelRequest({
    endpoint: MIXPANEL_ENGAGE_ENDPOINT,
    data: engageRequestUnionData,
  })
}
