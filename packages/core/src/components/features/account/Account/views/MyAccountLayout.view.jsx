import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import MyAccountLeftNav from './MyAccountLeftNav.view';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/MyAccountContainer.style';
import Dropdown from '../../../../common/molecules/Dropdown';
import AccountHeader from '../../common/organism/AccountHeader';

/**
 * @function MyAccountLayoutView The AccountLayout component will provide a list of left
 * navigationLinks and the component associated with it
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {navData} navData The list of links in the left nav as config object
 * @param {mainContent} mainContent The component to be rendered on the right side
 */
const MyAccountLayoutView = props => {
  const {
    navData,
    mainContent: MainContent,
    active,
    activeSubComponent,
    className,
    router,
    labels,
    isUserLoggedIn,
  } = props;
  return (
    <div className={className}>
      <Row className="elem-mb-XL">
        <Col colSize={{ large: 12, medium: 8, small: 6 }}>
          <AccountHeader labels={labels} />
        </Col>
      </Row>
      {isUserLoggedIn && (
        <Row className="is-hidden-nav">
          <Col colSize={{ large: 12, medium: 4, small: 6 }} offsetLeft={{ medium: 2 }}>
            <Dropdown options={navData} active={active} isUpperCase />
          </Col>
        </Row>
      )}
      {isUserLoggedIn ? (
        <Row>
          <Col colSize={{ large: 2, medium: 8, small: 6 }} className="is-visible-nav">
            <MyAccountLeftNav
              navData={navData}
              active={active}
              activeSubComponent={activeSubComponent}
            />
          </Col>

          <Col colSize={{ large: 10, medium: 8, small: 6 }}>
            <MainContent router={router} labels={labels} />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col colSize={{ large: 12, medium: 8, small: 6 }}>
            <MainContent router={router} labels={labels} />
          </Col>
        </Row>
      )}
    </div>
  );
};

MyAccountLayoutView.propTypes = {
  navData: PropTypes.shape([]),
  mainContent: PropTypes.func,
  active: PropTypes.string,
  activeSubComponent: PropTypes.string,
  className: PropTypes.string,
  router: PropTypes.shape({}),
  labels: PropTypes.shape({}),
  isUserLoggedIn: PropTypes.bool.isRequired,
};

MyAccountLayoutView.defaultProps = {
  navData: [],
  mainContent: () => {},
  active: '',
  activeSubComponent: '',
  className: '',
  router: {},
  labels: {},
};

export default withStyles(MyAccountLayoutView, styles);
export { MyAccountLayoutView as MyAccountLayoutViewVanilla };
