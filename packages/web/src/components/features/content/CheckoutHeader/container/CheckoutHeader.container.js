import { connect } from 'react-redux';
import { getIsInternationalShipping } from '@tcp/core/src/reduxStore/selectors/session.selectors';
import CheckoutSelectors from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.selectors';
import CheckoutHeaderSelector from './CheckoutHeader.selectors';
import CheckoutHeader from '../views';

const mapStateToProps = state => {
  const { Header } = state;
  return {
    brandTabs: Header.brandTabs,
    labels: CheckoutHeaderSelector.getCheckoutHeaderLabels(state),
    isInternationalShipping: getIsInternationalShipping(state),
    itemsCount: CheckoutSelectors.getTotalItems(state),
  };
};

export default connect(
  mapStateToProps,
  {}
)(CheckoutHeader);
