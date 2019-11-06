import React from 'react';
import { ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import {
  SkeletonWrapper,
  SkeletonImage,
  SkeletonBadge,
  SkeletonSwatches,
  SkeletonTitle,
  SkeletonAddToBag,
  Row,
} from '../PLPSkeleton.native.style';

const PLPSkeletonView = () => {
  return (
    <SkeletonWrapper>
      <SkeletonImage />
      <SkeletonBadge />
      <SkeletonTitle />
      <SkeletonSwatches />
      <SkeletonAddToBag />
    </SkeletonWrapper>
  );
};

const PLPSkeleton = ({ col }) => {
  return (
    <ScrollView>
      <Row>
        {Array.from({ length: col }).map((cItem, index) => {
          return <PLPSkeletonView key={index.toString()} />;
        })}
      </Row>
    </ScrollView>
  );
};

PLPSkeleton.propTypes = {
  col: PropTypes.number,
};

PLPSkeleton.defaultProps = {
  col: 1,
};

export default PLPSkeleton;
