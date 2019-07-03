import React from 'react';
import { shallow } from 'enzyme';
import { PromotionalAreaVanilla } from '../view/PromotionalArea';
import mockData from '../mock';

describe('PromotionalArea component', () => {
  it('renders correctly with mobile check true', () => {
    const props = {
      className: 'promotional-area',
      data: mockData.promo_message_wrapper,
      mobile: true,
    };
    const component = shallow(<PromotionalAreaVanilla {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.promotional-area')).toHaveLength(1);
    expect(component.find('.header-topnav__promo-area--mobile')).toHaveLength(1);
  });

  it('renders correctly with mobile check false for tablet', () => {
    const props = {
      className: 'promotional-area',
      data: mockData.promo_message_wrapper,
      mobile: false,
    };
    const component = shallow(<PromotionalAreaVanilla {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.promotional-area')).toHaveLength(1);
    expect(component.find('.header-topnav__promo-area--tablet')).toHaveLength(1);
  });
});
