import { connect } from 'react-redux';
import Spotlight from '../views/Spotlight';
import { getSpotlightReviewsUrl } from '../../../container/ProductListing.selectors';

function mapStateToProps() {
  return {
    spotlightUrl: getSpotlightReviewsUrl(),
  };
}

export default connect(mapStateToProps)(Spotlight);
