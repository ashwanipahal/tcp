import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/PromotionBanner.style';
import { BodyCopy, Row, Col, RichText } from '../../../atoms';
import CONSTANTS from '../../../../features/CnC/Checkout/Checkout.constants';

/**
 *
 * @function modifiedBannerText
 * @description this method replcae label's dynamic value of tcpsegment with another respective label.
 * @param {*} label
 * @returns
 * @memberof PromotionBanner
 */
const modifiedBannerText = (label, props) => {
  const { bossBanner, labels, tcpSegmentValue, itemBrand } = props;
  const brandName = itemBrand.toLowerCase();
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
  const { labels, fullBleed, className } = props;
  return (
    <div className={className}>
      {fullBleed ? (
        <div className="fullBleedBanner">
          <Row className="banner">
            <Col
              key="productDetails"
              className="pickUp"
              colSize={{ small: 6, medium: 8, large: 12 }}
              textAlign="center"
            >
              <BodyCopy
                dataLocator="addedtobag-bossbanner"
                tag="span"
                fontSize="fs12"
                textAlign="center"
                className="addedtobag-bossbanner"
              >
                <RichText
                  richTextHtml={modifiedBannerText(labels.lbl_fullBleed_banner_boss_text, props)}
                />
              </BodyCopy>
            </Col>
          </Row>
        </div>
      ) : (
        <div className="banner-wrapper">
          <div className="triangle-left" />
          <div className="promo-wrapper">
            <div className="richtextCss">
              <RichText richTextHtml={modifiedBannerText(labels.lbl_banner_boss_text, props)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PromotionBanner.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  fullBleed: PropTypes.bool,
  className: PropTypes.string.isRequired,
};

PromotionBanner.defaultProps = {
  fullBleed: false,
};

export default withStyles(PromotionBanner, styles);
export { PromotionBanner as PromotionBannerVanilla };
