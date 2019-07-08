import React from 'react'; //eslint-disable-line
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import MyAccountLeftNav from './MyAccountLeftNav.view';

// @flow
type Props = {
  navData: Array<Object>,
  mainContent: Function,
  active: string,
};

/**
 * @function MyAccountLayoutView The AccountLayout component will provide a list of left
 * navigationLinks and the component associated with it
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {navData} navData The list of links in the left nav as config object
 * @param {mainContent} mainContent The component to be rendered on the right side
 */
const MyAccountLayoutView = ({ navData, mainContent: MainContent, active }: Props) => {
  return (
    <React.Fragment>
      <Row>
        <Col colSize={{ large: 2, medium: 8, small: 6 }}>
          <MyAccountLeftNav navData={navData} active={active} />
        </Col>
        <Col colSize={{ large: 10, medium: 8, small: 6 }}>
          <MainContent />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MyAccountLayoutView;
