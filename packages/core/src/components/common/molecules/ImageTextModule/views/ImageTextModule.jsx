import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, DamImage, BodyCopy } from '../../../atoms';
import ButtonList from '../../ButtonList';
import withStyles from '../../../hoc/withStyles';
import { ImgWrapper, style, ContentContainer } from '../ImageTextModule.style';

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

const getLayoutConfig = set => {
  return (
    set &&
    set.reduce((acc, cur) => {
      acc[cur.key] = cur.val;
      return acc;
    }, {})
  );
};

const getImageColumn = mediaWrapper => {
  return (
    <Col colSize={{ small: 6, medium: 8, large: 6 }} className="image-col">
      <ImgWrapper>
        {mediaWrapper ? <DamImage imgData={mediaWrapper} imgConfigs={imgConfig.crops} /> : null}
      </ImgWrapper>
    </Col>
  );
};

const getTextColumn = (headLine, subHeadLine, ctaItems, layoutConfig) => {
  const buttonListCtaType = getButtonListVariation(layoutConfig.ctaType);
  const buttonListProps = getButtonListVariationProps(layoutConfig.ctaType);
  const dualVariation = ctaItems.length < 3 ? null : buttonListProps.dualVariation;
  const expandableTitle = getButtonListVariationProps(layoutConfig.expandableTitle);
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
          >
            {subHeadLine.map(({ text }) => (
              <span>{text}</span>
            ))}
          </BodyCopy>
        ) : null}
        {ctaItems ? (
          <ButtonList
            className="button-list"
            buttonsData={ctaItems}
            buttonListVariation={buttonListCtaType}
            dualVariation={dualVariation}
            dropdownLabel={expandableTitle}
          />
        ) : null}
      </ContentContainer>
    </Col>
  );
};

const RenderCol = props => {
  const { set, mediaWrapper, headLine, subHeadLine, ctaItems } = props;
  const layoutConfig = getLayoutConfig(set);
  if (!layoutConfig) {
    return null;
  }
  const { headerPosition } = layoutConfig;
  if (headerPosition === 'left') {
    return [
      getImageColumn(mediaWrapper),
      getTextColumn(headLine, subHeadLine, ctaItems, layoutConfig),
    ];
  }
  return [
    getTextColumn(headLine, subHeadLine, ctaItems, layoutConfig),
    getImageColumn(mediaWrapper),
  ];
};

/**
 * This Module Will be used to render the image text module.
 * @param {*} props
 */

const ImageTextModule = props => {
  const { className } = props;
  return (
    <Row fullBleed className={className}>
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
