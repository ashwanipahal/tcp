import React from 'react';
import { shallow } from 'enzyme';
import { CardTileVanilla } from '../views/CardTile.view.native';
import labels from '../../../../Payment/Payment.constants';

describe('CardTile', () => {
  const cardList = {
    accountNo: '************6765',
    billingAddressId: 75446663,
    addressDetails: {
      addressLine1: 'Yucca Street',
      addressLine2: 'Yucca Street',
      city: 'Los Angeles',
      country: 'US',
      firstName: 'six',
      lastName: 'test',
      phone1: '3214567890',
      state: 'CA',
      zipCode: '90028',
    },
    ccBrand: 'DISC',
    ccType: 'COMPASSDISCOVER',
    creditCardId: 8977328,
    defaultInd: false,
    expMonth: '10',
    expYear: '2025',
    nameOnAccount: '.',
    properties: null,
  };
  const placeCard = 'PLACE CARD';
  it('should render correctly with discover card', () => {
    const tree = shallow(<CardTileVanilla labels={labels} card={cardList} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with visa card', () => {
    const cardVisa = Object.assign({}, cardList, {
      ccBrand: 'Visa',
      ccType: 'COMPASSVISA',
    });
    const tree = shallow(<CardTileVanilla labels={labels} card={cardVisa} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with amex card', () => {
    const cardAmex = Object.assign({}, cardList, {
      ccBrand: 'Amex',
      ccType: 'COMPASSAMEX',
      defaultInd: true,
    });
    const tree = shallow(<CardTileVanilla labels={labels} card={cardAmex} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with master card', () => {
    const cardMaster = Object.assign({}, cardList, {
      ccBrand: 'MC',
      ccType: 'COMPASSMASTERCARD',
    });
    const tree = shallow(<CardTileVanilla labels={labels} card={cardMaster} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with gift card', () => {
    const giftCard = Object.assign({}, cardList, {
      ccBrand: 'GC',
      ccType: 'GiftCard',
    });
    const tree = shallow(
      <CardTileVanilla labels={labels} card={giftCard} handleSubmit={jest.fn()} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with venmocard', () => {
    const venmo = Object.assign({}, cardList, {
      ccBrand: 'VENMO',
      ccType: 'VENMO',
      properties: {
        venmoUserId: '1234',
      },
    });
    const tree = shallow(<CardTileVanilla labels={labels} card={venmo} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with plcc card', () => {
    const plcc = Object.assign({}, cardList, {
      ccBrand: placeCard,
      ccType: placeCard,
    });
    const tree = shallow(<CardTileVanilla labels={labels} card={plcc} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with notification  gift card', () => {
    const giftCard = Object.assign({}, cardList, {
      ccBrand: 'GC',
      ccType: 'GiftCard',
    });
    const tree = shallow(
      <CardTileVanilla
        labels={labels}
        card={giftCard}
        showNotificationCaptcha
        handleSubmit={jest.fn()}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
