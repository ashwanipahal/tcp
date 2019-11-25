import React from 'react';
import { View } from 'react-native';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton/views/SkeletonLine.view.native';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import SkeletonWrapperView from '../styles/AccountOverviewTileSkeleton.style.native';

const AccountOverviewTileSkelton = () => {
  return (
    <SkeletonWrapperView>
      <ViewWithSpacing spacingStyles="margin-bottom-MED">
        <LoaderSkelton width="75%" height="30" />
      </ViewWithSpacing>
      <ViewWithSpacing spacingStyles="margin-bottom-MED">
        <LoaderSkelton width="100%" height="100" />
      </ViewWithSpacing>
      <View>
        <LoaderSkelton width="100%" height="30" />
      </View>
    </SkeletonWrapperView>
  );
};
export default AccountOverviewTileSkelton;
