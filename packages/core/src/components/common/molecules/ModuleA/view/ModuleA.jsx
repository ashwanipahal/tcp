import React from 'react';
import PropTypes from 'prop-types';

import { style } from '../ModuleA.style';
import { Col, Row } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';

import ModuleAGymCarousel from '../../ModuleAGymCarousel';
import ModuleATcpCarousel from '../../ModuleATcpCarousel';

const ModuleA = props => {
  const { className, variant } = props;

  return (
    <Row className={className}>
      <Col
        colSize={{
          small: 6,
          medium: 8,
          large: 12,
        }}
      >
        {variant === 'tcp' ? <ModuleATcpCarousel {...props} /> : <ModuleAGymCarousel {...props} />}
      </Col>
    </Row>
  );
};

ModuleA.defaultProps = {
  className: '',
  variant: 'tcp',
};

ModuleA.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
};

export default errorBoundary(withStyles(ModuleA, style));
export { ModuleA as ModuleAVanilla };
