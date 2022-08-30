import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutHeaderVanilla, mapDispatchToProps } from '../CheckoutHeader';
import {
  MessageContainer,
  SafeAreaViewStyle,
  CheckoutHeaderContainer,
  CheckoutHeaderTextSection,
  BackIconTouchable,
} from '../Header.style';

describe('CheckoutHeader Component', () => {
  let component;
  const props = {
    navigation: {
      goBack: jest.fn(),
    },
    screenProps: {
      network: {
        isConnected: true,
      },
    },
  };

  beforeEach(() => {
    component = shallow(<CheckoutHeaderVanilla {...props} />);
  });

  it('Checkout Header should be defined', () => {
    expect(component).toBeDefined();
  });

  it(' Checkout Header should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('Checkout Header should return Container component value one', () => {
    expect(component.find(MessageContainer)).toHaveLength(1);
  });

  it('Checkout Header should return SafeAreaViewStyle component value one', () => {
    expect(component.find(SafeAreaViewStyle)).toHaveLength(1);
  });

  it('Header should return CheckoutHeaderContainer component value one', () => {
    expect(component.find(CheckoutHeaderContainer)).toHaveLength(1);
  });

  it('Header should return CheckoutHeaderTextSection component value one', () => {
    expect(component.find(CheckoutHeaderTextSection)).toHaveLength(1);
  });

  it('Header should return BackIconTouchable component value one', () => {
    expect(component.find(BackIconTouchable)).toHaveLength(1);
  });

  it(' Checkout Header should render correctly', () => {
    const componentInstance = component.instance();
    componentInstance.onBackPress();
  });

  it('Header noInterNetHandle to be called', () => {
    const mock = jest.fn();
    const prop = {
      screenProps: { network: { isConnected: false } },
      toastMessage: mock,
    };
    component.setState({ isIconIn: false });
    component.setProps(prop);
    expect(prop.toastMessage).toHaveBeenCalled();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action setCheckoutStage which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.setCheckoutStage();
      expect(dispatch.mock.calls).toHaveLength(1);
    });

    it('should return an action toastMessage which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.toastMessage();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
