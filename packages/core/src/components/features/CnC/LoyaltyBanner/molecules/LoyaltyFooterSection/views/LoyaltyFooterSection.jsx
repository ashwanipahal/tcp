import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyFooterSection.style';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import ApplyNowModal from '../../../../../../common/molecules/ApplyNowPLCCModal';

const renderApplyNowLink = labels => {
  return (
    <span className="applyNowLink">
      <ApplyNowModal step={2} labelText={labels.applyNow} />
    </span>
  );
};

const renderLearnMoreLink = labels => {
  return <ApplyNowModal labelText={labels.learnMore} />;
};

const onLinkClick = ({ e, componentId, closeAddedToBagModal, openOverlay }) => {
  e.preventDefault();
  openOverlay({
    component: componentId,
    variation: 'primary',
  });
  closeAddedToBagModal();
};

const renderCreateAccountLink = (labels, closeAddedToBagModal, openOverlay) => {
  return (
    <Anchor
      fontSizeVariation="medium"
      anchorVariation="primary"
      noLink
      underline
      handleLinkClick={e => {
        e.preventDefault();
        onLinkClick({ e, componentId: 'createAccount', closeAddedToBagModal, openOverlay });
      }}
    >
      {labels.createMyPlaceRewardsAccount}
    </Anchor>
  );
};

const renderLoginLink = (labels, closeAddedToBagModal, openOverlay) => {
  return (
    <Anchor
      fontSizeVariation="medium"
      anchorVariation="primary"
      noLink
      underline
      handleLinkClick={e => {
        e.preventDefault();
        onLinkClick({ e, componentId: 'login', closeAddedToBagModal, openOverlay });
      }}
    >
      {labels.logIn}
    </Anchor>
  );
};

const createLoginLinks = (labels, closeAddedToBagModal, openOverlay) => {
  return (
    <div className="links-wrapper">
      <span className="links-container">
        <span>{renderCreateAccountLink(labels, closeAddedToBagModal, openOverlay)}</span>
        <span className="elem-pl-XL">
          {renderLoginLink(labels, closeAddedToBagModal, openOverlay)}
        </span>
      </span>
    </div>
  );
};

const applyNowLearnMoreLinks = labels => {
  return (
    <div className="links-wrapper">
      <span className="links-container">
        {renderApplyNowLink(labels)}
        <span className="learnSymbolWrapper elem-pl-XL">
          <BodyCopy
            className="symbolWrapper"
            color="text.primary"
            component="span"
            fontFamily="secondary"
            fontWeight="regular"
            fontSize="fs9"
          >
            {labels.sectionSymbol}
            {labels.asteriskSymbol}
          </BodyCopy>

          {renderLearnMoreLink(labels)}
        </span>
      </span>
    </div>
  );
};

const addedToBagPageLinks = (labels, isGuest, isPlcc, closeAddedToBagModal, openOverlay) => {
  return (
    <>
      {isGuest && createLoginLinks(labels, closeAddedToBagModal, openOverlay)}
      {!isGuest && !isPlcc && applyNowLearnMoreLinks(labels)}
      {!isGuest && isPlcc && <span className="links-wrapper">{renderLearnMoreLink(labels)}</span>}
    </>
  );
};

const renderConfirmationAndBagLinks = (
  labels,
  isConfirmationPage,
  isPlcc,
  isGuest,
  earnedRewardAvailable,
  closeAddedToBagModal,
  openOverlay
) => {
  return (
    <>
      {!isConfirmationPage && (
        <>
          {!isPlcc && applyNowLearnMoreLinks(labels)}
          {isPlcc && <div className="links-wrapper">{renderLearnMoreLink(labels)}</div>}
        </>
      )}
      {isConfirmationPage &&
        isGuest &&
        earnedRewardAvailable &&
        createLoginLinks(labels, closeAddedToBagModal, openOverlay)}
    </>
  );
};

const detailViewFooter = (labels, isGuest, isPlcc, closeAddedToBagModal, openOverlay) => {
  return (
    <>
      {isGuest && (
        <span>
          {renderCreateAccountLink(labels, closeAddedToBagModal, openOverlay)}
          {renderLoginLink(labels, closeAddedToBagModal, openOverlay)}
        </span>
      )}
      {!isGuest && (
        <>
          {!isPlcc && (
            <span>
              {renderApplyNowLink(labels)}
              {renderLearnMoreLink(labels)}
            </span>
          )}
          {isPlcc && renderLearnMoreLink(labels)}
        </>
      )}
    </>
  );
};

const LoyaltyFooterSection = props => {
  const {
    labels,
    className,
    isProductDetailView,
    isGuest,
    isPlcc,
    isReviewPage,
    isConfirmationPage,
    isAddedToBagPage,
    earnedRewardAvailable,
    closeAddedToBagModal,
    openOverlay,
  } = props;
  return (
    <div className={`${className} footerWrapper`}>
      {isProductDetailView &&
        detailViewFooter(labels, isGuest, isPlcc, closeAddedToBagModal, openOverlay)}
      {isAddedToBagPage &&
        addedToBagPageLinks(labels, isGuest, isPlcc, closeAddedToBagModal, openOverlay)}
      {!isProductDetailView && !isAddedToBagPage && (
        <>
          {!isReviewPage &&
            renderConfirmationAndBagLinks(
              labels,
              isConfirmationPage,
              isPlcc,
              isGuest,
              earnedRewardAvailable,
              closeAddedToBagModal,
              openOverlay
            )}
          {isReviewPage && isPlcc && (
            <div className="links-wrapper">{renderLearnMoreLink(labels)}</div>
          )}
        </>
      )}
    </div>
  );
};

LoyaltyFooterSection.propTypes = {
  labels: PropTypes.shape.isRequired,
  className: PropTypes.string,
  isPlcc: PropTypes.bool,
  isGuest: PropTypes.bool,
  isReviewPage: PropTypes.bool,
  isProductDetailView: PropTypes.bool,
  isConfirmationPage: PropTypes.bool,
  earnedRewardAvailable: PropTypes.bool,
  isAddedToBagPage: PropTypes.bool,
  openOverlay: PropTypes.func.isRequired,
  closeAddedToBagModal: PropTypes.func.isRequired,
};

LoyaltyFooterSection.defaultProps = {
  className: '',
  isPlcc: false,
  isGuest: false,
  isReviewPage: false,
  isProductDetailView: false,
  isConfirmationPage: false,
  earnedRewardAvailable: false,
  isAddedToBagPage: false,
};

export default withStyles(LoyaltyFooterSection, Styles);
export { LoyaltyFooterSection as LoyaltyFooterSectionVanilla };
