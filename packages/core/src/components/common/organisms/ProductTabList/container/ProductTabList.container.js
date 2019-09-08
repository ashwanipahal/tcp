import { connect } from 'react-redux';

import { productTabListDataReq } from './ProductTabList.actions';
import ProductTabListView from '../views';

export const mapStateToProps = state => {
  const { ProductTabList } = state;

  return {
    productTabList: ProductTabList,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getProductTabListData: payload => {
      dispatch(productTabListDataReq(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTabListView);
