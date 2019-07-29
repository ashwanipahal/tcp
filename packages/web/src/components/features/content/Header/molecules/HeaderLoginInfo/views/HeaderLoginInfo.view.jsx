import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Anchor } from '@tcp/core/src/components/common/atoms';

export const HeaderLoginInfo = ({ userName, labels }) => {
  if(userName) {
    return <BodyCopy textAlign="right">{`${labels.ACC_LBL_USER_HI_LABEL} ${userName}`}</BodyCopy>
  }

  return (
    <BodyCopy textAlign="right" component="div">
      <Anchor anchorVariation="primary" to="/us/login">{labels.ACC_LBL_USER_LOGIN_LABEL}</Anchor>
    </BodyCopy>
  );
}

HeaderLoginInfo.propTypes = {
  labels: PropTypes.shape({}),
  userName: PropTypes.string,
}

HeaderLoginInfo.defaultProps = {
  labels: {
    ACC_LBL_USER_HI_LABEL: 'Hi,',
    ACC_LBL_USER_LOGIN_LABEL: 'Log In'
  },
  userName: ''
}

export default HeaderLoginInfo;
