import React from 'react';
import { shallow } from 'enzyme';
import { DropdownVanilla } from '../views/Dropdown.view';

describe('Dropdown component', () => {
  const props = {
    className: 'sample-class',
    options: [
      {
        value: '1',
        content: (
          <div>
            <p>Test 1</p>
          </div>
        ),
        title: 'Test 1',
        subSections: [
          {
            value: '1',
            content: (
              <div>
                <p>Test 1</p>
              </div>
            ),
            title: 'Test 1',
            component: 'active',
          },
        ],
      },
    ],
    active: 'Active title',
    activeComponent: 'activeClassValue',
  };

  it('should renders correctly', () => {
    const component = shallow(<DropdownVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders componentDidUpdate  correctly', () => {
    const component = shallow(<DropdownVanilla {...props} />);
    component.setProps({
      active: 'foo',
    });
    component.setState({
      navState: {
        displayName: '',
        component: 'active',
      },
    });
    expect(component).toMatchSnapshot();
  });

  it('should renders componentDidUpdate with option length  correctly', () => {
    const component = shallow(<DropdownVanilla {...props} />);
    component.setProps({
      options: {},
    });
    expect(component).toMatchSnapshot();
  });

  it('test setDropDownPosition func', () => {
    const component = shallow(<DropdownVanilla {...props} />);
    component.setState({
      dropDownExpand: true,
    });
    const instance = component.instance();
    instance.toggleHandler();
    expect(component.state('dropDownExpand')).toEqual(false);
  });

  it('should renders correctly when optional fields are not present', () => {
    const component = shallow(<DropdownVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
