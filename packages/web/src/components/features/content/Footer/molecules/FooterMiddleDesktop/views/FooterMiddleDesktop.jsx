import React, { Fragment } from 'react';
import Col from '@tcp/core/src/components/common/atoms/Col';
import PropTypes from 'prop-types';
import OpenLoginModal from '@tcp/core/src/components/features/account/LoginPage/views/LoginModal';
import { isCanada } from '@tcp/core/src/utils';
import FooterNavLinks from '../../FooterNavLinks';

const renderFooterNavLinks = (
  navLink,
  className,
  colNum,
  linkConfig,
  footerActionCreator,
  { isSubHeader, isLoggedIn, headerAsImage } = {}
) => {
  if (!navLink) {
    return null;
  }

  return (
    <FooterNavLinks
      className={className}
      isSubHeader={isSubHeader}
      isLoggedIn={isLoggedIn}
      headerAsImage={headerAsImage}
      navLinkItems={{
        header: navLink.header,
        links: navLink.links,
      }}
      colNum={colNum}
      linkConfig={linkConfig}
      footerActionCreator={footerActionCreator}
    />
  );
};

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
          {renderFooterNavLinks(navLinks[i], className, i, linkConfig, footerActionCreator)}
          {renderFooterNavLinks(
            navLinks[i + 1],
            className,
            i + 1,
            linkConfig,
            footerActionCreator,
            {
              isSubHeader: true,
            }
          )}
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
          {renderFooterNavLinks(navLinks[i], className, i, linkConfig, footerActionCreator, {
            isSubHeader: false,
            isLoggedIn,
          })}
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
        {renderFooterNavLinks(navLinks[0], className, 0, linkConfig, footerActionCreator, {
          isSubHeader: false,
          isLoggedIn,
          headerAsImage: true,
        })}
      </Col>
      {!isCanada() ? (
        <Col
          colSize={{
            large: 2,
            medium: 8,
            small: 6,
          }}
        >
          {renderFooterNavLinks(navLinks[1], className, 1, linkConfig, footerActionCreator, {
            isSubHeader: false,
            isLoggedIn,
            headerAsImage: true,
          })}
        </Col>
      ) : null}
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
  linkConfig: PropTypes.shape({
    'track-order': PropTypes.func,
    favorites: PropTypes.func,
    'log-out': PropTypes.func,
    'login-account': PropTypes.func,
    'create-account': PropTypes.func,
  }).isRequired,
  footerActionCreator: PropTypes.func.isRequired,
};

export default FooterMiddleDesktop;
