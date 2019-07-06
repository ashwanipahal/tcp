import { connect } from 'react-redux';
import { initActions } from './HomePage.actions';
import HomePageView from '../views/HomePage.view';

HomePageView.pageInfo = {
  name: 'homepage',
};
HomePageView.getInitActions = () => initActions;

const mapStateToProps = state => {
  const homepageSlots = state.layouts.homepage.slots;
  const newObj = {};
  homepageSlots.forEach(slotItem => {
    newObj[slotItem.name] = state.modules[slotItem.contentId];
    newObj[slotItem.name].name = slotItem.moduleName;
    return newObj;
  });
  return {
    ...newObj,
  };
};

export default connect(mapStateToProps)(HomePageView);
