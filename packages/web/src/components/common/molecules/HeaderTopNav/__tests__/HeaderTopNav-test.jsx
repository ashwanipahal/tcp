import React from 'react';
import { shallow } from 'enzyme';
import HeaderTopNav from '../view';

describe('Header component', () => {
  it('renders correctly', () => {
    const component = shallow(<HeaderTopNav />);
    expect(component).toMatchSnapshot();
  });
});
