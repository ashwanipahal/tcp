import React from 'react';
import { ScrollView, View } from 'react-native';
import { PropTypes } from 'prop-types';
import {
  SkeletonWrapper,
  StoreInfoSkeleton,
  StoreDetailSkeleton,
} from '../StoreListItemSkeleton.native.style';

const StoreListItemSkeletonView = () => {
  return (
    <SkeletonWrapper>
      <StoreInfoSkeleton />
      <StoreDetailSkeleton />
    </SkeletonWrapper>
  );
};

const StoreListItemSkeleton = ({ col }) => {
  return (
    <ScrollView>
      <View>
        {Array.from({ length: col }).map((cItem, index) => {
          return <StoreListItemSkeletonView key={index.toString()} />;
        })}
      </View>
    </ScrollView>
  );
};

StoreListItemSkeleton.propTypes = {
  col: PropTypes.number,
};

StoreListItemSkeleton.defaultProps = {
  col: 1,
};

export default StoreListItemSkeleton;
