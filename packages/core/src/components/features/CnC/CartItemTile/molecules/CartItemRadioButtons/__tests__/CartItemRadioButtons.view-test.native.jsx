import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { CartItemRadioButtonsVanilla } from '../views/CartItemRadioButtons.view.native';

describe('CartItemRadioButtons native Component', () => {
  let component;
  let props;
  let pickupInStores = null;
  beforeEach(() => {
    pickupInStores = [
      {
        stLocId: 'stLocId1',
        orderType: 'BOSS',
        isStoreBOSSEligible: true,
      },
      {
        stLocId: 'stLocId2',
        orderType: 'BOPIS',
        isStoreBOSSEligible: true,
      },
    ];
    props = {
      productDetail: {
        miscInfo: {
          isBossEligible: true,
          isBopisEligible: true,
          availability: 'OK',
          bossStartDate: fromJS({
            day: 'Fri',
            month: 'Oct',
            date: '16',
          }),
          bossEndDate: fromJS({
            day: 'Fri',
            month: 'Oct',
            date: '18',
          }),
          orderItemType: 'BOSS',
          store: 'store',
        },
        itemInfo: {
          isGiftItem: true,
          itemId: 'itemId',
          qty: 2,
        },
        productInfo: {
          skuId: 'skuId',
          itemPartNumber: 'itemPartNumber',
          variantNo: 'variantNo',
          generalProductId: 'generalProductId',
        },
      },
      className: '',
      labels: {},
      isBossEnabled: true,
      isBopisEnabled: true,
      isEcomSoldout: false,
      isECOMOrder: true,
      isBOPISOrder: false,
      isBOSSOrder: false,
      noBopisMessage: null,
      noBossMessage: null,
      bossDisabled: false,
      bopisDisabled: false,
      index: 0,
      openedTile: 0,
      openPickUpModal: jest.fn(),
      onPickUpOpenClick: jest.fn(),
      orderId: 123,
      setShipToHome: jest.fn(),
      pickupStoresInCart: fromJS([]),
      autoSwitchPickupItemInCart: jest.fn(),
    };
  });

  it('CartItemRadioButtons native should render correctly in collapse state with ECOM Order', () => {
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: false });
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons native should render correctly in collapse state with BOSS Order', () => {
    props.isECOMOrder = false;
    props.isBOSSOrder = true;
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: false });
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons native should render correctly in collapse state with BOSS Order and Boss Global Disabled', () => {
    props.isECOMOrder = false;
    props.isBOSSOrder = true;
    props.isBossEnabled = false;
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: false });
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons native should render correctly in collapse state with BOSS Order and Boss Product Level Disabled', () => {
    props.isECOMOrder = false;
    props.isBOSSOrder = true;
    props.bossDisabled = true;
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: false });
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons native should render correctly in collapse state with BOPIS Order', () => {
    props.isECOMOrder = false;
    props.isBOPISOrder = true;
    props.isBossEnabled = false;
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: false });
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons native should render correctly in expanded state with BOPIS Order', () => {
    props.isECOMOrder = false;
    props.isBOPISOrder = true;
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: true });
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons native should render correctly in collapsed state with BOPIS Order and Bopis Global Disabled', () => {
    props.isECOMOrder = false;
    props.isBOPISOrder = true;
    props.isBopisEnabled = false;
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: false });
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons native should render correctly in expanded state with BOPIS Order and Bopis Global Disabled', () => {
    props.isECOMOrder = false;
    props.isBOPISOrder = true;
    props.isBopisEnabled = false;
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: true });
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons native should render correctly in collapse state with BOPIS Order and Online only product', () => {
    props.isECOMOrder = false;
    props.isBOPISOrder = true;
    props.bopisDisabled = true;
    props.noBossMessage = 'Not Available (Online only)';
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: false });
    expect(component).toMatchSnapshot();
  });

  it('should toggle to STH', () => {
    props.isECOMOrder = false;
    props.isBOSSOrder = true;
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: true });
    component.instance().handleToggleClick(true, false);
    expect(props.setShipToHome).toHaveBeenCalled();
  });

  it('should not toggle to STH for Ecom Order', () => {
    props.isECOMOrder = true;
    props.isBOSSOrder = false;
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: true });
    component.instance().handleToggleClick(true, false);
    expect(props.setShipToHome).not.toHaveBeenCalled();
  });

  it('should not toggle to STH for Ecom Soldout', () => {
    props.isECOMOrder = false;
    props.isBOSSOrder = true;
    props.isEcomSoldout = true;
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: true });
    component.instance().handleToggleClick(true, false);
    expect(props.setShipToHome).not.toHaveBeenCalled();
  });

  it('CartItemRadioButtons native should render correctly in expanded state with BOPIS Order and Online only product', () => {
    props.isECOMOrder = false;
    props.isBOPISOrder = true;
    props.bopisDisabled = true;
    props.noBossMessage = 'Not Available (Online only)';
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: true });
    component.instance().handleChangeStoreClick();
    expect(props.openPickUpModal).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });

  it('should open change store popup for bopis', () => {
    props.isECOMOrder = false;
    props.isBOPISOrder = true;
    props.orderItemType = 'BOPIS';
    props.pickupStoresInCart = [{ store1: {} }, { store2: {} }];
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: true });
    component.instance().handleChangeStoreClick();
    expect(props.openPickUpModal).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });

  it('should open pickup modal, when toggled to boss', () => {
    props.isECOMOrder = true;
    props.isBOSSOrder = false;
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.instance().handleToggleClick(false, true);
    expect(props.openPickUpModal).toHaveBeenCalled();
  });

  it('should auto toggle, when toggled to boss', () => {
    props.isECOMOrder = true;
    props.isBOSSOrder = false;
    props.pickupStoresInCart = fromJS([pickupInStores[0]]);

    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.instance().handleToggleClick(false, true);
    expect(props.autoSwitchPickupItemInCart).toHaveBeenCalled();
  });

  it('should auto toggle, when toggled to boss for different stores', () => {
    props.isECOMOrder = true;
    props.isBOSSOrder = false;
    props.pickupStoresInCart = fromJS([...pickupInStores]);

    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.instance().handleToggleClick(false, true);
    expect(props.autoSwitchPickupItemInCart).toHaveBeenCalled();
  });

  it('should auto toggle, when toggled to boss for different stores with store ineligible', () => {
    props.isECOMOrder = true;
    props.isBOSSOrder = false;
    props.pickupStoresInCart = fromJS([
      { ...pickupInStores[0], isStoreBOSSEligible: false },
      { ...pickupInStores[1] },
    ]);

    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.instance().handleToggleClick(false, true);
    expect(props.openPickUpModal).toHaveBeenCalled();
  });

  it('should open pickup modal, when toggled to boss for multiple stores in cart', () => {
    props.isECOMOrder = true;
    props.isBOSSOrder = false;
    props.pickupStoresInCart = fromJS([{ ...pickupInStores[0] }, { ...pickupInStores[0] }]);

    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.instance().handleToggleClick(false, true);
    expect(props.openPickUpModal).toHaveBeenCalled();
  });

  it('should open pickup modal, when toggled to bopis for multiple stores in cart', () => {
    props.isECOMOrder = true;
    props.isBOSSOrder = false;
    props.pickupStoresInCart = fromJS([{ ...pickupInStores[1] }, { ...pickupInStores[1] }]);

    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.instance().handleToggleClick(false, false);
    expect(props.openPickUpModal).toHaveBeenCalled();
  });

  it('should auto toggle, when toggled to bopis for different stores', () => {
    props.isECOMOrder = true;
    props.isBOSSOrder = false;
    props.pickupStoresInCart = fromJS([...pickupInStores]);

    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.instance().handleToggleClick(false, false);
    expect(props.autoSwitchPickupItemInCart).toHaveBeenCalled();
  });

  it('should open pickup modal, when toggled to boss', () => {
    props.isECOMOrder = true;
    props.isBOSSOrder = false;
    props.pickupStoresInCart = fromJS([{ ...pickupInStores[0], isStoreBOSSEligible: false }]);

    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.instance().handleToggleClick(false, true);
    expect(props.openPickUpModal).toHaveBeenCalled();
  });
});
