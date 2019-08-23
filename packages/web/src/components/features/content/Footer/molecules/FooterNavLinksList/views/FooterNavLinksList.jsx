import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { routerPush } from '@tcp/core/src/utils';
import styles from '../FooterNavLinksList.style';

const FooterNavLinksList = ({
  className,
  listArray,
  colNum,
  openTrackOrder,
  isUserLoggedIn,
  setLoginModalMountState,
}) => {
  const trackLink = e => {
    e.preventDefault();
    if (!isUserLoggedIn) openTrackOrder({ state: true });
    else routerPush('/account', '/account');
  };
  const loginModalOpenClick = e => {
    e.preventDefault();
    setLoginModalMountState({ state: true });
  };
  const createLink = (linkItems, index) => {
    const isTrackOrderLink = linkItems.url.indexOf('track-order') > -1;
    const isLoginLink = linkItems.url.toLowerCase().indexOf('favorites') > -1;
    const toVal = isTrackOrderLink || isLoginLink ? '/#' : linkItems.url;
    let onClick;
    if (isTrackOrderLink) onClick = e => trackLink(e);
    if (isLoginLink) onClick = e => loginModalOpenClick(e);
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
  openTrackOrder: PropTypes.func,
  isUserLoggedIn: PropTypes.bool,
  setLoginModalMountState: PropTypes.func,
};

FooterNavLinksList.defaultProps = {
  openTrackOrder: () => null,
  isUserLoggedIn: false,
  setLoginModalMountState: () => null,
};

export default withStyles(FooterNavLinksList, styles);

export { FooterNavLinksList as FooterNavLinksListVanilla };
