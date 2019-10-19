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

const confirmationPageLinks = (labels, isGuest, earnedReward) => {
  return (
    <>
      {isGuest && earnedReward && (
        <div className="links-wrapper">
          <span className="links-container">
            <span>{renderCreateAccountLink(labels)}</span>
            <span className="elem-pl-XL">{renderLoginLink(labels)}</span>
          </span>
        </div>
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
      {!isProductDetailView && (
        <>
          {!isReviewPage && (
            <>
              {!isConfirmationPage && (
                <>
                  {!isPlcc && (
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
                  )}
                  {isPlcc && <div className="links-wrapper">{renderLearnMoreLink(labels)}</div>}
                </>
              )}
              {isConfirmationPage && <>{confirmationPageLinks(labels, isGuest, earnedReward)}</>}
            </>
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
};

LoyaltyFooterSection.defaultProps = {
  className: '',
  isPlcc: false,
  isGuest: false,
  isReviewPage: false,
  isProductDetailView: false,
  isConfirmationPage: false,
  earnedReward: false,
};

export default withStyles(LoyaltyFooterSection, Styles);
export { LoyaltyFooterSection as LoyaltyFooterSectionVanilla };
