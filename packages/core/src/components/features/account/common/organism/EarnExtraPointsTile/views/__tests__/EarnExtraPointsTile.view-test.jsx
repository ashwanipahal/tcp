import { shallow } from 'enzyme';
import React from 'react';
import { EarnExtraPointsTileVanilla } from '../EarnExtraPointsTile.view';

describe('Earn Extra Points Tile component ', () => {
  it('should render Earn Extra Points Tile component Correctly', () => {
    const props = {
      waysToEarn: [
        {
          activityCode: 'AppDownload',
          activityTitle: 'Earn 5 Points',
          description: 'Download & Log in to our App',
          displayOrder: 1,
          iconImage: '/wcsstore/static/images/download-app.jpg',
        },
      ],
      className: 'className',
      labels: {
        lbl_common_earnExtraPoints: 'Earn Extra Points',
        lbl_common_viewAll: 'View All',
      },
    };
    const tree = shallow(<EarnExtraPointsTileVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render Earn Extra Points Tile component Correctly in account overview', () => {
    const props = {
      waysToEarn: [
        {
          activityCode: 'App',
          activityTitle: 'Earn 10 Points',
          description: 'Download & Log in to our App',
          displayOrder: 1,
          iconImage: '/wcsstore/static/images/download-app.jpg',
        },
      ],
      className: 'className',
      labels: {
        lbl_common_earnExtraPoints: 'Earn Extra Points',
        lbl_common_viewAll: 'View All',
      },
      isAccountOverview: true,
    };
    const tree = shallow(<EarnExtraPointsTileVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
