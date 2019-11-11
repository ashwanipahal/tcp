import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button, BodyCopy } from '@tcp/core/src/components/common/atoms';
import ClickTracker from '@tcp/web/src/components/common/atoms/ClickTracker';
import { getIconPath } from '@tcp/core/src/utils';
import ACCOUNT_CONSTANTS from '@tcp/core/src/components/features/account/Account/Account.constants';

const AnalyticsNavigationText = ACCOUNT_CONSTANTS.ACCOUNT_ANALYTICS.navigationText;

const GuestUserInfo = ({
  createAccount,
  login,
  openOverlay,
  triggerLoginCreateAccount,
  onLinkClick,
  userNameClick,
  isRememberedUser,
  userName,
  isDrawer,
}) => {
  const LoginLinkClick = e =>
    onLinkClick(
      {
        e,
        openOverlay,
        userNameClick,
        triggerLoginCreateAccount,
        navname: AnalyticsNavigationText.logIn,
      },
      login
    );
  return (
    <React.Fragment>
      {!isRememberedUser && (
        <>
          <ClickTracker name="create_account">
            <Button
              nohover
              type="button"
              link
              id={createAccount}
              className="create-account-header-label"
              onClick={e =>
                onLinkClick(
                  {
                    e,
                    openOverlay,
                    userNameClick,
                    triggerLoginCreateAccount,
                    navname: AnalyticsNavigationText.createAccount,
                  },
                  createAccount
                )
              }
              fontSizeVariation="large"
              anchorVariation="primary"
            >
              Create Account
            </Button>
          </ClickTracker>
          <ClickTracker name="log_in">
            <Button
              nohover
              type="button"
              link
              id={login}
              className="rightLink login-header-label"
              onClick={LoginLinkClick}
              fontSizeVariation="large"
              anchorVariation="primary"
            >
              Login
            </Button>
          </ClickTracker>
        </>
      )}

      {isRememberedUser && (
        <BodyCopy component="div" className="account-info-section">
          <ClickTracker name="log_in">
            <BodyCopy
              className="account-info user-name"
              component="div"
              role="button"
              id={login}
              onClick={LoginLinkClick}
            >
              {`Hi, ${userName}`}
            </BodyCopy>

            {!isDrawer && (
              <Image
                alt="user"
                src={getIconPath('down_arrow_icon')}
                height="6px"
                onClick={LoginLinkClick}
              />
            )}
          </ClickTracker>
        </BodyCopy>
      )}

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
  isRememberedUser: PropTypes.bool,
  userName: PropTypes.string,
};

GuestUserInfo.defaultProps = {
  isRememberedUser: false,
  userName: '',
};
export default GuestUserInfo;
