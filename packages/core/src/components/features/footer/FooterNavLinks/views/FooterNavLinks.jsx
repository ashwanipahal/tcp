// @flow
import React from 'react';
import FooterNavLinksList from '../../FooterNavLinksList';
import FooterNavHeader from '../../FooterNavHeader';
import withStyles from '../../../../common/hoc/withStyles';

import styles from '../FooterNavLinks.style';

type Props = {
  className: string,
  navLinkItems: object[],
  updateAccordionState: func,
  headerAsImage: boolean,
};

const FooterNavLinks = ({
  className,
  navLinkItems,
  updateAccordionState,
  headerAsImage,
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
          />
          <FooterNavLinksList listArray={item.links} index={index} />
        </div>
      ))}
    </div>
  );
};

export default withStyles(FooterNavLinks, styles);
export { FooterNavLinks as FooterNavLinksVanilla };
