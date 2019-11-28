import { getLabelValue } from '../../../../../utils';
import getAddedToBagFormValues from '../../../../../reduxStore/selectors/form.selectors';
import { processBreadCrumbs } from '../../ProductListing/container/ProductListing.util';

export const getNavTree = state => {
  return state.Navigation.navigationData;
};

export const prodDetails = state => {
  return state.ProductDetail;
};

export const getBreadCrumbs = state => {
  return processBreadCrumbs(state.ProductDetail && state.ProductDetail.breadCrumbs);
};

export const getAlternateSizes = state => {
  return state.ProductDetail.currentProduct && state.ProductDetail.currentProduct.alternateSizes;
};

export const getDescription = state => {
  return state.ProductDetail.currentProduct && state.ProductDetail.currentProduct.longDescription;
};

export const getRatingsProductId = state => {
  return state.ProductDetail.currentProduct && state.ProductDetail.currentProduct.ratingsProductId;
};

export const getGeneralProductId = state => {
  return state.ProductDetail.currentProduct && state.ProductDetail.currentProduct.generalProductId;
};

export const getShortDescription = state => {
  return state.ProductDetail.currentProduct && state.ProductDetail.currentProduct.shortDescription;
};

export const getPDPLoadingState = state => {
  return state.ProductDetail && state.ProductDetail.isLoading;
};

export const getProductDetailFormValues = state => {
  const generalProductId = getGeneralProductId(state);
  return getAddedToBagFormValues(state, `ProductAddToBag-${generalProductId}`);
};

export const getPlpLabels = state => {
  if (!state.Labels || !state.Labels.PLP)
    return {
      addToBag: '',
      update: '',
      errorMessage: '',
      size: '',
      fit: '',
      color: '',
      quantity: '',
      sizeUnavalaible: '',
      sizeAvailable: '',
      saveProduct: '',
    };

  const {
    PLP: {
      plpTiles: {
        lbl_add_to_bag: addToBag,
        lbl_pdp_update: update,
        lbl_pdp_size_error: errorMessage,
        lbl_pdp_size: size,
        lbl_pdp_fit: fit,
        lbl_pdp_color: color,
        lbl_pdp_quantity: quantity,
        lbl_size_unavailable_online: sizeUnavalaible,
        lbl_other_sizes_available: sizeAvailable,
        lbl_fav_save_product: saveProduct,
      },
    },
  } = state.Labels;

  return {
    addToBag,
    errorMessage,
    size,
    fit,
    color,
    quantity,
    update,
    sizeUnavalaible,
    sizeAvailable,
    saveProduct,
  };
};

// TODO - This is temporary - fix it by introducing the image carousel and zoom
export const getDefaultImage = state => {
  const firstColor =
    state.ProductDetail.currentProduct &&
    state.ProductDetail.currentProduct.colorFitsSizesMap &&
    state.ProductDetail.currentProduct.colorFitsSizesMap[0].color.name;
  return (
    firstColor &&
    state.ProductDetail.currentProduct &&
    state.ProductDetail.currentProduct.imagesByColor[firstColor].basicImageUrl
  );
};

export const getCurrentCurrency = state => {
  return state.session.siteDetails.currency;
};

export const getCurrencyAttributes = state => {
  return (
    (state.session.siteDetails && state.session.siteDetails.currencyAttributes) || {
      exchangevalue: 1,
      merchantMargin: 1,
      roundMethod: '',
    }
  );
};

export const getCurrentProduct = state => {
  return state.ProductDetail.currentProduct;
};

export const getPDPLabels = state => {
  return {
    fullSize: getLabelValue(state.Labels, 'lbl_full_size', 'PDP', 'Browse'),
    promoArea1: getLabelValue(state.Labels, 'lbl_promo_area_1', 'PDP', 'Browse'),
    promoArea: getLabelValue(state.Labels, 'lbl_promo_area', 'PDP', 'Browse'),
    promoArea3: getLabelValue(state.Labels, 'lbl_promo_area_3', 'PDP', 'Browse'),
    completeTheLook: getLabelValue(state.Labels, 'lbl_complete_the_look', 'PDP', 'Browse'),
    youMayAlsoLike: getLabelValue(state.Labels, 'lbl_you_may_also_like', 'PDP', 'Browse'),
    recentlyViewed: getLabelValue(state.Labels, 'lbl_recently_viewed', 'PDP', 'Browse'),
    myStylePlace: getLabelValue(state.Labels, 'lbl_my_style_place', 'PDP', 'Browse'),
    ratingReview: getLabelValue(state.Labels, 'lbl_rating_review', 'PDP', 'Browse'),
    ShowMore: getLabelValue(state.Labels, 'lbl_product_description_show_more', 'PDP', 'Browse'),
    ShowLess: getLabelValue(state.Labels, 'lbl_product_description_show_less', 'PDP', 'Browse'),
    ProductDescription: getLabelValue(
      state.Labels,
      'lbl_product_description_label',
      'PDP',
      'Browse'
    ),
    ClaimMessage: getLabelValue(
      state.Labels,
      'lbl_product_description_claim_message',
      'PDP',
      'Browse'
    ),
    PartNumber: getLabelValue(
      state.Labels,
      'lbl_product_description_item_part_number',
      'PDP',
      'Browse'
    ),
    preferSendingViaEmail: getLabelValue(
      state.Labels,
      'lbl_prefer_sending_via_email',
      'PDP',
      'Browse'
    ),
    sendAnEmailCard: getLabelValue(state.Labels, 'lbl_send_an_email_card', 'PDP', 'Browse'),
    freeShippingEveryDay: getLabelValue(
      state.Labels,
      'lbl_free_shipping_every_day',
      'PDP',
      'Browse'
    ),
    back: getLabelValue(state.Labels, 'lbl_back', 'PDP', 'Browse'),
    eGiftCardLink: getLabelValue(state.Labels, 'eGiftCardLink', 'PDP', 'Browse'),
  };
};

export const getPLPPromos = (state, type) => {
  // TODO: Dynamic the productID generation logic
  let productID = 'global'; // 'global'; '54520|489117';
  const { Layouts, Modules } = state;
  let result = null;
  if (Layouts && Layouts.pdp) {
    const { pdp } = Layouts;
    productID = pdp[productID] ? 'global' : '54520|489117';
    if (pdp[productID]) {
      const promo = pdp[productID][type] && pdp[productID][type].slots;
      result =
        (promo &&
          promo.map(promoItem => {
            return (promoItem.contentId && Modules[promoItem.contentId]) || {};
          })) ||
        [];
    }
  }
  return result;
};

const getRefinedNavTree = (catId, navigationTree) => {
  return navigationTree.find(L1 => L1.categoryId === catId);
};

const getRefinedNavTreeL2orL3 = (catId, navigationTree) => {
  return navigationTree.find(L2 => L2.categoryContent.id === catId);
};

const getNavTreeFromCatMap = (navTree, categoryPath) => {
  if (!categoryPath) return '';
  const catMapL1Id = categoryPath[0] && categoryPath[0].split('|')[0].split('>')[0];
  const catMapL2Id = categoryPath[0] && categoryPath[0].split('|')[0].split('>')[1];
  const catMapL3Id = (categoryPath[0] && categoryPath[0].split('|')[0].split('>')[2]) || null;
  const catMapL1 = catMapL1Id && getRefinedNavTree(catMapL1Id, navTree);
  const catMapL2 =
    catMapL2Id && getRefinedNavTreeL2orL3(catMapL2Id, catMapL1.subCategories.Categories.items);
  return (catMapL3Id && getRefinedNavTreeL2orL3(catMapL3Id, catMapL2.subCategories)) || catMapL2;
};

const getCatMapFromBreadCrump = (categoryPath, breadCrumbs) => {
  return (
    categoryPath &&
    breadCrumbs[1] &&
    categoryPath.find(_catMap => _catMap.split('|')[0].includes(breadCrumbs[1].categoryId))
  );
};

const getNavTreeFromBreadCrumb = (breadCrumbs, categoryPath, navTree) => {
  const catMap = getCatMapFromBreadCrump(categoryPath, breadCrumbs);
  const l3String = catMap ? catMap.split('|')[0].split('>')[2] || '' : '';
  const l3CatFromString =
    navTree &&
    navTree.subCategories &&
    navTree.subCategories.Categories.items.find(cat => cat.id === l3String);
  return (
    (l3CatFromString && l3CatFromString.categoryContent.sizeChartSelection) ||
    (navTree && navTree.categoryContent && navTree.categoryContent.sizeChartSelection) ||
    ''
  );
};

const fetchL2andL3Category = (navTree, breadCrumbs, isBundleProduct, categoryPath) => {
  let l3Cat = {};
  let l2Cat = {};
  if (breadCrumbs && breadCrumbs[0] && breadCrumbs[0].categoryId && !isBundleProduct) {
    const tree = getRefinedNavTree(breadCrumbs[0].categoryId, navTree);
    l2Cat =
      tree &&
      tree.subCategories &&
      tree.subCategories.Categories.items.find(cat => cat.id === breadCrumbs[1].categoryId);
    l3Cat =
      breadCrumbs[2] &&
      l2Cat &&
      l2Cat.subCategories &&
      l2Cat.subCategories.find(cat => cat.categoryId === breadCrumbs[2].categoryId);
  } else {
    l3Cat = getNavTreeFromCatMap(navTree, categoryPath);
  }
  return { l2Cat: l2Cat, l3Cat: l3Cat };
};

const fetchSizeChartDetails = (navTree, breadCrumbs, categoryPath, isBundleProduct) => {
  // Return empty if Navigation Tree not available/passed
  if (!navTree) {
    return '';
  }
  const payload = fetchL2andL3Category(navTree, breadCrumbs, isBundleProduct, categoryPath);
  if (payload.l3Cat) {
    return (
      payload.l3Cat.categoryContent.sizeChartSelection ||
      (payload.l2Cat &&
        payload.l2Cat.categoryContent &&
        payload.l2Cat.categoryContent.sizeChartSelection) ||
      ''
    );
  }
  return getNavTreeFromBreadCrumb(breadCrumbs, categoryPath, payload.l2Cat);
};

export const getSizeChartDetails = state => {
  return [];
};
