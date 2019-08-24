import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '../../../../../../common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/ProfileInfoTile.style';

import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';

const ProfileInfoTile = () => {
  return (
    <AccountOverviewTile
      title="Profile Information"
      ctaTitle="View Profile"
      ctaLink="/account?id=address-book"
      ctaPath="/account/address-book"
    >
      <BodyCopy component="div" fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
        Profile Info Section
      </BodyCopy>
    </AccountOverviewTile>
  );
};

ProfileInfoTile.propTypes = {
  labels: PropTypes.shape({}),
};

ProfileInfoTile.defaultProps = {
  labels: {},
};

export default withStyles(ProfileInfoTile, styles);
