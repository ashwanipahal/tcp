import React from 'react';
import { getScreenWidth } from '@tcp/core/src/utils/utils.app';
import ModalNative from '../../Modal/view/Modal.native';
import { Wrapper, Container, StyledImage, Touchable } from '../styles/LocationAccess.native';

// const closeImage = require('../../../../../../src/assets/dark_close.png');
const closeImage = require('../../../../../../src/assets/close.png');

const PROPMT_WIDTH = getScreenWidth() - 40;

class LocationAccessPrompt extends React.PureComponent {
  constructor() {
    super();
    this.state = { isOpenBool: false };
  }

  componentDidMount() {
    if (true) {
      this.setState({
        isOpenBool: true,
      });
    }
  }

  openModal = () => {
    const { isOpenBool } = this.state;
    this.setState({
      isOpenBool: !isOpenBool,
    });
  };

  render() {
    const { isOpenBool } = this.state;
    return (
      <ModalNative visible={isOpenBool} onRequestClose={this.openModal} customTransparent>
        <Container>
          <Wrapper width={PROPMT_WIDTH}>
            <Touchable accessibilityRole="button" onPress={() => this.openModal}>
              <StyledImage source={closeImage} width="15px" height="15px" />
            </Touchable>
          </Wrapper>
        </Container>
      </ModalNative>
    );
  }
}

export { LocationAccessPrompt as LocationAccessPromptVanilla };
export default LocationAccessPrompt;
