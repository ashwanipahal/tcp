import React from 'react';
import { shallow } from 'enzyme';
import DropdownListVanilla from '../views';

describe('DropdownList component', () => {
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
      selectListTitle: 'Select from address book',
      activeTitle: 'Please select list item',
      activeValue: 'activeClassValue',
    };
    const component = shallow(<DropdownListVanilla {...props} />);
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
    const component = shallow(<DropdownListVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
