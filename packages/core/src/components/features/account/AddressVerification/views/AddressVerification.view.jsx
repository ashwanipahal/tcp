import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Modal from '../../../../common/molecules/Modal';
import Button from '../../../../common/atoms/Button';
import TextBox from '../../../../common/atoms/TextBox';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import AddressOption from './AddressOption.view';
import styles from '../styles/AddressVerification.style';
import CONSTANTS from '../AddressVerification.constants';

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
    const { labels } = this.props;
    return (
      <BodyCopy
        component="p"
        fontSize="fs14"
        textAlign="center"
        color={
          CONSTANTS.VERIFY_ADDRESS_STATUS_MAP[verificationResult] ===
          CONSTANTS.VERIFY_ADDRESS_RESULT.INVALID_ERROR
            ? 'secondary'
            : 'primary'
        }
        className="elem--mb__XXXL"
        fontFamily="secondary"
      >
        {labels[`acc_label_verify_your_address_${verificationResult}`]}
      </BodyCopy>
    );
  };

  onConfirm = () => {
    const { selectAddress, optionalAddressLine } = this.state;
    const { onSuccess, userAddress, suggestedAddress } = this.props;
    let addressPayload;

    if (suggestedAddress) {
      addressPayload =
        selectAddress === 'userAddress'
          ? Object.assign({}, userAddress)
          : Object.assign({}, suggestedAddress);
    } else {
      addressPayload = Object.assign({}, userAddress);
    }
    if (optionalAddressLine) {
      addressPayload.address2 = optionalAddressLine;
    }
    onSuccess(addressPayload);
    this.onCloseModal();
  };

  onCloseModal = () => {
    const { resetVerifyAddressAction } = this.props;
    resetVerifyAddressAction();
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  renderUserAddress = (verificationResult, userAddress) => {
    const { labels } = this.props;
    const { selectAddress } = this.state;
    return (
      <div className="addressVerification__section layout--pl__LRG layout--pr__LRG elem--mb__XL">
        <BodyCopy
          component="p"
          fontFamily="secondary"
          fontWeight="extrabold"
          fontSize="fs14"
          className="elem--mb__SM"
        >
          {labels.acc_lbl_you_entered}
        </BodyCopy>
        <div className="elem--mb__XL">
          <AddressOption
            className="addressVerification__input"
            address={this.formatAddress(userAddress)}
            name="selectAddress"
            value="userAddress"
            isSelected={selectAddress === 'userAddress'}
            onChange={this.handleChange}
            showInput={this.showInput}
          />
        </div>
      </div>
    );
  };

  renderSuggestedAddress = (verificationResult, suggestedAddress) => {
    const { labels } = this.props;
    if (this.showInput) {
      const { selectAddress } = this.state;
      return (
        <div className="addressVerification__section addressVerification__section--noBorder layout--pl__LRG layout--pr__LRG">
          <BodyCopy
            component="p"
            fontFamily="secondary"
            fontWeight="extrabold"
            fontSize="fs14"
            className="elem--mb__SM"
          >
            {labels.acc_lbl_we_suggest}
          </BodyCopy>
          <div className="elem--mb__XL">
            <AddressOption
              className="addressVerification__input"
              address={this.formatAddress(suggestedAddress)}
              name="selectAddress"
              value="suggestedAddress"
              isSelected={selectAddress === 'suggestedAddress'}
              onChange={this.handleChange}
              showInput
            />
          </div>
        </div>
      );
    }
    if (this.showOptionalAddressLine) {
      const { optionalAddressLine } = this.state;
      return (
        <div className="elem--mb__XL layout--pl__LRG">
          <TextBox
            input={{
              value: optionalAddressLine,
              onChange: this.handleChange,
              name: 'optionalAddressLine',
            }}
            placeholder={labels.acc_lbl_optional_address_line}
            id="optionalAddressLine"
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
      labels,
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
          maxWidth="458px"
        >
          <div className="addressVerification">
            <BodyCopy
              component="p"
              fontSize="fs22"
              fontWeight="semibold"
              fontFamily="secondary"
              textAlign="center"
              className="elem--mb__MED"
            >
              {labels.acc_lbl_verify_your_address_header}
            </BodyCopy>
            {this.getMessage(verificationResult, suggestedAddress)}
            {this.renderUserAddress(verificationResult, userAddress, suggestedAddress)}
            {this.renderSuggestedAddress(verificationResult, suggestedAddress)}
            <div className="layout--pl__XL layout--pr__XL">
              <Button
                className="addressVerification__cta"
                buttonVariation="variable-width"
                fill="BLUE"
                onClick={this.onConfirm}
              >
                {labels.acc_lbl_continue_cta}
              </Button>
              <Button
                className="addressVerification__cta"
                buttonVariation="variable-width"
                onClick={this.onCloseModal}
                fill="RED"
              >
                {labels.editBtnLabel}
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
