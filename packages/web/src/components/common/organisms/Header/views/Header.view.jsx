import React from 'react';
import { PropTypes } from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../Header.style';

const Header = ({ className }) => (
  <header className={className}>
    <div className="header-topnav">
      <Row>
        <Col
          className="header-topnav__brand-tabs"
          colSize={{
            large: 2,
            medium: 2,
            small: 3,
          }}
        >
          Brand tabs
        </Col>
        <Col
          className="header-topnav__promo-area"
          colSize={{
            large: 8,
            medium: 4,
            small: 3,
          }}
        >
          Promo area
        </Col>
        <Col
          className="header-topnav__track-order"
          colSize={{
            large: 2,
            medium: 2,
            small: 3,
          }}
        >
          Track order
        </Col>
      </Row>
    </div>
  </header>
);

Header.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(Header, style);
export { Header as FooterVanilla };
