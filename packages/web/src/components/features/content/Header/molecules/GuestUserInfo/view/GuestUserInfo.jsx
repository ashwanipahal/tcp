import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button } from '@tcp/core/src/components/common/atoms';
import { getIconPath } from '@tcp/core/src/utils';

const GuestUserInfo = ({
  createAccount,
  login,
  openOverlay,
  triggerLoginCreateAccount,
  onLinkClick,
  userNameClick,
  isDrawer,
}) => {
  return (
    <React.Fragment>
      <Button
        nohover
        type="button"
        link
        id={createAccount}
        className="create-account-header-label"
        onClick={e =>
          onLinkClick({ e, openOverlay, userNameClick, triggerLoginCreateAccount }, createAccount)
        }
        fontSizeVariation="large"
        anchorVariation="primary"
      >
        Create Account
      </Button>
      <Button
        nohover
        type="button"
        link
        id={login}
        className="rightLink login-header-label"
        onClick={e =>
          onLinkClick({ e, openOverlay, userNameClick, triggerLoginCreateAccount }, login)
        }
        fontSizeVariation="large"
        anchorVariation="primary"
      >
        Login
      </Button>

      {!isDrawer ? (
        <Image
          alt="user"
          className="usericon"
          src={getIconPath('user-icon')}
          onClick={e =>
            onLinkClick({ e, openOverlay, userNameClick, triggerLoginCreateAccount }, login)
          }
        />
      ) : null}
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
  isDrawer: PropTypes.bool.isRequired,
};
export default GuestUserInfo;
