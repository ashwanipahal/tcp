import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleL/mock';
import PromoBanner from '../views/ModuleL.PromoBanner';

describe('ModuleL Header component', () => {
  let PromoBannerComp;

  beforeEach(() => {
    PromoBannerComp = shallow(<PromoBanner {...mock.moduleL.composites.promoTextBanner} />);
  });

  it('renders correctly', () => {
    expect(PromoBannerComp).toMatchSnapshot();
  });

  it('should render promo banner component', () => {
    expect(PromoBannerComp.find('.moduleL__promo-banner')).toHaveLength(1);
  });
});
