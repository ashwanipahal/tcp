import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import React from 'react';
import { PropTypes } from 'prop-types';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary';
import withRefWrapper from '@tcp/core/src/components/common/hoc/withRefWrapper';
import withHotfix from '@tcp/core/src/components/common/hoc/withHotfix';
import PageSlots from '@tcp/core/src/components/common/molecules/PageSlots';
import GetCandid from '@tcp/core/src/components/common/molecules/GetCandid';
import Constants from '@tcp/core/src/components/common/molecules/Recommendations/container/Recommendations.constants';
import SeoCopy from '@tcp/core/src/components/features/browse/ProductListing/molecules/SeoCopy/views';
import { getQueryParamsFromUrl, internalCampaignProductAnalyticsList } from '@tcp/core/src/utils';
import { setProp } from '@tcp/core/src/analytics/utils';
import Recommendations from '../../../../common/molecules/Recommendations';

class HomePageWrapper extends React.Component {
  componentDidMount() {
    const { openCountrySelectorModal, router } = this.props;
    if (router.query.target === 'ship-to') {
      openCountrySelectorModal();
    }
    this.sHomePageAnalyticsVal(router);
  }

  // For Setting the Home Page Analytics Data.
  sHomePageAnalyticsVal = router => {
    const { setCampaignId, trackHomepageView } = this.props;
    const queryParams = getQueryParamsFromUrl(router.asPath);
    const campaingnId = 'cid';
    const products = internalCampaignProductAnalyticsList();
    setProp('eVar22', queryParams[campaingnId] || '');
    setProp('eVar15', 'D-Vo');
    if (queryParams[campaingnId]) {
      setCampaignId(queryParams[campaingnId]);
    }

    trackHomepageView({
      customEvents: ['event80', 'event81'],
      internalCampaignIdList: products,
      pageName: 'home page',
      pageSection: 'homepage',
      pageSubSection: 'home page',
      pageType: 'home page',
    });
  };

  render() {
    const { children } = this.props;
    return [children];
  }
}

const HomePageWithRouter = withRouter(HomePageWrapper);

const returnModule = mod => mod.default;
const HomePageView = dynamic({
  modules: () => ({
    moduleA: () => import('@tcp/core/src/components/common/molecules/ModuleA').then(returnModule),
    moduleB: () => import('@tcp/core/src/components/common/molecules/ModuleB').then(returnModule),
    moduleD: () => import('@tcp/core/src/components/common/molecules/ModuleD').then(returnModule),
    moduleH: () => import('@tcp/core/src/components/common/molecules/ModuleH').then(returnModule),
    moduleJ: () => import('@tcp/core/src/components/common/molecules/ModuleJ').then(returnModule),
    moduleK: () => import('@tcp/core/src/components/common/molecules/ModuleK').then(returnModule),
    moduleL: () => import('@tcp/core/src/components/common/molecules/ModuleL').then(returnModule),
    moduleM: () => import('@tcp/core/src/components/common/molecules/ModuleM').then(returnModule),
    moduleN: () => import('@tcp/core/src/components/common/molecules/ModuleN').then(returnModule),
    moduleQ: () => import('@tcp/core/src/components/common/molecules/ModuleQ').then(returnModule),
    moduleR: () => import('@tcp/core/src/components/common/molecules/ModuleR').then(returnModule),
    moduleX: () => import('@tcp/core/src/components/common/molecules/ModuleX').then(returnModule),
    moduleS: () => import('@tcp/core/src/components/common/molecules/ModuleS').then(returnModule),
    moduleT: () => import('@tcp/core/src/components/common/molecules/ModuleT').then(returnModule),
    module2columns: () =>
      import('@tcp/core/src/components/common/molecules/ModuleTwoCol').then(returnModule),
    moduleG: () => import('@tcp/core/src/components/common/molecules/ModuleG').then(returnModule),
    moduleE: () => import('@tcp/core/src/components/common/molecules/ModuleE').then(returnModule),
    imageText: () =>
      import('@tcp/core/src/components/common/molecules/ImageTextModule').then(returnModule),
  }),
  render: (compProps, modules) => {
    const {
      slots,
      openCountrySelectorModal,
      setCampaignId,
      seoData,
      trackHomepageView,
    } = compProps;

    return (
      <HomePageWithRouter
        openCountrySelectorModal={openCountrySelectorModal}
        setCampaignId={setCampaignId}
        trackHomepageView={trackHomepageView}
      >
        <PageSlots slots={slots} modules={modules} />
        <GetCandid />
        <SeoCopy {...seoData} />
        <Recommendations
          page={Constants.RECOMMENDATIONS_PAGES_MAPPING.HOMEPAGE}
          variations="moduleO,moduleP"
        />
      </HomePageWithRouter>
    );
  },
});

HomePageView.defaultProps = {
  name: null,
};

HomePageWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  openCountrySelectorModal: PropTypes.func.isRequired,
  router: PropTypes.element.isRequired,
  setCampaignId: PropTypes.func.isRequired,
  trackHomepageView: PropTypes.func.isRequired,
};

HomePageView.propTypes = {
  name: PropTypes.string,
  slots: PropTypes.arrayOf(PropTypes.object),
  openCountrySelectorModal: PropTypes.func.isRequired,
  setCampaignId: PropTypes.func.isRequired,
  trackHomepageView: PropTypes.func.isRequired,
};

const HomePageViewWithErrorBoundary = errorBoundary(HomePageView);

// Wrap the home page with a ref-forwarding element
const RefWrappedHomePageView = withRefWrapper(HomePageViewWithErrorBoundary);

/**
 * Hotfix-Aware Component. The use of `withHotfix` is just for making
 * page hotfix-aware.
 */
RefWrappedHomePageView.displayName = 'HomePage';
const HotfixAwareHomePage = withHotfix(RefWrappedHomePageView);

export default HotfixAwareHomePage;

export { HomePageView as HomePageViewVanilla };
