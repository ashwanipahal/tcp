import React from 'react';
import { shallow } from 'enzyme';
import BackToTop from '../views/BackToTop';

describe('BackToTop component', () => {
  it('BackToTop component renders correctly', () => {
    const component = shallow(<BackToTop />);
    expect(component).toMatchSnapshot();
  });
});
