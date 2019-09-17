import React from 'react';
import { shallow } from 'enzyme';
import ProductDetailView from '../views/ProductDetail.view.native';

describe('ProductDetailView component', () => {
  it('should renders correctly', () => {
    const props = {
      selectedColorProductId: '',
      currentProduct: {
        name: '',
        shortDescription: '',
      },
    };
    const component = shallow(<ProductDetailView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
