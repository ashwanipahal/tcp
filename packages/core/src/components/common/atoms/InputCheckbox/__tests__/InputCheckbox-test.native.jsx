import React from 'react';
import { shallow } from 'enzyme';
import InputCheckBox from '../views/InputCheckbox.native';

describe('InputCheckbox component', () => {
  const props = {
    rightText: 'checkbox',
    isChecked: false,
    onClick: jest.fn(),
    id: 'checkbox',
    input: { val: '', onChange: () => {} },
  };

  it('should render correctly', () => {
    const component = shallow(<InputCheckBox {...props} />);
    component.setState({ isChecked: true });
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with checked state false', () => {
    const component = shallow(<InputCheckBox {...props} />);
    component.setState({ isChecked: false });
    expect(component).toMatchSnapshot();
  });

  it('test onClick function', () => {
    const component = shallow(<InputCheckBox {...props} />);
    component.setState({ isChecked: false });
    component.instance().onClick();
    expect(component.state('isChecked')).toBe(true);
  });
});
