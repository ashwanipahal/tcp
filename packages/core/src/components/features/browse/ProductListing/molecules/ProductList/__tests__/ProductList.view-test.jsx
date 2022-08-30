import React from 'react';
import { shallow } from 'enzyme';
import { ProductListVanilla } from '../views/ProductList.view';

describe('ProductList component', () => {
  it('should renders correctly', () => {
    const props = {
      className: '',
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
    };
    const component = shallow(<ProductListVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
