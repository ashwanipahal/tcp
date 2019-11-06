import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import { isMobileApp } from '@tcp/core/src/utils';
import MyPrefrence from '../views';
import {
  getSmsPhone,
  getGymSmsPhone,
  getTcpSubscribe,
  getTcpAppSubscribe,
  getGymSubscribe,
  getGymAppSubscribe,
} from './MyPreferenceSubscription.selectors';
import { getUserPhoneNumber } from '../../User/container/User.selectors';
import MyPreferenceSubscribeModal from '../organism/TcpSubscribeModal/MyPreferenceSubscribeModal.view';
import MyPreferenceAppSubscribeModal from '../organism/TcpAppSubscribeModal/MyPreferenceAppSubscribeModal.view';
import MyPreferenceUnsubscribeModal from '../organism/TcpUnsubscribeModal/MyPreferenceUnsubscribeModal.view';
import MyPreferenceAppUnsubscribeModal from '../organism/TcpAppUnsubscribeModal/MyPreferenceAppUnsubscribeModal.view';
import { getSubscribeStore, setBrandSubscribeData } from './MyPreferenceSubscription.actions';
import MyPreferenceSubscriptionConstants from '../MyPreferenceSubscription.constants';

export class MyPreferenceSubscription extends PureComponent {
  constructor(props) {
    super(props);
    const { labels, ...otherProps } = this.props;
    this.initialValuesPreference = this.getPreferenceInitialValues(otherProps);
    this.initialValuesSubscribe = this.getSubscribeInitialValues(otherProps);
    this.state = {
      modalVisible: false,
      activeModal: '',
    };
  }

  componentDidMount() {
    const { getSubscribeStoreAction } = this.props;
    getSubscribeStoreAction();
  }

  /**
   * This function use for view Earn Activity details for Earn Activity modal
   * can be passed in the component.
   * @param earnActivity - this is earnActivity data used for show Activity details
   */
  handlePopupSubscribeModal = () => {
    this.setState({
      modalVisible: false,
      activeModal: '',
    });
  };

  getPreferenceInitialValues = props => {
    const { tcpWebSubscribe } = props;
    return { tcpWebSubscribe };
  };

  getSubscribeInitialValues = props => {
    const { phoneNumber } = props;
    return { phoneNumber };
  };

  handleSubmitModalPopup = data => {
    const { activeModal } = this.state;
    const { submitSubscribeBrand, smsPhone, gymSmsPhone } = this.props;
    let formSubscribeData = {};

    if (activeModal === MyPreferenceSubscriptionConstants.TCP_WEB_SUBSCRIBE) {
      formSubscribeData = {
        brand: MyPreferenceSubscriptionConstants.BRAND_TCP,
        mobileNumber: data.phoneNumber,
        CustomerPreferences: [
          {
            isModeSelected: true,
            preferenceMode: MyPreferenceSubscriptionConstants.PLACE_REWARDS_SMS,
          },
          {
            preferenceMode: MyPreferenceSubscriptionConstants.MARKETING_PREFERENCE_SMS,
            isModeSelected: true,
          },
        ],
      };
    }

    if (activeModal === MyPreferenceSubscriptionConstants.TCP_APP_SUBSCRIBE) {
      formSubscribeData = {
        brand: MyPreferenceSubscriptionConstants.BRAND_TCP,
        mobileNumber: smsPhone,
        CustomerPreferences: [
          {
            isModeSelected: true,
            preferenceMode: MyPreferenceSubscriptionConstants.PLACE_REWARDS_PUSH,
          },
        ],
      };
    }

    if (activeModal === MyPreferenceSubscriptionConstants.TCP_WEB_UNSUBSCRIBE) {
      formSubscribeData = {
        brand: MyPreferenceSubscriptionConstants.BRAND_TCP,
        mobileNumber: smsPhone,
        CustomerPreferences: [
          {
            isModeSelected: false,
            preferenceMode: MyPreferenceSubscriptionConstants.PLACE_REWARDS_SMS,
          },
          {
            preferenceMode: MyPreferenceSubscriptionConstants.MARKETING_PREFERENCE_SMS,
            isModeSelected: false,
          },
        ],
      };
    }

    if (activeModal === MyPreferenceSubscriptionConstants.TCP_APP_UNSUBSCRIBE) {
      formSubscribeData = {
        brand: MyPreferenceSubscriptionConstants.BRAND_TCP,
        mobileNumber: smsPhone,
        CustomerPreferences: [
          {
            isModeSelected: false,
            preferenceMode: MyPreferenceSubscriptionConstants.PLACE_REWARDS_PUSH,
          },
        ],
      };
    }

    if (activeModal === MyPreferenceSubscriptionConstants.GYMBOREE_WEB_SUBSCRIBE) {
      formSubscribeData = {
        brand: MyPreferenceSubscriptionConstants.BRAND_GYMBOREE,
        mobileNumber: data.phoneNumber,
        CustomerPreferencesGym: [
          {
            isModeSelected: true,
            preferenceMode: MyPreferenceSubscriptionConstants.PLACE_REWARDS_SMS,
          },
          {
            preferenceMode: MyPreferenceSubscriptionConstants.GYMBOREE_MARKETING_PREFERENCE_SMS,
            isModeSelected: true,
          },
        ],
      };
    }

    if (activeModal === MyPreferenceSubscriptionConstants.GYMBOREE_APP_SUBSCRIBE) {
      formSubscribeData = {
        brand: MyPreferenceSubscriptionConstants.BRAND_GYMBOREE,
        mobileNumber: gymSmsPhone,
        CustomerPreferencesGym: [
          {
            isModeSelected: true,
            preferenceMode: MyPreferenceSubscriptionConstants.PLACE_REWARDS_PUSH,
          },
        ],
      };
    }

    if (activeModal === MyPreferenceSubscriptionConstants.GYMBOREE_WEB_UNSUBSCRIBE) {
      formSubscribeData = {
        brand: MyPreferenceSubscriptionConstants.BRAND_GYMBOREE,
        mobileNumber: gymSmsPhone,
        CustomerPreferencesGym: [
          {
            isModeSelected: false,
            preferenceMode: MyPreferenceSubscriptionConstants.PLACE_REWARDS_SMS,
          },
          {
            preferenceMode: MyPreferenceSubscriptionConstants.GYMBOREE_MARKETING_PREFERENCE_SMS,
            isModeSelected: false,
          },
        ],
      };
    }

    if (activeModal === MyPreferenceSubscriptionConstants.GYMBOREE_APP_UNSUBSCRIBE) {
      formSubscribeData = {
        brand: MyPreferenceSubscriptionConstants.BRAND_GYMBOREE,
        mobileNumber: gymSmsPhone,
        CustomerPreferencesGym: [
          {
            isModeSelected: false,
            preferenceMode: MyPreferenceSubscriptionConstants.PLACE_REWARDS_PUSH,
          },
        ],
      };
    }

    submitSubscribeBrand(formSubscribeData);
    this.handlePopupSubscribeModal();
  };

  /**
   * @function onSelectStore function to handle the toggling og checkbox
   * @param {object} event - event object
   */
  onSubscribe = subscribeBrand => {
    if (subscribeBrand === MyPreferenceSubscriptionConstants.TCP_WEB_SUBSCRIBE) {
      this.setState({
        modalVisible: true,
        activeModal: MyPreferenceSubscriptionConstants.TCP_WEB_SUBSCRIBE,
      });
    }

    if (subscribeBrand === MyPreferenceSubscriptionConstants.GYMBOREE_WEB_SUBSCRIBE) {
      this.setState({
        modalVisible: true,
        activeModal: MyPreferenceSubscriptionConstants.GYMBOREE_WEB_SUBSCRIBE,
      });
    }

    if (subscribeBrand === MyPreferenceSubscriptionConstants.TCP_APP_SUBSCRIBE) {
      this.setState({
        modalVisible: true,
        activeModal: MyPreferenceSubscriptionConstants.TCP_APP_SUBSCRIBE,
      });
    }

    if (subscribeBrand === MyPreferenceSubscriptionConstants.GYMBOREE_APP_SUBSCRIBE) {
      this.setState({
        modalVisible: true,
        activeModal: MyPreferenceSubscriptionConstants.GYMBOREE_APP_SUBSCRIBE,
      });
    }
    return true;
  };

  onUnsubscribe = subscribeBrand => {
    if (subscribeBrand === MyPreferenceSubscriptionConstants.TCP_WEB_SUBSCRIBE) {
      this.setState({
        modalVisible: true,
        activeModal: MyPreferenceSubscriptionConstants.TCP_WEB_UNSUBSCRIBE,
      });
    }

    if (subscribeBrand === MyPreferenceSubscriptionConstants.GYMBOREE_WEB_SUBSCRIBE) {
      this.setState({
        modalVisible: true,
        activeModal: MyPreferenceSubscriptionConstants.GYMBOREE_WEB_UNSUBSCRIBE,
      });
    }

    if (subscribeBrand === MyPreferenceSubscriptionConstants.TCP_APP_SUBSCRIBE) {
      this.setState({
        modalVisible: true,
        activeModal: MyPreferenceSubscriptionConstants.TCP_APP_UNSUBSCRIBE,
      });
    }

    if (subscribeBrand === MyPreferenceSubscriptionConstants.GYMBOREE_APP_SUBSCRIBE) {
      this.setState({
        modalVisible: true,
        activeModal: MyPreferenceSubscriptionConstants.GYMBOREE_APP_UNSUBSCRIBE,
      });
    }
    return true;
  };

  // eslint-disable-next-line complexity
  render() {
    const {
      labels,
      handleComponentChange,
      componentProps,
      router,
      isTcpSubscribe,
      isTcpAppSubscribe,
      phoneNumber,
      smsPhone,
      isGymSubscribe,
      isGymAppSubscribe,
      gymSmsPhone,
    } = this.props;
    const { modalVisible, activeModal } = this.state;

    const urlParams = router.query || {};
    return (
      <>
        <MyPrefrence
          labels={labels}
          handleComponentChange={handleComponentChange}
          componentProps={componentProps}
          isTcpSubscribe={isTcpSubscribe}
          isTcpAppSubscribe={isTcpAppSubscribe}
          isGymSubscribe={isGymSubscribe}
          isGymAppSubscribe={isGymAppSubscribe}
          initialValues={this.initialValuesPreference}
          onSubscribe={this.onSubscribe}
          onUnsubscribe={this.onUnsubscribe}
          urlParams={urlParams}
        />
        {modalVisible && (
          <Modal
            isOpen={modalVisible}
            onRequestClose={this.handlePopupSubscribeModal}
            overlayClassName="TCPModal__Overlay"
            className="TCPModal__Content"
            maxWidth="457px"
            fixedWidth
            heading={!isMobileApp() ? '' : ' '}
            heightConfig={{
              maxHeight: '100%',
              height: 'auto',
            }}
            horizontalBar={false}
            closeIconDataLocator="ExtraPointsDetailModal_crossIcon"
          >
            {(activeModal === MyPreferenceSubscriptionConstants.TCP_WEB_SUBSCRIBE ||
              activeModal === MyPreferenceSubscriptionConstants.GYMBOREE_WEB_SUBSCRIBE) && (
              <MyPreferenceSubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                onSubmit={this.handleSubmitModalPopup}
                phoneNumber={phoneNumber}
                initialValues={this.initialValuesSubscribe}
                labels={labels}
                activeModal={activeModal}
              />
            )}
            {activeModal === MyPreferenceSubscriptionConstants.TCP_WEB_UNSUBSCRIBE && (
              <MyPreferenceUnsubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                onSubmit={this.handleSubmitModalPopup}
                phoneNumber={smsPhone}
                labels={labels}
                activeModal={activeModal}
              />
            )}
            {activeModal === MyPreferenceSubscriptionConstants.GYMBOREE_WEB_UNSUBSCRIBE && (
              <MyPreferenceUnsubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                onSubmit={this.handleSubmitModalPopup}
                phoneNumber={gymSmsPhone}
                labels={labels}
                activeModal={activeModal}
              />
            )}

            {(activeModal === MyPreferenceSubscriptionConstants.TCP_APP_SUBSCRIBE ||
              activeModal === MyPreferenceSubscriptionConstants.GYMBOREE_APP_SUBSCRIBE) && (
              <MyPreferenceAppSubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                onSubmit={this.handleSubmitModalPopup}
                phoneNumber={phoneNumber}
                initialValues={this.initialValuesSubscribe}
                labels={labels}
                activeModal={activeModal}
              />
            )}

            {(activeModal === MyPreferenceSubscriptionConstants.TCP_APP_UNSUBSCRIBE ||
              activeModal === MyPreferenceSubscriptionConstants.GYMBOREE_APP_UNSUBSCRIBE) && (
              <MyPreferenceAppUnsubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                onSubmit={this.handleSubmitModalPopup}
                phoneNumber={gymSmsPhone}
                labels={labels}
                activeModal={activeModal}
              />
            )}
          </Modal>
        )}
      </>
    );
  }
}

export const mapStateToProps = state => ({
  isTcpSubscribe: getTcpSubscribe(state),
  isTcpAppSubscribe: getTcpAppSubscribe(state),
  phoneNumber: getUserPhoneNumber(state),
  smsPhone: getSmsPhone(state),
  isGymSubscribe: getGymSubscribe(state),
  isGymAppSubscribe: getGymAppSubscribe(state),
  gymSmsPhone: getGymSmsPhone(state),
});

export const mapDispatchToProps = dispatch => {
  return {
    getSubscribeStoreAction: () => {
      dispatch(getSubscribeStore());
    },
    submitSubscribeBrand: payload => {
      dispatch(setBrandSubscribeData(payload));
    },
  };
};

MyPreferenceSubscription.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
  componentProps: PropTypes.shape({}),
  isTcpSubscribe: PropTypes.bool,
  isTcpAppSubscribe: PropTypes.bool,
  isGymSubscribe: PropTypes.bool,
  isGymAppSubscribe: PropTypes.bool,
  getSubscribeStoreAction: PropTypes.func.isRequired,
  submitSubscribeBrand: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  smsPhone: PropTypes.string,
  gymSmsPhone: PropTypes.string,
  router: PropTypes.shape({
    query: PropTypes.shape({}),
  }),
};

MyPreferenceSubscription.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
  componentProps: {},
  isTcpSubscribe: false,
  isTcpAppSubscribe: false,
  isGymAppSubscribe: false,
  isGymSubscribe: false,
  smsPhone: '',
  gymSmsPhone: '',
  router: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPreferenceSubscription);
