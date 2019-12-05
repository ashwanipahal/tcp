/* eslint-disable no-console */
/* eslint-disable react-native/split-platform-components */
import React from 'react';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
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
} from '../styles/LocationAccessPrompt.native';

const locationImage = require('../../../../../../src/assets/location.png');
const closeImage = require('../../../../../../src/assets/close.png');

/**
 * Module height and width.
 */
const PROPMT_WIDTH = getScreenWidth() - 60;
const HEIGHT = getScreenHeight();

/**
 * Module LOCATION_ACCESS_KEY & LOCATION_ACCESS_VALUE
 */
const LOCATION_ACCESS_KEY = 'location-access-key';
const LOCATION_ACCESS_VALUE = 'tcp_location-access-value';

class LocationAccessPrompt extends React.PureComponent {
  constructor() {
    super();
    this.state = { isModalOpen: false };
  }

  /**
   * @componentDidMount : In this finction to manage the userlogin or not.
   */
  componentDidMount() {
    this.checkLocationAccess();
  }

  componentDidUpdate(oldProps) {
    const { isUserLoggedIn } = this.props;
    const { isUserLoggedIn: oldIsUserLoggedIn } = oldProps;
    if (isUserLoggedIn !== oldIsUserLoggedIn) {
      this.checkLocationAccess();
    }
  }

  checkLocationAccess = () => {
    const { isUserLoggedIn } = this.props;
    if (isUserLoggedIn) {
      getValueFromAsyncStorage(LOCATION_ACCESS_KEY).then(data => {
        if (data === LOCATION_ACCESS_VALUE) {
          this.setState({ isModalOpen: false });
        } else {
          this.setState({ isModalOpen: true });
        }
      });
    }
  };

  /**
   * @toggleModal : To manage the modal state .
   */
  toggleModal = () => {
    const { isModalOpen } = this.state;
    this.setState({
      isModalOpen: !isModalOpen,
    });
  };

  /**
   * @toggleModal : To manage the modal state .
   */
  androidPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
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
      this.setState({
        isModalOpen: false,
      });
    } catch (err) {
      this.setState({
        isModalOpen: false,
      });
    }
  };

  iosPermissions = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  /**
   * @requestPermission : To manage location permission in android and ios .
   */
  requestPermission = () => {
    if (isAndroid()) {
      this.androidPermissions();
    } else {
      this.iosPermissions();
    }
    setValueInAsyncStorage(LOCATION_ACCESS_KEY, LOCATION_ACCESS_VALUE);
  };

  /**
   * @requestPermission : To close the modal in android and ios .
   */
  close = () => {
    this.toggleModal();
    setValueInAsyncStorage(LOCATION_ACCESS_KEY, LOCATION_ACCESS_VALUE);
  };

  render() {
    const { labels } = this.props;
    const { isModalOpen } = this.state;

    return (
      <ModalNative isOpen={isModalOpen} onRequestClose={this.toggleModal} customTransparent>
        <ShadowContainer height={HEIGHT}>
          <Container>
            <Wrapper width={PROPMT_WIDTH}>
              <StyledImage source={locationImage} width="35px" height="35px" marginTop="15px" />
              <Touchable accessibilityRole="button" onPress={this.toggleModal}>
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
