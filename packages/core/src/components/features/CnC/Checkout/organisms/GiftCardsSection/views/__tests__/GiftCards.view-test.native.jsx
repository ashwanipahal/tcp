import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { GiftCardsVanilla } from '../GiftCards.view.native';
import { GiftCardSectionHeading } from '../GiftCards.view.utils';

const appliedGiftCardList = [
  {
    creditCardId: 123,
    name: 'test',
  },
  {
    creditCardId: 123,
    name: 'test',
  },
];

describe('GiftCardsVanilla', () => {
  const props = {
    labels: {},
    applyExistingGiftCardToOrder: jest.fn(),
    handleRemoveGiftCard: jest.fn(),
    className: 'test',
    cardData: { creditCardId: 123, name: 'test' },
    appliedGiftCards: new List(appliedGiftCardList),
    giftCardList: new List(appliedGiftCardList),
    getAddGiftCardError: '',
    enableAddGiftCard: false,
    isExpressCheckout: true,
  };

  it('should render gift card tile', () => {
    const component = shallow(<GiftCardsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render gift card tile with 0 order balance', () => {
    const component = shallow(<GiftCardsVanilla orderBalanceTotal={0} {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render gift card tile with 100 order balance', () => {
    const component = shallow(<GiftCardsVanilla orderBalanceTotal={100} {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render gift card tile with 100 order balance with enableAddGiftCard ', () => {
    props.enableAddGiftCard = true;
    props.getAddGiftCardError = 'Duplicate';
    const component = shallow(<GiftCardsVanilla orderBalanceTotal={100} {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly with method getHeading', () => {
    const component = shallow(<GiftCardsVanilla orderBalanceTotal={100} {...props} />);
    const instance = component.instance();
    const spyGetHeading = jest.spyOn(instance, 'getHeading');
    instance.getHeading({ appliedGiftCards: 'applied' }, true);
    expect(spyGetHeading).toHaveBeenCalled();
  });
  it('renders correctly with method checkAddNew with review form', () => {
    const component = shallow(<GiftCardsVanilla orderBalanceTotal={100} {...props} />);
    const instance = component.instance();
    const spyCheckAddNew = jest.spyOn(instance, 'checkAddNew');
    instance.checkAddNew(true, true, true);
    expect(spyCheckAddNew).toHaveBeenCalled();
  });
  it('renders correctly with method checkAddNew without review form', () => {
    const component = shallow(<GiftCardsVanilla orderBalanceTotal={100} {...props} />);
    const instance = component.instance();
    const spyCheckAddNew = jest.spyOn(instance, 'checkAddNew');
    instance.checkAddNew(false, true, true);
    expect(spyCheckAddNew).toHaveBeenCalled();
  });

  it('renders correctly with method GiftCardSectionHeading', () => {
    const getHeading = () => 'Applied';
    const giftCardSectionHeading = GiftCardSectionHeading(
      {},
      { labels: { appliedGiftCards: 'Applied' } },
      true,
      true,
      getHeading,
      true
    );
    expect(giftCardSectionHeading).toMatch('Applied');
  });
});
