import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/MyRewardsAndOffers.style';

const MyRewardsAndOffers = className => {
  return <div className={className}>FPO - Offers and Coupons</div>;
};

MyRewardsAndOffers.propTypes = {
  labels: PropTypes.shape({}),
};

MyRewardsAndOffers.defaultProps = {
  labels: {
    CREATE_ACC_LBL_HIDE: 'hide',
  },
};

export default withStyles(MyRewardsAndOffers, styles);
export { MyRewardsAndOffers as MyRewardsAndOffersVanilla };
