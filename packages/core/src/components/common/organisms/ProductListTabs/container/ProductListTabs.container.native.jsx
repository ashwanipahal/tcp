import { connect } from 'react-redux';

import { productListTabsDataReq } from './ProductListTabs.actions';
import ProductListTabs from '../views';

export const mapStateToProps = () => {
  return {};
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
)(ProductListTabs);
