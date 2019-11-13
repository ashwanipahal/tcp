import { getLabelValue } from '../../../../../utils';
import { processBreadCrumbs } from '../../ProductListing/container/ProductListing.util';

export const getNavTree = state => {
  return state.Navigation.navigationData;
};

export const prodDetails = state => {
  return state.BundleProduct;
};

export const getBreadCrumbs = state => {
  return processBreadCrumbs(state.BundleProduct && state.BundleProduct.breadCrumbs);
};

export const getAlternateSizes = state => {
  return state.BundleProduct.currentProduct && state.BundleProduct.currentProduct.alternateSizes;
};

export const getDescription = state => {
  return state.BundleProduct.currentProduct && state.BundleProduct.currentProduct.longDescription;
};

export const getRatingsProductId = state => {
  return state.BundleProduct.currentProduct && state.BundleProduct.currentProduct.ratingsProductId;
};

export const getGeneralProductId = state => {
  return state.BundleProduct.currentProduct && state.BundleProduct.currentProduct.generalProductId;
};

export const getShortDescription = state => {
  return state.BundleProduct.currentProduct && state.BundleProduct.currentProduct.shortDescription;
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
  };
};

// TODO - This is temporary - fix it by introducing the image carousel and zoom
export const getDefaultImage = state => {
  const firstColor =
    state.BundleProduct.currentProduct &&
    state.BundleProduct.currentProduct.colorFitsSizesMap &&
    state.BundleProduct.currentProduct.colorFitsSizesMap[0].color.name;
  return (
    firstColor &&
    state.BundleProduct.currentProduct &&
    state.BundleProduct.currentProduct.imagesByColor[firstColor].basicImageUrl
  );
};

export const getCurrentCurrency = state => {
  return state.session.siteDetails.currency;
};

export const getCurrencyAttributes = state => {
  return (
    (state.session.siteDetails && state.session.siteDetails.currencyAttributes) || {
      exchangevalue: 1,
    }
  );
};

export const getCurrentProduct = state => {
  return state.BundleProduct && state.BundleProduct.currentProduct;
};

export const getCurrentBundle = state => {
  return state.BundleProduct && state.BundleProduct.currentBundle;
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
    writeAReview: getLabelValue(state.Labels, 'lbl_write_review', 'PDP', 'Browse'),
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
    chooseItemBtnLbl: getLabelValue(state.Labels, 'lbl_bundleproduct_choosecta', 'PDP', 'Browse'),
  };
};

export const getAddedToBagErrorCatId = state => {
  return state.AddedToBagReducer && state.AddedToBagReducer.errorCatId;
};
