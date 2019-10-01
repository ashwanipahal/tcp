/*  eslint-disable */
import React from 'react';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../ProductDescription.style';
import cssClassName from '../../../../../../../utils/cssClassName';

class ProductDetailDescription extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowMore: !!props.isShowMore,
      isExpanded: true,
    };

    this.handleToggleShowMoreOrLess = this.handleToggleShowMoreOrLess.bind(this);
    this.titleClick = this.titleClick.bind(this);
  }

  componentDidMount() {
    if (this.divElement && false) {
      let height = this.divElement.clientHeight;
      let displayShowMoreOrLess = height >= 42;
      this.setState({ displayShowMoreOrLess });
    } else {
      this.setState({ displayShowMoreOrLess: true });
    }
  }

  handleToggleShowMoreOrLess() {
    this.setState({
      isShowMore: !this.state.isShowMore,
    });
  }

  titleClick() {
    const { titleClickable } = this.props;
    if (titleClickable) {
      const { isExpanded } = this.state;
      this.setState({
        isExpanded: !isExpanded,
      });
    }
  }

  render() {
    const { longDescription, productId, shortDescription, className, titleClickable } = this.props;
    console.info('Props', this.props);
    const { isExpanded, displayShowMoreOrLess, isShowMore } = this.state;
    console.info('State', this.state);
    const descAvail = shortDescription || longDescription;
    let buttonShowMoreOrLess = null;
    let maxHeightOfContainer = null;
    if (isShowMore) {
      maxHeightOfContainer = {
        maxHeight: 'auto',
        overflow: 'visible',
      };
      buttonShowMoreOrLess = (
        <div className="button-show-less">
          <button type="button" onClick={this.handleToggleShowMoreOrLess}>
            Show Less
          </button>
        </div>
      );
    } else {
      const lineHeight = false ? '52px' : '85px';
      maxHeightOfContainer = {
        maxHeight: false ? lineHeight : '40px',
        overflow: 'hidden',
      };
      buttonShowMoreOrLess = (
        <div className="button-show-more">
          <button type="button" onClick={this.handleToggleShowMoreOrLess}>
            Show More
          </button>
        </div>
      );
    }
    const titleClassName = cssClassName(
      'title-product-description ',
      { 'have-arrow ': titleClickable },
      { 'active ': isExpanded }
    );

    return (
      <BodyCopy className={`${className} product-description-list`}>
                
        <h4 className={'titleClassName'} onClick={this.titleClick}>
          Product Description
        </h4>
                {/* <h4 className={"titleClassName"} >Product Description</h4> */}
                
        {isExpanded && (
          <div>
                      {shortDescription && <p className="short-description">{shortDescription}</p>}
                      {/* eslint-disable-next-line */}
                      
            {(!shortDescription ? true : isShowMore) && (
              <div
                ref={divElement => {
                  this.divElement = divElement;
                }}
                style={true ? maxHeightOfContainer : null}
                className={!shortDescription ? 'introduction-text extra-gap' : 'introduction-text'}
              >
                            
                {shortDescription && <p className="short-description">{shortDescription}</p>}
                            
                {longDescription && (
                  <ul
                    className="list-content"
                    dangerouslySetInnerHTML={{ __html: longDescription }}
                  />
                )}
                            {longDescription && <br />}
                            <aside className="claim-message">Big Fashion, Little Prices</aside>
                            {<strong className="product-id">Item #: {productId}</strong>}
                          
              </div>
            )}
                      {descAvail && displayShowMoreOrLess && buttonShowMoreOrLess}
                      
          </div>
        )}
              
      </BodyCopy>
    );
  }
}

ProductDetailDescription.propTypes = {
  className: PropTypes.string,
  productId: PropTypes.string,
  longDescription: PropTypes.string,
  shortDescription: PropTypes.string,
};

ProductDetailDescription.defaultProps = {
  className: '',
  longDescription: '',
  productId: '',
  shortDescription: '',
};

export default withStyles(errorBoundary(ProductDetailDescription), style);
export { ProductDetailDescription as ProductDetailDescriptionVanilla };
