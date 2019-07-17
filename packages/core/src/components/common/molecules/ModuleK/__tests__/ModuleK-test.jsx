import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import { ModuleKVanilla as ModuleK } from '../view/ModuleK';

let ModuleKComp;

beforeEach(() => {
  const wrapper = shallow(<ModuleK {...mock.moduleK.composites} />).get(0);
  ModuleKComp = shallow(wrapper);
});

describe('ModuleK component', () => {
  it('renders correctly', () => {
    expect(ModuleKComp).toMatchSnapshot();
  });

  it('Module has header', () => {
    expect(ModuleKComp.find('.module-k__header')).toHaveLength(1);
  });

  it('Module has carousal', () => {
    expect(ModuleKComp.find('.module-k__carousal')).toHaveLength(1);
  });

  it('Module has promo banner', () => {
    expect(ModuleKComp.find('.module-k__promoBanner')).toHaveLength(5);
  });

  it('Module has image grid', () => {
    expect(ModuleKComp.find('.image-grid')).toHaveLength(4);
  });

  it('Module has carousal cta', () => {
    expect(ModuleKComp.find('.carousal-cta')).toHaveLength(4);
  });
});
