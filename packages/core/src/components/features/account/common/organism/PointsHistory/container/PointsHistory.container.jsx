import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PointsHistory from '../views';
import PointsHistoryList from '../views/PointsHistoryList.view';
import { getPointHistoryState, getCommonLabels, getLabels } from './PointsHistory.selectors';
import { getPointsHistoryList } from './PointsHistory.actions';
import { resetState } from '../../../../PointsClaim/container/PointsClaim.actions';
import { getSuccess } from '../../../../PointsClaim/container/PointsClaim.selectors';

export class PointsHistoryContainer extends React.PureComponent {
  componentDidMount() {
    const { getPointsHistoryAction } = this.props;
    getPointsHistoryAction();
  }

  componentWillUnmount() {
    const { showNotification, resetStateAction } = this.props;
    if (showNotification) {
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
    showNotification: getSuccess(state),
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
};

PointsHistoryContainer.defaultProps = {
  labels: PropTypes.shape({ labels: {} }),
  pointHistory: PropTypes.shape({}),
  showFullHistory: false,
  showNotification: '',
  resetStateAction: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointsHistoryContainer);
