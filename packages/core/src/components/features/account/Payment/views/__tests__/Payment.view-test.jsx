import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { PaymentViewVanilla } from '../Payment.view';
import Notification from '../../../../../common/molecules/Notification';
import BodyCopy from '../../../../../common/atoms/BodyCopy';
import Offers from '../../../common/molecule/Offers/views/Offers.view';
import GiftCardList from '../GiftCardList';
import CreditCardList from '../CreditCardList';

describe('Payment View', () => {
  it('should render correctly', () => {
    const tree = shallow(<PaymentViewVanilla labels={{ giftCard: 'Payment' }} className="" />);
    expect(tree).toMatchSnapshot();
    expect(tree.find(BodyCopy)).toHaveLength(1);
  });
  it('should render correctly with error', () => {
    const tree = shallow(
      <PaymentViewVanilla labels={{ giftCard: 'Payment' }} className="" showNotification="error" />
    );
    expect(tree).toMatchSnapshot();
    expect(tree.find(Notification)).toHaveLength(1);
  });
  it('should render correctly with success', () => {
    const tree = shallow(
      <PaymentViewVanilla
        labels={{ giftCard: 'Payment' }}
        className=""
        showNotification="success"
      />
    );
    expect(tree).toMatchSnapshot();
    expect(tree.find(Notification)).toHaveLength(1);
  });
  it('should render correctly with cardList', () => {
    const cardList = List([
      {
        accountNo: '************1111',
        billingAddressId: 160685,
        addressDetails: {
          addressLine1: '111 3rd Ave',
          addressLine2: '',
          city: 'New York',
          country: 'US',
          firstName: 'new',
          lastName: 'address',
          phone1: '9878909876',
          state: 'NY',
          zipCode: '10003',
        },
        ccBrand: 'Visa',
        ccType: 'COMPASSVISA',
        creditCardId: 73501,
        defaultInd: false,
        expMonth: '5 ',
        expYear: '2024',
        nameOnAccount: '.',
        properties: null,
      },
    ]);
    const tree = shallow(
      <PaymentViewVanilla
        labels={{ paymentHeading: 'Payment' }}
        className=""
        showNotification="success"
        cardList={cardList}
        creditCardList={cardList}
        giftCardList={cardList}
      />
    );
    expect(tree).toMatchSnapshot();
    expect(tree.find(Offers)).toHaveLength(1);
    expect(tree.find(GiftCardList)).toHaveLength(1);
    expect(tree.find(CreditCardList)).toHaveLength(1);
  });
});
