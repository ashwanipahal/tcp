import { connect } from 'react-redux';
import SiteMapView from '../views';
import { getSiteMapData } from './SiteMap.selectors';
import { fetchSiteMapData } from './SiteMap.actions';

const mapStateToProps = state => {
  return {
    siteMapData: getSiteMapData(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSiteMapData: () => {
      dispatch(fetchSiteMapData());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteMapView);
