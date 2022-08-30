import React from 'react';
import { shallow } from 'enzyme';
import { PromoBadgeVanilla as PromoBadge } from '../PromoBadge';

const data = [
  {
    text: '30% off shoes',
    style: 'style1',
  },
];

describe('Promo Badge component', () => {
  it('renders correctly', () => {
    const PromoBadgeComp = shallow(<PromoBadge data={data} />);

    expect(PromoBadgeComp).toMatchSnapshot();
  });

  it('renders promo badge', () => {
    const PromoBadgeComp = shallow(<PromoBadge data={data} />);
    expect(PromoBadgeComp.find('.nav-bar-l1-promo-badge')).toHaveLength(1);
  });
});
