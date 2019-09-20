import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getError,
  getSuccess,
  getShowNotificationState,
  getPointsClaimErrorMessage,
} from './PointsClaim.selectors';
import { routerPush } from '../../../../../utils';
import { getMyPlaceNumber, getProfileInfoTileData } from '../../User/container/User.selectors';

import PointsClaimComponent from '../views';
import { TRANSACTION_TYPES } from '../PointsClaim.constants';
import { submitClaimPoints, resetState } from './PointsClaim.actions';
import {
  getLabels,
  getFormValidationErrorMessages,
} from '../../Account/container/Account.selectors';

import { getSiteId } from '../../../../../utils/utils.web';
import { API_CONFIG } from '../../../../../services/config';

export class PontsClaimContainer extends PureComponent {
  transactionTypesMap = [
    { id: TRANSACTION_TYPES.IN_STORE, displayName: 'In Store' },
    { id: TRANSACTION_TYPES.ONLINE, displayName: 'Online' },
  ];

  componentDidUpdate(prevProps) {
    const { successMessage } = this.props;
    if (prevProps.successMessage !== successMessage) {
      this.backHandler();
    }
  }

  componentWillUnmount() {
    const { errorMessage, resetStateAction } = this.props;
    if (errorMessage) {
      resetStateAction();
    }
  }

  /**
   * @function submitClaim
   * @param {object} formData : form data payload
   * @desc This is a function to submit points claim form
   */
  submitClaim = formData => {
    const { submitClaimAction, userInfoData, myPlaceNumber } = this.props;
    let orderOrTxData;

    if (formData.transactionType === TRANSACTION_TYPES.IN_STORE) {
      orderOrTxData = {
        wasInStoreTransaction: true,
        storeNumber: formData.storeNumber,
        storeRegisterNumber: formData.registerNumber,
        transactionNumber: formData.transactionNumber,
        transactionDate: formData.transactionDate,
      };
    } else {
      orderOrTxData = {
        wasInStoreTransaction: false,
        orderNumber: formData.orderNumber,
        transactionDate: formData.orderDate,
      };
    }

    const claimData = {
      firstName: userInfoData.firstName,
      lastName: userInfoData.lastName,
      myPlaceNumber,
      email: userInfoData.emailAddress,
      ...orderOrTxData,
    };
    submitClaimAction(claimData);
  };

  /**
   * @function backHandler
   * @desc This is a function to redirect at point history page
   */
  backHandler = () => {
    routerPush(
      '/account?id=place-rewards&&subSection=points-history',
      '/account/place-rewards/points-history'
    );
  };

  render() {
    const { successMessage, errorMessage, labels, showNotification, ...otherprops } = this.props;
    const siteId = getSiteId();

    return (
      siteId !== API_CONFIG.siteIds.ca && (
        <PointsClaimComponent
          successMessage={successMessage}
          errorMessage={errorMessage}
          claimSubmit={this.submitClaim}
          labels={labels}
          showNotification={showNotification}
          transactionTypesMap={this.transactionTypesMap}
          onBack={this.backHandler}
          {...otherprops}
        />
      )
    );
  }
}

export const mapStateToProps = state => ({
  successMessage: getSuccess(state),
  errorMessage: getError(state),
  showNotification: getShowNotificationState(state),
  labels: getLabels(state),
  myPlaceNumber: getMyPlaceNumber(state),
  userInfoData: getProfileInfoTileData(state),
  claimPointsErrorMessage: getPointsClaimErrorMessage(state),
  formErrorMessage: getFormValidationErrorMessages(state),
});

export const mapDispatchToProps = dispatch => ({
  submitClaimAction: payload => {
    dispatch(submitClaimPoints(payload));
  },
  resetStateAction: () => {
    dispatch(resetState());
  },
});

PontsClaimContainer.propTypes = {
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  resetStateAction: PropTypes.func,
  submitClaimAction: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  claimPointsErrorMessage: PropTypes.string.isRequired,
  showNotification: PropTypes.bool,
  userInfoData: PropTypes.shape([]),
  myPlaceNumber: PropTypes.string,
};

PontsClaimContainer.defaultProps = {
  showNotification: false,
  resetStateAction: () => {},
  userInfoData: [],
  myPlaceNumber: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PontsClaimContainer);
