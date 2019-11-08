import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutContainer, mapDispatchToProps } from '../container/CheckoutCommonContainer';
import { CheckoutPageVanilla } from '../views/CheckoutPage.view';

describe('Bag page Container', () => {
  const props = {
    labels: {},
    initialActions: jest.fn(),
    fetchNeedHelpContent: jest.fn(),
    fetchSflData: jest.fn(),
    setVenmoPickupState: jest.fn(),
    setVenmoShippingState: jest.fn(),
    getUserInformation: jest.fn(),
    isPickupModalOpen: jest.fn(),
  };
  it('should render Added to Bag view section', () => {
    const tree = shallow(<CheckoutContainer {...props} />);
    expect(tree.is(CheckoutPageVanilla)).toBeTruthy();
  });

  it('should render Added to Bag view section', () => {
    const component = shallow(<CheckoutContainer {...props} />);
    expect(component).toMatchSnapshot();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action closeModal which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.initCheckout();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
