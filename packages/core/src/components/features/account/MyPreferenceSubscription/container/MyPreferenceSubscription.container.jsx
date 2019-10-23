import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import MyPrefrence from '../views';
import {
  getPlaceRewardsSms,
  getSmsPhone,
  getGymPlaceRewardsSms,
  getGymSmsPhone,
} from './MyPreferenceSubscription.selectors';
import { getUserPhoneNumber } from '../../User/container/User.selectors';
import MyPreferenceSubscribeModal from '../organism/TcpSubscribeModal/MyPreferenceSubscribeModal.view';
import MyPreferenceUnsubscribeModal from '../organism/TcpUnsubscribeModal/MyPreferenceUnsubscribeModal.view';
import { getSubscribeStore, setBrandSubscribeData } from './MyPreferenceSubscription.actions';

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

    if (activeModal === 'tcpWebSubscribe') {
      formSubscribeData = {
        brand: 'tcp',
        mobileNumber: data.phoneNumber,
        CustomerPreferences: [
          {
            isModeSelected: true,
            preferenceMode: 'placeRewardsSms',
          },
          {
            preferenceMode: 'marketingPreferenceEmail',
            isModeSelected: true,
          },
        ],
      };
    }

    if (activeModal === 'tcpWebUnsubscribe') {
      formSubscribeData = {
        brand: 'tcp',
        mobileNumber: smsPhone,
        CustomerPreferences: [
          {
            isModeSelected: false,
            preferenceMode: 'placeRewardsSms',
          },
          {
            preferenceMode: 'marketingPreferenceEmail',
            isModeSelected: false,
          },
        ],
      };
    }

    if (activeModal === 'gymboreeWebSubscribe') {
      formSubscribeData = {
        brand: 'gymboree',
        mobileNumber: data.phoneNumber,
        CustomerPreferencesGym: [
          {
            isModeSelected: true,
            preferenceMode: 'gymPlaceRewardsSms',
          },
          {
            preferenceMode: 'gymMarketingPreferenceSMS',
            isModeSelected: true,
          },
        ],
      };
    }

    if (activeModal === 'gymboreeWebUnsubscribe') {
      formSubscribeData = {
        brand: 'gymboree',
        mobileNumber: gymSmsPhone,
        CustomerPreferencesGym: [
          {
            isModeSelected: false,
            preferenceMode: 'gymPlaceRewardsSms',
          },
          {
            preferenceMode: 'gymMarketingPreferenceSMS',
            isModeSelected: false,
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
    if (subscribeBrand === 'tcpWebSubscribe') {
      this.setState({
        modalVisible: true,
        activeModal: 'tcpWebSubscribe',
      });
    }

    if (subscribeBrand === 'gymboreeWebSubscribe') {
      this.setState({
        modalVisible: true,
        activeModal: 'gymboreeWebSubscribe',
      });
    }
    return true;
  };

  onUnsubscribe = subscribeBrand => {
    if (subscribeBrand === 'tcpWebSubscribe') {
      this.setState({
        modalVisible: true,
        activeModal: 'tcpWebUnsubscribe',
      });
    }

    if (subscribeBrand === 'gymboreeWebSubscribe') {
      this.setState({
        modalVisible: true,
        activeModal: 'gymboreeWebUnsubscribe',
      });
    }
    return true;
  };

  render() {
    const {
      labels,
      handleComponentChange,
      componentProps,
      router,
      isTcpSubscribe,
      phoneNumber,
      smsPhone,
      isGymSubscribe,
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
          isGymSubscribe={isGymSubscribe}
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
            minHeight="517px"
            fixedWidth
            heading=" "
            horizontalBar={false}
            closeIconDataLocator="ExtraPointsDetailModal_crossIcon"
          >
            {activeModal === 'tcpWebSubscribe' && (
              <MyPreferenceSubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                onSubmit={this.handleSubmitModalPopup}
                phoneNumber={phoneNumber}
                initialValues={this.initialValuesSubscribe}
                labels={labels}
                activeModal={activeModal}
              />
            )}
            {activeModal === 'tcpWebUnsubscribe' && (
              <MyPreferenceUnsubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                onSubmit={this.handleSubmitModalPopup}
                phoneNumber={smsPhone}
                labels={labels}
                activeModal={activeModal}
              />
            )}
            {activeModal === 'gymboreeWebSubscribe' && (
              <MyPreferenceSubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                onSubmit={this.handleSubmitModalPopup}
                phoneNumber={phoneNumber}
                initialValues={this.initialValuesSubscribe}
                labels={labels}
                activeModal={activeModal}
              />
            )}
            {activeModal === 'gymboreeWebUnsubscribe' && (
              <MyPreferenceUnsubscribeModal
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
  isTcpSubscribe: getPlaceRewardsSms(state),
  phoneNumber: getUserPhoneNumber(state),
  smsPhone: getSmsPhone(state),
  isGymSubscribe: getGymPlaceRewardsSms(state),
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
  isGymSubscribe: PropTypes.bool,
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
  isGymSubscribe: false,
  smsPhone: '',
  gymSmsPhone: '',
  router: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPreferenceSubscription);
