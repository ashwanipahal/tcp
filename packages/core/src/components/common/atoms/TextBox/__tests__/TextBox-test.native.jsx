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
    showSuccessCheck: false,
    label: 'input',
    keyboardType: 'default',
    showErrorIcon: true,
    input: { value: 'foo' },
  };

  it('renders correctly', () => {
    const component = shallow(<TextBox {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('render showSuccessCheck on validation true', () => {
    props.showSuccessCheck = true;
    const component = shallow(<TextBox {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('render showSuccessCheck on validation fail', () => {
    props.meta.touched = 'foo';
    props.meta.error = 'foo';
    const component = shallow(<TextBox {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('check handleFocus', () => {
    const component = shallow(<TextBox {...props} />);
    component.setState({ isFocused: false });
    component.instance().handleFocus();
    expect(component.state('isFocused')).toBe(true);
  });

  it('check handleBlur', () => {
    const component = shallow(<TextBox {...props} />);
    component.setState({ isFocused: true });
    component.instance().handleBlur();
    expect(component.state('isFocused')).toBe(false);
  });
});
