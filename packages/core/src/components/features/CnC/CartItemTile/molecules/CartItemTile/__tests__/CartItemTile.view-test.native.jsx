import React from 'react';
import { shallow } from 'enzyme';
import CartItemTile from '../views/CartItemTile.view.native';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';

describe('CartItemTile common component', () => {
  it('renders correctly', () => {
    const props = {
      productDetail: {
        itemInfo: {
          name: 'Boys Basic Skinny Jeans 1',
          qty: '1',
          size: '1',
          price: 123,
          myPlacePoints: 123,
          isGiftItem: true,
          fit: 'regular',
          itemBrand: 'TCP',
          color: 'red',
        },
        productInfo: { skuId: '123', productPartNumber: 123 },
        miscInfo: {
          badge: '',
        },
      },
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
      onQuickViewOpenClick: jest.fn(),
    };
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with Save for later enabled', () => {
    const props = {
      productDetail: {
        productInfo: { skuId: '123' },
        itemInfo: {
          name: 'Boys Basic',
          qty: '1',
          size: '1',
          price: 123,
          myPlacePoints: 123,
          isGiftItem: true,
          fit: 'regular',
          itemBrand: 'TCP',
        },
        miscInfo: {
          badge: '',
          availability: 'OK',
        },
      },
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
    };
    const component = shallow(<CartItemTile {...props} isShowSaveForLater />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with bag page sfl section', () => {
    const props = {
      productDetail: {
        productInfo: { skuId: '123' },
        itemInfo: {
          name: 'Boys Basic Skinny Jeans',
          qty: '1',
          size: '1',
          price: 123,
          myPlacePoints: 123,
          isGiftItem: true,
          fit: 'regular',
          itemBrand: 'TCP',
        },
        miscInfo: {
          badge: '',
        },
      },
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
    };
    const component = shallow(<CartItemTile {...props} isBagPageSflSection />);
    expect(component).toMatchSnapshot();
  });
});

describe.only('CartItemTile - Boss Bopis Scenarios', () => {
  let props;
  beforeEach(() => {
    props = {
      clearToggleError: jest.fn(),
      toggleError: {
        error: {},
      },
      productDetail: {
        itemInfo: {
          name: 'Boys Basic Skinny Jeans',
          qty: '1',
          size: '1',
          price: 123,
          myPlacePoints: 123,
          isGiftItem: true,
          fit: 'regular',
          itemBrand: 'TCP',
          itemUnitPrice: 12.345,
        },
        miscInfo: {
          badge: '',
          orderItemType: 'BOSS',
          isOnlineOnly: false,
          clearanceItem: false,
          isStoreBOSSEligible: true,
          availability: 'OK',
          isInventoryAvailBOSS: true,
          isBossEligible: true,
          isBopisEligible: true,
        },
        productInfo: {
          upc: 'upc',
        },
      },
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
        bopisUnavailable: 'bopisUnavailable',
      },
      isBossEnabledTCP: true,
      isBossEnabledGYM: true,
      isBopisEnabledTCP: true,
      isBopisEnabledGYM: true,
      isBossClearanceProductEnabled: true,
      isBopisClearanceProductEnabled: true,
      isRadialInventoryEnabled: true,
    };
  });

  it('should render the Tile for Boss Item correctly without any kill switch', () => {
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for Boss Item correctly with Country any kill switch', () => {
    props.isBossEnabledTCP = false;
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for Boss Item correctly with store ineligible', () => {
    props.productDetail.miscInfo.isStoreBOSSEligible = false;
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for Boss Item correctly with OOS', () => {
    props.isRadialInventoryEnabled = true;
    props.productDetail.miscInfo.isInventoryAvailBOSS = false;
    props.productDetail.miscInfo.availability = CARTPAGE_CONSTANTS.AVAILABILITY.UNAVAILABLE;
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for Boss Item correctly with SOLDOUT', () => {
    props.productDetail.miscInfo.availability = CARTPAGE_CONSTANTS.AVAILABILITY.SOLDOUT;
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for Boss Item correctly with inventory mismatch', () => {
    props.isRadialInventoryEnabled = true;
    props.productDetail.miscInfo.isInventoryAvailBOSS = false;
    props.productDetail.miscInfo.availability = CARTPAGE_CONSTANTS.AVAILABILITY.REQ_QTY_UNAVAILABLE;
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for Boss Item correctly with Radial Disabled & inventory mismatch', () => {
    props.isRadialInventoryEnabled = true;
    props.productDetail.miscInfo.isInventoryAvailBOSS = false;
    props.productDetail.miscInfo.availability = CARTPAGE_CONSTANTS.AVAILABILITY.BOSSINELIGIBLE;
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for Boss Item correctly with Radial Disabled & SOLDOUT', () => {
    props.isRadialInventoryEnabled = true;
    props.productDetail.miscInfo.isInventoryAvailBOSS = false;
    props.productDetail.miscInfo.availability = CARTPAGE_CONSTANTS.AVAILABILITY.SOLDOUT;
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for BOSS Item correctly for clearance item with kill switch', () => {
    props.productDetail.miscInfo.orderItemType = 'BOSS';
    props.productDetail.miscInfo.clearanceItem = true;
    props.isBossClearanceProductEnabled = false;
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for BOPIS Item correctly with Country any kill switch', () => {
    props.isBopisEnabledTCP = false;
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for BOPIS Item correctly for online only', () => {
    props.productDetail.miscInfo.orderItemType = 'BOPIS';
    props.productDetail.miscInfo.isOnlineOnly = true;
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for BOPIS Item correctly for clearance item with kill switch', () => {
    props.productDetail.miscInfo.orderItemType = 'BOPIS';
    props.productDetail.miscInfo.clearanceItem = true;
    props.isBopisClearanceProductEnabled = false;
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for ECOM Item correctly', () => {
    props.productDetail.miscInfo.orderItemType = 'ECOM';
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for ECOM Item correctly with OOS', () => {
    props.productDetail.miscInfo.orderItemType = 'ECOM';
    props.productDetail.miscInfo.availability = CARTPAGE_CONSTANTS.AVAILABILITY.UNAVAILABLE;
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for ECOM Item correctly with Soldout', () => {
    props.productDetail.miscInfo.orderItemType = 'ECOM';
    props.productDetail.miscInfo.availability = CARTPAGE_CONSTANTS.AVAILABILITY.SOLDOUT;
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });
});
