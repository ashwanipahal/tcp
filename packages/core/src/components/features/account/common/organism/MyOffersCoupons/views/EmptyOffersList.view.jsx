import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { routerPush } from '@tcp/core/src/utils';
import withStyles from '../../../../../../common/hoc/withStyles';
import internalEndpoints from '../../../internalEndpoints';
import styles from '../styles/MyOffersCoupons.view.style';

/**
 * This component will render EmptyOffersList component
 * @param { string, object }
 */
export const EmptyOffersList = ({ className, commonLabels, closedOverlay }) => {
  /**
   * This function will handle click to go to homepage
   * @param {} -
   */
  const goToHomePage = () => {
    routerPush(internalEndpoints.shopNowPage.link, internalEndpoints.shopNowPage.path);
    closedOverlay();
  };

  return (
    <BodyCopy className={className}>
      <BodyCopy
        dataLocator="rewards-no-rewards-info"
        fontFamily="secondary"
        fontSize="fs14"
        component="p"
        fontWeight="regular"
        className="elem-mb-LRG"
      >
        {getLabelValue(commonLabels, 'lbl_my_rewards_emptySupportingText', 'placeRewards')}
      </BodyCopy>
      <BodyCopy component="div" className="coupon_viewall_tile elem-mb-LRG">
        <Button
          className="coupon_button_black"
          buttonVariation="variable-width"
          type="submit"
          onClick={goToHomePage}
          data-locator="my-rewards-shop-now-btn"
        >
          {getLabelValue(commonLabels, 'lbl_my_rewards_shop_now', 'placeRewards')}
        </Button>
      </BodyCopy>
    </BodyCopy>
  );
};

EmptyOffersList.propTypes = {
  className: PropTypes.string,
  closedOverlay: PropTypes.func,
  commonLabels: PropTypes.shape({}).isRequired,
};

EmptyOffersList.defaultProps = {
  className: '',
  closedOverlay: () => {},
};

export default withStyles(EmptyOffersList, styles);
