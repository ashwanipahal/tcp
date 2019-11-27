import { connect } from 'react-redux';
import SiteMapView from '../views';
import { siteMapData } from './SiteMap.selectors';

const mapStateToProps = state => {
  return {
    siteMapData: siteMapData(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteMapView);
