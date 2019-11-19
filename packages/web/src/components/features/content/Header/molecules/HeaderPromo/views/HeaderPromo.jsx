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
import ModuleX from '@tcp/core/src/components/common/molecules/ModuleX';

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
      {dataPromo &&
        dataPromo.map(promoItem => (
          <Anchor
            dataLocator={getLocator('promo_item')}
            className="header-promo__item"
            to={promoItem.linkClass.url}
            target={promoItem.linkClass.target}
          >
            <div className={`header-promo-item__icon ${promoItem.linkClass.class}`}>
              <Image src={getIconPath(promoItem.linkClass.class)} alt={promoItem.linkClass.title} />
            </div>
            <div className="header-promo-item__content">
              {promoItem.textItems[0] && (
                <BodyCopy
                  className={`styled-text ${promoItem.textItems[0].style}`}
                  fontWeight="black"
                  fontFamily="secondary"
                  fontSize={['fs12', 'fs12', 'fs14']}
                  textAlign="center"
                >
                  {promoItem.textItems[0].text}
                </BodyCopy>
              )}
              {promoItem.textItems[1] && (
                <BodyCopy
                  className={`styled-text-line ${promoItem.textItems[1].style}`}
                  fontFamily="secondary"
                  fontSize={['fs12', 'fs12', 'fs14']}
                  textAlign="center"
                >
                  {promoItem.textItems[1].text}
                </BodyCopy>
              )}
            </div>
          </Anchor>
        ))}
    </Carousel>
  );
};

const renderDesktopMarkup = (dataPromo, className) => {
  return (
    <Row centered className={className}>
      {dataPromo &&
        dataPromo.map(promoItem => (
          <Col
            colSize={{
              large: 4,
              medium: 8,
              small: 6,
            }}
          >
            <Anchor
              dataLocator={getLocator('promo_item')}
              className="header-promo__item"
              to={promoItem.linkClass.url}
              target={promoItem.linkClass.target}
            >
              <div className={`header-promo-item__icon ${promoItem.linkClass.class}`}>
                <Image
                  src={getIconPath(promoItem.linkClass.class)}
                  alt={promoItem.linkClass.title}
                />
              </div>
              <div className="header-promo-item__content">
                {promoItem.textItems[0] && (
                  <BodyCopy
                    className={`styled-text ${promoItem.textItems[0].style}`}
                    fontWeight="black"
                    fontFamily="secondary"
                    fontSize={['fs12', 'fs12', 'fs14']}
                    textAlign="center"
                  >
                    {promoItem.textItems[0].text}
                  </BodyCopy>
                )}
                {promoItem.textItems[1] && (
                  <BodyCopy
                    className={`styled-text-line ${promoItem.textItems[1].style}`}
                    fontFamily="secondary"
                    fontSize={['fs12', 'fs12', 'fs14']}
                    textAlign="center"
                  >
                    {promoItem.textItems[1].text}
                  </BodyCopy>
                )}
              </div>
            </Anchor>
          </Col>
        ))}
    </Row>
  );
};

const renderHtmlPromoBannerData = (dataHtmlPromo, className) => {
  return dataHtmlPromo.map(item => <ModuleX className={className} richTextList={[item]} />);
};

const renderHeaderPromoMarkup = (mobileMarkup, wrapperClass, dataTextPromo, dataHtmlPromo) => {
  if (mobileMarkup) {
    return dataTextPromo
      ? renderMobileMarkup(dataTextPromo, wrapperClass)
      : renderHtmlPromoBannerData(dataHtmlPromo, wrapperClass);
  }
  return dataTextPromo
    ? renderDesktopMarkup(dataTextPromo, wrapperClass)
    : renderHtmlPromoBannerData(dataHtmlPromo, wrapperClass);
};

const HeaderPromo = ({ className, mobileMarkup, dataTextPromo, dataHtmlPromo }) => {
  const wrapperClass = mobileMarkup ? 'header__promo-area--mobile' : 'header__promo-area--desktop';

  return (
    <div className={`header-promo__container ${className} content-wrapper`}>
      {renderHeaderPromoMarkup(mobileMarkup, wrapperClass, dataTextPromo, dataHtmlPromo)}
    </div>
  );
};

HeaderPromo.propTypes = {
  className: PropTypes.string,
  dataTextPromo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    .isRequired,
  mobileMarkup: PropTypes.bool,
  dataHtmlPromo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    .isRequired,
};

HeaderPromo.defaultProps = {
  className: '',
  mobileMarkup: false,
};

export default withStyles(HeaderPromo, headerPromoStyles);
export { HeaderPromo as HeaderPromoVanilla };
