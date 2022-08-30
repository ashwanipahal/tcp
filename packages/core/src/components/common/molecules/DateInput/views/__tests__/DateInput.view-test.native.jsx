import React from 'react';
import { shallow } from 'enzyme';
import { DateInput } from '../DateInput.view.native';

describe('DateInput component', () => {
  it('should render DatePicker component', () => {
    const props = {};
    const component = shallow(<DateInput {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('test onTextBoxPress', () => {
    const props = {};
    const component = shallow(<DateInput {...props} />);
    component.setState({ show: false });
    component.instance().onTextBoxPress();
    expect(component.state('show')).toEqual(true);
  });
});
