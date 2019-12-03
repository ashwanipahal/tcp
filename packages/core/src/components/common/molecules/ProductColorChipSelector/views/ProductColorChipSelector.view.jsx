/** @module ProductColorChipsSelector
 * @summary renders a LabeledRadioButtonGroup with radio buttons looking like images to select the
 * color for a product.
 *
 * Any extra props other than <code>colorFitsSizesMap, isShowZeroInventoryEntries, className</code>),
 * e.g., <code>title, disabled</code>, passed to this component will be passed along to the rendered <code>LabeledRadioButtonGroup</code> element.
 *
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import DamImage from '../../../atoms/DamImage';
import withStyles from '../../../hoc/withStyles';
import LabeledRadioButtonGroup from '../../LabeledRadioButtonGroup';
import styles from '../styles/ProductColorChipSelector.style';

const getColorsChipsOptionsMap = (
  colorFitsSizesMap,
  isShowZeroInventoryEntries,
  isDisableZeroInventoryEntries,
  isGiftCard
) => {
  return (
    colorFitsSizesMap &&
    colorFitsSizesMap.map(colorEntry => {
      const color = colorEntry && colorEntry.get('color');
      const name = color && color.get('name');
      const swatchImagePath = color && color.get('swatchImage');
      const swatchImageUrl = swatchImagePath && swatchImagePath.split('_');
      let imgUrl = swatchImageUrl
        ? `${swatchImageUrl[0]}/${swatchImageUrl[0]}_${swatchImageUrl[1]}`
        : '';
      let imgConfig = 'w_50,h_50,c_thumb,g_auto:0';
      if (isGiftCard && color && color.get('imagePath')) {
        imgUrl = color.get('imagePath');
        imgConfig = 'w_125';
      }
      const imgData = {
        alt: '',
        url: imgUrl,
      };

      const imgDataConfig = [`${imgConfig}`, `${imgConfig}`, `${imgConfig}`];
      return {
        value: name,
        title: name,
        content: (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          <span className="color-title-container" title={name} tabIndex="0">
            <span className="color-name">{name}</span>
            <DamImage
              className="color-image"
              imgData={imgData}
              isProductImage
              imgConfigs={imgDataConfig}
            />
          </span>
        ),
        disabled: isDisableZeroInventoryEntries && colorEntry.maxAvailable <= 0,
      };
    })
  );
};

class ProductColorChipsSelector extends React.PureComponent<Props> {
  static propTypes = {
    /**
     * The available color fit and size options for the product to select a color for
     * Organized in a three level nesting (similar to a site navigation) with L1 being the color,
     * L2 being the fit, and L3 being the size
     */
    // colorFitsSizesMap: COLOR_FITS_SIZES_MAP_PROP_TYPE.isRequired,

    /** flags if to show colors with zero inventory in all fits and sizes */
    isShowZeroInventoryEntries: PropTypes.bool,

    /** flags if to disable sizes with zero inventory. Defaults to true. */
    isDisableZeroInventoryEntries: PropTypes.bool,

    title: PropTypes.string,
  };

  static defaultProps = {
    title: 'COLOR: ',
    isShowZeroInventoryEntries: true,
    isDisableZeroInventoryEntries: true,
  };

  render() {
    const {
      colorFitsSizesMap,
      isShowZeroInventoryEntries,
      isDisableZeroInventoryEntries,
      className, // eslint-disable-line no-unused-vars
      isGiftCard,
      ...otherProps
    } = this.props;
    const optionsMap = getColorsChipsOptionsMap(
      colorFitsSizesMap,
      isShowZeroInventoryEntries,
      isDisableZeroInventoryEntries,
      isGiftCard
    );
    return (
      <LabeledRadioButtonGroup
        className={`${className} color-chips-selector`}
        optionsMap={optionsMap}
        colorSelector
        {...otherProps}
      />
    );
  }
}

export default withStyles(ProductColorChipsSelector, styles);
