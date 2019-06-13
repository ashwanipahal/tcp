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
            // TODO - Resolve the prettier and eslint conflict here
            // eslint-disable-next-line
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
          ))
        : ''}
    </div>
  );
};

export default withStyles(FooterNavLinksList, styles);

export { FooterNavLinksList as FooterNavLinksListVanilla };
