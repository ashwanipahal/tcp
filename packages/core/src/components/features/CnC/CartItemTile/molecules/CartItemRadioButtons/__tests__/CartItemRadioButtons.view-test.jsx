import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { LabeledRadioButton, Anchor } from '@tcp/core/src/components/common/atoms';
import { CartItemRadioButtonsVanilla } from '../views/CartItemRadioButtons.view';

describe('CartItemRadioButtons Component', () => {
  let component;
  let props;

  beforeEach(() => {
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
        },
        itemInfo: '',
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
      setShipToHome: jest.fn(),
      openPickUpModal: jest.fn(),
      pickupStoresInCart: {},
    };
  });

  it('CartItemRadioButtons should be defined', () => {
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toBeDefined();
  });

  it('CartItemRadioButtons should render with no kill switch applied for STH Item', () => {
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons should render with no kill switch applied for Soldout STH Item', () => {
    props.isEcomSoldout = true;
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons should render with no kill switch applied for BOSS Item', () => {
    props.isECOMOrder = false;
    props.isBOSSOrder = true;
    props.component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons should render with Country kill switch applied for BOSS Item', () => {
    props.isECOMOrder = false;
    props.isBOSSOrder = true;
    props.isBossEnabled = false;
    props.bossDisabled = true;
    props.component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons should render with Product level kill switch applied for BOSS Item', () => {
    props.isECOMOrder = false;
    props.isBOSSOrder = true;
    props.bossDisabled = true;
    props.productDetail.miscInfo.isBossEligible = false;
    props.productDetail.miscInfo.availability = 'UNAVAILABLE';
    props.component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons should render with not available qty for BOSS Item', () => {
    props.isECOMOrder = false;
    props.isBOSSOrder = true;
    props.bossDisabled = true;
    props.productDetail.miscInfo.availability = 'UNAVAILABLE';
    props.component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons should render for online items only kill switch applied for BOSS Item', () => {
    props.isECOMOrder = false;
    props.isBOSSOrder = true;
    props.noBossMessage = 'Not Available (Online only)';
    props.component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons should render with no kill switch applied for BOPIS Item', () => {
    props.isECOMOrder = false;
    props.isBOPISOrder = true;
    props.component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons should render with Country kill switch applied for BOPIS Item', () => {
    props.isECOMOrder = false;
    props.isBOPISOrder = true;
    props.isBopisEnabled = false;
    props.bopisDisabled = true;
    props.component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons should render with Product level kill switch applied for BOPIS Item', () => {
    props.isECOMOrder = false;
    props.isBOPISOrder = true;
    props.bopisDisabled = true;
    props.productDetail.miscInfo.isBopisEligible = false;
    props.component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons should render with not available qty for BOPIS Item', () => {
    props.isECOMOrder = false;
    props.isBOPISOrder = true;
    props.bopisDisabled = true;
    props.productDetail.miscInfo.availability = 'UNAVAILABLE';
    props.component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('CartItemRadioButtons should render for online items only kill switch applied for BOPIS Item', () => {
    props.isECOMOrder = false;
    props.isBOPISOrder = true;
    props.noBopisMessage = 'Not Available (Online only)';
    props.component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should toggle to STH', () => {
    props.isECOMOrder = false;
    props.isBOSSOrder = true;
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component
      .find(LabeledRadioButton)
      .last()
      .props()
      .onClick();
    expect(props.setShipToHome).toHaveBeenCalled();
  });

  it('should open change store popup', () => {
    props.isECOMOrder = false;
    props.isBOSSOrder = true;
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component
      .find(Anchor)
      .first()
      .props()
      .onClick({
        preventDefault: jest.fn(),
      });
    expect(props.openPickUpModal).toHaveBeenCalled();
  });

  it('should open change store popup for bopis', () => {
    props.isECOMOrder = false;
    props.isBOSSOrder = true;
    props.orderItemType = 'BOPIS';
    props.pickupStoresInCart = [{ store1: {} }, { store2: {} }];
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component
      .find(Anchor)
      .first()
      .props()
      .onClick({
        preventDefault: jest.fn(),
      });
    expect(props.openPickUpModal).toHaveBeenCalled();
  });
});
