import React, { Fragment } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-easy-toast';
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
    position: 'relative',
  },
};

class ToastView extends React.PureComponent<Props> {
  constructor() {
    super();
    this.toastRef = React.createRef();
  }

  render() {
    const { errorMessage, toastMessageReset } = this.props;
    return (
      <Fragment>
        {errorMessage &&
          this.toastRef.current.show(`${errorMessage}`, 500, () => {
            Alert.alert('hello close');
            toastMessageReset();
          })}
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
    );
  }
}

ToastView.defaultProps = {
  text: '',
};

export default ToastView;
