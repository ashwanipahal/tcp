import { connect } from 'react-redux';
import { getIsInternationalShipping } from '@tcp/core/src/reduxStore/selectors/session.selectors';
import CheckoutSelectors from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.selectors';
import CheckoutSelector, {
  isExpressCheckout,
} from '@tcp/core/src/components/features/CnC/Checkout/container/Checkout.selector';
import CheckoutHeaderSelector from './CheckoutHeader.selectors';
import CheckoutHeader from '../views';

const mapStateToProps = state => {
  const { Header } = state;
  return {
    brandTabs: Header.brandTabs,
    labels: CheckoutHeaderSelector.getCheckoutHeaderLabels(state),
    isInternationalShipping: getIsInternationalShipping(state),
    itemsCount: CheckoutSelectors.getTotalItems(state),
    cartItems: CheckoutSelectors.getOrderItems(state),
    isExpressCheckoutPage: isExpressCheckout(state),
    bagLoading: CheckoutSelectors.isBagLoading(state),
    currentStage: CheckoutSelector.getCurrentCheckoutStage(state),
  };
};

export default connect(
  mapStateToProps,
  {}
)(CheckoutHeader);
