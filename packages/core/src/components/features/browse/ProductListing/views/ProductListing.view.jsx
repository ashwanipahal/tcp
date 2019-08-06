import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../../../../common/atoms';
import ProductList from '../molecules/ProductList/views';
import withStyles from '../../../../common/hoc/withStyles';
import ProductListingStyle from '../ProductListing.style';

const ProductListView = ({ className, products }) => {
  return (
    <div className={className}>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }}>
          <div className="bread-crumb">BreadCrumb</div>
        </Col>
      </Row>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 2 }}>
          <div className="sidebar">Sidebar</div>
        </Col>
        <Col colSize={{ small: 6, medium: 8, large: 10 }}>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="promo-area">Promo area</div>
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div className="filter-area">FilterArea</div>
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <ProductList products={products} className={`${className} product-list`} />
          </Col>
        </Col>
      </Row>
    </div>
  );
};

ProductListView.propTypes = {
  className: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({})),
};

ProductListView.defaultProps = {
  className: '',
  products: [],
};

export default withStyles(ProductListView, ProductListingStyle);
