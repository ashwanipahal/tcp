import React from 'react';
import { shallow } from 'enzyme';
import { HeaderTopNavVanilla } from '../view/HeaderTopNav';
import mockData from '../mock';

describe('Footer component', () => {
  it('HeaderTopNav component renders correctly to match snapshots', () => {
    const props = {
      className: 'header-top-nav',
      brandTabs: mockData.dataTopNav.composites.brand_tabs,
      promoMessageWrapper: mockData.dataTopNav.composites.promo_message_wrapper,
    };
    const component = shallow(<HeaderTopNavVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('HeaderTopNav component renders correctly with props', () => {
    const props = {
      className: 'header-top-nav',
      brandTabs: mockData.dataTopNav.composites.brand_tabs,
      promoMessageWrapper: mockData.dataTopNav.composites.promo_message_wrapper,
    };
    const component = shallow(<HeaderTopNavVanilla {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.header-top-nav')).toHaveLength(1);
  });
});
