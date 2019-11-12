import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ShippingReviewSection from '../../../molecules/ShippingReviewSection';
import CHECKOUT_SELECTOR from '../../../../../container/Checkout.selector';
import CONSTANTS from '../../../../../Checkout.constants';
import { updateShipmentMethodSelection } from '../../../../../container/Checkout.action';

export class ShippingReviewContainer extends React.PureComponent {
  static propTypes = {
    shippingAddress: PropTypes.shape({}).isRequired,
    shippingMethod: PropTypes.shape({}).isRequired,
    onEdit: PropTypes.func.isRequired,
    labels: PropTypes.shape({}),
    isGiftOptionsEnabled: PropTypes.bool.isRequired,
    giftWrappingDisplayName: PropTypes.string.isRequired,
    isExpressCheckout: PropTypes.bool,
    shipmentMethods: PropTypes.shape({}).isRequired,
    formName: PropTypes.string,
    formSection: PropTypes.string,
    updateShippingMethodSelection: PropTypes.func.isRequired,
    expressReviewShippingSectionId: PropTypes.shape({}),
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    labels: {},
    isExpressCheckout: false,
    formName: '',
    formSection: '',
    expressReviewShippingSectionId: {},
  };

  componentDidUpdate(prevProps) {
    const {
      updateShippingMethodSelection,
      expressReviewShippingSectionId,
      isExpressCheckout,
    } = this.props;
    const { expressReviewShippingSectionId: prevexpressReviewShippingSectionId } = prevProps;
    if (
      isExpressCheckout &&
      prevexpressReviewShippingSectionId.shippingMethodId &&
      typeof prevexpressReviewShippingSectionId.shippingMethodId !== 'object' &&
      expressReviewShippingSectionId.shippingMethodId !==
        prevexpressReviewShippingSectionId.shippingMethodId
    ) {
      updateShippingMethodSelection({ id: expressReviewShippingSectionId.shippingMethodId });
    }
  }

  render() {
    const {
      shippingAddress,
      shippingMethod,
      onEdit,
      labels,
      isGiftOptionsEnabled,
      giftWrappingDisplayName,
      isExpressCheckout,
      shipmentMethods,
      formName,
      formSection,
      updateShippingMethodSelection,
      expressReviewShippingSectionId,
      dispatch,
      bagLoading,
    } = this.props;
    return (
      <ShippingReviewSection
        shippingAddress={shippingAddress}
        shippingMethod={shippingMethod}
        onEdit={onEdit}
        labels={labels}
        isGiftOptionsEnabled={isGiftOptionsEnabled}
        giftWrappingDisplayName={giftWrappingDisplayName}
        isExpressCheckout={isExpressCheckout}
        shipmentMethods={shipmentMethods}
        dispatch={dispatch}
        formName={formName}
        formSection={formSection}
        updateShippingMethodSelection={updateShippingMethodSelection}
        expressReviewShippingSectionId={expressReviewShippingSectionId}
        bagLoading={bagLoading}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    shippingAddress: CHECKOUT_SELECTOR.getShippingDestinationValues(state),
    shippingMethod: CHECKOUT_SELECTOR.getSelectedShippingMethodDetails(state),
    expressReviewShippingSectionId: CHECKOUT_SELECTOR.getExpressReviewShippingSectionId(state),
    labels: CHECKOUT_SELECTOR.getShippingSectionLabels(state),
    isGiftOptionsEnabled: !!CHECKOUT_SELECTOR.getSelectedGiftWrapDetails(state).name,
    giftWrappingDisplayName:
      CHECKOUT_SELECTOR.getSelectedGiftWrapDetails(state).name || CONSTANTS.NA,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    updateShippingMethodSelection: payload => {
      dispatch(updateShipmentMethodSelection(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingReviewContainer);
