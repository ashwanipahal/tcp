import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import Image from '@tcp/core/src/components/common/atoms/Image';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';
import carouselConfig from '@tcp/web/src/config/carousel';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import headerPromoStyles from '../HeaderPromo.style';
import { getIconPath } from '../../../../../utils';

const renderMobileMarkup = (dataPromo, className) => {
  return (
    <Carousel
      options={carouselConfig}
      carouselConfig={{ type: 'light', arrow: 'small' }}
      carouselTheme="dark"
      className={className}
    >
      {dataPromo.map(promoItem => (
        <div className="header-promo__item">
          <div className={`header-promo-item__icon ${promoItem.linkClass.class}`}>
            <Image src={getIconPath(promoItem.linkClass.class)} alt={promoItem.linkClass.title} />
          </div>
          <div className="header-promo-item__content">
            <RichText
              className={`styled-text ${promoItem.textLines[0].style}`}
              richTextHtml={promoItem.textLines[0].text}
            />

            <RichText
              className={`styled-text-line ${promoItem.textLines[1].style}`}
              richTextHtml={promoItem.textLines[1].text}
            />
          </div>
        </div>
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
          <div className="header-promo__item">
            <div className={`header-promo-item__icon ${promoItem.linkClass.class}`}>
              <Image src={getIconPath(promoItem.linkClass.class)} alt={promoItem.linkClass.title} />
            </div>
            <div className="header-promo-item__content">
              <RichText
                className={`styled-text ${promoItem.textLines[0].style}`}
                richTextHtml={promoItem.textLines[0].text}
              />
              <RichText
                className={`styled-text-line ${promoItem.textLines[1].style}`}
                richTextHtml={promoItem.textLines[1].text}
              />
            </div>
          </div>
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
