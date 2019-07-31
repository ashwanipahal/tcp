import React from 'react';
import { View } from 'react-native';
import StyledText from '../styles/AddressBook.style';
import CustomButton from '../../../../common/atoms/Button';
import ModalNative from '../../../../common/molecules/Modal';
import CreateAccount from '../../CreateAccount';

export default class AddressBook extends React.PureComponent<Props> {
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
    return (
      <View>
        <StyledText>Address Book</StyledText>
        <CustomButton text="login" buttonVariation="variable-width" onPress={this.openModal} />
        <ModalNative isOpen={isOpenBool} onRequestClose={this.openModal} heading="Create Account">
          <CreateAccount />
        </ModalNative>
      </View>
    );
  }
};

export { AddressBook as AddressBookVanilla };
