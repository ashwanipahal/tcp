import React from 'react';
import { shallow } from 'enzyme';

import { ProductDetailImageVanilla } from '../ProductDetailImage';

describe('ProductDetailImage component', () => {
  it('should renders correctly', () => {
    const props = {
      imageName: '',
      imageUrl: '',
      zoomImageUrl: '',
      className: '',
    };
    const component = shallow(<ProductDetailImageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
