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
    onViewActivityDetails: PropTypes.func,
    waysToEarnRow: PropTypes.shape({}),
    viewAll: PropTypes.bool,
  };

  static defaultProps = {
    labels: {},
    handleComponentChange: () => {},
    onViewActivityDetails: () => {},
    waysToEarnRow: {},
    viewAll: false,
  };

  boxWithShadow = {
    shadowColor: colorPalette.gray[1000],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  };

  render() {
    const { waysToEarnRow, viewAll, handleComponentChange, onViewActivityDetails } = this.props;
    return (
      <TileWrapper style={this.boxWithShadow}>
        <Anchor
          onPress={() =>
            viewAll
              ? onViewActivityDetails(waysToEarnRow)
              : handleComponentChange('earnExtraPointsPageMobile')
          }
        >
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
              fontSize={`${viewAll ? 'fs14' : 'fs16'}`}
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
