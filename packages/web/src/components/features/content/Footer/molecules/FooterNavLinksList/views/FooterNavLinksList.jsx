import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { routerPush, scrollPage } from '@tcp/core/src/utils';
import styles from '../FooterNavLinksList.style';

/**
 *
 * @param {string} className set the classname for styling purpose.
 * @param {Object} listArray link list array.
 * @param {number} colnum col number.
 * @param {boolean} isLoggedIn to check if user is logged in or not.
 * @param {Object} linkConfig all the footer link action mappings
 */
const FooterNavLinksList = ({
  className,
  listArray,
  colNum,
  isLoggedIn,
  linkConfig,
  footerActions,
}) => {
  const trackLink = (e, fn) => {
    e.preventDefault();
    if (!isLoggedIn) footerActions(fn, { state: true });
    else routerPush('/account', '/account');
  };

  const loginModalOpenClick = (e, fn) => {
    e.preventDefault();
    footerActions(fn, { state: true });
  };

  const logout = (e, fn) => {
    e.preventDefault();
    scrollPage();
    footerActions(fn);
  };

  const myAccountLogin = (e, fn) => {
    e.preventDefault();
    scrollPage();
    footerActions(fn, {
      component: 'login',
      variation: 'primary',
    });
  };

  const getOnClickAction = (
    { isTrackOrderLink, isLoginLink, isLogoutLink, isMyAccountLink },
    dispatchFn
  ) => {
    let onClick = null;
    if (isTrackOrderLink) onClick = e => trackLink(e, dispatchFn);
    if (isLoginLink) onClick = e => loginModalOpenClick(e, dispatchFn);
    if (isLogoutLink) onClick = e => logout(e, dispatchFn);
    if (isMyAccountLink) onClick = e => myAccountLogin(e, dispatchFn);

    return onClick;
  };

  /**
   * @function createLink to create footer links.
   * @param {object} linkItems list of all the footer links.
   * @param {number} index index number to track all the references.
   * @returns JSX of the link.
   */
  const createNavListItem = (linkItems, index) => {
    /*
      if linkItems.url have any keyword, on which we need an action event getting fired,
      then we need to check for its index, if found, we set a function to dispatch the action.
      else, it will set the linkItems.url to the component directly for default behaviour.
    */
    const isTrackOrderLink = linkItems.action === 'track-order';
    const isLoginLink = linkItems.action === 'favorites';
    const isLogoutLink = linkItems.action === 'log-out';
    const isMyAccountLink = linkItems.action === 'my-account';
    const dispatchFn = linkItems.action ? linkConfig[linkItems.action] : null;
    const hideLink = (isLoggedIn && isMyAccountLink) || (!isLoggedIn && isLogoutLink) || false;
    const onClick = getOnClickAction(
      { isTrackOrderLink, isLoginLink, isLogoutLink, isMyAccountLink },
      dispatchFn
    );

    return !hideLink ? (
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
          onClick={onClick}
        >
          {linkItems.text}
        </Anchor>
      </li>
    ) : null;
  };

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
  isLoggedIn: PropTypes.bool,
  linkConfig: PropTypes.shape({}).isRequired,
  footerActions: PropTypes.func.isRequired,
};

FooterNavLinksList.defaultProps = {
  isLoggedIn: false,
};

export default withStyles(FooterNavLinksList, styles);

export { FooterNavLinksList as FooterNavLinksListVanilla };
