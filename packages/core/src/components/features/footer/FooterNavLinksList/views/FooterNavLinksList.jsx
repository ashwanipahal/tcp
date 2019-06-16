// @flow
import React from 'react';
import Anchor from '../../../../common/atoms/Anchor';
import styles from '../FooterNavLinksList.style';
import withStyles from '../../../../common/hoc/withStyles';

type Props = {
  className: string,
  listArray: Object[],
};

const FooterNavLinksList = ({ className, listArray }: Props) => {
  return (
    <div className={`${className} list`}>
      {listArray.map(linkItems => (
        <div className="achor-wrapper">
          <Anchor
            className={className}
            noLink
            to={linkItems.url}
            anchorVariation="primary"
            fontSizeVariation="large"
            data-locator={linkItems.url}
          >
            {linkItems.text}
          </Anchor>
        </div>
      ))}
    </div>
  );
};

export default withStyles(FooterNavLinksList, styles);

export { FooterNavLinksList as FooterNavLinksListVanilla };
