import React from 'react';
import { shallow } from 'enzyme';
import { ProductListViewVanilla } from '../views/ProductListing.view.native';

describe('ProductListView component', () => {
  let component;
  const props = {
    products: [],
    filters: {},
    breadCrumbs: [],
    labelsFilter: {},
    sortLabels: [],
    isFavorite: false,
    onFilterSelection: jest.fn(),
    onSortSelection: jest.fn(),
    filteredId: 'ALL',
    renderBrandFilter: null,
    margins: null,
    paddings: null,
    onAddItemToFavorites: null,
    isLoggedIn: false,
    labelsLogin: {},
    AddToFavoriteErrorMsg: '',
    removeAddToFavoritesErrorMsg: jest.fn(),
    onPressFilter: jest.fn(),
    onPressSort: jest.fn(),
    onSubmit: jest.fn(),
    isPickupModalOpen: false,
    getProducts: jest.fn(),
    scrollToTop: false,
    onPickUpOpenClick: jest.fn(),
    totalProductsCount: 1,
    isDataLoading: true,
    isLoadingMore: true,
    navigation: {
      getParam: jest.fn(),
    },
  };
  beforeEach(() => {
    component = shallow(<ProductListViewVanilla {...props} />);
  });

  it('defined correctly', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
