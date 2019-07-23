/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { getPlpProducts } from './ProductListingPage.actions';
import { ProductListView } from '../views/ProductListingPage.view';
import getExpensivePlpProducts from './ProductListingPage.selectors';
import { addToCartEcom } from '../../../CnC/AddedToBag/container/AddedToBag.actions';

class ProductListingPageContainer extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { addToCartEcom } = this.props;
    return <ProductListView data={this.props.products} addToCartEcom={addToCartEcom} />;
  }
}

function mapStateToProps(state) {
  return {
    products: getExpensivePlpProducts(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => {
      dispatch(getPlpProducts());
    },
    addToCartEcom: payload => {
      dispatch(addToCartEcom(payload));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListingPageContainer);
