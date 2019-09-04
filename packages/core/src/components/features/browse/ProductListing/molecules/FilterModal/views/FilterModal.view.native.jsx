import React from 'react';
import { Modal, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { withTheme } from 'styled-components/native';
import CustomIcon from '@tcp/core/src/components/common/atoms/Icon';
import { ICON_NAME } from '@tcp/core/src/components/common/atoms/Icon/Icon.constants';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { styles, Container, ModalContainer } from '../FilterModal.style.native';
import FilterButtons from '../../FilterButtons';

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

  /**
   * Close the drop down
   */
  onCloseModal = () => {
    console.tron.log('onCloseModal...');
    this.setState({
      showModal: false,
    });
  };

  onPressFilter = () => {
    console.tron.log('onPressFilter');
    this.setState({
      showModal: true,
    });
  };

  onPressSort = () => {};

  render() {
    const { theme, labelsFilter } = this.props;
    const { showModal } = this.state;
    const closeIconColor = get(theme, 'colorPalette.gray[900]', '#1a1a1a');
    const closeIconSize = get(theme, 'typography.fontSizes.fs20', 20);
    return (
      <Container>
        <FilterButtons
          labelsFilter={labelsFilter}
          onPressFilter={this.onPressFilter}
          onPressSort={this.onPressSort}
        />
        <Modal visible={showModal} transparent>
          <ModalContainer>
            <TouchableOpacity onPress={this.onCloseModal} accessibilityRole="button">
              <CustomIcon name={ICON_NAME.close} size={closeIconSize} color={closeIconColor} />
            </TouchableOpacity>
            <Text>This is Filter modal</Text>
          </ModalContainer>
        </Modal>
      </Container>
    );
  }
}

export default withStyles(withTheme(FilterModal), styles);
export { FilterModal as FilterModalVanilla };
