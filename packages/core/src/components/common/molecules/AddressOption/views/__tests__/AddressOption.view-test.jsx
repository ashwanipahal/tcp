import React from 'react';
import { shallow } from 'enzyme';
import AddressOption from '../AddressOption.view';

describe('AddressOption component', () => {
  it('should renders correctly without input', () => {
    const props = {
      className: 'sample-class',
      value: 'test',
      name: 'testInput',
      showInput: false,
      address: {},
      isSelected: false,
    };
    const component = shallow(<AddressOption {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with input', () => {
    const props = {
      className: 'sample-class',
      value: 'test',
      name: 'testInput',
      showInput: true,
      address: {},
      isSelected: false,
    };
    const component = shallow(<AddressOption {...props} />);
    expect(component).toMatchSnapshot();
  });
});
