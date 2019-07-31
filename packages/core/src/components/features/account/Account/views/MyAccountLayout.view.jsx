import React from 'react'; //eslint-disable-line
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import MyAccountLeftNav from './MyAccountLeftNav.view';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/MyAccountContainer.style';
import Dropdown from '../../../../common/molecules/Dropdown';

// @flow
type Props = {
  navData: Array<Object>,
  mainContent: Function,
  active: string,
  className: string,
  router: object,
  labels: object,
};

/**
 * @function MyAccountLayoutView The AccountLayout component will provide a list of left
 * navigationLinks and the component associated with it
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {navData} navData The list of links in the left nav as config object
 * @param {mainContent} mainContent The component to be rendered on the right side
 */
const MyAccountLayoutView = (props: Props) => {
  const { navData, mainContent: MainContent, active, className, router, labels } = props;
  return (
    <div className={className}>
      <Row>
        <Col colSize={{ large: 12, medium: 4, small: 6 }} offsetLeft={{ medium: 2 }}>
          <div className="is-hidden-nav">
            <Dropdown options={navData} active="Account Overview" activeComponent={active} />
          </div>
        </Col>
      </Row>

      <Row>
        <Col colSize={{ large: 2, medium: 8, small: 6 }}>
          <div className="is-visible-nav">
            <MyAccountLeftNav navData={navData} active={active} />
          </div>
        </Col>
        <Col colSize={{ large: 10, medium: 8, small: 6 }}>
          <MainContent router={router} labels={labels} />
        </Col>
      </Row>
    </div>
  );
};

export default withStyles(MyAccountLayoutView, styles);
export { MyAccountLayoutView as MyAccountLayoutViewVanilla };
