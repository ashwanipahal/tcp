import { connect } from 'react-redux';

import ModuleQ from '../views';

export const mapStateToProps = state => {
  const { StyliticsProductTabList } = state;

  return {
    styliticsProductTabList: StyliticsProductTabList,
  };
};

export default connect(mapStateToProps)(ModuleQ);
