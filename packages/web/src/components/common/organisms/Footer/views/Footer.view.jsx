import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';

const Footer = () => (
  <footer>
    <Row className="footer-top">
      <Col
        colConfig={{
          colCount: {
            small: 4,
            medium: 8,
            large: 12,
          },
          colOffset: {
            small: 0,
            medium: 0,
            large: 0,
            xlarge: 0,
          },
        }}
      />
    </Row>
    <Row className="footer-middle" />
    <Row className="footer-bottom" />
  </footer>
);

export default Footer;
