import React from 'react';
import { connect } from 'react-redux';
import { initIntlCheckoutAction } from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.action';
import selectors from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.selector';
import InternationalCheckoutPage from '../views/InternationalCheckoutPage.view';

export class InternationalCheckoutPageContainer extends React.PureComponent<Props> {
  componentDidMount() {
    const { initIntlCheckout } = this.props;
    initIntlCheckout();
  }

  render() {
    const { apiUrl, communicationUrl, iframeUrl, isLoading } = this.props;
    return (
      <InternationalCheckoutPage
        apiUrl={apiUrl}
        communicationUrl={communicationUrl}
        iframeUrl={iframeUrl}
        isLoading={isLoading}
      />
    );
  }
}

export const mapStateToProps = state => {
  const {
    getInternationalCheckoutCommUrl,
    getInternationalCheckoutApiUrl,
    getInternationalCheckoutUrl,
  } = selectors;
  return {
    apiUrl: getInternationalCheckoutApiUrl(), // 'https://checkout.fiftyone.com/htmlcheckout/resources/js/merchant.js', // checkoutStoreView.getInternationalCheckoutApiUrl(state),
    communicationUrl: getInternationalCheckoutCommUrl(), // 'https://embassy.fiftyone.com/utils/empty.jsp', //checkoutStoreView.getInternationalCheckoutCommUrl(state),
    iframeUrl: getInternationalCheckoutUrl(state),
    // 'https://checkout.fiftyone.com/v5#/checkout/E4X001065011973-zpyE6lNUNrv0HYeefyGrAzIToiGHJwDl_1yy2xMgI80_CB?version=e5_0&merchantid=2300&method=default&consumeraccountenabled=Y', // checkoutStoreView.getInternationalCheckoutUrl(state),
    isLoading: false,
  };
};
export const mapDispatchToProps = dispatch => {
  return {
    initIntlCheckout: () => {
      dispatch(initIntlCheckoutAction());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternationalCheckoutPageContainer);
