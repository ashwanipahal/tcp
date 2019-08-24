/**
 * @module ProductColorChipWrapper
 *
 * @author Agu
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import { COLOR_PROP_TYPE } from '../propTypes/productsAndItemsPropTypes';
import ProductColorChip from './ProductColorChip';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/ProductColorChipWrapper.style';

class ProductColorChipWrapper extends React.Component {
  static propTypes = {
    /**
     * Callback for clicks on color chips. Accepts colorProductId, colorName.
     * Note that it is up to this callback to update the selectedColorId prop of this component.
     */
    onChipClick: PropTypes.func.isRequired,
    /** the color name of the currently selected chip */
    selectedColorId: PropTypes.string.isRequired,
    maxVisibleItems: PropTypes.number.isRequired,
    isPLPredesign: PropTypes.bool.isRequired,
    showColorEvenOne: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    /** map of available colors to render chips for */
    colorsMap: PropTypes.arrayOf(
      PropTypes.shape({
        color: COLOR_PROP_TYPE.isRequired,
        colorProductId: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      firstItemIndex: 0,
      // activeItem: 0,
      isArrEnd: false,
    };

    this.captureContainerRef = this.captureContainerRef.bind(this);

    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
  }

  captureContainerRef = ref => {
    this.containerRef = ref;
  };

  handleNextClick = () => {
    const { isPLPredesign, colorsMap, maxVisibleItems } = this.props;
    const { firstItemIndex } = this.state;
    const stepSize = maxVisibleItems;
    const nextStartIndex = firstItemIndex + 1;
    const maxViewableIndex = isPLPredesign
      ? colorsMap.length - stepSize + 1
      : colorsMap.length - stepSize;
    const isEndBounded = nextStartIndex >= maxViewableIndex;
    let firstItemIndexVar = nextStartIndex;
    if (isEndBounded) {
      if (isPLPredesign) {
        firstItemIndexVar = 0;
      } else {
        firstItemIndexVar = maxViewableIndex;
      }
    }
    this.setState({
      firstItemIndex: firstItemIndexVar,
      isArrEnd: isEndBounded,
    });
  };

  handlePreviousClick = () => {
    const { firstItemIndex } = this.state;
    const nextStartIndex = firstItemIndex - 1;
    const maxViewableIndex = 0;
    const isEndBounded = nextStartIndex <= maxViewableIndex;
    const firstItemIndexVar = isEndBounded ? maxViewableIndex : nextStartIndex;
    this.setState({ firstItemIndex: firstItemIndexVar });
  };

  getColors = () => {
    const { colorsMap, maxVisibleItems, isPLPredesign } = this.props;
    const stepSize = maxVisibleItems;
    const { isArrEnd, firstItemIndex } = this.state;

    if (isArrEnd && isPLPredesign) {
      return colorsMap.slice(0, stepSize);
    }
    if (firstItemIndex + stepSize < colorsMap.length) {
      return colorsMap.slice(firstItemIndex, firstItemIndex + stepSize);
    }
    const sliceIni = colorsMap.length - stepSize;
    return colorsMap.slice(sliceIni > 0 ? sliceIni : 0, colorsMap.length);
  };

  render() {
    const {
      onChipClick,
      selectedColorId,
      colorsMap,
      maxVisibleItems,
      showColorEvenOne,
      isPLPredesign,
      className,
    } = this.props;
    const { firstItemIndex } = this.state;
    const isDisplayPrevious = isPLPredesign
      ? false
      : colorsMap.length > maxVisibleItems && firstItemIndex !== 0;
    const isDisplayNext = isPLPredesign
      ? colorsMap.length > maxVisibleItems
      : colorsMap.length > maxVisibleItems && firstItemIndex + maxVisibleItems < colorsMap.length;
    if (showColorEvenOne ? colorsMap.length <= 0 : colorsMap.length <= 1) {
      return null;
    }
    return (
      <div className={className}>
        {isDisplayPrevious && (
          <button className="button-prev" title="Previous" onClick={this.handlePreviousClick} />
        )}

        <ol
          className={['content-colors', isDisplayPrevious ? 'color-swatches-container' : ''].join(
            ' '
          )}
          ref={this.captureContainerRef}
        >
          {this.getColors().map(colorEntry => (
            <ProductColorChip
              key={colorEntry.colorProductId}
              colorEntry={colorEntry}
              isActive={selectedColorId === colorEntry.color.name}
              onChipClick={onChipClick}
            />
          ))}
        </ol>

        {isDisplayNext && (
          <button className="button-next" title="Next" onClick={this.handleNextClick} />
        )}
      </div>
    );
  }
}

export default withStyles(ProductColorChipWrapper, styles);
export { ProductColorChipWrapper as ProductColorChipWrapperVanilla };
