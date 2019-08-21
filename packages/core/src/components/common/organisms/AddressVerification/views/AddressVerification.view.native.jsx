/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { ScrollView, View } from 'react-native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PropTypes } from 'prop-types';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import {
  AddressVerificationContainer,
  ButtonWrapper,
  MessageWrapper,
  AddressOptionWrapper,
  EnteredWrapper,
  EnteredSectionWrapper,
  SuggestWrapper,
  SuggestSectionWrapper,
} from '../styles/AddressVerification.style.native';
import CONSTANTS from '../AddressVerification.constants';
import AddressOption from '../../../molecules/AddressOption';

const colorPallete = createThemeColorPalette();

export default class AddressVerification extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectAddress: 'suggestedAddress',
      optionalAddressLine: '',
    };

    this.isValidAddress = false;
    this.showInput = false;
    this.showVerifyModal = false;
    this.showOptionalAddressLine = false;

    this.labels = {
      verifyAddressLabels: {
        AE09:
          'There may be an issue with your address as entered. Please double check it, or if you believe the address is correct you can continue to the next step.',
        AE10:
          'The house / building number is missing from your address. Please review and confirm your address.',
        AE11: 'The house / building number is not valid. Please review and confirm your address.',
        AE12: 'The house / building number is not valid. Please review and confirm your address.',
        addAddressHeading: 'Add Address',
        addressLine2: 'Address Line 2 (Optional)',
        continueCta: 'CONTINUE',
        defaultErrorMessage:
          'There may be an issue with your address as entered. Please double check it, or select from the below.',
        editAddress: 'EDIT ADDRESS',
        verifyHeader: 'Verify Your Address',
        weSuggest: 'WE SUGGEST',
        youEntered: 'YOU ENTERED',
      },
    };
  }

  componentDidUpdate() {
    if (this.isValidAddress) {
      this.onConfirm();
    } else if (this.isError) {
      const { onError, userAddress } = this.props;
      onError(userAddress);
      this.onCloseModal();
    }
  }

  onConfirm = () => {
    const { selectAddress, optionalAddressLine } = this.state;
    const { onSuccess, userAddress, suggestedAddress } = this.props;
    let addressPayload = {};

    if (suggestedAddress) {
      addressPayload =
        selectAddress === 'userAddress'
          ? Object.assign(addressPayload, userAddress)
          : Object.assign(addressPayload, suggestedAddress);
    } else {
      addressPayload = Object.assign(addressPayload, userAddress);
    }
    if (optionalAddressLine) {
      addressPayload.address2 = optionalAddressLine;
    }
    onSuccess(addressPayload);
    this.onCloseModal();
  };

  onCloseModal = () => {
    const { resetVerifyAddressAction } = this.props;
    const { optionalAddressLine } = this.state;
    if (optionalAddressLine) {
      this.setState({
        optionalAddressLine: '',
      });
    }

    resetVerifyAddressAction();
  };

  getMessage = verificationResult => {
    return (
      <MessageWrapper>
        <BodyCopy
          fontSize="fs14"
          textAlign="center"
          color={
            CONSTANTS.VERIFY_ADDRESS_STATUS_MAP[verificationResult] ===
            CONSTANTS.VERIFY_ADDRESS_RESULT.INVALID_ERROR
              ? 'error'
              : 'text.primary'
          }
          mobilefontFamily={['secondary']}
          text={this.labels.verifyAddressLabels[verificationResult]}
        />
      </MessageWrapper>
    );
  };

  formatAddress = address => ({
    firstName: address.firstName,
    lastName: address.lastName,
    addressLine: [address.address1, address.address2 || ''],
    city: address.city,
    state: address.state,
    country: address.country,
    zipCode: address.zip,
    phone1: address.phoneNumber,
  });

  handleUserAddress = () => {
    this.setState({
      selectAddress: 'userAddress',
    });
  };

  handleSuggestAddress = () => {
    this.setState({
      selectAddress: 'suggestedAddress',
    });
  };

  updateDisplayFlag = (verificationResult, userAddress, suggestedAddress) => {
    if (verificationResult) {
      const status = CONSTANTS.VERIFY_ADDRESS_STATUS_MAP[verificationResult];
      this.showOptionalAddressLine = status === CONSTANTS.VERIFY_ADDRESS_RESULT.APARTMENT_MISSING;
      this.isValidAddress = status === CONSTANTS.VERIFY_ADDRESS_RESULT.VALID;
      this.showInput =
        (suggestedAddress && !this.isValidAddress && !this.showOptionalAddressLine) || false;
      this.showVerifyModal = !this.isValidAddress || false;
      this.isError = status === CONSTANTS.VERIFY_ADDRESS_RESULT.ERROR;
    } else {
      this.showOptionalAddressLine = false;
      this.isValidAddress = false;
      this.showVerifyModal = false;
      this.showInput = false;
      this.isError = false;
    }
  };

  renderUserAddress = userAddress => {
    const { selectAddress } = this.state;
    return (
      <EnteredSectionWrapper>
        <EnteredWrapper>
          <BodyCopy
            fontSize="fs14"
            color="black"
            mobilefontFamily={['secondary']}
            fontWeight="extrabold"
            data-locator="verifyaddress-youenteredlbl"
            text={this.labels.verifyAddressLabels.youEntered}
          />
        </EnteredWrapper>

        <AddressOptionWrapper>
          <AddressOption
            name="selectAddress"
            address={this.formatAddress(userAddress)}
            value="userAddress"
            isSelected={selectAddress === 'userAddress'}
            onChange={this.handleUserAddress}
            showInput={this.showInput}
            inputProps={{
              'data-locator': 'verifyaddress-enteredradio',
            }}
          />
        </AddressOptionWrapper>
      </EnteredSectionWrapper>
    );
  };

  renderSuggestedAddress = (verificationResult, suggestedAddress) => {
    if (this.showInput) {
      const { selectAddress } = this.state;
      return (
        <SuggestSectionWrapper>
          <SuggestWrapper>
            <BodyCopy
              fontSize="fs14"
              color="black"
              mobilefontFamily={['secondary']}
              fontWeight="extrabold"
              data-locator="verifyaddress-wesuggestlbl"
              text={this.labels.verifyAddressLabels.weSuggest}
            />
          </SuggestWrapper>

          <AddressOptionWrapper>
            <AddressOption
              name="selectAddress"
              address={this.formatAddress(suggestedAddress)}
              value="suggestedAddress"
              isSelected={selectAddress === 'suggestedAddress'}
              onChange={this.handleSuggestAddress}
              showInput
              inputProps={{
                'data-locator': 'verifyaddress-suggestedradio',
              }}
            />
          </AddressOptionWrapper>
        </SuggestSectionWrapper>
      );
    }
    if (this.showOptionalAddressLine) {
      const { optionalAddressLine } = this.state;
      return (
        <SuggestSectionWrapper>
          <AddressOptionWrapper>
            <TextBox
              input={{
                value: optionalAddressLine,
                name: 'optionalAddressLine',
              }}
              label={this.labels.verifyAddressLabels.addressLine2}
              onChangeText={text => this.setState({ optionalAddressLine: text })}
              id="optionalAddressLine"
              dataLocator="verifyaddress-addressLine2InPopUp"
            />
          </AddressOptionWrapper>
        </SuggestSectionWrapper>
      );
    }

    return null;
  };

  render() {
    const verificationResult = 'AE11';
    const userAddress = {
      address1: 'Albany, NY, USA',
      address2: '',
      city: 'Jaipur',
      country: 'US',
      firstName: 'Ajay',
      lastName: 'Saini',
      phoneNumber: '9782145901',
      primary: 'true',
      state: 'AK',
      zip: '30201',
    };
    const suggestedAddress = {
      address1: 'Albany, Ny, Usa',
      address2: '',
      city: 'Jaipur',
      country: 'US',
      firstName: 'Ajay',
      isCommercialAddress: '',
      lastName: 'Saini',
      phoneNumber: '9782145901',
      primary: 'true',
      state: 'AK',
      zip: '30201',
    };

    this.updateDisplayFlag(verificationResult, userAddress, suggestedAddress);

    if (this.showVerifyModal) {
      return (
        <ScrollView showsVerticalScrollIndicator={false} {...this.props}>
          <View>
            <BodyCopy
              mobilefontFamily={['secondary']}
              fontSize="fs22"
              textAlign="center"
              color="gray.900"
              fontWeight="extrabold"
              text={this.labels.verifyAddressLabels.verifyHeader}
            />
            {this.getMessage(verificationResult, suggestedAddress)}
            {this.renderUserAddress(userAddress)}
            {this.renderSuggestedAddress(verificationResult, suggestedAddress)}
            <AddressVerificationContainer>
              <ButtonWrapper>
                <CustomButton
                  color="white"
                  fill="BLUE"
                  text={this.labels.verifyAddressLabels.continueCta}
                  buttonVariation="variable-width"
                  onPress={this.onConfirm}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <CustomButton
                  color={colorPallete.red[300]}
                  fill="WHITE"
                  text={this.labels.verifyAddressLabels.editAddress}
                  buttonVariation="variable-width"
                  onPress={this.onCloseModal}
                />
              </ButtonWrapper>
            </AddressVerificationContainer>
          </View>
        </ScrollView>
      );
    }
    return null;
  }
}

AddressVerification.propTypes = {
  labels: PropTypes.shape({
    verifyAddressLabels: PropTypes.shape({
      verifyHeader: PropTypes.string,
      continueCta: PropTypes.string,
      editAddress: PropTypes.string,
    }),
  }),
  verificationResult: PropTypes.string,
  suggestedAddress: PropTypes.shape({}),
  userAddress: PropTypes.shape({}),
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  resetVerifyAddressAction: PropTypes.func,
};

AddressVerification.defaultProps = {
  labels: {
    verifyAddressLabels: {
      verifyHeader: '',
      continueCta: '',
      editAddress: '',
    },
  },
  verificationResult: '',
  suggestedAddress: {},
  userAddress: {},
  onError: () => {},
  onSuccess: () => {},
  resetVerifyAddressAction: () => {},
};
