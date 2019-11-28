import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './LogOut.actions';
import LogOutView from '../views/LogOut.view';

class LogOutPageContainer extends React.PureComponent {
  render() {
    const { triggerLogout, underline, labels } = this.props;
    return <LogOutView underline={underline} triggerLogout={triggerLogout} labels={labels} />;
  }
}

LogOutPageContainer.propTypes = {
  triggerLogout: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  underline: PropTypes.bool,
};

LogOutPageContainer.defaultProps = {
  underline: false,
};

export const mapDispatchToProps = dispatch => {
  return {
    triggerLogout: payload => {
      dispatch(logout(payload));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LogOutPageContainer);
export { LogOutPageContainer as LogOutPageContainerVanilla };
