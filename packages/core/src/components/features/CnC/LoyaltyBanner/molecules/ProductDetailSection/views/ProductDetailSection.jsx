import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/ProductDetailSection.style';
import { Anchor } from '../../../../../../common/atoms';

const renderApplyNowLink = labels => {
  return (
    <Anchor
      className="applyNow"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.applyNow}
      underline
    />
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
      className="createAccount"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.createAccount}
      underline
    />
  );
};

const renderLogInLink = labels => {
  return (
    <Anchor
      className="login"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.logIn}
      underline
    />
  );
};

const ProductDetailSection = props => {
  const { className, isProductDetailView, isGuest, isPlcc, labels } = props;
  return (
    <div className={`${className} productDetailWrapper`}>
      {isProductDetailView && (
        <div>
          {isGuest && (
            <span>
              {renderCreateAccountLink(labels)}
              {renderLogInLink(labels)}
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
              {isPlcc && <span>{renderLearnMoreLink(labels)}</span>}
            </>
          )}
        </div>
      )}
    </div>
  );
};

ProductDetailSection.propTypes = {
  // estimatedSubtotal: PropTypes.number,
  // currentSubtotal: PropTypes.number,
  // showSubtotal: PropTypes.bool,
  labels: PropTypes.shape.isRequired,
  className: PropTypes.string,
  // headingLabel: PropTypes.string,
  // subHeadingLabel: PropTypes.string,
  isPlcc: PropTypes.bool,
  isGuest: PropTypes.bool,
  // isReviewPage: PropTypes.bool,
  // pointsDescription: PropTypes.string,
  // earnedReward: PropTypes.number,
  // remainingPlcc: PropTypes.number,
  // getCurrencySymbol: PropTypes.string,
  isProductDetailView: PropTypes.bool,
};

ProductDetailSection.defaultProps = {
  className: '',
  // estimatedSubtotal: 0,
  // currentSubtotal: 0,
  // showSubtotal: false,
  // headingLabel: '',
  // subHeadingLabel: '',
  isPlcc: false,
  isGuest: false,
  // isReviewPage: false,
  // pointsDescription: '',
  // earnedReward: 0,
  // remainingPlcc: 0,
  // getCurrencySymbol: '',
  isProductDetailView: '',
};

export default withStyles(ProductDetailSection, Styles);
export { ProductDetailSection as ProductDetailSectionVanilla };
