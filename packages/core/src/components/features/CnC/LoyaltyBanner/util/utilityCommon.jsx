/* eslint-disable max-params */
const reviewPageLabelsFn = (labels, earnedReward, estimatedRewardsVal, isGuest, isPlcc) => {
  let rewardPointsValue = '';
  let headingLabelVal = '';
  let subHeadingLabel = '';
  let descriptionLabel = '';
  let remainingPlccVal = '';
  if (!earnedReward) {
    rewardPointsValue = estimatedRewardsVal;
    if (isGuest) {
      headingLabelVal = labels.guestReviewYouCanEarn;
      subHeadingLabel = labels.oneDollarSpent;
    } else if (!isPlcc) {
      headingLabelVal = labels.mprReviewYoullEarn;
    } else {
      headingLabelVal = labels.plccReviewYoullEarn;
      descriptionLabel = labels.plccReviewWhenYouCheck;
      remainingPlccVal = labels.plccReviewThatsSomePoints;
    }
  } else {
    rewardPointsValue = earnedReward;
    if (isGuest) {
      headingLabelVal = labels.guestReviewBecomeMember;
      subHeadingLabel = labels.oneDollarSpent;
    } else if (!isPlcc) {
      headingLabelVal = labels.mprReviewYoullGet;
    } else {
      headingLabelVal = labels.plccReviewYoullGet;
      descriptionLabel = labels.plccReviewWhenYouCheck;
    }
  }
  return {
    rewardPointsValue,
    headingLabelVal,
    subHeadingLabel,
    descriptionLabel,
    remainingPlccVal,
  };
};

const confirmationPageLabelsFn = (labels, earnedReward, estimatedRewardsVal, isGuest, isPlcc) => {
  let rewardPointsValue = '';
  let headingLabelVal = '';
  let subHeadingLabel = '';
  let remainingPlccVal = '';
  if (!earnedReward) {
    rewardPointsValue = estimatedRewardsVal;
    if (isGuest) {
      headingLabelVal = labels.guestConfirmationSignUp;
    } else if (!isPlcc) {
      headingLabelVal = labels.mprConfirmationYouEarnedPoints;
      remainingPlccVal = labels.mprConfirmationThatsSomePoints;
    } else {
      headingLabelVal = labels.plccConfirmationYouEarnedPoints;
      remainingPlccVal = labels.plccConfirmationYoureSomePoints;
    }
  } else {
    rewardPointsValue = earnedReward;
    if (isGuest) {
      headingLabelVal = labels.guestConfirmationBecomeMember;
      subHeadingLabel = labels.oneDollarSpent;
    } else if (!isPlcc) {
      headingLabelVal = labels.mprConfirmationYouEarnedReward;
    } else {
      headingLabelVal = labels.plccConfirmationYouEarnedReward;
    }
  }
  return {
    rewardPointsValue,
    headingLabelVal,
    subHeadingLabel,
    remainingPlccVal,
  };
};

const addedToBagPageLabelsFn = (labels, earnedReward, estimatedRewardsVal, isGuest, isPlcc) => {
  let rewardPointsValue = '';
  let headingLabelVal = '';
  let subHeadingLabel = '';
  let remainingPlccVal = '';
  if (!earnedReward) {
    rewardPointsValue = estimatedRewardsVal;
    if (isGuest) {
      headingLabelVal = labels.guestConfirmationSignUp1;
    } else if (!isPlcc) {
      headingLabelVal = labels.mprConfirmationYouEarnedPoints1;
      remainingPlccVal = labels.mprConfirmationThatsSomePoints1;
    } else {
      headingLabelVal = labels.plccConfirmationYouEarnedPoints1;
      remainingPlccVal = labels.plccConfirmationYoureSomePoints1;
    }
  } else {
    rewardPointsValue = earnedReward;
    if (isGuest) {
      headingLabelVal = labels.guestConfirmationBecomeMember1;
      subHeadingLabel = labels.oneDollarSpent1;
    } else if (!isPlcc) {
      headingLabelVal = labels.mprConfirmationYouEarnedReward1;
    } else {
      headingLabelVal = labels.plccConfirmationYouEarnedReward1;
    }
  }
  return {
    rewardPointsValue,
    headingLabelVal,
    subHeadingLabel,
    remainingPlccVal,
  };
};

const bagCheckoutPageLabelsFn = (labels, earnedReward, estimatedRewardsVal, isGuest, isPlcc) => {
  let rewardPointsValue = '';
  let headingLabelVal = '';
  let subHeadingLabel = '';
  let descriptionLabel = '';
  let remainingPlccVal = '';
  if (!earnedReward) {
    rewardPointsValue = estimatedRewardsVal;
    if (isGuest) {
      headingLabelVal = labels.youCanEarnPoints;
      subHeadingLabel = labels.save30Today;
      descriptionLabel = labels.earnDoublePoints;
    } else if (!isPlcc) {
      headingLabelVal = labels.youllEarnPoints;
      subHeadingLabel = labels.save30Today;
      descriptionLabel = labels.earnDoublePoints;
    } else {
      headingLabelVal = labels.youllEarnPointsPlcc;
      descriptionLabel = labels.whenYouCheckOutPlcc;
      remainingPlccVal = labels.thatsSomePointsFromReward;
    }
  } else {
    rewardPointsValue = earnedReward;
    if (isGuest) {
      headingLabelVal = labels.becomeMemberOnThisPurchase;
      subHeadingLabel = labels.save30Today;
      descriptionLabel = labels.earnDoublePoints;
    } else if (!isPlcc) {
      headingLabelVal = labels.youllGetWithThisPurchase;
      subHeadingLabel = labels.save30Today;
      descriptionLabel = labels.earnDoublePoints;
    } else {
      headingLabelVal = labels.youllGetARewardPlcc;
      descriptionLabel = labels.whenYouCheckOutPlcc;
    }
  }
  return {
    rewardPointsValue,
    headingLabelVal,
    subHeadingLabel,
    descriptionLabel,
    remainingPlccVal,
  };
};

const renderLoyaltyLabels = (
  labels,
  estimatedRewardsVal,
  earnedReward,
  isGuest,
  isPlcc,
  isReviewPage,
  isConfirmationPage,
  isAddedToBagPage
) => {
  let rewardPointsValueFn = '';
  let headingLabelValFn = '';
  let subHeadingLabelFn = '';
  let descriptionLabelFn = '';
  let remainingPlccValFn = '';
  if (isReviewPage) {
    const reviewPageLabels = reviewPageLabelsFn(
      labels,
      earnedReward,
      estimatedRewardsVal,
      isGuest,
      isPlcc
    );
    rewardPointsValueFn = reviewPageLabels.rewardPointsValue;
    headingLabelValFn = reviewPageLabels.headingLabelVal;
    subHeadingLabelFn = reviewPageLabels.subHeadingLabel;
    descriptionLabelFn = reviewPageLabels.descriptionLabel;
    remainingPlccValFn = reviewPageLabels.remainingPlccVal;
  } else if (isConfirmationPage) {
    const confirmationPageLabels = confirmationPageLabelsFn(
      labels,
      earnedReward,
      estimatedRewardsVal,
      isGuest,
      isPlcc
    );
    rewardPointsValueFn = confirmationPageLabels.rewardPointsValue;
    headingLabelValFn = confirmationPageLabels.headingLabelVal;
    subHeadingLabelFn = confirmationPageLabels.subHeadingLabel;
    descriptionLabelFn = confirmationPageLabels.descriptionLabel;
    remainingPlccValFn = confirmationPageLabels.remainingPlccVal;
  } else if (isAddedToBagPage) {
    const addedToBagPageLabels = addedToBagPageLabelsFn(
      labels,
      earnedReward,
      estimatedRewardsVal,
      isGuest,
      isPlcc
    );
    rewardPointsValueFn = addedToBagPageLabels.rewardPointsValue;
    headingLabelValFn = addedToBagPageLabels.headingLabelVal;
    subHeadingLabelFn = addedToBagPageLabels.subHeadingLabel;
    descriptionLabelFn = addedToBagPageLabels.descriptionLabel;
    remainingPlccValFn = addedToBagPageLabels.remainingPlccVal;
  } else {
    const bagcheckoutPageLabels = bagCheckoutPageLabelsFn(
      labels,
      earnedReward,
      estimatedRewardsVal,
      isGuest,
      isPlcc
    );
    rewardPointsValueFn = bagcheckoutPageLabels.rewardPointsValue;
    headingLabelValFn = bagcheckoutPageLabels.headingLabelVal;
    subHeadingLabelFn = bagcheckoutPageLabels.subHeadingLabel;
    descriptionLabelFn = bagcheckoutPageLabels.descriptionLabel;
    remainingPlccValFn = bagcheckoutPageLabels.remainingPlccVal;
  }

  return {
    rewardPointsValueFn,
    headingLabelValFn,
    subHeadingLabelFn,
    descriptionLabelFn,
    remainingPlccValFn,
  };
};

export default renderLoyaltyLabels;
