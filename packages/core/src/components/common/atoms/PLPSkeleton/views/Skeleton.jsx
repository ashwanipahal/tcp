import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import style from '../Skeleton.style';
import { Row, Col } from '../..';

const Skeleton = ({ className, col, colSize }) => {
  return (
    <Row fullBleed className={`${className} skeleton-row`}>
      {Array.from({ length: col }).map((cItem, index) => {
        return (
          <Col key={index.toString()} colSize={colSize} className="product-tile">
            <div className="skeleton-col skeleton-img" />
            <div className="skeleton-col skeleton-badge" />
            <div className="skeleton-col skeleton-title" />
            <div className="skeleton-col skeleton-swatches" />
            <div className="skeleton-col skeleton-add-to-bag" />
          </Col>
        );
      })}
    </Row>
  );
};

Skeleton.propTypes = {
  className: PropTypes.string.isRequired,
  rowProps: PropTypes.shape({}),
  colProps: PropTypes.shape({}),
  col: PropTypes.number,
  colSize: PropTypes.shape({}),
};

Skeleton.defaultProps = {
  rowProps: {},
  colProps: {},
  col: 1,
  colSize: { large: 12, medium: 8, small: 6 },
};

export default withStyles(Skeleton, style);
export { Skeleton as SkeletonVanilla };
