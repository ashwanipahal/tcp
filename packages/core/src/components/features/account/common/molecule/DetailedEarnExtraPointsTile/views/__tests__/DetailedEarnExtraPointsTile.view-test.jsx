import { shallow } from 'enzyme';
import React from 'react';
import { DetailedEarnExtraPointsTileVanilla } from '../DetailedEarnExtraPointsTile.view';

describe('Detailed Earn Extra Points Tile component ', () => {
  it('should render Detailed Earn Extra Points Tile component Correctly', () => {
    const props = {
      waysToEarnRow: {
        activityCode: 'AppDownload',
        activityTitle: 'Earn 5 Points',
        description: 'Download & Log in to our App',
        displayOrder: 1,
        iconImage: '/wcsstore/static/images/download-app.jpg',
      },
      className: 'className',
      labels: {
        lbl_common_earnExtraPoints: 'Earn Extra Points',
        lbl_common_viewAll: 'View All',
      },
      onClickHandler: () => {},
    };
    const tree = shallow(<DetailedEarnExtraPointsTileVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
