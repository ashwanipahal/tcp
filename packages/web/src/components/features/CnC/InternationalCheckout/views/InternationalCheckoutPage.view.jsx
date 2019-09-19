import React from 'react';
import { PropTypes } from 'prop-types';
import InternationalCheckout from '../organisms/InternationalCheckout';

class InternationalCheckoutPage extends React.PureComponent {
  render() {
    const { isLoading, apiUrl, communicationUrl, iframeUrl } = this.props;
    return (
      <div>
        <main className="checkout-container">
          <InternationalCheckout
            iframeUrl={iframeUrl}
            apiUrl={apiUrl}
            communicationUrl={communicationUrl}
          />
        </main>
        {/*
        <NavigationConfirmation
          message="Are you sure you want to return to your Shopping Bag?"
          confirm="Return to bag"
          cancel="Stay in checkout"
          onConfirmClick={this.gotoCart}
        />

        <ContentSlotModalsRendererContainer />
        <AuthModalContainer /> */}
      </div>
    );
  }
}
InternationalCheckoutPage.propTypes = {
  /** Flags if the checkout form data is still being retrieved from the server */
  isLoading: PropTypes.bool.isRequired,

  /** url of the js file controlling communication between iframe and outside */
  apiUrl: PropTypes.string.isRequired,

  /** url of the communication iframe */
  communicationUrl: PropTypes.string.isRequired,

  /** international checkout iframe url */
  iframeUrl: PropTypes.string.isRequired,
};
export default InternationalCheckoutPage;
