import React from 'react';
import PropTypes from 'prop-types';
import ButtonList from '../../ButtonList';
import { Row, Col, DamImage, Anchor } from '../../../atoms';
import PromoBanner from '../../PromoBanner';
import { getLocator } from '../../../../../utils';
import { ctaTypes, ctaTypeProps } from '../ModuleB.config';
import withStyles from '../../../hoc/withStyles';
import style from '../ModuleB.style';

/**
 * This function returns button list variation on the basis of CTA Type
 * @param {*} ctaType
 */
const getButtonListVariation = ctaType => {
  return ctaTypes[ctaType];
};

/**
 * This function returns props from button list variation on the basis of CTA Type
 * @param {*} ctaType
 */
const getButtonListVariationProps = ctaType => {
  return ctaTypeProps[ctaType];
};

/**
 * This function returns column size for grid on the basis of moduleWidth param
 * @param {*} moduleWidth
 */
const getColSize = moduleWidth => {
  const colSize = {
    small: 6,
    medium: 8,
    large: 12,
  };
  if (moduleWidth === 'half') {
    colSize.medium = 4;
    colSize.large = 6;
  }

  return colSize;
};

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
 * Identifies variation to load on the basis of banner position
 * @param {*} bannerPosition
 */
const loadImageBannerVariation = ({ bannerPosition, promoBanner, linkedImage }) => {
  switch (bannerPosition) {
    case 'top':
      return (
        <div className="banner-top-variation">
          {renderPromoBanner(promoBanner)}
          {renderImage(linkedImage)}
        </div>
      );
    case 'topAlt':
      return (
        <div className="banner-top-alt-variation">
          {renderPromoBanner(promoBanner)}
          {renderImage(linkedImage)}
        </div>
      );
    case 'overlay':
      return (
        <div className="banner-overlay-variation">
          {renderImage(linkedImage)}
          {renderPromoBanner(promoBanner)}
        </div>
      );
    case 'bottom':
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

/**
 * This is Module B component implementation
 */
const ModuleB = props => {
  const {
    className,
    composites: {
      ctaItems,
      largeCompImage: [{ headerText, promoBanner, linkedImage }],
    },
    moduleWidth,
    ctaType,
    bannerPosition,
    expandableTitle,
  } = props;

  const buttonListCtaType = getButtonListVariation(ctaType);
  const buttonListProps = getButtonListVariationProps(ctaType);
  const colSize = getColSize(moduleWidth);

  if (ctaItems.length < 3) {
    buttonListProps.dualVariation = null;
  }

  const imageBannerProps = {
    bannerPosition,
    promoBanner: {
      headerText,
      promoBanner,
    },
    linkedImage,
  };

  return (
    <Row>
      <Col className={`${className} moduleB-wrapper`} colSize={colSize}>
        {loadImageBannerVariation(imageBannerProps)}
        <ButtonList
          className="moduleB_button-list"
          buttonsData={ctaItems}
          buttonListVariation={buttonListCtaType}
          dataLocatorDropDown={getLocator('moduleB_dropdown')}
          dataLocatorDivisionImages={getLocator('moduleB_cta_image')}
          dataLocatorTextCta={getLocator('moduleB_cta_links')}
          dropdownLabel={expandableTitle}
          {...buttonListProps}
        />
      </Col>
    </Row>
  );
};

ModuleB.propTypes = {
  className: PropTypes.string.isRequired,
  composites: PropTypes.shape({}).isRequired,
  moduleWidth: PropTypes.string.isRequired,
  ctaType: PropTypes.string.isRequired,
  bannerPosition: PropTypes.string.isRequired,
  expandableTitle: PropTypes.string.isRequired,
};

export { ModuleB as ModuleBVanilla };
export default withStyles(ModuleB, style);
