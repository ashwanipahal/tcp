import React from 'react';
import { shallow } from 'enzyme';
import Welcome from '../Welcome';

describe('Welcome component', () => {
  it('renders correctly', () => {
    const welcome = shallow(<Welcome />);
    expect(welcome).toMatchSnapshot();
  });
});
