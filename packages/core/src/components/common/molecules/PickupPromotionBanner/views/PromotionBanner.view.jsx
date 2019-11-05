import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import styles, { fullBleedBannerStyle } from '../styles/PromotionBanner.style';
import { BodyCopy, Row, Col } from '../../../atoms';
import { getBrand } from '../../../../../utils';

class PromotionBanner extends React.PureComponent {
  modifiedBannerText(label) {
    const brandName = getBrand();
    const { bossBanner, labels, tcpSegmentValue } = this.props;
    const pickupType = bossBanner ? 'boss' : 'bopis';
    return label.replace(
      /\$tcpSegmentValue\$/,
      labels[`lbl_banner_${pickupType}_disc_${brandName}_${tcpSegmentValue}`]
        ? labels[`lbl_banner_${pickupType}_disc_${brandName}_${tcpSegmentValue}`]
        : labels[`lbl_banner_${pickupType}_disc_${brandName}_default`]
    );
  }

  render() {
    const { labels, fullBleed } = this.props;

    return (
      <>
        {fullBleed ? (
          <fullBleedBannerStyle>
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
                  fontWeight={['semibold']}
                  textAlign="center"
                >
                  {this.modifiedBannerText(labels.lbl_fullBleed_banner_boss_text)}
                </BodyCopy>
              </Col>
            </Row>
          </fullBleedBannerStyle>
        ) : (
          <div className="banner-wrapper">
            <div className="triangle-left" />
            <div className="promo-wrapper">
              <BodyCopy fontSize="fs10" fontFamily="primary" fontWeight="black">
                {this.modifiedBannerText(labels.lbl_banner_boss_text)}
              </BodyCopy>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withStyles(PromotionBanner, styles);
export { PromotionBanner as PromotionBannerVanilla };
