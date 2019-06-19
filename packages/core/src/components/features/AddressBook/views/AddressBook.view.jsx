import React from 'react';
import { ColoredLine, MyStyle } from '../styles/AddressBook.style';
import Button from '../../../common/atoms/Button';
import theme from '../../../../../styles/themes/TCP';
import AddressBookTile from './AddressBookTile.view';
import data from '../data';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Heading, BodyCopy } from '@tcp/core/styles/themes/TCP/typotheme';
const { colors } = theme;

const AddressBook = ({ className }) => {
  return (
    <div className={className}>
      <Heading
        fontFamily="secondaryFontFamily"
        className="add-new-address-button"
        HeadingLarge="six"
        tag="h4"
      >
        Address Book
      </Heading>
      <ColoredLine backgroundColor={colors.BLACK} />
      <Button className="add-new-address-button">ADD NEW ADDRESS</Button>
      <AddressBookTile data={data} />
    </div>
  );
};
export default withStyles(AddressBook, MyStyle);
