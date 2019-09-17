/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';

import { SocialviewVanilla } from '../Social.view';

describe('ForgotPasswordView component', () => {
  it('should renders correctly', () => {
    const props = {
      saveSocialAcc: {},
      getSocialLoad: { test: test },
    };
    const component = shallow(<SocialviewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
