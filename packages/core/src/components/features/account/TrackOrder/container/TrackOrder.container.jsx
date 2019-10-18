import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { openOverlayModal } from '../../OverlayModal/container/OverlayModal.actions';
import { trackOrder, setTrackOrderModalMountedState, setErrorInfoNull } from './TrackOrder.actions';
import TrackOrderView from '../views';
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
import { ROUTE_PATH } from '../../../../../config/route.config';

export class TrackOrderContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    import('../../../../../utils')
      .then(({ isMobileApp, navigateToNestedRoute }) => {
        this.hasMobileApp = isMobileApp;
        this.hasNavigateToNestedRoute = navigateToNestedRoute;
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }

  componentDidUpdate() {
    const { orderDetailResponse, isUserLoggedIn } = this.props;
    const isSuccess = orderDetailResponse && orderDetailResponse.get('success');
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
    const { navigation, setTrackOrderModalMountState } = this.props;
    const pathToNavigate = ROUTE_PATH.guestOrderDetails({
      pathSuffix: `${orderId}/${encryptedEmailAddress}`,
    });
    if (!isUserLoggedIn) {
      setTrackOrderModalMountState({ state: false });
      if (this.hasMobileApp()) {
        // TO DO - This has to be implemented when the track order page is available
        this.hasNavigateToNestedRoute(navigation, 'AccountStack', 'Account');
      } else routerPush(pathToNavigate);
    }
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
      handleToggle,
      navigation,
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
        handleToggle={handleToggle}
        navigation={navigation}
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

TrackOrderContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  emailId: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  orderDetailResponse: PropTypes.shape({}).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    trackOrder: PropTypes.shape({}),
  }).isRequired,
  openLoginOverlay: PropTypes.func.isRequired,
  trackOrderMountedState: PropTypes.func.isRequired,
  setTrackOrderModalMountState: PropTypes.func.isRequired,
  showNotification: PropTypes.string.isRequired,
  onChangeForm: PropTypes.func.isRequired,
  handleToggle: PropTypes.func,
  navigation: PropTypes.shape({}),
};

TrackOrderContainer.defaultProps = {
  handleToggle: () => null,
  navigation: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackOrderContainer);
