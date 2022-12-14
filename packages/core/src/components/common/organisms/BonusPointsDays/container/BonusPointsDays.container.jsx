import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getIsInternationalShipping } from '@tcp/core/src/reduxStore/selectors/session.selectors';
import { getBonusDays, fetchModuleX, applyBonusDays } from './BonusPointsDays.actions';
import {
  getLabels,
  getBonusData,
  getBonusDetailsContentId,
  getBonusDetailsData,
  getBonusPointsSwitch,
  getIsFetching,
} from './BonusPointsDays.selectors';
import { isPlccUser } from '../../../../features/account/User/container/User.selectors';
import BonusPointsView from '../views/BonusPointsView';
import { isCanada } from '../../../../../utils';
import constants from '../BonusPointsDays.constants';
import { getCartOrderId } from '../../../../features/CnC/CartItemTile/container/CartItemTile.selectors';

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
    getAvailableBonusDaysData: PropTypes.func,
    orderId: PropTypes.string,
    showAccordian: PropTypes.bool,
    isBagPage: PropTypes.bool,
    additionalClassNameModal: PropTypes.string.isRequired,
    isDefaultOpen: PropTypes.bool,
    isInternationalShipping: PropTypes.bool,
    isFetchingStateSection: PropTypes.bool.isRequired,
    isFetchingStatePageLevel: PropTypes.bool.isRequired,
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
    getAvailableBonusDaysData: () => {},
    orderId: '',
    showAccordian: true,
    isBagPage: false,
    isDefaultOpen: false,
    isInternationalShipping: false,
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
    const {
      labels,
      bonusData,
      bonusDetailsData,
      isBonusPointsEnabled,
      view,
      isPlcc,
      getAvailableBonusDaysData,
      orderId,
      showAccordian,
      isBagPage,
      additionalClassNameModal,
      isDefaultOpen,
      isInternationalShipping,
      isFetchingStateSection,
      isFetchingStatePageLevel,
      ...otherProps
    } = this.props;
    const isFetching = isFetchingStateSection || isFetchingStatePageLevel;
    return (
      !isCanada() &&
      isBonusPointsEnabled && (
        <BonusPointsView
          labels={labels}
          bonusData={bonusData}
          bonusDetailsData={bonusDetailsData}
          view={view}
          isPlcc={isPlcc}
          getAvailableBonusDaysData={getAvailableBonusDaysData}
          orderDetails={orderId}
          showAccordian={showAccordian}
          isBagPage={isBagPage}
          isDefaultOpen={isDefaultOpen}
          additionalClassNameModal={additionalClassNameModal}
          isInternationalShipping={isInternationalShipping}
          isFetching={isFetching}
          {...otherProps}
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
    orderId: getCartOrderId(state),
    isInternationalShipping: getIsInternationalShipping(state),
    isFetchingStateSection: getIsFetching(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getBonusDaysData: () => {
      dispatch(getBonusDays());
    },
    getAvailableBonusDaysData: dto => {
      dispatch(applyBonusDays(dto));
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
