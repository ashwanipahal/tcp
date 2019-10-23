import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Button from '@tcp/core/src/components/common/atoms/Button';
import utils from '@tcp/core/src/utils';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import internalEndpoints from '../../../internalEndpoints';

const goToHomePage = () => {
  utils.routerPush(internalEndpoints.shopNowPage.link, internalEndpoints.shopNowPage.path);
  return null;
};

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
          {getLabelValue(labels, 'ACC_LBL_MY_REWARDS_NO_REWARDS_MSG', 'placeRewards')}
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
          onClick={goToHomePage}
          data-locator="my-rewards-shop-now-btn"
        >
          {getLabelValue(labels, 'lbl_my_rewards_shop_now', 'placeRewards')}
        </Button>
      </Col>
    </>
  );
};

EmptyRewards.propTypes = {
  labels: PropTypes.shape({
    placeRewards: {
      lbl_my_rewards_shop_now: PropTypes.string,
      ACC_LBL_MY_REWARDS_NO_REWARDS_MSG: PropTypes.string,
    },
  }),
};

EmptyRewards.defaultProps = {
  labels: {
    placeRewards: {
      lbl_my_rewards_shop_now: '',
      ACC_LBL_MY_REWARDS_NO_REWARDS_MSG: '',
    },
  },
};

export default EmptyRewards;
