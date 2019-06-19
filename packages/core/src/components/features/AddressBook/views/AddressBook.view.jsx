import React from 'react';
import { AddressBookHeaderComponent, ColoredLine, CSS } from '../styles/AddressBook.style';
import Button from '../../../common/atoms/Button';
import theme from '../../../../../styles/themes/TCP';
import AddressBookTile from './AddressBookTile.view';
import data from '../data';

const { colors } = theme;

const AddressBook = () => {
  return (
    <React.Fragment>
      <AddressBookHeaderComponent>Address Book</AddressBookHeaderComponent>
      <ColoredLine backgroundColor={colors.BLACK} />
      <Button className={CSS.button}>ADD NEW ADDRESS</Button>
      <AddressBookTile data={data} />
    </React.Fragment>
  );
};

export default AddressBook;
