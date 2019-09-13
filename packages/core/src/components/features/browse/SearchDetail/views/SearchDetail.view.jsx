import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import SearchListingStyle from '../SearchDetail.style';
import config from '../searchDetail.constants';
import ProductsGrid from '../../ProductListing/molecules/ProductsGrid/views';
import searchedNewResult from '../searchedResults';
import { Row, Col } from '../../../../common/atoms';

class SearchListingView extends React.PureComponent {
  searchProductsList = searchedResult => {
    return (
      searchedResult.length &&
      searchedResult.map(item => {
        return (
          <div className="product-tile">
            <div>
              <img src={item.imageUrl} alt={item.product_name} />
              {item.min_list_price && <p>{`$ ${item.min_list_price}`}</p>}
              <p>{item.id}</p>
              <p>{item.color}</p>
              <p>{item.product_name}</p>
            </div>
          </div>
        );
      })
    );
  };

  render() {
    const {
      className,
      searchedResult,
      products,
      productsBlock,
      labels,
      ...otherProps
    } = this.props;
    const { SEARCHED_FOR, FILTERS, SORT_BY, SHOW_X_RESULTS, SLP } = config;
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
        <Row className="placeholder">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="showing-results">{SHOW_X_RESULTS}</div>
          </Col>
        </Row>
        <Row className="placeholder">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="search-list-page">{SLP}</div>
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <ProductsGrid
              products={searchedNewResult.data[0]}
              productsBlock={searchedNewResult.data}
              labels={labels}
              {...otherProps}
            />
          </Col>
        </Row>
      </div>
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

export default withStyles(SearchListingView, SearchListingStyle);
