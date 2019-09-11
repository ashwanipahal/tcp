import React from 'react';
import { Modal, Picker, Button, Platform } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { withTheme } from 'styled-components/native';
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
import config from '../../SortSelector/SortSelector.config';

class FilterModal extends React.PureComponent {
  static propTypes = {
    filters: PropTypes.shape({}),
    theme: PropTypes.shape({}),
    labelsFilter: PropTypes.shape({}),
    onSubmit: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    navigation: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  };

  static defaultProps = {
    filters: {},
    theme: {},
    labelsFilter: {},
    navigation: {},
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

  onCloseModal = () => {
    this.setModalVisibilityState(false);
  };

  onPressOut = () => {
    this.setModalVisibilityState(false);
  };

  onPressFilter = () => {
    this.setModalVisibilityState(true);
  };

  onPressSort = () => {
    this.setSortModalVisibilityState(true);
  };

  handleClick = selectedValue => {
    const { onSubmit, getProducts, navigation } = this.props;
    const url = navigation && navigation.getParam('url');
    const { language } = this.state;
    const sortValue = Platform.OS === 'ios' ? language : selectedValue;
    onSubmit({ sort: sortValue }, false, getProducts, url);
    this.setModalVisibilityState(false);
  };

  render() {
    const { theme, labelsFilter, filters } = this.props;
    const { showModal, language, showSortModal } = this.state;
    const closeIconColor = get(theme, 'colorPalette.gray[900]', '#1a1a1a');
    const closeIconSize = get(theme, 'typography.fontSizes.fs20', 20);
    const lapsList = config.map(data => {
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
                    <CustomIcon
                      name={ICON_NAME.close}
                      size={closeIconSize}
                      color={closeIconColor}
                    />
                  </ModalCloseTouchable>
                </ModalTitleContainer>

                <Filters labelsFilter={labelsFilter} filters={filters} />
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

export default withStyles(withTheme(FilterModal), styles);
export { FilterModal as FilterModalVanilla };
