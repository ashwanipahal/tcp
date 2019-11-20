import { connect } from 'react-redux';

import { getUserLoggedInState } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import UserOnboardingScreen from '../views';
import { getAccountOverviewLabels } from './UserOnboardingScreen.selectors';

export const mapStateToProps = state => {
  return {
    overviewLabels: getAccountOverviewLabels(state),
    isUserLoggedIn: getUserLoggedInState(state) || false,
  };
};

export default connect(mapStateToProps)(UserOnboardingScreen);
