import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '../../../../common/atoms/Anchor';

class LogOutView extends React.Component {
  constructor(props) {
    super(props);
    this.logoutApp = this.logoutApp.bind(this);
  }

  logoutApp(e) {
    e.preventDefault();
    const { triggerLogout } = this.props;
    triggerLogout();
  }

  render() {
    const { className, labels } = this.props;
    return (
      <React.Fragment className={className}>
        <Anchor
          onClick={this.logoutApp}
          noLink
          className="elem-pb-SM"
          fontSizeVariation="large"
          anchorVariation="primary"
        >
          {labels.CREATE_ACC_SIGN_OUT}
        </Anchor>
      </React.Fragment>
    );
  }
}

LogOutView.propTypes = {
  className: PropTypes.string.isRequired,
  triggerLogout: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
};

export default LogOutView;
export { LogOutView as LogOutViewVanilla };
