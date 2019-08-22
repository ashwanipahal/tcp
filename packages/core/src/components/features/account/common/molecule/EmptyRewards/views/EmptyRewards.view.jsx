import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Col from '../../../../../../common/atoms/Col';
import Button from '../../../../../../common/atoms/Button';

export const EmptyRewards = ({ labels }) => {
  return (
    <>
      <Col
        colSize={{
          small: 4,
          large: 12,
          medium: 8,
        }}
        offsetLeft={{ large: 0, small: 1, medium: 0 }}
      >
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          className="no-rewards-msg"
          data-locator="no_rewards_msg"
        >
          {labels.myPlaceRewards.ACC_LBL_MY_REWARDS_NO_REWARDS_MSG}
        </BodyCopy>
      </Col>
      <Col
        colSize={{
          small: 6,
          large: 2,
          medium: 4,
        }}
        offsetLeft={{ large: 4, small: 0, medium: 2 }}
        className="shop-now-btn-wrapper"
      >
        <Button
          buttonVariation="fixed-width"
          fill="BLUE"
          color="white"
          className="shop-now-btn"
          data-locator="my-rewards-shop-now-btn"
        >
          {labels.myPlaceRewards.ACC_LBL_MY_REWARDS_SHOP_NOW}
        </Button>
      </Col>
    </>
  );
};

EmptyRewards.propTypes = {
  labels: PropTypes.string.isRequired,
};

export default EmptyRewards;
