import React from 'react';
import { shallow } from 'enzyme';
import mockM from '@tcp/core/src/components/common/molecules/ModuleM/moduleM.mock';
import { ModuleMVanilla } from '../views/ModuleM';

describe('ModuleM component', () => {
  it('ModuleM component renders correctly with props', () => {
    const component = shallow(<ModuleMVanilla {...mockM.moduleM.composites} type="flex1" />);
    expect(component).toMatchSnapshot();
  });
  it('ModuleM component renders correctly as flex', () => {
    const component = shallow(<ModuleMVanilla {...mockM.moduleM.composites} type="flex" />);
    expect(component).toMatchSnapshot();
    expect(component.find('.image-items-container__flex')).toHaveLength(1);
  });
});
