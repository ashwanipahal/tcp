import { connect } from 'react-redux';
import { getIsInternationalShipping } from '@tcp/core/src/reduxStore/selectors/siteDetails.selectors';
import CheckoutHeaderSelector from './CheckoutHeader.selectors';
import CheckoutHeader from '../views';

const mapStateToProps = state => {
  const { Header } = state;
  return {
    brandTabs: Header.brandTabs,
    labels: CheckoutHeaderSelector.getCheckoutHeaderLabels(state),
    isInternationalShipping: getIsInternationalShipping(state),
  };
};

export default connect(
  mapStateToProps,
  {}
)(CheckoutHeader);
