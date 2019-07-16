import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Image from '@tcp/core/src/components/common/atoms/Image';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import carouselConfig from '@tcp/web/src/config/carousel';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getIconPath, getLocator } from '@tcp/core/src/utils';

import headerPromoStyles from '../HeaderPromo.style';

const renderMobileMarkup = (dataPromo, className) => {
  return (
    <Carousel
      options={carouselConfig}
      carouselConfig={{ type: 'light', arrow: 'small' }}
      carouselTheme="dark"
      className={className}
    >
      {dataPromo.map(promoItem => (
        <Anchor
          data-locator={getLocator('promo_item')}
          className="header-promo__item"
          to={promoItem.linkClass.url}
          target={promoItem.linkClass.target}
        >
          <div className={`header-promo-item__icon ${promoItem.linkClass.class}`}>
            <Image src={getIconPath(promoItem.linkClass.class)} alt={promoItem.linkClass.title} />
          </div>
          <div className="header-promo-item__content">
            <BodyCopy
              className={`styled-text ${promoItem.textLines[0].style}`}
              fontWeight="black"
              fontFamily="secondary"
              fontSize={['fs12', 'fs12', 'fs14']}
              textAlign="center"
            >
              {promoItem.textLines[0].text}
            </BodyCopy>
            <BodyCopy
              className={`styled-text-line ${promoItem.textLines[1].style}`}
              fontFamily="secondary"
              fontSize={['fs12', 'fs12', 'fs14']}
              textAlign="center"
            >
              {promoItem.textLines[1].text}
            </BodyCopy>
          </div>
        </Anchor>
      ))}
    </Carousel>
  );
};

const renderDesktopMarkup = (dataPromo, className) => {
  return (
    <Row centered className={className}>
      {dataPromo.map(promoItem => (
        <Col
          colSize={{
            large: 4,
            medium: 8,
            small: 6,
          }}
        >
          <Anchor
            data-locator={getLocator('promo_item')}
            className="header-promo__item"
            to={promoItem.linkClass.url}
            target={promoItem.linkClass.target}
          >
            <div className={`header-promo-item__icon ${promoItem.linkClass.class}`}>
              <Image src={getIconPath(promoItem.linkClass.class)} alt={promoItem.linkClass.title} />
            </div>
            <div className="header-promo-item__content">
              <BodyCopy
                className={`styled-text ${promoItem.textLines[0].style}`}
                fontWeight="black"
                fontFamily="secondary"
                fontSize={['fs12', 'fs12', 'fs14']}
                textAlign="center"
              >
                {promoItem.textLines[0].text}
              </BodyCopy>
              <BodyCopy
                className={`styled-text-line ${promoItem.textLines[1].style}`}
                fontFamily="secondary"
                fontSize={['fs12', 'fs12', 'fs14']}
                textAlign="center"
              >
                {promoItem.textLines[1].text}
              </BodyCopy>
            </div>
          </Anchor>
        </Col>
      ))}
    </Row>
  );
};

const HeaderPromo = ({ className, dataPromo, mobileMarkup }) => {
  const wrapperClass = mobileMarkup ? 'header__promo-area--mobile' : 'header__promo-area--desktop';

  return (
    <div className={`header-promo__container ${className}`}>
      {mobileMarkup && renderMobileMarkup(dataPromo, wrapperClass)}
      {!mobileMarkup && renderDesktopMarkup(dataPromo, wrapperClass)}
    </div>
  );
};

HeaderPromo.propTypes = {
  className: PropTypes.string,
  dataPromo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    .isRequired,
  mobileMarkup: PropTypes.bool,
};

HeaderPromo.defaultProps = {
  className: '',
  mobileMarkup: false,
};

export default withStyles(HeaderPromo, headerPromoStyles);
export { HeaderPromo as HeaderPromoVanilla };
