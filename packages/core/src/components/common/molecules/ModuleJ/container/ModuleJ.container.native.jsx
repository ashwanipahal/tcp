import { connect } from 'react-redux';

import ModuleJ from '../views';

export const mapStateToProps = state => {
  const { ProductListTabs } = state;

  return {
    productListTabs: ProductListTabs,
  };
};

export default connect(mapStateToProps)(ModuleJ);
