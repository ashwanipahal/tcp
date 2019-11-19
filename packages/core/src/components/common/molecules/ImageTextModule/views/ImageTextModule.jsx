import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import style from '../ImageTextModule.style';

/**
 * This Module Will be used to render the image text module.
 * @param {*} props
 */

const ImageTextModule = props => {
  const { className } = props;
  return (
    <Row fullBleed className={className}>
      <Col colSize={{ small: 6, medium: 8, large: 12 }}>
        <div>test</div>
      </Col>
    </Row>
  );
};
ImageTextModule.propTypes = {
  className: PropTypes.string.isRequired,
};

ImageTextModule.defaultProps = {};

export default withStyles(ImageTextModule, style);
