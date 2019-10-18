import { connect } from 'react-redux';
import { openQuickViewWithValues } from '../../../organisms/QuickViewModal/container/QuickViewModal.actions';

import ModuleG from '../views';

export const mapStateToProps = state => {
  const { ProductTabList } = state;

  return {
    productTabList: ProductTabList,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onQuickViewOpenClick: payload => {
      dispatch(openQuickViewWithValues(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModuleG);
