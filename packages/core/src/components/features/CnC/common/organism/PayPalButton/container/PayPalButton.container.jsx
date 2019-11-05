import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PayPalButton from '../organism/PaypalButton';
import bagPageActions from '../../../../BagPage/container/BagPage.actions';
import { ServiceResponseError } from '../../../../../../../utils/errorMessage.util';
import CONSTANTS from '../../../../Checkout/Checkout.constants';
import { getAPIConfig, isMobileApp } from '../../../../../../../utils';

export class PayPalButtonContainer extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    const apiConfigObj = getAPIConfig();
    const { paypalEnv } = apiConfigObj;
    this.paypalEnv = paypalEnv;
    const { paypalStaticUrl } = apiConfigObj;
    this.paypalStaticUrl = paypalStaticUrl;
  }

  componentDidMount() {
    const { startPaypalNativeCheckoutAction } = this.props;
    if (isMobileApp()) startPaypalNativeCheckoutAction();
  }

  componentWillUnmount() {
    const { payPalWebViewHandle } = this.props;
    if (isMobileApp()) payPalWebViewHandle(false);
  }

  initalizePayPalButton = data => {
    const {
      startPaypalCheckout,
      paypalAuthorizationHandle,
      clearPaypalSettings,
      isBillingPage,
    } = this.props;

    const { containerId, height } = data;
    const options = {
      locale: CONSTANTS.PAYPAL_LOCATE,
      style: {
        size: 'responsive',
        color: 'blue',
        shape: 'rect',
        label: CONSTANTS.PAYPAL_LABEL,
        tagline: false,
        height,
      },
      funding: {
        disallowed: [window.paypal && window.paypal.FUNDING.CREDIT],
      },
      env: this.paypalEnv,
      payment: () => {
        return new Promise((resolve, reject) =>
          startPaypalCheckout({ resolve, reject, isBillingPage })
        );
      },
      onAuthorize: paypalAuthorizationHandle,
      onCancel: clearPaypalSettings,
      onError: error => {
        throw new ServiceResponseError(error);
      },
    };
    window.paypal.Button.render(options, `#${containerId}`);
  };

  render() {
    const {
      isQualifedOrder,
      containerId,
      navigation,
      getPayPalSettings,
      payPalWebViewHandle,
      paypalAuthorizationHandle,
      clearPaypalSettings,
      setVenmoState,
      closeModal,
    } = this.props;
    return (
      <PayPalButton
        isQualifedOrder={isQualifedOrder}
        initalizePayPalButton={this.initalizePayPalButton}
        containerId={containerId}
        navigation={navigation}
        getPayPalSettings={getPayPalSettings}
        payPalWebViewHandle={payPalWebViewHandle}
        paypalAuthorizationHandle={paypalAuthorizationHandle}
        clearPaypalSettings={clearPaypalSettings}
        paypalEnv={this.paypalEnv}
        paypalStaticUrl={this.paypalStaticUrl}
        setVenmoState={setVenmoState}
        closeModal={closeModal}
      />
    );
  }
}

// eslint-disable-next-line no-unused-vars
export const mapStateToProps = state => ({
  isQualifedOrder: false,
});

export const mapDispatchToProps = dispatch => {
  return {
    startPaypalCheckout: payload => {
      dispatch(bagPageActions.startPaypalCheckout(payload));
    },
    startPaypalNativeCheckoutAction: () => {
      dispatch(bagPageActions.startPaypalNativeCheckout());
    },
    paypalAuthorizationHandle: payload => {
      dispatch(bagPageActions.paypalAuthorization(payload));
    },
    clearPaypalSettings: () => {
      dispatch(bagPageActions.startPaypalNativeCheckout());
    },
    payPalWebViewHandle: payload => {
      dispatch(bagPageActions.getSetPayPalWebView(payload));
    },
  };
};

PayPalButtonContainer.propTypes = {
  isBillingPage: PropTypes.bool,
};

PayPalButtonContainer.defaultProps = {
  isBillingPage: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PayPalButtonContainer);
