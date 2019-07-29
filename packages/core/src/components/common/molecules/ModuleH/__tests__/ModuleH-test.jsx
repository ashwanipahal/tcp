import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../../Carousel';
import { ModuleHVanilla as ModuleH } from '../views/ModuleH';
import ModuleHHeader from '../views/ModuleH.Header';
import ModuleHCTALinks from '../views/ModuleH.Links';
import mock from '../../../../../services/abstractors/common/moduleH/mock';

describe('ModuleH component', () => {
  let moduleHComp;

  beforeEach(() => {
    const wrapper = shallow(<ModuleH {...mock.moduleH.composites} />).get(0);
    moduleHComp = shallow(wrapper);
  });

  it('renders correctly', () => {
    expect(moduleHComp).toMatchSnapshot();
  });

  it('has Header component', () => {
    expect(moduleHComp.find(ModuleHHeader)).toHaveLength(1);
  });

  it('has Carousel wrapper', () => {
    expect(moduleHComp.find(Carousel)).toHaveLength(1);
  });

  it('should renders CTA Links', () => {
    expect(moduleHComp.find(ModuleHCTALinks)).toHaveLength(1);
  });
});
