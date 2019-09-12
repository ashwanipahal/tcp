import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../common/hoc/withStyles';
import SearchListingStyle from '../SearchDetail.style';
import { Row, Col } from '../../../../common/atoms';

let productDetails = [];
productDetails = [
  {
    id: 70,
    color: 'red',
    size: 'M',
    product: 'polo',
  },
  {
    id: 10,
    color: 'blue',
    size: 'M',
    product: 'jeans',
  },
  {
    id: 30,
    color: 'green',
    size: 'M',
    product: 'top',
  },
  {
    id: 40,
    color: 'pink',
    size: 'M',
    product: 'jeggings',
  },
  {
    id: 60,
    color: 'red',
    size: 'S',
    product: 'jeans',
  },
  {
    id: 20,
    color: 'tan',
    size: 'M',
    product: 'top',
  },
  {
    id: 40,
    color: 'orange',
    size: 'L',
    product: 'polo',
  },
  {
    id: 30,
    color: 'red',
    size: 'L',
    product: 'jeggings',
  },
];

const searchProductsList = productDetails.map(item => {
  return (
    <div className="product-tile">
      <div>
        <p>{item.product}</p>
        <p>{item.id}</p>
        <p>{item.color}</p>
        <p>{item.size}</p>
      </div>
    </div>
  );
});

const SearchListingView = ({ className }) => {
  return (
    <div className={className}>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="promo-area-1">You Searched For</div>
          {/* {breadCrumbs && <FixedBreadCrumbs crumbs={breadCrumbs} separationChar=">" />} */}
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 3, medium: 4, large: 6 }}>
          <div className="filter">FILTERS</div>
        </Col>
        <Col colSize={{ small: 3, medium: 4, large: 6 }}>
          <div className="sort-by">SORT BY</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="showing-results">Showing X Results</div>
        </Col>
      </Row>
      <Row className="placeholder">
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="search-list-page">Search Listing Page</div>
        </Col>
      </Row>
      <div className="product-tile-wrapper">{searchProductsList}</div>
    </div>
  );
};

SearchListingView.propTypes = {
  className: PropTypes.string,
};

SearchListingView.defaultProps = {
  className: '',
};

export default withStyles(SearchListingView, SearchListingStyle);
