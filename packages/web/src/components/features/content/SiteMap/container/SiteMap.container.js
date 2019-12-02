import { connect } from 'react-redux';
import SiteMapView from '../views';
import getSiteMapData from './SiteMap.selectors';
import { fetchSiteMapData } from './SiteMap.actions';

SiteMapView.getInitialProps = async ({ store }, pageProps) => {
  store.dispatch(fetchSiteMapData());
  return {
    ...pageProps,
  };
};

const mapStateToProps = state => {
  return {
    siteMapData: getSiteMapData(state),
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteMapView);
