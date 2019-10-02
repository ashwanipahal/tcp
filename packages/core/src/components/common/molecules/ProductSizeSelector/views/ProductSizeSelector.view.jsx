/** @module ProductSizeSelector
 * @summary renders either a LabeledSelect or a LabeledRadioButtonGroup with radio buttons looking like chips to select the
 * size for a product.
 *
 * Any extra props other than <code>sizesMap, isRenderChips, isShowZeroInventoryEntries, className</code>),
 * e.g., <code>title, disabled</code>, passed to this component will be passed along to the rendered <code>LabeledRadioButtonGroup</code>
 * or <code>LabeledSelect</code> element.
 *
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import LabeledRadioButtonGroup from '../../LabeledRadioButtonGroup';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/ProductSizeSelector.style';

const getSizesOptionsMap = (
  sizesMap,
  isShowZeroInventoryEntries,
  isDisableZeroInventoryEntries,
  isRenderChips
) => {
  if (isRenderChips) {
    return sizesMap.map(sizeEntry => ({
      value: sizeEntry.get('displayName'),
      title: sizeEntry.get('displayName'),
      content: <span>{sizeEntry.get('displayName')}</span>,
      disabled: isDisableZeroInventoryEntries && sizeEntry.get('maxAvailable') <= 0,
    }));
  }
  return null;
};

class ProductSizeSelector extends React.PureComponent<Props> {
  static propTypes = {
    /** the sizes to chose from */
    sizesMap: PropTypes.arrayOf(
      PropTypes.shape({
        sizeName: PropTypes.string.isRequire,
        maxAvailable: PropTypes.number.isRequired, // the maximum value of any nested maxAvailable value
      })
    ).isRequired,

    /** flags to render a LabeledRadioButtonGroup displaying chips instead of a LabeledSelect for size selection */
    isRenderChips: PropTypes.bool,

    /** flags if to show sizes with zero inventory */
    isShowZeroInventoryEntries: PropTypes.bool,

    /** flags if to disable sizes with zero inventory. Defaults to true. */
    isDisableZeroInventoryEntries: PropTypes.bool,

    title: PropTypes.string,
  };

  static defaultProps = {
    title: 'Size: ',
    isDisableZeroInventoryEntries: true,
    isShowZeroInventoryEntries: true,
    isRenderChips: true,
  };

  render() {
    const {
      sizesMap,
      isRenderChips,
      isShowZeroInventoryEntries,
      isDisableZeroInventoryEntries,
      className,
      ...otherProps
    } = this.props;

    const optionsMap =
      sizesMap &&
      getSizesOptionsMap(
        sizesMap,
        isShowZeroInventoryEntries,
        isDisableZeroInventoryEntries,
        isRenderChips
      );

    return (
      sizesMap && (
        <>
          <LabeledRadioButtonGroup
            className={`${className} size-and-fit-detail`}
            optionsMap={optionsMap}
            {...otherProps}
          />
          <RenderPerf.Measure name="render_product_sizes" />
        </>
      )
    );
  }
}

export default withStyles(ProductSizeSelector, styles);
