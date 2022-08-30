import React from 'react';
import { View, Text } from 'react-native';
import AddEditAddressContainer from '@tcp/core/src/components/features/account/AddEditAddress/container/AddEditAddress.container';

import CustomButton from '../../../../common/atoms/Button';
import ModalNative from '../../../../common/molecules/Modal';
import CreateAccount from '../../CreateAccount';

// TODO - need to file usage and then get lables from getLableVa
class AddressBook extends React.PureComponent<Props> {
  constructor() {
    super();
    this.state = { isOpenBool: false };
  }

  openModal = () => {
    const { isOpenBool } = this.state;
    this.setState({
      isOpenBool: !isOpenBool,
    });
  };

  render() {
    const { isOpenBool } = this.state;
    const { labels } = this.props;
    return (
      <View>
        <Text>{labels.addressBookHeading}</Text>
        <CustomButton text={labels.acc_lbl_create_account} onPress={this.openModal} />
        <ModalNative
          isOpen={isOpenBool}
          onRequestClose={this.openModal}
          heading={labels.acc_lbl_create_account}
          headingFontFamily="secondary"
        >
          <CreateAccount />
        </ModalNative>
        <AddEditAddressContainer labels={labels} />
      </View>
    );
  }
}

export { AddressBook as AddressBookVanilla };
export default AddressBook;
