import React from 'react';
import { View } from 'react-native';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import {
  InnerTileWrapper,
  FirstInnerTileWrapper,
  TilesWrapper,
} from '../styles/ExtraPointsSkeleton.style.native';

const ExtraPointsSkeleton = () => {
  const defaultHeight = '280px';
  return (
    <View>
      <FirstInnerTileWrapper>
        <LoaderSkelton height={defaultHeight} />
      </FirstInnerTileWrapper>
      <TilesWrapper>
        <InnerTileWrapper>
          <LoaderSkelton height={defaultHeight} />
        </InnerTileWrapper>
        <InnerTileWrapper>
          <LoaderSkelton height={defaultHeight} />
        </InnerTileWrapper>
      </TilesWrapper>
    </View>
  );
};

export default ExtraPointsSkeleton;
