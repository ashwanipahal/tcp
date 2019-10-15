import React from 'react';
import { connect } from 'react-redux';
import PayPalButton from '../organism/PaypalButton';
import bagPageActions from '../../../../BagPage/container/BagPage.actions';
import { getSetIsPaypalPaymentSettings } from '../../../../Checkout/container/Checkout.action';
import { ServiceResponseError } from '../../../../../../../utils/errorMessage.util';
import CONSTANTS from '../../../../Checkout/Checkout.constants';
import { getAPIConfig } from '../../../../../../../utils';

export class PayPalButtonContainer extends React.PureComponent<Props> {
  componentDidMount() {
    const { startPaypalNativeCheckoutAction } = this.props;
    console.log('startPaypalNativeCheckoutAction');
    startPaypalNativeCheckoutAction();
  }

  initalizePayPalButton = data => {
    const apiConfigObj = getAPIConfig();
    const { paypalEnv } = apiConfigObj;
    console.log('paypalEnv', paypalEnv);
    const { startPaypalCheckout, paypalAuthorizationHandle, clearPaypalSettings } = this.props;
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
      env: paypalEnv,
      payment: () => {
        return new Promise((resolve, reject) => startPaypalCheckout({ resolve, reject }));
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
    const { isQualifedOrder, containerId, getPayPalSettings } = this.props;
    return (
      getPayPalSettings &&
      getPayPalSettings.paypalInContextToken && (
        <PayPalButton
          isQualifedOrder={isQualifedOrder}
          initalizePayPalButton={this.initalizePayPalButton}
          containerId={containerId}
          getPayPalSettings={getPayPalSettings}
        />
      )
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
    paypalAuthorizationHandle: () => {
      dispatch(bagPageActions.paypalAuthorization());
    },
    clearPaypalSettings: () => {
      dispatch(getSetIsPaypalPaymentSettings(null));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PayPalButtonContainer);
