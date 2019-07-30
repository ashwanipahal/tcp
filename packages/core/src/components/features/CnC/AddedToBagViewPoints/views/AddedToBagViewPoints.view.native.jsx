import React from 'react';
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
};

const getModifiedString = (labels, totalItems) => {
  return `${labels.bagSubTotal.replace('#items', `${totalItems}`)}`;
};

const AddedToBagViewPoints = ({ pointsSummary, labels }: Props) => {
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
        <BodyCopy fontFamily="secondary" fontSize="fs13" text={`$${itemPrice || 0}`} />
      </DefaultView>
      <DefaultView>
        <BodyCopy
          fontWeight="extrabold"
          fontFamily="secondary"
          fontSize="fs13"
          text={labels.pointsYouCanEarn}
        />
        <BodyCopy
          color="yellow.500"
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
        <BodyCopy fontFamily="secondary" fontSize="fs13" text={`$${bagSubTotal || 0}`} />
      </DefaultView>
      <DefaultView>
        <BodyCopy
          fontWeight="extrabold"
          fontFamily="secondary"
          fontSize="fs13"
          text={labels.totalRewardsInPoints}
        />
        <BodyCopy
          color="yellow.500"
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
          color="yellow.500"
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
