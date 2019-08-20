import React from 'react';
import { connect } from 'react-redux';
import { openOverlayModal } from '../../../OverlayModal/container/OverlayModal.actions';
import { trackOrder, setTrackOrderModalMountedState } from './TrackOrder.actions';
import TrackOrderView from '../views';
import {
  getLabels,
  getErrorMessage,
  getTrackOrderMountedState,
  getEmailId,
  getOrderId,
  getOrderDetail,
} from './TrackOrder.selectors';
import { getUserLoggedInState } from '../../User/container/User.selectors';
// import labels from './TrackOrder.labels';
import { routerPush } from '../../../../../utils';

// @flow
type Props = {
  onSubmit: Function,
  emailId: String,
  orderId: String,
  orderDetailResponse: Object,
  isUserLoggedIn: Boolean,
  errorMessage: String,
  labels: Object,
  openLoginOverlay: Function,
  trackOrderMountedState: Function,
  setTrackOrderModalMountState: Function,
};
class TrackOrderContainer extends React.PureComponent<Props> {
  componentDidUpdate() {
    const { orderDetailResponse, isUserLoggedIn } = this.props;
    const isSuccess = orderDetailResponse && orderDetailResponse.success;
    if (isSuccess) {
      this.trackOrderDetail(
        orderDetailResponse.orderId,
        orderDetailResponse.encryptedEmailAddress,
        isUserLoggedIn
      );
    }
  }

  /**
   * TO DO - Integrate with Account POD guest order detail feature
   * @param {string} orderId - order id
   * @param {string} encryptedEmailAddress - encrypted user email address
   * @param {boolean} isGuest - check if it is guest login or signed in user.
   */
  trackOrderDetail = (orderId = '', encryptedEmailAddress = '', isUserLoggedIn = false) => {
    if (!isUserLoggedIn) routerPush(`/account/order-detail/${orderId}/${encryptedEmailAddress}`);
  };

  handleSubmit(e) {
    e.preventDefault();
    const { onSubmit, emailId, orderId } = this.props;
    const payloadArgs = {
      orderNumber: orderId,
      emailAddress: emailId,
    };
    if (emailId && orderId) onSubmit(payloadArgs);
  }

  render() {
    const {
      errorMessage,
      isUserLoggedIn,
      labels,
      openLoginOverlay,
      trackOrderMountedState,
      setTrackOrderModalMountState,
    } = this.props;
    return (
      <TrackOrderView
        labels={labels}
        errorMessage={errorMessage}
        isGuestUser={isUserLoggedIn}
        onSubmit={e => this.handleSubmit(e)}
        openLoginOverlay={openLoginOverlay}
        openState={trackOrderMountedState}
        setModalMountState={setTrackOrderModalMountState}
        className="TrackOrder__Modal"
      />
    );
  }
}

export const mapStateToProps = state => {
  return {
    labels: getLabels(state),
    errorMessage: getErrorMessage(state),
    isUserLoggedIn: getUserLoggedInState(state),
    trackOrderMountedState: getTrackOrderMountedState(state),
    emailId: getEmailId(state),
    orderId: getOrderId(state),
    orderDetailResponse: getOrderDetail(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onSubmit: payload => {
      dispatch(trackOrder(payload));
    },
    openLoginOverlay: payload => {
      dispatch(openOverlayModal(payload));
    },
    setTrackOrderModalMountState: payload => {
      dispatch(setTrackOrderModalMountedState(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackOrderContainer);
