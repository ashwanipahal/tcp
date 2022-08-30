import React from 'react';
import { shallow } from 'enzyme';
import { MyProfileContainer } from '../MyProfile.container';
import MyProfileComponent from '../../views/MyProfile.view';

describe('MyProfile container', () => {
  it('should render MyProfile component', () => {
    const component = shallow(<MyProfileContainer labels={{ accountOverview: {} }} />);
    expect(component.is(MyProfileComponent)).toBeTruthy();
  });
});
