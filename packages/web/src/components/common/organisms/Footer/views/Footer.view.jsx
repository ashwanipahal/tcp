import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import FooterMiddleMobile from '@tcp/core/src/components/features/footer/FooterMiddleMobile';
import FooterMiddleDesktop from '@tcp/core/src/components/features/footer/FooterMiddleDesktop/views';

import style from '../Footer.style';
import { LegalLinks, Copyright, SocialMediaLinks } from '../../../molecules';

const Footer = ({ className, copyrightText, legalLinks, navLinks, socialMediaLinks }) => (
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
        />
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
    <Row
      className="footer-middle mobile"
      fullBleed={{
        large: true,
        medium: true,
        small: true,
      }}
    >
      <FooterMiddleMobile className={className} navLinkItems={navLinks} />
    </Row>
    <Row className="footer-middle desktop">
      <FooterMiddleDesktop className={className} navLinks={navLinks} />
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
        />
      </Row>
    </div>
  </footer>
);

Footer.propTypes = {
  className: PropTypes.string.isRequired,
  copyrightText: PropTypes.string,
  navLinks: PropTypes.shape({}),
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
  navLinks: [],
  socialMediaLinks: [],
};

export default withStyles(Footer, style);
export { Footer as FooterVanilla };
