import React from 'react';
import { PropTypes } from 'prop-types';
import InternationalCheckout from '../organisms/InternationalCheckout';

class InternationalCheckoutPage extends React.PureComponent {
  /**
   *
   * @function render
   * @description render method to render view for international checkout
   * @memberof InternationalCheckoutPage
   */
  render() {
    const { apiUrl, communicationUrl, iframeUrl } = this.props;
    return (
      <div>
        <main className="checkout-container">
          <InternationalCheckout
            iframeUrl={iframeUrl}
            apiUrl={apiUrl}
            communicationUrl={communicationUrl}
          />
        </main>
      </div>
    );
  }
}
InternationalCheckoutPage.propTypes = {
  /** url of the js file controlling communication between iframe and outside */
  apiUrl: PropTypes.string.isRequired,

  /** url of the communication iframe */
  communicationUrl: PropTypes.string.isRequired,

  /** international checkout iframe url */
  iframeUrl: PropTypes.string.isRequired,
};
export default InternationalCheckoutPage;
