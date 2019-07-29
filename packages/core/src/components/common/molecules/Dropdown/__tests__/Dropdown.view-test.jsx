import React from 'react';
import { shallow } from 'enzyme';
import DropdownVanilla from '../views';

describe('Dropdown component', () => {
  it('should renders correctly', () => {
    const props = {
      className: 'sample-class',
      options: {
        value: '1',
        content: (
          <div>
            <p>Test 1</p>
          </div>
        ),
        title: 'Test 1',
      },
      active: 'Active title',
      activeComponent: 'activeClassValue',
    };
    const component = shallow(<DropdownVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when optional fields are not present', () => {
    const props = {
      className: 'sample-class',
      options: {
        value: '1',
        content: (
          <div>
            <p>Test 1</p>
          </div>
        ),
        title: 'Test 1',
      },
    };
    const component = shallow(<DropdownVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
