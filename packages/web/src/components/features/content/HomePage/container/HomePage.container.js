import { connect } from 'react-redux';
import { initActions } from './HomePage.actions';
import HomePageView from '../views/HomePage.view';

HomePageView.pageInfo = {
  name: 'homepage',
};
HomePageView.getInitActions = () => initActions;

const mapStateToProps = state => {
  const homepageSlots = state.Layouts.homepage.slots;
  const newObj = {};
  homepageSlots.forEach(slotItem => {
    const set = state.Modules[slotItem.contentId].set.filter(el => el.key === 'imagesPerSlide');
    newObj[slotItem.name] = state.Modules[slotItem.contentId];
    newObj[slotItem.name].name = slotItem.moduleName;
    newObj[slotItem.name].imagesPerSlide = set.length && set[0].val;
    return newObj;
  });
  return {
    ...newObj,
  };
};

export default connect(mapStateToProps)(HomePageView);
