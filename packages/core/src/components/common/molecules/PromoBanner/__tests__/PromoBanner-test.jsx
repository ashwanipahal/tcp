import React from 'react';
import { shallow } from 'enzyme';
import mock from '../../../../../services/abstractors/common/moduleK/mock';
import { PromoBannerVanilla as PromoBanner } from '../views/PromoBanner';

let PromoBannerComp;

beforeEach(() => {
  const wrapper = shallow(
    <PromoBanner promoBanner={mock.moduleK.composites.masonryGrid[0].promoBanner} />
  ).get(0);
  PromoBannerComp = shallow(wrapper);
});

describe('Promo Text Banner component', () => {
  it('renders correctly', () => {
    expect(PromoBannerComp).toMatchSnapshot();
  });

  it('Module has header', () => {
    expect(PromoBannerComp.find('.promo-text')).toHaveLength(2);
  });
});
