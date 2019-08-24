import React from 'react';
import { shallow } from 'enzyme';
import { CreditCardTextBox } from '../views/CreditCardTextBox.native';

describe('CreditCardTextBox component', () => {
  const props = {
    id: 'input',
    ariaLabel: 'input',
    type: 'text',
    meta: { touched: '', error: '' },
    dataLocator: 'input-field',
    enableSuccessCheck: false,
    label: 'input',
    keyboardType: 'default',
    showErrorIcon: true,
    input: { value: 'foo' },
    maxLength: 16,
  };

  let component;

  beforeEach(() => {
    component = shallow(<CreditCardTextBox {...props} />);
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders correctly hidden textbox', () => {
    component.setProps({ type: 'hidden' });
    expect(component).toMatchSnapshot();
  });

  it('render enableSuccessCheck on validation true', () => {
    component.setProps({ enableSuccessCheck: true });
    expect(component).toMatchSnapshot();
  });

  it('render enableSuccessCheck on validation fail', () => {
    component.setProps({ meta: { touched: 'foo', error: 'food' } });
    expect(component).toMatchSnapshot();
  });

  it('check handleFocus', () => {
    component.setState({ isFocused: false });
    component.instance().handleFocus();
    expect(component.state('isFocused')).toBe(true);
  });

  it('check handleBlur', () => {
    component.setState({ isFocused: true });
    component.instance().handleBlur();
    expect(component.state('isFocused')).toBe(false);
  });
});
