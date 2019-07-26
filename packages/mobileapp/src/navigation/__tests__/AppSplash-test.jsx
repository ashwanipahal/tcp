import React from 'react';
import { shallow } from 'enzyme';
import AppSplash from '../AppSplash';

describe('Appsplash component test cases', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AppSplash appType="tcp" />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should rendet correctly', () => {});
});
