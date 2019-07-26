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
// @flow
type Props = {
  addresses: List<{}>,
  labels: {
    addNewAddressCTA: string,
  },
  className: string,
  onDefaultShippingAddressClick: Object,
  showUpdatedNotification: any,
  showUpdatedNotificationOnModal: any,
  onDeleteAddress: Function,
  deleteModalMountedState: false,
  setDeleteModalMountState: Function,
};

export class AddressView extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedAddress: {},
    };
  }

  setSelectedAddress = address => {
    this.setState({ selectedAddress: address });
  };

  onAddNNewAddressClick = () => {};

  render() {
    const {
      addresses,
      labels,
      className,
      onDefaultShippingAddressClick,
      showUpdatedNotification,
      onDeleteAddress,
      deleteModalMountedState,
      setDeleteModalMountState,
      showUpdatedNotificationOnModal,
    } = this.props;

    const { selectedAddress } = this.state;

    return (
      <View {...this.props}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StyledHeading>
            <BodyCopy fontSize="fs16" fontWeight="extrabold" text={labels.addressBookHeading} />
          </StyledHeading>
          <UnderlineStyle />
          {addresses.size == 0 && (
            <NoAddressWrapper>
              <NoAddressHeading>
                <BodyCopy
                  fontSize="fs14"
                  fontWeight="semibold"
                  mobilefontFamily={['secondary']}
                  text={labels.createAddressBookMsg}
                />
              </NoAddressHeading>
              <NoAddressBody>
                <BodyCopy
                  fontSize="fs13"
                  fontWeight="regular"
                  mobilefontFamily={['secondary']}
                  text={labels.createAddressBookBenefitMsg}
                />
              </NoAddressBody>
            </NoAddressWrapper>
          )}
          <ButtonWrapperStyle>
            <Button
              buttonVariation="variable-width"
              fill="BLUE"
              data-locator="addressbook-addnewaddress"
              text={labels.addNewAddressCTA}
            />
          </ButtonWrapperStyle>
          {addresses.size > 0 && (
            <AddressListComponent
              addresses={addresses}
              labels={labels}
              deleteModalMountedState={deleteModalMountedState}
              setSelectedAddress={this.setSelectedAddress}
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
