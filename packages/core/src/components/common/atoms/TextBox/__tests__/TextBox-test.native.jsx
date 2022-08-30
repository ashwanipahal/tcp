import React from 'react';
import { shallow } from 'enzyme';
import { TextBox } from '../views/TextBox.native';

describe('Textbox component', () => {
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
  };

  let component;

  beforeEach(() => {
    component = shallow(<TextBox {...props} />);
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
    component.setProps({ input: { onBlur: jest.fn(), value: '' } });
    component.setState({ isFocused: true });
    component.instance().handleBlur();
    expect(component.state('isFocused')).toBe(false);
  });
});
