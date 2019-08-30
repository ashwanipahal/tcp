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
  isLoggedIn,
  linkConfig,
  footerActions,
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
        isLoggedIn={isLoggedIn}
        linkConfig={linkConfig}
        footerActions={footerActions}
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
  isLoggedIn: PropTypes.bool,
  linkConfig: PropTypes.shape({}).isRequired,
  footerActions: PropTypes.func.isRequired,
};

FooterNavLinks.defaultProps = {
  isLoggedIn: false,
};

export default FooterNavLinks;
