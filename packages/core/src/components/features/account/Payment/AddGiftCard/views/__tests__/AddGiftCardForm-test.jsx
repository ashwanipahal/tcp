import React from 'react';
import { shallow } from 'enzyme';
import { AddGiftCardFormVanilla } from '../AddGiftCardForm';

describe('Add gift card form component', () => {
  const props = {
    labels: {
      paymentGC: {},
      common: {},
    },
    onAddGiftCardClick: jest.fn(),
    handleSubmit: jest.fn(),
    change: jest.fn(),
    goBackToPayment: jest.fn(),
    untouch: jest.fn(),
  };

  it('should render component correctly', () => {
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('simulate add gift card button ', () => {
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    component.instance().handleSubmit({
      cardPin: 'foo',
      giftCardNumber: 'foo',
      recaptchaToken: 'wedseweweeeeeeeec',
    });
    expect(props.onAddGiftCardClick).toHaveBeenCalled();
  });

  it('simulate add gift card button with dirty state true', () => {
    props.change = jest.fn();
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    component.setState({ isTokenDirty: true });
    component.instance().handleSubmit({
      cardPin: 'foo',
      giftCardNumber: 'foo',
      recaptchaToken: 'wedseweweeeeeeeec',
    });
    expect(props.onAddGiftCardClick).toHaveBeenCalled();
  });
  it('simulate add gift card button with dirty state true with isRow', () => {
    props.isRow = true;
    props.isRecapchaEnabled = true;
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    component.setState({ isTokenDirty: true });
    expect(props.onAddGiftCardClick).toHaveBeenCalled();
  });
  it('simulate add gift card button onCancelClick', () => {
    props.isRow = true;
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    const instance = component.instance();
    instance.onCancelClick();
  });
  it('simulate add gift card button handleRecaptchaVerify', () => {
    props.isRow = true;
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    const instance = component.instance();
    instance.handleRecaptchaVerify();
  });
  it('simulate add gift card button handleRecaptchaExpired', () => {
    props.isRow = true;
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    const instance = component.instance();
    instance.handleRecaptchaExpired();
  });
  it('simulate add gift card button resetReCaptcha', () => {
    props.isRow = true;
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    const instance = component.instance();
    instance.resetReCaptcha();
  });
  it('simulate add gift card button resetReCaptcha', () => {
    props.isRow = true;
    const data = { recaptchaToken: false };
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    const instance = component.instance();
    instance.handleSubmit(data);
  });
});
