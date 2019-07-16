import { connect } from 'react-redux';
import HeaderView from '../views';

const mapStateToProps = state => {
  const { Header } = state;
  return {
    brandTabs: Header.brandTabs,
    promoMessageWrapper: Header.promoMessageWrapper,
    headerPromoArea: Header.promoTextBannerCarousel,
  };
};

export default connect(mapStateToProps)(HeaderView);
