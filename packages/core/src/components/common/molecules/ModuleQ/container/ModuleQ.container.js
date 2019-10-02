import { connect } from 'react-redux';

import ModuleQ from '../views';
import { getStyliticsProductTabListSelector } from './ModuleQ.selector';

export const mapStateToProps = state => {
  return {
    styliticsProductTabList: getStyliticsProductTabListSelector(state),
  };
};

export default connect(mapStateToProps)(ModuleQ);
