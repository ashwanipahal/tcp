import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import FooterMiddleMobile from '@tcp/core/src/components/features/footer/FooterMiddleMobile';
import FooterMiddleDesktop from '@tcp/core/src/components/features/footer/FooterMiddleDesktop/views';

import style from '../Footer.style';
import LegalLinks from '../../../molecules/LegalLinks';
import Copyright from '../../../molecules/Copyright';

const Footer = ({ className, copyrightText, legalLinks, navLinks }) => (
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
          EMAIL AND REFER A FRIEND
        </Col>
        <Col
          className="footer-top__slot--2"
          colSize={{
            large: 4,
            medium: 4,
            small: 6,
          }}
        >
          SOCIAL MEDIA LINKS
        </Col>
      </Row>
    </div>
    <Row className="footer-middle mobile" fullBleed>
      <FooterMiddleMobile className={className} navLinkItems={navLinks} />
    </Row>
    <Row className="footer-middle desktop">
      <FooterMiddleDesktop navLinks={navLinks} />
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
        <Copyright>{copyrightText}</Copyright>
      </Col>
      <Col
        className="footer-bottom__slot--2"
        colSize={{
          large: 6,
          medium: 8,
          small: 6,
        }}
      >
        <LegalLinks links={legalLinks} />
      </Col>
      <Col
        className="footer-bottom__slot--3"
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        COUNTRY SELECTOR
      </Col>
    </Row>
  </footer>
);

Footer.propTypes = {
  className: PropTypes.string.isRequired,
  copyrightText: PropTypes.string,
  legalLinks: PropTypes.shape({}),
  navLinks: PropTypes.shape({}),
};

Footer.defaultProps = {
  copyrightText: '',
  legalLinks: [],
  navLinks: [],
};

export default withStyles(Footer, style);
export { Footer as FooterVanilla };
