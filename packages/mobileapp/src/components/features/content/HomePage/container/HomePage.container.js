import { connect } from 'react-redux';
import { bootstrapData } from '@tcp/core/src/reduxStore/actions';
import HomePageView from '../views';

const mapStateToProps = state => {
  console.log(state);

  const moduleDSlotID = state.Layouts.homepage ? state.Layouts.homepage.slots[0].contentId : '';
  const moduleHSlotID = state.Layouts.homepage ? state.Layouts.homepage.slots[1].contentId : '';
  const moduleD = state.Modules[moduleDSlotID] ? state.Modules[moduleDSlotID] : {};
  const moduleH = state.Modules[moduleHSlotID] ? state.Modules[moduleHSlotID] : {};
  return {
    slot_1: moduleD,
    slot_2: moduleH,
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
