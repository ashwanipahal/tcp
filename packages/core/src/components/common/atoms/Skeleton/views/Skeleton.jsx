import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import style, { Row, Col } from '../Skeleton.style';
import { getIconPath, viewport } from '../../../../../utils';
import Image from '../../Image';

export class Skeleton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { colCount: props.col.s };
  }

  componentDidMount() {
    const viewPort = viewport();
    const { col } = this.props;
    let colCount = col.s;
    if (viewPort.medium) {
      colCount = col.m;
    } else if (viewPort.large) {
      colCount = col.l;
    }
    this.setState({
      colCount,
    });
  }

  render() {
    const { row, rowProps, colProps, className, showArrows } = this.props;
    const { colCount } = this.state;
    const rightCarouselPath = getIconPath('carousel-big-carrot');
    const leftCarouselPath = getIconPath('carousel-big-carrot-left');
    return (
      <div className={className}>
        {Array.from({ length: row }).map((rItem, rIndex) => {
          return (
            <Row key={rIndex.toString()} rowProps={rowProps} className="skeleton-row">
              {Array.from({ length: colCount }).map((cItem, index) => {
                return <Col key={index.toString()} colProps={colProps} className="skeleton-col" />;
              })}
            </Row>
          );
        })}
        {showArrows && <Image src={leftCarouselPath} className="left-carousel" />}
        {showArrows && <Image src={rightCarouselPath} className="right-carousel" />}
      </div>
    );
  }
}

Skeleton.propTypes = {
  className: PropTypes.string.isRequired,
  rowProps: PropTypes.shape({}),
  colProps: PropTypes.shape({}),
  row: PropTypes.number,
  col: PropTypes.number,
  showArrows: PropTypes.bool,
};

Skeleton.defaultProps = {
  rowProps: {},
  colProps: {},
  row: 1,
  col: { s: 1, m: 1, l: 1 },
  showArrows: false,
};

export default withStyles(Skeleton, style);
export { Skeleton as SkeletonVanilla };
