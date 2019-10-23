import React from 'react';
import { shallow } from 'enzyme';
import { ListItemVanilla } from '../views/ProductListItem.view.native';

describe('ProductListItem component', () => {
  let component;
  const props = {
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
    isFavorite: false,
    setLastDeletedItemId: jest.fn(),
    fullWidth: false,
    renderPriceAndBagOnly: false,
    renderPriceOnly: false,
    productImageWidth: false,
    isDataLoading: false,
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
});
