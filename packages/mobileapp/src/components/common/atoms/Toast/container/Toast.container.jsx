import React from 'react';
import { connect } from 'react-redux';
import ToastView from '../views/Toast.view';
import getToastMsgResponse from './Toast.selectors';

class ToastContainer extends React.PureComponent<Props> {
  render() {
    const { errorMessage } = this.props;
    return <ToastView errorMessage={errorMessage} />;
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: getToastMsgResponse(state),
  };
};

export default connect(mapStateToProps)(ToastContainer);
