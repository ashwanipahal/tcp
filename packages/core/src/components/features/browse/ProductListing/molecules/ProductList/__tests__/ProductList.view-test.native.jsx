import React from 'react';
import { shallow } from 'enzyme';
import { ProductListVanilla } from '../views/ProductList.view.native';

describe('ProductList component', () => {
  it('should renders correctly', () => {
    const props = {
      setListRef: jest.fn(),
      products: [{ productInfo: '' }],
      showQuickViewForProductId: '',
      currencySymbol: '',
      onAddItemToFavorites: jest.fn(),
      onQuickViewOpenClick: jest.fn(),
      onPickUpOpenClick: jest.fn(),
      onColorChange: jest.fn(),
      isBopisEnabled: false,
      unbxdId: '',
      onProductCardHover: jest.fn(),
      isBopisEnabledForClearance: false,
      onQuickBopisOpenClick: jest.fn(),
      currencyExchange: [],
      siblingProperties: '',
      loadedProductCount: 12,
      onGoToPDPPage: jest.fn(),
      title: '',
      onLoadMoreProducts: jest.fn(),
      onRenderHeader: jest.fn(),
      isFavorite: false,
      setLastDeletedItemId: jest.fn(),
    };
    const component = shallow(<ProductListVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
