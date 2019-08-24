import React from 'react';
import PropTypes from 'prop-types';

import FooterNavLinksList from '../../FooterNavLinksList';
import FooterNavHeader from '../../FooterNavHeader';

const FooterNavLinks = ({
  className,
  navLinkItems,
  updateAccordionState,
  headerAsImage,
  isSubHeader,
  colNum,
  openTrackOrder,
  isUserLoggedIn,
  loginModalMountedState,
  setLoginModalMountState,
}) => {
  return (
    <div className={`${className} container-nav-link`} key={navLinkItems.id} data-index={colNum}>
      <FooterNavHeader
        headerAsImage={headerAsImage}
        titleText={navLinkItems.header.text}
        titleObj={navLinkItems.header}
        updateAccordionState={updateAccordionState}
        isSubHeader={isSubHeader}
        colNum={colNum}
      />
      <FooterNavLinksList
        listArray={navLinkItems.links}
        colNum={colNum}
        isUserLoggedIn={isUserLoggedIn}
        openTrackOrder={openTrackOrder}
        loginModalMountedState={loginModalMountedState}
        setLoginModalMountState={setLoginModalMountState}
      />
    </div>
  );
};

FooterNavLinks.propTypes = {
  className: PropTypes.string.isRequired,
  navLinkItems: PropTypes.shape({}).isRequired,
  updateAccordionState: PropTypes.func.isRequired,
  headerAsImage: PropTypes.bool.isRequired,
  isSubHeader: PropTypes.bool.isRequired,
  colNum: PropTypes.number.isRequired,
  openTrackOrder: PropTypes.func,
  isUserLoggedIn: PropTypes.bool,
  setLoginModalMountState: PropTypes.bool.isRequired,
  loginModalMountedState: PropTypes.bool.isRequired,
};

FooterNavLinks.defaultProps = {
  openTrackOrder: () => null,
  isUserLoggedIn: false,
};

export default FooterNavLinks;
