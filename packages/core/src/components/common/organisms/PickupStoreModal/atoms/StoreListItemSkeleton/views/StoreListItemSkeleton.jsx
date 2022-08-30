import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../hoc/withStyles';
import style from '../StoreListItemSkeleton.style';
import { Row, Col } from '../../../../../atoms';

const StoreListItemSkeleton = ({ className, col, colSize }) => {
  return (
    <Row fullBleed className={`${className} skeleton-row`}>
      {Array.from({ length: col }).map((cItem, index) => {
        return (
          <Col key={index.toString()} colSize={colSize} className="store-tile">
            <div className="skeleton-col store-info" />
            <div className="skeleton-col store-item-detail" />
          </Col>
        );
      })}
    </Row>
  );
};

StoreListItemSkeleton.propTypes = {
  className: PropTypes.string.isRequired,
  rowProps: PropTypes.shape({}),
  colProps: PropTypes.shape({}),
  col: PropTypes.number,
  colSize: PropTypes.shape({}),
};

StoreListItemSkeleton.defaultProps = {
  rowProps: {},
  colProps: {},
  col: 1,
  colSize: { large: 12, medium: 8, small: 6 },
};

export default withStyles(StoreListItemSkeleton, style);
export { StoreListItemSkeleton as SkeletonVanilla };
