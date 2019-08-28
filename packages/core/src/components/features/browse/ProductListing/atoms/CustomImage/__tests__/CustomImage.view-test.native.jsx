import React from 'react';
import { shallow } from 'enzyme';
import CustomImage from '../views/CustomImage.view.native';

describe('ProductAltImages component', () => {
  const props = {
    imageSource: '',
  };
  it('should renders ListItem correctly', () => {
    const component = shallow(<CustomImage {...props} />);
    expect(component).toMatchSnapshot();
  });
});
