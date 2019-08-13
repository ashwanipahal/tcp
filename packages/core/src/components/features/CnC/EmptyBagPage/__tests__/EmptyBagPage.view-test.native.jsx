import React from 'react';
import { shallow } from 'enzyme';
import { EmptyBagPageVanilla } from '../views/EmptyBagPage.view.native';

describe('EmptyBagPage component', () => {
  it('should renders correctly', () => {
    const props = {
      isUserLoggedIn: true,
      bagLabels: {},
    };
    const component = shallow(<EmptyBagPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
