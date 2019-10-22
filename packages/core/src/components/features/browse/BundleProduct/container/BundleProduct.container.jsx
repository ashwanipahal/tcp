import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getProductDetails } from './BundleProduct.actions';
import ProductBundle from '../views';

class ProductBundleContainer extends React.PureComponent {
  componentDidMount() {
    const {
      getDetails,
      router: {
        query: { bid },
      },
    } = this.props;

    // TODO - fix this to extract the product ID from the page.
    const id = bid && bid.split('-');
    console.log('id', id);
    const productId = id && id.length > 1 ? id[id.length - 1] : bid;

    getDetails({ productId });
    window.scrollTo(0, 100);
  }

  render() {
    return <ProductBundle />;
  }
}

ProductBundleContainer.pageId = 'b';

function mapStateToProps(state) {
  return {
    state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: payload => {
      dispatch(getProductDetails(payload));
    },
  };
}

ProductBundleContainer.propTypes = {
  getDetails: PropTypes.func.isRequired,
  router: PropTypes.shape({
    query: PropTypes.string,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductBundleContainer);
