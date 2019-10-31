import React from 'react';
import { shallow } from 'enzyme';
import { ModuleMVanilla } from '../views/ModuleM';

describe('ModuleM component', () => {
  it('ModuleM component renders correctly without props', () => {
    const component = shallow(<ModuleMVanilla />);
    expect(component).toMatchSnapshot();
  });
});
