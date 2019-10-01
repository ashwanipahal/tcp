import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue, getSiteId } from '@tcp/core/src/utils/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import externalEndpoints from '../../../../common/externalEndpoints';
import { API_CONFIG } from '../../../../../../../services/config';

/**
 * This component will render OrdersLinks component
 * @param { string, object }
 */
class OrdersLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSiteId: getSiteId(),
    };
  }

  /**
   * This function will trigger the function to get country specific orders
   * @param {string} - currentSiteId
   */
  switchOrderSource = currentSiteId => {
    const { onFilterLink } = this.props;
    onFilterLink(getSiteId(), currentSiteId);
  };

  /**
   * This function will toggle the labels of order links
   * @param {object} - event
   */
  toggleLink = event => {
    event.preventDefault();
    const { currentSiteId } = this.state;
    const changedState =
      currentSiteId === API_CONFIG.siteIds.us ? API_CONFIG.siteIds.ca : API_CONFIG.siteIds.us;
    this.switchOrderSource(changedState);
    this.setState({
      currentSiteId: changedState,
    });
  };

  render() {
    const { className, labels } = this.props;
    const { currentSiteId } = this.state;
    const buttonText =
      currentSiteId !== API_CONFIG.siteIds.ca
        ? getLabelValue(labels, 'lbl_orders_caOrdersLink', 'orders')
        : getLabelValue(labels, 'lbl_orders_usOrdersLink', 'orders');
    return (
      <BodyCopy className={className} textAlign="right">
        <Anchor
          fontSizeVariation="large"
          underline
          anchorVariation="primary"
          fontSize="fs14"
          dataLocator="order-country-selector-link"
          onClick={this.toggleLink}
          fontFamily="secondary"
        >
          {buttonText}
        </Anchor>
        <Anchor
          fontSizeVariation="large"
          underline
          anchorVariation="primary"
          fontSize="fs14"
          dataLocator="order-international-link"
          className="elem-ml-XXXL"
          target="_blank"
          href={externalEndpoints.internationalOrdersPage}
          fontFamily="secondary"
        >
          {getLabelValue(labels, 'lbl_orders_internationalOrdersLink', 'orders')}
        </Anchor>
      </BodyCopy>
    );
  }
}

OrdersLinks.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  onFilterLink: PropTypes.func.isRequired,
};

OrdersLinks.defaultProps = {
  className: '',
};

export default OrdersLinks;
