import { connect } from 'react-redux';
import { getCurrency } from './PriceCurrency.selectors';
import BAGPAGE_SELECTORS from '../../../../features/CnC/BagPage/container/BagPage.selectors';
import PriceCurrencyView from '../views';

export const mapStateToProps = state => {
  return {
    currency: getCurrency(state),
    currencySymbol: BAGPAGE_SELECTORS.getCurrentCurrency(state),
  };
};

export default connect(mapStateToProps)(PriceCurrencyView);
