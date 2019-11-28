import React from 'react';
import { shallow } from 'enzyme';
import mockM from '@tcp/core/src/services/abstractors/common/moduleM/mock';
import { ModuleMVanilla } from '../views/ModuleM';

describe('ModuleM component', () => {
  it('ModuleM component renders correctly with props', () => {
    const component = shallow(<ModuleMVanilla {...mockM.moduleM.composites} flexbox="0" />);
    expect(component).toMatchSnapshot();
  });
  it('ModuleM component renders correctly as flex', () => {
    const component = shallow(<ModuleMVanilla {...mockM.moduleM.composites} flexbox="1" />);
    expect(component).toMatchSnapshot();
    expect(component.find('.image-items-container__flex')).toHaveLength(1);
  });
});
