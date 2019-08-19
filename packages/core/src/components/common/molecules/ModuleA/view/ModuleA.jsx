import React from 'react';
import PropTypes from 'prop-types';

import { style } from '../ModuleA.style';
import { Col, Row } from '../../../atoms';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';

import ModuleAGymCarousel from '../../ModuleAGymCarousel';
import ModuleATcpCarousel from '../../ModuleATcpCarousel';

// TODO: keys will be changed once we get the actual data from CMS
const ctaTypes = {
  stackedCTAList: 'stackedCTAList',
  linkCTAList: 'linkCTAList',
  scrollCTAList: 'scrollCTAList',
  imageCTAList: 'imageCTAList',
};

const ModuleA = props => {
  const {
    className,
    variant,
    set: [set = {}],
  } = props;

  const ctaType = ctaTypes[set.val];

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
          <ModuleATcpCarousel ctaType={ctaType} {...props} />
        ) : (
          <ModuleAGymCarousel ctaType={ctaType} {...props} />
        )}
      </Col>
    </Row>
  );
};

ModuleA.defaultProps = {
  className: '',
  variant: 'tcp',
  set: [],
};

ModuleA.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  set: PropTypes.arrayOf(PropTypes.shape({})),
};

export default errorBoundary(withStyles(ModuleA, style));
export { ModuleA as ModuleAVanilla };
