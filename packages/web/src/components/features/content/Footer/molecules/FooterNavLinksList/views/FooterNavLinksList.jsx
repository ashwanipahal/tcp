import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { routerPush } from '@tcp/core/src/utils';
import styles from '../FooterNavLinksList.style';

const FooterNavLinksList = ({ className, listArray, colNum, openTrackOrder, isUserLoggedIn }) => {
  const trackLink = e => {
    e.preventDefault();
    if (!isUserLoggedIn) openTrackOrder({ state: true });
    else routerPush('/account', '/account');
  };
  const createLink = (linkItems, index) => {
    const toVal = linkItems.title === 'Track Order' ? '#' : linkItems.url;
    const onClick = linkItems.title === 'Track Order' ? e => trackLink(e) : null;
    return (
      <Anchor
        className={className}
        noLink
        to={toVal}
        anchorVariation="primary"
        fontSizeVariation="large"
        data-locator={`col_${colNum}_link_${index}`}
        target={linkItems.target}
        title={linkItems.title}
        onClick={onClick}
      >
        {linkItems.text}
      </Anchor>
    );
  };
  const createNavListItem = (linkItems, index) => <li>{createLink(linkItems, index)}</li>;

  return (
    <ul className={`${className} list`}>
      {listArray.map((linkItems, index) => createNavListItem(linkItems, index))}
    </ul>
  );
};

FooterNavLinksList.propTypes = {
  className: PropTypes.string.isRequired,
  listArray: PropTypes.shape([]).isRequired,
  colNum: PropTypes.number.isRequired,
  openTrackOrder: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default withStyles(FooterNavLinksList, styles);

export { FooterNavLinksList as FooterNavLinksListVanilla };
