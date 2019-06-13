// @flow
import React from 'react';
import FooterNavLinksList from '../../FooterNavLinksList';
import AccordionList from '../../../../common/molecules/AccordionList';
import Col from '../../../../common/atoms/Col';

type Props = {
  className: string,
  navLinkItems: Object[],
};

const FooterMiddleMobile = ({ className, navLinkItems }: Props) => {
  return (
    <Col
      className="footer-middle__slot--1"
      colSize={{
        large: 12,
        medium: 8,
        small: 6,
      }}
      ignoreGutter={{ small: true, medium: true }}
    >
      <AccordionList className={className} accordionItems={navLinkItems}>
        {navLinkItems.map(item => (
          <FooterNavLinksList insideAcccordion listArray={item.links} />
        ))}
      </AccordionList>
    </Col>
  );
};

export default FooterMiddleMobile;
