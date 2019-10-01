import React from 'react';
import { Modal, Picker, Button, Platform } from 'react-native';
import PropTypes from 'prop-types';
import CustomIcon from '@tcp/core/src/components/common/atoms/Icon';
import { ICON_NAME } from '@tcp/core/src/components/common/atoms/Icon/Icon.constants';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
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
  };

  static defaultProps = {
    filters: {},
    theme: {},
    labelsFilter: {},
    navigation: {},
    sortLabels: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
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
    this.resetAppliedFilters();
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
  applyFilterAndSort = () => {
    const { onSubmit, getProducts, navigation } = this.props;
    const url = navigation && navigation.getParam('url');
    let filterData = {};

    if (this.filters) {
      // restore filters if available
      filterData = { ...this.filters };
    }

    if (this.sortValue) {
      // restore sort if available
      filterData = { ...filterData, sort: this.sortValue };
    }
    onSubmit(filterData, false, getProducts, url);
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
    this.applyFilterAndSort();
  };

  /**
   * @function applyFilters
   * This method is called with selected filters when filter is applied
   *
   * @memberof FilterModal
   */
  applyFilters = filters => {
    this.filters = filters;
    this.applyFilterAndSort();
  };

  render() {
    const { labelsFilter, filters, sortLabels } = this.props;
    const { showModal, language, showSortModal } = this.state;

    const sortOptions = getSortOptions(sortLabels);

    const lapsList = sortOptions.map(data => {
      return <Picker.Item label={data.displayName} value={data.id} />;
    });
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
                  <ModalCloseTouchable onPress={this.onCloseModal} accessibilityRole="button">
                    <CustomIcon name={ICON_NAME.close} size="fs20" color="gray.900" />
                  </ModalCloseTouchable>
                </ModalTitleContainer>
                <Filters
                  name="filters"
                  labelsFilter={labelsFilter}
                  filters={filters}
                  onSubmit={this.applyFilters}
                  ref={ref => {
                    this.filterViewRef = ref;
                  }}
                />
              </ModalContent>
            )}

            {showSortModal && (
              <SortContent>
                {Platform.OS === 'ios' ? (
                  <Button
                    title="Done"
                    onPress={() => {
                      this.handleClick();
                    }}
                  />
                ) : null}
                <Picker
                  selectedValue={language}
                  onValueChange={itemValue => {
                    this.setState({ language: itemValue });
                    if (Platform.OS !== 'ios') {
                      this.handleClick(itemValue);
                    }
                  }}
                >
                  {lapsList}
                </Picker>
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
