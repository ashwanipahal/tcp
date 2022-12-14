import { MY_PREFERENCE_ACTION_PATTERN } from '../../../../constants/reducer.constants';

export default {
  GET_SUBSCRIBE_STORE_TTL: 60 * 1000,
  UPDATE_PROFILE_SUCCESS: `${MY_PREFERENCE_ACTION_PATTERN}UPDATE_PROFILE_SUCCESS`,
  MY_PREFERENCE_FORM: 'MyPreference',
  MY_PREFERENCE_FORM_MODAL: 'MyPreferenceFormModal',
  MY_PREFERENCE_FORM_MODAL_UNSUBSCRIBE: 'MyPreferenceFormModalUnsubscribe',
  GET_SUBSCRIBE_STORE: `${MY_PREFERENCE_ACTION_PATTERN}GET_SUBSCRIBE_STORE`,
  SET_SUBSCRIBE_STORE: `${MY_PREFERENCE_ACTION_PATTERN}SET_SUBSCRIBE_STORE`,
  SET_BRAND_SUBSCRIBE_DATA: `${MY_PREFERENCE_ACTION_PATTERN}SET_BRAND_SUBSCRIBE_DATA`,
  TCP_WEB_SUBSCRIBE: 'tcpWebSubscribe',
  TCP_WEB_UNSUBSCRIBE: 'tcpWebUnsubscribe',
  TCP_APP_SUBSCRIBE: 'tcpAppSubscribe',
  TCP_APP_UNSUBSCRIBE: 'tcpAppUnsubscribe',
  GYMBOREE_WEB_SUBSCRIBE: 'gymboreeWebSubscribe',
  GYMBOREE_APP_SUBSCRIBE: 'gymboreeAppSubscribe',
  GYMBOREE_WEB_UNSUBSCRIBE: 'gymboreeWebUnsubscribe',
  GYMBOREE_APP_UNSUBSCRIBE: 'gymboreeAppUnsubscribe',
  BRAND_TCP: 'tcp',
  BRAND_GYMBOREE: 'gymboree',
  PLACE_REWARDS_SMS: 'placeRewardsSms',
  MARKETING_PREFERENCE_SMS: 'marketingPreferenceSms',
  GYMBOREE_MARKETING_PREFERENCE_SMS: 'marketingPreferenceSms',
  PLACE_REWARDS_PUSH: 'placeRewardsPush',
  SMS_SUBSCRIPTION_NAVIGATION_TEXT:
    'my account-my preferences-marketing sms model-subscribe text alert',
  PUSH_SUBSCRIPTION_NAVIGATION_TEXT:
    'my account-my preferences-my place rewards push notifications modal-subscribe',
};
