import React from 'react';
import { shallow } from 'enzyme';
import { AddGiftCardFormVanilla } from '../AddGiftCardForm.native';

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
    onClearError: jest.fn(),
    addGiftCardError: true,
  };

  it('should render component correctly', () => {
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('simulate add gift card button ', () => {
    const handleSubmit = jest.fn();
    const component = shallow(<AddGiftCardFormVanilla {...props} handleSubmit={handleSubmit} />);

    component
      .find('Styled(CustomButton)')
      .at(0)
      .simulate('press');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('render error message', () => {
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    component.setProps({ addGiftCardResponse: 'foo' });
    expect(component).toMatchSnapshot();
  });
  it('simulate add gift card handleChange', () => {
    props.isRow = true;
    const data = { recaptchaToken: false };
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    const instance = component.instance();
    const spyHandleSubmit = jest.spyOn(instance, 'handleChange');
    instance.handleChange(data);
    expect(spyHandleSubmit).toHaveBeenCalled();
  });

  it('simulate add gift card handleSubmit', () => {
    props.isRow = true;
    const data = {};
    const event = { nativeEvent: data };
    const component = shallow(<AddGiftCardFormVanilla {...props} />);
    const instance = component.instance();
    const spyHandleSubmit = jest.spyOn(instance, 'onMessage');
    instance.onMessage(event);
    expect(spyHandleSubmit).toHaveBeenCalled();
  });
});
