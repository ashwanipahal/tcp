import React from 'react';
import { PropTypes } from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../Footer.style';

const Footer = ({ className }) => (
  <footer className={className}>
    <div className="footer-top">
      <Row>
        <Col
          className="footer-top__slot--1"
          colSize={{
            large: 8,
            medium: 4,
            small: 6,
          }}
        >
          slot 1
        </Col>
        <Col
          className="footer-top__slot--2"
          colSize={{
            large: 4,
            medium: 4,
            small: 6,
          }}
        >
          slot 2
        </Col>
      </Row>
    </div>
    <Row className="footer-middle">
      <Col
        className="footer-middle__slot--1"
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        slot 1
      </Col>
      <Col
        className="footer-middle__slot--2"
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        slot 2
      </Col>
      <Col
        className="footer-middle__slot--3"
        colSize={{
          large: 8,
          medium: 8,
          small: 6,
        }}
      >
        slot 3
      </Col>
    </Row>
    <Row className="footer-bottom">
      <Col
        className="footer-bottom__slot--1"
        colSize={{
          large: 4,
          medium: 8,
          small: 6,
        }}
      >
        slot 1
      </Col>
      <Col
        className="footer-bottom__slot--2"
        colSize={{
          large: 6,
          medium: 8,
          small: 6,
        }}
      >
        slot 2
      </Col>
      <Col
        className="footer-bottom__slot--3"
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        slot 3
      </Col>
    </Row>
  </footer>
);

Footer.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(Footer, style);
export { Footer as FooterVanilla };
