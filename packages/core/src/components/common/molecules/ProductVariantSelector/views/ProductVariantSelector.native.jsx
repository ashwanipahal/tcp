import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Grid from '../../Grid';
import { Button, BodyCopy } from '../../../atoms';
import { BUTTON_VARIATION } from '../../../atoms/Button/Button.constants';
import withStyles from '../../../hoc/withStyles';
import styles, { SelectedValueContainer } from '../styles/ProductVariantSelector.style.native';
import ErrorDisplay from '../../../atoms/ErrorDisplay';
import LinkImageIcon from '../../../../features/browse/ProductListing/atoms/LinkImageIcon';

/**
 * This class returns Product variant selector for Product Add To Bag Page
 * First item is Key: Value pair for Item type and its selected value
 * Second item is the Grid of possible values
 *
 * @class ProductVariantSelector
 * @extends {React.PureComponent}
 */
class ProductVariantSelector extends React.PureComponent {
  /**
   * @function renderGridItem
   * @returns default grid item in flatlist with a button with selection capability
   *
   * @memberof ProductVariantSelector
   */

  constructor(props) {
    super(props);
    this.renderGridItem = this.renderGridItem.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  setValue(value) {
    const { input } = this.props;
    if (input && input.value.name !== value.name && input.onChange) {
      // if the value to select is not the current value of this component
      // notify our listeners that the user wants the value of this component to change
      input.onChange(value);
    }
  }

  renderColor = ({ item }) => {
    const {
      color: { imagePath, name },
    } = item;
    const { selectedColor, selectColor, isGiftCard } = this.props;
    const isSelected = (selectedColor && name === selectedColor.name) || false;
    const borderWidth = 2;
    const componentWidth = isGiftCard ? 103 : 30;
    const componentHeight = isGiftCard ? 128 : 30;
    const imageWidth = isSelected ? componentWidth - borderWidth : componentWidth;
    const imageHeight = isSelected ? componentHeight - borderWidth : componentHeight;
    return (
      <LinkImageIcon
        uri={imagePath}
        selected={isSelected}
        onPress={() => {
          const value = {
            name,
          };
          this.handleItemChange(value);
          selectColor(name);
        }}
        width={componentWidth}
        height={componentHeight}
        borderRadius={!isGiftCard ? 15 : 0}
        borderWidth={borderWidth}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
      />
    );
  };

  renderGridItem = ({ item }) => {
    const { selectedItem, selectItem, itemNameKey } = this.props;
    const itemValue = item[itemNameKey];
    const isSelected = (selectedItem && item[itemNameKey] === selectedItem) || false;
    const { disabled } = item;

    return (
      <Button
        buttonVariation={BUTTON_VARIATION.mobileAppFilter}
        text={itemValue.toUpperCase()}
        onPress={() => {
          const value = {
            name: item[itemNameKey],
          };
          this.handleItemChange(value);
          selectItem(item[itemNameKey]);
        }}
        selected={!disabled && isSelected}
        data-locator=""
        accessibilityLabel={itemValue}
        disableButton={disabled}
      />
    );
  };

  checkIfSelectedItemIsAvaiableInData = () => {
    const { data, itemNameKey, selectedItem } = this.props;
    if (!itemNameKey) return true;
    return data && data.filter(item => item[itemNameKey] === selectedItem).length > 0;
  };

  handleItemChange(value) {
    this.setValue(value);
  }

  render() {
    const {
      title,
      itemValue,
      data,
      keyExtractor,
      selectedItem,
      componentWidth,
      separatorWidth,
      error,
      locators,
      renderColorItem,
    } = this.props;

    const { key, value } = locators || {};
    const isItemAvailable = this.checkIfSelectedItemIsAvaiableInData();
    const titleValue = isItemAvailable ? `${title}: ` : title;
    if (!data || data.length === 0) return null;

    return (
      <View {...this.props}>
        <SelectedValueContainer>
          <BodyCopy
            fontWeight="black"
            color="gray.900"
            mobileFontFamily="secondary"
            fontSize="fs14"
            text={titleValue.toUpperCase()}
            dataLocator={key}
          />
          {isItemAvailable ? (
            <BodyCopy
              fontWeight="regular"
              color="gray.900"
              mobileFontFamily="secondary"
              fontSize="fs14"
              text={itemValue.toUpperCase()}
              dataLocator={value}
            />
          ) : null}
        </SelectedValueContainer>
        <Grid
          name={title}
          data={data}
          renderItem={renderColorItem ? this.renderColor : this.renderGridItem}
          keyExtractor={keyExtractor}
          extraData={selectedItem}
          componentWidth={componentWidth}
          separatorWidth={separatorWidth}
        />
        <ErrorDisplay error={error} />
      </View>
    );
  }
}

/* PropTypes declaration */
ProductVariantSelector.propTypes = {
  title: PropTypes.string.isRequired,
  itemValue: PropTypes.string,
  data: PropTypes.arrayOf(Object),
  keyExtractor: PropTypes.func,
  selectColor: PropTypes.func,
  selectedItem: PropTypes.string,
  componentWidth: PropTypes.number,
  separatorWidth: PropTypes.number,
  selectItem: PropTypes.func,
  itemNameKey: PropTypes.string,
  selectedColor: PropTypes.string,
  error: PropTypes.string,
  locators: PropTypes.instanceOf(Object),
  input: PropTypes.instanceOf(Object),
  renderColorItem: PropTypes.bool,
  isGiftCard: PropTypes.bool,
};

ProductVariantSelector.defaultProps = {
  itemValue: '',
  data: [],
  keyExtractor: null,
  selectedItem: null,
  componentWidth: 80,
  separatorWidth: 8,
  selectItem: null,
  itemNameKey: '',
  error: null,
  locators: null,
  input: null,
  selectedColor: '',
  selectColor: null,
  renderColorItem: false,
  isGiftCard: false,
};

/* export class with styles */
export default withStyles(ProductVariantSelector, styles);

export { ProductVariantSelector as ProductVariantSelectorVanilla };
