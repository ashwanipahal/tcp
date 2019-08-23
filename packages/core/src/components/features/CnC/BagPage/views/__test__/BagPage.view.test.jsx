import React from 'react';
import { shallow } from 'enzyme';
import { BagPageViewVanilla } from '../BagPage.view';

describe('Bag page Container', () => {
  const props = {
    labels: {},
    initialActions: jest.fn(),

    className: 'test',
    orderItemsCount: 10,
    totalCount: 10,
    handleCartCheckout: jest.fn(),
    showAddTobag: true,
    showConfirmationModal: true,
    closeCheckoutConfirmationModal: jest.fn(),
    removeUnqualifiedItemsAndCheckout: jest.fn(),
  };

  it('should render Added to Bag view section', () => {
    const component = shallow(<BagPageViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
