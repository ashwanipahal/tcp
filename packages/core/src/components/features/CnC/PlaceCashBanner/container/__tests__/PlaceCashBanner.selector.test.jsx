import { fromJS } from 'immutable';
import PlaceCashBannerSelector from '../PlaceCashBanner.selectors';
import PlaceCashLabelTestData from '../../util.test.data';

describe('#PlaceCashBanner Selectors', () => {
  it('#getIsPlaceCashEnabled should return false if (country !US or !CA) and earnedReward <= 0 ', () => {
    const CartPageReducer = fromJS({
      orderDetails: {
        rewardsToBeEarned: 0,
      },
    });
    const state = {
      session: {
        siteDetails: {
          country: 'IN',
        },
      },
      CartPageReducer,
    };
    expect(PlaceCashBannerSelector.getIsPlaceCashEnabled(state)).toEqual(false);
  });

  it('#getIsPlaceCashEnabled should return true  if (country US or CA) and earnedReward > 0 ', () => {
    const CartPageReducer = fromJS({
      orderDetails: {
        rewardsToBeEarned: 30,
      },
    });
    const state = {
      session: {
        siteDetails: {
          country: 'US',
        },
      },
      CartPageReducer,
    };
    expect(PlaceCashBannerSelector.getIsPlaceCashEnabled(state)).toEqual(true);
  });

  it('#getPlaceDetailsContentId should return false', () => {
    const contentId = 'werwqerewtwt12423';
    const labelKey = 'PlaceCash_Detail_US_BAG';
    const state = {
      Labels: {
        checkout: {
          placeCashBanner: {
            referred: [
              {
                name: labelKey,
                contentId,
              },
            ],
          },
        },
      },
    };
    expect(PlaceCashBannerSelector.getPlaceDetailsContentId(state, labelKey)).toEqual(contentId);
  });

  it('#getPlaceCashBannerLabels should return default labels if isEnabled=false', () => {
    const isOrderConfirmation = false;
    const state = {};
    const isEnabled = false;

    const finalValue = {
      title: '',
      subTitle: '',
      tnc: '',
      modalLink: '',
      imgUrl: '',
      detailModalTitle: '',
      SHOW_DETAILS_RICH_TEXT: '',
    };

    expect(
      PlaceCashBannerSelector.getPlaceCashBannerLabels(state, isOrderConfirmation, isEnabled)
    ).toEqual(finalValue);
  });

  it('#getPlaceCashBannerLabels should return default labels if isEnabled=true', () => {
    const isOrderConfirmation = false;
    const CartPageReducer = fromJS({
      orderDetails: {
        rewardsToBeEarned: 30,
      },
      moduleXContent: [],
    });
    const state = {
      session: {
        siteDetails: {
          country: 'US',
        },
      },
      CartPageReducer,
      Labels: {
        checkout: {
          placeCashBanner: PlaceCashLabelTestData,
        },
      },
    };
    const isEnabled = true;

    const finalValue = {
      detailModalTitle: 'Place Cash Detail',
      imgUrl: 'https://test1.theplace.com/image/upload/v1573831659/group_3x.png',
      modalLink: 'See Details',
      subTitle: 'Get $0  for every $0 you spend!',
      title: "YAY!, You'll Earn $30 in PLACE BUCKS",
      tnc: 'Cannot be combined with any other offer. Terms & conditions apply.',
    };

    expect(
      PlaceCashBannerSelector.getPlaceCashBannerLabels(state, isOrderConfirmation, isEnabled)
    ).toEqual(finalValue);
  });
});
