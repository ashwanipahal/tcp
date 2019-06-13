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
        <FooterNavLinksList insideAcccordion listArray={navLinkItems[0].links} />
        <FooterNavLinksList insideAcccordion listArray={navLinkItems[1].links} />
        <FooterNavLinksList insideAcccordion listArray={navLinkItems[2].links} />
        <FooterNavLinksList insideAcccordion listArray={navLinkItems[3].links} />
        <FooterNavLinksList insideAcccordion listArray={navLinkItems[4].links} />
      </AccordionList>
    </Col>
  );
};

export default FooterMiddleMobile;
