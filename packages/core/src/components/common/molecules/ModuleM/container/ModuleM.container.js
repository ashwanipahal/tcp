import { connect } from 'react-redux';

import ModuleM from '../views';

export const mapStateToProps = state => {
  const { ProductTabList } = state;

  return {
    productTabList: ProductTabList,
  };
};

export default connect(mapStateToProps)(ModuleM);
