import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import style from '../Skeleton.style';
import { getIconPath } from '../../../../../utils';
import Image from '../../Image';
import { Row, Col } from '../..';

const Skeleton = ({ className, col, showArrows, colSize, removeLastMargin }) => {
  const rightCarouselPath = getIconPath('carousel-big-carrot');
  const leftCarouselPath = getIconPath('carousel-big-carrot-left');
  return (
    <Row className={`${className} skeleton-row`}>
      {Array.from({ length: col }).map((cItem, index) => {
        return (
          <Col
            key={index.toString()}
            colSize={colSize}
            className="skeleton-col"
            removeLastMargin={removeLastMargin}
          />
        );
      })}
      {showArrows && <Image src={leftCarouselPath} className="left-carousel" />}
      {showArrows && <Image src={rightCarouselPath} className="right-carousel" />}
    </Row>
  );
};

Skeleton.propTypes = {
  className: PropTypes.string.isRequired,
  rowProps: PropTypes.shape({}),
  colProps: PropTypes.shape({}),
  col: PropTypes.number,
  colSize: PropTypes.shape({}),
  showArrows: PropTypes.bool,
  removeLastMargin: PropTypes.bool,
};

Skeleton.defaultProps = {
  rowProps: {},
  colProps: {},
  col: 1,
  colSize: { large: 12, medium: 8, small: 6 },
  showArrows: false,
  removeLastMargin: false,
};

export default withStyles(Skeleton, style);
export { Skeleton as SkeletonVanilla };
