import React from 'react';
import { shallow } from 'enzyme';
import { AddedToBagActionsVanilla } from '../views/AddedToBagActions.view';

describe('AddedToBagActions component', () => {
  it('AddedToBagActions component renders correctly', () => {
    const props = {
      className: 'checkout',
      onClickViewBag: jest.fn(),
      labels: {},
      modalInfo: {},
      checkoutServerError: {
        errorMessage: 'something went wrong',
      },
    };
    const component = shallow(<AddedToBagActionsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('AddedToBagActions component with Venmo Error renders correctly', () => {
    const props = {
      className: 'checkout',
      onClickViewBag: jest.fn(),
      labels: {},
      modalInfo: {},
      checkoutServerError: {
        errorMessage: 'something went wrong',
      },
      venmoError: 'Venmo Authentication failed',
    };
    const component = shallow(<AddedToBagActionsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
