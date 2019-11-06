import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyFooterSection.style';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';

const openModalApplyNowModal = (openApplyNowModal, step = 1) => {
  if (openApplyNowModal) {
    if (step === 1) {
      return openApplyNowModal({ isModalOpen: true });
    }
    return openApplyNowModal({ isModalOpen: false, isPLCCModalOpen: true });
  }
  return null;
};

const renderApplyNowLink = (labels, openApplyNowModal) => {
  return (
    <span className="applyNowLink">
      <Anchor
        fontSizeVariation="medium"
        anchorVariation="primary"
        noLink
        handleLinkClick={e => {
          e.preventDefault();
          openModalApplyNowModal(openApplyNowModal, 2);
        }}
        underline
      >
        {labels.applyNow}
      </Anchor>
    </span>
  );
};

const renderLearnMoreLink = (labels, openApplyNowModal) => {
  return (
    <Anchor
      fontSizeVariation="medium"
      anchorVariation="primary"
      noLink
      underline
      handleLinkClick={e => {
        e.preventDefault();
        openModalApplyNowModal(openApplyNowModal);
      }}
    >
      {labels.learnMore}
    </Anchor>
  );
};

const onLinkClick = ({ e, componentId, closeAddedToBagModal, openOverlay }) => {
  e.preventDefault();
  closeAddedToBagModal();
  openOverlay({
    component: componentId,
    variation: 'primary',
  });
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
        <span className="createLoginSpaceBetween">
          {renderLoginLink(labels, closeAddedToBagModal, openOverlay)}
        </span>
      </span>
    </div>
  );
};

const applyNowLearnMoreLinks = (labels, openApplyNowModal) => {
  return (
    <div className="links-wrapper">
      <span className="links-container">
        {renderApplyNowLink(labels, openApplyNowModal)}
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

          {renderLearnMoreLink(labels, openApplyNowModal)}
        </span>
      </span>
    </div>
  );
};

const addedToBagPageLinks = (
  labels,
  isGuest,
  isPlcc,
  closeAddedToBagModal,
  openOverlay,
  openApplyNowModal
) => {
  return (
    <>
      {isGuest && createLoginLinks(labels, closeAddedToBagModal, openOverlay)}
      {!isGuest && !isPlcc && applyNowLearnMoreLinks(labels, openApplyNowModal)}
      {!isGuest && isPlcc && <span className="links-wrapper">{renderLearnMoreLink(labels)}</span>}
    </>
  );
};

const renderConfirmationAndBagLinks = ({
  labels,
  isConfirmationPage,
  isPlcc,
  isGuest,
  earnedRewardAvailable,
  closeAddedToBagModal,
  openOverlay,
  openApplyNowModal,
}) => {
  return (
    <>
      {!isConfirmationPage && (
        <>
          {!isPlcc && applyNowLearnMoreLinks(labels, openApplyNowModal)}
          {isPlcc && (
            <div className="links-wrapper">{renderLearnMoreLink(labels, openApplyNowModal)}</div>
          )}
        </>
      )}
      {isConfirmationPage &&
        isGuest &&
        earnedRewardAvailable &&
        createLoginLinks(labels, closeAddedToBagModal, openOverlay)}
    </>
  );
};

const detailViewFooter = (
  labels,
  isGuest,
  isPlcc,
  closeAddedToBagModal,
  openOverlay,
  openApplyNowModal
) => {
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
              {renderApplyNowLink(labels, openApplyNowModal)}
              {renderLearnMoreLink(labels, openApplyNowModal)}
            </span>
          )}
          {isPlcc && renderLearnMoreLink(labels, openApplyNowModal)}
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
    openApplyNowModal,
  } = props;
  return (
    <div className={`${className} footerWrapper`}>
      {isProductDetailView &&
        detailViewFooter(
          labels,
          isGuest,
          isPlcc,
          closeAddedToBagModal,
          openOverlay,
          openApplyNowModal
        )}
      {isAddedToBagPage &&
        addedToBagPageLinks(
          labels,
          isGuest,
          isPlcc,
          closeAddedToBagModal,
          openOverlay,
          openApplyNowModal
        )}
      {!isProductDetailView && !isAddedToBagPage && (
        <>
          {!isReviewPage &&
            renderConfirmationAndBagLinks({
              labels,
              isConfirmationPage,
              isPlcc,
              isGuest,
              earnedRewardAvailable,
              closeAddedToBagModal,
              openOverlay,
              openApplyNowModal,
            })}
          {isReviewPage && isPlcc && (
            <div className="links-wrapper">{renderLearnMoreLink(labels, openApplyNowModal)}</div>
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
  openApplyNowModal: PropTypes.func.isRequired,
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

renderConfirmationAndBagLinks.propTypes = {
  labels: PropTypes.shape.isRequired,
  isPlcc: PropTypes.bool,
  isGuest: PropTypes.bool,
  isConfirmationPage: PropTypes.bool,
  earnedRewardAvailable: PropTypes.bool,
  openOverlay: PropTypes.func.isRequired,
  openApplyNowModal: PropTypes.func.isRequired,
  closeAddedToBagModal: PropTypes.func.isRequired,
};

renderConfirmationAndBagLinks.defaultProps = {
  isPlcc: false,
  isGuest: false,
  isConfirmationPage: false,
  earnedRewardAvailable: false,
};

export default withStyles(LoyaltyFooterSection, Styles);
export { LoyaltyFooterSection as LoyaltyFooterSectionVanilla };
