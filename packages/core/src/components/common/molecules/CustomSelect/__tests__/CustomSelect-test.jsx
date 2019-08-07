import React from 'react';
import { shallow } from 'enzyme';
import { CustomSelectVanilla } from '../views/CustomSelect';

describe('CustomSelect component', () => {
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
      activeClassValue: 'activeClassValue',
    };
    const component = shallow(<CustomSelectVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly when optional fields are not present', () => {
    const options = [
      {
        value: '1',
        content: (
          <div>
            <p>Test 1</p>
          </div>
        ),
        title: 'Test 1',
      },
      {
        value: '2',
        content: (
          <div>
            <p>Test 2</p>
          </div>
        ),
        title: 'Test 2',
      },
    ];
    const mockedClickHandler = jest.fn();
    const component = shallow(
      <CustomSelectVanilla
        options={options}
        list="colorSelector"
        className="sample-class"
        clickHandler={mockedClickHandler}
      />
    );
    component.setState({ toggle: true });
    component.instance().onClickHandler({ stopPropagation: () => {} });
    expect(component.state('toggle')).toBe(false);
    expect(mockedClickHandler).toBeCalled();
    expect(component).toMatchSnapshot();
  });
});
