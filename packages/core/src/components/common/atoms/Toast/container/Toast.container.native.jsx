import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToastView from '../views/Toast.view.native';
import { getToastMsgResponse, getToastMsgPosition } from './Toast.selectors.native';
import { resetToastMsg } from './Toast.actions.native';

export class ToastContainer extends PureComponent {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    toastMessageReset: PropTypes.func.isRequired,
    errorMessagePosition: PropTypes.number,
  };

  static defaultProps = {
    errorMessagePosition: 0,
  };

  render() {
    const { errorMessage, toastMessageReset, errorMessagePosition } = this.props;
    return (
      <ToastView
        toastMessageReset={toastMessageReset}
        errorMessage={errorMessage}
        positionValue={errorMessagePosition}
      />
    );
  }
}

export const mapStateToProps = state => {
  return {
    errorMessage: getToastMsgResponse(state),
    errorMessagePosition: getToastMsgPosition(state),
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
