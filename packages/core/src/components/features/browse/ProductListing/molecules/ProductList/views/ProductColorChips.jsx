/**
 * @module ProductColorChips
 *
 * @author Agu
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import { COLOR_PROP_TYPE } from '../propTypes/productsAndItemsPropTypes';

/* eslint-disable */
export class ProductColorChips extends React.Component {
  static propTypes = {
    /**
     * Callback for clicks on color chips. Accepts colorProductId, colorName.
     * Note that it is up to this callback to update the selectedColorId prop of this component.
     */
    onChipClick: PropTypes.func,
    /** the color name of the currently selected chip */
    selectedColorId: PropTypes.string.isRequired,
    /** map of available colors to render chips for */
    colorsMap: PropTypes.arrayOf(
      PropTypes.shape({
        color: COLOR_PROP_TYPE.isRequired,
        colorProductId: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  // static defaultProps = {
  //   maxVisibleItems: 6
  // }

  constructor(props) {
    super();
    this.state = {
      firstItemIndex: 0,
      activeItem: 0,
      isArrEnd: false,
    };

    this.captureContainerRef = this.captureContainerRef.bind(this);

    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
  }

  captureContainerRef(ref) {
    this.containerRef = ref;
  }

  handleNextClick() {
    const stepSize = this.props.maxVisibleItems;
    const { isPLPredesign, colorsMap } = this.props;
    const nextStartIndex = this.state.firstItemIndex + 1;
    const maxViewableIndex = isPLPredesign
      ? colorsMap.length - stepSize + 1
      : colorsMap.length - stepSize;
    const isEndBounded = nextStartIndex >= maxViewableIndex;
    let firstItemIndex = nextStartIndex;
    if (isEndBounded) {
      if (isPLPredesign) {
        firstItemIndex = 0;
      } else {
        firstItemIndex = maxViewableIndex;
      }
    }
    this.setState({
      firstItemIndex: firstItemIndex,
      isArrEnd: isEndBounded,
    });
  }

  handlePreviousClick() {
    let nextStartIndex = this.state.firstItemIndex - 1;
    let maxViewableIndex = 0;
    let isEndBounded = nextStartIndex <= maxViewableIndex;
    let firstItemIndex = isEndBounded ? maxViewableIndex : nextStartIndex;
    this.setState({ firstItemIndex: firstItemIndex });
  }

  getColors() {
    const { colorsMap, maxVisibleItems, isPLPredesign } = this.props;
    const stepSize = maxVisibleItems;
    const { isArrEnd, firstItemIndex } = this.state;

    if (isArrEnd && isPLPredesign) {
      return colorsMap.slice(0, stepSize);
    } else if (firstItemIndex + stepSize < colorsMap.length) {
      return colorsMap.slice(firstItemIndex, firstItemIndex + stepSize);
    } else {
      let sliceIni = colorsMap.length - stepSize;
      return colorsMap.slice(sliceIni > 0 ? sliceIni : 0, colorsMap.length);
    }
  }

  render() {
    const {
      onChipClick,
      selectedColorId,
      colorsMap,
      maxVisibleItems,
      showColorEvenOne,
      isPLPredesign,
    } = this.props;
    const isDisplayPrevious = isPLPredesign
      ? false
      : colorsMap.length > maxVisibleItems && this.state.firstItemIndex !== 0;
    const isDisplayNext = isPLPredesign
      ? colorsMap.length > maxVisibleItems
      : colorsMap.length > maxVisibleItems &&
        this.state.firstItemIndex + maxVisibleItems < colorsMap.length;
    if (showColorEvenOne ? colorsMap.length <= 0 : colorsMap.length <= 1) {
      return null;
    }

    return (
      <div className="color-chips-container">
        {isDisplayPrevious && (
          <button className="button-prev" title="Previous" onClick={this.handlePreviousClick} />
        )}

        <ol className="content-colors" ref={this.captureContainerRef}>
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

class ProductColorChip extends React.Component {
  constructor(props, context) {
    super(props, context);
    const {
      colorProductId,
      color: { name },
      miscInfo,
    } = this.props.colorEntry;
    this.handleClick = () =>
      !this.props.isActive && this.props.onChipClick(colorProductId, name, miscInfo);
  }

  render() {
    let {
      colorEntry: {
        color: { name, imagePath },
      },
      isActive,
    } = this.props;

    return (
      <button type="button" onClick={this.handleClick} className={isActive ? 'active' : null}>
        <img className="product-color-chip-image" src={imagePath} alt={name} />
      </button>
    );
  }
}
