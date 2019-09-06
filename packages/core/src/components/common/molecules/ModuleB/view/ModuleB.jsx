import React from 'react';
import PropTypes from 'prop-types';
import ImageBanner from './ModuleB-imageBanner';
import ButtonList from '../../ButtonList';
import { Row, Col } from '../../../atoms';
import { getLocator } from '../../../../../utils';
import { ctaTypes, ctaTypeProps, MODULE_WIDTH_HALF } from '../ModuleB.config';
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
  if (moduleWidth === MODULE_WIDTH_HALF) {
    colSize.medium = 4;
    colSize.large = 6;
  }

  return colSize;
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
      <Col className={`${className} parent-wrapper`} colSize={colSize}>
        <ImageBanner {...imageBannerProps} />
        <ButtonList
          className="button-list"
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
