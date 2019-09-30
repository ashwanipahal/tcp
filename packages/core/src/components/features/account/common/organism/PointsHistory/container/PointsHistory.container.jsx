import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PointsHistory from '../views';
import PointsHistoryList from '../views/PointsHistoryList.view';
import { getPointHistoryState, getCommonLabels } from './PointsHistory.selectors';
import { getPointsHistoryList } from './PointsHistory.actions';
import { resetState } from '../../../../PointsClaim/container/PointsClaim.actions';
import {
  getSuccess,
  getError,
  getPointsClaimErrorMessage,
} from '../../../../PointsClaim/container/PointsClaim.selectors';
import { getLabels } from '../../../../Account/container/Account.selectors';

export class PointsHistoryContainer extends React.PureComponent {
  componentDidMount() {
    const { getPointsHistoryAction } = this.props;
    getPointsHistoryAction();
  }

  componentWillUnmount() {
    const { showSuccess, showError, resetStateAction } = this.props;
    if (showSuccess || showError) {
      resetStateAction();
    }
  }

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { labels, pointHistory, showFullHistory, ...otherprops } = this.props;
    if (showFullHistory) {
      return <PointsHistoryList pointHistory={pointHistory} labels={labels} {...otherprops} />;
    }
    return <PointsHistory pointHistory={pointHistory} labels={labels} {...otherprops} />;
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getPointsHistoryAction: () => {
      dispatch(getPointsHistoryList());
    },
    resetStateAction: () => {
      dispatch(resetState());
    },
  };
};

const mapStateToProps = state => {
  return {
    pointHistory: getPointHistoryState(state),
    labels: getCommonLabels(state),
    accountlabels: getLabels(state),
    showSuccess: getSuccess(state),
    showError: getError(state),
    claimPointsErrorMessage: getPointsClaimErrorMessage(state),
  };
};

PointsHistoryContainer.propTypes = {
  getPointsHistoryAction: PropTypes.func.isRequired,
  router: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({
    labels: {},
  }),
  pointHistory: PropTypes.shape({}),
  showFullHistory: PropTypes.bool,
  showNotification: PropTypes.string,
  resetStateAction: PropTypes.func,
  showSuccess: PropTypes.string,
  showError: PropTypes.string,
};

PointsHistoryContainer.defaultProps = {
  labels: PropTypes.shape({ labels: {} }),
  pointHistory: PropTypes.shape({}),
  showFullHistory: false,
  showNotification: '',
  resetStateAction: () => {},
  showSuccess: '',
  showError: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointsHistoryContainer);
