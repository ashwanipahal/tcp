import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { routerPush, scrollPage, configureInternalNavigationFromCMSUrl } from '@tcp/core/src/utils';
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
    scrollPage();
    footerActionCreator(handler, {
      component: 'login',
      variation: 'primary',
    });
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
  const getOnClickAction = (action, dispatchFn) => {
    let onClick = null;
    if (action === 'track-order') onClick = e => trackOrderLink(e, dispatchFn);
    if (action === 'favorites') onClick = e => loginModalOpenClick(e, dispatchFn);
    if (action === 'log-out') onClick = e => logout(e, dispatchFn);
    if (action === 'my-account') onClick = e => myAccountLogin(e, dispatchFn);

    return onClick;
  };

  /**
   * @function createLink to create footer links.
   * @param {object} linkItems list of all the footer links.
   * @param {number} index index number to track all the references.
   * @returns JSX of the link.
   */
  const createNavListItem = (linkItems, index) => {
    const linkAction = linkItems.action;
    const dispatchFn = linkAction ? linkConfig[linkAction] : null;
    /*
      hideLogoutMyActLink - true - if linkAction is my-account and user is logged in.
      hideLogoutMyActLink - true - if linkAction is log-out and user is  not logged in.
       hideLogoutMyActLink - false - other wise false, to show the other links.
      This condition is to satisfy the use case, to toggle between My Account and logout
      footer links.
      Use Case - When user is logged in, only Logout link should be visible to user.
                When user is not logged in, only My Account link should be visible to user.
      Problem Scenario - As the footer links are statically configured in CMS, if this condition
              is not put, user will be seeing both the links all the time.
    */
    const hideLogoutMyActLink =
      (isLoggedIn && linkAction === 'my-account') ||
      (!isLoggedIn && linkAction === 'log-out') ||
      false;
    const onClick = linkAction ? getOnClickAction(linkAction, dispatchFn) : null;

    const { url: ctaUrl, target, title, actualUrl } = linkItems;

    let to = actualUrl;
    if (!actualUrl) {
      to = configureInternalNavigationFromCMSUrl(ctaUrl);
    }

    return !hideLogoutMyActLink ? (
      <li>
        {linkAction ? (
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
    'my-account': PropTypes.func,
  }).isRequired,
  footerActionCreator: PropTypes.func.isRequired,
};

FooterNavLinksList.defaultProps = {
  isLoggedIn: false,
};

export default withStyles(FooterNavLinksList, styles);

export { FooterNavLinksList as FooterNavLinksListVanilla };
