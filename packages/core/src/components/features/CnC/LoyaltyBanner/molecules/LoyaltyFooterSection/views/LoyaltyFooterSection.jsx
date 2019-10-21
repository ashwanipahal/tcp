import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyFooterSection.style';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import ProductDetailSection from '../../ProductDetailSection';
import ApplyNowModal from '../../../../../../common/molecules/ApplyNowPLCCModal';

const renderApplyNowLink = () => {
  return (
    <span className="applyNowLink">
      <ApplyNowModal />
    </span>
  );
};

const renderLearnMoreLink = labels => {
  return (
    <Anchor
      className="learnMore"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.learnMore}
      underline
    />
  );
};

const renderCreateAccountLink = labels => {
  return (
    <Anchor
      className="learnMore"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.createMyPlaceRewardsAccount}
      underline
    />
  );
};

const renderLoginLink = labels => {
  return (
    <Anchor
      className="learnMore"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.logIn}
      underline
    />
  );
};

const createLoginLinks = labels => {
  return (
    // <>
    //   {isGuest && earnedReward && (
    <div className="links-wrapper">
      <span className="links-container">
        <span>{renderCreateAccountLink(labels)}</span>
        <span className="elem-pl-XL">{renderLoginLink(labels)}</span>
      </span>
    </div>
    //   )}
    // </>
  );
};

const applyLearnLinks = labels => {
  return (
    <div className="links-wrapper">
      <span className="links-container">
        {renderApplyNowLink()}
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

const addedToBagPageLinks = (labels, isGuest, isPlcc, earnedReward) => {
  return (
    <>
      {isGuest && <>{createLoginLinks(labels)}</>}
      {!isGuest && !isPlcc && (
        <>
          {!earnedReward && applyLearnLinks(labels)}
          {earnedReward && <div className="links-wrapper">{renderLearnMoreLink(labels)}</div>}
        </>
      )}
      {!isGuest && isPlcc && <div className="links-wrapper">{renderLearnMoreLink(labels)}</div>}
    </>
  );
};

const renderConfirmationAndBagLinks = (
  labels,
  isConfirmationPage,
  isPlcc,
  isGuest,
  earnedReward
) => {
  return (
    <>
      {!isConfirmationPage && (
        <>
          {!isPlcc && applyLearnLinks(labels)}
          {isPlcc && <div className="links-wrapper">{renderLearnMoreLink(labels)}</div>}
        </>
      )}
      {isConfirmationPage && isGuest && earnedReward && createLoginLinks(labels)}
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
    earnedReward,
  } = props;
  return (
    <div className={`${className} footerWrapper`}>
      {isProductDetailView && (
        <ProductDetailSection
          className={className}
          labels={labels}
          isPlcc={isPlcc}
          isProductDetailView={isProductDetailView}
          isGuest={isGuest}
        />
      )}
      {isAddedToBagPage && addedToBagPageLinks(labels, isGuest, isPlcc, earnedReward)}
      {!isProductDetailView && !isAddedToBagPage && (
        <>
          {!isReviewPage &&
            renderConfirmationAndBagLinks(
              labels,
              isConfirmationPage,
              isPlcc,
              isGuest,
              earnedReward
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
  earnedReward: PropTypes.bool,
  isAddedToBagPage: PropTypes.bool,
};

LoyaltyFooterSection.defaultProps = {
  className: '',
  isPlcc: false,
  isGuest: false,
  isReviewPage: false,
  isProductDetailView: false,
  isConfirmationPage: false,
  earnedReward: false,
  isAddedToBagPage: false,
};

export default withStyles(LoyaltyFooterSection, Styles);
export { LoyaltyFooterSection as LoyaltyFooterSectionVanilla };
