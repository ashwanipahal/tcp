import React from 'react';
import { shallow } from 'enzyme';
import { L3PanelVanilla as L3Panel } from '../L3Panel';

const data = {
  id: 'test',
  open: true,
  close: false,
  hideL3Drawer: () => () => {},
  name: 'testing',
  links: [
    {
      categoryContent: {
        seoToken: '',
        groupIdentifierSequence: null,
        isShortImage: 'false',
        isUnique: null,
        productCount: 202,
        description: 'spring dressy',
        groupIdentifier: '',
        groupIdentifierName: null,
        name: 'Spring Dressy',
        id: '512521',
      },
    },
  ],
};

describe('L3 Panel component', () => {
  it('renders correctly', () => {
    const L3NavItemComp = shallow(<L3Panel {...data} />);

    expect(L3NavItemComp).toMatchSnapshot();
  });

  it('has nav bar loaded', () => {
    const L3NavItemComp = shallow(<L3Panel {...data} />);

    expect(L3NavItemComp.find('.nav-bar-l3-panel')).toHaveLength(1);
  });
});
