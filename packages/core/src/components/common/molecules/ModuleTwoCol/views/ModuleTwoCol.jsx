/* istanbul ignore file */
import dynamic from 'next/dynamic';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';
import style from '../ModuleTwoCol.style';

const returnModule = mod => mod.default;
const DynamicColumns = dynamic({
  modules: () => ({
    moduleB: () => import('@tcp/core/src/components/common/molecules/ModuleB').then(returnModule),
    moduleH: () => import('@tcp/core/src/components/common/molecules/ModuleH').then(returnModule),
    moduleN: () => import('@tcp/core/src/components/common/molecules/ModuleN').then(returnModule),
  }),
  render: (properties, modules) => {
    const { className, slot: slots, ...others } = properties;

    return (
      slots &&
      slots
        .filter(slot => slot && (slot.moduleName === 'moduleH' || slot.moduleName === 'moduleN'))
        .map(slotData => {
          const Module = modules[slotData.moduleName];
          return (
            <Col colSize={{ small: 6, medium: 8, large: 6 }}>
              <Module halfWidth {...slotData} {...others} />
            </Col>
          );
        })
    );
  },
});

const ModuleTwoColumns = props => {
  const { className } = props;

  return (
    <Row className={`${className} moduleTwoCol`} fullBleed={{ small: true, medium: true }}>
      {<DynamicColumns {...props} />}
    </Row>
  );
};

ModuleTwoColumns.propTypes = {
  className: PropTypes.string.isRequired,
};
export default withStyles(errorBoundary(ModuleTwoColumns), style);
