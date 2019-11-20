import React from 'react';
import { getScreenWidth } from '@tcp/core/src/utils/utils.app';
import ModalNative from '../../Modal/view/Modal.native';
import {
  Wrapper,
  Container,
  StyledImage,
  Touchable,
  StyledBodyCopy,
  StyledButton,
  StyledAnchor,
  MessageContainer,
} from '../styles/LocationAccess.native';

const locationImage = require('../../../../../../src/assets/location.png');
const closeImage = require('../../../../../../src/assets/close.png');

const PROPMT_WIDTH = getScreenWidth() - 60;
const isStatus = true;

class LocationAccessPrompt extends React.PureComponent {
  constructor() {
    super();
    this.state = { isOpenBool: false };
  }

  componentDidMount() {
    if (isStatus) {
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

  requestPermission = () => {};

  render() {
    const { isOpenBool } = this.state;
    return (
      <ModalNative isOpen={isOpenBool} onRequestClose={this.openModal} customTransparent>
        <Container>
          <Wrapper width={PROPMT_WIDTH}>
            <StyledImage source={locationImage} width="35px" height="35px" marginTop="15px" />
            <Touchable accessibilityRole="button" onPress={this.openModal}>
              <StyledImage source={closeImage} width="15px" height="15px" />
            </Touchable>
            <MessageContainer>
              <StyledBodyCopy
                text="Find It In Store Today"
                textAlign="center"
                fontWeight="black"
                fontFamily="secondary"
                fontSize="fs18"
                marginTop="15px"
              />

              <StyledBodyCopy
                text="Turn on your location so we can show you every style, color and size available in your nearest store "
                textAlign="center"
                fontWeight="black"
                fontFamily="secondary"
                fontSize="fs12"
                marginTop="15px"
              />

              <StyledBodyCopy
                text="Cool. right?!"
                textAlign="center"
                fontWeight="black"
                fontFamily="secondary"
                fontSize="fs12"
              />

              <StyledButton
                text="TURN ON LOCATION"
                fill="BLACK"
                marginTop="12px"
                width="320px"
                onPress={() => this.requestPermission()}
              />

              <StyledAnchor
                text="May be later"
                underline
                fontSizeVariation="large"
                marginTop="18px"
                onPress={this.openModal}
              />
            </MessageContainer>
          </Wrapper>
        </Container>
      </ModalNative>
    );
  }
}

export { LocationAccessPrompt as LocationAccessPromptVanilla };
export default LocationAccessPrompt;
