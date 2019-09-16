import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import SearchListingStyle from '../SearchDetail.style';
import config from '../searchDetail.constants';
import ProductsGrid from '../../ProductListing/molecules/ProductsGrid/views';
import { Row, Col } from '../../../../common/atoms';
import LoadedProductsCount from '../../ProductListing/molecules/LoadedProductsCount/views';
import errorBoundary from '../../../../common/hoc/withErrorBoundary';

class SearchListingView extends React.PureComponent {
  render() {
    const {
      className,
      products,
      productsBlock,
      labels,
      totalProductsCount,
      ...otherProps
    } = this.props;
    const { SEARCHED_FOR, FILTERS, SORT_BY } = config;
    return (
      <div className={className}>
        <Row className="placeholder">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="promo-area-1">{SEARCHED_FOR}</div>
          </Col>
        </Row>
        <Row className="placeholder">
          <Col colSize={{ small: 3, medium: 4, large: 6 }}>
            <div className="filter">{FILTERS}</div>
          </Col>
          <Col colSize={{ small: 3, medium: 4, large: 6 }}>
            <div className="sort-by">{SORT_BY}</div>
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <LoadedProductsCount totalProductsCount={totalProductsCount} />
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <ProductsGrid productsBlock={productsBlock} products={products} {...otherProps} />
          </Col>
        </Row>
      </div>
    );
  }
}

SearchListingView.propTypes = {
  className: PropTypes.string,
  productsBlock: PropTypes.arrayOf(PropTypes.shape({})),
  products: PropTypes.arrayOf(PropTypes.shape({})),
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  totalProductsCount: PropTypes.number,
};

SearchListingView.defaultProps = {
  className: '',
  products: [],
  productsBlock: [],
  labels: {},
  totalProductsCount: 0,
};

export default withStyles(errorBoundary(SearchListingView), SearchListingStyle);
export { SearchListingView as SearchListingViewVanilla };
