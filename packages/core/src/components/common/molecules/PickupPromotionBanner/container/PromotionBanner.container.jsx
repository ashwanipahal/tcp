import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import promotionBannerSelectors from './PromotionBanner.selectors';
import PromotionBanner from '../views/PromotionBanner.view';
import { getTcpSegmentValue } from '../../../../../reduxStore/selectors/session.selectors';
import { getBrand } from '../../../../../utils';

export const PromotionBannerContainer = ({
  labels,
  tcpSegmentValue,
  bossBanner,
  fullBleed,
  itemBrand = getBrand(),
  isPickupMobilePromotion,
}) => (
  <PromotionBanner
    labels={labels}
    tcpSegmentValue={tcpSegmentValue}
    bossBanner={bossBanner}
    fullBleed={fullBleed}
    itemBrand={itemBrand}
    isPickupMobilePromotion={isPickupMobilePromotion}
  />
);

export const mapStateToProps = state => {
  return {
    labels: promotionBannerSelectors.getPickupPromotionBannerLabels(state),
    tcpSegmentValue: getTcpSegmentValue(state),
  };
};

PromotionBannerContainer.propTypes = {
  bossBanner: PropTypes.bool,
  labels: PropTypes.shape({}).isRequired,
  fullBleed: PropTypes.bool,
  tcpSegmentValue: PropTypes.string.isRequired,
  itemBrand: PropTypes.string.isRequired,
  isPickupMobilePromotion: PropTypes.bool,
};

PromotionBannerContainer.defaultProps = {
  bossBanner: false,
  fullBleed: false,
  isPickupMobilePromotion: false,
};
export default connect(mapStateToProps)(PromotionBannerContainer);
