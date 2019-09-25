import React from 'react';
import { shallow } from 'enzyme';
import { InstagramLoginComponent } from '../InstagramLogin';

// describing and shallow rendering the facebook Login component
describe('InstagramLoginComponent login', () => {
  // checking if the component is defined
  const props = {
    elem: {
      isConnected: true,
      socialAccount: 'Facebook',
    },
    saveAccountInfo: {},
  };

  it('should be defined', () => {
    expect(InstagramLoginComponent).toBeDefined();
  });

  // check snapshot
  it('should render the InstagramLoginComponent component correctly ', () => {
    const wrapper = shallow(<InstagramLoginComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
