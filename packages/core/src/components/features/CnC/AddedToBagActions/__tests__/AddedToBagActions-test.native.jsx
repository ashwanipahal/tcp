import React from 'react';
import { shallow } from 'enzyme';
import AddedToBagActions from '../views/AddedToBagActions.view.native';

describe('AddedToBagActions native component', () => {
  it('AddedToBagActions native component renders correctly', () => {
    const props = {
      labels: {
        viewBag: 'View Bag',
        checkout: 'Checkout',
      },
      modalInfo: {
        showModal: true,
      },
      navigation: {
        state: {
          routeName: 'BagPage',
        },
      },
    };
    const component = shallow(<AddedToBagActions {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('AddedToBagActions renders correctly with Venmo Button', () => {
    const props = {
      labels: {
        viewBag: 'View Bag',
        checkout: 'Checkout',
      },
      modalInfo: {
        showModal: true,
      },
      isNoNEmptyBag: true,
      fromAddedToBagModal: true,
      navigation: {
        state: {
          routeName: 'BagPage',
        },
      },
    };
    const component = shallow(<AddedToBagActions {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('Calling getVenmoPaymentButton Method', () => {
    const props = {
      labels: {
        viewBag: 'View Bag',
        checkout: 'Checkout',
      },
      modalInfo: {
        showModal: true,
      },
      isInternationalShipping: false,
      handleCartCheckout: jest.fn(),
      resetTimerStatus: jest.fn(),
      isEditingItem: false,
      navigation: {
        state: {
          routeName: 'BagPage',
        },
      },
      closeModal: jest.fn(),
    };
    const component = shallow(<AddedToBagActions {...props} />);
    const instance = component.instance();

    expect(instance.getVenmoPaypalPaymentButton(true, true)).not.toBeUndefined();
  });
});
