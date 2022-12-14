import { connect } from 'react-redux';
import { fetchPageLayout } from '@tcp/core/src/reduxStore/actions';
import { getIsRegisteredUserCallDone } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import HomePageView from '../views/HomePage.view';
import { initActions } from './HomePage.actions';
import {
  setCampaignId,
  setClickAnalyticsData,
  trackPageView,
} from '../../../../../../../core/src/analytics/actions';
import { toggleCountrySelectorModal } from '../../Header/molecules/CountrySelector/container/CountrySelector.actions';

HomePageView.getInitialProps = async ({ store, isServer }, pageProps) => {
  const state = store.getState();
  if (!isServer && !state.Layouts.homepage) {
    store.dispatch(fetchPageLayout('homepage'));
  }
  return {
    ...pageProps,
    ...{
      pageData: {
        pageName: 'home page',
        pageSection: 'homepage',
        pageSubSection: 'home page',
        pageType: 'home page',
        loadAnalyticsOnload: false,
      },
    },
  };
};

HomePageView.getInitActions = () => initActions;

HomePageView.pageInfo = {
  pageId: 'Home',
  name: 'homepage',
  modules: ['labels', 'header', 'footer', 'navigation'],
};

const mapStateToProps = state => {
  const { Layouts, Modules } = state;
  const homepageSlots = Layouts.homepage ? Layouts.homepage.slots || [] : [];
  const accessibility = state.Labels && state.Labels.global && state.Labels.global.accessibility;
  const seoData = state.SEOData.home;

  return {
    seoData,
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
    isRegisteredUserCallDone: getIsRegisteredUserCallDone(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCountrySelectorModal: () => dispatch(toggleCountrySelectorModal({ isModalOpen: true })),
    setCampaignId: campaignId => dispatch(setCampaignId(campaignId)),
    setClickAnalyticsData: payload => dispatch(setClickAnalyticsData(payload)),
    trackHomepageView: payload => {
      dispatch(
        trackPageView({
          props: {
            initialProps: {
              pageProps: {
                pageData: {
                  ...payload,
                },
              },
            },
          },
        })
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageView);
