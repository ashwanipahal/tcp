import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutHeaderVanilla } from '../CheckoutHeader';
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
    navigation: {},
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
});
