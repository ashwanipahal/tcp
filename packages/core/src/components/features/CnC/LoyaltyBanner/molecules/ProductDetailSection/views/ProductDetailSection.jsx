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
  labels: PropTypes.shape.isRequired,
  className: PropTypes.string,
  isPlcc: PropTypes.bool,
  isGuest: PropTypes.bool,
  isProductDetailView: PropTypes.bool,
};

ProductDetailSection.defaultProps = {
  className: '',
  isPlcc: false,
  isGuest: false,
  isProductDetailView: '',
};

export default withStyles(ProductDetailSection, Styles);
export { ProductDetailSection as ProductDetailSectionVanilla };
