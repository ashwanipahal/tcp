import React from 'react';
import { shallow } from 'enzyme';
import { ModalsCheckoutVanilla } from '../views/ModalsCheckout.view';

describe('ModalsCheckoutVanilla', () => {
  it('should render correctly', () => {
    const props = {
      modalInfo: {},
      labels: {},
      currentSelectItemInfo: {},
    };
    const tree = shallow(<ModalsCheckoutVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with modalEditingItem', () => {
    const props = {
      labels: {},
      currentSelectItemInfo: {},
      modalInfo: { isEditingItem: true, closeCheckoutConfirmationModal: jest.fn() },
      handleCartCheckout: jest.fn(),
      routeForBagCheckout: jest.fn(),
      closeCheckoutModalMountState: jest.fn(),
      closeMiniBagDispatch: jest.fn(),
    };
    const tree = shallow(<ModalsCheckoutVanilla {...props} />);
    tree.instance().routeToCheckout({ preventDefault: jest.fn() });
    expect(tree).toMatchSnapshot();
  });
});
