import { connect } from 'react-redux';

import ModuleG from '../views';

export const mapStateToProps = state => {
  const { ProductTabList } = state;

  return {
    productTabList: ProductTabList,
  };
};

export default connect(mapStateToProps)(ModuleG);
