import React from 'react';
import {
  ViewPointsWrapper,
  DefaultView,
  DefaultLabel,
  DefaultValue,
  PromoValue,
  BoldText,
  DefaultText,
  Horizontal,
} from '../styles/AddedToBagViewPoints.style.native';

// @flow
type Props = {
  pointsSummary: Object,
};

const getModifiedString = (labels, totalItems) => {
  return `${labels.bagSubTotal.replace('#items', `${totalItems}`)}`;
};

const AddedToBagViewPoints = ({ pointsSummary }: Props) => {
  const {
    itemPrice,
    itemPoints,
    bagSubTotal,
    userPoints,
    pointsToNextReward,
    totalItems,
  } = pointsSummary;
  const labels = {
    price: 'Price',
    pointsYouCanEarn: 'Points you can earn on these items',
    bagSubTotal: 'Bag Subtotal (#items items)',
    totalRewardsInPoints: 'Total My Place Rewards points in my bag',
    totalNextRewards: 'Total Point to next purchase',
  };
  return (
    <ViewPointsWrapper>
      <DefaultView>
        <DefaultText>
          <DefaultLabel>{labels.price}</DefaultLabel>
        </DefaultText>
        <DefaultText>
          <DefaultValue>{`$${itemPrice}`}</DefaultValue>
        </DefaultText>
      </DefaultView>
      <DefaultView>
        <DefaultText>
          <BoldText>{labels.pointsYouCanEarn}</BoldText>
        </DefaultText>
        <DefaultText>
          <PromoValue>{itemPoints}</PromoValue>
        </DefaultText>
      </DefaultView>
      <Horizontal />
      <DefaultView>
        <DefaultText>
          <DefaultLabel>{getModifiedString(labels, totalItems)}</DefaultLabel>
        </DefaultText>
        <DefaultText>
          <DefaultValue>{`$${bagSubTotal}`}</DefaultValue>
        </DefaultText>
      </DefaultView>
      <DefaultView>
        <DefaultText>
          <BoldText>{labels.totalRewardsInPoints}</BoldText>
        </DefaultText>
        <DefaultText>
          <PromoValue>{userPoints}</PromoValue>
        </DefaultText>
      </DefaultView>
      <DefaultView>
        <DefaultText>
          <BoldText>{labels.totalNextRewards}</BoldText>
        </DefaultText>
        <DefaultText>
          <PromoValue>{pointsToNextReward}</PromoValue>
        </DefaultText>
      </DefaultView>
    </ViewPointsWrapper>
  );
};

export default AddedToBagViewPoints;
