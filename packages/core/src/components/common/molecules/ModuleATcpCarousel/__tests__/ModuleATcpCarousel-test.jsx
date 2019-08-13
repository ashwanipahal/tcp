import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleA/mock';
import { ModuleATcpCarouselVanilla as ModuleATcpCarousel } from '../view/ModuleATcpCarousel';

let ModuleATcpCarouselComp;

beforeEach(() => {
  const wrapper = shallow(<ModuleATcpCarousel {...mock.moduleA.composites} />).get(0);
  ModuleATcpCarouselComp = shallow(wrapper);
});

describe('ModuleATcpCarousel component', () => {
  it('renders correctly', () => {
    expect(ModuleATcpCarouselComp).toMatchSnapshot();
  });
});
