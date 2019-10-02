import React from 'react';
import { shallow } from 'enzyme';
import { MyPrefrenceContainer } from '../container/MyPreference.container';
import MyPrefrence from '../views';

describe('MyProfile container', () => {
  it('should render MyProfile component', () => {
    const component = shallow(<MyPrefrenceContainer labels={{ accountOverview: {} }} />);
    expect(component.is(MyPrefrence)).toBeTruthy();
  });
});
