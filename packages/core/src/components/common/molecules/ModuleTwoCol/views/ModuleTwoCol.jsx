/* istanbul ignore file */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';
import style from '../ModuleTwoCol.style';

const ModuleTwoCol = props => {
  // const { modules } = props;
  const { slots = [], className, modules, ...others } = props;

  return (
    <Row className={`${className} moduleTwoCol`} fullBleed>
      {slots
        .filter(slot => slot.moduleName === 'moduleH' || slot.moduleName === 'moduleN')
        .map(slot => {
          const Module = modules[slot.moduleName];
          const { data: slotData, contentId, accessibility } = slot;
          return (
            <Col colSize={{ small: 6, medium: 8, large: 6 }}>
              <Module key={contentId} accessibility={accessibility} {...slotData} {...others} />
            </Col>
          );
        })}
    </Row>
  );
};

ModuleTwoCol.propTypes = {
  modules: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  slots: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.shape({}))).isRequired,
};

export default withStyles(errorBoundary(ModuleTwoCol), style);
