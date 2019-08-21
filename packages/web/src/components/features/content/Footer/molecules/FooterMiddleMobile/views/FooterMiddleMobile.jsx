import React from 'react';
import PropTypes from 'prop-types';
import AccordionList from '@tcp/core/src/components/common/molecules/AccordionList';
import Col from '@tcp/core/src/components/common/atoms/Col';
import FooterNavLinksList from '../../FooterNavLinksList';

const FooterMiddleMobile = ({ className, navLinkItems, openTrackOrder, isUserLoggedIn }) => {
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
            isUserLoggedIn={isUserLoggedIn}
            openTrackOrder={openTrackOrder}
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
  isUserLoggedIn: PropTypes.bool,
};

FooterMiddleMobile.defaultProps = {
  openTrackOrder: () => null,
  isUserLoggedIn: false,
};

export default FooterMiddleMobile;
