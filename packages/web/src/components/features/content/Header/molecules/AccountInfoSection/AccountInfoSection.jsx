import React from 'react';
import PropTypes from 'prop-types';
import { Col, Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import LoggedInUserInfo from '../LoggedInUserInfo/LoggedInUserInfo';
import GuestUserInfo from '../GuestUserInfo/GuestUserInfo';

const AccountInfoSection = ({
  userName,
  userPoints,
  userRewards,
  openOverlay,
  userNameClick,
  onLinkClick,
  triggerLoginCreateAccount,
}) => {
  return userName ? (
    <BodyCopy id="sideNavUserInfo" component="div" className="account-main-section">
      <Col colSize={{ small: 4, medium: 5 }}>
        <LoggedInUserInfo
          mainId="accountDrawer"
          userName={userName}
          userPoints={userPoints}
          userRewards={userRewards}
          userNameClick={userNameClick}
          openOverlay={openOverlay}
          onLinkClick={onLinkClick}
          isDrawer
        />
      </Col>
      <Col colSize={{ small: 2, medium: 3 }}>
        <BodyCopy
          className="manage-account"
          component="span"
          fontFamily="secondary"
          fontSize="fs10"
          textAlign="right"
        >
          <Anchor underline to="/account?id=account-overview" asPath="/account">
            Manage account
          </Anchor>
        </BodyCopy>
      </Col>
    </BodyCopy>
  ) : (
    <BodyCopy
      id="sideNavUserInfo"
      component="div"
      className="account-main-section"
      fontFamily="secondary"
      fontSize="fs14"
    >
      <GuestUserInfo
        createAccount="createAccount"
        login="login"
        triggerLoginCreateAccount={triggerLoginCreateAccount}
        onLinkClick={onLinkClick}
        openOverlay={openOverlay}
      />
    </BodyCopy>
  );
};

AccountInfoSection.propTypes = {
  userName: PropTypes.string.isRequired,
  userPoints: PropTypes.string.isRequired,
  userRewards: PropTypes.string.isRequired,
  openOverlay: PropTypes.func.isRequired,
  userNameClick: PropTypes.bool.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  triggerLoginCreateAccount: PropTypes.bool.isRequired,
};
export default AccountInfoSection;
