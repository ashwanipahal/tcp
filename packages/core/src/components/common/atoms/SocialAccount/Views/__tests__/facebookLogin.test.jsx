import React from 'react';
import { shallow } from 'enzyme';
import { FacebookLoginComponent } from '../facebookLoginComponent';

// describing and shallow rendering the facebook Login component
describe('Facebook login', () => {
  // checking if the component is defined
  const props = {
    elem: {
      isConnected: true,
      socialAccount: 'Facebook',
    },
    saveAccountInfo: {},
  };

  it('should be defined', () => {
    expect(FacebookLoginComponent).toBeDefined();
  });

  // check snapshot
  it('should render the FaceBook component correctly ', () => {
    const wrapper = shallow(<FacebookLoginComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
