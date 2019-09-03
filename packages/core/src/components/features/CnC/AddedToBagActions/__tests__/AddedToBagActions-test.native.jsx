import React from 'react';
import { shallow } from 'enzyme';
import { AddedToBagActionsVanilla } from '../views/AddedToBagActions.view';

describe('AddedToBagActions native component', () => {
  it('AddedToBagActions native component renders correctly', () => {
    const props = {
      labels: {
        viewBag: '',
        checkout: '',
      },
    };
    const component = shallow(<AddedToBagActionsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
