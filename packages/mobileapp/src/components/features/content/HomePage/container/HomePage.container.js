import { connect } from 'react-redux';
import { bootstrapData } from '@tcp/core/src/reduxStore/actions';
import HomePageView from '../views';

const mapStateToProps = state => {
  const moduleDSlotID = state.Layouts.homepage ? state.Layouts.homepage.slots[0].contentId : '';
  const moduleD = state.Modules[moduleDSlotID] ? state.Modules[moduleDSlotID] : {};
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
