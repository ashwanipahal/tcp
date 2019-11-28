import React from 'react';
import { shallow } from 'enzyme';
import { HeaderPromoVanilla } from '../views/HeaderPromo';
import mockData from './mock';

describe('HeaderPromo component', () => {
  it('renders correctly for mobile', () => {
    const props = {
      className: 'header-promo-mobile',
      dataTextPromo: mockData.dataPromo.promoTextBanner,
      dataHtmlPromo: null,
      mobileMarkup: true,
    };
    const component = shallow(<HeaderPromoVanilla {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.header__promo-area--mobile')).toHaveLength(1);
    expect(component.find('.header__promo-area--desktop')).toHaveLength(0);
    expect(component.find('.orange-schedule')).toHaveLength(1);
    expect(component.find('.blue-email')).toHaveLength(1);
    expect(component.find('.green-dollar')).toHaveLength(1);
  });

  it('renders correctly for desktop', () => {
    const props = {
      className: 'header-promo-desktop',
      dataTextPromo: mockData.dataPromo.promoTextBanner,
      dataHtmlPromo: null,
    };
    const component = shallow(<HeaderPromoVanilla {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.header__promo-area--desktop')).toHaveLength(1);
    expect(component.find('.header__promo-area--mobile')).toHaveLength(0);
    expect(component.find('.orange-schedule')).toHaveLength(1);
    expect(component.find('.blue-email')).toHaveLength(1);
    expect(component.find('.green-dollar')).toHaveLength(1);
  });
});
