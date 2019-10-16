import React from 'react';
import PropTypes from 'prop-types';
import { Col, Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';

const handleUserName = userName => {
  return userName.length <= 15 ? userName : userName.substring(0, 15).concat('...');
};

const handleUserRewards = userRewards => {
  return userRewards % 1 ? userRewards : Math.floor(userRewards);
};

const AccountInfoSection = ({ userName, userPoints, userRewards, openOverlay, mainId }) => {
  return userName ? (
    <BodyCopy id={mainId} component="div" className="account-info-section">
      <Col colSize={{ small: 4, medium: 5 }}>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs14"
          className="account-info user-name"
          textAlign="left"
        >
          {`Hi, ${handleUserName(userName)}`}
        </BodyCopy>
        <BodyCopy className="account-info" component="span" fontFamily="secondary" fontSize="fs10">
          {`${userPoints} Points`}
        </BodyCopy>
        <BodyCopy
          className="account-info rightLink"
          component="span"
          fontFamily="secondary"
          fontSize="fs10"
        >
          {`$${handleUserRewards(userRewards)} Rewards`}
        </BodyCopy>
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
      id={mainId}
      component="div"
      className="account-info-section"
      fontFamily="secondary"
      fontSize="fs14"
    >
      <BodyCopy component="span" fontFamily="secondary" fontSize="fs14">
        <Anchor
          href="#"
          onClick={e => {
            e.preventDefault();
            openOverlay({
              component: 'createAccount',
              variation: 'primary',
            });
          }}
          id="createAccount"
          fontSizeVariation="large"
          anchorVariation="primary"
        >
          Create Account
        </Anchor>
      </BodyCopy>
      <BodyCopy component="span" fontFamily="secondary" fontSize="fs14">
        <Anchor
          href="#"
          noLink
          id="login"
          onClick={e => {
            e.preventDefault();
            openOverlay({
              component: 'login',
              variation: 'primary',
            });
          }}
          className="rightLink"
          fontSizeVariation="large"
          anchorVariation="primary"
        >
          Login
        </Anchor>
      </BodyCopy>
    </BodyCopy>
  );
};

AccountInfoSection.propTypes = {
  userName: PropTypes.string.isRequired,
  userPoints: PropTypes.string.isRequired,
  userRewards: PropTypes.string.isRequired,
  mainId: PropTypes.string.isRequired,
  openOverlay: PropTypes.func.isRequired,
};
export default AccountInfoSection;
