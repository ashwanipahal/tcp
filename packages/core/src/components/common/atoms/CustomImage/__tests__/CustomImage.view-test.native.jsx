import React from 'react';
import { shallow } from 'enzyme';
import { CustomImageVanilla } from '../views/CustomImage.view.native';

describe('CustomImage component', () => {
  const props = {
    source: null,
    url: null,
    width: 100, // sample default value
    height: 100, // sample default value
    resizeMode: 'contain',
  };
  it('should renders CustomImage correctly', () => {
    const component = shallow(<CustomImageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders Zoom Image correctly', () => {
    const component = shallow(<CustomImageVanilla {...props} allowZoom />);
    expect(component).toMatchSnapshot();
  });
});
