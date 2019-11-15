import React from 'react';
import { View } from 'react-native';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton/views/SkeletonLine.view.native';
import {
  SkeletonWrapperView,
  SkeletonSpacingView,
} from '../styles/AccountOverviewTileSkeleton.style.native';

const AccountOverviewTileSkelton = () => {
  return (
    <SkeletonWrapperView>
      <SkeletonSpacingView>
        <LoaderSkelton width="75%" height="30" />
      </SkeletonSpacingView>
      <SkeletonSpacingView>
        <LoaderSkelton width="100%" height="100" />
      </SkeletonSpacingView>
      <View>
        <LoaderSkelton width="100%" height="30" />
      </View>
    </SkeletonWrapperView>
  );
};

export default AccountOverviewTileSkelton;
export { AccountOverviewTileSkelton as AccountOverviewTileSkeltonVanilla };
