import React from 'react';
import { shallow } from 'enzyme';
import { ProfileProgress } from '../ProfileProgress.view.native';

describe('ProfileProgress', () => {
  it('should render correctly', () => {
    const props = {
      profileCompletion: 20,
      radius: 50,
    };
    const tree = shallow(<ProfileProgress {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('state should be set correctly when profileCompletion is less than 50', () => {
    const props = {
      profileCompletion: 40,
      radius: 50,
    };
    const wrapper = shallow(<ProfileProgress {...props} />);
    expect(wrapper.state('needHalfCircle2')).toBe(false);
    expect(wrapper.state('halfCircle2Degree')).toBe(0);
    expect(wrapper.state('halfCircle1Degree')).toBe(40 * 3.6);
  });

  it('state should be set correctly when profileCompletion is greater than 50', () => {
    const props = {
      profileCompletion: 80,
      radius: 50,
    };
    const wrapper = shallow(<ProfileProgress {...props} />);
    expect(wrapper.state('needHalfCircle2')).toBe(true);
    expect(wrapper.state('halfCircle1Degree')).toBe(180);
    expect(wrapper.state('halfCircle2Degree')).toBe(80 * 3.6);
  });
});
