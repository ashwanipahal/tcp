import React from 'react';
import PropTypes from 'prop-types';
import { Image, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getIconPath, isCanada } from '@tcp/core/src/utils';
import ClickTracker from '@tcp/web/src/components/common/atoms/ClickTracker';
import ACCOUNT_CONSTANTS from '@tcp/core/src/components/features/account/Account/Account.constants';

const handleUserName = userName => {
  return userName.length <= 15 ? userName : userName.substring(0, 15).concat('...');
};

const handleUserRewards = userRewards => {
  return userRewards % 1 ? userRewards : Math.floor(userRewards);
};

const handleCarrottoggle = isOpenOverlay => {
  return !isOpenOverlay ? 'carrot-down-icon' : 'carrot-up-icon';
};

const LoggedInUserInfo = ({
  mainId,
  userName,
  userPoints,
  userRewards,
  openOverlay,
  isOpenOverlay,
  userNameClick,
  onLinkClick,
  isDrawer,
}) => {
  const linkClick = e =>
    onLinkClick(
      {
        e,
        openOverlay,
        userNameClick,
        navname: ACCOUNT_CONSTANTS.ACCOUNT_ANALYTICS.navigationText.welcomeMsg,
      },
      mainId
    );
  return (
    <React.Fragment>
      <ClickTracker name="welcome_message">
        <BodyCopy
          component="div"
          id={mainId}
          className="account-info-section"
          onClick={linkClick}
          tabIndex="0"
        >
          <BodyCopy className="account-info user-name" component="div" role="button">
            {`Hi, ${handleUserName(userName)}`}
          </BodyCopy>
          {!isDrawer ? (
            <Image
              alt="user"
              className={`account-info ${handleCarrottoggle(isOpenOverlay)}`}
              src={getIconPath('down_arrow_icon')}
              height="6px"
            />
          ) : null}
          {!isCanada() ? (
            <BodyCopy component="div">
              <div
                className="account-info user-points"
                id="account-info-user-points"
              >{`${userPoints} Points`}</div>
              <span className="account-info user-rewards rightLink">
                {`$${handleUserRewards(userRewards)} Rewards`}
              </span>
            </BodyCopy>
          ) : null}
          {!isDrawer ? (
            <Image
              alt="user"
              className="usericon"
              src={getIconPath('user-icon')}
              onClick={linkClick}
            />
          ) : null}
        </BodyCopy>
      </ClickTracker>
    </React.Fragment>
  );
};

LoggedInUserInfo.propTypes = {
  userName: PropTypes.string.isRequired,
  userPoints: PropTypes.string.isRequired,
  userRewards: PropTypes.string.isRequired,
  userNameClick: PropTypes.bool.isRequired,
  isOpenOverlay: PropTypes.bool.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  mainId: PropTypes.string.isRequired,
  openOverlay: PropTypes.func.isRequired,
  isDrawer: PropTypes.bool.isRequired,
};

export default LoggedInUserInfo;
