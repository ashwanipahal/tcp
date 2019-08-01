import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import ProductListingView from '../views';
// import { getPlpProducts, getGiftCardProducts } from './ProductListingPage.actions';
// import { ProductListView } from '../views/ProductListingPage.view';
// import getExpensivePlpProducts, { giftCardProducts } from './ProductListingPage.selectors';
/* vimport {
  addToCartEcom,
  addItemToCartBopis,
} from '../../../CnC/AddedToBag/container/AddedToBag.actions'; */

class ProductListingPageContainer extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <div>BreadCrumb</div>
          </Col>
        </Row>
        <Row>
          <Col colSize={{ small: 6, medium: 8, large: 2 }}>
            <div>Sidebar</div>
          </Col>
          <Col colSize={{ small: 6, medium: 8, large: 10 }}>
            <Col colSize={{ small: 6, medium: 8, large: 10 }}>
              <div>Promo area</div>
            </Col>
            <Col colSize={{ small: 6, medium: 8, large: 10 }}>
              <div>FilterArea</div>
            </Col>
            <Col colSize={{ small: 6, medium: 8, large: 10 }}>
              <ProductListingView />
            </Col>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
    // products: getExpensivePlpProducts(state),
    // giftCardProducts: giftCardProducts(state),
  };
}

function mapDispatchToProps() {
  return {
    getProducts: () => {},
    addToCartEcom: () => {},
    addItemToCartBopis: () => {},
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingPageContainer);
