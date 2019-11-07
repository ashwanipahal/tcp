import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getIconPath } from '@tcp/core/src/utils';

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
  return (
    <React.Fragment>
      {!isRememberedUser && (
        <>
          <Button
            nohover
            type="button"
            link
            id={createAccount}
            className="create-account-header-label"
            onClick={e =>
              onLinkClick(
                { e, openOverlay, userNameClick, triggerLoginCreateAccount },
                createAccount
              )
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
        </>
      )}

      {isRememberedUser && (
        <BodyCopy component="div" className="account-info-section">
          <BodyCopy
            className="account-info user-name"
            component="div"
            role="button"
            id={login}
            onClick={e =>
              onLinkClick({ e, openOverlay, userNameClick, triggerLoginCreateAccount }, login)
            }
          >
            {`Hi, ${userName}`}
          </BodyCopy>

          {!isDrawer && (
            <Image
              alt="user"
              src={getIconPath('down_arrow_icon')}
              height="6px"
              onClick={e =>
                onLinkClick({ e, openOverlay, userNameClick, triggerLoginCreateAccount }, login)
              }
            />
          )}
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
