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
    accordion: () =>
      import('@tcp/core/src/components/common/molecules/AccordionModule').then(returnModule),
  }),
  render: (properties, modules) => {
    const { className, slot: slots, ...others } = properties;
    return (
      slots &&
      slots
        .filter(
          slot =>
            slot &&
            (slot.moduleName === 'placeholder' ||
              slot.moduleName === 'divisionTabs' ||
              slot.moduleName === 'accordion')
        )
        .map((slotData, index) => {
          const Module = modules[slotData.moduleName];
          const largeColSize = slotData.moduleName === 'accordion' ? 10 : 9;
          const colOffset =
            slotData.moduleName === 'accordion' ? {} : { large: 1, small: 0, medium: 0 };
          return (
            <Col
              colSize={{
                small: 6,
                medium: 8,
                large: index === 1 ? largeColSize : 2,
              }}
              offsetRight={index === 1 ? colOffset : {}}
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
