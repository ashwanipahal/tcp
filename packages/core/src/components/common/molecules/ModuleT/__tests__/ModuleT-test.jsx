import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleT/mock';
import { ModuleTVanilla as ModuleT } from '../views/ModuleT';

let ModuleTComp;

beforeEach(() => {
  const wrapper = shallow(<ModuleT {...mock.moduleT.composites} />).get(0);
  ModuleTComp = shallow(wrapper);
});

describe('ModuleT component', () => {
  it('renders correctly', () => {
    expect(ModuleTComp).toMatchSnapshot();
  });

  it('Module has header', () => {
    expect(ModuleTComp.find('.header')).toHaveLength(2);
  });

  it('Module has promo banner', () => {
    expect(ModuleTComp.find('.moduleT-promo-wrapper')).toHaveLength(1);
  });

  it('Module has left promo image view', () => {
    expect(ModuleTComp.find('.promo-image-left')).toHaveLength(1);
  });

  it('Module has right promo image view', () => {
    expect(ModuleTComp.find('.promo-image-right')).toHaveLength(1);
  });
});
