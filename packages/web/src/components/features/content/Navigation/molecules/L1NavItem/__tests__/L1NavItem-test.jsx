import React from 'react';
import { shallow } from 'enzyme';
import { L1NavItemVanilla as L1NavItem } from '../L1NavItem';

const data1 = {
  categoryContent: {
    name: '',
    description: '',
    seoToken: '',
    mainCategory: {
      promoBadge: [
        {
          text: '30% off shoes',
          style: 'style1',
        },
      ],
    },
  },
};

const data2 = {
  categoryContent: {
    name: 'Girl',
    seoToken: '',
    description: 'Sizes 4-14',
    mainCategory: {
      promoBadge: '',
    },
  },
};

describe('Drawer component', () => {
  it('renders correctly', () => {
    const L1NavItemComp = shallow(<L1NavItem {...data1} />);

    expect(L1NavItemComp).toMatchSnapshot();
  });

  it('has description loaded', () => {
    const L1NavItemComp = shallow(<L1NavItem {...data2} />);

    expect(L1NavItemComp.find('.nav-bar-item-label')).toHaveLength(1);
  });
});
