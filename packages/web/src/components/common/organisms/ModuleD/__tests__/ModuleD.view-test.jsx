import React from 'react';
import { shallow } from 'enzyme';
import ModuleDComponent from '../views/ModuleD.view';

describe('ModuleD component', () => {
  it('ModuleD component renders correctly', () => {
    const component = shallow(<ModuleDComponent />);
    expect(component).toMatchSnapshot();
  });
});
