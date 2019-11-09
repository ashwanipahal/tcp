import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';
import withStyles from '../../../hoc/withStyles';
import { RichText } from '../../../atoms';
import { getBrand } from '../../../../../utils';
import CONSTANTS from '../../../../features/CnC/Checkout/Checkout.constants';
import {
  FullBleedBannerStyle,
  TriangleBanner,
  LeftTriangle,
  TriangleBannerText,
} from '../styles/PromotionBanner.style.native';

/**
 *
 * @function modifiedBannerText
 * @description this method replcae label's dynamic value of tcpsegment with another respective label.
 * @param {*} label
 * @returns
 * @memberof PromotionBanner
 */
export const modifiedBannerText = (label, props) => {
  const brandName = getBrand();
  const { bossBanner, labels, tcpSegmentValue } = props;
  const pickupType = bossBanner
    ? CONSTANTS.ORDER_ITEM_TYPE.BOSS.toLowerCase()
    : CONSTANTS.ORDER_ITEM_TYPE.BOPIS.toLowerCase();
  const labelKey = label.replace(
    /\$tcpSegmentValue\$/,
    labels[`lbl_banner_${pickupType}_disc_${brandName}_${tcpSegmentValue}`]
      ? labels[`lbl_banner_${pickupType}_disc_${brandName}_${tcpSegmentValue}`]
      : labels[`lbl_banner_${pickupType}_disc_${brandName}_default`]
  );
  return getLabelValue(labels, labelKey);
};

const PromotionBanner = props => {
  const { labels, fullBleed } = props;
  return (
    <>
      {fullBleed ? (
        <FullBleedBannerStyle>
          <RichText
            source={{
              html: `<html><header><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'> </header><body>${modifiedBannerText(
                labels.lbl_fullBleed_banner_boss_text,
                props
              )}</body></html>`,
            }}
          />
        </FullBleedBannerStyle>
      ) : (
        <TriangleBanner>
          <LeftTriangle />
          <TriangleBannerText>
            <RichText
              source={{
                html: `<html><header><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'> </header><body>${modifiedBannerText(
                  labels.lbl_banner_boss_text,
                  props
                )}</body></html>`,
              }}
            />
          </TriangleBannerText>
        </TriangleBanner>
      )}
    </>
  );
};

PromotionBanner.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  fullBleed: PropTypes.bool,
};

PromotionBanner.defaultProps = {
  fullBleed: false,
};

export default withStyles(PromotionBanner);
export { PromotionBanner as PromotionBannerVanilla };
