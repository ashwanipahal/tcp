import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { routerPush } from '@tcp/core/src/utils';
import styles from '../FooterNavLinksList.style';

/**
 *
 * @param {string} className set the classname for styling purpose.
 * @param {object} listArray link list array.
 * @param {number} colnum col number.
 * @param {function} openTrackOrder to open the track order.
 * @param {boolean} isLoggedIn to check if user is logged in or not.
 * @param {function} setLoginModalMountState to set the login modal mount state.
 */
const FooterNavLinksList = ({
  className,
  listArray,
  colNum,
  openTrackOrder,
  isLoggedIn,
  setLoginModalMountState,
}) => {
  const trackLink = e => {
    e.preventDefault();
    if (!isLoggedIn) openTrackOrder({ state: true });
    else routerPush('/account', '/account');
  };
  const loginModalOpenClick = e => {
    e.preventDefault();
    setLoginModalMountState({ state: true });
  };
  /**
   * @function createLink to create footer links.
   * @param {object} linkItems list of all the footer links.
   * @param {number} index index number to track all the references.
   * @returns JSX of the link.
   */
  const createLink = (linkItems, index) => {
    /*
      if linkItems.url have any keyword, on which we need an action event getting fired,
      then we need to check for its index, if found, we set a function to dispatch the action.
      else, it will set the linkItems.url to the component directly for default behaviour.
    */
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
        dataLocator={`col_${colNum}_link_${index}`}
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
  isLoggedIn: PropTypes.bool,
  setLoginModalMountState: PropTypes.func,
};

FooterNavLinksList.defaultProps = {
  openTrackOrder: () => null,
  isLoggedIn: false,
  setLoginModalMountState: () => null,
};

export default withStyles(FooterNavLinksList, styles);

export { FooterNavLinksList as FooterNavLinksListVanilla };
