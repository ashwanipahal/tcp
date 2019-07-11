import React from 'react';
import { shallow } from 'enzyme';
import ModuleDNative from '../view/ModuleD.native';

describe('ModuleDNative', () => {
  let ModuleDComponent;

  beforeEach(() => {
    ModuleDComponent = shallow(<ModuleDNative />);
  });

  it('should be defined', () => {
    expect(ModuleDNative).toBeDefined();
  });

  it('should render correctly', () => {
    expect(ModuleDComponent).toMatchSnapshot();
  });
});
