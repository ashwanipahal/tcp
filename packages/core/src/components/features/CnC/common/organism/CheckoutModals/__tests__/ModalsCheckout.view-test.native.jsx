import React from 'react';
import { shallow } from 'enzyme';
import { ModalsCheckoutVanilla } from '../views/ModalsCheckout.view.native';

describe('ModalsCheckoutVanilla', () => {
  const props = {
    modalInfo: {},
    labels: {},
    currentSelectItemInfo: {},
    setClickAnalyticsDataCheckout: jest.fn(),
    setCheckoutStage: jest.fn(),
    orderHasPickup: true,
    handleCartCheckout: jest.fn(),
    closeCheckoutModalMountState: jest.fn(),
    navigation: {
      navigate: jest.fn(),
    },
    closeCheckoutConfirmationModal: jest.fn(),
    closeModal: jest.fn(),
  };
  it('should render correctly', () => {
    const tree = shallow(<ModalsCheckoutVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with modal editing item', () => {
    props.modalInfo = {
      showModal: true,
      isEditingItem: true,
    };
    const tree = shallow(<ModalsCheckoutVanilla {...props} />);
    tree.instance().navigateToCheckout();
    tree.instance().routeToCheckout({ preventDefault: jest.fn() });
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly when express checkout page', () => {
    props.isExpressCheckoutPage = true;
    const tree = shallow(<ModalsCheckoutVanilla {...props} />);
    tree.instance().routeToCheckout();
    tree.instance().closeModalAndHandleCheckout();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when shipping checkout page', () => {
    props.isExpressCheckoutPage = false;
    props.orderHasPickup = false;
    const tree = shallow(<ModalsCheckoutVanilla {...props} />);
    tree.instance().routeToCheckout();
    tree.instance().closeModalAndHandleCheckout();
    expect(tree).toMatchSnapshot();
  });
});
