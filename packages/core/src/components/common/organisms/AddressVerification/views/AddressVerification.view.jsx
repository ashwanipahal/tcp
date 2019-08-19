import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Modal from '../../../molecules/Modal';
import Button from '../../../atoms/Button';
import TextBox from '../../../atoms/TextBox';
import BodyCopy from '../../../atoms/BodyCopy';
import AddressOption from '../../../molecules/AddressOption';
import styles from '../styles/AddressVerification.style';
import CONSTANTS from '../AddressVerification.constants';
import spacing from '../../../../../../styles/themes/TCP/spacing';

// @flow

type Props = {
  heading: string,
  className: ?string,
  verificationResult: string,
  userAddress: object,
  suggestedAddress: object,
  resetVerifyAddressAction: () => void,
  onSuccess: () => void,
  onError: () => void,
  labels: object,
};

export class AddressVerification extends React.Component<Props> {
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

  componentDidUpdate() {
    if (this.isValidAddress) {
      this.onConfirm();
    } else if (this.isError) {
      const { onError, userAddress } = this.props;
      onError(userAddress);
      this.onCloseModal();
    }
  }

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

  getMessage = verificationResult => {
    const {
      labels: { verifyAddressLabels },
    } = this.props;
    return (
      <BodyCopy
        component="p"
        fontSize="fs14"
        textAlign="center"
        color={
          CONSTANTS.VERIFY_ADDRESS_STATUS_MAP[verificationResult] ===
          CONSTANTS.VERIFY_ADDRESS_RESULT.INVALID_ERROR
            ? 'error'
            : 'text.primary'
        }
        className="elem-mb-XXXL"
        fontFamily="secondary"
        data-locator="verifyaddress-msg"
      >
        {verifyAddressLabels[verificationResult]}
      </BodyCopy>
    );
  };

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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  renderUserAddress = (verificationResult, userAddress) => {
    const {
      labels: { verifyAddressLabels },
    } = this.props;
    const { selectAddress } = this.state;
    return (
      <div
        className={`addressVerification__section layout-pr-LRG elem-mb-XL ${
          this.showInput ? 'layout-pl-LRG' : 'layout-pl-XL'
        }`}
      >
        <BodyCopy
          component="p"
          fontFamily="secondary"
          fontWeight="extrabold"
          fontSize="fs14"
          className="elem-mb-SM"
          data-locator="verifyaddress-youenteredlbl"
        >
          {verifyAddressLabels.youEntered}
        </BodyCopy>
        <div className="elem-mb-XL">
          <AddressOption
            className="addressVerification__input"
            address={this.formatAddress(userAddress)}
            name="selectAddress"
            value="userAddress"
            isSelected={selectAddress === 'userAddress'}
            onChange={this.handleChange}
            showInput={this.showInput}
            inputProps={{
              'data-locator': 'verifyaddress-enteredradio',
            }}
          />
        </div>
      </div>
    );
  };

  renderSuggestedAddress = (verificationResult, suggestedAddress) => {
    const {
      labels: { verifyAddressLabels },
    } = this.props;
    if (this.showInput) {
      const { selectAddress } = this.state;
      return (
        <div className="addressVerification__section addressVerification__section--noBorder layout-pl-LRG layout-pr-LRG">
          <BodyCopy
            component="p"
            fontFamily="secondary"
            fontWeight="extrabold"
            fontSize="fs14"
            className="elem-mb-SM"
            data-locator="verifyaddress-wesuggestlbl"
          >
            {verifyAddressLabels.weSuggest}
          </BodyCopy>
          <div className="elem-mb-XL">
            <AddressOption
              className="addressVerification__input"
              address={this.formatAddress(suggestedAddress)}
              name="selectAddress"
              value="suggestedAddress"
              isSelected={selectAddress === 'suggestedAddress'}
              onChange={this.handleChange}
              inputProps={{
                'data-locator': 'verifyaddress-suggestedradio',
              }}
              showInput
            />
          </div>
        </div>
      );
    }
    if (this.showOptionalAddressLine) {
      const { optionalAddressLine } = this.state;
      return (
        <div className="addressVerification__section addressVerification__section--noBorder elem-mb-XL layout-pl-XL">
          <TextBox
            input={{
              value: optionalAddressLine,
              onChange: this.handleChange,
              name: 'optionalAddressLine',
            }}
            placeholder={verifyAddressLabels.addressLine2}
            id="optionalAddressLine"
            dataLocator="verifyaddress-addressLine2InPopUp"
          />
        </div>
      );
    }

    return null;
  };

  render() {
    const {
      className,
      verificationResult,
      userAddress,
      suggestedAddress,
      labels: { verifyAddressLabels },
      heading,
    } = this.props;
    this.updateDisplayFlag(verificationResult, userAddress, suggestedAddress);
    if (this.showVerifyModal) {
      return (
        <Modal
          colSet={{ large: 4, medium: 8, small: 6 }}
          isOpen
          onRequestClose={this.onCloseModal}
          overlayClassName="TCPModal__Overlay"
          className={`${className} TCPModal__Content`}
          heading={heading}
          fixedWidth
          maxWidth={spacing.MODAL_WIDTH.SMALL}
          minHeight="675px"
        >
          <div className="addressVerification">
            <BodyCopy
              component="p"
              fontSize="fs22"
              fontWeight="semibold"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-MED"
            >
              {verifyAddressLabels.verifyHeader}
            </BodyCopy>
            {this.getMessage(verificationResult, suggestedAddress)}
            {this.renderUserAddress(verificationResult, userAddress, suggestedAddress)}
            {this.renderSuggestedAddress(verificationResult, suggestedAddress)}
            <div className="addressVerification__ctaContainer">
              <Button
                className="addressVerification__cta"
                buttonVariation="variable-width"
                fill="BLUE"
                onClick={this.onConfirm}
                data-locator="verifyaddress-continuebtn"
              >
                {verifyAddressLabels.continueCta}
              </Button>
              <Button
                className="addressVerification__cta"
                buttonVariation="variable-width"
                onClick={this.onCloseModal}
                fill="RED"
                data-locator="verifyaddress-editaddressbtn"
              >
                {verifyAddressLabels.editAddress}
              </Button>
            </div>
          </div>
        </Modal>
      );
    }

    return null;
  }
}

export default withStyles(AddressVerification, styles);
