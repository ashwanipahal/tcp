import { shallow } from 'enzyme';
import React from 'react';
import { DetailedEarnExtraPointsTileVanilla } from '../DetailedEarnExtraPointsTile.view';

describe('Detailed Earn Extra Points Tile component ', () => {
  it('should render Detailed Earn Extra Points Tile component Correctly', () => {
    const props = {
      waysToEarnRow: [
        {
          activityCode: 'AppDownload',
          activityTitle: 'Earn 5 Points',
          description: 'Download & Log in to our App',
          displayOrder: 1,
          iconImage: '/wcsstore/static/images/download-app.jpg',
        },
        {
          activityCode: 'AppDownload 2',
          activityTitle: 'Earn 5 Points 2',
          description: 'Download & Log in to our App 2',
          displayOrder: 1,
          iconImage: '/wcsstore/static/images/download-app2.jpg',
        },
      ],
      className: 'className',
      labels: {
        lbl_common_earnExtraPoints: 'Earn Extra Points',
        lbl_common_viewAll: 'View All',
      },
      onViewActivityDetails: () => {},
    };
    const tree = shallow(<DetailedEarnExtraPointsTileVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
