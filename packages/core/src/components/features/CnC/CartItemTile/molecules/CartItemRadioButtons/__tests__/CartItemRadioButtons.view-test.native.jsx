import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { CartItemRadioButtonsVanilla } from '../views/CartItemRadioButtons.view.native';

describe('CartItemRadioButtons native Component', () => {
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
          store: 'NewPort',
          orderItemType: 'BOPIS',
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
      index: 0,
      openedTile: 0,
      openPickUpModal: jest.fn(),
      onPickUpOpenClick: jest.fn(),
      orderId: 123,
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

  it('CartItemRadioButtons native should render correctly in expanded state with BOPIS Order and Online only product', () => {
    props.isECOMOrder = false;
    props.isBOPISOrder = true;
    props.bopisDisabled = true;
    props.noBossMessage = 'Not Available (Online only)';
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    component.setState({ currentExpandedState: true });
    component.instance().handleChangeStoreClick();
    expect(component).toMatchSnapshot();
  });
});
