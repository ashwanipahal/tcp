import React from 'react';
import { shallow } from 'enzyme';
import { ProductListingContainerVanilla } from '../container/ProductListing.container.native';

describe('ProductListContainer component', () => {
  let component;
  const props = {
    getProducts: jest.fn(),
    getMoreProducts: jest.fn(),
    productsBlock: [],
    categoryId: '',
    products: [],
    currentNavIds: [],
    navTree: {},
    breadCrumbs: [],
    filters: {},
    totalProductsCount: '0',
    filtersLength: {},
    initialValues: {},
    longDescription: '',
    navigation: {
      getParam: jest.fn(),
    },
    labels: {},
    labelsFilter: {},
    isLoadingMore: false,
    router: {},
    sortLabels: [],
    resetProducts: jest.fn(),
    onAddItemToFavorites: null,
    isLoggedIn: false,
    labelsLogin: {},
  };
  beforeEach(() => {
    component = shallow(<ProductListingContainerVanilla {...props} />);
  });

  it('defined correctly', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
