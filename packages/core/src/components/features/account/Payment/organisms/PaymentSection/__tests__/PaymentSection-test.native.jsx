import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { PaymentViewVanilla } from '../views/Payment.section.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Offers from '../../../molecules/OffersSection/views/OffersSection.native';
import CardList from '../../../molecules/Cards/views/Cards.native';
// import CreditCardList from '../../../molecules/MoneyCards/views/MoneyCards.native';

describe('Payment View', () => {
  it('should render correctly', () => {
    const tree = shallow(
      <PaymentViewVanilla
        labels={{ giftCard: 'Payment', paymentGC: {}, common: {} }}
        className=""
      />
    );
    expect(tree).toMatchSnapshot();
    expect(tree.find(BodyCopy)).toHaveLength(1);
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
        labels={{ paymentHeading: 'Payment', paymentGC: {}, common: {} }}
        className=""
        showNotification="success"
        cardList={cardList}
        creditCardList={cardList}
        giftCardList={cardList}
      />
    );
    expect(tree).toMatchSnapshot();
    expect(tree.find(Offers)).toHaveLength(1);
    expect(tree.find(CardList)).toHaveLength(2);
  });
});
