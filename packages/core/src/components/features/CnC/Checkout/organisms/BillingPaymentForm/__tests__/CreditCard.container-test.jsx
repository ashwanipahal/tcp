import React from 'react';
import { shallow } from 'enzyme';
import { GiftCardsContainer, mapDispatchToProps } from '../container/CreditCard.container';
import BillingPaymentForm from '../views';

describe('GiftCardsContainer Container', () => {
  const props = {
    cardList: [],
    labels: [],
    onFileCardKey: '',
    isMobile: false,
    initialValues: {},
    paymentMethodId: '',
    getCVVCodeInfo: jest.fn(),
    cvvCodeInfoContentId: '',
    cvvCodeRichText: {},
    onSubmit: jest.fn(),
    orderHasShipping: true,
    isGuest: true,
    backLinkPickup: true,
    backLinkShipping: true,
    nextSubmitText: '',
    getCardListAction: jest.fn(),
  };

  it('should render CheckoutPage view section', () => {
    const tree = shallow(<GiftCardsContainer {...props} />);
    expect(tree.is(BillingPaymentForm)).toBeTruthy();
  });

  it('should render CheckoutPage view section', () => {
    const component = shallow(<GiftCardsContainer {...props} />);
    expect(props.getCVVCodeInfo).toHaveBeenCalledTimes(0);
    expect(component).toMatchSnapshot();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action getCardListAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getCardListAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('should return an action getCVVCodeInfo which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getCVVCodeInfo();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
