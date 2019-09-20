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
    apiUrl: getInternationalCheckoutApiUrl(),
    communicationUrl: getInternationalCheckoutCommUrl(),
    iframeUrl: getInternationalCheckoutUrl(state),
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
