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
};

FooterNavLinks.defaultProps = {
  openTrackOrder: () => null,
  isUserLoggedIn: false,
};

export default FooterNavLinks;
