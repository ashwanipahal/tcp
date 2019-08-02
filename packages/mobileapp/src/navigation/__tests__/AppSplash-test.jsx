import React from 'react';
import { shallow } from 'enzyme';
import { AppSplashVanilla } from '../AppSplash';

describe('Appsplash component test cases', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AppSplashVanilla appType="tcp" />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(wrapper.find('View').length).toBe(1);
    expect(wrapper.find('[name="image"]').length).toBe(1);
  });

  it('should render tcp launch image by default', () => {
    const image = wrapper.find('[name="image"]');
    expect(image.props().source.testUri).toContain('tcpLaunchImage.png');
  });

  it('should render tcp launch image by default', () => {
    jest.runAllTimers();
    wrapper.instance().showSplashAnimation();
    const view = wrapper.find('View');
    expect(view.props().opacity).toBe(0);
  });
});
