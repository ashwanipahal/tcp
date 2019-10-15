import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import MyPrefrence from '../views';
import { getIsTcpSubscribe } from './MyPreference.selectors';
import MyPreferenceSubscribeModal from '../organism/TcpSubscribeModal/MyPreferenceSubscribeModal.view';
import MyPreferenceUnsubscribeModal from '../organism/TcpUnsubscribeModal/MyPreferenceUnsubscribeModal.view';

const getMyPrefrenceLabels = labels => {
  return (labels && labels.preferences) || {};
};

export class MyPrefrenceContainer extends PureComponent {
  constructor(props) {
    super(props);
    const { labels, ...otherProps } = this.props;
    this.initialValues = this.getInitialValues(otherProps);
    this.state = {
      modalVisible: false,
      isTcpSubscribeModal: false,
      isTcpUnsubscribeModal: false,
      isGymboreeSubscribeModal: false,
      isGymboreeUnsubscribeModal: false,
    };
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

  getInitialValues = props => {
    const { tcpWebSubscribe } = props;
    return { tcpWebSubscribe };
  };

  handleSubmitModalPopup = data => {
    console.log('handleSubmit by furkan');
    console.log(data);
    console.log('handleSubmit by furkan');
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
    const { labels, handleComponentChange, componentProps, isTcpSubscribe } = this.props;
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
          initialValues={this.initialValues}
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
              />
            )}
            {isTcpUnsubscribeModal && (
              <MyPreferenceUnsubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                handleSubmitModalPopup={this.handleSubmitModalPopup}
              />
            )}
            {isGymboreeSubscribeModal && (
              <MyPreferenceSubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                handleSubmitModalPopup={this.handleSubmitModalPopup}
              />
            )}
            {isGymboreeUnsubscribeModal && (
              <MyPreferenceUnsubscribeModal
                onRequestClose={this.handlePopupSubscribeModal}
                handleSubmitModalPopup={this.handleSubmitModalPopup}
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
});

MyPrefrenceContainer.propTypes = {
  labels: PropTypes.shape({}),
  handleComponentChange: PropTypes.func,
  componentProps: PropTypes.shape({}),
  isTcpSubscribe: PropTypes.bool,
};

MyPrefrenceContainer.defaultProps = {
  labels: {},
  handleComponentChange: () => {},
  componentProps: {},
  isTcpSubscribe: false,
};

export default connect(mapStateToProps)(MyPrefrenceContainer);
