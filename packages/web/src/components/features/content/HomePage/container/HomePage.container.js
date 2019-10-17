import { connect } from 'react-redux';
import { fetchPageLayout } from '@tcp/core/src/reduxStore/actions';
import HomePageView from '../views/HomePage.view';
import { initActions } from './HomePage.actions';

HomePageView.getInitialProps = async ({ store, isServer }, pageProps) => {
  const state = store.getState();
  if (!isServer && !state.Layouts.homepage) {
    store.dispatch(fetchPageLayout('homepage'));
  }
  return pageProps;
};

HomePageView.getInitActions = () => initActions;

HomePageView.pageInfo = {
  name: 'homepage',
  modules: ['labels', 'header', 'footer', 'navigation'],
};

const mapStateToProps = state => {
  const { Layouts, Modules } = state;
  const homepageSlots = Layouts.homepage ? Layouts.homepage.slots || [] : [];
  const accessibility = state.Labels && state.Labels.global && state.Labels.global.accessibility;

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
