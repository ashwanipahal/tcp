import React from 'react';
import { shallow } from 'enzyme';
import ModuleFormWrapper from '../views/ModuleFormWrapper.native';

describe('ModuleFormWrapper component', () => {
  it('ModuleFormWrapper component renders correctly without props', () => {
    const component = shallow(<ModuleFormWrapper />);
    expect(component).toMatchSnapshot();
  });
});
