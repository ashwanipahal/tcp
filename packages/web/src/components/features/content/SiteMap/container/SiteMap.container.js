import { connect } from 'react-redux';
import SiteMapView from '../views';
import { siteMapData } from './SiteMap.selectors';
import { fetchSiteMapData } from './SiteMap.actions';

const mapStateToProps = state => {
  return {
    siteMapData: siteMapData(state),
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
