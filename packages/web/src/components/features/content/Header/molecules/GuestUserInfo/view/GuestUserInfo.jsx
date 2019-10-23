import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from '@tcp/core/src/components/common/atoms';

const GuestUserInfo = ({
  createAccount,
  login,
  openOverlay,
  triggerLoginCreateAccount,
  onLinkClick,
  userNameClick,
}) => {
  return (
    <React.Fragment>
      <Anchor
        href="#"
        noLink
        id={createAccount}
        className=""
        onClick={e =>
          onLinkClick({ e, openOverlay, userNameClick, triggerLoginCreateAccount }, createAccount)
        }
        fontSizeVariation="large"
        anchorVariation="primary"
      >
        Create Account
      </Anchor>
      <Anchor
        href="#"
        noLink
        id={login}
        className="rightLink"
        onClick={e =>
          onLinkClick({ e, openOverlay, userNameClick, triggerLoginCreateAccount }, login)
        }
        fontSizeVariation="large"
        anchorVariation="primary"
      >
        Login
      </Anchor>
    </React.Fragment>
  );
};

GuestUserInfo.propTypes = {
  createAccount: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  openOverlay: PropTypes.func.isRequired,
  userNameClick: PropTypes.bool.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  triggerLoginCreateAccount: PropTypes.bool.isRequired,
};
export default GuestUserInfo;
