import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ProductDetail from '../views';
import { getProductDetails } from './ProductDetail.actions';
import {
  getNavTree,
  getBreadCrumbs,
  getCurrentProduct,
  getPlpLabels,
} from './ProductDetail.selectors';

class ProductDetailContainer extends React.PureComponent {
  selectedColorProductId;

  constructor(props) {
    super(props);
    const { navigation } = props;
    this.selectedColorProductId = navigation && navigation.getParam('selectedColorProductId');
  }

  componentDidMount() {
    const { getDetails, navigation } = this.props;
    const pid = (navigation && navigation.getParam('pdpUrl')) || '';

    // TODO - fix this to extract the product ID from the page.
    const id = pid && pid.split('-');
    let productId = id && id.length > 1 ? `${id[id.length - 2]}_${id[id.length - 1]}` : pid;
    if (
      (id.indexOf('Gift') > -1 || id.indexOf('gift') > -1) &&
      (id.indexOf('Card') > -1 || id.indexOf('card') > -1)
    ) {
      productId = 'gift';
    }
    getDetails({ productColorId: productId, ignoreCache: true });
  }

  render() {
    const { currentProduct, breadCrumbs, navTree, plpLabels } = this.props;
    return (
      <ProductDetail
        currentProduct={currentProduct}
        breadCrumbs={breadCrumbs}
        navTree={navTree}
        selectedColorProductId={this.selectedColorProductId}
        plpLabels={plpLabels}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    navTree: getNavTree(state),
    currentProduct: getCurrentProduct(state),
    breadCrumbs: getBreadCrumbs(state),
    plpLabels: getPlpLabels(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetails: payload => {
      dispatch(getProductDetails(payload));
    },
  };
}

ProductDetailContainer.propTypes = {
  currentProduct: PropTypes.shape({}),
  getDetails: PropTypes.func.isRequired,
  breadCrumbs: PropTypes.shape({}),
  navigation: PropTypes.shape({}).isRequired,
  navTree: PropTypes.shape({}),
  plpLabels: PropTypes.shape({}),
};

ProductDetailContainer.defaultProps = {
  currentProduct: {},
  breadCrumbs: {},
  navTree: {},
  plpLabels: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailContainer);
export { ProductDetailContainer as ProductDetailContainerVanilla };
