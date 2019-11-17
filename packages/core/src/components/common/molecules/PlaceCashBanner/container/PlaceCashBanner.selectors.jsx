import { getLabelValue } from '@tcp/core/src/utils/utils';
import { labelsHashValuesReplace } from '@tcp/core/src/components/features/CnC/LoyaltyBanner/util/utility';

import { SESSIONCONFIG_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

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
    (state.cartPageReducer &&
      state.cartPageReducer.orderDetails &&
      state.cartPageReducer.orderDetails.rewardsToBeEarned) ||
    0
  );
};

const getPlaceDetailsContentId = state => {
  const { referred = [] } = state.Labels.checkout.placeCashBanner;
  const content = referred.find(label => label.name === 'PlaceCashDetails');
  return content && content.contentId;
};

/** Flag indicated whether the place cash is enabled  */
const getIsInternationalShipping = currentCountry => {
  return currentCountry !== 'US' || currentCountry !== 'CA';
};

export const getIsPlaceCashEnabled = state => {
  const currentCountry = getCurrentCountry(state);
  const earnedPlaceCashValue = getEarnedPlaceCashValue(state);

  return getIsInternationalShipping(currentCountry) && earnedPlaceCashValue > 0;
};

export const getPlaceCashBannerLabels = (state, isOrderConfirmation) => {
  const currentPage = isOrderConfirmation ? 'confirmation' : 'bag';
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
  const labels = ['title', 'subTitle', 'tnc', 'modalLink', 'imgUrl', 'detailModalTitle'];

  const finalValue = {};
  labelKeys.forEach((key, index) => {
    const labelKeyValue = getLabelValue(state.Labels, key, 'placeCashBanner', 'checkout');
    const labelString = labelKeyValue === key ? '' : labelKeyValue;
    const labelConfig = replaceLabelConfig[labels[index]];

    finalValue[labels[index]] = labelConfig
      ? labelsHashValuesReplace(labelString, labelConfig)
      : labelString;
  });
  return finalValue;
};

export const getPlaceDetailsContent = state => {
  const showDetailsContent = state.CartPageReducer.get('moduleXContent').find(
    moduleX => moduleX.name === getPlaceDetailsContentId(state)
  );
  return showDetailsContent && showDetailsContent.richText;
};
