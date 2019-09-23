import React from 'react';
import { BodyCopy, RichText, Button } from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';

import {
  RichTextWrapper,
  ImageSize,
  EarnExtraPointsTileImage,
} from './styles/ExtraPointsDetailModal.style.native';

const AppDownloadImage = require('@tcp/core/src/assets/download-app.png');
const ProductReviewImage = require('@tcp/core/src/assets/review.png');
const FacebookLinkImage = require('@tcp/core/src/assets/facebook.png');
const InstagramLinkImage = require('@tcp/core/src/assets/instagram.png');
const ChildProfileImage = require('@tcp/core/src/assets/child-birthday-profile.png');
const SMSOptInImage = require('@tcp/core/src/assets/sms.png');
const AddMailingAddressImage = require('@tcp/core/src/assets/mailingAddress.png');
const AddFavoriteStoreImage = require('@tcp/core/src/assets/store.png');
const AddShopperTypeImage = require('@tcp/core/src/assets/survey.png');

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
 * This Class component use for return the Extra Points Detail Modal
 * can be passed in the component.
 * @param waysToEarnRow - used for pass data to the modal popup
 * * @param onRequestClose - received onRequestClose function as param for closed popup
 * * @param openState - received openState function as param for open popup
 */

class ExtraPointsDetailModal extends React.PureComponent {
  static propTypes = {
    waysToEarnRow: PropTypes.shape({}),
  };

  static defaultProps = {
    waysToEarnRow: {},
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { waysToEarnRow } = this.props;
    const activityDetails = waysToEarnRow.activityModal;

    const richTextStyle = `<style font-size: 30px; >${
      activityDetails.activityModalLongDescription
    } </style>`;

    return (
      <>
        <EarnExtraPointsTileImage>
          <ImageSize source={sourceMap[waysToEarnRow.activityCode]} />
        </EarnExtraPointsTileImage>
        <BodyCopy
          fontSize="fs18"
          fontWeight="black"
          fontFamily="secondary"
          textAlign="center"
          className="elem-mb-MED"
          text={activityDetails.activityModalTitle}
          data-locator={`earnPointsModal_${activityDetails.activityModalAction}_title`}
        />
        <BodyCopy
          component="div"
          fontSize="fs16"
          fontWeight="black"
          fontFamily="secondary"
          textAlign="center"
          className="elem-mb-MED"
          text={activityDetails.activityModalShortTitle}
          data-locator={`earnPointsModal_${activityDetails.activityModalAction}_shortTitle`}
        />
        <RichTextWrapper>
          <RichText
            source={{ html: richTextStyle }}
            data-locator={`earnPointsModal_${activityDetails.activityModalAction}_ShortDesc`}
          />
        </RichTextWrapper>
        <BodyCopy component="div" textAlign="center">
          <Button
            buttonVariation="variable-width"
            text={activityDetails.activityModalCtaText}
            fill="BLUE"
            color="white"
          />
        </BodyCopy>
      </>
    );
  }
}

export default ExtraPointsDetailModal;
