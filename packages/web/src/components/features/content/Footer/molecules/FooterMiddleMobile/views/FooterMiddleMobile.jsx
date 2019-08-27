import React from 'react';
import PropTypes from 'prop-types';
import AccordionList from '@tcp/core/src/components/common/molecules/AccordionList';
import Col from '@tcp/core/src/components/common/atoms/Col';
import FooterNavLinksList from '../../FooterNavLinksList';

const FooterMiddleMobile = ({
  className,
  navLinkItems,
  openTrackOrder,
  isLoggedIn,
  closeNavigationDrawer,
}) => {
  return (
    <Col
      colSize={{
        large: 12,
        medium: 8,
        small: 6,
      }}
      ignoreGutter={{ small: true, medium: true }}
    >
      <AccordionList className={className} accordionItems={navLinkItems}>
        {navLinkItems.map(item => (
          <FooterNavLinksList
            insideAcccordion
            listArray={item.links}
            isLoggedIn={isLoggedIn}
            openTrackOrder={openTrackOrder}
            closeNavigationDrawer={closeNavigationDrawer}
          />
        ))}
      </AccordionList>
    </Col>
  );
};

FooterMiddleMobile.propTypes = {
  className: PropTypes.string.isRequired,
  navLinkItems: PropTypes.shape([]).isRequired,
  openTrackOrder: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  closeNavigationDrawer: PropTypes.func.isRequired,
};

FooterMiddleMobile.defaultProps = {
  openTrackOrder: () => null,
  isLoggedIn: false,
};

export default FooterMiddleMobile;
