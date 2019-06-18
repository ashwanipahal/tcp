import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Image from '@tcp/core/src/components/common/atoms/Image';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import CarouselConfig from '@tcp/web/src/config/carousel';
import headerPromoStyles from '../HeaderPromo.style';

import { getIconPath } from '../../../../../utils';

const carouselConfig = CarouselConfig.PROMO_AREA_DEFAULTS;

const { HeaderPromoContainer, HeaderPromoItem, HeaderPromoItemContents } = headerPromoStyles;

const HeaderPromo = ({ className, dataPromo, mobile }) => {
  const wrapperClass = mobile ? 'header-promo-area--mobile' : 'header-promo-area--desktop';

  return (
    <HeaderPromoContainer className={className}>
      <headerIconStyles />
      {mobile && (
        <Carousel options={carouselConfig} carouselTheme="dark" className={wrapperClass}>
          {dataPromo.map((promoItem, idx) => (
            <HeaderPromoItem>
              <div className={`header-promo-item__icon header-promo-item__icon--slot${idx + 1}`}>
                <Image src={getIconPath(promoItem.class)} alt="promotion" />
              </div>
              <HeaderPromoItemContents className="header-promo-item__contents">
                <span
                  style={{ color: promoItem.promo_text.primary.color }}
                  contentEditable="true"
                  dangerouslySetInnerHTML={{ __html: promoItem.promo_text.primary.text }}
                />
                <span
                  style={{ color: promoItem.promo_text.secondary.color }}
                  dangerouslySetInnerHTML={{ __html: promoItem.promo_text.secondary.text }}
                />
              </HeaderPromoItemContents>
            </HeaderPromoItem>
          ))}
        </Carousel>
      )}
      {!mobile && (
        <Row centered className={wrapperClass}>
          {dataPromo.map((promoItem, idx) => (
            <Col
              colSize={{
                large: 4,
                medium: 8,
                small: 6,
              }}
            >
              <HeaderPromoItem>
                <div className={`header-promo-item__icon header-promo-item__icon--slot${idx + 1}`}>
                  <Image src={getIconPath(promoItem.class)} alt="promotion" />
                </div>
                <HeaderPromoItemContents className="header-promo-item__contents">
                  <span
                    style={{ color: promoItem.promo_text.primary.color }}
                    contentEditable="true"
                    dangerouslySetInnerHTML={{ __html: promoItem.promo_text.primary.text }}
                  />
                  <span
                    style={{ color: promoItem.promo_text.secondary.color }}
                    dangerouslySetInnerHTML={{ __html: promoItem.promo_text.secondary.text }}
                  />
                </HeaderPromoItemContents>
              </HeaderPromoItem>
            </Col>
          ))}
        </Row>
      )}
    </HeaderPromoContainer>
  );
};

HeaderPromo.propTypes = {
  className: PropTypes.string.isRequired,
  dataPromo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    .isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default HeaderPromo;
export { HeaderPromo as HeaderPromoVanilla };
