import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Modal from '../../../../common/molecules/Modal';
import Address from '../../../../common/molecules/Address';
import Button from '../../../../common/atoms/Button';
import TextBox from '../../../../common/atoms/TextBox';
import ADDRESS_VERIFICATION from '../AddressVerification.constants';
import styles from '../styles/AddressVerification.style';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';

// @flow

type Props = {
  className: string,
  heading: string,
  verificationResult: object,
  userAddress: object,
  suggestedAddress: object,
  resetVerifyAddressAction: () => void,
  onSuccess: () => void,
};

export class AddressVerification extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: 'suggestedAddress',
      optionalAddressLine: '',
    };
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
        addressType: ADDRESS_VERIFICATION.SHIPPINGANDBILLING,
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

  getMessage = verificationResult => {
    return (
      <BodyCopy
        tag="p"
        bodySize="three"
        className="textCenter"
        color={
          verificationResult.result === ADDRESS_VERIFICATION.VERIFY_ADDRESS_RESULT.INVALID_ERROR
            ? 'tertiary'
            : 'primary'
        }
      >
        {ADDRESS_VERIFICATION.STATUS[verificationResult.status]}
      </BodyCopy>
    );
  };

  onConfirm = () => {
    const { selectedAddress, optionalAddressLine } = this.state;
    const { onSuccess, userAddress, suggestedAddress } = this.props;
    let addressPayload;

    if (suggestedAddress) {
      addressPayload =
        selectedAddress === 'userAddress'
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

  renderUserAddress = (verificationResult, userAddress, suggestedAddress) => {
    let showInput = false;
    if (
      verificationResult.result !== ADDRESS_VERIFICATION.VERIFY_ADDRESS_RESULT.APARTMENT_MISSING &&
      suggestedAddress
    ) {
      showInput = true;
    }
    const { selectedAddress } = this.state;
    return (
      <div className="addressVerification__section">
        <BodyCopy tag="p" fontFamily="secondaryFontSemilBoldFamily">
          YOU ENTERED
        </BodyCopy>
        <div className="addressVerification__input">
          <label htmlFor="userAddress">
            {showInput && (
              <input
                type="radio"
                id="userAddress"
                name="selectedAddress"
                value="userAddress"
                checked={selectedAddress === 'userAddress'}
                onChange={this.handleChange}
              />
            )}
            <Address name="userAddress" address={userAddress} />
          </label>
        </div>
      </div>
    );
  };

  renderSuggestedAddress = (verificationResult, suggestedAddress) => {
    if (
      suggestedAddress &&
      verificationResult.result !== ADDRESS_VERIFICATION.VERIFY_ADDRESS_RESULT.APARTMENT_MISSING
    ) {
      const { selectedAddress } = this.state;
      return (
        <div className="addressVerification__section addressVerification__section--noBorder">
          <BodyCopy tag="p" fontFamily="secondaryFontSemilBoldFamily">
            WE SUGGEST
          </BodyCopy>
          <div className="addressVerification__input">
            <label htmlFor="suggestedAddress">
              <input
                type="radio"
                id="suggestedAddress"
                name="selectedAddress"
                value="suggestedAddress"
                checked={selectedAddress === 'suggestedAddress'}
                onChange={this.handleChange}
              />
              <Address address={suggestedAddress} />
            </label>
          </div>
        </div>
      );
    }
    if (
      verificationResult.result === ADDRESS_VERIFICATION.VERIFY_ADDRESS_RESULT.APARTMENT_MISSING
    ) {
      const { optionalAddressLine } = this.state;
      return (
        <div>
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
    const { className, heading, verificationResult, userAddress, suggestedAddress } = this.props;

    if (
      verificationResult &&
      verificationResult.VALID !== ADDRESS_VERIFICATION.VERIFY_ADDRESS_RESULT.VALID
    ) {
      return (
        <Modal
          colSet={{ large: 4, medium: 8, small: 6 }}
          isOpen
          onRequestClose={this.onCloseModal}
          title={heading}
          overlayClassName="TCPModal__Overlay"
          className={`${className} TCPModal__Content`}
        >
          <div className="addressVerification">
            <h3 className="textCenter">Verify your Address</h3>
            {this.getMessage(verificationResult, suggestedAddress)}
            {this.renderUserAddress(verificationResult, userAddress, suggestedAddress)}
            {this.renderSuggestedAddress(verificationResult, suggestedAddress)}
            <div>
              <Button
                className="addressVerification__cta"
                buttonVariation="variable-width"
                fill="BLUE"
                onClick={this.onConfirm}
              >
                CONTINUE
              </Button>
              <Button
                className="addressVerification__cta"
                buttonVariation="variable-width"
                onClick={this.onCloseModal}
                fill="RED"
              >
                EDIT ADDRESS
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
