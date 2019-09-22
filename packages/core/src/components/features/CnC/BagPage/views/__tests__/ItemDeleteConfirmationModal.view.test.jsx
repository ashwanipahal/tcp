import React from 'react';
import { shallow } from 'enzyme';
import { ItemDeleteConfirmationModalVanilla } from '../ItemDeleteConfirmationModal.view';

describe('ItemDeleteConfirmation Modal', () => {
  const props = {
    labels: {},
    className: 'test',
    closeCheckoutConfirmationModal: jest.fn(),
    confirmRemoveCartItem: jest.fn(),
    moveToSfl: jest.fn(),
    isOpen: true,
  };

  it('should render modal when open true', () => {
    const component = shallow(<ItemDeleteConfirmationModalVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render no modal when isOpen is false', () => {
    const componentProps = { ...props, isOpen: false };
    const component = shallow(<ItemDeleteConfirmationModalVanilla {...componentProps} />);
    expect(component).toMatchSnapshot();
  });
});
