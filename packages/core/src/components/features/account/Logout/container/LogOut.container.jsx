import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import Router from 'next/router'; // eslint-disable-line
import { logout } from '../container/LOGOUT.actions';
import labels from './LOGOUT.labels';
import { logoutState } from './LOGOUT.selectors';
import LogOutView from '../views/LOGOUT.view';

class LogOutPageContainer extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { isUserLoggedIn, closeOverlay } = this.props;
    if (!prevProps.isUserLoggedIn && isUserLoggedIn) {
      closeOverlay();
    }
  }

  render() {
    const { onSubmit } = this.props;
    return <LogOutView onSubmit={onSubmit} labels={labels} loginErrorMessage={errorMessage} />;
  }
}

LoginPageContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: payload => {
      dispatch(login(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    showNotification: getShowNotificationState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogOutPageContainer);
