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

const LoyaltyFooterSection = props => {
  const { className, isProductDetailView, isGuest, isPlcc, isReviewPage, labels } = props;
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
        <div className="links-wrapper">
          {!isReviewPage && (
            <>
              {!isPlcc && (
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
              )}
              {isPlcc && <span>{renderLearnMoreLink(labels)}</span>}
            </>
          )}
          {isReviewPage && isPlcc && <span>{renderLearnMoreLink(labels)}</span>}
        </div>
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
};

LoyaltyFooterSection.defaultProps = {
  className: '',
  isPlcc: false,
  isGuest: false,
  isReviewPage: false,
  isProductDetailView: '',
};

export default withStyles(LoyaltyFooterSection, Styles);
export { LoyaltyFooterSection as LoyaltyFooterSectionVanilla };
