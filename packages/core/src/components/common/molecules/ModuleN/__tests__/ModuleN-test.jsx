import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleN/mock';
import { ModuleNVanilla as ModuleN } from '../views/ModuleN';

describe('N component', () => {
  let ModuleNComp;

  beforeEach(() => {
    ModuleNComp = shallow(<ModuleN {...mock.moduleN.composites} set={mock.moduleN.set} />);
  });
  it('renders correctly', () => {
    expect(ModuleNComp).toMatchSnapshot();
  });
});
