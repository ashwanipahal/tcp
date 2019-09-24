import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { BagPageViewVanilla } from '../BagPage.view';

describe('Bag page View', () => {
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
    sflItems: {},
  };

  it('should render Added to Bag view section', () => {
    const component = shallow(<BagPageViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render SFL section', () => {
    const sflProps = {
      ...props,
      sflItems: fromJS([{}]),
    };
    const component = shallow(<BagPageViewVanilla {...sflProps} />);
    expect(component).toMatchSnapshot();
  });

  it('should not render SFL section', () => {
    const component = shallow(<BagPageViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
