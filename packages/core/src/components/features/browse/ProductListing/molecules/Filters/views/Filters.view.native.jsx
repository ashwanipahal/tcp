import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components/native';
import { Button } from '@tcp/core/src/components/common/atoms';
import { BUTTON_VARIATION } from '@tcp/core/src/components/common/atoms/Button';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import {
  styles,
  PageContainer,
  Container,
  getFlatListContainerStyle,
  ItemSeparatorStyle,
  TitleText,
  ApplyAndClearButtonContainer,
} from '../Filters.style.native';
import LinkImageIcon from '../../../atoms/LinkImageIcon';

class Filters extends React.PureComponent {
  static propTypes = {
    filters: PropTypes.shape({}),
    theme: PropTypes.shape({}),
    labelsFilter: PropTypes.shape({}),
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    filters: {},
    theme: {},
    labelsFilter: {},
    onSubmit: null,
  };

  filterNames = [];

  constructor(props) {
    super(props);
    const { filters } = this.props;
    const { unbxdDisplayName } = filters;
    this.filterNames = (unbxdDisplayName && Object.entries(unbxdDisplayName)) || [];
    this.state = { selectedItems: [] };
  }

  /**
   * @desc This is seperator method which used for making gap between color switches
   */
  renderSeparator = () => {
    return <ItemSeparatorStyle />;
  };

  /**
   * @function onSelectFilter
   * This method is called on tap of an item in filter list
   * toggles isSelected property of selected item and saves or removes it from selectedItems in state
   *
   * @memberof Filters
   */
  onSelectFilter = item => {
    const updatedItem = item;
    updatedItem.isSelected = !updatedItem.isSelected;
    const { selectedItems } = this.state;
    const selectedItemsList = updatedItem.isSelected
      ? [...selectedItems, updatedItem]
      : selectedItems.filter(i => i !== updatedItem);
    this.setState({ selectedItems: selectedItemsList });
  };

  renderListItem = ({ item }) => {
    const { displayName, isSelected } = item;
    return (
      <Button
        buttonVariation={BUTTON_VARIATION.mobileAppFilter}
        text={displayName}
        onPress={() => this.onSelectFilter(item)}
        selected={isSelected}
        data-locator=""
        accessibilityLabel={displayName}
      />
    );
  };

  renderColorSwitchItem = ({ item }) => {
    const { imagePath, isSelected } = item;
    return (
      <LinkImageIcon
        uri={imagePath}
        selected={isSelected}
        onPress={() => this.onSelectFilter(item)}
      />
    );
  };

  /**
   * @function onClearAll
   * This method clears selected items list and sets isSelected as false for all selected items
   *
   * @memberof Filters
   */
  onClearAll = () => {
    this.clearAllFilters();

    // Call onSubmit with empty filter list
    const { onSubmit } = this.props;
    if (onSubmit) onSubmit({});
  };

  clearAllFilters = () => {
    const { selectedItems } = this.state;
    selectedItems.forEach(item => {
      const updatedItem = item;
      updatedItem.isSelected = false;
    });
  };

  /**
   * @function onApplyFilter
   * This method is called on tap of APPLY button in filters modal
   *
   * @memberof Filters
   */
  onApplyFilter = () => {
    const { onSubmit } = this.props;
    const { filters } = this.props;
    let selectedFilters = {};

    this.filterNames.forEach(name => {
      const key = name[0];
      const filterData = filters[key] || [];

      // find all the selected items from filters list and map it with filter key present in filterNames
      const selectedFiltersData = filterData.filter(item => item.isSelected).map(item => item.id);
      const result = {};
      result[key] = selectedFiltersData;
      selectedFilters = { ...selectedFilters, ...result };
    });

    if (onSubmit) onSubmit(selectedFilters);
  };

  renderList = (key, title, filterData) => {
    if (filterData && filterData.length > 0) {
      const { selectedItems } = this.state;
      const itemRenderer =
        key === 'TCPColor_uFilter' ? this.renderColorSwitchItem : this.renderListItem;
      return (
        <Container>
          <TitleText>{title}</TitleText>
          <FlatList
            contentContainerStyle={getFlatListContainerStyle()}
            listKey={item => item.id}
            data={filterData}
            renderItem={itemRenderer}
            keyExtractor={item => item.id}
            initialNumToRender={8}
            maxToRenderPerBatch={2}
            horizontal
            ItemSeparatorComponent={this.renderSeparator}
            showsHorizontalScrollIndicator={false}
            extraData={selectedItems}
          />
        </Container>
      );
    }
    return null;
  };

  renderFilters = () => {
    const { filters } = this.props;
    return this.filterNames.map(item => {
      const key = item[0];
      const value = item[1];
      const filterData = filters[key] || [];
      return this.renderList(key, value, filterData);
    });
  };

  render() {
    const { labelsFilter } = this.props;
    return (
      <PageContainer>
        {this.renderFilters()}
        <ApplyAndClearButtonContainer>
          <Button
            fill="WHITE"
            type="submit"
            buttonVariation="variable-width"
            data-locator=""
            text={labelsFilter.lbl_clear}
            onPress={this.onClearAll}
            accessibilityLabel={labelsFilter.lbl_clear}
            width="48%"
            fontSize="fs14"
          />
          <Button
            fill="BLACK"
            type="submit"
            buttonVariation="variable-width"
            data-locator=""
            text={labelsFilter.lbl_apply}
            onPress={this.onApplyFilter}
            accessibilityLabel={labelsFilter.lbl_apply}
            width="48%"
            fontSize="fs14"
          />
        </ApplyAndClearButtonContainer>
      </PageContainer>
    );
  }
}

export default withStyles(withTheme(Filters), styles);
export { Filters as FiltersVanilla };
