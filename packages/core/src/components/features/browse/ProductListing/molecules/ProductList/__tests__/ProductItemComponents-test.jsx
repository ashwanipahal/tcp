import React from 'react';
import { shallow } from 'enzyme';
import {
  productLink,
  ProductTitle,
  ProductPricesSection,
  ProductWishlistIcon,
  BadgeItem,
  PromotionalMessage,
} from '../views/ProductItemComponents';

describe('ProductItemComponents component', () => {
  it('productLink called correctly', () => {
    expect(productLink(2, '', { preventDefault: jest.fn() })).toMatchSnapshot();
  });

  it('ProductTitle called correctly', () => {
    const props = {
      name: '',
      pdpUrl: '',
      loadedProductCount: '',
      children: {},
      isProductBrandOfSameSiteBrand: true,
    };
    expect(ProductTitle(props)).toMatchSnapshot();
  });

  it('ProductPricesSection called correctly', () => {
    const props = {
      currencySymbol: '',
      listPrice: 12,
      offerPrice: 12,
      noMerchantBadge: '',
      merchantTag: 'Badge2',
    };
    expect(ProductPricesSection(props)).toMatchSnapshot();
  });

  it('ProductWishlistIcon render Image', () => {
    const props = {
      onClick: jest.fn(),
      isDisabled: true,
      isMobile: false,
      isRemove: false,
    };
    const component = shallow(<ProductWishlistIcon {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('ProductWishlistIcon render Text', () => {
    const props = {
      onClick: jest.fn(),
      isDisabled: true,
      isMobile: false,
      isRemove: true,
    };
    const component = shallow(<ProductWishlistIcon {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('BadgeItem render Text', () => {
    const props = {
      text: '',
      className: '',
      isShowBadges: true,
    };
    expect(BadgeItem(props)).toMatchSnapshot();
  });

  it('PromotionalMessage render Text', () => {
    const props = {
      message: '',
    };
    expect(PromotionalMessage(props)).toMatchSnapshot();
  });
});
