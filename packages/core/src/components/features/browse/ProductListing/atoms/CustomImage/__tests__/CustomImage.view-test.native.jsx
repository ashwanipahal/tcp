import React from 'react';
import { shallow } from 'enzyme';
import CustomImage from '../views/CustomImage.view.native';

describe('CustomImage component', () => {
  const props = {
    imageSource: '',
  };
  it('should renders CustomImage correctly', () => {
    const component = shallow(<CustomImage {...props} />);
    expect(component).toMatchSnapshot();
  });
});
