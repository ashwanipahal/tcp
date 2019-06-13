// @flow
import React, { Fragment } from 'react';
import FooterNavLinks from '../../FooterNavLinks';
import Col from '../../../../common/atoms/Col';

type Props = {
  navLinks: Object[],
  className: string,
};

const FooterMiddleDesktop = ({ navLinks, className }: Props) => {
  let numberOfNavLinkCols = navLinks.length;

  const navLinkColumns = [];

  for (let i = 2; i < navLinks.length; i += 1) {
    if (navLinks[i + 1] && navLinks[i + 1].isSubHeader) {
      // For each subheader, it is going to be one col less
      // as it will adjust in the previous column bottom itself.
      // Hence, reducing the number of nav link columns.
      numberOfNavLinkCols -= 1;
      navLinkColumns.push(
        <Col
          className="footer-middle__slot--"
          colSize={{
            large: 2,
            medium: 8,
            small: 6,
          }}
        >
          <FooterNavLinks
            className={className}
            navLinkItems={[{ header: navLinks[i].header, links: navLinks[i].links }]}
          />
          <FooterNavLinks
            className={className}
            isSubHeader
            navLinkItems={[{ header: navLinks[i + 1].header, links: navLinks[i + 1].links }]}
          />
        </Col>
      );
      i += 1;
    } else {
      navLinkColumns.push(
        <Col
          className="footer-middle__slot--"
          colSize={{
            large: 2,
            medium: 8,
            small: 6,
          }}
        >
          <FooterNavLinks
            className={className}
            navLinkItems={[{ header: navLinks[i].header, links: navLinks[i].links }]}
          />
        </Col>
      );
    }
  }

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
          className={className}
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
          className={className}
          navLinkItems={[{ header: navLinks[1].header, links: navLinks[1].links }]}
        />
      </Col>
      {numberOfNavLinkCols <= 5 ? (
        <Col
          className="footer-middle__slot--3 divider"
          colSize={{
            large: 1,
            medium: 8,
            small: 6,
          }}
        />
      ) : (
        ''
      )}
      {navLinkColumns}
    </Fragment>
  );
};

export default FooterMiddleDesktop;
