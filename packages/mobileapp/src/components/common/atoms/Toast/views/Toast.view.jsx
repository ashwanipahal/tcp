import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
      this.toastRef.current.show(`${errorMessage}`, 500, () => {
        toastMessageReset();
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Toast
          ref={this.toastRef}
          style={styles.ToastStyle}
          position="top"
          positionValue={20}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={1}
          textStyle={{ color: colors.WHITE }}
        />
      </Fragment>
    );
  }
}

export default ToastView;
