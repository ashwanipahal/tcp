import React from 'react';
import { shallow } from 'enzyme';
import AddedToBagActionsVanilla from '../views/AddedToBagActions.native';

describe('AddedToBagActions native component', () => {
  it('AddedToBagActions native component renders correctly', () => {
    const props = {
      labels: {},
    };
    const component = shallow(<AddedToBagActionsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
