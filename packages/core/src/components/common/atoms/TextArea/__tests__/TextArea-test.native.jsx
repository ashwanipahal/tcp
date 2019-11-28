import React from 'react';
import { shallow } from 'enzyme';
import TextArea from '../views/TextArea.native';
import { StyledTextInput } from '../TextArea.style.native';

describe('TextArea component', () => {
  let component;
  let onChangeSpy;
  beforeEach(() => {
    onChangeSpy = jest.fn();
    const props = {
      id: 'input',
      name: 'input',
      meta: { touched: '', error: '' },
      enableSuccessCheck: false,
      label: 'input',
      input: {
        value: 'foo',
        onChange: onChangeSpy,
      },
    };

    component = shallow(<TextArea {...props} />);
  });

  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly in case of error', () => {
    component.find(StyledTextInput).prop('onFocus')();
    component.setProps({
      meta: { touched: true, error: 'error' },
    });
    expect(component).toMatchSnapshot();
  });

  it('onChangeText should call input.onChange', () => {
    component.find(StyledTextInput).prop('onChangeText')('test');
    expect(onChangeSpy).toHaveBeenCalledWith('test');
  });
});
