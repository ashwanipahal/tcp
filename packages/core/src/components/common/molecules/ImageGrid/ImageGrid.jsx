// @flow
import React from 'react';
import withStyles from '../../hoc/withStyles';
import { Image, Row, Col } from '../../atoms';
import style from './ImageGrid.style';

type Props = {
  mediaList: Object[],
  colD?: String,
  colT?: String,
  colM?: String,
  className: String,
  dataLocator?: String,
};

/**
 * Array reducer which reduces array of media into sets of defined limit as per desktop
 * @param {*} accumulator Accumulator object passed to store the value throughout the operation
 * @param {*} currentValue Current value of the array in process
 * @param {*} currentIndex Current Index of the array in process
 * @param {*} list Array in process
 */
const gridReducer = (accumulator, currentValue, currentIndex, list) => {
  const { final, limit } = accumulator;
  if (currentIndex > 0 && currentIndex % limit === 0) {
    final.push(accumulator.current);
    accumulator.resetCurrent();
  }
  accumulator.current.push(currentValue);
  if (list.length === currentIndex + 1) {
    final.push(accumulator.current);
  }
  return accumulator;
};

/**
 * This component produces an Image grid with specified col length for respective viewport.
 * It first reduces the array to appropriate format and then utilise
 * requires mediaList prop
 * defaultParams {
 *  colD: 4,
 *  colT: 4,
 *  colM: 2
 * }
 * @param {*} props
 */
const ImageGrid = (props: Props) => {
  const { mediaList, colD, colT, colM, className, dataLocator } = props;

  const colSize = {
    small: 6 / colM,
    medium: 8 / colT,
    large: 12 / colD,
  };

  // Accumulator object passed to store the value in reducer function
  const gridCoordinator = {
    final: [],
    current: [],
    limit: colD,
    resetCurrent: () => {
      gridCoordinator.current = [];
    },
  };

  return (
    <div>
      {mediaList.reduce(gridReducer, gridCoordinator).final.map(medList => (
        <Row
          fullBlead={{
            small: false,
            medium: false,
            large: true,
          }}
          className={className}
        >
          {medList.map((mediaProps, index) => {
            return (
              <Col colSize={colSize} className="image-col">
                <Image {...mediaProps} data-locator={`${dataLocator}${index}`} />
              </Col>
            );
          })}
        </Row>
      ))}
    </div>
  );
};

ImageGrid.defaultProps = {
  colD: 4,
  colT: 4,
  colM: 2,
  dataLocator: '',
};

export default withStyles(ImageGrid, style);
