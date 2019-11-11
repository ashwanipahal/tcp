import React from 'react';
import { shallow } from 'enzyme';
import { ProductBundleContainer } from '../container/BundleProduct.container';

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
    addToBagEcom: jest.fn(),
    currentState: {},
    addToBagError: '',
    addToBagErrorId: '',
    isPickupModalOpen: false,
    addToFavorites: jest.fn(),
    isLoggedIn: false,
    isPlcc: false,
    AddToFavoriteErrorMsg: '',
    removeAddToFavoritesErrorMsg: jest.fn(),
  };

  beforeEach(() => {
    component = shallow(<ProductBundleContainer {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
