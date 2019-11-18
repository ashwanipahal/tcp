import { connect } from 'react-redux';
import { getCurrency } from './PriceCurrency.selectors';

import PriceCurrencyView from '../views';

export const mapStateToProps = state => {
  return {
    currency: getCurrency(state),
  };
};

export default connect(mapStateToProps)(PriceCurrencyView);
