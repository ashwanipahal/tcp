import { connect } from 'react-redux';
import HeaderView from '../views';

const mapStateToProps = state => {
  const { header } = state;
  return {
    headerTopNav: header.topNavWrapper,
    headerPromoArea: header.promoTextBannerCarousel,
  };
};

export default connect(mapStateToProps)(HeaderView);
