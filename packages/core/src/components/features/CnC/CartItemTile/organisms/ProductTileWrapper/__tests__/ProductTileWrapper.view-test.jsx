import React from 'react';
import { fromJS } from 'immutable';
import ProductTile from '@tcp/core/src/components/features/CnC/CartItemTile/molecules/CartItemTile/views/CartItemTile.view';
import { shallow } from 'enzyme';
import { ProductTileWrapperVanilla } from '../views/ProductTileWrapper.view';

describe('ProductTileWrapper component', () => {
  it('should render ProductTile view section', () => {
    const props = {
      isCartItemsUpdating: { isDeleting: true },
      setHeaderErrorState: jest.fn(),
      labels: {},
      orderItems: fromJS([
        {
          productInfo: {
            size: '25',
            generalProductId: '438187',
            color: {
              name: 'Mirrored Space gift',
            },
            variantNo: '1015038001',
            upc: '893698003077',
            orderType: 'ECOM',
            isGiftCard: true,
            name: 'Mirrored gift card',
            productPartNumber: '1015038',
            itemPartNumber: '893698003077',
            pdpUrl: '/us/p/gift-cards',
            itemBrand: 'TCP',
            colorFitSizeDisplayNames: {
              color: 'Design',
              size: 'Value',
            },
            skuId: '438186',
          },
          itemInfo: {
            quantity: 1,
            itemId: '3001595011',
            itemPoints: 0,
            listPrice: 25,
            offerPrice: 25,
            wasPrice: 25,
            salePrice: 25,
          },
          miscInfo: {
            store: null,
            vendorColorDisplayId: '1015038',
            badge: {
              matchBadge: false,
              defaultBadge: 'NEW!',
            },
            isOnlineOnly: false,
            isBossEligible: true,
            storeItemsCount: 0,
            storeAddress: null,
            storePhoneNumber: null,
            isBopisEligible: true,
            orderItemType: 'ECOM',
            storeId: null,
          },
        },
        {
          productInfo: {
            size: '4',
            generalProductId: '1260292',
            color: {
              name: 'LT MED WASH',
            },
            variantNo: '3000899001',
            upc: '00193511012492',
            orderType: 'ECOM',
            isGiftCard: false,
            name: 'Girls Unicorn Print Denim Skimmer Shorts',
            productPartNumber: '3000899_1659',
            itemPartNumber: '00193511012492',
            fit: 'regular',
            pdpUrl: '/us/p/Girls-Unicorn-Print-Denim-Skimmer-Shorts-3000899-1659',
            itemBrand: 'TCP',
            colorFitSizeDisplayNames: {},
            skuId: '1263194',
          },
          itemInfo: {
            quantity: 1,
            itemId: '3001595010',
            itemPoints: 50,
            listPrice: 24.95,
            offerPrice: 24.95,
            wasPrice: 24.95,
            salePrice: 24.95,
          },
          miscInfo: {
            store: null,
            vendorColorDisplayId: '3000899_1659',
            badge: {
              matchBadge: false,
              defaultBadge: '',
            },
            isOnlineOnly: false,
            isBossEligible: true,
            storeItemsCount: 0,
            storeAddress: null,
            storePhoneNumber: null,
            isBopisEligible: true,
            orderItemType: 'ECOM',
            storeId: null,
          },
        },
      ]),
      theme: {
        mediaQuery: {
          large: '(min-width: 1200px)',
        },
        fonts: {
          secondaryFontFamily: 'secondary',
        },
        breakpoints: {
          maxWidth: 1440,
          keys: ['xs', 'sm', 'lg', 'xl'],
          values: { xs: 0, sm: 768, lg: 1200, xl: 1440 },
        },
      },
    };
    const tree = shallow(<ProductTileWrapperVanilla {...props} />);
    expect(tree.find(ProductTile)).toBeTruthy();
  });
  it('should render ProductTile view section with bag page sfl section', () => {
    const props = {
      onItemEdit: jest.fn(),
      isCartItemsUpdating: { isDeleting: true },
      setHeaderErrorState: jest.fn(),
      labels: {},
      sflItems: fromJS([
        {
          productInfo: {
            size: '25',
            generalProductId: '438187',
            color: {
              name: 'Mirrored Space gift ',
            },
            variantNo: '1015038001',
            upc: '893698003077',
            orderType: 'ECOM',
            isGiftCard: true,
            name: 'Mirrored Space gift card',
            productPartNumber: '1015038',
            itemPartNumber: '893698003077',
            pdpUrl: '/us/p/gift-cards',
            itemBrand: 'TCP',
            colorFitSizeDisplayNames: {
              color: 'Design',
              size: 'Value',
            },
            skuId: '438186',
          },
          itemInfo: {
            quantity: 1,
            itemId: '3001595011',
            itemPoints: 0,
            listPrice: 25,
            offerPrice: 25,
            wasPrice: 25,
            salePrice: 25,
          },
          miscInfo: {
            store: null,
            vendorColorDisplayId: '1015038',
            badge: {
              matchBadge: false,
              defaultBadge: 'NEW!',
            },
            isOnlineOnly: false,
            isBossEligible: true,
            storeItemsCount: 0,
            storeAddress: null,
            storePhoneNumber: null,
            isBopisEligible: true,
            orderItemType: 'ECOM',
            storeId: null,
            availability: 'SOLDOUT',
          },
        },
        {
          productInfo: {
            size: '4',
            generalProductId: '1260292',
            color: {
              name: 'LT MED WASH',
            },
            variantNo: '3000899001',
            upc: '00193511012492',
            orderType: 'ECOM',
            isGiftCard: false,
            name: 'Girls Unicorn Print Denim Skimmer Shorts',
            productPartNumber: '3000899_1659',
            itemPartNumber: '00193511012492',
            fit: 'regular',
            pdpUrl: '/us/p/Girls-Unicorn-Print-Denim-Skimmer-Shorts-3000899-1659',
            itemBrand: 'TCP',
            colorFitSizeDisplayNames: {},
            skuId: '1263194',
          },
          itemInfo: {
            quantity: 1,
            itemId: '3001595010',
            itemPoints: 50,
            listPrice: 24.95,
            offerPrice: 24.95,
            wasPrice: 24.95,
            salePrice: 24.95,
          },
          miscInfo: {
            store: null,
            vendorColorDisplayId: '3000899_1659',
            badge: {
              matchBadge: false,
              defaultBadge: '',
            },
            isOnlineOnly: false,
            isBossEligible: true,
            storeItemsCount: 0,
            storeAddress: null,
            storePhoneNumber: null,
            isBopisEligible: true,
            orderItemType: 'ECOM',
            storeId: null,
            availability: 'UNAVAILABLE',
          },
        },
      ]),
    };
    const tree = shallow(<ProductTileWrapperVanilla {...props} isBagPageSflSection />);
    expect(tree.find(ProductTile)).toBeTruthy();
    tree.instance().toggleEditAllowance();
    expect(props.onItemEdit).toHaveBeenCalled();
  });

  it('should render ProductTile view section with out any data', () => {
    const props = {
      onItemEdit: jest.fn(),
      isCartItemsUpdating: { isDeleting: true },
      setHeaderErrorState: jest.fn(),
      pageView: 'myBag',
      labels: {},
      sflItems: fromJS([]),
      theme: {
        mediaQuery: {
          large: '(min-width: 1200px)',
        },
        fonts: {
          secondaryFontFamily: 'secondary',
        },
        breakpoints: {
          maxWidth: 1440,
          keys: ['xs', 'sm', 'lg', 'xl'],
          values: { xs: 0, sm: 768, lg: 1200, xl: 1440 },
        },
      },
    };
    const tree = shallow(<ProductTileWrapperVanilla {...props} isBagPageSflSection />);
    expect(tree.find(ProductTile)).toBeTruthy();
    tree.instance().toggleEditAllowance();
    expect(props.onItemEdit).toHaveBeenCalled();
    tree.instance().setSwipedElement();
    tree.instance().setSelectedProductTile(1);
    tree.instance().getTickIcon();
  });
});
