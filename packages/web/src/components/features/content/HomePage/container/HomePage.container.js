import { connect } from 'react-redux';
import { initActions } from './HomePage.actions';
import HomePageView from '../views/HomePage.view';

HomePageView.pageInfo = {
  name: 'homepage',
};
HomePageView.getInitActions = () => initActions;
const mapStateToProps = state => {
  const homepageSlots = state.Layouts.homepage.slots;
  const candidLabels = state.Labels.modules.getCandid;
  var Obj = {};

  homepageSlots.forEach(slotItem => {
    Obj[slotItem.name] = state.Modules[slotItem.contentId];
    Obj[slotItem.name].name = slotItem.moduleName;
    Obj[slotItem.name].imagesPerSlide = state.Modules[slotItem.contentId].imagesPerSlide;
    return newObj;
  });
  const newObj = Object.assign(Obj, candidLabels);
  return {
    ...newObj,
  };
};

export default connect(mapStateToProps)(HomePageView);
