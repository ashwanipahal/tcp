// @flow
import React, { Fragment } from 'react';
import FooterNavLinks from '../../FooterNavLinks';
import Col from '../../../../common/atoms/Col';

type Props = {
  navLinks: Object[],
};

const FooterMiddleDesktop = ({ navLinks }: Props) => {
  return (
    <Fragment>
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
        className="footer-middle__slot--2"
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
        className="footer-middle__slot--3 divider"
        colSize={{
          large: 1,
          medium: 8,
          small: 6,
        }}
      />
      <Col
        className="footer-middle__slot--4"
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        <FooterNavLinks navLinkItems={[{ header: navLinks[2].header, links: navLinks[2].links }]} />
      </Col>
      <Col
        className="footer-middle__slot--5"
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        <FooterNavLinks navLinkItems={[{ header: navLinks[3].header, links: navLinks[3].links }]} />
      </Col>
      <Col
        className="footer-middle__slot--6"
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        <FooterNavLinks navLinkItems={[{ header: navLinks[4].header, links: navLinks[4].links }]} />
      </Col>
    </Fragment>
  );
};

export default FooterMiddleDesktop;
