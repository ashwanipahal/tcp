import React from 'react';
import { connect } from 'react-redux';
import { openOverlayModal } from '../../../OverlayModal/container/OverlayModal.actions';
import { trackOrder, setTrackOrderModalMountedState, setErrorInfoNull } from './TrackOrder.actions';
import TrackOrderView from '../molecules/TrackOrderView';
import {
  getLabels,
  getErrorMessage,
  getTrackOrderMountedState,
  getEmailId,
  getOrderId,
  getOrderDetail,
  getShowNotificationState,
} from './TrackOrder.selectors';
import { getUserLoggedInState } from '../../User/container/User.selectors';
import { routerPush } from '../../../../../utils';
import ROUTE_PATH from '../../../../../config/route.config';
import { isMobileApp, navigateToNestedRoute } from '../../../../../utils/index.native';

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
  showNotification: string,
  onChangeForm: Function,
  onRequestClose: Function,
  navigation: Object,
};
export class TrackOrderContainer extends React.PureComponent<Props> {
  componentDidUpdate() {
    const { orderDetailResponse, isUserLoggedIn, onRequestClose } = this.props;
    const isSuccess = orderDetailResponse && orderDetailResponse.get('success');
    if (isSuccess) {
      onRequestClose({});
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
    const { navigation } = this.props;
    const hasMobile = isMobileApp();
    const pathToNavigate = ROUTE_PATH.guestOrderDetails({
      pathSuffix: `${orderId}/${encryptedEmailAddress}`,
    });
    if (!isUserLoggedIn)
      if (hasMobile) {
        // TO DO - This has to be implemented when the track order page is available
        navigateToNestedRoute(navigation, 'AccountStack', 'account');
      } else routerPush(pathToNavigate);
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
      showNotification,
      onChangeForm,
      onRequestClose,
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
        showNotification={showNotification}
        onChangeForm={onChangeForm}
        onRequestClose={onRequestClose}
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
    showNotification: getShowNotificationState(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onSubmit: payload => {
      dispatch(trackOrder(payload));
    },
    onChangeForm: () => {
      dispatch(setErrorInfoNull());
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
