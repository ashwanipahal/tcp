import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Image from '@tcp/core/src/components/common/atoms/Image';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import CarouselConfig from '@tcp/web/src/config/carousel';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import headerPromoStyles from '../HeaderPromo.style';
import { getIconPath } from '../../../../../utils';

const carouselConfig = CarouselConfig.PROMO_AREA_DEFAULTS;

const HeaderPromo = ({ className, dataPromo, mobile }) => {
  const wrapperClass = mobile ? 'header-promo-area--mobile' : 'header-promo-area--desktop';

  return (
    <div className={`header-promo__container ${className}`}>
      {mobile && (
        <Carousel options={carouselConfig} carouselTheme="dark" className={wrapperClass}>
          {dataPromo.map(promoItem => (
            <div className="header-promo__item">
              <div className={`header-promo-item__icon ${promoItem.linkClass.class}`}>
                <Image src={getIconPath(promoItem.linkClass.class)} alt="promotion" />
              </div>
              <div className="header-promo-item__content">
                <span
                  className={`styled-text ${promoItem.textLines[0].style}`}
                  contentEditable="true"
                  dangerouslySetInnerHTML={{ __html: promoItem.textLines[0].text }}
                />
                <span
                  className={`styled-text-line ${promoItem.textLines[1].style}`}
                  dangerouslySetInnerHTML={{ __html: promoItem.textLines[1].text }}
                />
              </div>
            </div>
          ))}
        </Carousel>
      )}
      {!mobile && (
        <Row centered className={wrapperClass}>
          {dataPromo.map(promoItem => (
            <Col
              colSize={{
                large: 4,
                medium: 8,
                small: 6,
              }}
            >
              <div className="header-promo__item">
                <div className={`header-promo-item__icon ${promoItem.linkClass.class}`}>
                  <Image src={getIconPath(promoItem.linkClass.class)} alt="promotion" />
                </div>
                <div className="header-promo-item__content">
                  <span
                    className={`styled-text ${promoItem.textLines[0].style}`}
                    contentEditable="true"
                    dangerouslySetInnerHTML={{ __html: promoItem.textLines[0].text }}
                  />
                  <span
                    className={`styled-text-line ${promoItem.textLines[1].style}`}
                    dangerouslySetInnerHTML={{ __html: promoItem.textLines[1].text }}
                  />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

HeaderPromo.propTypes = {
  className: PropTypes.string.isRequired,
  dataPromo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    .isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default withStyles(HeaderPromo, headerPromoStyles);
export { HeaderPromo as HeaderPromoVanilla };
