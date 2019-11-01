import React from 'react';
import { Row, Col } from '../../../atoms';
import HelpTabs from '../../HelpTabs';
import HelpCenterTabMock from '../HelpCenter.mock';

const HelpCenter = () => {
  return (
    <Row>
      <Col colSize={{ small: 6, medium: 8, large: 2 }}>Col1</Col>
      <Col
        colSize={{ small: 6, medium: 8, large: 9 }}
        offsetRight={{
          small: 0,
          medium: 0,
          large: 1,
        }}
      >
        <HelpTabs tabs={HelpCenterTabMock.buttonList} />
      </Col>
    </Row>
  );
};
export default HelpCenter;
export { HelpCenter as VanillaHelpCenter };
