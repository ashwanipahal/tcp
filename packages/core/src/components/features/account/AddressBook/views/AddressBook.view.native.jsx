import React from 'react';
import { View } from 'react-native';
import StyledText from '../styles/AddressBook.style';

export default class AddressBook extends React.PureComponent<Props> {
  render() {
    return (
      <View>
        <StyledText>Address Book</StyledText>
      </View>
    );
  }
}
