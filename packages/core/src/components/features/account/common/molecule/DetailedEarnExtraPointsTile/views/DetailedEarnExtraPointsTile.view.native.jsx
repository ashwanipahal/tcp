import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import {
  TileWrapper,
  EarnPointDesc,
  EarnExtraPointsTileImage,
  ImageSize,
} from '../styles/DetailedEarnExtraPointsTile.style.native';

const AppDownloadImage = require('../../../../../../../assets/download-app.png');
const ProductReviewImage = require('../../../../../../../assets/review.png');
const FacebookLinkImage = require('../../../../../../../assets/facebook.png');
const InstagramLinkImage = require('../../../../../../../assets/instagram.png');
const ChildProfileImage = require('../../../../../../../assets/child-birthday-profile.png');
const SMSOptInImage = require('../../../../../../../assets/sms.png');
const AddMailingAddressImage = require('../../../../../../../assets/mailingAddress.png');
const AddFavoriteStoreImage = require('../../../../../../../assets/store.png');
const AddShopperTypeImage = require('../../../../../../../assets/survey.png');

const colorPalette = createThemeColorPalette();

/**
 * DetailedEarnExtraPointsTile component used for show details earn extra points.
 * @sourceMap - sourceMap object for images path
 */

const sourceMap = {
  AppDownload: AppDownloadImage,
  ProductReview: ProductReviewImage,
  FacebookLink: FacebookLinkImage,
  InstagramLink: InstagramLinkImage,
  ChildProfile: ChildProfileImage,
  SMSOptIn: SMSOptInImage,
  AddMailingAddress: AddMailingAddressImage,
  AddFavoriteStore: AddFavoriteStoreImage,
  AddShopperType: AddShopperTypeImage,
};

/**
 * DetailedEarnExtraPointsTile component used for show details earn extra points.
 * @param - Received object of waysToEarnRow data
 * @param - Received object of label from cms
 */

export class DetailedEarnExtraPointsTile extends React.PureComponent {
  static propTypes = {
    labels: PropTypes.shape({}),
    handleComponentChange: PropTypes.func,
    waysToEarnRow: PropTypes.shape({}),
  };

  static defaultProps = {
    labels: {},
    handleComponentChange: () => {},
    waysToEarnRow: {},
  };

  boxWithShadow = {
    shadowColor: colorPalette.gray[1000],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  };

  render() {
    const { waysToEarnRow, handleComponentChange } = this.props;

    return (
      <TileWrapper style={this.boxWithShadow}>
        <Anchor onPress={() => handleComponentChange('accountOverviewMobile')}>
          <EarnExtraPointsTileImage>
            <ImageSize source={sourceMap[waysToEarnRow.activityCode]} />
          </EarnExtraPointsTileImage>
          <BodyCopy
            component="p"
            fontSize="fs16"
            fontWeight="black"
            fontFamily="secondary"
            textAlign="center"
            text={waysToEarnRow.activityTitle}
            data-locator={`earnExtraPointsActivityTitle_${waysToEarnRow.activityCode}`}
          />
          <EarnPointDesc>
            <BodyCopy
              component="p"
              fontSize="fs16"
              fontWeight="regular"
              fontFamily="secondary"
              textAlign="center"
              text={waysToEarnRow.description}
              data-locator={`earnExtraPointsDescription_${waysToEarnRow.activityCode}`}
            />
          </EarnPointDesc>
        </Anchor>
      </TileWrapper>
    );
  }
}

export default DetailedEarnExtraPointsTile;
