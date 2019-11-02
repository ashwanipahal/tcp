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

const renderCreateAccountLink = (labels, openLoginModal) => {
  return (
    <Anchor
      className="learnMore"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.createMyPlaceRewardsAccount}
      underline
      onClick={e => {
        e.preventDefault();
        openLoginModal('createAccount');
      }}
    />
  );
};

const renderLoginLink = (labels, openLoginModal) => {
  return (
    <Anchor
      className="learnMore"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.logIn}
      underline
      onClick={e => {
        e.preventDefault();
        openLoginModal();
      }}
    />
  );
};

const createLoginLinks = (labels, openLoginModal) => {
  return (
    <div className="links-wrapper">
      <span className="links-container">
        <span>{renderCreateAccountLink(labels, openLoginModal)}</span>
        <span className="elem-pl-XL">{renderLoginLink(labels, openLoginModal)}</span>
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

const addedToBagPageLinks = (labels, isGuest, isPlcc, openLoginModal) => {
  return (
    <>
      {isGuest && createLoginLinks(labels, openLoginModal)}
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
  openLoginModal
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
        createLoginLinks(labels, openLoginModal)}
    </>
  );
};

const detailViewFooter = (labels, isGuest, isPlcc, openLoginModal) => {
  return (
    <>
      {isGuest && (
        <span>
          {renderCreateAccountLink(labels, openLoginModal)}
          {renderLoginLink(labels, openLoginModal)}
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
    openLoginModal,
  } = props;
  return (
    <div className={`${className} footerWrapper`}>
      {isProductDetailView && detailViewFooter(labels, isGuest, isPlcc, openLoginModal)}
      {isAddedToBagPage && addedToBagPageLinks(labels, isGuest, isPlcc, openLoginModal)}
      {!isProductDetailView && !isAddedToBagPage && (
        <>
          {!isReviewPage &&
            renderConfirmationAndBagLinks(
              labels,
              isConfirmationPage,
              isPlcc,
              isGuest,
              earnedRewardAvailable,
              openLoginModal
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
  openLoginModal: PropTypes.string,
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
  openLoginModal: '',
};

export default withStyles(LoyaltyFooterSection, Styles);
export { LoyaltyFooterSection as LoyaltyFooterSectionVanilla };
