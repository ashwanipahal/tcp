import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EarnPoints from '../views';
import {
  getEarnExtraPointsDataState,
  getCommonLabels,
} from '../../common/organism/EarnExtraPointsTile/container/EarnExtraPointsTile.selectors';
import { getEarnExtraPointsList } from '../../common/organism/EarnExtraPointsTile/container/EarnExtraPointsTile.actions';
import ExtraPointsDetailModal from '../organism/ExtraPointsDetailModal.view';

/**
 * This Class component use for return the Extra Points details
 * can be passed in the component.
 * @param state - initial state of selectedActivity set to be null
 */
export class ExtraPointsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedActivity: null,
    };
  }

  componentDidMount() {
    const { getEarnExtraPointsListAction } = this.props;
    getEarnExtraPointsListAction();
  }

  /**
   * This function use for view Earn Activity details for Earn Activity modal
   * can be passed in the component.
   * @param earnActivity - this is earnActivity data used for show Activity details
   */
  handlePopupEarnPointsDetails = earnActivity =>
    this.setState({
      selectedActivity: earnActivity,
    });

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { waysToEarn, labels } = this.props;
    const { selectedActivity } = this.state;
    return (
      <>
        <EarnPoints
          labels={labels}
          waysToEarn={waysToEarn}
          onViewActivityDetails={this.handlePopupEarnPointsDetails}
        />
        {selectedActivity && (
          <ExtraPointsDetailModal
            openState={selectedActivity}
            waysToEarnRow={selectedActivity}
            onRequestClose={this.handlePopupEarnPointsDetails}
          />
        )}
      </>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getEarnExtraPointsListAction: () => {
      dispatch(getEarnExtraPointsList());
    },
  };
};

const mapStateToProps = state => {
  return {
    waysToEarn: getEarnExtraPointsDataState(state),
    labels: getCommonLabels(state),
  };
};

ExtraPointsContainer.propTypes = {
  getEarnExtraPointsListAction: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  waysToEarn: PropTypes.shape([]),
};

ExtraPointsContainer.defaultProps = {
  labels: {},
  waysToEarn: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtraPointsContainer);
