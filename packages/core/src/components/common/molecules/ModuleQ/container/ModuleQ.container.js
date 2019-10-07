import { connect } from 'react-redux';

import ModuleQ from '../views';
import { getLabel, getStyliticsProductTabListSelector } from './ModuleQ.selector';

export const mapStateToProps = state => {
  return {
    styliticsProductTabList: getStyliticsProductTabListSelector(state),
    shopThisLookLabel: getLabel(state),
  };
};

export default connect(mapStateToProps)(ModuleQ);
