import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Dropdown from '@tcp/core/src/components/common/molecules/Dropdown';
import style from '../styles/LeftNavigation.style';
import subnavigationMock from './mock';
import Anchor from '../../../atoms/Anchor';
import Row from '../../../atoms/Row';
import Col from '../../../atoms/Col';

/**
 * @function getNavLink This function renders each link present in the left nav
 * @param {data} data Each Link data is passed in nav Object
 */
const getNavLink = (data = {}) => {
  const { navObj = {} } = data;
  return (
    <Anchor asPath={navObj.url} to={navObj.url} anchorVariation="primary" fontSizeVariation="large">
      {navObj.displayName}
    </Anchor>
  );
};

/**
 * @function LeftNavigation left navigation to form a pane component containing links to redirect specific path
 * @param {className} className Class name for the left navigation.
 * @param {active} active name of active element from the list
 * @param {data} data navigation data
 */

const LeftNavigation = ({ data = [], className }) => {
  const navData = data.length ? Object.assign(data) : subnavigationMock;
  const navDropDown = navData.length && navData.map(nav => nav.leafLink);
  let activeLink = [];
  if (navDropDown.lenth) {
    activeLink = useState(navDropDown[0].component || null);
  }
  return (
      navDropDown.length ? (
        <React.Fragment>
        <Row className="showonlyInMobile">
          <Col colSize={{ large: 12, medium: 8, small: 6 }}>
            <Dropdown options={navDropDown} active={activeLink[0]} isUpperCase />
          </Col>
        </Row>
        <Row className="showonlyInDesktop">
          <Col colSize={{ large: 12, medium: 8, small: 6 }} offsetLeft={{ medium: 2 }}>
            <ul className={className}>
              {navData.length &&
                navData.map((nav, index) => {
                  const { leafLink: navObj = {} } = nav;
                  return (
                    <li id={index} key={navObj.displayName} className="nav-link-wrapper">
                      {getNavLink({ navObj })}
                    </li>
                  );
                })}
            </ul>
          </Col>
        </Row>
        </React.Fragment>
      ) : null
  );
};

LeftNavigation.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(LeftNavigation, style);
