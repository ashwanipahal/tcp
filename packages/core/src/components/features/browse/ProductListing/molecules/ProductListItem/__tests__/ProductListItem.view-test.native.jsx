import React from 'react';
import { shallow } from 'enzyme';
import { ListItemVanilla } from '../views/ProductListItem.view.native';

describe('ProductListItem component', () => {
  let component;
  const props = {
    isFavorite: true,
    selectedColorIndex: 0,
    item: {
      colorsMap: [
        {
          colorProductId: '3001084_IV',
          imageName: '3001084_IV',
          miscInfo: {},
          color: {
            name: 'TIDAL',
            imagePath: '',
          },
        },
      ],
      productInfo: {
        name: 'tcp',
        pdpUrl: '',
        keepAlive: true,
      },
      miscInfo: {
        isInDefaultWishlist: '',
        keepAlive: true,
      },
      quantityPurchased: 1,
      itemInfo: {
        availability: 'OK',
        quantity: 1,
      },
    },
    badge1: '',
    badge2: '',
    badge3: '',
    listPriceForColor: 10,
    offerPriceForColor: 12,
    loyaltyPromotionMessage: '',
    onAddToBag: jest.fn(),
    onFavorite: jest.fn(),
    onGoToPDPPage: jest.fn(),
    onQuickViewOpenClick: jest.fn(),
    setLastDeletedItemId: jest.fn(),
    fullWidth: false,
    renderPriceAndBagOnly: false,
    renderPriceOnly: false,
    productImageWidth: false,
    isDataLoading: false,
    keepAlive: false,
    isLoggedIn: false,
    labelsPlpTiles: {},
    isKeepAliveEnabled: false,
    outOfStockLabels: {},
    renderMoveToList: () => {},
    onSeeSuggestedItems: () => {},
  };
  beforeEach(() => {
    component = shallow(<ListItemVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return styled View component value two', () => {
    expect(component.find('Styled(View)')).toHaveLength(2);
  });

  it('should return RenderPricesSection component value one', () => {
    expect(component.find('RenderPricesSection')).toHaveLength(1);
  });

  it('should return RenderTopBadge1 component value one', () => {
    expect(component.find('RenderTopBadge1')).toHaveLength(1);
  });

  it('should return RenderBadge2 component value one', () => {
    expect(component.find('RenderBadge2')).toHaveLength(1);
  });

  it('should return ImageSection component value one', () => {
    expect(component.find('ImageSection')).toHaveLength(1);
  });

  it('should return RenderColorSwitch component value one', () => {
    expect(component.find('RenderColorSwitch')).toHaveLength(1);
  });

  it('should return RenderSizeFit component value one', () => {
    expect(component.find('RenderSizeFit')).toHaveLength(1);
  });

  it('should return RenderPurchasedQuantity component value one', () => {
    expect(component.find('RenderPurchasedQuantity')).toHaveLength(1);
  });

  it('should return RenderMoveToListOrSeeSuggestedList component value one', () => {
    expect(component.find('RenderMoveToListOrSeeSuggestedList')).toHaveLength(1);
  });

  it('should return Styled(Anchor) component value one', () => {
    expect(component.find('Styled(Anchor)')).toHaveLength(1);
  });

  it('should return Styled(CustomButton) component value one', () => {
    expect(component.find('Styled(CustomButton)')).toHaveLength(1);
  });

  it('should return RenderDismissLink component value one', () => {
    expect(component.find('RenderDismissLink')).toHaveLength(1);
  });
});
