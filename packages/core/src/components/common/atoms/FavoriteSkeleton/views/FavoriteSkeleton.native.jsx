import React from 'react';
import { PropTypes } from 'prop-types';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import { ViewWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import PLPSkeleton from '../../PLPSkeleton';
import FavoriteListFilterWrapper from '../FavoriteSkeleton.style.native';

const FavoriteSkeleton = ({ col }) => {
  return (
    <>
      <FavoriteListFilterWrapper>
        <ViewWithSpacing spacingStyles="margin-bottom-MED">
          <LoaderSkelton width="130px" height="40px" />
        </ViewWithSpacing>
        <ViewWithSpacing spacingStyles="margin-bottom-MED">
          <LoaderSkelton width="130px" height="40px" />
        </ViewWithSpacing>
        <ViewWithSpacing spacingStyles="margin-bottom-MED">
          <LoaderSkelton width="130px" height="40px" />
        </ViewWithSpacing>
      </FavoriteListFilterWrapper>
      <PLPSkeleton col={col} />
    </>
  );
};

FavoriteSkeleton.propTypes = {
  col: PropTypes.number,
};

FavoriteSkeleton.defaultProps = {
  col: 1,
};

export default FavoriteSkeleton;
