import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import { getAPIConfig } from '@tcp/core/src/utils';

class Espot extends PureComponent {
  /**
   * @function onClickHandler
   * @param {string} link - href key defined in anchor of richtext
   * @param {string} target - action type
   * @param {string} action - data-target of anchor for modal identification
   * @returns {function}  - function to open modal or navigate to a path
   */
  onClickHandler = (link, target, action) => {
    const { togglePlccModal, openOverlay } = this.props;

    switch (target) {
      case '_modal':
        handleModal(action);
        break;
      default:
        handleUrl(link, target);
    }
  };

  /**
   * @function handleModal
   * @param {string} action - action to identify data-target of modal
   * @returns {function} calls function received from prop to open a modal
   */
  handleModal = action => {
    switch (action) {
      case 'plccModal':
        togglePlccModal(true);
        break;
      case 'login':
        openOverlay({
          component: 'login',
          variation: 'primary',
        });
        break;
      case 'create-account':
        openOverlay({
          component: 'createAccount',
          variation: 'primary',
        });
        break;

      default:
        break;
    }
  };

  /**
   * @function handleUrl - opens an external url or navigate to internal route
   * @param {string} link - href in anchor of richtext
   * @param {string} target - action type to identify navigation window
   */
  handleUrl = (link, target) => {
    const externalUrl = new RegExp('^(?:[a-z]+:)?//', 'i');
    const { assetHost } = getAPIConfig();

    if (externalUrl.test(link)) {
      window.open(link, '_blank');
    } else {
      switch (target) {
        case '_self':
          richTextInternalRoute(link);
          break;
        case '_blank':
          window.open(`${assetHost}${link}`, '_blank');
          break;
        default:
          break;
      }
    }
  };

  /**
   * Routes to an endpoint from rich text link click
   * @param {string} link - internal link to be navigated
   */
  richTextInternalRoute = link => {
    switch (link) {
      case '/pointsClaimForm':
        routerPush(internalEndpoints.pointsClaimPage.link, internalEndpoints.pointsClaimPage.path);
        break;
      default:
        break;
    }
  };

  render() {
    const { richTextHtml } = this.props;
    return (
      <div>
        <RichText richTextHtml={richTextHtml} isNativeView actionHandler={this.onClickHandler} />
      </div>
    );
  }
}

Espot.propTypes = {
  togglePlccModal: PropTypes.func.isRequired,
  richTextHtml: PropTypes.string.isRequired,
  openOverlay: PropTypes.func.isRequired,
};

export default Espot;
