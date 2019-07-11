import { connect } from 'react-redux';
import { bootstrapData } from '@tcp/core/src/reduxStore/actions';
import HomePageView from '../views';

const mapStateToProps = state => {
  const moduleD = state.layouts.homepage ? state.layouts.homepage.slot_1 : {};
  return {
    moduleD,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBootstrapData: pages => dispatch(bootstrapData(pages)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageView);
