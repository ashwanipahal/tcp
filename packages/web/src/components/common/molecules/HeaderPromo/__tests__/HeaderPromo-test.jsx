import React from 'react';
import { shallow } from 'enzyme';
import { HeaderPromoVanilla } from '../views/HeaderPromo';
import mockData from './mock';

describe('HeaderPromo component', () => {
  it('renders correctly for mobile', () => {
    const props = {
      className: 'header-promo-mobile',
      dataPromo: mockData.dataPromo.promoTextBanner,
      mobile: true,
    };
    const component = shallow(<HeaderPromoVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly for desktop', () => {
    const props = {
      className: 'header-promo-desktop',
      dataPromo: mockData.dataPromo.promoTextBanner,
    };
    const component = shallow(<HeaderPromoVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
