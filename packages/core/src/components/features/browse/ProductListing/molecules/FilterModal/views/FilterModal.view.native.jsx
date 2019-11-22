import React from 'react';
import { Modal, Platform } from 'react-native';
import PropTypes from 'prop-types';
import CustomIcon from '@tcp/core/src/components/common/atoms/Icon';
import { ICON_NAME } from '@tcp/core/src/components/common/atoms/Icon/Icon.constants';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
import {
  styles,
  Container,
  SafeAreaViewStyle,
  ModalOverlay,
  ModalContent,
  SortContent,
  ModalOutsideTouchable,
  ModalTitle,
  ModalTitleContainer,
  ModalCloseTouchable,
} from '../FilterModal.style.native';
import FilterButtons from '../../FilterButtons';
import Filters from '../../Filters';
import getSortOptions from '../../SortSelector/views/Sort.util';

class FilterModal extends React.PureComponent {
  static propTypes = {
    filters: PropTypes.shape({}),
    theme: PropTypes.shape({}),
    labelsFilter: PropTypes.shape({}),
    onSubmit: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    navigation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
    sortLabels: PropTypes.arrayOf(PropTypes.shape({})),
    isFavorite: PropTypes.bool,
    onFilterSelection: PropTypes.func,
    onSortSelection: PropTypes.func,
    filteredId: PropTypes.string,
    selectedFilterValue: PropTypes.shape({}).isRequired,
    setSelectedFilter: PropTypes.func.isRequired,
    isKeepModalOpen: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
  };

  static defaultProps = {
    filters: {},
    theme: {},
    labelsFilter: {},
    navigation: {},
    sortLabels: [],
    isFavorite: false,
    onFilterSelection: () => {},
    onSortSelection: () => {},
    filteredId: 'ALL',
    isKeepModalOpen: false,
    isLoadingMore: false,
  };

  constructor(props) {
    super(props);
    const { isKeepModalOpen } = props;
    this.state = {
      showModal: isKeepModalOpen,
      language: '',
      showSortModal: false,
    };
  }

  setModalVisibilityState = flag => {
    this.setState({
      showModal: flag,
      showSortModal: !flag,
    });
  };

  setSortModalVisibilityState = flag => {
    this.setState({
      showModal: flag,
      showSortModal: flag,
    });
  };

  resetAppliedFilters = () => {
    if (this.filterViewRef) this.filterViewRef.clearAllFilters();
  };

  onCloseModal = () => {
    const { isFavorite } = this.props;
    if (!isFavorite) {
      this.resetAppliedFilters();
    }
    this.setModalVisibilityState(false);
  };

  onPressOut = () => {
    this.resetAppliedFilters();
    this.setModalVisibilityState(false);
  };

  onPressFilter = () => {
    this.setModalVisibilityState(true);
  };

  onPressSort = () => {
    this.setSortModalVisibilityState(true);
  };

  /**
   * @function applyFilterAndSort
   * This method applies filters and sort stored in current instance of FilterModal
   *
   * @memberof FilterModal
   */
  applyFilterAndSort = filters => {
    const { onSubmit, getProducts, navigation, selectedFilterValue } = this.props;
    const url = navigation && navigation.getParam('url');
    let filterData = {};
    const { language } = this.state;

    if (filters) {
      filterData = filters;
    } else if (selectedFilterValue) {
      filterData = selectedFilterValue;
    }

    if (language) {
      // restore sort if available
      filterData = { ...filterData, sort: language };
    }
    onSubmit(filterData, false, getProducts, url, true);

    if (!filters) {
      this.setModalVisibilityState(false);
    }
  };

  closeModal = () => {
    this.setModalVisibilityState(false);
  };

  /**
   * @function handleClick
   * This method is called with selected sort value when sort is applied
   *
   * @memberof FilterModal
   */
  handleClick = selectedValue => {
    const { language } = this.state;
    const sortValue = Platform.OS === 'ios' ? language : selectedValue;
    this.sortValue = sortValue;
    const { isFavorite, onSortSelection } = this.props;
    if (isFavorite) {
      this.setModalVisibilityState(false);
      onSortSelection(sortValue);
    } else {
      this.applyFilterAndSort();
    }
  };

  /**
   * @function applyFilters
   * This method is called with selected filters when filter is applied
   *
   * @memberof FilterModal
   */
  applyFilters = filters => {
    this.filters = filters;
    this.applyFilterAndSort(filters);
  };

  render() {
    const {
      labelsFilter,
      filters,
      sortLabels,
      isFavorite,
      onFilterSelection,
      filteredId,
      setSelectedFilter,
      isLoadingMore,
    } = this.props;
    const { showModal, language, showSortModal } = this.state;
    const sortOptions = isFavorite ? sortLabels : getSortOptions(sortLabels);

    const dropDownStyle = {
      height: Platform.OS === 'ios' ? 0 : 49,
      border: 1,
    };
    const itemStyle = {
      height: 49,
      color: 'gray.800',
    };

    return (
      <Container>
        <FilterButtons
          labelsFilter={labelsFilter}
          onPressFilter={this.onPressFilter}
          onPressSort={this.onPressSort}
          selected={showModal}
        />

        <Modal visible={showModal} transparent animationType="slide">
          <SafeAreaViewStyle>
            <ModalOutsideTouchable
              accessibilityRole="button"
              activeOpacity={1}
              onPressOut={this.onPressOut}
            >
              <ModalOverlay />
            </ModalOutsideTouchable>
            {!showSortModal && (
              <ModalContent>
                <ModalTitleContainer>
                  <ModalTitle>{labelsFilter.lbl_filter_by}</ModalTitle>
                  <ModalCloseTouchable
                    isButton
                    onPress={this.onCloseModal}
                    accessibilityRole="button"
                    accessibilityLabel="Close button"
                  >
                    <CustomIcon name={ICON_NAME.close} size="fs20" color="gray.900" />
                  </ModalCloseTouchable>
                </ModalTitleContainer>
                <Filters
                  name="filters"
                  labelsFilter={labelsFilter}
                  filters={filters}
                  onSubmit={filter => {
                    setSelectedFilter(filter);
                    this.applyFilters(filter);
                  }}
                  ref={ref => {
                    this.filterViewRef = ref;
                  }}
                  isFavorite={isFavorite}
                  onFilterSelection={onFilterSelection}
                  filteredId={filteredId}
                  onCloseModal={this.onCloseModal}
                  closeModal={this.closeModal}
                  isLoadingMore={isLoadingMore}
                />
              </ModalContent>
            )}

            {showSortModal && (
              <SortContent>
                <DropDown
                  selectedValue={language}
                  data={sortOptions}
                  // eslint-disable-next-line sonarjs/no-identical-functions
                  onValueChange={itemValue => {
                    this.setState({ language: itemValue }, () => this.handleClick(itemValue));
                  }}
                  variation="primary"
                  dropDownStyle={{ ...dropDownStyle }}
                  itemStyle={{ ...itemStyle }}
                  bounces={false}
                  selectedItemFontWeight="extrabold"
                  dropDownItemFontWeight="regular"
                  onPressOut={this.onPressOut}
                  openDropdownOnLoad
                  isAnimateList={false}
                />
              </SortContent>
            )}
          </SafeAreaViewStyle>
        </Modal>
      </Container>
    );
  }
}

export default withStyles(FilterModal, styles);
export { FilterModal as FilterModalVanilla };
