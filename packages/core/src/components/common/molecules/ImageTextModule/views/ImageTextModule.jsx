import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, DamImage } from '../../../atoms';
import { PromoBanner } from '../..';
import withStyles from '../../../hoc/withStyles';
import { ImgWrapper, style, PromoBannerWrapper } from '../ImageTextModule.style';
import imgConfig from '../ImageTextModule.config';

const getColumnPositions = set => {
  return (
    set &&
    set.reduce((acc, cur) => {
      acc[cur.key] = cur.val;
      return acc;
    }, {})
  );
};

const getImageColumn = (mediaWrapper, promoBanner) => {
  return (
    <Col colSize={{ small: 6, medium: 8, large: 6 }} className="image-col">
      <ImgWrapper>
        {mediaWrapper ? <DamImage imgData={mediaWrapper} imgConfigs={imgConfig} /> : null}
      </ImgWrapper>
      {promoBanner ? (
        <PromoBannerWrapper>
          <PromoBanner promoBanner={promoBanner} />
        </PromoBannerWrapper>
      ) : null}
    </Col>
  );
};

const getHeaderTextColumn = () => {
  return (
    <Col colSize={{ small: 6, medium: 8, large: 6 }}>
      <div>Text Col</div>
    </Col>
  );
};

const RenderCol = props => {
  const { set, mediaWrapper, promoBanner } = props;
  const colConfig = getColumnPositions(set);
  if (!colConfig) {
    return null;
  }
  const { headerPosition } = colConfig;
  if (headerPosition === 'left') {
    return [getImageColumn(mediaWrapper, promoBanner), getHeaderTextColumn()];
  }
  return [getHeaderTextColumn(), getImageColumn()];
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
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ).isRequired,
  promoBanner: PropTypes.arrayOf(
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
