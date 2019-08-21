import React from 'react';
import { View, ScrollView } from 'react-native';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  ParentContainer,
  StyledHeading,
  ButtonWrapperStyle,
  NoAddressWrapper,
  NoAddressHeading,
  NoAddressBody,
  UnderlineStyle,
  ModalHeading,
  LineWrapper,
  ModalViewWrapper,
} from '../../../styles/AddressBook.style.native';
import Button from '../../../../../../common/atoms/Button';
import AddressListComponent from '../../AddressList.view.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import ModalNative from '../../../../../../common/molecules/Modal';
import AddressVerification from '../../../../../../common/organisms/AddressVerification/views/AddressVerification.view.native';
import LineComp from '../../../../../../common/atoms/Line';

export class AddressView extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showVerifyAddressModal: false,
    };
  }

  toggleVerifyModal = () => {
    const { showVerifyAddressModal } = this.state;
    this.setState({
      showVerifyAddressModal: !showVerifyAddressModal,
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
    const { showVerifyAddressModal } = this.state;
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
                onPress={this.toggleVerifyModal}
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
          {showVerifyAddressModal && (
            <ModalNative isOpen={showVerifyAddressModal} onRequestClose={this.toggleVerifyModal}>
              <ModalHeading>
                <BodyCopy
                  mobileFontFamily={['secondary']}
                  fontWeight="extrabold"
                  fontSize="fs16"
                  text="EDIT ADDRESS"
                />
              </ModalHeading>
              <LineWrapper>
                <LineComp marginTop={5} borderWidth={1} borderColor="black" />
              </LineWrapper>
              <ModalViewWrapper>
                <AddressVerification toggleModal={this.toggleVerifyModal} labels={labels} />
              </ModalViewWrapper>
            </ModalNative>
          )}
        </ScrollView>
      </View>
    );
  }
}
export default withStyles(AddressView, ParentContainer);
