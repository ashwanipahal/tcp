import React from 'react';
import { shallow } from 'enzyme';
import { ProductBundleContainerVanilla } from '../container/BundleProduct.container.native';

describe('BundleProductDetail', () => {
  let component;
  const props = {
    getDetails: jest.fn(),
    navigation: {
      getParam: jest.fn(),
    },
    currentProduct: {},
    plpLabels: {},
    pdpLabels: {},
    shortDescription: '',
    longDescription: '',
    itemPartNumber: '',
    currency: 'USD',
    currencyAttributes: {
      exchangevalue: 1,
    },
  };

  beforeEach(() => {
    component = shallow(<ProductBundleContainerVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
