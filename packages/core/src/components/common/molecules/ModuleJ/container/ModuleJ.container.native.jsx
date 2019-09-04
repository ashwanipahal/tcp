import { connect } from 'react-redux';

import ModuleJ from '../views';

export const mapStateToProps = state => {
  const { ProductTabList } = state;

  return {
    productTabList: ProductTabList,
  };
};

export default connect(mapStateToProps)(ModuleJ);
