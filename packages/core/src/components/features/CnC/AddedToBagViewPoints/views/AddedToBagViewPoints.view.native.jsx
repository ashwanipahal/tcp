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
        <DefaultText>
          <DefaultLabel>{labels.price}</DefaultLabel>
        </DefaultText>
        <DefaultText>
          <DefaultValue>{`$${itemPrice || 0}`}</DefaultValue>
        </DefaultText>
      </DefaultView>
      <DefaultView>
        <DefaultText>
          <BoldText>{labels.pointsYouCanEarn}</BoldText>
        </DefaultText>
        <DefaultText>
          <PromoValue>{itemPoints || 0}</PromoValue>
        </DefaultText>
      </DefaultView>
      <Horizontal />
      <DefaultView>
        <DefaultText>
          <DefaultLabel>{getModifiedString(labels, totalItems || 0)}</DefaultLabel>
        </DefaultText>
        <DefaultText>
          <DefaultValue>{`$${bagSubTotal || 0}`}</DefaultValue>
        </DefaultText>
      </DefaultView>
      <DefaultView>
        <DefaultText>
          <BoldText>{labels.totalRewardsInPoints}</BoldText>
        </DefaultText>
        <DefaultText>
          <PromoValue>{userPoints || 0}</PromoValue>
        </DefaultText>
      </DefaultView>
      <DefaultView>
        <DefaultText>
          <BoldText>{labels.totalNextRewards}</BoldText>
        </DefaultText>
        <DefaultText>
          <PromoValue>{pointsToNextReward || 0}</PromoValue>
        </DefaultText>
      </DefaultView>
    </ViewPointsWrapper>
  );
};

export default AddedToBagViewPoints;
