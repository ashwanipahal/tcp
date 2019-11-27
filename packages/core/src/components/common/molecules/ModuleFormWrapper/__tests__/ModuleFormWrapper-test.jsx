import React from 'react';
import { shallow } from 'enzyme';
import ModuleFormWrapper from '../views/ModuleFormWrapper';

describe('ModuleFormWrapper component', () => {
  it('ModuleFormWrapper component renders correctly without props', () => {
    const component = shallow(<ModuleFormWrapper />);
    expect(component).toMatchSnapshot();
  });

  it('ModuleFormWrapper component renders correctly', () => {
    const component = shallow(<ModuleFormWrapper />);
    expect(component.find('.moduleFormWrapper')).toHaveLength(1);
  });
});
