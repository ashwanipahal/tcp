import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToastView from '../views/Toast.view.native';
import getToastMsgResponse from './Toast.selectors.native';
import { resetToastMsg } from './Toast.actions.native';

class ToastContainer extends PureComponent {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    toastMessageReset: PropTypes.func.isRequired,
  };

  render() {
    const { errorMessage, toastMessageReset } = this.props;
    return <ToastView toastMessageReset={toastMessageReset} errorMessage={errorMessage} />;
  }
}

export const mapStateToProps = state => {
  return {
    errorMessage: getToastMsgResponse(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    toastMessageReset: () => {
      dispatch(resetToastMsg());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToastContainer);
