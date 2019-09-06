import React from 'react';
import { Modal, Text, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import get from 'lodash/get';
import { withTheme } from 'styled-components/native';
import CustomIcon from '@tcp/core/src/components/common/atoms/Icon';
import { ICON_NAME } from '@tcp/core/src/components/common/atoms/Icon/Icon.constants';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import {
  styles,
  u,
  SafeAreaViewStyle,
  ModalOverlay,
  ModalContent,
  ModalOutsideTouchable,
} from '../GlobalModal.style';

export const ModalContext = React.createContext({ showModal: false });

class GlobalModal extends React.PureComponent {
  static propTypes = {
    theme: PropTypes.shape({}),
  };

  static defaultProps = {
    theme: {},
  };

  closeIconColor = '';

  closeIconSize = '';

  constructor(props) {
    super(props);
    const { theme } = props;
    this.closeIconColor = get(theme, 'colorPalette.gray[900]', '#1a1a1a');
    this.closeIconSize = get(theme, 'typography.fontSizes.fs20', 20);
    this.state = {
      showModal: false,
    };
  }

  renderModal = () => {
    return (
      <Modal visible={showModal} transparent>
        <SafeAreaViewStyle>
          <ModalOutsideTouchable
            accessibilityRole="button"
            activeOpacity={1}
            onPressOut={this.onPressOut}
          >
            <ModalOverlay />
          </ModalOutsideTouchable>
          <ModalContent>
            <TouchableOpacity onPress={this.onCloseModal} accessibilityRole="button">
              <CustomIcon name={ICON_NAME.close} size={closeIconSize} color={closeIconColor} />
            </TouchableOpacity>
            <Text>This is Filter modal</Text>
          </ModalContent>
        </SafeAreaViewStyle>
      </Modal>
    );
  };

  render() {
    const { children } = this.props;
    const { showModal } = this.state;

    return (
      <ModalContext.Provider value={this.state}>
        {showModal && this.renderModal()}
        {children}
      </ModalContext.Provider>
    );
  }
}

GlobalModal.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default withStyles(withTheme(GlobalModal), styles);
export { GlobalModal as GlobalModalVanilla };
