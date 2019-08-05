import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/AccountDrawerPage.style';
import AccountDrawerHeading from '../../../molecules/AccountDrawerHeading';
import CurrentPointSlider from '../../../molecules/CurrentPointSlider';
import ExtraPointsTeaser from '../../../molecules/ExtraPointsTeaser';
import MyRewardsAndOffers from '../../../molecules/MyRewardsAndOffers';
import AccountDrawerBottomLinks from '../../../molecules/AccountDrawerBottomLinks';

const AccountDrawerPage = props => {
  const { className } = props;
  return (
    <div className={className}>
      <AccountDrawerHeading />
      <CurrentPointSlider />
      <ExtraPointsTeaser />
      <MyRewardsAndOffers />
      <AccountDrawerBottomLinks />
    </div>
  );
};

AccountDrawerPage.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
};

AccountDrawerPage.defaultProps = {
  className: '',
  labels: {},
};

export default withStyles(AccountDrawerPage, styles);
export { AccountDrawerPage as AccountDrawerPageVanilla };
