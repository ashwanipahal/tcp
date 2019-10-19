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
      headingLabelVal = labels.reviewGuestPointsHeading;
      subHeadingLabel = labels.reviewGuestPointsSubHeading;
    } else if (!isPlcc) {
      headingLabelVal = labels.reviewMprPointsHeading;
    } else {
      headingLabelVal = labels.reviewPlccPointsHeading;
      descriptionLabel = labels.reviewPlccPointsDescription;
      remainingPlccVal = labels.reviewPlccPointsRemaining;
    }
  } else {
    rewardPointsValue = earnedReward;
    if (isGuest) {
      headingLabelVal = labels.reviewGuestRewardsHeading;
      subHeadingLabel = labels.reviewGuestRewardsSubHeading;
    } else if (!isPlcc) {
      headingLabelVal = labels.reviewMprRewardsHeading;
    } else {
      headingLabelVal = labels.reviewPlccRewardsHeading;
      descriptionLabel = labels.reviewPlccRewardsDescription;
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
      headingLabelVal = labels.confirmationGuestPointsHeading;
    } else if (!isPlcc) {
      headingLabelVal = labels.confirmationMprPointsHeading;
      remainingPlccVal = labels.confirmationMprPointsRemaining;
    } else {
      headingLabelVal = labels.confirmationPlccPointsHeading;
      remainingPlccVal = labels.confirmationPlccPointsRemaining;
    }
  } else {
    rewardPointsValue = earnedReward;
    if (isGuest) {
      headingLabelVal = labels.confirmationGuestRewardsHeading;
      subHeadingLabel = labels.confirmationGuestRewardsSubHeading;
    } else if (!isPlcc) {
      headingLabelVal = labels.confirmationMprRewardsHeading;
    } else {
      headingLabelVal = labels.confirmationPlccRewardsHeading;
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
      headingLabelVal = labels.bagGuestPointsHeading;
      subHeadingLabel = labels.bagGuestPointsSubHeading;
      descriptionLabel = labels.bagGuestPointsDescription;
    } else if (!isPlcc) {
      headingLabelVal = labels.bagMprPointsHeading;
      subHeadingLabel = labels.bagMprPointsSubHeading;
      descriptionLabel = labels.bagMprPointsDescription;
    } else {
      headingLabelVal = labels.bagPlccPointsHeading;
      descriptionLabel = labels.bagPlccPointsDescription;
      remainingPlccVal = labels.bagPlccPointsRemaining;
    }
  } else {
    rewardPointsValue = earnedReward;
    if (isGuest) {
      headingLabelVal = labels.bagGuestRewardsHeading;
      subHeadingLabel = labels.bagGuestRewardsSubHeading;
      descriptionLabel = labels.bagGuestRewardsDescription;
    } else if (!isPlcc) {
      headingLabelVal = labels.bagMprRewardsHeading;
      subHeadingLabel = labels.bagMprRewardsSubHeading;
      descriptionLabel = labels.bagMprRewardsDescription;
    } else {
      headingLabelVal = labels.bagPlccRewardsHeading;
      descriptionLabel = labels.bagPlccRewardsSubHeading;
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
