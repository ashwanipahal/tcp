import { connect } from 'react-redux';
import { bootstrapData } from '@tcp/core/src/reduxStore/actions';
import HomePageView from '../views';

HomePageView.pageInfo = {
  name: 'homepage',
};

const mapStateToProps = state => {
  return {
    slot_1: state.layouts.homepage.slot_1,
    slot_2: state.layouts.homepage.slot_2,
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
