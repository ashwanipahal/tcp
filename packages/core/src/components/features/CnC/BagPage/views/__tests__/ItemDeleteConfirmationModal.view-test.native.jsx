import React from 'react';
import { shallow } from 'enzyme';
import ItemDeleteConfirmationModal from '../ItemDeleteConfirmationModal.view.native';

describe('Bag page Container', () => {
  const props = {
    labels: {},
    closeCheckoutConfirmationModal: jest.fn(),
    removeUnqualifiedItemsAndCheckout: jest.fn(),
    isOpen: true,
  };

  it('should render modal when open true', () => {
    const component = shallow(<ItemDeleteConfirmationModal {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render no modal when isOpen is false', () => {
    const componentProps = { ...props, isOpen: false };
    const component = shallow(<ItemDeleteConfirmationModal {...componentProps} />);
    expect(component).toMatchSnapshot();
  });
});
