import React, { Fragment } from 'react';
import { SafeAreaView } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import colors from '@tcp/core/styles/themes/TCP/colors';

/**
 * @param {object} props : Props for FPO
 * This Toast notification component which can be used as a for global error notification
 */

const styles = {
  ToastStyle: {
    backgroundColor: colors.BLACK,
    width: '100%',
    borderRadius: 0,
    padding: 20,
    zIndex: 1000,
  },
};

class ToastView extends React.PureComponent<Props> {
  constructor() {
    super();
    this.toastRef = React.createRef();
    debugger;
  }

  render() {
    debugger;
    const { errorMessage } = this.props;
    const isErrorAvailable = errorMessage ? true : false;
    return (
      <SafeAreaView>
        <Fragment>
          {isErrorAvailable && this.toastRef.current.show(`${errorMessage}`, DURATION.LENGTH_LONG)}
          <Toast
            ref={this.toastRef}
            style={styles.ToastStyle}
            position="top"
            positionValue={200}
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={1}
            textStyle={{ color: colors.WHITE }}
          />
        </Fragment>
      </SafeAreaView>
    );
  }
}

ToastView.defaultProps = {
  text: '',
};

export default ToastView;
