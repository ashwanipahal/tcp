import React from 'react';
import CustomSelect from '@tcp/core/src/components/common/molecules/CustomSelect';
import { shallow } from 'enzyme';
import ColorSelectorDropDown, { ColorSelectorDropDownVanilla } from '../views/ColorSelect.view';

describe('ColorSelectorDropDown component', () => {
  it('ColorSelectorDropDown component renders correctly', () => {
    const props = {
      className: 'checkout',
      options: [],
      input: {
        name: {},
      },
    };
    const component = shallow(<ColorSelectorDropDown {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render CustomSelect view section', () => {
    const props = {
      className: 'checkout',
      options: [],
      input: {
        name: {},
      },
    };
    const tree = shallow(<ColorSelectorDropDownVanilla {...props} />);
    expect(tree.find(CustomSelect)).toBeTruthy();
  });
});
