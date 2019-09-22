/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';

import InstagramLoginPage from '../InstagramLoginPage';

describe('ForgotPasswordView component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {
        password: {},
      },
    };
    const component = shallow(<InstagramLoginPage {...props} />);
    expect(component).toMatchSnapshot();
  });
});
