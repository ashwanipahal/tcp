import React from 'react';
import { shallow } from 'enzyme';
import { ModuleDVanilla as ModuleD } from '../view/ModuleD';
import mock from '../../../../../services/abstractors/common/moduleD/mock';

describe('ModuleD component', () => {
  let ModuleDComp;

  beforeEach(() => {
    const wrapper = shallow(<ModuleD {...mock.moduleD.composites} />).get(0);
    ModuleDComp = shallow(wrapper);
  });

  it('renders correctly', () => {
    expect(ModuleDComp).toMatchSnapshot();
  });
});
