import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import FooterMiddle from '@tcp/core/src/components/features/footer/FooterMiddle';
import FooterNavLinks from '@tcp/core/src/components/features/footer/FooterNavLinks';

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
      <FooterMiddle className={className} navLinkItems={navLinks} />
    </Row>
    <Row className="footer-middle desktop">
      <Col
        className="footer-middle__slot--1"
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        <FooterNavLinks
          headerAsImage
          navLinkItems={[{ header: navLinks[0].header, links: navLinks[0].links }]}
        />
      </Col>
      <Col
        className="footer-middle__slot--1"
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        <FooterNavLinks
          headerAsImage
          navLinkItems={[{ header: navLinks[1].header, links: navLinks[1].links }]}
        />
      </Col>
      <Col
        className="footer-middle__slot--1 divider"
        colSize={{
          large: 1,
          medium: 8,
          small: 6,
        }}
      />
      <Col
        className="footer-middle__slot--1"
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        <FooterNavLinks navLinkItems={[{ header: navLinks[2].header, links: navLinks[2].links }]} />
      </Col>
      <Col
        className="footer-middle__slot--1"
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        <FooterNavLinks navLinkItems={[{ header: navLinks[3].header, links: navLinks[3].links }]} />
      </Col>
      <Col
        className="footer-middle__slot--1"
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        <FooterNavLinks navLinkItems={[{ header: navLinks[4].header, links: navLinks[4].links }]} />
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
  legalLinks: PropTypes.arrayOf,
  navLinks: PropTypes.arrayOf,
};

Footer.defaultProps = {
  copyrightText: '',
  legalLinks: [],
  navLinks: [],
};

export default withStyles(Footer, style);
export { Footer as FooterVanilla };
