import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Button from '@tcp/core/src/components/common/atoms/Button';
import utils from '@tcp/core/src/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/EmptyWalletRewards.styles';
import internalEndpoints from '../../../internalEndpoints';

const goToHomePage = () => {
  utils.routerPush(internalEndpoints.shopNowPage.link, internalEndpoints.shopNowPage.path);
  return null;
};

export const EmptyWalletRewards = ({ labels, className }) => {
  return (
    <BodyCopy className={className}>
      <Col
        colSize={{
          small: 6,
          large: 12,
          medium: 8,
        }}
      >
        <BodyCopy fontFamily="secondary" fontSize="fs14" fontWeight="regular">
          {labels.placeRewards.ACC_LBL_MY_REWARDS_NO_REWARDS_MSG}
        </BodyCopy>
      </Col>
      <Col
        colSize={{
          small: 6,
          large: 2,
          medium: 3,
        }}
      >
        <Button
          className="elem-mt-XL shopNowButton"
          buttonVariation="fixed-width"
          fill="BLUE"
          color="white"
          onClick={goToHomePage}
          data-locator="my-rewards-shop-now-btn"
        >
          {labels.placeRewards.lbl_my_rewards_shop_now}
        </Button>
      </Col>
    </BodyCopy>
  );
};

EmptyWalletRewards.propTypes = {
  labels: PropTypes.shape({
    placeRewards: {
      lbl_my_rewards_shop_now: PropTypes.string,
      ACC_LBL_MY_REWARDS_NO_REWARDS_MSG: PropTypes.string,
    },
  }),
  className: PropTypes.string,
};

EmptyWalletRewards.defaultProps = {
  labels: {
    placeRewards: {
      lbl_my_rewards_shop_now: '',
      ACC_LBL_MY_REWARDS_NO_REWARDS_MSG: '',
    },
  },
  className: '',
};

export default withStyles(EmptyWalletRewards, styles);
