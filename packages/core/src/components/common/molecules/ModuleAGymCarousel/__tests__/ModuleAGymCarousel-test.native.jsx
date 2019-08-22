import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleA/mock';
import { ModuleAGymCarouselVanilla } from '../view/ModuleAGymCarousel.native';

let ModuleAGymCarouselComp;

beforeEach(() => {
  const wrapper = shallow(
    <ModuleAGymCarouselVanilla {...mock.moduleA.composites.largeCompImageCarousel} />
  ).get(0);
  ModuleAGymCarouselComp = shallow(wrapper);
});

describe('ModuleAGymCarousel component', () => {
  it('renders correctly', () => {
    expect(ModuleAGymCarouselComp).toMatchSnapshot();
  });
});
