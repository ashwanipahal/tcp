import React from 'react';
import PriceCurrency from '@tcp/core/src/components/common/molecules/PriceCurrency';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import {
  ViewPointsWrapper,
  DefaultView,
  Horizontal,
} from '../styles/AddedToBagViewPoints.style.native';

// @flow
type Props = {
  pointsSummary: Object,
  labels: Object,
  isUserLoggedIn: boolean,
};

const getModifiedString = (labels, totalItems) => {
  return `${labels.bagSubTotal.replace('#items', `${totalItems}`)}`;
};

const AddedToBagViewPoints = ({ pointsSummary, labels, isUserLoggedIn }: Props) => {
  const {
    itemPrice,
    itemPoints,
    bagSubTotal,
    userPoints,
    pointsToNextReward,
    totalItems,
  } = pointsSummary;
  return (
    <ViewPointsWrapper>
      <DefaultView>
        <BodyCopy fontFamily="secondary" fontSize="fs13" text={labels.price} />
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs13"
          text={<PriceCurrency price={itemPrice} />}
        />
      </DefaultView>
      <DefaultView>
        <BodyCopy
          fontWeight="extrabold"
          fontFamily="secondary"
          fontSize="fs13"
          text={isUserLoggedIn ? labels.MPRPoints : labels.pointsYouCanEarn}
        />
        <BodyCopy
          color="orange.500"
          fontWeight="extrabold"
          fontFamily="secondary"
          fontSize="fs13"
          text={itemPoints || 0}
        />
      </DefaultView>
      <Horizontal />
      <DefaultView>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs13"
          text={getModifiedString(labels, totalItems || 0)}
        />
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs13"
          text={<PriceCurrency price={bagSubTotal} />}
        />
      </DefaultView>
      <DefaultView>
        <BodyCopy
          fontWeight="extrabold"
          fontFamily="secondary"
          fontSize="fs13"
          text={labels.totalRewardsInPoints}
        />
        <BodyCopy
          color="orange.500"
          fontWeight="extrabold"
          fontFamily="secondary"
          fontSize="fs13"
          text={userPoints || 0}
        />
      </DefaultView>
      <DefaultView>
        <BodyCopy
          fontWeight="extrabold"
          fontFamily="secondary"
          fontSize="fs13"
          text={labels.totalNextRewards}
        />
        <BodyCopy
          color="orange.500"
          fontWeight="extrabold"
          fontFamily="secondary"
          fontSize="fs13"
          text={pointsToNextReward || 0}
        />
      </DefaultView>
    </ViewPointsWrapper>
  );
};

export default AddedToBagViewPoints;
