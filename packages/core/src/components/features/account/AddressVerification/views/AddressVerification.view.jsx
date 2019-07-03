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
  className: string,
  heading: string,
  verificationResult: string,
  userAddress: object,
  suggestedAddress: object,
  resetVerifyAddressAction: () => void,
  onSuccess: () => void,
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
    }
  }

  formatAddressPayload = address => ({
    contact: [
      {
        addressLine: address.addressLine,
        attributes: [
          {
            key: 'addressField3',
            value: address.zipCode || '',
          },
        ],
        addressType: CONSTANTS.SHIPPINGANDBILLING,
        city: address.city,
        country: address.country,
        firstName: address.firstName,
        lastName: address.lastName,
        nickName: Date.now().toString(),
        phone1: address.phone1,
        email1: address.email1 || '',
        phone1Publish: 'true',
        primary: 'false',
        state: address.state,
        zipCode: address.zipCode,
        xcont_addressField2: address.isCommercialAddress ? '2' : '1',
        xcont_addressField3: address.zipCode,
        fromPage: '',
      },
    ],
  });

  updateDisplayFlag = (verificationResult, userAddress, suggestedAddress) => {
    if (verificationResult) {
      const status = CONSTANTS.VERIFY_ADDRESS_STATUS_MAP[verificationResult];
      this.showOptionalAddressLine =
        status === CONSTANTS.VERIFY_ADDRESS_RESULT.APARTMENT_MISSING || false;
      this.isValidAddress = status === CONSTANTS.VERIFY_ADDRESS_RESULT.VALID || false;
      this.showInput =
        (suggestedAddress && !this.isValidAddress && !this.showOptionalAddressLine) || false;
      this.showVerifyModal = !this.isValidAddress || false;
    } else {
      this.showOptionalAddressLine = false;
      this.isValidAddress = false;
      this.showVerifyModal = false;
      this.showInput = false;
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
      >
        {labels[`verifyStatus${verificationResult}`]}
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
      addressPayload.addressLine[1] = optionalAddressLine;
    }
    onSuccess(this.formatAddressPayload(addressPayload));
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
          {labels.userAddressHeading}
        </BodyCopy>
        <div className="elem--mb__XL">
          <AddressOption
            className="addressVerification__input"
            address={userAddress}
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
    if (this.showInput) {
      const { selectAddress } = this.state;
      const { labels } = this.props;
      return (
        <div className="addressVerification__section addressVerification__section--noBorder layout--pl__LRG layout--pr__LRG">
          <BodyCopy
            component="p"
            fontFamily="secondary"
            fontWeight="extrabold"
            fontSize="fs14"
            className="elem--mb__SM"
          >
            {labels.suggestedAddressHeading}
          </BodyCopy>
          <div className="elem--mb__XL">
            <AddressOption
              className="addressVerification__input"
              address={suggestedAddress}
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
            type="text"
            name="optionalAddressLine"
            value={optionalAddressLine}
            onChangeHandler={this.handleChange}
            placeholder="Apartment or suite number"
          />
        </div>
      );
    }

    return null;
  };

  render() {
    const { className, verificationResult, userAddress, suggestedAddress, labels } = this.props;
    this.updateDisplayFlag(verificationResult, userAddress, suggestedAddress);
    if (this.showVerifyModal) {
      return (
        <Modal
          colSet={{ large: 4, medium: 8, small: 6 }}
          isOpen
          onRequestClose={this.onCloseModal}
          overlayClassName="TCPModal__Overlay"
          className={`${className} TCPModal__Content`}
        >
          <div className="addressVerification layout--pl__XS layout--pr__XS">
            <BodyCopy
              component="p"
              fontSize="fs22"
              fontWeight="semibold"
              textAlign="center"
              className="elem--mb__LRG"
            >
              {labels.verifyYourAddressHeading}
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
                {labels.comfirmBtnLabel}
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
