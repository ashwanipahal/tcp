import React from 'react';
import PropTypes from 'prop-types';
import { View, SafeAreaView } from 'react-native';
import Toast from 'react-native-easy-toast';
import colors from '@tcp/core/styles/themes/TCP/colors';
import { ToastWrapper, ToastCross, ToastText } from './ToastMsg.style.native';
import { DEFAULT_TOAST_ERROR_MESSAGE_TTL } from '../../../../../config/site.config';

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
  };

  constructor() {
    super();
    this.toastRef = React.createRef();
  }

  componentDidUpdate() {
    const { errorMessage, toastMessageReset } = this.props;
    if (errorMessage) {
      this.toastRef.current.show(
        <View>
          <ToastWrapper>
            <ToastText>{errorMessage}</ToastText>
            <ToastCross>X</ToastCross>
          </ToastWrapper>
        </View>,
        500,
        () => {
          toastMessageReset();
        }
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.Container}>
        <Toast
          ref={this.toastRef}
          style={styles.ToastStyle}
          position="top"
          positionValue={0}
          fadeInDuration={750}
          fadeOutDuration={DEFAULT_TOAST_ERROR_MESSAGE_TTL}
          opacity={1}
          textStyle={{ color: colors.WHITE }}
        />
      </SafeAreaView>
    );
  }
}

export default ToastView;
