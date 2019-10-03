import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Grid from '../../Grid';
import { Button, BodyCopy } from '../../../atoms';
import { BUTTON_VARIATION } from '../../../atoms/Button/Button.constants';
import withStyles from '../../../hoc/withStyles';
import styles, { SelectedValueContainer } from '../styles/ProductVariantSelector.style.native';
import ErrorDisplay from '../../../atoms/ErrorDisplay';

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
  renderGridItem = ({ item }) => {
    const { selectedItem, selectItem, itemNameKey } = this.props;
    const itemValue = item[itemNameKey];
    const isSelected = (selectedItem && item[itemNameKey] === selectedItem) || false;
    const { disabled } = item;
    return (
      <Button
        buttonVariation={BUTTON_VARIATION.mobileAppFilter}
        text={itemValue.toUpperCase()}
        onPress={() => selectItem(item[itemNameKey])}
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

  render() {
    const {
      title,
      itemValue,
      data,
      renderItem,
      keyExtractor,
      selectedItem,
      componentWidth,
      separatorWidth,
      error,
      locators,
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
          renderItem={renderItem || this.renderGridItem}
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
  renderItem: PropTypes.func,
  data: PropTypes.arrayOf(Object),
  keyExtractor: PropTypes.func,
  selectedItem: PropTypes.string,
  componentWidth: PropTypes.number,
  separatorWidth: PropTypes.number,
  selectItem: PropTypes.func,
  itemNameKey: PropTypes.string,
  error: PropTypes.string,
  locators: PropTypes.instanceOf(Object),
};

ProductVariantSelector.defaultProps = {
  itemValue: '',
  renderItem: null,
  data: [],
  keyExtractor: null,
  selectedItem: null,
  componentWidth: 80,
  separatorWidth: 8,
  selectItem: null,
  itemNameKey: '',
  error: null,
  locators: null,
};

/* export class with styles */
export default withStyles(ProductVariantSelector, styles);

export { ProductVariantSelector as ProductVariantSelectorVanilla };
