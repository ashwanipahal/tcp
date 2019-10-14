import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../ProductDescription.style';
import { getLocator } from '../../../../../../../utils';

class ProductDetailDescription extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowMore: !!props.isShowMore,
      isExpanded: true,
      isAccordionOpen: false,
    };

    this.handleToggleShowMoreOrLess = this.handleToggleShowMoreOrLess.bind(this);
    this.handleAccordionToggle = this.handleAccordionToggle.bind(this);
  }

  getButton = () => {
    let buttonShowMoreOrLess = null;
    const { pdpLabels } = this.props;
    const { ShowMore, ShowLess } = pdpLabels;
    const { isShowMore } = this.state;
    if (isShowMore) {
      buttonShowMoreOrLess = (
        <div className="button-show-less">
          <button
            className="button-wrapper"
            type="button"
            onClick={this.handleToggleShowMoreOrLess}
            data-locator={getLocator('pdp_read_less')}
          >
            {ShowLess}
          </button>
        </div>
      );
    } else {
      buttonShowMoreOrLess = (
        <div className="button-show-more">
          <button
            className="button-wrapper"
            type="button"
            onClick={this.handleToggleShowMoreOrLess}
            data-locator={getLocator('pdp_read_more')}
          >
            {ShowMore}
          </button>
        </div>
      );
    }
    return buttonShowMoreOrLess;
  };

  getDescAvailable = (shortDescription, longDescription) => {
    return shortDescription || longDescription;
  };

  getAccordionClass = isAccordionOpen => {
    return isAccordionOpen ? 'show-accordion-toggle' : '';
  };

  getClaimMessageClass = descAvail => {
    return !descAvail ? 'common-claim-message' : '';
  };

  handleAccordionToggle() {
    const { isAccordionOpen } = this.state;
    this.setState({ isAccordionOpen: !isAccordionOpen });
  }

  handleToggleShowMoreOrLess() {
    const { isShowMore } = this.state;
    this.setState({
      isShowMore: !isShowMore,
    });
  }

  render() {
    const { longDescription, productId, shortDescription, className, pdpLabels } = this.props;
    const { ProductDescription, ClaimMessage, PartNumber } = pdpLabels;
    const { isExpanded, isAccordionOpen, isShowMore } = this.state;
    const descAvail = this.getDescAvailable(shortDescription, longDescription);
    const getButton = this.getButton();
    const accordionToggleClass = this.getAccordionClass(isAccordionOpen);
    const claimMessageClass = this.getClaimMessageClass(!!descAvail);

    return (
      <div className={`${className} product-description-list`}>
        <BodyCopy
          className={`product-desc-heading ${accordionToggleClass}`}
          fontSize="fs14"
          component="div"
          fontFamily="secondary"
          fontWeight="black"
          onClick={this.handleAccordionToggle}
          data-locator={getLocator('pdp_product_description_label')}
        >
          {ProductDescription}
        </BodyCopy>
        {isExpanded && (
          <div className={isAccordionOpen ? 'show-description-list' : ''}>
            {shortDescription && (
              <BodyCopy
                className="short-description"
                fontSize="fs14"
                fontFamily="secondary"
                data-locator={getLocator('pdp_short_description')}
              >
                {shortDescription}
              </BodyCopy>
            )}
            <div
              className={`introduction-text ${isShowMore ? 'show-more-expanded' : ''}`}
              ref={divElement => {
                this.divElement = divElement;
              }}
            >
              {longDescription && (
                <BodyCopy
                  className="list-content"
                  component="ul"
                  dangerouslySetInnerHTML={{ __html: longDescription }}
                  fontSize="fs14"
                  fontFamily="secondary"
                  data-locator={getLocator('pdp_long_description')}
                />
              )}
              <BodyCopy
                className={`claim-message ${claimMessageClass}`}
                component="aside"
                fontSize="fs14"
                fontFamily="secondary"
                data-locator={getLocator('pdp_claim_message')}
              >
                {ClaimMessage}
              </BodyCopy>
            </div>
            {descAvail && (
              <div className="product-detail-footer">
                {getButton}
                <BodyCopy
                  component="span"
                  className="show-product-id"
                  fontSize="fs10"
                  fontFamily="secondary"
                  data-locator={getLocator('pdp_product_part_number')}
                >
                  {PartNumber}
                  {productId}
                </BodyCopy>
              </div>
            )}
            {!descAvail && (
              <BodyCopy
                className="part-number-section"
                fontSize="fs10"
                fontFamily="secondary"
                data-locator={getLocator('pdp_product_part_number')}
              >
                {PartNumber}
                {productId}
              </BodyCopy>
            )}
          </div>
        )}
      </div>
    );
  }
}

ProductDetailDescription.propTypes = {
  className: PropTypes.string,
  productId: PropTypes.string,
  isShowMore: PropTypes.bool,
  pdpLabels: PropTypes.shape({}),
  longDescription: PropTypes.string,
  shortDescription: PropTypes.string,
};

ProductDetailDescription.defaultProps = {
  className: '',
  isShowMore: '',
  longDescription: '',
  productId: '',
  pdpLabels: {},
  shortDescription: '',
};

export default withStyles(errorBoundary(ProductDetailDescription), style);
export { ProductDetailDescription as ProductDetailDescriptionVanilla };
