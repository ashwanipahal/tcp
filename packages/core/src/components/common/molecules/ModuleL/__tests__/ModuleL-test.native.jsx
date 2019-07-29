import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleL/mock';
import { ModuleLVanilla } from '../views/ModuleL.native';

describe('ModuleLVanilla', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ModuleLVanilla {...mock.moduleL.composites} />);
  });

  it('ModuleL should be defined', () => {
    expect(component).toBeDefined();
  });

  it('ModuleL should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
