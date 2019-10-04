import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import AddEditAddressContainer from '@tcp/core/src/components/common/organisms/AddEditAddress/container/AddEditAddress.container';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  ParentContainer,
  StyledHeading,
  ButtonWrapperStyle,
  NoAddressWrapper,
  NoAddressHeading,
  NoAddressBody,
  UnderlineStyle,
  ModalViewWrapper,
} from '../../../styles/AddressBook.style.native';
import Button from '../../../../../../common/atoms/Button';
import AddressListComponent from '../../AddressList.view.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import ModalNative from '../../../../../../common/molecules/Modal';
import DeleteAddressModal from '../../DeleteAddressModal.view';
import ADDRESS_BOOK_CONSTANTS from '../../../AddressBook.constants';

export class AddressView extends React.Component {
  constructor(props) {
    super(props);
    const { addressLabels } = this.props;
    this.state = {
      addAddressMount: false,
      currentForm: 'AddAddress',
      addressLine1: '',
      countryState: '',
      selectedAddress: null,
      modalHeading: addressLabels.addNewAddress,
    };
    this.addressHeadline = null;
  }

  toggleAddressModal = () => {
    const { currentForm } = this.state;
    if (currentForm === ADDRESS_BOOK_CONSTANTS.ADD_ADDRESS_MODAL) {
      this.setState({ currentForm: ADDRESS_BOOK_CONSTANTS.VERIFICATION_MODAL });
    } else {
      this.setState({ currentForm: ADDRESS_BOOK_CONSTANTS.ADD_ADDRESS_MODAL });
    }
  };

  toggleAddAddressModal = type => {
    const { addAddressMount } = this.state;
    this.setState({
      addAddressMount: !addAddressMount,
    });
    if (type !== 'edit') {
      this.setState({ selectedAddress: '' });
      this.resetAddressLine1();
    }
  };

  setSelectedAddress = address => {
    this.setState({
      selectedAddress: address,
      addressLine1: address && address.addressLine[0],
      countryState: address.state,
    });
  };

  setAddressLine1 = (address, countryState) => {
    this.setState({ addressLine1: address, countryState });
  };

  resetAddressLine1 = () => {
    this.setState({ addressLine1: '', countryState: '', selectedAddress: '' });
  };

  setModalHeading = () => {
    const { addressLabels, verificationResult } = this.props;
    const { currentForm, selectedAddress } = this.state;
    let label = '';
    if (selectedAddress) {
      label =
        currentForm === ADDRESS_BOOK_CONSTANTS.VERIFICATION_MODAL && !!verificationResult
          ? addressLabels.editAddress
          : addressLabels.editAddressLbl;
      this.setState({ modalHeading: label });
    } else {
      label =
        currentForm === ADDRESS_BOOK_CONSTANTS.VERIFICATION_MODAL && !!verificationResult
          ? addressLabels.editAddress
          : addressLabels.addNewAddress;
    }
    this.setState({ modalHeading: label });
  };

  render() {
    const {
      addresses,
      labels,
      onDefaultShippingAddressClick,
      setDeleteModalMountState,
      deleteModalMountedState,
      onDeleteAddress,
    } = this.props;
    const {
      addAddressMount,
      currentForm,
      selectedAddress,
      addressLine1,
      countryState,
      modalHeading,
    } = this.state;

    return (
      <View {...this.props}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <StyledHeading>
            {getLabelValue(labels, 'ACC_LBL_ADDRESS_BOOK_HEADING', 'addressBook') && (
              <BodyCopy
                fontSize="fs16"
                fontWeight="extrabold"
                text={getLabelValue(labels, 'ACC_LBL_ADDRESS_BOOK_HEADING', 'addressBook')}
              />
            )}
          </StyledHeading>
          <UnderlineStyle />
          {addresses.size === 0 && (
            <NoAddressWrapper>
              <NoAddressHeading>
                {getLabelValue(labels, 'ACC_LBL_CREATE_ADDRESS_BOOK_MSG', 'addressBook') && (
                  <BodyCopy
                    fontSize="fs14"
                    fontWeight="semibold"
                    mobilefontFamily={['secondary']}
                    text={getLabelValue(labels, 'ACC_LBL_CREATE_ADDRESS_BOOK_MSG', 'addressBook')}
                  />
                )}
              </NoAddressHeading>
              <NoAddressBody>
                {getLabelValue(
                  labels,
                  'ACC_LBL_CREATE_ADDRESS_BOOK_BENEFIT_MSG',
                  'addressBook'
                ) && (
                  <BodyCopy
                    fontSize="fs13"
                    fontWeight="regular"
                    mobilefontFamily={['secondary']}
                    text={getLabelValue(
                      labels,
                      'ACC_LBL_CREATE_ADDRESS_BOOK_BENEFIT_MSG',
                      'addressBook'
                    )}
                  />
                )}
              </NoAddressBody>
            </NoAddressWrapper>
          )}
          <ButtonWrapperStyle>
            {getLabelValue(labels, 'ACC_LBL_ADD_NEW_ADDRESS_CTA', 'addressBook') && (
              <Button
                color="white"
                buttonVariation="variable-width"
                fill="BLUE"
                data-locator="addressbook-addnewaddress"
                text={getLabelValue(labels, 'ACC_LBL_ADD_NEW_ADDRESS_CTA', 'addressBook')}
                onPress={this.toggleAddAddressModal}
              />
            )}
          </ButtonWrapperStyle>
          {addresses.size > 0 && (
            <AddressListComponent
              addresses={addresses}
              labels={labels}
              setSelectedAddress={this.setSelectedAddress}
              onDefaultShippingAddressClick={onDefaultShippingAddressClick}
              setDeleteModalMountState={setDeleteModalMountState}
              toggleAddAddressModal={this.toggleAddAddressModal}
            />
          )}

          {addAddressMount && (
            <ModalNative
              isOpen={addAddressMount}
              onRequestClose={this.toggleAddAddressModal}
              heading={modalHeading}
            >
              <ModalViewWrapper>
                <AddEditAddressContainer
                  onCancel={this.toggleAddAddressModal}
                  addressBookLabels={getLabelValue(labels, 'addressBook')}
                  showHeading={false}
                  currentForm={currentForm}
                  toggleAddressModal={this.toggleAddressModal}
                  addressLine1={addressLine1}
                  countryState={countryState}
                  setAddressLine1={this.setAddressLine1}
                  resetAddressLine1={this.resetAddressLine1}
                  address={selectedAddress}
                  setModalHeading={this.setModalHeading}
                  isEdit={!!selectedAddress}
                />
              </ModalViewWrapper>
            </ModalNative>
          )}
          {deleteModalMountedState && (
            <DeleteAddressModal
              labels={labels}
              address={selectedAddress}
              isOpen={deleteModalMountedState}
              setDeleteModalMountState={setDeleteModalMountState}
              onDeleteAddress={onDeleteAddress}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

AddressView.propTypes = {
  addresses: PropTypes.shape([]),
  labels: PropTypes.shape({
    ACC_LBL_ADDRESS_BOOK_HEADING: PropTypes.string,
    ACC_LBL_CREATE_ADDRESS_BOOK_MSG: PropTypes.string,
    ACC_LBL_CREATE_ADDRESS_BOOK_BENEFIT_MSG: PropTypes.string,
    ACC_LBL_ADD_NEW_ADDRESS_CTA: PropTypes.string,
  }),
  addressLabels: PropTypes.shape({
    verifyAddress: PropTypes.string,
    addNewAddress: PropTypes.string,
  }),
  onDefaultShippingAddressClick: PropTypes.func,
  setDeleteModalMountState: PropTypes.func,
  deleteModalMountedState: PropTypes.bool,
  onDeleteAddress: PropTypes.func.isRequired,
  verificationResult: PropTypes.string,
};

AddressView.defaultProps = {
  addresses: [],
  labels: {
    addressBook: {
      ACC_LBL_ADDRESS_BOOK_HEADING: '',
      ACC_LBL_CREATE_ADDRESS_BOOK_MSG: '',
      ACC_LBL_CREATE_ADDRESS_BOOK_BENEFIT_MSG: '',
      ACC_LBL_ADD_NEW_ADDRESS_CTA: '',
    },
  },
  onDefaultShippingAddressClick: () => {},
  setDeleteModalMountState: () => {},
  addressLabels: {
    verifyAddress: '',
    addNewAddress: '',
  },
  deleteModalMountedState: false,
  verificationResult: '',
};

export default withStyles(AddressView, ParentContainer);
