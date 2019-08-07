import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { CardTileVanilla } from '../views/CardTile.view';
import Anchor from '../../../../../../common/atoms/Anchor';

describe('CardTile', () => {
  const cardList = {
    accountNo: '************6765',
    billingAddressId: 75446663,
    addressDetails: {
      addressLine1: 'Yucca Street',
      addressLine2: '',
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
  const labels = {
    paymentGC: {},
    common: {},
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
    const tree = shallow(<CardTileVanilla labels={labels} card={giftCard} />);
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
    const mockedSetDefaultPaymentMethod = jest.fn();
    const tree = shallow(
      <CardTileVanilla
        labels={labels}
        card={plcc}
        setDefaultPaymentMethod={mockedSetDefaultPaymentMethod}
      />
    );
    expect(tree).toMatchSnapshot();
    expect(tree.find(Anchor).at(0)).toHaveLength(1);
    tree
      .find(Anchor)
      .at(0)
      .simulate('click', { preventDefault: jest.fn() });
    expect(mockedSetDefaultPaymentMethod).toHaveBeenCalled();
  });
  it('should render correctly with notification  gift card', () => {
    const giftCard = Object.assign({}, cardList, {
      ccBrand: 'GC',
      ccType: 'GiftCard',
    });
    const tree = shallow(
      <CardTileVanilla labels={labels} card={giftCard} showNotificationCaptcha />
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with delete gift  card', () => {
    const plcc = Object.assign({}, cardList, {
      ccBrand: placeCard,
      ccType: placeCard,
    });
    const mockedSetSelectedGiftCard = jest.fn();
    const mockedSetDeleteModalMountState = jest.fn();
    const tree = shallow(
      <CardTileVanilla
        labels={labels}
        card={plcc}
        setSelectedGiftCard={mockedSetSelectedGiftCard}
        setDeleteModalMountState={mockedSetDeleteModalMountState}
      />
    );
    expect(tree).toMatchSnapshot();
    expect(tree.find(Anchor).at(2)).toHaveLength(1);
    tree
      .find(Anchor)
      .at(2)
      .simulate('click', { preventDefault: jest.fn() });
    expect(mockedSetSelectedGiftCard).toHaveBeenCalled();
    expect(mockedSetDeleteModalMountState).toHaveBeenCalled();
  });
  it('should show remining balance', () => {
    const plcc = Object.assign({}, cardList, {
      ccBrand: 'GC',
      ccType: 'GiftCard',
    });
    const checkbalanceValueInfo = fromJS({
      '************6765': '0',
    });

    const tree = shallow(
      <CardTileVanilla labels={labels} card={plcc} checkbalanceValueInfo={checkbalanceValueInfo} />
    );
    tree.setState({ HideCaptchaBtn: true });
    expect(tree).toMatchSnapshot();
  });
  it('should show loading', () => {
    const plcc = Object.assign({}, cardList, {
      ccBrand: 'GC',
      ccType: 'GiftCard',
    });
    const checkbalanceValueInfo = fromJS({
      '************6765': null,
    });

    const tree = shallow(
      <CardTileVanilla labels={labels} card={plcc} checkbalanceValueInfo={checkbalanceValueInfo} />
    );
    tree.setState({ HideCaptchaBtn: true });
    expect(tree).toMatchSnapshot();
  });
});
