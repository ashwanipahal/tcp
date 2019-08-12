import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleA/mock';
import { ModuleAGymCarouselVanilla as ModuleAGymCarousel } from '../view/ModuleAGymCarousel';

let ModuleAGymCarouselComp;

beforeEach(() => {
  const wrapper = shallow(<ModuleAGymCarousel {...mock.moduleA.composites} />).get(0);
  ModuleAGymCarouselComp = shallow(wrapper);
});

describe('ModuleAGymCarousel component', () => {
  it('renders correctly', () => {
    expect(ModuleAGymCarouselComp).toMatchSnapshot();
  });
});
