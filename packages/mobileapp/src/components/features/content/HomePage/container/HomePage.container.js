import { connect } from 'react-redux';
import { bootstrapData } from '@tcp/core/src/reduxStore/actions';
import HomePageView from '../views';

const mapStateToProps = state => {
  const slot1 = state.layouts.homepage ? state.layouts.homepage.slot_1 : {};
  const slot2 = state.layouts.homepage ? state.layouts.homepage.slot_2 : {};

  return {
    slot_1: slot1,
    slot_2: slot2,
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
