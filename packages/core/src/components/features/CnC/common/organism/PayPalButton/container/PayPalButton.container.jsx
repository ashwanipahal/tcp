import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAPIConfig, isMobileApp, isGymboree } from '@tcp/core/src/utils/utils';
import PayPalButton from '../organism/PaypalButton';
import bagPageActions from '../../../../BagPage/container/BagPage.actions';
import { ServiceResponseError } from '../../../../../../../utils/errorMessage.util';
import CONSTANTS from '../../../../Checkout/Checkout.constants';

export class PayPalButtonContainer extends React.PureComponent<Props> {
  componentDidMount() {
    const { startPaypalNativeCheckoutAction, isBillingPage } = this.props;
    if (isMobileApp()) startPaypalNativeCheckoutAction(isBillingPage);
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

    const { containerId, height, paypalEnv } = data;
    const options = {
      locale: CONSTANTS.PAYPAL_LOCATE,
      style: {
        size: 'responsive',
        color: isBillingPage ? CONSTANTS.PAYPAL_CTA_COLOR.BLUE : CONSTANTS.PAYPAL_CTA_COLOR.DEFAULT,
        shape: isGymboree() ? 'pill' : 'rect',
        label: CONSTANTS.PAYPAL_LABEL,
        tagline: false,
        height,
      },
      funding: {
        disallowed: [window.paypal && window.paypal.FUNDING.CREDIT],
      },
      env: paypalEnv,
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
      height,
      navigation,
      getPayPalSettings,
      payPalWebViewHandle,
      paypalAuthorizationHandle,
      clearPaypalSettings,
      setVenmoState,
      isBillingPage,
      closeModal,
      top,
      fullWidth,
    } = this.props;

    const apiConfigObj = getAPIConfig();
    const { paypalEnv, paypalStaticUrl } = apiConfigObj;
    return (
      <PayPalButton
        isQualifedOrder={isQualifedOrder}
        height={height}
        initalizePayPalButton={this.initalizePayPalButton}
        containerId={containerId}
        navigation={navigation}
        getPayPalSettings={getPayPalSettings}
        payPalWebViewHandle={payPalWebViewHandle}
        paypalAuthorizationHandle={paypalAuthorizationHandle}
        clearPaypalSettings={clearPaypalSettings}
        paypalEnv={paypalEnv}
        paypalStaticUrl={paypalStaticUrl}
        setVenmoState={setVenmoState}
        closeModal={closeModal}
        top={top}
        isBillingPage={isBillingPage}
        fullWidth={fullWidth}
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
    startPaypalNativeCheckoutAction: isBillingPage => {
      dispatch(bagPageActions.startPaypalNativeCheckout({ isBillingPage }));
    },
    paypalAuthorizationHandle: payload => {
      dispatch(bagPageActions.paypalAuthorization(payload));
    },
    clearPaypalSettings: isBillingPage => {
      dispatch(bagPageActions.startPaypalNativeCheckout({ isBillingPage }));
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
