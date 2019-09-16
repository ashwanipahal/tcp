import React from 'react';
import { shallow } from 'enzyme';
import CustomImage from '../views/CustomImage.view.native';

describe('CustomImage component', () => {
  const props = {
    source: null,
    url: null,
    width: 100, // sample default value
    height: 100, // sample default value
    resizeMode: 'contain',
  };
  it('should renders CustomImage correctly', () => {
    const component = shallow(<CustomImage {...props} />);
    expect(component).toMatchSnapshot();
  });
});
