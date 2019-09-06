import { connect } from 'react-redux';
import { getProfileLabels } from './BirthdaySavingsPage.selectors';
import BirthdaySavingsComponent from '../views';
import {
  getStatus,
  getMessageKey,
} from '../../common/organism/BirthdaySavingsList/container/BirthdaySavingsList.selectors';

export const mapStateToProps = state => {
  return {
    labels: getProfileLabels(state),
    status: getStatus(state),
    messageKey: getMessageKey(state),
  };
};

export default connect(mapStateToProps)(BirthdaySavingsComponent);
