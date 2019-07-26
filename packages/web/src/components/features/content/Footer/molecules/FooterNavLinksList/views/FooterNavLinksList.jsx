import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import styles from '../FooterNavLinksList.style';

const FooterNavLinksList = ({ className, listArray, colNum }) => {
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
            data-locator={`col_${colNum}_link_${index}`}
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

FooterNavLinksList.propTypes = {
  className: PropTypes.string.isRequired,
  listArray: PropTypes.shape([]).isRequired,
  colNum: PropTypes.number.isRequired,
};

export default withStyles(FooterNavLinksList, styles);

export { FooterNavLinksList as FooterNavLinksListVanilla };
