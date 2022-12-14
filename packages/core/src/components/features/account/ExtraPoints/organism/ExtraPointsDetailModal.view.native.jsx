import React from 'react';
import { BodyCopy, RichText, Button } from '@tcp/core/src/components/common/atoms';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import PropTypes from 'prop-types';
import sourceMap from '../imageSourceMap';
import endpoints from '../../common/externalEndpoints';
import { UrlHandler } from '../../../../../utils/utils.app';

import {
  RichTextWrapper,
  ImageSize,
  EarnExtraPointsTileImage,
  ButtonWrapper,
} from './styles/ExtraPointsDetailModal.style.native';

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
    handleComponentChange: PropTypes.func,
  };

  static defaultProps = {
    waysToEarnRow: {},
    handleComponentChange: () => {},
  };

  /**
   * @function handleButtonClick  to get the route to CTA url based on activityModalAction
   * @param    {Object} activeActivity The activity details of waysToEarn
   * @returns  {String} cta path for redirection mapping
   */
  handleButtonClick = activityDetails => {
    const { handleComponentChange } = this.props;
    switch (activityDetails.activityModalAction) {
      case 'rewardPlaceApp':
        return UrlHandler(endpoints.appDownloadPage);
      case 'userAboutYourselfSurvey':
      case 'userMailing':
      case 'birthdaySavings':
      case 'userBirthday':
        return handleComponentChange('profileInformationMobile', {
          activeComponent: activityDetails.activityModalAction,
        });
      case 'userFavoriteStore':
        return handleComponentChange('profileInformationMobile');

      case 'myPreference':
        return handleComponentChange('myPreferencePageMobile', {
          activeComponent: activityDetails.activityModalAction,
          activityModalSocialAccount: activityDetails.activityModalSocialAccount,
        });

      case 'orders':
        return handleComponentChange('accountOverviewMobile');
      default:
        return handleComponentChange('profileInformationMobile');
    }
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { waysToEarnRow } = this.props;
    const activityDetails = waysToEarnRow.activityModal;

    const richTextStyle = `<meta name="viewport" content="width=device-width, initial-scale=1.0"><div style="font-size:14px; text-align:center; font-family: Nunito; margin-top:24px font-weight: normal;">${
      activityDetails.activityModalLongDescription
    } </div>`;

    return (
      <>
        <EarnExtraPointsTileImage>
          <ImageSize source={sourceMap[waysToEarnRow.activityCode]} />
        </EarnExtraPointsTileImage>
        <BodyCopyWithSpacing
          fontSize="fs28"
          fontWeight="black"
          fontFamily="primary"
          textAlign="center"
          color="gray.900"
          spacingStyles="margin-top-LRG"
          text={activityDetails.activityModalTitle}
          data-locator={`earnPointsModal_${activityDetails.activityModalAction}_title`}
        />
        <BodyCopy
          component="div"
          fontSize="fs18"
          fontWeight="extrabold"
          fontFamily="secondary"
          textAlign="center"
          color="gray.900"
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
        <ButtonWrapper>
          <Button
            text={activityDetails.activityModalCtaText}
            fill="BLUE"
            color="white"
            onPress={() => this.handleButtonClick(activityDetails)}
          />
        </ButtonWrapper>
      </>
    );
  }
}

export default ExtraPointsDetailModal;
