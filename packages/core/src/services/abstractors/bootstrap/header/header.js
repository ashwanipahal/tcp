import mock from './mock';
import handler from '../../../handler';

/**
 * Abstractor layer for loading data from API for Header related components
 */
const Abstractor = {
  getData: (module, data) => {
    return handler
      .fetchModuleDataFromGraphQL({ name: module, data })
      .then(response => response.data)
      .then(Abstractor.processData);
  },
  getMock: () => {
    return mock;
  },
  processData: data => {
    return {
      brandTabs: data.submodules.topNavWrapper.composites.brand_tabs,
      promoMessageWrapper: data.submodules.topNavWrapper.composites.promo_message_wrapper,
      promoTextBannerCarousel: data.submodules.promoTextBannerCarousel.composites.promoTextBanner,
    };
  },
};
export default Abstractor;
