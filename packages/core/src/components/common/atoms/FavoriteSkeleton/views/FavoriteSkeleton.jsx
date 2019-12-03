import React from 'react';
import { PropTypes } from 'prop-types';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import withStyles from '../../../hoc/withStyles';
import PLPSkeleton from '../../PLPSkeleton';
import style from '../FavoriteSkeleton.style';

const FavoriteSkeleton = ({ className, col }) => {
  return (
    <>
      <div className={className}>
        <div className="skeleton-wishListName">
          <LoaderSkelton width="130px" height="40px" />
        </div>
        <div className="skeleton-displayFilter">
          <LoaderSkelton width="130px" height="40px" />
        </div>
        <div className="skeleton-sortFilter">
          <LoaderSkelton width="130px" height="40px" />
        </div>
      </div>
      <PLPSkeleton col={col} />
    </>
  );
};

FavoriteSkeleton.propTypes = {
  className: PropTypes.string.isRequired,
  col: PropTypes.number,
};

FavoriteSkeleton.defaultProps = {
  col: 1,
};

export default withStyles(FavoriteSkeleton, style);
export { FavoriteSkeleton as FavoriteSkeletonVanilla };
