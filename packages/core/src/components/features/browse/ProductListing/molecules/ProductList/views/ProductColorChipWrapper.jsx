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
import { ProductSKUInfo } from './ProductItemComponents';

class ProductColorChipWrapper extends React.Component {
  static propTypes = {
    /**
     * Callback for clicks on color chips. Accepts colorProductId, colorName.
     * Note that it is up to this callback to update the selectedColorId prop of this component.
     */
    onChipClick: PropTypes.func,
    /** the color name of the currently selected chip */
    selectedColorId: PropTypes.string.isRequired,
    isPLPredesign: PropTypes.bool.isRequired,
    showColorEvenOne: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    skuInfo: PropTypes.shape(PropTypes.string).isRequired,
    /** map of available colors to render chips for */
    colorsMap: PropTypes.arrayOf(
      PropTypes.shape({
        color: COLOR_PROP_TYPE.isRequired,
        colorProductId: PropTypes.string.isRequired,
      })
    ),
    isFavoriteView: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    onChipClick: () => {},
    colorsMap: [],
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
    this.swipeConfig = {
      delta: 10, // min distance(px) before a swipe starts
      preventDefaultTouchmoveEvent: false, // preventDefault on touchmove, *See Details*
      trackTouch: true, // track touch input
      trackMouse: false, // track mouse input
      rotationAngle: 0,
    };
  }

  componentDidMount = () => {
    const availableNextColorArrowWidth = 19;
    const colorSwatchWidthForDesktop = 34;
    const colorSwatchWidthForTabMobile = 21;
    const defaultMaxVisibleItems = 5;
    const divWidth =
      this.containerRef && this.containerRef.clientWidth - availableNextColorArrowWidth;
    const colorSwatchWidth =
      window.screen.width >= breakpoints.values.lg
        ? colorSwatchWidthForDesktop
        : colorSwatchWidthForTabMobile;
    this.setState({
      maxVisibleItems: Math.round(divWidth / colorSwatchWidth) || defaultMaxVisibleItems,
    });
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
    const { onChipClick, selectedColorId, skuInfo, isFavoriteView } = this.props;
    if (isFavoriteView) {
      return (
        <ProductColorChip
          key={selectedColorId}
          colorEntry={skuInfo}
          isActive
          onChipClick={onChipClick}
          skuInfo={skuInfo}
        />
      );
    }
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
    const { colorsMap, showColorEvenOne, className, isFavoriteView, skuInfo } = this.props;
    const { maxVisibleItems } = this.state;
    const isDisplayNext = colorsMap.length > maxVisibleItems;

    if (!isFavoriteView && (showColorEvenOne ? colorsMap.length <= 0 : colorsMap.length <= 1)) {
      return null;
    }

    const arrowLeft = getIconPath('icon-carrot-black-small');

    return (
      <div ref={this.captureContainerRef} className={className}>
        <ol className="content-colors">
          <Swipeable
            {...this.swipeConfig}
            className="color-swatches-mobile-view"
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
        {skuInfo && <ProductSKUInfo {...skuInfo} />}
      </div>
    );
  }
}

export default withStyles(ProductColorChipWrapper, styles);
export { ProductColorChipWrapper as ProductColorChipWrapperVanilla };
