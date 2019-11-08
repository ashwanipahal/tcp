import React from 'react';
import { shallow } from 'enzyme';
import { ProductDetailViewVanilla } from '../views/BundleProduct.view.native';

describe('BundleProductDetail', () => {
  let component;
  const props = {
    currentProduct: {},
    navigation: {},
    selectedColorProductId: 1,
    plpLabels: null,
    shortDescription: '',
    itemPartNumber: '',
    longDescription: '',
    pdpLabels: {},
  };

  beforeEach(() => {
    component = shallow(<ProductDetailViewVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
