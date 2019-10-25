import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { routerPush, configureInternalNavigationFromCMSUrl } from '@tcp/core/src/utils';
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
  footerActionCreator,
}) => {
  const trackOrderLink = (e, handler) => {
    e.preventDefault();
    if (!isLoggedIn) footerActionCreator(handler, { state: true });
    else routerPush('/account', '/account');
  };

  const loginModalOpenClick = (e, handler) => {
    e.preventDefault();
    footerActionCreator(handler, { state: true });
  };

  const logout = (e, handler) => {
    e.preventDefault();
    footerActionCreator(handler);
  };

  const myAccountLogin = (e, handler) => {
    e.preventDefault();
    // TO-DO : When the header is fixed at top, we can remove the scroll page call.
    footerActionCreator(handler, {
      component: 'login',
      variation: 'primary',
    });
  };

  const createNewAccount = (e, handler) => {
    e.preventDefault();
    footerActionCreator(handler, {
      component: 'createAccount',
      variation: 'primary',
    });
  };

  const createAccountOnClick = (action, linkItems, dispatchFn, onClick) => {
    let onClickVal = onClick;
    if (action === 'create-account' || linkItems.url === '/create-account')
      onClickVal = e => createNewAccount(e, dispatchFn);
    return onClickVal;
  };

  /**
   * Callback for redux action mapped to link action type
   * @callback dispatchFn
   * @param {Object} payload
   */

  /**
   * @function getOnClickAction
   * @param {string} action - link action type
   * @param {dispatchFn} dispatchFn -  redux action mapped to link action type
   */
  const getOnClickAction = (action, dispatchFn, linkItems) => {
    let onClick = null;
    if (action === 'track-order' || linkItems.url === '/track-order')
      onClick = e => trackOrderLink(e, dispatchFn);
    if (action === 'favorites' || linkItems.url === '/favorites')
      onClick = e => loginModalOpenClick(e, dispatchFn);
    if (action === 'log-out' || linkItems.url === '/log-out') onClick = e => logout(e, dispatchFn);
    if (action === 'login-account' || linkItems.url === '/login-account')
      onClick = e => myAccountLogin(e, dispatchFn);
    onClick = createAccountOnClick(action, linkItems, dispatchFn, onClick);
    return onClick;
  };

  /**
   * @function createLink to create footer links.
   * @param {object} linkItems list of all the footer links.
   * @param {number} index index number to track all the references.
   * @returns JSX of the link.
   */

  const hideLogoutMyActLinkBool = linkItems => {
    return (
      (isLoggedIn &&
        (linkItems.action === 'login-account' || linkItems.url === '/login-account')) ||
      (!isLoggedIn && (linkItems.action === 'log-out' || linkItems.url === '/log-out')) ||
      (isLoggedIn && (linkItems.action === 'create-account' || linkItems.url === '/create-account'))
    );
  };

  const createNavListItem = (linkItems, index) => {
    const linkAction = linkItems.action;
    const linkUrl = linkItems.url;
    let dispatchFn = null;
    if (linkUrl) {
      dispatchFn = linkConfig[linkUrl];
    } else {
      dispatchFn = linkConfig[linkAction];
    }
    /*
      hideLogoutMyActLink - true - if linkAction is login-account and user is logged in.
      hideLogoutMyActLink - true - if linkAction is log-out and user is  not logged in.
       hideLogoutMyActLink - false - other wise false, to show the other links.
      This condition is to satisfy the use case, to toggle between My Account and logout
      footer links.
      Use Case - When user is logged in, only Logout link should be visible to user.
                When user is not logged in, only My Account link should be visible to user.
      Problem Scenario - As the footer links are statically configured in CMS, if this condition
              is not put, user will be seeing both the links all the time.
    */
    const hideLogoutMyActLink = hideLogoutMyActLinkBool(linkItems) || false;
    const onClick =
      linkAction || linkItems.url ? getOnClickAction(linkAction, dispatchFn, linkItems) : null;

    const { url: ctaUrl, target, title, actualUrl } = linkItems;

    let to = actualUrl;
    if (!actualUrl) {
      to = configureInternalNavigationFromCMSUrl(ctaUrl);
    }

    return !hideLogoutMyActLink ? (
      <li>
        {linkAction || linkItems.url ? (
          <Button
            type="button"
            data-locator={`col_${colNum}_link_${index}`}
            onClick={onClick}
            link
            title={linkItems.title}
          >
            {linkItems.text}
          </Button>
        ) : (
          <Anchor
            className={className}
            anchorVariation="primary"
            fontSizeVariation="large"
            dataLocator={`col_${colNum}_link_${index}`}
            to={to}
            asPath={ctaUrl}
            target={target}
            title={title}
          >
            {linkItems.text}
          </Anchor>
        )}
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
  linkConfig: PropTypes.shape({
    'track-order': PropTypes.func,
    favorites: PropTypes.func,
    'log-out': PropTypes.func,
    'login-account': PropTypes.func,
    'create-account': PropTypes.func,
  }).isRequired,
  footerActionCreator: PropTypes.func.isRequired,
};

FooterNavLinksList.defaultProps = {
  isLoggedIn: false,
};

export default withStyles(FooterNavLinksList, styles);

export { FooterNavLinksList as FooterNavLinksListVanilla };
