import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleN/mock';
import { ModuleNVanilla as ModuleN } from '../views/ModuleN';
import { LinkText } from '../..';
// import { LinkText, PromoBanner } from '../..';

describe('ModuleL component', () => {
  let ModuleNComp;

  beforeEach(() => {
    ModuleNComp = shallow(<ModuleN {...mock.moduleD.composites} />);
  });
  it('renders correctly', () => {
    expect(ModuleNComp).toMatchSnapshot();
  });

  it('should render header', () => {
    expect(ModuleNComp.find(LinkText)).toHaveLength(4);
  });

  /* it('should render promo text banner', () => {
    expect(ModuleNComp.find(PromoBanner)).toHaveLength(4);
  });

  it('Module has PromoBanner class', () => {
    expect(ModuleNComp.find('.moduleN__promo-banner')).toHaveLength(4);
  }); */
});
