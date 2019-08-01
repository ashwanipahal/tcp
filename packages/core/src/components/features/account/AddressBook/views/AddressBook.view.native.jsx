import React from 'react';
import { View, Text } from 'react-native';
import AddNewAddress from '@tcp/core/src/components/features/account/AddEditAddress/views/AddEditAddress.view';
import CustomButton from '../../../../common/atoms/Button';
import ModalNative from '../../../../common/molecules/Modal';
import CreateAccount from '../../CreateAccount';

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
        <Text>Address Book</Text>
        <CustomButton
          text="Create Account"
          buttonVariation="variable-width"
          onPress={this.openModal}
        />
        <ModalNative isOpen={isOpenBool} onRequestClose={this.openModal} heading="Create Account">
          <CreateAccount />
        </ModalNative>
        <AddNewAddress labels={labels} />
      </View>
    );
  }
}

export { AddressBook as AddressBookVanilla };
export default AddressBook;
