import React from 'react';
import { shallow } from 'enzyme';
import { BagConfirmationModalVanilla } from '../BagConfirmationModal.view';

describe('Bag page Container', () => {
  const props = {
    labels: {},
    className: 'test',
    closeCheckoutConfirmationModal: jest.fn(),
    removeUnqualifiedItemsAndCheckout: jest.fn(),
    isOpen: true,
  };

  it('should render modal when open true', () => {
    const component = shallow(<BagConfirmationModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render no modal when isOpen is false', () => {
    const componentProps = { ...props, isOpen: false };
    const component = shallow(<BagConfirmationModalVanilla {...componentProps} />);
    expect(component).toMatchSnapshot();
  });
});
