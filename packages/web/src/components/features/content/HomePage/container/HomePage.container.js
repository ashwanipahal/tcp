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
  pageId: 'Home',
  name: 'homepage',
  pageData: {
    pageName: 'home page',
    pageSection: 'homepage',
  },
  modules: ['labels', 'header', 'footer', 'navigation'],
};

const mapStateToProps = state => {
  const { Layouts, Modules } = state;
  const homepageSlots = Layouts.homepage ? Layouts.homepage.slots || [] : [];
  const accessibility = state.Labels && state.Labels.global && state.Labels.global.accessibility;

  return {
    slots: homepageSlots.map(slot => {
      // Logic for accomodating two modules in one slot (Half width modules view)
      const { contentId: slotContent = '' } = slot;
      const contentIds = slotContent && slotContent.split(',');
      if (contentIds && contentIds.length > 1) {
        const response = {
          ...slot,
          accessibility,
          data: {
            slot: [],
          },
        };

        contentIds.forEach(contentId => {
          response.data.slot.push(Modules[contentId]);
        });

        return response;
      }
      // Logic ends

      return {
        ...slot,
        accessibility,
        data: Modules[slot.contentId],
      };
    }),
  };
};

export default connect(mapStateToProps)(HomePageView);
