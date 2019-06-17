import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Image from '@tcp/core/src/components/common/atoms/Image';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import CarouselConfig from '@tcp/web/src/config/carousel';
import headerPromoStyles, { headerIconStyles } from '../HeaderPromo.style';

import { getIconPath } from '../../../../../utils';

const carouselConfig = CarouselConfig.PROMO_AREA_DEFAULTS;

const { HeaderPromoContainer, HeaderPromoItem, HeaderPromoItemContents } = headerPromoStyles;

const HeaderPromo = ({ className, dataPromo }) => {
  return (
    <HeaderPromoContainer>
      <Row>
        {dataPromo.map((promoItem, idx) => (
          <Col
            className={`header-promo__promo-banner header-promo__promo-banner--slot${idx + 1}`}
            colSize={{
              large: 4,
              medium: 8,
              small: 6,
            }}
          >
            <HeaderPromoItem className={className}>
              <div className="header-promo-item__icon">
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
    </HeaderPromoContainer>
  );
};

HeaderPromo.propTypes = {
  className: PropTypes.string.isRequired,
  dataPromo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    .isRequired,
};

export default withStyles(HeaderPromo, headerIconStyles);
export { HeaderPromo as HeaderPromoVanilla };
