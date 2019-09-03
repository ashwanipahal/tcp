import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Button from '@tcp/core/src/components/common/atoms/Button';

export const EmptyWalletRewards = ({ labels }) => {
  return (
    <>
      <Col
        colSize={{
          small: 6,
          large: 12,
          medium: 8,
        }}
      >
        <BodyCopy fontFamily="secondary" fontSize="fs14" fontWeight="regular">
          {labels.myPlaceRewards.ACC_LBL_MY_REWARDS_NO_REWARDS_MSG}
        </BodyCopy>
      </Col>
      <Col
        colSize={{
          small: 6,
          large: 2,
          medium: 3,
        }}
        className="layout-mb-XXL"
      >
        <Button
          className="elem-mt-XL"
          buttonVariation="fixed-width"
          fill="BLUE"
          color="white"
          data-locator="my-rewards-shop-now-btn"
        >
          {labels.myPlaceRewards.lbl_my_rewards_shop_now}
        </Button>
      </Col>
    </>
  );
};

EmptyWalletRewards.propTypes = {
  labels: PropTypes.shape({
    myPlaceRewards: {
      lbl_my_rewards_shop_now: PropTypes.string,
      ACC_LBL_MY_REWARDS_NO_REWARDS_MSG: PropTypes.string,
    },
  }),
};

EmptyWalletRewards.defaultProps = {
  labels: {
    myPlaceRewards: {
      lbl_my_rewards_shop_now: '',
      ACC_LBL_MY_REWARDS_NO_REWARDS_MSG: '',
    },
  },
};

export default EmptyWalletRewards;
