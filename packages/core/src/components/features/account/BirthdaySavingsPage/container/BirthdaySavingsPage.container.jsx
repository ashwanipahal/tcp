import { connect } from 'react-redux';
import { getLabels } from './BirthdaySavingsPage.selectors';
import BirthdaySavingsComponent from '../views';

export const mapStateToProps = state => {
  return {
    labels: getLabels(state),
  };
};

export default connect(mapStateToProps)(BirthdaySavingsComponent);
