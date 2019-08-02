import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '../../../../common/atoms/Anchor';

class LogOutView extends React.Component {
  logoutApp = () => {
    const { triggerLogout } = this.props;
    triggerLogout();
  };

  render() {
    const { className } = this.props;
    return (
      <React.Fragment className={className}>
        <div>
          <Anchor
            onClick={this.logoutApp}
            className="elem-pb-SM"
            fontSizeVariation="xlarge"
            anchorVariation="secondary"
            to="/account?id=address-book"
            data-locator="addnewaddress-back"
          >
            logout container
          </Anchor>
        </div>
      </React.Fragment>
    );
  }
}

LogOutView.propTypes = {
  className: PropTypes.string.isRequired,
  triggerLogout: PropTypes.string.isRequired,
};

export default LogOutView;
