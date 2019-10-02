import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../../Carousel';
import { ModuleHVanilla as ModuleH } from '../views/ModuleH';
import ModuleHCTALinks from '../views/ModuleH.Links';
import mock from '../../../../../services/abstractors/common/moduleH/mock';

describe('ModuleH component', () => {
  let moduleHComp;

  beforeEach(() => {
    const wrapper = shallow(
      <ModuleH
        {...mock.composites}
        accessibility={{ playIconButton: 'Play', pauseIconButton: 'Pause' }}
      />
    ).get(0);
    moduleHComp = shallow(wrapper);
  });

  it('renders correctly', () => {
    expect(moduleHComp).toMatchSnapshot();
  });

  it('has Carousel wrapper', () => {
    expect(moduleHComp.find(Carousel)).toHaveLength(1);
  });

  it('should renders CTA Links', () => {
    expect(moduleHComp.find(ModuleHCTALinks)).toHaveLength(1);
  });
});
