import { connect } from 'react-redux';

import ModuleJ from '../view/ModuleG.native';

export const mapStateToProps = state => {
  const { ProductTabList } = state;

  return {
    productTabList: ProductTabList,
  };
};

export default connect(mapStateToProps)(ModuleJ);
