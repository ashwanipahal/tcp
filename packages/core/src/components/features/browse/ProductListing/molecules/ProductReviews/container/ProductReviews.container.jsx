import { connect } from 'react-redux';
import ProductReviews from '../views/ProductReviews';

import { getBazaarvoiceApiUrl } from '../../../container/ProductListing.selectors';

function mapStateToProps() {
  return {
    bazaarvoiceApiUrl: getBazaarvoiceApiUrl(),
  };
}

export default connect(mapStateToProps)(ProductReviews);
