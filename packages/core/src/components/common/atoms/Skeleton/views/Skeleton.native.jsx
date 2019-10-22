import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import { Row, Col } from '../Skeleton.native.style';

// To render the loader or skeleton
const Skeleton = ({ row, col, width, height, rowProps, colProps, ...otherprops }) => {
  return (
    <View>
      {Array.from({ length: row }).map((rItem, rIndex) => {
        return (
          <Row key={rIndex.toString()} rowProps={rowProps}>
            {Array.from({ length: col }).map((cItem, index) => {
              return <Col key={index.toString()} width={width} height={height} {...otherprops} />;
            })}
          </Row>
        );
      })}
    </View>
  );
};

Skeleton.propTypes = {
  rowProps: PropTypes.shape({}),
  colProps: PropTypes.shape({}),
  row: PropTypes.number,
  col: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  otherprops: PropTypes.shape({}),
};

Skeleton.defaultProps = {
  rowProps: {},
  colProps: {},
  width: 100,
  height: 150,
  row: 1,
  col: 1,
  otherprops: {},
};

export default Skeleton;
export { Skeleton as SkeletonVanilla };
