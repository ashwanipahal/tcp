import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PointsHistory from '../views';
import { getPointHistoryState, getCommonLabels } from './PointsHistory.selectors';
import { getPointsHistoryList } from './PointsHistory.actions';

export class PointsHistoryContainer extends React.PureComponent {
  componentDidMount() {
    const { getPointsHistoryAction } = this.props;
    getPointsHistoryAction();
  }

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { labels, pointHistory } = this.props;

    return <PointsHistory pointHistory={pointHistory} labels={labels} />;
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getPointsHistoryAction: () => {
      dispatch(getPointsHistoryList());
    },
  };
};

const mapStateToProps = state => {
  return {
    pointHistory: getPointHistoryState(state),
    labels: getCommonLabels(state),
  };
};

PointsHistoryContainer.propTypes = {
  getPointsHistoryAction: PropTypes.func.isRequired,
  router: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({
    labels: {},
  }),
  pointHistory: PropTypes.shape({}),
};

PointsHistoryContainer.defaultProps = {
  labels: PropTypes.shape({ labels: {} }),
  pointHistory: PropTypes.shape({}),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointsHistoryContainer);
