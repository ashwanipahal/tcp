import { getLabelValue } from '@tcp/core/src/utils/utils';
import { labelsHashValuesReplace } from '@tcp/core/src/components/features/CnC/LoyaltyBanner/util/utility';
import { SESSIONCONFIG_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { getCartOrderDetails } from '../../CartItemTile/container/CartItemTile.selectors';
import ConfirmationSelector from '../../Confirmation/container/Confirmation.selectors';

const getCurrentCountry = state => {
  return state[SESSIONCONFIG_REDUCER_KEY] && state[SESSIONCONFIG_REDUCER_KEY].siteDetails.country;
};

const replaceLabelUtil = ({ earnedPlaceCashValue, cashAmountOff, placeCashOffer, currency }) => {
  return {
    title: [
      {
        key: '#earnedPlaceCashValue#',
        value: `${currency}${earnedPlaceCashValue}`,
      },
    ],
    subTitle: [
      {
        key: '#cashAmountOff#',
        value: `${currency}${cashAmountOff}`,
      },
      {
        key: '#placeCashOffer#',
        value: `${currency}${placeCashOffer}`,
      },
    ],
  };
};

/** The place cash amount to be rewarded to customer */
const getCashAmountOff = state => {
  return (
    (state.session &&
      state.session.siteDetails &&
      state.session.siteDetails.PLACECASH_EARN_AMOUNT_OFF) ||
    0
  );
};

/** Minimum worth of merchandise to be in cart */
const getPlaceCashOffer = state => {
  return (
    (state.session &&
      state.session.siteDetails &&
      state.session.siteDetails.PLACECASH_EARN_MIN_PURCHASE) ||
    0
  );
};

const getCurrencySymbol = state => {
  const currency = state.session && state.session.siteDetails && state.session.siteDetails.currency;
  // eslint-disable-next-line no-nested-ternary
  return currency ? (currency === 'USD' || currency === 'CA' ? '$' : currency) : '$';
};

/** Place cash earned on transaction */
const getEarnedPlaceCashValue = state => {
  return (
    getCartOrderDetails(state).get('rewardsToBeEarned') ||
    ConfirmationSelector.getEarnedPlaceCashValue(state)
  );
};

const getPlaceDetailsContentId = (state, labelName) => {
  const { referred = [] } = state.Labels.checkout.placeCashBanner;
  const content = referred.find(label => label.name === labelName);
  return content && content.contentId;
};

/** Flag indicated whether the place cash is enabled  */
const getIsNotInternationalShipping = currentCountry => {
  return currentCountry === 'US' || currentCountry === 'CA';
};

const getIsPlaceCashEnabled = state => {
  const currentCountry = getCurrentCountry(state);
  const earnedPlaceCashValue = getEarnedPlaceCashValue(state);
  return getIsNotInternationalShipping(currentCountry) && earnedPlaceCashValue > 0;
};

const getPlaceDetailsContent = (state, labelName) => {
  const showDetailsContent = state.CartPageReducer.get('moduleXContent').find(
    moduleX => moduleX.name === getPlaceDetailsContentId(state, labelName)
  );
  return showDetailsContent && showDetailsContent.richText;
};

const getCurrentPageName = isOrderConfrimation => {
  return isOrderConfrimation ? 'confirmation' : 'bag';
};

const getPlaceCashDetailBannerLabel = (state, currentCountry, isOrderConfirmation) => {
  const country = currentCountry || getCurrentCountry(state);
  const page = getCurrentPageName(isOrderConfirmation);
  return `PlaceCash_Detail_${country}_${page}`;
};

const getPlaceCashBannerLabels = (state, isOrderConfirmation, isEnabled) => {
  const labels = [
    'title',
    'subTitle',
    'tnc',
    'modalLink',
    'imgUrl',
    'detailModalTitle',
    'SHOW_DETAILS_RICH_TEXT',
  ];
  const finalValue = {};

  if (isEnabled) {
    const currentPage = getCurrentPageName(isOrderConfirmation);
    const currentCountry = getCurrentCountry(state);
    const replaceLabelConfig = replaceLabelUtil({
      currency: getCurrencySymbol(state),
      cashAmountOff: getCashAmountOff(state),
      earnedPlaceCashValue: getEarnedPlaceCashValue(state),
      placeCashOffer: getPlaceCashOffer(state),
    });

    const labelKeys = [
      `lbl_placeCash_${currentCountry}_${currentPage}_title`,
      `lbl_placeCash_${currentCountry}_${currentPage}_subTitle`,
      `lbl_placeCash_${currentCountry}_${currentPage}_tnc`,
      `lbl_placeCash_${currentCountry}_${currentPage}_modalLink`,
      `lbl_placeCash_${currentCountry}_${currentPage}_imgUrl`,
      `lbl_placeCash_${currentCountry}_${currentPage}_detailModalTitle`,
    ];
    labelKeys.forEach((key, index) => {
      const labelKeyValue = getLabelValue(state.Labels, key, 'placeCashBanner', 'checkout');
      const labelString = labelKeyValue === key ? '' : labelKeyValue;
      const labelConfig = replaceLabelConfig[labels[index]];

      finalValue[labels[index]] = labelConfig
        ? labelsHashValuesReplace(labelString, labelConfig)
        : labelString;
    });
    finalValue.SHOW_DETAILS_RICH_TEXT = getPlaceDetailsContent(
      state,
      getPlaceCashDetailBannerLabel(state, currentCountry, isOrderConfirmation)
    );
  } else {
    labels.forEach(key => {
      finalValue[key] = '';
    });
  }
  return finalValue;
};

export default {
  getIsPlaceCashEnabled,
  getPlaceDetailsContentId,
  getPlaceCashBannerLabels,
  getPlaceCashDetailBannerLabel,
};
