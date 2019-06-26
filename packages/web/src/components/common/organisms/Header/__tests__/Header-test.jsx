import React from 'react';
import { shallow } from 'enzyme';
import Header from '../views';

describe('Header component', () => {
  it('renders correctly', () => {
    const component = shallow(<Header />);
    expect(component).toMatchSnapshot();
  });
});
