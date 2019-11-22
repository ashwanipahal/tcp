/* eslint-disable no-console */
/* eslint-disable react-native/split-platform-components */
import React from 'react';
import { Linking, PermissionsAndroid } from 'react-native';
import {
  getScreenWidth,
  getScreenHeight,
  setValueInAsyncStorage,
  getValueFromAsyncStorage,
  isAndroid,
} from '@tcp/core/src/utils/utils.app';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
  ShadowContainer,
} from '../styles/LocationAccess.native';

const locationImage = require('../../../../../../src/assets/location.png');
const closeImage = require('../../../../../../src/assets/close.png');

const PROPMT_WIDTH = getScreenWidth() - 60;
const HEIGHT = getScreenHeight();

const LOCATION_ACCESS_KEY = 'location-access-key';
const LOCATION_ACCESS_VALUE = 'tcp_location-access-value';

class LocationAccessPrompt extends React.PureComponent {
  constructor() {
    super();
    this.state = { isOpenBool: false };
  }

  componentDidMount() {
    const { isUserLoggedIn } = this.props;
    if (isUserLoggedIn) {
      getValueFromAsyncStorage(LOCATION_ACCESS_KEY).then(data => {
        if (data === LOCATION_ACCESS_VALUE) {
          this.setState({ isOpenBool: false });
        }
        this.setState({ isOpenBool: true });
      });
    }
  }

  openModal = () => {
    const { isOpenBool } = this.state;
    this.setState({
      isOpenBool: !isOpenBool,
    });
  };

  androidPermition = () => {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: '',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  requestPermission = () => {
    Linking.openURL('app-settings:');
    if (isAndroid()) {
      this.androidPermition();
    }
    setValueInAsyncStorage(LOCATION_ACCESS_KEY, LOCATION_ACCESS_VALUE);
  };

  close = () => {
    this.openModal();
    setValueInAsyncStorage(LOCATION_ACCESS_KEY, LOCATION_ACCESS_VALUE);
  };

  render() {
    const { labels } = this.props;
    const { isOpenBool } = this.state;

    return (
      <ModalNative isOpen={isOpenBool} onRequestClose={this.openModal} customTransparent>
        <ShadowContainer height={HEIGHT}>
          <Container>
            <Wrapper width={PROPMT_WIDTH}>
              <StyledImage source={locationImage} width="35px" height="35px" marginTop="15px" />
              <Touchable accessibilityRole="button" onPress={this.openModal}>
                <StyledImage source={closeImage} width="15px" height="15px" />
              </Touchable>
              <MessageContainer>
                <StyledBodyCopy
                  text={getLabelValue(
                    labels,
                    'lbl_locationAccess_findItInStoreToday',
                    'StoreLanding',
                    'StoreLocator'
                  )}
                  textAlign="center"
                  fontWeight="black"
                  fontFamily="secondary"
                  fontSize="fs18"
                  marginTop="15px"
                />

                <StyledBodyCopy
                  text={getLabelValue(
                    labels,
                    'lbl_locationAccess_desc',
                    'StoreLanding',
                    'StoreLocator'
                  )}
                  textAlign="center"
                  fontWeight="black"
                  fontFamily="secondary"
                  fontSize="fs12"
                  marginTop="15px"
                />

                <StyledBodyCopy
                  text={getLabelValue(
                    labels,
                    'lbl_locationAccess_coolRight',
                    'StoreLanding',
                    'StoreLocator'
                  )}
                  textAlign="center"
                  fontWeight="black"
                  fontFamily="secondary"
                  fontSize="fs12"
                />

                <StyledButton
                  text={getLabelValue(
                    labels,
                    'lbl_locationAccess_turnOnLocation',
                    'StoreLanding',
                    'StoreLocator'
                  )}
                  fill="BLACK"
                  marginTop="12px"
                  width="260px"
                  onPress={() => this.requestPermission()}
                />

                <StyledAnchor
                  text={getLabelValue(
                    labels,
                    'lbl_locationAccess_maybelater',
                    'StoreLanding',
                    'StoreLocator'
                  )}
                  underline
                  fontSizeVariation="large"
                  marginTop="18px"
                  marginBottom="12px"
                  onPress={this.close}
                />
              </MessageContainer>
            </Wrapper>
          </Container>
        </ShadowContainer>
      </ModalNative>
    );
  }
}

LocationAccessPrompt.propTypes = {
  isUserLoggedIn: PropTypes.bool,
  labels: PropTypes.shape({}).isRequired,
};

LocationAccessPrompt.defaultProps = {
  isUserLoggedIn: false,
};

export { LocationAccessPrompt as LocationAccessPromptVanilla };
export default LocationAccessPrompt;
