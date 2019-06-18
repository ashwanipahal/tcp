// @flow
import React from 'react';
import FooterNavLinksList from '../../FooterNavLinksList';
import FooterNavHeader from '../../FooterNavHeader';

type Props = {
  className: string,
  navLinkItems: Object[],
  updateAccordionState: Function,
  headerAsImage: boolean,
  isSubHeader: boolean,
};

const FooterNavLinks = ({
  className,
  navLinkItems,
  updateAccordionState,
  headerAsImage,
  isSubHeader,
}: Props) => {
  return (
    <div>
      {navLinkItems.map((item, index) => (
        <div className={`${className} container-nav-link`} key={item.id} data-index={index}>
          <FooterNavHeader
            headerAsImage={headerAsImage}
            titleText={item.header.text}
            titleObj={item.header}
            updateAccordionState={updateAccordionState}
            isSubHeader={isSubHeader}
          />
          <FooterNavLinksList listArray={item.links} />
        </div>
      ))}
    </div>
  );
};

export default FooterNavLinks;
