import React from 'react';
import { shallow } from 'enzyme';
import BagConfirmationModal from '../BagConfirmationModal.view.native';

describe('Bag page Container', () => {
  const props = {
    labels: {},
    closeCheckoutConfirmationModal: jest.fn(),
    removeUnqualifiedItemsAndCheckout: jest.fn(),
    isOpen: true,
  };

  it('should render modal when open true', () => {
    const component = shallow(<BagConfirmationModal {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render no modal when isOpen is false', () => {
    const componentProps = { ...props, isOpen: false };
    const component = shallow(<BagConfirmationModal {...componentProps} />);
    expect(component).toMatchSnapshot();
  });
});
