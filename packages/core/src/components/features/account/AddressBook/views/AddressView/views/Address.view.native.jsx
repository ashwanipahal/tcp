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
} from '../../../styles/AddressBook.style.native';
import Button from '../../../../../../common/atoms/Button';
import AddressListComponent from '../../AddressList.view.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

export class AddressView extends React.PureComponent<Props> {
  render() {
    const {
      addresses,
      labels,
      onDefaultShippingAddressClick,
      deleteModalMountedState,
      setDeleteModalMountState,
    } = this.props;

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
        </ScrollView>
      </View>
    );
  }
}
export default withStyles(AddressView, ParentContainer);
