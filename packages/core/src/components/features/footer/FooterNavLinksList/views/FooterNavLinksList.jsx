// @flow
import React from 'react';
import Anchor from '../../../../common/atoms/Anchor';
import styles from '../FooterNavLinksList.style';
import withStyles from '../../../../common/hoc/withStyles';

type Props = {
  className: string,
  listArray: Object[],
  colNum: number,
};

const FooterNavLinksList = ({ className, listArray, colNum }: Props) => {
  return (
    <ul className={`${className} list`}>
      {listArray.map((linkItems, index) => (
        <li>
          <Anchor
            className={className}
            noLink
            to={linkItems.url}
            anchorVariation="primary"
            fontSizeVariation="large"
            dataLocator={`col_${colNum}_link_${index}`}
            target={linkItems.target}
            title={linkItems.title}
          >
            {linkItems.text}
          </Anchor>
        </li>
      ))}
    </ul>
  );
};

export default withStyles(FooterNavLinksList, styles);

export { FooterNavLinksList as FooterNavLinksListVanilla };
