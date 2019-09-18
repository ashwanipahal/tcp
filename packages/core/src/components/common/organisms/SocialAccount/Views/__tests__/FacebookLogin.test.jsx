import React from 'react';
import { shallow } from 'enzyme';
import FacebookLogin from '../FacebookLogin';

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
    expect(FacebookLogin).toBeDefined();
  });

  // check snapshot
  it('should render the FaceBook component correctly ', () => {
    const wrapper = shallow(<FacebookLogin {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
