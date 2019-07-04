import { connect } from 'react-redux';
import HeaderView from '../views';

const mapStateToProps = state => {
  const { header } = state;
  return {
    brandTabs: header.brandTabs,
    promoMessageWrapper: header.promoMessageWrapper,
    headerPromoArea: header.promoTextBannerCarousel,
  };
};

export default connect(mapStateToProps)(HeaderView);
