/* eslint-disable max-lines */
import React from 'react';
import { shallow } from 'enzyme';
import * as utils from '@tcp/core/src/utils/utils';
import CartItemTile, { CartItemTileVanilla } from '../views/CartItemTile.view';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';

utils.getBrand = jest.fn().mockReturnValue('tcp');

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
          itemBrand: 'tcp',
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
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('CartItemTile common should call handle getBossBopisDetailsForMiniBag', () => {
    const props = {
      productDetail: {
        itemInfo: {
          name: 'Boys Basic Skinny Jeans pant',
          qty: '1',
          size: '1',
          price: 123,
          myPlacePoints: 123,
          isGiftItem: true,
          fit: 'regular',
          itemBrand: 'tcp',
        },
        miscInfo: {
          badge: '',
        },
        productInfo: {
          skuId: '3444',
          generalProductId: '111',
          pdpUrl: '',
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
    const component = shallow(<CartItemTileVanilla {...props} />);
    component.instance().getBossBopisDetailsForMiniBag(props.productDetail);
  });
  it('CartItemTile common should call handle handleMoveItemtoSaveList', () => {
    const props = {
      productDetail: {
        itemInfo: {
          name: 'Boys Basic Skinny Jeans shirt',
          qty: '1',
          size: '1',
          price: 123,
          myPlacePoints: 123,
          isGiftItem: true,
          fit: 'regular',
          itemId: '123',
          itemBrand: 'tcp',
        },
        miscInfo: {
          badge: '',
        },
        productInfo: {
          skuId: '3444',
          generalProductId: '111',
          pdpUrl: '',
        },
      },
      addItemToSflList: jest.fn(),
      setCartItemsSflError: jest.fn(),
      setClickAnalyticsData: jest.fn(),
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
    };

    const component = shallow(<CartItemTileVanilla {...props} />);
    component.instance().handleMoveItemtoSaveList();
  });

  it('renders correctly with bag page sfl section', () => {
    const props = {
      productDetail: {
        itemInfo: {
          name: 'Boys Basic Skinny',
          qty: '1',
          size: '1',
          price: 123,
          myPlacePoints: 123,
          isGiftItem: true,
          fit: 'regular',
          itemBrand: 'tcp',
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

  it('CartItemTile common should call handle removeSflItem', () => {
    const props = {
      productDetail: {
        itemInfo: {
          name: 'Boys Basic Skinny Jeans ',
          qty: '1',
          size: '1',
          price: 123,
          myPlacePoints: 123,
          isGiftItem: true,
          fit: 'regular',
          itemId: '123',
          itemBrand: 'tcp',
        },
        miscInfo: {
          badge: '',
        },
        productInfo: {
          skuId: '3444',
          generalProductId: '111',
          pdpUrl: '',
        },
      },
      addItemToSflList: jest.fn(),
      setCartItemsSflError: jest.fn(),
      startSflItemDelete: jest.fn(),
      startSflDataMoveToBag: jest.fn(),
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
    };

    const component = shallow(<CartItemTileVanilla {...props} />);
    component.instance().removeSflItem();
  });

  it('CartItemTile common should call handle moveToBagSflItem', () => {
    const props = {
      productDetail: {
        itemInfo: {
          name: 'Boys  Jeans ',
          qty: '1',
          size: '1',
          price: 123,
          myPlacePoints: 123,
          isGiftItem: true,
          fit: 'regular',
          itemId: '123',
          itemBrand: 'tcp',
        },
        miscInfo: {
          badge: '',
        },
        productInfo: {
          skuId: '3444',
          generalProductId: '111',
          pdpUrl: '',
        },
      },
      addItemToSflList: jest.fn(),
      setCartItemsSflError: jest.fn(),
      startSflItemDelete: jest.fn(),
      startSflDataMoveToBag: jest.fn(),
      setClickAnalyticsData: jest.fn(),
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
    };

    const component = shallow(<CartItemTileVanilla {...props} />);
    component.instance().moveToBagSflItem();
  });

  it('CartItemTile common should call handle callEditMethod', () => {
    const props = {
      productDetail: {
        itemInfo: {
          isGiftItem: false,
          fit: 'regular',
          itemId: '123',
          itemUnitPrice: 23,
          price: 25,
          qty: 1,
          color: 'blue',
          offerPrice: 38.85,
          itemBrand: 'tcp',
        },
        miscInfo: {
          badge: '',
          availability: 'UNAVAILABLE',
          orderItemType: 'BOPIS',
          store: '',
        },
        productInfo: {
          skuId: '3444',
          generalProductId: '111',
          pdpUrl: '',
        },
      },
      onPickUpOpenClick: jest.fn(),
      pageView: 'myBag',
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
    };

    const component = shallow(<CartItemTileVanilla {...props} />);
    component.instance().callEditMethod();
  });
});

describe('CartItemTile - Boss Bopis Scenarios', () => {
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
          offerPrice: 38.85,
          itemId: '123',
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
          pdpUrl: '',
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
      pickupStoresInCart: {},
      onPickUpOpenClick: jest.fn(),
      toggleBossBopisError: null,
    };
  });

  it('should render the Tile for Boss Item correctly without any kill switch', () => {
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for Boss Item correctly with Country any kill switch', () => {
    props.isBossEnabledTCP = false;
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for Boss Item correctly with store ineligible', () => {
    props.productDetail.miscInfo.isStoreBOSSEligible = false;
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for Boss Item correctly with OOS', () => {
    props.isRadialInventoryEnabled = true;
    props.productDetail.miscInfo.isInventoryAvailBOSS = false;
    props.productDetail.miscInfo.availability = CARTPAGE_CONSTANTS.AVAILABILITY.UNAVAILABLE;
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for Boss Item correctly with SOLDOUT', () => {
    props.productDetail.miscInfo.availability = CARTPAGE_CONSTANTS.AVAILABILITY.SOLDOUT;
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for Boss Item correctly with inventory mismatch', () => {
    props.isRadialInventoryEnabled = true;
    props.productDetail.miscInfo.isInventoryAvailBOSS = false;
    props.productDetail.miscInfo.availability = CARTPAGE_CONSTANTS.AVAILABILITY.REQ_QTY_UNAVAILABLE;
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for Boss Item correctly with Radial Disabled & inventory mismatch', () => {
    props.isRadialInventoryEnabled = true;
    props.productDetail.miscInfo.isInventoryAvailBOSS = false;
    props.productDetail.miscInfo.availability = CARTPAGE_CONSTANTS.AVAILABILITY.BOSSINELIGIBLE;
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for Boss Item correctly with Radial Disabled & SOLDOUT', () => {
    props.isRadialInventoryEnabled = true;
    props.productDetail.miscInfo.isInventoryAvailBOSS = false;
    props.productDetail.miscInfo.availability = CARTPAGE_CONSTANTS.AVAILABILITY.SOLDOUT;
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for BOSS Item correctly for clearance item with kill switch', () => {
    props.productDetail.miscInfo.orderItemType = 'BOSS';
    props.productDetail.miscInfo.clearanceItem = true;
    props.isBossClearanceProductEnabled = false;
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for BOPIS Item correctly with Country any kill switch', () => {
    props.isBopisEnabledTCP = false;
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for BOPIS Item correctly for online only', () => {
    props.productDetail.miscInfo.orderItemType = 'BOPIS';
    props.productDetail.miscInfo.isOnlineOnly = true;
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for BOPIS Item correctly for clearance item with kill switch', () => {
    props.productDetail.miscInfo.orderItemType = 'BOPIS';
    props.productDetail.miscInfo.clearanceItem = true;
    props.isBopisClearanceProductEnabled = false;
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for ECOM Item correctly', () => {
    props.productDetail.miscInfo.orderItemType = 'ECOM';
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for ECOM Item correctly with OOS', () => {
    props.productDetail.miscInfo.orderItemType = 'ECOM';
    props.productDetail.miscInfo.availability = CARTPAGE_CONSTANTS.AVAILABILITY.UNAVAILABLE;
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the Tile for ECOM Item correctly with Soldout', () => {
    props.productDetail.miscInfo.orderItemType = 'ECOM';
    props.productDetail.miscInfo.availability = CARTPAGE_CONSTANTS.AVAILABILITY.SOLDOUT;
    const component = shallow(<CartItemTileVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should clear toggle error', () => {
    props.pageView = 'myBag';
    const component = shallow(<CartItemTileVanilla {...props} />);
    const instance = component.instance();
    instance.componentWillUnmount();
    expect(props.clearToggleError).toHaveBeenCalled();
  });

  it('should open pickup modal for boss/bopis toggle error', () => {
    jest.useFakeTimers();
    props.pageView = 'myBag';
    props.toggleBossBopisError = {
      errorMessage: 'errorMessage',
      itemId: '123',
      targetOrderType: 'BOPIS',
    };
    const component = shallow(<CartItemTileVanilla {...props} />);
    const instance = component.instance();
    instance.componentDidUpdate({ toggleBossBopisError: null });
    jest.runAllTimers();
    expect(props.onPickUpOpenClick).toHaveBeenCalled();
  });

  it('should close mini bag', () => {
    props.closeMiniBag = jest.fn();
    const component = shallow(<CartItemTileVanilla {...props} />);
    component.instance().closeMiniBagMethod();
    expect(props.closeMiniBag).toHaveBeenCalled();
  });
});
