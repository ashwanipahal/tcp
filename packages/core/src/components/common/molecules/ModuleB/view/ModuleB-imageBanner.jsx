import React from 'react';
import PropTypes from 'prop-types';
import { DamImage, Anchor } from '../../../atoms';
import PromoBanner from '../../PromoBanner';
import { getLocator } from '../../../../../utils';
import { bannerPositionTypes } from '../ModuleB.config';

/**
 * This function renders Promo Banner and Header Text
 * @param {*} param0
 */
const renderPromoBanner = promoBanner => {
  return (
    promoBanner.promoBanner && (
      <PromoBanner
        className="moduleB_promo-banner"
        dataLocatorHeader={getLocator('moduleB_header_text')}
        data-locator={getLocator('moduleB_promo_banner_text')}
        variation="header_and_promo"
        {...promoBanner}
      />
    )
  );
};

/**
 * This function renders Linked Image component
 * @param {*} param0
 */
const renderImage = ([{ image, link }]) => {
  return (
    <div className="moduleB_image-container" data-locator={getLocator('moduleB_image')}>
      <Anchor {...link} className="moduleB_image-link">
        <DamImage imgData={image} className="moduleB_image" />
      </Anchor>
    </div>
  );
};

/**
 * This component loads Image and Promo banner component in different stacks
 * Stacks -
 *  - Top
 *  - Top Alt
 *  - Overlay
 *  - Bottom
 * @param {*} props
 */
const ImageBanner = props => {
  const { bannerPosition, promoBanner, linkedImage } = props;

  switch (bannerPosition) {
    case bannerPositionTypes.top:
      return (
        <div className="banner-top-variation">
          {renderPromoBanner(promoBanner)}
          {renderImage(linkedImage)}
        </div>
      );
    case bannerPositionTypes.topAlt:
      return (
        <div className="banner-top-alt-variation">
          {renderPromoBanner(promoBanner)}
          {renderImage(linkedImage)}
        </div>
      );
    case bannerPositionTypes.overlay:
      return (
        <div className="banner-overlay-variation">
          {renderImage(linkedImage)}
          {renderPromoBanner(promoBanner)}
        </div>
      );
    case bannerPositionTypes.bottom:
      return (
        <div className="banner-bottom-variation">
          {renderImage(linkedImage)}
          {renderPromoBanner(promoBanner)}
        </div>
      );
    default:
      return false;
  }
};

ImageBanner.propTypes = {
  bannerPosition: PropTypes.string.isRequired,
  promoBanner: PropTypes.shape({}).isRequired,
  linkedImage: PropTypes.shape({}).isRequired,
};

export default ImageBanner;
