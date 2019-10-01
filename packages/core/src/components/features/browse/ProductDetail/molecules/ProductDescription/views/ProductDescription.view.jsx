import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../ProductDescription.style';

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
    const { isShowMore } = this.state;
    if (isShowMore) {
      buttonShowMoreOrLess = (
        <div className="button-show-less">
          <button
            className="button-wrapper"
            type="button"
            onClick={this.handleToggleShowMoreOrLess}
          >
            Show Less
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
          >
            Show More
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
    const { longDescription, productId, shortDescription, className } = this.props;
    const { isExpanded, isAccordionOpen, isShowMore } = this.state;
    const descAvail = this.getDescAvailable(shortDescription, longDescription);
    const getButton = this.getButton();
    const accordionToggleClass = this.getAccordionClass(isAccordionOpen);

    return (
      <div className={`${className} product-description-list`}>
        <BodyCopy
          className={`product-desc-heading ${accordionToggleClass}`}
          fontSize="fs14"
          component="div"
          fontFamily="secondary"
          fontWeight="black"
          onClick={this.handleAccordionToggle}
        >
          Product Description
        </BodyCopy>
        {isExpanded && (
          <div className={isAccordionOpen ? 'show-description-list' : ''}>
            {shortDescription && (
              <BodyCopy className="short-description" fontSize="fs14" fontFamily="secondary">
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
                />
              )}
              <BodyCopy
                className="claim-message"
                component="aside"
                fontSize="fs14"
                fontFamily="secondary"
              >
                Big Fashion, Little Prices
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
                >
                  Item #:
                  {productId}
                </BodyCopy>
              </div>
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
  longDescription: PropTypes.string,
  shortDescription: PropTypes.string,
};

ProductDetailDescription.defaultProps = {
  className: '',
  isShowMore: '',
  longDescription: '',
  productId: '',
  shortDescription: '',
};

export default withStyles(errorBoundary(ProductDetailDescription), style);
export { ProductDetailDescription as ProductDetailDescriptionVanilla };
