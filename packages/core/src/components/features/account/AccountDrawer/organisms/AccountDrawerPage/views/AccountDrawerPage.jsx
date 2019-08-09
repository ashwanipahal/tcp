import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/AccountDrawerPage.style';
import AccountDrawerHeading from '../../../molecules/AccountDrawerHeading';
import RewardsPoints from '../../../../common/organism/RewardsPoints';
import ExtraPointsTeaser from '../../../molecules/ExtraPointsTeaser';
import MyRewardsAndOffers from '../../../molecules/MyRewardsAndOffers';
import AccountDrawerBottomLinks from '../../../molecules/AccountDrawerBottomLinks';
import { isCanada } from '../../../../../../../utils';

const AccountDrawerPage = props => {
  const { className, userName } = props;
  const isCA = isCanada();
  return (
    <div className={className}>
      <AccountDrawerHeading userName={userName} />
      {!isCA && (
        <>
          <RewardsPoints />
          <ExtraPointsTeaser />
        </>
      )}
      <MyRewardsAndOffers />
      <AccountDrawerBottomLinks />
    </div>
  );
};

AccountDrawerPage.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
  userName: PropTypes.string,
};

AccountDrawerPage.defaultProps = {
  className: '',
  labels: {},
  userName: '',
};

export default withStyles(AccountDrawerPage, styles);
export { AccountDrawerPage as AccountDrawerPageVanilla };
