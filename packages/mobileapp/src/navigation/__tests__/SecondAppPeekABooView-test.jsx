import React from 'react';
import { shallow } from 'enzyme';
import { SecondAppPeekABooViewVanilla } from '../SecondAppPeekABooView';

Date.now = jest.fn(() => new Date('2019-08-01'));

describe('SecondAppPeekABooView component test cases', () => {
  let wrapper;
  const image = '[name="imageContainer"]';

  beforeEach(() => {
    wrapper = shallow(<SecondAppPeekABooViewVanilla />);
    jest.runAllTimers();
    wrapper.instance().setState({ animationDelay: 0 });
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper.find('View').length).toBe(1);
    expect(wrapper.find(image).length).toBe(1);
    expect(wrapper.find('[name="image"]').length).toBe(1);
  });

  it('should call peek-a-boo animation method', () => {
    wrapper.instance().peekABooAnimation();
    expect(wrapper.find('View').props().height).toBe(0);
  });

  it('should show animation', () => {
    wrapper.instance().showAnimation();
    expect(wrapper.find(image).props().children.props.height).toBe(75);
  });

  it('should change image animation', () => {
    wrapper.instance().changeImagePosition();
    expect(wrapper.find(image).props().children.props.height).toBe(80);
  });
});
