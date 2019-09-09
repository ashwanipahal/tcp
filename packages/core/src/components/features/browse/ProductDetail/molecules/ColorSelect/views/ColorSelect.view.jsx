/* eslint-disable */
import React from 'react';
import { PropTypes } from 'prop-types';

const getColorsChipsOptionsMap = (
  colorFitsSizesMapArg,
  isShowZeroInventoryEntries,
  isDisableZeroInventoryEntries
) => {
  let colorFitsSizesMap = colorFitsSizesMapArg;
  if (!isShowZeroInventoryEntries) {
    colorFitsSizesMap = colorFitsSizesMap.filter(colorEntry => colorEntry.get('maxAvailable') > 0);
  }
  console.log('colorFitsSizesMap', colorFitsSizesMap);
  return colorFitsSizesMap.map(colorEntry => {
    const name = colorEntry.getIn(['color', 'name']);
    const imagePath = colorEntry.getIn(['color', 'imagePath']);
    // return {
    //   value: name,
    //   title: name,
    //   content: (
    //     <span className="color-title-container" title={name}>
    //       <span className="color-name">{name}</span>
    //       <img className="color-image" src={imagePath} alt='color' />
    //     </span>
    //   ),
    //   disabled: isDisableZeroInventoryEntries && colorEntry.maxAvailable <= 0
    // };
    return (
      // <LabeledRadioButton className="color-chips-selector">
      //   <img className="color-image" src={imagePath} alt="color" />
      // </LabeledRadioButton>
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
    ...otherProps
  } = props;

  const optionsMap = getColorsChipsOptionsMap(
    colorFitsSizesMap /* , isShowZeroInventoryEntries, isDisableZeroInventoryEntries */
  );

  return optionsMap;
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
