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
import { isTCP, getQueryParamsFromUrl } from '@tcp/core/src/utils/utils';
import { setProp } from '@tcp/core/src/analytics/utils';
import Recommendations from '../../../../common/molecules/Recommendations';
import { setClickAnalyticsData } from '../../../../../../../core/src/analytics/actions';
import FOOTER_CONSTANTS from '../../Footer/Footer.constants';

class HomePageWrapper extends React.Component {
  componentDidMount() {
    const { openCountrySelectorModal, router, pageName, setCampaignId } = this.props;
    if (router.query.target === 'ship-to') {
      openCountrySelectorModal();
    }

    if (pageName === 'homepage') {
      this.subscriptionPopUpOnPageLoad();
    }
    const queryParams = getQueryParamsFromUrl(router.asPath);
    const queryParamsArray = ['cid', 'icid'];
    setProp('eVar22', queryParams[queryParamsArray[0]]);
    setProp('eVar15', 'D-Vo');
    if (queryParams[queryParamsArray[0]]) {
      setCampaignId(queryParams[queryParamsArray[0]]);
    }
    if (queryParams[queryParamsArray[1]]) {
      setClickAnalyticsData({
        internalCampaignId: queryParams[queryParamsArray[1]],
        customEvents: ['event18', 'event80'],
      });
    }
  }

  subscriptionPopUpOnPageLoad = () => {
    const { openEmailSignUpModal, openSmsSignUpModal } = this.props;
    const {
      COOKIE_EMAIL_PERSISTENT,
      COOKIE_EMAIL_SESSION,
      COOKIE_SMS_PERSISTENT,
      COOKIE_MAX_AGE,
      TCP_SUB_DOMAIN,
      GYMBOREE_SUB_DOMAIN,
    } = FOOTER_CONSTANTS;
    /**
     * @function domain check for the domain setting in cookie
     * using @function isTcp from utils
     */
    const domain = isTCP() ? TCP_SUB_DOMAIN : GYMBOREE_SUB_DOMAIN;

    /**
     * @function checkCookieExist function to check the existence
     * of cookie in the browser by returning @BOOLEAN
     */
    const checkCookieExist = name => document.cookie.indexOf(name) > -1;

    /**
     * condition checks for the existence of @cookie COOKIE_EMAIL_PERSISTENT
     * if false, then creates new cookie @cookie COOKIE_EMAIL_PERSISTENT and
     * COOKIE_EMAIL_SESSION and invoke @function openEmailSignUpModal
     * else checks for existence of @cookie COOKIE_EMAIL_PERSISTENT and non-existence
     * of @cookie COOKIE_SMS_PERSISTENT
     * if the above condition evaluates true then invoke
     * @function openSmsSignUpModal and set @cookie COOKIE_SMS_PERSISTENT
     */
    if (!checkCookieExist(COOKIE_EMAIL_PERSISTENT)) {
      document.cookie = `${COOKIE_EMAIL_PERSISTENT}=true; domain=${domain}; max-age=${COOKIE_MAX_AGE}`;
      document.cookie = `${COOKIE_EMAIL_SESSION}=true; domain=${domain};`;
      openEmailSignUpModal();
    } else if (
      checkCookieExist(COOKIE_EMAIL_PERSISTENT) &&
      !checkCookieExist(COOKIE_SMS_PERSISTENT)
    ) {
      document.cookie = `${COOKIE_SMS_PERSISTENT}=true; domain=${domain}; max-age=${COOKIE_MAX_AGE}`;
      openSmsSignUpModal();
    }
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
      openEmailSignUpModal,
      openSmsSignUpModal,
      pageName,
      setCampaignId,
      seoData,
    } = compProps;

    return (
      <HomePageWithRouter
        openCountrySelectorModal={openCountrySelectorModal}
        openEmailSignUpModal={openEmailSignUpModal}
        openSmsSignUpModal={openSmsSignUpModal}
        pageName={pageName}
        setCampaignId={setCampaignId}
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
  pageName: PropTypes.string,
  children: PropTypes.element.isRequired,
  openCountrySelectorModal: PropTypes.func.isRequired,
  openEmailSignUpModal: PropTypes.func.isRequired,
  openSmsSignUpModal: PropTypes.func.isRequired,
  router: PropTypes.element.isRequired,
  setCampaignId: PropTypes.func.isRequired,
};

HomePageWrapper.defaultProps = {
  pageName: '',
};

HomePageView.propTypes = {
  name: PropTypes.string,
  slots: PropTypes.arrayOf(PropTypes.object),
  openCountrySelectorModal: PropTypes.func.isRequired,
  setCampaignId: PropTypes.func.isRequired,
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
