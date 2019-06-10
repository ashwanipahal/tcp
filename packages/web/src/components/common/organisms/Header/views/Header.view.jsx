import React from 'react';
import { PropTypes } from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../Header.style';

const Header = ({ className }) => (
  <header className={className}>
    <Row>
      <Col
        colSize={{
          large: 12,
          medium: 8,
          small: 6,
        }}
      >
        Top header
      </Col>
    </Row>
  </header>
);

Header.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(Header, style);
export { Header as FooterVanilla };
