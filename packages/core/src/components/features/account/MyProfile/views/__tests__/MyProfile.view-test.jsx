import React from 'react';
import { shallow } from 'enzyme';
import MyProfile from '../MyProfile.view';

describe('MyProfile component', () => {
  it('should render correctly', () => {
    const component = shallow(<MyProfile />);
    expect(component).toMatchSnapshot();
  });
});
