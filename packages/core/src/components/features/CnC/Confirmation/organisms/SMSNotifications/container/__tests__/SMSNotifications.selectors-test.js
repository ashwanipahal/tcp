import { fromJS, Map } from 'immutable';
import smsNotificationsSelectors from '../SMSNotifications.selectors';
import constants from '../../SMSNotification.constants';

describe('#SMSNotifications selectors', () => {
  const {
    getConfirmationNotificationLabels,
    getChildrenPalaceKey,
    getGymboreeKey,
    getSmsNotificationSuccess,
    getSmsNotificationError,
    getSubscribeSuccessMsgRichTextSelector,
    getSubscribeSuccessMsgContentId,
    getNotificationRichTextSelector,
    getNotificationMsgContentId,
  } = smsNotificationsSelectors;

  const htmlText = '<p>Hello</p>';
  const state = {
    Labels: {
      global: {
        registration: {
          lbl_createAccount_emailAddress: 'Email Address',
          lbl_createAccount_password: 'Password',
        },
        password: {
          lbl_PasswordRule: 'PasswordRules',
        },
      },
      checkout: {
        orderConfirmation: {
          lbl_createAccount_heading: 'heading',
          referred: [
            {
              name: 'Notification_Success_Msg',
              contentId: 1,
            },
            {
              name: 'Notification_Carrier_Message_US',
              contentId: 2,
            },
          ],
        },
      },
    },
    Confirmation: fromJS({
      orderConfirmation: {
        createAccountSuccess: false,
      },
    }),
    form: {
      [constants.FORM_NAME]: {
        values: {
          getChildrenPalaceKey: undefined,
        },
      },
    },
    CartPageReducer: Map({
      moduleXContent: [{ name: 1, richText: htmlText }, { name: 2, richText: htmlText }],
    }),
  };

  it('#getConfirmationNotificationLabels', () => {
    const State = {
      Labels: {
        checkout: {
          orderConfirmation: {
            lbl_smsNotification_childrenPlace_lbl: 'childrenPlaceLabel',
            lbl_smsNotification_gymboree_lbl: 'gymboreeLabel',
            lbl_smsNotification_joinNow_btn: 'joinNow',
            lbl_smsNotification_phone_lbl: 'phoneNumber',
            lbl_smsNotification_heading_2: 'promosAndArrivalsHeading',
            lbl_smsNotification_subscribeSuccess: 'subscribeSuccess',
            lbl_smsNotification_heading_1: 'textAlertHeading',
          },
        },
      },
    };
    const object = {
      childrenPlaceLabel: 'childrenPlaceLabel',
      gymboreeLabel: 'gymboreeLabel',
      joinNow: 'joinNow',
      phoneNumber: 'phoneNumber',
      promosAndArrivalsHeading: 'promosAndArrivalsHeading',
      subscribeSuccess: 'subscribeSuccess',
      textAlertHeading: 'textAlertHeading',
    };
    expect(getConfirmationNotificationLabels(State)).toEqual(object);
  });

  it('getChildrenPalaceKey should return current value', () => {
    expect(getChildrenPalaceKey(state)).toEqual(
      state.form[constants.FORM_NAME].values.getChildrenPalaceKey
    );
  });
  it('getGymboreeKey should return current value', () => {
    expect(getGymboreeKey(state)).toEqual(state.form[constants.FORM_NAME].values.getGymboreeKey);
  });
  it('getSmsNotificationSuccess should return current value', () => {
    expect(getSmsNotificationSuccess(state)).toBeFalsy();
  });
  it('getSmsNotificationError should return current value', () => {
    expect(getSmsNotificationError(state)).toBeFalsy();
  });
  it('#getSubscribeSuccessMsgContentId should return content ID', () => {
    expect(getSubscribeSuccessMsgContentId(state)).toEqual(1);
  });

  it('#getSubscribeSuccessMsgRichTextSelector should return content ID', () => {
    expect(getSubscribeSuccessMsgRichTextSelector(state)).toEqual(htmlText);
  });
  it('#getNotificationMsgContentId should return content ID', () => {
    expect(getNotificationMsgContentId(state)).toEqual(2);
  });

  it('#getNotificationRichTextSelector should return content ID', () => {
    expect(getNotificationRichTextSelector(state)).toEqual(htmlText);
  });
});
