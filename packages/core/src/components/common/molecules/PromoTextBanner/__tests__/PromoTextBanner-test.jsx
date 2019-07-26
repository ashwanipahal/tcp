import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import { PromoBannerVanilla as PromoTextBanner } from '../PromoTextBanner';

let PromoTextBannerComp;

beforeEach(() => {
  const wrapper = shallow(
    <PromoTextBanner promoTextBanner={mock.moduleK.composites.masonryGrid[0].promoTextBanner} />
  ).get(0);
  PromoTextBannerComp = shallow(wrapper);
});

describe('Promo Text Banner component', () => {
  it('renders correctly', () => {
    expect(PromoTextBannerComp).toMatchSnapshot();
  });

  it('Module has header', () => {
    expect(PromoTextBannerComp.find('.promo-text')).toHaveLength(2);
  });
});
