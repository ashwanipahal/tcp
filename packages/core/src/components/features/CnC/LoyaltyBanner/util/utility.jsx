import React from 'react';

const labelsHashValuesReplace = (str, utilArr) => {
  let finalString = str;
  utilArr.map(obj => {
    finalString =
      finalString &&
      finalString.replace(
        obj.key,
        obj.value == null ? '' : `<span class="${obj.classValue}">${obj.value}</span>`
      );
    return finalString;
  });
  return finalString;
};

const convertHtml = value => {
  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{ __html: value }} />;
};

const notEarnedReward = (
  estimatedRewardsVal,
  earnedReward,
  isGuest,
  isReviewPage,
  isPlcc,
  labels
) => {
  let conditionalPointsLabelValFinal = '';
  let rewardPointsValFinal = '';

  rewardPointsValFinal = estimatedRewardsVal;
  if (isGuest) {
    if (isReviewPage) {
      conditionalPointsLabelValFinal = labels.guestReviewYouCanEarn;
    } else {
      conditionalPointsLabelValFinal = labels.youCanEarnPoints;
    }
  } else if (!isPlcc) {
    if (isReviewPage) {
      conditionalPointsLabelValFinal = labels.mprReviewYoullEarn;
    } else {
      conditionalPointsLabelValFinal = labels.youllEarnPoints;
    }
  } else if (isReviewPage) {
    conditionalPointsLabelValFinal = labels.plccReviewYoullEarn;
  } else {
    conditionalPointsLabelValFinal = labels.youllEarnPointsPlcc;
  }

  return { conditionalPointsLabelValFinal, rewardPointsValFinal };
};

const renderLoyaltyBanner = (
  earnedReward,
  estimatedRewardsVal,
  isGuest,
  labels,
  isPlcc,
  isReviewPage
) => {
  let conditionalPointsLabelVal = '';
  let rewardPointsVal = '';
  if (!earnedReward) {
    const notEarnedRewardLabel = notEarnedReward(
      estimatedRewardsVal,
      earnedReward,
      isGuest,
      isReviewPage,
      isPlcc,
      labels
    );

    conditionalPointsLabelVal = notEarnedRewardLabel.conditionalPointsLabelValFinal;
    rewardPointsVal = notEarnedRewardLabel.rewardPointsValFinal;
  } else {
    rewardPointsVal = earnedReward;
    if (isGuest) {
      if (isReviewPage) {
        conditionalPointsLabelVal = labels.guestReviewBecomeMember;
      } else {
        conditionalPointsLabelVal = labels.becomeMemberOnThisPurchase;
      }
    } else if (!isPlcc) {
      if (isReviewPage) {
        conditionalPointsLabelVal = labels.mprReviewYoullGet;
      } else {
        conditionalPointsLabelVal = labels.youllGetWithThisPurchase;
      }
    } else if (isReviewPage) {
      conditionalPointsLabelVal = labels.plccReviewYoullGet;
    } else {
      conditionalPointsLabelVal = labels.youllGetARewardPlcc;
    }
  }
  return { conditionalPointsLabelVal, rewardPointsVal };
};

const updateLoyaltyBannerLabels = (isReviewPage, isPlcc, isGuest, earnedReward, labels) => {
  let pointsDescriptionVal;
  let remainingPlccLabelVal;
  let subHeadingLabelVal;
  let showSubtotalVal;
  if (!isReviewPage) {
    if (isPlcc) {
      pointsDescriptionVal = convertHtml(labels.whenYouCheckOutPlcc);
      if (!earnedReward) remainingPlccLabelVal = labels.thatsSomePointsFromReward;
    } else {
      subHeadingLabelVal = labels.save30Today;
      pointsDescriptionVal = labels.earnDoublePoints;
    }
  } else if (isGuest) {
    subHeadingLabelVal = labels.oneDollarSpent;
    showSubtotalVal = false;
  } else if (!isPlcc) {
    showSubtotalVal = false;
  } else {
    pointsDescriptionVal = convertHtml(labels.plccReviewWhenYouCheck);
    if (!earnedReward) remainingPlccLabelVal = labels.plccReviewThatsSomePoints;
  }

  return {
    subHeadingLabelVal,
    pointsDescriptionVal,
    remainingPlccLabelVal,
    showSubtotalVal,
  };
};

export { labelsHashValuesReplace, renderLoyaltyBanner, updateLoyaltyBannerLabels, convertHtml };
