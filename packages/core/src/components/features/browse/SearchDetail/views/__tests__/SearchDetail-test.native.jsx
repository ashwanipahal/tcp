import React from 'react';
import { shallow } from 'enzyme';
import { SearchDetailVanilla } from '../SearchDetail.view.native';

describe('SearchDetailVanilla', () => {
  let component;
  const props = {
    searchedText: 'test',
    products: [],
    filters: null,
    totalProductsCount: 0,
    filtersLength: 0,
    labelsFilter: {},
    labels: {},
    isLoadingMore: false,
    lastLoadedPageNumber: 0,
    submitProductListingFiltersForm: jest.fn(),
    getProducts: jest.fn(),
    navigation: {},
    sortLabels: {},
    slpLabels: { lbl_searched_for: '' },
  };

  beforeEach(() => {
    component = shallow(<SearchDetailVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return styled BodyCopy component value one', () => {
    expect(component.find('Styled(BodyCopy)')).toHaveLength(2);
  });

  it('should return styled BodyCopy component value one', () => {
    expect(component.find('Styled(ProductListView)')).toHaveLength(1);
  });
});
