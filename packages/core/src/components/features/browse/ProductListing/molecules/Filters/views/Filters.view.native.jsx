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
    isFavorite: PropTypes.bool,
    onFilterSelection: PropTypes.func,
    filteredId: PropTypes.string,
    onCloseModal: PropTypes.func,
  };

  static defaultProps = {
    filters: {},
    theme: {},
    labelsFilter: {},
    onSubmit: null,
    isFavorite: false,
    onFilterSelection: () => {},
    filteredId: 'ALL',
    onCloseModal: () => {},
  };

  filterNames = [];

  constructor(props) {
    super(props);
    const { filters, filteredId } = this.props;
    const { unbxdDisplayName } = filters;

    const selectedIndex1 = this.getSelectedItemIndexById(filters, filteredId);
    this.filterNames = (unbxdDisplayName && Object.entries(unbxdDisplayName)) || [];
    this.state = {
      selectedItems: [],
      selectedIndex: selectedIndex1,
    };
  }

  /**
   * @desc This is method iterate passed array based on the passed id and return selected index
   */
  getSelectedItemIndexById = (filters, selectedId) => {
    const len = (filters && filters.length) || 0;
    let matchedSelectedId = null;
    for (let i = 0; i < len; i += 1) {
      const item = filters[i];
      if (item.id === selectedId) {
        matchedSelectedId = i;
        break;
      }
    }
    return matchedSelectedId;
  };

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

  /**
   * @function onSingleSelectFilter
   * This method is called on tap of an item in filter list
   * set selected state of the filter
   */
  onSingleSelectFilter = (item, index) => {
    const { onFilterSelection, onCloseModal } = this.props;
    const { id } = item;
    if (onFilterSelection) {
      onFilterSelection(id);
    }
    this.setState({ selectedIndex: index }, () => {
      onCloseModal();
    });
  };

  renderListItem = ({ item, index }) => {
    const { isFavorite } = this.props;
    const { selectedIndex } = this.state;
    const { displayName, isSelected } = item;
    const selectedState = isFavorite ? selectedIndex === index : isSelected;
    return (
      <Button
        buttonVariation={BUTTON_VARIATION.mobileAppFilter}
        text={displayName}
        onPress={() =>
          isFavorite ? this.onSingleSelectFilter(item, index) : this.onSelectFilter(item)
        }
        selected={selectedState}
        data-locator=""
        accessibilityLabel={displayName}
      />
    );
  };

  renderColorSwitchItem = ({ item }) => {
    const { imagePath, isSelected, displayName } = item;
    const name = displayName || '';
    return (
      <LinkImageIcon
        uri={imagePath}
        selected={isSelected}
        onPress={() => this.onSelectFilter(item)}
        name={name}
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

  renderFavoriteFilters = filterData => {
    if (filterData && filterData.length > 0) {
      const { selectedItems } = this.state;
      return (
        <FlatList
          contentContainerStyle={getFlatListContainerStyle()}
          listKey={item => item.id}
          data={filterData}
          renderItem={this.renderListItem}
          keyExtractor={item => item.id}
          initialNumToRender={8}
          maxToRenderPerBatch={2}
          horizontal
          ItemSeparatorComponent={this.renderSeparator}
          showsHorizontalScrollIndicator={false}
          extraData={selectedItems}
        />
      );
    }
    return null;
  };

  renderFilters = () => {
    const { filters, isFavorite } = this.props;
    if (isFavorite) return this.renderFavoriteFilters(filters);
    return this.filterNames.map(item => {
      const key = item[0];
      const value = item[1];
      const filterData = filters[key] || [];
      return this.renderList(key, value, filterData);
    });
  };

  render() {
    const { labelsFilter, isFavorite } = this.props;
    return (
      <PageContainer>
        {this.renderFilters()}
        {!isFavorite && (
          <ApplyAndClearButtonContainer>
            <Button
              fill="WHITE"
              type="submit"
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
              data-locator=""
              text={labelsFilter.lbl_apply}
              onPress={this.onApplyFilter}
              accessibilityLabel={labelsFilter.lbl_apply}
              width="48%"
              fontSize="fs14"
            />
          </ApplyAndClearButtonContainer>
        )}
      </PageContainer>
    );
  }
}

export default withStyles(withTheme(Filters), styles);
export { Filters as FiltersVanilla };
