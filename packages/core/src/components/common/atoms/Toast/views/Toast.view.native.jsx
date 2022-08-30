import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';
import colors from '@tcp/core/styles/themes/TCP/colors';
import { ToastWrapper, ToastCross, ToastText } from './ToastMsg.style.native';
import { DEFAULT_TOAST_ERROR_MESSAGE_TTL } from '../../../../../config/site.config';
import Toast from './Toast.native';

/**
 * @param {object} props : Props for FPO
 * This Toast notification component which can be used as a for global error notification
 */

const styles = {
  Container: {
    zIndex: 2,
  },
  ToastStyle: {
    backgroundColor: colors.BLACK,
    width: '100%',
    borderRadius: 0,
    padding: 20,
  },
};

class ToastView extends React.PureComponent {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    toastMessageReset: PropTypes.bool.isRequired,
    positionValue: PropTypes.number,
    shouldShowSafeArea: PropTypes.bool,
  };

  static defaultProps = {
    positionValue: 0,
    shouldShowSafeArea: true,
  };

  constructor() {
    super();
    this.toastRef = React.createRef();
  }

  componentDidUpdate() {
    const { errorMessage, toastMessageReset } = this.props;
    if (errorMessage) {
      this.toastRef.current.show(
        <SafeAreaView>
          <ToastWrapper>
            <ToastText>{errorMessage}</ToastText>
            <ToastCross onPress={this.cancelToast}>X</ToastCross>
          </ToastWrapper>
        </SafeAreaView>,
        500,
        () => {
          toastMessageReset();
        }
      );
    }
  }

  cancelToast = () => {
    this.toastRef.current.closeImmediately();
  };

  toast = () => {
    const { positionValue } = this.props;
    return (
      <Toast
        ref={this.toastRef}
        style={styles.ToastStyle}
        position="top"
        positionValue={positionValue}
        fadeInDuration={750}
        fadeOutDuration={DEFAULT_TOAST_ERROR_MESSAGE_TTL}
        opacity={1}
        textStyle={{ color: colors.WHITE }}
      />
    );
  };

  render() {
    const { shouldShowSafeArea } = this.props;
    return shouldShowSafeArea ? (
      <SafeAreaView style={styles.Container}>{this.toast()}</SafeAreaView>
    ) : (
      this.toast()
    );
  }
}

export default ToastView;
