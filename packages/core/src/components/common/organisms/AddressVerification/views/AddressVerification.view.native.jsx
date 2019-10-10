/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { ScrollView } from 'react-native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { PropTypes } from 'prop-types';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import { formatAddress } from '@tcp/core/src/utils';
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
  VerifyAddressWrapper,
  OptionAddressLineWrapper,
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
  }

  componentDidMount() {
    if (this.isValidAddress) {
      this.onConfirm();
    }
  }

  componentDidUpdate(prevProps) {
    const { verificationResult, userAddress, onError } = this.props;
    if (verificationResult !== prevProps.verificationResult) {
      if (this.isValidAddress) {
        this.onConfirm();
      } else if (this.isError) {
        onError(userAddress);
      }
    }
  }

  componentWillUnmount() {
    const { resetVerifyAddressAction } = this.props;
    const { optionalAddressLine } = this.state;
    if (optionalAddressLine) {
      this.setState({
        optionalAddressLine: '',
      });
    }

    resetVerifyAddressAction();
  }

  onConfirm = () => {
    const { selectAddress, optionalAddressLine } = this.state;
    const { onSuccess, userAddress, suggestedAddress } = this.props;
    let addressPayload = {};

    if (suggestedAddress) {
      addressPayload =
        selectAddress === 'userAddress'
          ? { ...addressPayload, ...userAddress }
          : { ...addressPayload, ...suggestedAddress };
    } else {
      addressPayload = { ...addressPayload, ...userAddress };
    }
    if (optionalAddressLine) {
      addressPayload.address2 = optionalAddressLine;
    }

    onSuccess(addressPayload);
  };

  onClose = () => {
    const { toggleAddressModal, resetVerifyAddressAction, plccOnClose } = this.props;
    if (toggleAddressModal) {
      toggleAddressModal();
    } else {
      resetVerifyAddressAction();
    }

    if (plccOnClose) {
      plccOnClose();
    }
  };

  getMessage = verificationResult => {
    const {
      labels: { verifyAddressLabels },
    } = this.props;
    if (verifyAddressLabels[verificationResult]) {
      return (
        <MessageWrapper>
          <BodyCopy
            fontSize="fs14"
            textAlign="center"
            color={
              CONSTANTS.VERIFY_ADDRESS_STATUS_MAP[verificationResult] ===
              CONSTANTS.VERIFY_ADDRESS_RESULT.INVALID_ERROR
                ? 'error'
                : 'black'
            }
            mobilefontFamily={['secondary']}
            text={verifyAddressLabels[verificationResult]}
          />
        </MessageWrapper>
      );
    }
    return <MessageWrapper />;
  };

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
    const {
      labels: { verifyAddressLabels },
    } = this.props;
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
            text={verifyAddressLabels.youEntered}
          />
        </EnteredWrapper>

        <AddressOptionWrapper>
          <AddressOption
            name="selectAddress"
            address={formatAddress(userAddress)}
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
    const {
      labels: { verifyAddressLabels },
    } = this.props;
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
              text={verifyAddressLabels.weSuggest}
            />
          </SuggestWrapper>

          <AddressOptionWrapper>
            <AddressOption
              name="selectAddress"
              address={formatAddress(suggestedAddress)}
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
          <OptionAddressLineWrapper>
            <TextBox
              input={{
                value: optionalAddressLine,
                name: 'optionalAddressLine',
              }}
              label={verifyAddressLabels.addressLine2}
              onChangeText={text => this.setState({ optionalAddressLine: text })}
              id="optionalAddressLine"
              dataLocator="verifyaddress-addressLine2InPopUp"
            />
          </OptionAddressLineWrapper>
        </SuggestSectionWrapper>
      );
    }

    return null;
  };

  render() {
    const {
      verificationResult,
      userAddress,
      suggestedAddress,
      labels: { verifyAddressLabels },
      setModalHeading,
      verifyModalRendered,
    } = this.props;
    this.updateDisplayFlag(verificationResult, userAddress, suggestedAddress);
    if (this.showVerifyModal) {
      setModalHeading();
      verifyModalRendered(true);
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          {...this.props}
          keyboardShouldPersistTaps="handled"
        >
          <VerifyAddressWrapper>
            <BodyCopy
              mobilefontFamily={['secondary']}
              fontSize="fs22"
              textAlign="center"
              color="gray.900"
              fontWeight="extrabold"
              text={verifyAddressLabels.verifyHeader}
            />
            {this.getMessage(verificationResult, suggestedAddress)}
            {this.renderUserAddress(userAddress)}
            {this.renderSuggestedAddress(verificationResult, suggestedAddress)}
            <AddressVerificationContainer>
              <ButtonWrapper>
                <CustomButton
                  color="white"
                  fill="BLUE"
                  text={verifyAddressLabels.continueCta}
                  onPress={this.onConfirm}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <CustomButton
                  color={colorPallete.red[300]}
                  fill="WHITE"
                  text={verifyAddressLabels.editAddress}
                  onPress={this.onClose}
                />
              </ButtonWrapper>
            </AddressVerificationContainer>
          </VerifyAddressWrapper>
        </ScrollView>
      );
    }
    verifyModalRendered(false);
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
  toggleAddressModal: PropTypes.func,
  setModalHeading: PropTypes.func,
  verifyModalRendered: PropTypes.func,
  isValidAddress: PropTypes.bool,
  plccOnClose: PropTypes.func,
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
  toggleAddressModal: () => {},
  setModalHeading: () => {},
  verifyModalRendered: () => {},
  isValidAddress: false,
  plccOnClose: () => {},
};

export { AddressVerification as AddressVerificationVanilla };
