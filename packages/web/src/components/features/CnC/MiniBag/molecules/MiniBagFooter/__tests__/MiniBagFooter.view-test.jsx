import React from 'react';
import { shallow } from 'enzyme';
import MiniBagFooter from '../views/MiniBagFooter';

describe('MiniBagFooter component', () => {
  it('renders correctly', () => {
    const component = shallow(<MiniBagFooter />);
    expect(component).toMatchSnapshot();
  });
});
