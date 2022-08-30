import React from 'react';
import { shallow } from 'enzyme';
import Prompt from '../views/Prompt.native';

describe('Prompt component', () => {
  const props = {
    title: '',
    onCancel: jest.fn(),
    onSubmit: jest.fn(),
  };
  let component = null;
  beforeEach(() => {
    component = shallow(<Prompt {...props} />);
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('test onCancelPress func', () => {
    component.instance().onCancelPress();
    expect(props.onCancel).toHaveBeenCalled();
  });

  it('test onSubmitPress func', () => {
    component.instance().onSubmitPress();
    expect(props.onSubmit).toHaveBeenCalled();
  });

  it('test onChangeText func', () => {
    component.instance().onChangeText('test');
    expect(component.state('value')).toEqual('test');
  });
});
