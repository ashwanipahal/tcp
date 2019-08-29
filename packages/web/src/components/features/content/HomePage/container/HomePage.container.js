import { connect } from 'react-redux';
import { initActions } from './HomePage.actions';
import HomePageView from '../views/HomePage.view';

HomePageView.pageInfo = {
  name: 'homepage',
};
HomePageView.getInitActions = () => initActions;

const mapStateToProps = state => {
  const homepageSlots = state.Layouts.homepage.slots;
  const { accessibility } = state.Labels.global;
  const newObj = {};
  homepageSlots.forEach(slotItem => {
    newObj[slotItem.name] = state.Modules[slotItem.contentId];
    newObj[slotItem.name].name = slotItem.moduleName;
    newObj[slotItem.name].accessibility = accessibility;
    return newObj;
  });

  return {
    ...newObj,
  };
};

export default connect(mapStateToProps)(HomePageView);
