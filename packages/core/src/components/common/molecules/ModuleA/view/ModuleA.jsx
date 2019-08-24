import React from 'react';
import PropTypes from 'prop-types';

import { style } from '../ModuleA.style';
import { Col, Row } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';

import ModuleAGymCarousel from '../../ModuleAGymCarousel';
import ModuleATcpCarousel from '../../ModuleATcpCarousel';
import config from '../ModuleA.config';

const { ctaTypes } = config;

const ModuleA = props => {
  const { className, variant = 'tcp', ctaType, ...others } = props;

  return (
    <Row className={`${className} moduleA`} fullBleed={{ small: true, medium: true, large: false }}>
      <Col
        colSize={{
          small: 6,
          medium: 8,
          large: 12,
        }}
      >
        {variant === 'tcp' ? (
          <ModuleATcpCarousel ctaType={ctaTypes[ctaType]} {...others} />
        ) : (
          <ModuleAGymCarousel ctaType={ctaTypes[ctaType]} {...others} />
        )}
      </Col>
    </Row>
  );
};

ModuleA.defaultProps = {
  className: '',
  variant: 'tcp',
  ctaType: '',
};

ModuleA.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  ctaType: PropTypes.string,
};

export default withStyles(errorBoundary(ModuleA), style);
export { ModuleA as ModuleAVanilla };
