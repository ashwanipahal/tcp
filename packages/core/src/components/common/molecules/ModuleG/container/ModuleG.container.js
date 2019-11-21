import { connect } from 'react-redux';
import { openQuickViewWithValues } from '../../../organisms/QuickViewModal/container/QuickViewModal.actions';
import { getLabel } from './ModuleG.selector';

import ModuleG from '../views';

export const mapStateToProps = state => {
  const { ProductTabList } = state;
  return {
    productTabList: ProductTabList,
    addtoBagLabel: getLabel(state),
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
