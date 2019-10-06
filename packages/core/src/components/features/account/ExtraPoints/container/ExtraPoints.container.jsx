import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EarnPoints from '../views';
import {
  getEarnExtraPointsDataState,
  getCommonLabels,
  getEarnExtraPointsLabels,
  getEarnedPointsNotificationState,
} from '../../common/organism/EarnExtraPointsTile/container/EarnExtraPointsTile.selectors';
import { getExtraPointsTilesContentId, getPromoListDetails } from './ExtraPoints.selectors';

import {
  getEarnExtraPointsList,
  getEarnedPointsNotification,
} from '../../common/organism/EarnExtraPointsTile/container/EarnExtraPointsTile.actions';
import ExtraPointsDetailModal from '../organism/ExtraPointsDetailModal.view';
import { fetchModuleX } from './ExtraPoints.actions';
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
    const {
      getEarnExtraPointsListAction,
      getEarnedPointsNotificationAction,
      extraPointsTilesContentIds,
      fetchExtraPointsModuleContent,
    } = this.props;
    getEarnExtraPointsListAction();
    getEarnedPointsNotificationAction();
    fetchExtraPointsModuleContent(extraPointsTilesContentIds);
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
    const {
      waysToEarn,
      labels,
      earnedPointsNotification,
      earnExtraPointsLabels,
      handleComponentChange,
      promoListData,
    } = this.props;
    const { selectedActivity } = this.state;
    return (
      <>
        <EarnPoints
          labels={labels}
          earnExtraPointsLabels={earnExtraPointsLabels}
          waysToEarn={waysToEarn}
          earnedPointsNotification={earnedPointsNotification}
          onViewActivityDetails={this.handlePopupEarnPointsDetails}
          handleComponentChange={handleComponentChange}
          promoListData={promoListData}
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
    getEarnedPointsNotificationAction: () => {
      dispatch(getEarnedPointsNotification());
    },
    fetchExtraPointsModuleContent: contentIds => {
      dispatch(fetchModuleX(contentIds));
    },
  };
};

const mapStateToProps = state => {
  return {
    waysToEarn: getEarnExtraPointsDataState(state),
    labels: getCommonLabels(state),
    earnExtraPointsLabels: getEarnExtraPointsLabels(state),
    earnedPointsNotification: getEarnedPointsNotificationState(state),
    extraPointsTilesContentIds: getExtraPointsTilesContentId(state),
    promoListData: getPromoListDetails(state),
  };
};

ExtraPointsContainer.propTypes = {
  getEarnExtraPointsListAction: PropTypes.func.isRequired,
  getEarnedPointsNotificationAction: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  earnExtraPointsLabels: PropTypes.shape({}),
  waysToEarn: PropTypes.shape([]),
  earnedPointsNotification: PropTypes.shape([]),
  handleComponentChange: PropTypes.func,
  extraPointsTilesContentIds: PropTypes.shape([]),
  fetchExtraPointsModuleContent: PropTypes.func.isRequired,
  promoListData: PropTypes.shape([]),
};

ExtraPointsContainer.defaultProps = {
  labels: {},
  earnExtraPointsLabels: {},
  waysToEarn: [],
  earnedPointsNotification: [],
  handleComponentChange: () => {},
  extraPointsTilesContentIds: [],
  promoListData: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtraPointsContainer);
