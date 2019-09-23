import React from 'react';
import { connect } from 'react-redux';
import { initIntlCheckoutAction } from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.action';
import selectors from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.selector';
import InternationalCheckoutPage from '../views/InternationalCheckoutPage.view';

export class InternationalCheckoutPageContainer extends React.PureComponent<Props> {
  /**
   * @function componentDidMount
   * @description call international checkout settings on componentdidmount
   * @memberof InternationalCheckoutPageContainer
   */
  componentDidMount() {
    const { initIntlCheckout } = this.props;
    initIntlCheckout();
  }

  /**
   * @function render
   * @description render of international checkout view
   * @returns
   * @memberof InternationalCheckoutPageContainer
   */
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
/**
 *
 * @param {*} state
 * @function mapStateToProps
 * @description initial props to container
 */
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
/**
 *
 * @param {*} state
 * @function mapDispatchToProps
 * @description initial actions to container
 */
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
