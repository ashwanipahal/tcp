// @flow
import React from 'react';
import FooterNavLinksList from '../../FooterNavLinksList';
import FooterNavHeader from '../../FooterNavHeader';

type Props = {
  className: string,
  navLinkItems: Object,
  updateAccordionState: Function,
  headerAsImage: boolean,
  isSubHeader: boolean,
  colNum: number,
};

const FooterNavLinks = ({
  className,
  navLinkItems,
  updateAccordionState,
  headerAsImage,
  isSubHeader,
  colNum,
}: Props) => {
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
      <FooterNavLinksList listArray={navLinkItems.links} colNum={colNum} />
    </div>
  );
};

export default FooterNavLinks;
