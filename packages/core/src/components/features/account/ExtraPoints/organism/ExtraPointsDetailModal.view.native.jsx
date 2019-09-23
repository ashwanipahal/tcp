import React from 'react';
import { BodyCopy, RichText, Button } from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';

import {
  RichTextWrapper,
  ImageSize,
  EarnExtraPointsTileImage,
  ActivityModalTitleWrapper,
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
 * ExtraPointsDetailModal component used for show details earn extra points.
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

    const richTextStyle = `<meta name="viewport" content="width=device-width, initial-scale=1.0"><div style="font-size:14px; font-family: Nunito; margin-top:24px font-weight: normal;">${
      activityDetails.activityModalLongDescription
    } </div>`;

    return (
      <>
        <EarnExtraPointsTileImage>
          <ImageSize source={sourceMap[waysToEarnRow.activityCode]} />
        </EarnExtraPointsTileImage>
        <ActivityModalTitleWrapper>
          <BodyCopy
            fontSize="fs28"
            fontWeight="black"
            fontFamily="primary"
            textAlign="center"
            className="elem-mb-MED"
            text={activityDetails.activityModalTitle}
            data-locator={`earnPointsModal_${activityDetails.activityModalAction}_title`}
          />
        </ActivityModalTitleWrapper>
        <BodyCopy
          component="div"
          fontSize="fs18"
          fontWeight="extrabold"
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
        <Button
          buttonVariation="variable-width"
          text={activityDetails.activityModalCtaText}
          fill="BLUE"
          color="white"
        />
      </>
    );
  }
}

export default ExtraPointsDetailModal;
