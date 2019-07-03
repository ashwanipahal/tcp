import React from 'react';
import Address from '../../../../common/molecules/Address';

// @flow

type Props = {
  className: string,
  value: ?string,
  name: ?string,
  showInput: boolean,
  address: object,
  onChange: ?() => void,
  isSelected: ?boolean,
}
const AddressOption = ({ className, value, name, showInput, address, onChange, isSelected }: Props) => {
  if(showInput) {
    return (
      <label className={className} htmlFor={value}>
        <input type="radio" name={name} checked={isSelected} onChange={onChange} />
        <Address address={address} />
      </label>
    )
  }
  return <Address address={address} className={className} />
}

export default AddressOption;
