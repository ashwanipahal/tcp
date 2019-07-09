import React from 'react';
import StyledText from '../styles/AddressBook.style.native'; //eslint-disable-line
import { Text } from 'react-native'; //eslint-disable-line

export default class AddressBook extends React.PureComponent<Props> {
  render() {
    return <StyledText>Address Book</StyledText>;
  }
}
