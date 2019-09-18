import React from 'react';
import PropTypes from 'prop-types';
import ImageBanner from './ModuleB-imageBanner';
import ButtonList from '../../ButtonList';
import { Row, Col } from '../../../atoms';
import { getLocator } from '../../../../../utils';
import { ctaTypes, ctaTypeProps, MODULE_WIDTH_HALF } from '../config';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary/errorBoundary';
import style from '../ModuleB.style';

/**
 * This function returns button list variation on the basis of CTA Type
 * @param {*} ctaType
 */
const getButtonListVariation = ctaType => {
  const buttonTypes = {
    ...ctaTypes,
  };
  return buttonTypes[ctaType];
};

/**
 * This function returns props from button list variation on the basis of CTA Type
 * @param {*} ctaType
 */
const getButtonListVariationProps = ctaType => {
  const buttonTypeProps = {
    ...ctaTypeProps,
  };
  return buttonTypeProps[ctaType];
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
    ctaItems,
    largeCompImage: [{ headerText, promoBanner, linkedImage }],
    moduleWidth,
    ctaType,
    bannerPosition,
    expandableTitle,
  } = props;

  const buttonListCtaType = getButtonListVariation(ctaType);
  const buttonListProps = getButtonListVariationProps(ctaType);
  const colSize = getColSize(moduleWidth);

  const dualVariation = ctaItems.length < 3 ? null : buttonListProps.dualVariation;

  const imageBannerProps = {
    bannerPosition,
    promoBanner: {
      headerText,
      promoBanner,
    },
    linkedImage,
  };

  return (
    <div className={`${className} parent-wrapper`}>
      <Row>
        <Col colSize={colSize}>
          <ImageBanner {...imageBannerProps} />
        </Col>
      </Row>
      <Row
        fullBleed={{
          small: true,
          medium: false,
          desktop: false,
        }}
      >
        <Col colSize={colSize}>
          <ButtonList
            className="button-list"
            buttonsData={ctaItems}
            buttonListVariation={buttonListCtaType}
            dataLocatorDropDown={getLocator('moduleB_dropdown')}
            dataLocatorDivisionImages={getLocator('moduleB_cta_image')}
            dataLocatorTextCta={getLocator('moduleB_cta_links')}
            dropdownLabel={expandableTitle}
            dualVariation={dualVariation}
          />
        </Col>
      </Row>
    </div>
  );
};

ModuleB.propTypes = {
  className: PropTypes.string.isRequired,
  moduleWidth: PropTypes.string,
  ctaItems: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.shape({}))).isRequired,
  largeCompImage: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.shape({}))).isRequired,
  ctaType: PropTypes.string.isRequired,
  bannerPosition: PropTypes.string.isRequired,
  expandableTitle: PropTypes.string.isRequired,
};

ModuleB.defaultProps = {
  moduleWidth: MODULE_WIDTH_HALF,
};

export { ModuleB as ModuleBVanilla };
export default withStyles(errorBoundary(ModuleB), style);
