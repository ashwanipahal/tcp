import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../Footer.style';
import { LegalLinks, Copyright, SocialMediaLinks } from '../../../molecules';

const Footer = ({ className, copyrightText, legalLinks, socialMediaLinks }) => (
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
          <SocialMediaLinks {...socialMediaLinks} />
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
        MPR AREA
      </Col>
      <Col
        className="footer-middle__slot--2"
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        MPRCC AREA
      </Col>
      <Col
        className="footer-middle__slot--3"
        colSize={{
          large: 8,
          medium: 8,
          small: 6,
        }}
      >
        NAV LINKS
      </Col>
    </Row>
    <div className="footer-bottom">
      <Row className="fullbleed-mobile">
        <Col
          className="footer-bottom__slot--1 default-offset"
          colSize={{
            large: 4,
            medium: 8,
            small: 6,
          }}
        >
          <Copyright>{copyrightText}</Copyright>
        </Col>
        <Col
          className="footer-bottom__slot--2 default-offset"
          colSize={{
            large: 6,
            medium: 8,
            small: 6,
          }}
        >
          <LegalLinks links={legalLinks} />
        </Col>
        <Col
          className="footer-bottom__slot--3 default-offset"
          colSize={{
            large: 2,
            medium: 8,
            small: 6,
          }}
        >
          COUNTRY SELECTOR
        </Col>
      </Row>
    </div>
  </footer>
);

Footer.propTypes = {
  className: PropTypes.string.isRequired,
  copyrightText: PropTypes.string,
  legalLinks: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.text,
    })
  ),
  socialMediaLinks: PropTypes.shape({
    icon_class: PropTypes.string,
    title: PropTypes.string,
  }),
};

Footer.defaultProps = {
  copyrightText: '',
  legalLinks: [],
  socialMediaLinks: [],
};

export default withStyles(Footer, style);
export { Footer as FooterVanilla };
