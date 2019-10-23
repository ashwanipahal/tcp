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
  pageData: {
    pageName: 'home page',
    pageSection: 'homepage',
  },
  modules: ['labels', 'header', 'footer', 'navigation'],
};

const mapStateToProps = state => {
  const { Layouts, Modules, SEOData } = state;
  const homepageSlots = Layouts.homepage ? Layouts.homepage.slots || [] : [];
  const accessibility = state.Labels && state.Labels.global && state.Labels.global.accessibility;
  const seoData = SEOData && (SEOData.home || {});

  return {
    slots: homepageSlots.map(slot => {
      // Logic for accomodating two modules in one slot (Half width modules view)
      const contentIds = slot.contentId.split(',');
      if (contentIds.length > 1) {
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
    seoData,
  };
};

export default connect(mapStateToProps)(HomePageView);
