import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../Carousel';

describe('Carousel component', () => {
  it('renders correctly', () => {
    const props = {
      options: {
        accessibility: true,
        autoplaySpeed: 3000,
        dots: false,
      },
    };
    const component = shallow(<Carousel {...props} />);
    expect(component).toMatchSnapshot();
  });
});
