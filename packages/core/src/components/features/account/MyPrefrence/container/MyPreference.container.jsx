import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import MyPrefrence from '../views';
import { getIsTcpSubscribe } from './MyPreference.selectors';
import { getUserPhoneNumber } from '../../User/container/User.selectors';
import MyPreferenceSubscribeModal from '../organism/TcpSubscribeModal/MyPreferenceSubscribeModal.view';
import MyPreferenceUnsubscribeModal from '../organism/TcpUnsubscribeModal/MyPreferenceUnsubscribeModal.view';
import { getSubscribeStore, setBrandSubscribeData } from './MyPreference.actions';

const getMyPrefrenceLabels = labels => {
  return (labels && labels.preferences) || {};
};

export class MyPrefrenceContainer extends PureComponent {
  constructor(props) {
    super(props);
    const { labels, ...otherProps } = this.props;
    this.initialValuesPreference = this.getPreferenceInitialValues(otherProps);
    this.initialValuesSubscribe = this.getSubscribeInitialValues(otherProps);
    this.state = {
      modalVisible: false,
      isTcpSubscribeModal: false,
      isTcpUnsubscribeModal: false,
      isGymboreeSubscribeModal: false,
      isGymboreeUnsubscribeModal: false,
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
  handlePopupSubscribeModal = () =>
    this.setState({
      modalVisible: false,
      isTcpSubscribeModal: false,
      isTcpUnsubscribeModal: false,
      isGymboreeSubscribeModal: false,
      isGymboreeUnsubscribeModal: false,
    });

  getPreferenceInitialValues = props => {
    const { tcpWebSubscribe } = props;
    return { tcpWebSubscribe };
  };

  getSubscribeInitialValues = props => {
    const { phoneNumber } = props;
    return { phoneNumber };
  };

  handleSubmitModalPopup = data => {
    const { submitSubscribeBrand } = this.props;
    let formSubscribeData = {};
    if (data.tcpSubscribe) {
      formSubscribeData = {
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

    if (data.tcpUnsubscribe) {
      formSubscribeData = {
        CustomerPreferences: [
          {
            isModeSelected: false,
            preferenceMode: 'placeRewardsSms',
          },
        ],
      };
    }

    submitSubscribeBrand(formSubscribeData);

    // TO DO - need to be discussed to closed popup without error handle
    this.handlePopupSubscribeModal();
  };

  /**
   * @function onSelectStore function to handle the toggling og checkbox
   * @param {object} event - event object
   */
  onSubscribe = event => {
    const { target } = event;
    if (target.name === 'tcpWebSubscribe' && target.checked === true) {
      this.setState({
        modalVisible: true,
        isTcpSubscribeModal: true,
      });
    }

    if (target.name === 'tcpWebSubscribe' && target.checked === false) {
      this.setState({
        modalVisible: true,
        isTcpUnsubscribeModal: true,
      });
    }

    if (target.name === 'gymboreeWebSubscribe' && target.checked === true) {
      this.setState({
        modalVisible: true,
        isGymboreeSubscribeModal: true,
      });
    }
    if (target.name === 'gymboreeWebSubscribe' && target.checked === false) {
      this.setState({
        modalVisible: true,
        isGymboreeUnsubscribeModal: true,
      });
    }
    return true;
  };

  render() {
    const {
      labels,
      handleComponentChange,
      componentProps,
      isTcpSubscribe,
      phoneNumber,
    } = this.props;
    const {
      modalVisible,
      isTcpSubscribeModal,
      isTcpUnsubscribeModal,
      isGymboreeSubscribeModal,
      isGymboreeUnsubscribeModal,
    } = this.state;
    const myPrefrenceLabels = getMyPrefrenceLabels(labels);
    return (
      <>
        <MyPrefrence
          labels={myPrefrenceLabels}
          handleComponentChange={handleComponentChange}
          componentProps={componentProps}
          isTcpSubscribe={isTcpSubscribe}
          initialValues={this.initialValuesPreference}
          onSubscribe={this.onSubscribe}
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
            closeIconDataLocator="ExtraPointsDetailModal_crossIcon"
          >
            {isTcpSubscribeModal && (
              <MyPreferenceSubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                handleSubmitModalPopup={this.handleSubmitModalPopup}
                phoneNumber={phoneNumber}
                initialValues={this.initialValuesSubscribe}
                labels={myPrefrenceLabels}
              />
            )}
            {isTcpUnsubscribeModal && (
              <MyPreferenceUnsubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                handleSubmitModalPopup={this.handleSubmitModalPopup}
                phoneNumber={phoneNumber}
                labels={myPrefrenceLabels}
              />
            )}
            {isGymboreeSubscribeModal && (
              <MyPreferenceSubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                handleSubmitModalPopup={this.handleSubmitModalPopup}
                phoneNumber={phoneNumber}
                initialValues={this.initialValuesSubscribe}
                labels={myPrefrenceLabels}
              />
            )}
            {isGymboreeUnsubscribeModal && (
              <MyPreferenceUnsubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                handleSubmitModalPopup={this.handleSubmitModalPopup}
                phoneNumber={phoneNumber}
                labels={myPrefrenceLabels}
              />
            )}
          </Modal>
        )}
      </>
    );
  }
}

export const mapStateToProps = state => ({
  isTcpSubscribe: getIsTcpSubscribe(state),
  phoneNumber: getUserPhoneNumber(state),
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

MyPrefrenceContainer.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
  componentProps: PropTypes.shape({}),
  isTcpSubscribe: PropTypes.bool,
  getSubscribeStoreAction: PropTypes.func.isRequired,
  submitSubscribeBrand: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

MyPrefrenceContainer.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
  componentProps: {},
  isTcpSubscribe: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPrefrenceContainer);
