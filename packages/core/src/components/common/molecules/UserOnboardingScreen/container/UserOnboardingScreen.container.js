import { connect } from 'react-redux';

import UserOnboardingScreen from '../views';
import { getAccountOverviewLabels } from './UserOnboardingScreen.selectors';

export const mapStateToProps = state => {
  return {
    overviewLabels: getAccountOverviewLabels(state),
  };
};

export default connect(mapStateToProps)(UserOnboardingScreen);
