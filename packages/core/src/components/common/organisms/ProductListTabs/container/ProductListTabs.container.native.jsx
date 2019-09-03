import { connect } from 'react-redux';

import { productListTabsDataReq } from './ProductListTabs.actions';
import ProductListTabsView from '../views';

export const mapStateToProps = state => {
  const { ProductListTabs } = state;

  return {
    productListTabs: ProductListTabs,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getProductListTabsData: payload => {
      dispatch(productListTabsDataReq(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListTabsView);
