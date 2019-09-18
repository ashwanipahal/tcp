import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
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

export class DetailedEarnExtraPointsTile extends React.PureComponent {
  static propTypes = {
    labels: PropTypes.shape({}),
    waysToEarnRow: PropTypes.shape({}),
  };

  static defaultProps = {
    labels: {},
    waysToEarnRow: {},
  };

  render() {
    const { waysToEarnRow } = this.props;

    return (
      <TileWrapper>
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
      </TileWrapper>
    );
  }
}

export default DetailedEarnExtraPointsTile;
