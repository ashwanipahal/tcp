/* istanbul ignore file */
import dynamic from 'next/dynamic';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';
import style from '../styles/HelpCenterModuleTwoCol.style';

const returnModule = mod => mod.default;
const DynamicColumns = dynamic({
  modules: () => ({
    placeholder: () =>
      import('@tcp/core/src/components/common/molecules/Placeholder').then(returnModule),
    divisionTabs: () =>
      import('@tcp/core/src/components/common/molecules/HelpTabs').then(returnModule),
  }),
  render: (properties, modules) => {
    const { className, slot: slots, ...others } = properties;

    return (
      slots &&
      slots
        .filter(
          slot => slot && (slot.moduleName === 'placeholder' || slot.moduleName === 'divisionTabs')
        )
        .map(slotData => {
          const Module = modules[slotData.moduleName];
          return (
            <Col
              colSize={{
                small: 6,
                medium: 8,
                large: slotData.moduleName === 'divisionTabs' ? 9 : 2,
              }}
              offsetRight={
                slotData.moduleName === 'divisionTabs' ? { large: 1, small: 0, medium: 0 } : {}
              }
            >
              <Module halfWidth {...slotData} {...others} />
            </Col>
          );
        })
    );
  },
});

const HelpCenterModuleTwoCol = props => {
  const { className } = props;

  return (
    <Row className={`${className} helpCenterModuleTwoCol`}>{<DynamicColumns {...props} />}</Row>
  );
};

HelpCenterModuleTwoCol.propTypes = {
  className: PropTypes.string.isRequired,
};
export default withStyles(errorBoundary(HelpCenterModuleTwoCol), style);
export { HelpCenterModuleTwoCol as HelpCenterModuleTwoColVanilla };
