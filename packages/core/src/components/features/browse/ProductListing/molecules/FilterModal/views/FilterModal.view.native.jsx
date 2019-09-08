import React from 'react';
import { Modal } from 'react-native';
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
  ModalOutsideTouchable,
  ModalTitle,
  ModalTitleContainer,
  ModalCloseTouchable,
} from '../FilterModal.style.native';
import FilterButtons from '../../FilterButtons';
import Filters from '../../Filters';

class FilterModal extends React.PureComponent {
  static propTypes = {
    filters: PropTypes.shape({}),
    theme: PropTypes.shape({}),
    labelsFilter: PropTypes.shape({}),
  };

  static defaultProps = {
    filters: {},
    theme: {},
    labelsFilter: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  setModalVisibilityState = flag => {
    this.setState({
      showModal: flag,
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

  onPressSort = () => {};

  render() {
    const { theme, labelsFilter, filters } = this.props;
    const { showModal } = this.state;
    const closeIconColor = get(theme, 'colorPalette.gray[900]', '#1a1a1a');
    const closeIconSize = get(theme, 'typography.fontSizes.fs20', 20);
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
            <ModalContent>
              <ModalTitleContainer>
                <ModalTitle>{labelsFilter.lbl_filter_by}</ModalTitle>
                <ModalCloseTouchable onPress={this.onCloseModal} accessibilityRole="button">
                  <CustomIcon name={ICON_NAME.close} size={closeIconSize} color={closeIconColor} />
                </ModalCloseTouchable>
              </ModalTitleContainer>
              <Filters labelsFilter={labelsFilter} filters={filters} />
            </ModalContent>
          </SafeAreaViewStyle>
        </Modal>
      </Container>
    );
  }
}

export default withStyles(withTheme(FilterModal), styles);
export { FilterModal as FilterModalVanilla };
