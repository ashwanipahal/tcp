import { connect } from 'react-redux';
import { bootstrapData, setPreviewDate } from '@tcp/core/src/reduxStore/actions';
import { fetchNavigationData } from '@tcp/core/src/components/features/content/Navigation/container/Navigation.actions';
import { getUserLoggedInState } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import HomePageView from '../views';
import { THEME_WRAPPER_REDUCER_KEY } from '../../../../common/hoc/ThemeWrapper.constants';

const mapStateToProps = state => {
  const { Header = {}, Layouts = {}, Modules = {} } = state;
  const { promoTextBannerCarousel: headerPromo, loyaltyPromoBanner } = Header;
  const { promoHtmlBannerCarousel } = Header;
  const homepageSlots = Layouts.homepage ? Layouts.homepage.slots : [];
  const accessibility = state.Labels && state.Labels.global && state.Labels.global.accessibility;
  const labels = state.Labels;

  return {
    slots: homepageSlots
      .map(slot => {
        return {
          ...slot,
          accessibility,
          data: Modules[slot.contentId],
        };
      })
      .filter(item => item.data),
    headerPromo,
    loyaltyPromoBanner,
    appType: state[THEME_WRAPPER_REDUCER_KEY].get('APP_TYPE'),
    isUserLoggedIn: getUserLoggedInState(state) || false,
    labels,
    promoHtmlBannerCarousel,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBootstrapData: (pages, apiConfig) => {
      const payload = {
        ...pages,
        apiConfig,
        siteConfig: true,
      };
      dispatch(bootstrapData(payload));
    },
    loadNavigationData: () => dispatch(fetchNavigationData()),
    updatePreviewDate: payload => dispatch(setPreviewDate(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageView);
