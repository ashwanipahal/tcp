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

export class AddressView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addAddressMount: false,
    };
  }

  toggleAddAddressModal = () => {
    const { addAddressMount } = this.state;
    this.setState({
      addAddressMount: !addAddressMount,
    });
  };

  render() {
    const {
      addresses,
      labels,
      onDefaultShippingAddressClick,
      deleteModalMountedState,
      setDeleteModalMountState,
    } = this.props;
    const { addAddressMount } = this.state;
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
              deleteModalMountedState={deleteModalMountedState}
              setSelectedAddress={() => {}}
              onDefaultShippingAddressClick={onDefaultShippingAddressClick}
              setDeleteModalMountState={setDeleteModalMountState}
            />
          )}
          {addAddressMount && (
            <ModalNative isOpen={addAddressMount} onRequestClose={this.toggleAddAddressModal}>
              <ModalViewWrapper>
                <AddEditAddressContainer
                  onCancel={this.toggleAddAddressModal}
                  showHeading={false}
                />
              </ModalViewWrapper>
            </ModalNative>
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
  onDefaultShippingAddressClick: PropTypes.func,
  deleteModalMountedState: PropTypes.func,
  setDeleteModalMountState: PropTypes.func,
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
  deleteModalMountedState: () => {},
  setDeleteModalMountState: () => {},
};

export default withStyles(AddressView, ParentContainer);
