import React from 'react';
import { shallow } from 'enzyme';
import Recaptcha from '../recaptcha.native';

describe('Recaptcha', () => {
  it('should render correctly', () => {
    const tree = shallow(<Recaptcha />);
    expect(tree).toMatchSnapshot();
  });
});
