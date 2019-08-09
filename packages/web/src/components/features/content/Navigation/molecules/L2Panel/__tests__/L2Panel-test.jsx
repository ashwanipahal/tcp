import React from 'react';
import mock from '@tcp/core/src/services/abstractors/bootstrap/navigation/mock';
import Abstractor from '@tcp/core/src/services/abstractors/bootstrap/navigation';
import { shallow } from 'enzyme';
import { L2PanelVanilla as L2Panel } from '../L2Panel';

const navData = Abstractor.processData(mock.data.navigation);

const data = {
  categoryLayout: navData[0].categoryContent.mainCategory.categoryLayout,
  order: Object.keys(navData[0].subCategories),
  panelData: navData[0].subCategories,
  name: navData[0].categoryContent,
  hideL2Drawer: () => {},
  hideL3Drawer: () => {},
  className: 'nav-bar-l2',
  openL3Drawer: () => {},
};

describe('L2 Panel component', () => {
  it('renders correctly', () => {
    const L1NavItemComp = shallow(<L2Panel {...data} />);

    expect(L1NavItemComp).toMatchSnapshot();
  });

  it('has nav bar loaded', () => {
    const L1NavItemComp = shallow(<L2Panel {...data} />);

    expect(L1NavItemComp.find('.nav-bar-l2')).toHaveLength(1);
  });
});
