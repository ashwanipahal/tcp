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
          <LoaderSkelton width="100%" height="40px" />
        </ViewWithSpacing>
        <ViewWithSpacing spacingStyles="margin-bottom-MED">
          <LoaderSkelton width="100%" height="40px" />
        </ViewWithSpacing>
        <ViewWithSpacing spacingStyles="margin-bottom-MED">
          <LoaderSkelton width="100%" height="40px" />
        </ViewWithSpacing>

        <PLPSkeleton col={col} />
      </FavoriteListFilterWrapper>
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
