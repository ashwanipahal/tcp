import React, { Fragment } from 'react';
import Col from '@tcp/core/src/components/common/atoms/Col';
import PropTypes from 'prop-types';
import FooterNavLinks from '../../FooterNavLinks';

const FooterMiddleDesktop = ({ navLinks, className, openTrackOrder, isUserLoggedIn }) => {
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
            isUserLoggedIn={isUserLoggedIn}
            openTrackOrder={openTrackOrder}
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

FooterMiddleDesktop.propTypes = {
  navLinks: PropTypes.shape([]).isRequired,
  className: PropTypes.string.isRequired,
  openTrackOrder: PropTypes.func,
  isUserLoggedIn: PropTypes.bool,
};

FooterMiddleDesktop.defaultProps = {
  openTrackOrder: () => null,
  isUserLoggedIn: false,
};

export default FooterMiddleDesktop;
