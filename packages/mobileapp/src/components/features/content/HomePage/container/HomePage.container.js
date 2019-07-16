import { connect } from 'react-redux';
import { bootstrapData } from '@tcp/core/src/reduxStore/actions';
import HomePageView from '../views';

const mapStateToProps = state => {
  const homepageSlots = state.Layouts.homepage ? state.Layouts.homepage.slots : '';
  const modules = state.Modules ? state.Modules : '';
  const moduleSlots = {};
  if (homepageSlots && Object.keys(modules).length) {
    homepageSlots.forEach(slotItem => {
      moduleSlots[slotItem.name] = modules[slotItem.contentId];
      moduleSlots[slotItem.name].name = slotItem.moduleName;
      return moduleSlots;
    });
  }
  return {
    ...moduleSlots,
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
