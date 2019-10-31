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
} from '../Skeleton.native.style';

const SkeletonView = () => {
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

const Skeleton = ({ col }) => {
  return (
    <ScrollView>
      <Row>
        {Array.from({ length: col }).map((cItem, index) => {
          return <SkeletonView key={index.toString()} />;
        })}
      </Row>
    </ScrollView>
  );
};

Skeleton.propTypes = {
  col: PropTypes.number,
};

Skeleton.defaultProps = {
  col: 1,
};

export default Skeleton;
