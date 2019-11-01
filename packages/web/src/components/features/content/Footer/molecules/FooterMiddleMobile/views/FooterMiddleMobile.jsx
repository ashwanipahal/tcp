import React from 'react';
import PropTypes from 'prop-types';
import AccordionList from '@tcp/core/src/components/common/molecules/AccordionList';
import { isCanada } from '@tcp/core/src/utils';
import Col from '@tcp/core/src/components/common/atoms/Col';
import FooterNavLinksList from '../../FooterNavLinksList';

const FooterMiddleMobile = ({
  className,
  navLinkItems,
  isLoggedIn,
  linkConfig,
  footerActionCreator,
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
        {/* To hide the second footer column for canada, we need to put check for index ===1 and isCanada */}
        {navLinkItems.map((item, index) =>
          index === 1 && isCanada() ? null : (
            <FooterNavLinksList
              insideAcccordion
              listArray={item.links}
              isLoggedIn={isLoggedIn}
              linkConfig={linkConfig}
              footerActionCreator={footerActionCreator}
            />
          )
        )}
      </AccordionList>
    </Col>
  );
};

FooterMiddleMobile.propTypes = {
  className: PropTypes.string.isRequired,
  navLinkItems: PropTypes.shape([]).isRequired,
  isLoggedIn: PropTypes.bool,
  linkConfig: PropTypes.shape({
    'track-order': PropTypes.func,
    favorites: PropTypes.func,
    'log-out': PropTypes.func,
    'login-account': PropTypes.func,
    'create-account': PropTypes.func,
  }).isRequired,
  footerActionCreator: PropTypes.func.isRequired,
};

FooterMiddleMobile.defaultProps = {
  isLoggedIn: false,
};

export default FooterMiddleMobile;
