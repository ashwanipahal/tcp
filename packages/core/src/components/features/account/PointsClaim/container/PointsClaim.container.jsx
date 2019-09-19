import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getError,
  getSuccess,
  getShowNotificationState,
  getLabels,
  getPointsClaimErrorMessage,
} from './PointsClaim.selectors';
import { routerPush } from '../../../../../utils';
import { getMyPlaceNumber, getProfileInfoTileData } from '../../User/container/User.selectors';

import PointsClaimComponent from '../views';
import { TRANSACTION_TYPES } from '../PointsClaim.constants';
import { submitClaimPoints, resetState } from './PointsClaim.actions';
import { getFormValidationErrorMessages } from '../../Account/container/Account.selectors';

export class PontsClaimContainer extends PureComponent {
  transactionTypesMap = [
    { id: TRANSACTION_TYPES.IN_STORE, displayName: 'In Store' },
    { id: TRANSACTION_TYPES.ONLINE, displayName: 'Online' },
  ];

  componentDidUpdate() {
    const { successMessage } = this.props;
    if (successMessage) {
      this.backHandler();
    }
  }

  componentWillUnmount() {
    const { errorMessage, resetStateAction } = this.props;
    if (errorMessage) {
      resetStateAction();
    }
  }

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

  backHandler = () => {
    routerPush(
      '/account?id=place-rewards&&subSection=points-history',
      '/account/place-rewards/points-history'
    );
  };

  render() {
    const { successMessage, errorMessage, labels, showNotification, ...otherprops } = this.props;

    return (
      <PointsClaimComponent
        successMessage={successMessage}
        errorMessage={errorMessage}
        claimSubmit={this.submitClaim}
        labels={labels}
        showNotification={showNotification}
        transactionTypesMap={this.transactionTypesMap}
        {...otherprops}
      />
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
