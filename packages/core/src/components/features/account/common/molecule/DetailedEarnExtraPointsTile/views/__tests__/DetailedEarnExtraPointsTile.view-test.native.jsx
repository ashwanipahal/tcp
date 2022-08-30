import { shallow } from 'enzyme';
import React from 'react';
import { DetailedEarnExtraPointsTile } from '../DetailedEarnExtraPointsTile.view';

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
      labels: {
        lbl_common_earnExtraPoints: 'Earn Extra Points',
        lbl_common_viewAll: 'View All',
      },
      onClickHandler: () => {},
      sourceMap: {
        AppDownload: 'AppDownloadImage',
        ProductReview: 'ProductReviewImage',
        FacebookLink: 'FacebookLinkImage',
        InstagramLink: 'InstagramLinkImage',
        ChildProfile: 'ChildProfileImage',
        SMSOptIn: 'SMSOptInImage',
        AddMailingAddress: 'AddMailingAddressImage',
        AddFavoriteStore: 'AddFavoriteStoreImage',
        AddShopperType: 'AddShopperTypeImage',
      },
    };

    const tree = shallow(<DetailedEarnExtraPointsTile {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
