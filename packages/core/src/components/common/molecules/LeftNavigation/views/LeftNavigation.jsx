import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Dropdown from '@tcp/core/src/components/common/molecules/Dropdown';
import style from '../styles/LeftNavigation.style';
import mockLeftSideNavigation from './mock';
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
 * @function LeftNavigation The AccountLayout component will provide a list of left
 * navigationLinks and the component associated with it
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {className} className Class name for the left navigation.
 * @param {active} active name of active element from the list
 * @param {data} data navigation data
 */

const LeftNavigation = ({ className }) => {
  const {
    data: { subnavigation: navData = [] },
  } = mockLeftSideNavigation;
  const navDropDown = navData.length && navData.map(nav => nav.leafLink);
  const activeComponent = useState(navDropDown[0].component || null);

  return (
    <React.Fragment>
      <Row className="is-hidden-nav">
        <Col colSize={{ large: 12, medium: 8, small: 6 }}>
          <Dropdown options={navDropDown} active={activeComponent[0]} isUpperCase />
        </Col>
      </Row>
      <Row className="is-visible-nav">
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
  );
};

LeftNavigation.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(LeftNavigation, style);
