import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import AddEditAddressContainer from '@tcp/core/src/components/common/organisms/AddEditAddress/container/AddEditAddress.container';
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

export class AddressView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addAddressMount: false,
      currentForm: 'AddAddress',
      addressLine1: '',
      countryState: '',
      selectedAddress: null,
    };
  }

  toggleAddressModal = () => {
    const { currentForm } = this.state;
    if (currentForm === 'AddAddress') {
      this.setState({ currentForm: 'VerificationModal' });
    } else {
      this.setState({ currentForm: 'AddAddress' });
    }
  };

  toggleAddAddressModal = () => {
    const { addAddressMount } = this.state;
    this.setState({
      addAddressMount: !addAddressMount,
    });
  };

  setSelectedAddress = address => {
    this.setState({ selectedAddress: address });
  };

  setAddressLine1 = (address, countryState) => {
    this.setState({ addressLine1: address, countryState });
  };

  resetAddressLine1 = () => {
    this.setState({ addressLine1: '', countryState: '' });
  };

  render() {
    const {
      addresses,
      labels,
      onDefaultShippingAddressClick,
      setDeleteModalMountState,
      deleteModalMountedState,
      onDeleteAddress,
      addressLabels,
    } = this.props;
    const {
      addAddressMount,
      currentForm,
      selectedAddress,
      addressLine1,
      countryState,
    } = this.state;

    return (
      <View {...this.props}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StyledHeading>
            {labels.addressBook.ACC_LBL_ADDRESS_BOOK_HEADING && (
              <BodyCopy
                fontSize="fs16"
                fontWeight="extrabold"
                text={labels.addressBook.ACC_LBL_ADDRESS_BOOK_HEADING}
              />
            )}
          </StyledHeading>
          <UnderlineStyle />
          {addresses.size === 0 && (
            <NoAddressWrapper>
              <NoAddressHeading>
                {labels.addressBook.ACC_LBL_CREATE_ADDRESS_BOOK_MSG && (
                  <BodyCopy
                    fontSize="fs14"
                    fontWeight="semibold"
                    mobilefontFamily={['secondary']}
                    text={labels.addressBook.ACC_LBL_CREATE_ADDRESS_BOOK_MSG}
                  />
                )}
              </NoAddressHeading>
              <NoAddressBody>
                {labels.addressBook.ACC_LBL_CREATE_ADDRESS_BOOK_BENEFIT_MSG && (
                  <BodyCopy
                    fontSize="fs13"
                    fontWeight="regular"
                    mobilefontFamily={['secondary']}
                    text={labels.addressBook.ACC_LBL_CREATE_ADDRESS_BOOK_BENEFIT_MSG}
                  />
                )}
              </NoAddressBody>
            </NoAddressWrapper>
          )}
          <ButtonWrapperStyle>
            {labels.addressBook.ACC_LBL_ADD_NEW_ADDRESS_CTA && (
              <Button
                color="white"
                buttonVariation="variable-width"
                fill="BLUE"
                data-locator="addressbook-addnewaddress"
                text={labels.addressBook.ACC_LBL_ADD_NEW_ADDRESS_CTA}
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
              heading={
                currentForm === 'VerificationModal'
                  ? addressLabels.verifyAddress
                  : addressLabels.addNewAddress
              }
            >
              <ModalViewWrapper>
                <AddEditAddressContainer
                  onCancel={this.toggleAddAddressModal}
                  addressBookLabels={labels.addressBook}
                  showHeading={false}
                  currentForm={currentForm}
                  toggleAddressModal={this.toggleAddressModal}
                  addressLine1={addressLine1}
                  countryState={countryState}
                  setAddressLine1={this.setAddressLine1}
                  resetAddressLine1={this.resetAddressLine1}
                  address={selectedAddress}
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
};

export default withStyles(AddressView, ParentContainer);
