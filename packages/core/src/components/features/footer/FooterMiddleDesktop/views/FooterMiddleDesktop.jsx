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
          colSize={{
            large: 2,
            medium: 8,
            small: 6,
          }}
        >
          <FooterNavLinks
            className={className}
            navLinkItems={{ header: navLinks[i].header, links: navLinks[i].links }}
            colNum={i}
          />
          <FooterNavLinks
            className={className}
            isSubHeader
            navLinkItems={{ header: navLinks[i + 1].header, links: navLinks[i + 1].links }}
            colNum={i + 1}
          />
        </Col>
      );
      i += 1;
    } else {
      navLinkColumns.push(
        <Col
          colSize={{
            large: 2,
            medium: 8,
            small: 6,
          }}
        >
          <FooterNavLinks
            className={className}
            navLinkItems={{ header: navLinks[i].header, links: navLinks[i].links }}
            colNum={i}
          />
        </Col>
      );
    }
  }

  return (
    <Fragment>
      <Col
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        <FooterNavLinks
          headerAsImage
          className={className}
          navLinkItems={{ header: navLinks[0].header, links: navLinks[0].links }}
          colNum={0}
        />
      </Col>
      <Col
        colSize={{
          large: 2,
          medium: 8,
          small: 6,
        }}
      >
        <FooterNavLinks
          headerAsImage
          className={className}
          navLinkItems={{ header: navLinks[1].header, links: navLinks[1].links }}
          colNum={1}
        />
      </Col>
      {numberOfNavLinkCols <= 5 ? (
        <Col
          className="divider"
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
