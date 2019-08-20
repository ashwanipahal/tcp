import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBonusDays, fetchModuleX } from './BonusPointsDays.actions';
import {
  getLabels,
  getBonusData,
  getBonusDetailsContentId,
  getBonusDetailsData,
  getBonusPointsSwitch,
} from './BonusPointsDays.selectors';
import { isPlccUser } from '../../User/container/User.selectors';
import BonusPointsView from '../views/BonusPointsView';
import { isCanada } from '../../../../../utils';
import constants from '../BonusPointsDays.constants';

export class BonusPointsDays extends React.Component {
  static propTypes = {
    getBonusDaysData: PropTypes.func,
    getBonusPointsDetails: PropTypes.func,
    bonusDetailsContentId: PropTypes.string,
    labels: PropTypes.shape({}),
    bonusData: PropTypes.shape({}),
    bonusDetailsData: PropTypes.string,
    isBonusPointsEnabled: PropTypes.bool,
    view: PropTypes.string,
    isPlcc: PropTypes.bool,
  };

  static defaultProps = {
    getBonusDaysData: () => {},
    getBonusPointsDetails: () => {},
    bonusDetailsContentId: null,
    labels: {},
    bonusData: {},
    bonusDetailsData: '',
    isBonusPointsEnabled: false,
    view: constants.VIEWS.EDIT,
    isPlcc: false,
  };

  componentDidMount() {
    const { getBonusDaysData, getBonusPointsDetails, bonusDetailsContentId } = this.props;
    getBonusDaysData();
    /* istanbul ignore else */
    if (bonusDetailsContentId) {
      getBonusPointsDetails(bonusDetailsContentId);
    }
  }

  render() {
    const { labels, bonusData, bonusDetailsData, isBonusPointsEnabled, view, isPlcc } = this.props;
    return (
      !isCanada() &&
      isBonusPointsEnabled && (
        <BonusPointsView
          labels={labels}
          bonusData={bonusData}
          bonusDetailsData={bonusDetailsData}
          view={view}
          isPlcc={isPlcc}
        />
      )
    );
  }
}

export const mapStateToProps = state => {
  return {
    labels: getLabels(state),
    bonusData: getBonusData(state),
    bonusDetailsContentId: getBonusDetailsContentId(state),
    bonusDetailsData: getBonusDetailsData(state),
    isBonusPointsEnabled: getBonusPointsSwitch(state),
    isPlcc: isPlccUser(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getBonusDaysData: () => {
      dispatch(getBonusDays());
    },
    getBonusPointsDetails: cid => {
      dispatch(fetchModuleX(cid));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BonusPointsDays);
