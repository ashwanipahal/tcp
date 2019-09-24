import { connect } from 'react-redux';
import { initActions } from './HomePage.actions';
import HomePageView from '../views/HomePage.view';

HomePageView.pageInfo = {
  name: 'homepage',
  modules: ['labels', 'header', 'footer', 'navigation'],
};

HomePageView.getInitActions = () => initActions;

const mapStateToProps = state => {
  const { Layouts, Modules } = state;
  const homepageSlots = Layouts.homepage ? Layouts.homepage.slots || [] : [];
  const { accessibility } = state.Labels.global;

  return {
    slots: homepageSlots.map(slot => {
      return {
        ...slot,
        accessibility,
        data: Modules[slot.contentId],
      };
    }),
  };
};

export default connect(mapStateToProps)(HomePageView);
