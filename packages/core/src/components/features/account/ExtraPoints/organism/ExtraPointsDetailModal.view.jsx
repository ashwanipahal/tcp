import React from 'react';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import { BodyCopy, RichText, Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import PropTypes from 'prop-types';
import styles from './styles/ExtraPointsDetailModal.style';
import endpoints from '../../common/externalEndpoints';
import internalEndpoints from '../../common/internalEndpoints';

/**
 * This Class component use for return the Extra Points Detail Modal
 * can be passed in the component.
 * @param waysToEarnRow - used for pass data to the modal popup
 * * @param onRequestClose - received onRequestClose function as param for closed popup
 * * @param openState - received openState function as param for open popup
 */
class ExtraPointsDetailModal extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    waysToEarnRow: PropTypes.shape({}),
    onRequestClose: PropTypes.func.isRequired,
    openState: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    className: '',
    waysToEarnRow: {},
  };

  onRequestClosePopup = () => {
    const { onRequestClose } = this.props;
    onRequestClose(null);
  };

  /**
   * @function ctaTo  to get the route to CTA url based on activityModalAction
   * @param    {Object} activeActivity The activity details of waysToEarn
   * @returns  {String} to path for CTA anchor
   */
  ctaTo = activeActivity => {
    switch (activeActivity.activityModalAction) {
      case 'rewardPlaceApp':
        return endpoints.appDownloadPage;
      case 'userAboutYourselfSurvey':
        return `${internalEndpoints.profilePage.link}&subSection=?survey=true`;
      case 'userFavoriteStore':
        return internalEndpoints.profilePage.link;
      case 'userMailing':
        return internalEndpoints.mailingAddressPage.link;
      case 'myPreference':
        return `${internalEndpoints.myPreferencesPage.link}&subSection=?socialAccount=${
          activeActivity.activityModalSocialAccount
        }`;
      case 'birthdaySavings':
        return internalEndpoints.birthdaySavingsPage.link;
      case 'orders':
        return '/account?id=orders';
      default:
        return internalEndpoints.profilePage.link;
    }
  };

  /**
   * @function ctaPath  to get the path of CTA url based on activityModalAction
   * @param    {Object} activeActivity The activity details of waysToEarn
   * @returns  {String} to ecxact redirect path of CTA anchor
   */
  ctaPath = activeActivity => {
    switch (activeActivity.activityModalAction) {
      case 'rewardPlaceApp':
        return endpoints.appDownloadPage;
      case 'userAboutYourselfSurvey':
        return `${internalEndpoints.profilePage.path}/?survey=true`;
      case 'userFavoriteStore':
        return internalEndpoints.profilePage.path;
      case 'userMailing':
        return internalEndpoints.mailingAddressPage.path;
      case 'myPreference':
        return `${internalEndpoints.myPreferencesPage.path}/socialAccount=${
          activeActivity.activityModalSocialAccount
        }`;
      case 'birthdaySavings':
        return internalEndpoints.birthdaySavingsPage.path;
      case 'orders':
        return '/account/orders';
      default:
        return internalEndpoints.profilePage.path;
    }
  };

  /**
   * This function use for return the JSX of the component
   * can be passed in the component.
   * @param waysToEarnRow - this is waysToEarnRow data used for show Activity details
   */

  getModalMarkup = () => {
    const { className, waysToEarnRow } = this.props;
    const activeActivity = waysToEarnRow.activityModal;

    return (
      <div className={className}>
        <BodyCopy component="div" className="earnExtraPointsTileImage">
          <BodyCopy component="div" className={`imageSizeSingle ${waysToEarnRow.activityCode}`} />
        </BodyCopy>
        <BodyCopy
          fontSize="fs42"
          fontWeight="black"
          fontFamily="primary"
          textAlign="center"
          className="elem-mb-MED"
          data-locator={`earnPointsModal_${activeActivity.activityModalAction}_title`}
        >
          {activeActivity.activityModalTitle}
        </BodyCopy>
        <BodyCopy
          component="div"
          fontSize="fs22"
          fontWeight="extrabold"
          fontFamily="secondary"
          textAlign="center"
          className="elem-mb-MED"
          data-locator={`earnPointsModal_${activeActivity.activityModalAction}_shortTitle`}
        >
          {activeActivity.activityModalShortTitle}
        </BodyCopy>

        <BodyCopy
          component="div"
          fontSize="fs22"
          fontWeight="semibold"
          fontFamily="secondary"
          textAlign="center"
          className="elem-mb-MED"
          data-locator={`earnPointsModal_${activeActivity.activityModalAction}_ShortDesc`}
        >
          <RichText richTextHtml={activeActivity.activityModalLongDescription} />
        </BodyCopy>
        <BodyCopy component="div" textAlign="center" className="buttonWrapper">
          <Anchor
            to={this.ctaTo(activeActivity)}
            asPath={this.ctaPath(activeActivity)}
            anchorVariation="button"
            buttonVariation="fixed-width"
            fullWidth
            fill="BLUE"
            centered
            className="elem-mb-SM"
            dataLocator={`earnPointsModal_${activeActivity.activityModalAction}_activityCta`}
          >
            {activeActivity.activityModalCtaText}
          </Anchor>
        </BodyCopy>
      </div>
    );
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { openState } = this.props;
    return (
      <Modal
        isOpen={openState}
        onRequestClose={this.onRequestClosePopup}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        maxWidth="615px"
        minHeight="600px"
        fixedWidth
        closeIconDataLocator="ExtraPointsDetailModal_crossIcon"
      >
        {this.getModalMarkup()}
      </Modal>
    );
  }
}

export default withStyles(ExtraPointsDetailModal, styles);
export { ExtraPointsDetailModal as ExtraPointsDetailModalVanilla };
