import React from 'react';
import { PropTypes } from 'prop-types';

const getColorsChipsOptionsMap = (colorFitsSizesMapArg, isShowZeroInventoryEntries) => {
  let colorFitsSizesMap = colorFitsSizesMapArg;
  if (!isShowZeroInventoryEntries) {
    colorFitsSizesMap = colorFitsSizesMap.filter(colorEntry => colorEntry.get('maxAvailable') > 0);
  }
  return colorFitsSizesMap.map(colorEntry => {
    const name = colorEntry.getIn(['color', 'name']);
    const imagePath = colorEntry.getIn(['color', 'imagePath']);
    return (
      <span className="color-title-container" title={name}>
        <img className="color-image" src={imagePath} alt="color" />
      </span>
    );
  });
};

const ProductColorChipsSelector = props => {
  const {
    options: colorFitsSizesMap,
    className, // eslint-disable-line no-unused-vars
  } = props;

  return getColorsChipsOptionsMap(
    colorFitsSizesMap /* , isShowZeroInventoryEntries, isDisableZeroInventoryEntries */
  );
};

ProductColorChipsSelector.propTypes = {
  colorFitsSizesMap: PropTypes.shape({}).isRequired,
  isShowZeroInventoryEntries: PropTypes.bool,
  isDisableZeroInventoryEntries: PropTypes.bool,
  className: PropTypes.string,
};

ProductColorChipsSelector.defaultProps = {
  isShowZeroInventoryEntries: false,
  isDisableZeroInventoryEntries: false,
  className: '',
};

export default ProductColorChipsSelector;
