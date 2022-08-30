import { connect } from 'react-redux';
import BRANDTABS_SELECTORS from './BrandTabs.selectors';
import BrandTabsView from '../views';

export const mapStateToProps = state => {
  return {
    tcpBrandName: BRANDTABS_SELECTORS.getTcpBrandName(state),
    gymBrandName: BRANDTABS_SELECTORS.getGymBrandName(state),
  };
};

export default connect(mapStateToProps)(BrandTabsView);
