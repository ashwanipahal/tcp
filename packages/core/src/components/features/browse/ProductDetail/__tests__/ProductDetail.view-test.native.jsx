import React from 'react';
import { shallow } from 'enzyme';
import { ProductDetailViewVanilla } from '../views/ProductDetail.view.native';

describe('ProductDetailView component', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      selectedColorProductId: '',
      currentProduct: {
        name: '',
        shortDescription: '',
        colorFitsSizesMap: [],
      },
    };
    wrapper = shallow(<ProductDetailViewVanilla {...props} />);
  });

  it('should renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
