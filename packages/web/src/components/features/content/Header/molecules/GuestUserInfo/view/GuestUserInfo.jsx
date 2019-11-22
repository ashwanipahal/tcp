import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button, BodyCopy } from '@tcp/core/src/components/common/atoms';
import ClickTracker from '@tcp/web/src/components/common/atoms/ClickTracker';
import { getIconPath, isCanada } from '@tcp/core/src/utils';
import ACCOUNT_CONSTANTS from '@tcp/core/src/components/features/account/Account/Account.constants';

const AnalyticsNavigationText = ACCOUNT_CONSTANTS.ACCOUNT_ANALYTICS.navigationText;

const handleUserRewards = userRewards => {
  return userRewards % 1 ? userRewards : Math.floor(userRewards);
};

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
  userPoints,
  userRewards,
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
        <BodyCopy component="div" className="account-info-section" tabIndex="0">
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
                className="account-info"
                src={getIconPath('down_arrow_icon')}
                height="6px"
                onClick={LoginLinkClick}
              />
            )}

            {!isCanada() ? (
              <BodyCopy component="div">
                <div className="account-info user-points">{`${userPoints} Points`}</div>
                <span className="account-info user-rewards rightLink">
                  {`$${handleUserRewards(userRewards)} Rewards`}
                </span>
              </BodyCopy>
            ) : null}
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
  userPoints: PropTypes.string.isRequired,
  userRewards: PropTypes.string.isRequired,
};

GuestUserInfo.defaultProps = {
  isRememberedUser: false,
  userName: '',
};
export default GuestUserInfo;
