import React from 'react';
import { View, Text } from 'react-native';
import AddGiftCardForm from '../../Payment/AddGiftCard/views/AddGiftCardForm.native';

class AddressBook extends React.PureComponent<Props> {
  render() {
    const { labels } = this.props;
    return (
      <View>
        <Text>{labels.addressBookHeading}</Text>
        <AddGiftCardForm />
      </View>
    );
  }
}

export { AddressBook as AddressBookVanilla };
export default AddressBook;
