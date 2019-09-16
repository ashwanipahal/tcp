import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import SearchListingStyle from '../SearchDetail.style';
import config from '../searchDetail.constants';
import ProductsGrid from '../../ProductListing/molecules/ProductsGrid/views';
import { Row, Col } from '../../../../common/atoms';
import LoadedProductsCount from '../../ProductListing/molecules/LoadedProductsCount/views';
import Grid from '../../../../common/molecules/Grid';
import errorBoundary from '../../../../common/hoc/withErrorBoundary';

class SearchListingView extends React.PureComponent {
  render() {
    const {
      className,
      searchedResult,
      products,
      productsBlock,
      labels,
      ...otherProps
    } = this.props;
    const { SEARCHED_FOR, FILTERS, SORT_BY } = config;
    const productsCount = 4;
    return (
      <Grid className={className}>
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
            <LoadedProductsCount totalProductsCount={productsCount} />
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <ProductsGrid productsBlock={productsBlock} labels={labels} {...otherProps} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

SearchListingView.propTypes = {
  className: PropTypes.string,
  searchedResult: PropTypes.arrayOf(PropTypes.shape({})),
  productsBlock: PropTypes.arrayOf(PropTypes.shape({})),
  products: PropTypes.arrayOf(PropTypes.shape({})),
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

SearchListingView.defaultProps = {
  className: '',
  searchedResult: {},
  products: [],
  productsBlock: [],
  labels: {},
};

export default withStyles(errorBoundary(SearchListingView), SearchListingStyle);
export { SearchListingView as SearchListingViewVanilla };
