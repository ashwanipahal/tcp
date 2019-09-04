/**
 * @module ProductColorChipWrapper
 *
 * @author Agu
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Swipeable } from 'react-swipeable';
import { getIconPath } from '../../../../../../../utils';
import { breakpoints } from '../../../../../../../../styles/themes/TCP/mediaQuery';
import { COLOR_PROP_TYPE } from '../propTypes/productsAndItemsPropTypes';
import ProductColorChip from './ProductColorChip';
import withStyles from '../../../../../../common/hoc/withStyles';
import { BodyCopy } from '../../../../../../common/atoms';
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
      maxVisibleItems: 5,
    };

    this.captureContainerRef = this.captureContainerRef.bind(this);

    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.swipeConfig = {
      delta: 10, // min distance(px) before a swipe starts
      preventDefaultTouchmoveEvent: false, // preventDefault on touchmove, *See Details*
      trackTouch: true, // track touch input
      trackMouse: false, // track mouse input
      rotationAngle: 0,
    };
  }

  componentDidMount = () => {
    const divWidth = this.containerRef && this.containerRef.clientWidth - 38;
    const colorSwatchWidth = window.screen.width >= breakpoints.values.lg ? 34 : 21;
    this.setState({ maxVisibleItems: Math.floor(divWidth / colorSwatchWidth) || 5 });
  };

  captureContainerRef = ref => {
    this.containerRef = ref;
  };

  handleNextClick = () => {
    const { isPLPredesign, colorsMap } = this.props;
    const { maxVisibleItems, firstItemIndex } = this.state;
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
    const { colorsMap, isPLPredesign } = this.props;
    const { maxVisibleItems } = this.state;
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

  getColorSwatches = () => {
    const { onChipClick, selectedColorId } = this.props;
    return this.getColors().map(colorEntry => (
      <ProductColorChip
        key={colorEntry.colorProductId}
        colorEntry={colorEntry}
        isActive={selectedColorId === colorEntry.color.name}
        onChipClick={onChipClick}
      />
    ));
  };

  render() {
    const { colorsMap, showColorEvenOne, isPLPredesign, className } = this.props;
    const { maxVisibleItems, firstItemIndex } = this.state;
    const isDisplayPrevious = isPLPredesign
      ? false
      : colorsMap.length > maxVisibleItems && firstItemIndex !== 0;
    const isDisplayNext = isPLPredesign
      ? colorsMap.length > maxVisibleItems
      : colorsMap.length > maxVisibleItems && firstItemIndex + maxVisibleItems < colorsMap.length;
    if (showColorEvenOne ? colorsMap.length <= 0 : colorsMap.length <= 1) {
      return null;
    }

    const arrowLeft = getIconPath('icon-carrot-black-small');

    return (
      <div ref={this.captureContainerRef} className={className}>
        {isDisplayPrevious && (
          <BodyCopy
            component="div"
            onClick={this.handlePreviousClick}
            role="button"
            title="Previous"
            className="arrowLeftWrapper"
            data-locator="color_swatch_arrow"
          >
            <img
              data-locator="color_swatch_arrow"
              src={arrowLeft}
              alt="left-arrow"
              className="arrowImg"
            />
          </BodyCopy>
        )}

        <ol
          className={['content-colors', isDisplayPrevious ? 'color-swatches-container' : ''].join(
            ' '
          )}
        >
          <Swipeable
            {...this.swipeConfig}
            className="color-swatches-mobile-view"
            onSwipedRight={this.handlePreviousClick}
            onSwipedLeft={this.handleNextClick}
          >
            {this.getColorSwatches()}
          </Swipeable>
          <div className="color-swatches-desktop-view">{this.getColorSwatches()}</div>
        </ol>

        {isDisplayNext && (
          <BodyCopy
            component="div"
            title="Next"
            role="button"
            onClick={this.handleNextClick}
            className="arrowRightWrapper"
          >
            <img
              src={arrowLeft}
              data-locator="color_swatch_arrow"
              alt="right-arrow"
              className="arrowImg"
            />
          </BodyCopy>
        )}
      </div>
    );
  }
}

export default withStyles(ProductColorChipWrapper, styles);
export { ProductColorChipWrapper as ProductColorChipWrapperVanilla };
