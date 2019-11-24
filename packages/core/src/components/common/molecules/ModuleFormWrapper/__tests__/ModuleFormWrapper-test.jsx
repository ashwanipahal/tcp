import React from 'react';
import { shallow } from 'enzyme';
import ModuleFormWrapper from '../views/ModuleFormWrapper';

describe('ModuleFormWrapper component', () => {
  it('ModuleFormWrapper component renders correctly without props', () => {
    const component = shallow(<ModuleFormWrapper />);
    expect(component).toMatchSnapshot();
  });

  it('BrandLogo component renders correctly with props', () => {
    const props = {
      className: 'test-class',
    };
    const component = shallow(<ModuleFormWrapper {...props} />);
    expect(component.find('.test-class')).toHaveLength(1);
  });
});
