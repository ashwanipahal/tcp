import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleA/mock';
import { ModuleATcpCarouselVanilla } from '../view/ModuleATcpCarousel.native';

let ModuleATCPCarouselComp;

beforeEach(() => {
  const wrapper = shallow(
    <ModuleATcpCarouselVanilla {...mock.moduleA.composites.largeCompImageCarousel} />
  ).get(0);
  ModuleATCPCarouselComp = shallow(wrapper);
});

describe('ModuleATCPCarousel component', () => {
  it('renders correctly', () => {
    expect(ModuleATCPCarouselComp).toMatchSnapshot();
  });
});
