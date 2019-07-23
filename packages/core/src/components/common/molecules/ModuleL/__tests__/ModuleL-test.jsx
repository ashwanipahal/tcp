import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleL/mock';
import { ModuleLVanilla as ModuleL } from '../views/ModuleL';
import { Carousel } from '../..';
import Header from '../views/ModuleL.Header';
import PromoBanner from '../views/ModuleL.PromoBanner';

describe('ModuleL component', () => {
  let ModuleLComp;

  beforeEach(() => {
    const wrapper = shallow(<ModuleL {...mock.moduleL.composites} />).get(0);
    ModuleLComp = shallow(wrapper);
  });

  it('renders correctly', () => {
    expect(ModuleLComp).toMatchSnapshot();
  });

  it('should render header', () => {
    expect(ModuleLComp.find(Header)).toHaveLength(1);
  });

  it('should render promo banner', () => {
    expect(ModuleLComp.find(PromoBanner)).toHaveLength(1);
  });

  it('should render carousel', () => {
    expect(ModuleLComp.find(Carousel)).toHaveLength(1);
  });

  it('should render ModuleL for mobile', () => {
    expect(ModuleLComp.find('.moduleL__mobile-web-container')).toHaveLength(1);
  });
});
