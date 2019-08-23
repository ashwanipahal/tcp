import { fromJS } from 'immutable';
import CHECKOUT_SELECTORS from '../container/Checkout.selector';

describe('Checkout Selectors', () => {

  it('#isGuest should return boolean', () => {
    const UserState = fromJS({
        personalData: {
          isGuest:true
        },
    });

    const State = {User :
      fromJS({
        personalData: {
          isGuest: true
        },
    })
  }
    expect(CHECKOUT_SELECTORS.isGuest(State)).toEqual(UserState.getIn(['personalData', 'isGuest']));
  });

  it('#isExpressCheckout should return boolean', () => {
    const UserState = fromJS({
        personalData: {
          isExpressEligible:true
        },
    });

    const State = {User :
      fromJS({
        personalData: {
          isExpressEligible: true
        },
    })
  }
    expect(CHECKOUT_SELECTORS.isExpressCheckout(State)).toEqual(UserState.getIn(['personalData', 'isExpressEligible']));
  });

  it('#getInitialPickupSectionValues should return boolean', () => {
    const State = {Checkout :
      fromJS({
        values: {
          pickUpContact: {
            firstName:'',
            lastName:'',
            emailAddress:'',
            phoneNumber:212
          },
          pickUpAlternative:{
            firstName:'',
          },
          smsInfo:{
            numberForUpdates:null,
            smsUpdateNumber: null,
          }
        },
    }),
    User : fromJS({
      personalData: {
        userId: '320503',
        contactInfo: {
          profileAddress: {
            type: 'Mailing',
            isComplete: false,
            address: {}
          },
          firstName:'',
      lastName:'',
      emailAddress:'',
      phoneNumber:212,
        },
        isGuest: true,
        isRemembered: false,
        associateId: '',
        isExpressEligible: false
      },
    })
  }
    expect(CHECKOUT_SELECTORS.getInitialPickupSectionValues(State)).toEqual({
    pickUpContact:{
      firstName:'',
      lastName:'',
      emailAddress:'',
      phoneNumber:212,
      smsInfo:{
        wantsSmsOrderUpdates:false,
            smsUpdateNumber: undefined,
      }
    },
    hasAlternatePickup: false,
    pickUpAlternate: {},
  });
});
})
