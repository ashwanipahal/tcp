import React from 'react';
import { shallow } from 'enzyme';
import { AddedToBagActionsVanilla } from '../views/AddedToBagActions';

describe('AddedToBagActions component', () => {
  it('AddedToBagActions component renders correctly', () => {
    const props = {
      className: 'checkout',
      onClickViewBag: jest.fn(),
      labels: {},
    };
    const component = shallow(<AddedToBagActionsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
