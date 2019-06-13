// @flow
import React from 'react';
import Anchor from '../../../../common/atoms/Anchor';
import styles from '../FooterNavLinksList.style';
import withStyles from '../../../../common/hoc/withStyles';

type Props = {
  className: string,
  listArray: object[],
};

const FooterNavLinksList = ({ className, listArray }: Props) => {
  return (
    <div className={`${className} list`}>
      {listArray && listArray.length
        ? listArray.map(linkItems => (
            <Anchor
              className={className}
              noLink
              to={linkItems.url}
              anchorVariation="primary"
              fontSizeVariation="large"
            >
              {linkItems.text}
            </Anchor>
          ))
        : ''}
    </div>
  );
};

export default withStyles(FooterNavLinksList, styles);

export { FooterNavLinksList as FooterNavLinksListVanilla };
