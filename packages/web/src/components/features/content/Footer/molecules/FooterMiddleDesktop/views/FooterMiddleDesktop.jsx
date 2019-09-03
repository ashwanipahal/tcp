import React, { Fragment } from 'react';
import Col from '@tcp/core/src/components/common/atoms/Col';
import PropTypes from 'prop-types';
import OpenLoginModal from '@tcp/core/src/components/features/account/LoginPage/views/LoginModal';
import FooterNavLinks from '../../FooterNavLinks';

const FooterMiddleDesktop = ({
  navLinks,
  className,
  isLoggedIn,
  loginModalMountedState,
  setLoginModalMountState,
  linkConfig,
  footerActionCreator,
}) => {
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
            navLinkItems={{
              header: navLinks[i].header,
              links: navLinks[i].links,
            }}
            colNum={i}
            linkConfig={linkConfig}
            footerActionCreator={footerActionCreator}
          />
          <FooterNavLinks
            className={className}
            isSubHeader
            navLinkItems={{
              header: navLinks[i + 1].header,
              links: navLinks[i + 1].links,
            }}
            colNum={i + 1}
            linkConfig={linkConfig}
            footerActionCreator={footerActionCreator}
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
            navLinkItems={{
              header: navLinks[i].header,
              links: navLinks[i].links,
            }}
            colNum={i}
            isLoggedIn={isLoggedIn}
            linkConfig={linkConfig}
            footerActionCreator={footerActionCreator}
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
          navLinkItems={{
            header: navLinks[0].header,
            links: navLinks[0].links,
          }}
          colNum={0}
          linkConfig={linkConfig}
          footerActionCreator={footerActionCreator}
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
          navLinkItems={{
            header: navLinks[1].header,
            links: navLinks[1].links,
          }}
          colNum={1}
          linkConfig={linkConfig}
          footerActionCreator={footerActionCreator}
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
      {!isLoggedIn && (
        <OpenLoginModal
          variation="favorites"
          setLoginModalMountState={setLoginModalMountState}
          openState={loginModalMountedState}
        />
      )}
    </Fragment>
  );
};

FooterMiddleDesktop.propTypes = {
  navLinks: PropTypes.shape([]).isRequired,
  className: PropTypes.string.isRequired,
  loginModalMountedState: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  setLoginModalMountState: PropTypes.func.isRequired,
  linkConfig: PropTypes.shape({}).isRequired,
  footerActionCreator: PropTypes.func.isRequired,
};

export default FooterMiddleDesktop;
