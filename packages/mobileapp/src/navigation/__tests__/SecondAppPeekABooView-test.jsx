import React from 'react';
import { shallow } from 'enzyme';
import { SecondAppPeekABooViewVanilla } from '../SecondAppPeekABooView';

Date.now = jest.fn(() => new Date('2019-08-01'));

// Mock Timers for Animation
jest.useFakeTimers();

describe('SecondAppPeekABooView component test cases', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SecondAppPeekABooViewVanilla />);
    wrapper.instance().setState({ animationDelay: 0 });
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper.find('View').length).toBe(1);
    expect(wrapper.find('[name="imageContainer"]').length).toBe(1);
    expect(wrapper.find('[name="image"]').length).toBe(1);
  });

  it('should call peek-a-boo animation method', () => {
    jest.runAllTimers();
    wrapper.instance().peekABooAnimation();
    expect(wrapper.find('View').props().height).toBe(0);
  });
});
