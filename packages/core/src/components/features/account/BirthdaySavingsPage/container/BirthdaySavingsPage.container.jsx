import { connect } from 'react-redux';
import { getProfileLabels } from './BirthdaySavingsPage.selectors';
import BirthdaySavingsComponent from '../views';

export const mapStateToProps = state => {
  return {
    labels: getProfileLabels(state),
  };
};

export default connect(mapStateToProps)(BirthdaySavingsComponent);
