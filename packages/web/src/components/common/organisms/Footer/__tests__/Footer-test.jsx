import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../views';

describe('Footer component', () => {
  it('renders correctly', () => {
    const component = shallow(<Footer />);
    expect(component).toMatchSnapshot();
  });
});
