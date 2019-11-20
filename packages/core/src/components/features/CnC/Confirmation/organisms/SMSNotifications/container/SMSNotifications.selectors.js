import { createSelector } from 'reselect';
import { getLabelValue } from '@tcp/core/src/utils';
import { formValueSelector } from 'redux-form';
import constants from '../SMSNotification.constants';
import { isCanada } from '../../../../../../../utils';
import ConfirmationSelectors from '../../../container/Confirmation.selectors';

const { getOrderConfirmation } = ConfirmationSelectors;

/**
 * getConfirmationLabels
 * @param {Object} state
 * @description This selector provides the state of the confirmation labels
 */
const getConfirmationLabels = state =>
  state.Labels && state.Labels.checkout && state.Labels.checkout.orderConfirmation;

/**
 * @function getConfirmationCouponLabels
 * @param {Object} state
 * @description This selector provides the state of the confirmation page notification labels.
 * @returns {Object}
 */
const getConfirmationNotificationLabels = createSelector(
  getConfirmationLabels,
  confirmationLabels => {
    return {
      textAlertHeading: getLabelValue(confirmationLabels, 'lbl_smsNotification_heading_1'),
      promosAndArrivalsHeading: getLabelValue(confirmationLabels, 'lbl_smsNotification_heading_2'),
      joinNow: getLabelValue(confirmationLabels, 'lbl_smsNotification_joinNow_btn'),
      childrenPlaceLabel: getLabelValue(
        confirmationLabels,
        'lbl_smsNotification_childrenPlace_lbl'
      ),
      gymboreeLabel: getLabelValue(confirmationLabels, 'lbl_smsNotification_gymboree_lbl'),
      phoneNumber: getLabelValue(confirmationLabels, 'lbl_smsNotification_phone_lbl'),
      subscribeSuccess: getLabelValue(confirmationLabels, 'lbl_smsNotification_subscribeSuccess'),
    };
  }
);

const getChildrenPalaceKey = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'brandTCP');
};

const getGymboreeKey = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'brandGYM');
};

const getNotificationMsgContentId = state => {
  let notificationMsgID;
  const notificationMsg = isCanada()
    ? constants.Notification_Carrier_Message_CA
    : constants.Notification_Carrier_Message_US;
  if (
    state.Labels.checkout.orderConfirmation &&
    Array.isArray(state.Labels.checkout.orderConfirmation.referred)
  ) {
    state.Labels.checkout.orderConfirmation.referred.forEach(label => {
      if (label.name === notificationMsg) {
        notificationMsgID = label.contentId;
      }
    });
  }
  return notificationMsgID;
};

const getNotificationRichTextSelector = state => {
  const rContent = state.CartPageReducer.get('moduleXContent').find(
    moduleX => moduleX.name === getNotificationMsgContentId(state)
  );
  return rContent && rContent.richText;
};

const getSubscribeSuccessMsgContentId = state => {
  let notificationSuccessMsgID;
  if (
    state.Labels.checkout.orderConfirmation &&
    Array.isArray(state.Labels.checkout.orderConfirmation.referred)
  ) {
    state.Labels.checkout.orderConfirmation.referred.forEach(label => {
      if (label.name === constants.Notification_Success_Msg)
        notificationSuccessMsgID = label.contentId;
    });
  }
  return notificationSuccessMsgID;
};

const getSubscribeSuccessMsgRichTextSelector = state => {
  const rContent = state.CartPageReducer.get('moduleXContent').find(
    moduleX => moduleX.name === getSubscribeSuccessMsgContentId(state)
  );
  return rContent && rContent.richText;
};

/**
 * re-select selector to provide create account success value
 */
const getSmsNotificationSuccess = createSelector(
  getOrderConfirmation,
  orderConfirmation => orderConfirmation && orderConfirmation.get('smsNotificationSuccess')
);

const getSmsNotificationError = createSelector(
  getOrderConfirmation,
  orderConfirmation => orderConfirmation && orderConfirmation.get('error')
);

export default {
  getConfirmationNotificationLabels,
  getChildrenPalaceKey,
  getGymboreeKey,
  getNotificationRichTextSelector,
  getNotificationMsgContentId,
  getSubscribeSuccessMsgRichTextSelector,
  getSubscribeSuccessMsgContentId,
  getSmsNotificationSuccess,
  getSmsNotificationError,
};
