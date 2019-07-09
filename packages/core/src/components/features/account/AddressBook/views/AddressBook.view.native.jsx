import React from 'react';
import { ParentContainer, StyledText } from '../styles/AddressBook.style.native'; //eslint-disable-line
import { Text } from 'react-native'; //eslint-disable-line

export default class AddressBook extends React.PureComponent<Props> {
  render() {
    return (
      <ParentContainer>
        <StyledText>Address Book</StyledText>
      </ParentContainer>
    );
  }
}
