import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, DamImage, BodyCopy } from '../../../atoms';
import ButtonList from '../../ButtonList';
import { getLocator } from '../../../../../utils';
import withStyles from '../../../hoc/withStyles';
import { style, ContentContainer, BgWrapper } from '../ImageTextModule.style';

import imgConfig, { ctaTypes, ctaTypeProps } from '../ImageTextModule.config';

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
 * This function will return the values of set, to be used as image and text columns placement.
 */

const getLayoutConfig = set => {
  return (
    set &&
    set.reduce((acc, cur) => {
      acc[cur.key] = cur.val;
      return acc;
    }, {})
  );
};

/**
 * This will be used to render the Image Column
 * @param {*} mediaWrapper
 * @param {*} layoutConfig
 */

const getImageColumn = (mediaWrapper, layoutConfig) => {
  const { bgType, color, headerPosition } = layoutConfig;
  const marginClass = headerPosition === 'right' ? 'img-bootom-margin' : '';
  if (bgType === 'image') {
    return (
      <Col colSize={{ small: 6, medium: 8, large: 6 }}>
        <div className={marginClass}>
          {mediaWrapper ? (
            <DamImage
              imgData={mediaWrapper[0]}
              imgConfigs={imgConfig.crops}
              data-locator={getLocator('moduleImageText_image')}
            />
          ) : null}
        </div>
      </Col>
    );
  }
  return (
    <Col colSize={{ small: 6, medium: 8, large: 6 }}>
      <BgWrapper
        bgColor={color}
        className={marginClass}
        data-locator={getLocator('moduleImageText_bgwrapper')}
      />
    </Col>
  );
};

/**
 * This will be used to render the header columns
 * @param {*} headLine
 * @param {*} subHeadLine
 * @param {*} ctaItems
 * @param {*} layoutConfig
 */

const getHeaderColumn = (headLine, subHeadLine, ctaItems, layoutConfig) => {
  const buttonListCtaType = getButtonListVariation(layoutConfig.ctaType);
  const buttonListProps = getButtonListVariationProps(layoutConfig.ctaType);
  const dualVariation = ctaItems && ctaItems.length < 3 ? null : buttonListProps.dualVariation;
  const { expandableTitle, headerPosition } = layoutConfig;
  const marginClass = headerPosition === 'left' ? 'header-bootom-margin' : '';
  return (
    <Col colSize={{ small: 6, medium: 8, large: 6 }} className="content-wrapper">
      <ContentContainer>
        {headLine ? (
          <BodyCopy
            className="headline"
            fontSize={['fs20', 'fs20', 'fs36']}
            component="div"
            color="text.primary"
            fontFamily="primary"
            fontWeight="black"
            textAlign="center"
            data-locator={getLocator('moduleImageText_headline_text')}
          >
            {headLine.map(({ text }) => (
              <span>{text}</span>
            ))}
          </BodyCopy>
        ) : null}
        {subHeadLine ? (
          <BodyCopy
            className="headsubline"
            fontSize={['fs14', 'fs16', 'fs26']}
            component="div"
            color="text.primary"
            fontFamily="primary"
            textAlign="center"
            data-locator={getLocator('moduleImageText_headsubline_text')}
          >
            {subHeadLine.map(({ text }) => (
              <span>{text}</span>
            ))}
          </BodyCopy>
        ) : null}
        {ctaItems ? (
          <ButtonList
            className={`button-list ${marginClass}`}
            buttonsData={ctaItems}
            buttonListVariation={buttonListCtaType}
            dualVariation={dualVariation}
            dropdownLabel={expandableTitle}
            dataLocatorDropDown={getLocator('moduleImageText_cta_image')}
            dataLocatorDivisionImages={getLocator('moduleImageText_cta_links')}
            dataLocatorTextCta={getLocator('moduleB_cta_links')}
          />
        ) : null}
      </ContentContainer>
    </Col>
  );
};

/**
 * This will be used to render the columns
 * @param {*} props
 */

const RenderCol = props => {
  const { set, mediaWrapper, headLine, subHeadLine, ctaItems } = props;
  const layoutConfig = getLayoutConfig(set);
  if (!layoutConfig) {
    return null;
  }
  const { headerPosition } = layoutConfig;
  if (headerPosition === 'left') {
    return [
      getHeaderColumn(headLine, subHeadLine, ctaItems, layoutConfig),
      getImageColumn(mediaWrapper, layoutConfig),
    ];
  }
  return [
    getImageColumn(mediaWrapper, layoutConfig),
    getHeaderColumn(headLine, subHeadLine, ctaItems, layoutConfig),
  ];
};

/**
 * This Module Will be used to render the image text module.
 * @param {*} props
 */

const ImageTextModule = props => {
  const { className } = props;
  return (
    <Row
      fullBleed={{
        small: true,
        medium: false,
        large: true,
      }}
      className={className}
    >
      {RenderCol(props)}
    </Row>
  );
};

const ModulePropTypes = {
  headLine: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ).isRequired,
  subHeadLine: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ),
  ctaItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  set: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      val: PropTypes.string,
    })
  ).isRequired,
};

RenderCol.propTypes = {
  ...ModulePropTypes,
};

ImageTextModule.propTypes = {
  className: PropTypes.string.isRequired,
};

ImageTextModule.defaultProps = {};

export default withStyles(ImageTextModule, style);

export { ImageTextModule as ImageTextModuleVanilla };
