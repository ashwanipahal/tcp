import React, { Fragment } from 'react';
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
  },
};

class ToastView extends React.PureComponent<Props> {
  constructor() {
    super();
    this.toastRef = React.createRef();
  }

  render() {
    const { loginErrorMessage, loginError } = this.props;
    return (
      <Fragment>
        {loginError && this.toastRef.current.show(`${loginErrorMessage}`, DURATION.LENGTH_LONG)}
        <Toast
          ref={this.toastRef}
          style={styles.ToastStyle}
          position="top"
          positionValue={0}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.9}
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
