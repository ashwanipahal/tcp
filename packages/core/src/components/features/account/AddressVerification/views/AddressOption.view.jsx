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
};
const AddressOption = ({
  className,
  value,
  name,
  showInput,
  address,
  onChange,
  isSelected,
}: Props) => {
  if (showInput) {
    return (
      <label className={className} htmlFor={value}>
        <input
          id={value}
          value={value}
          type="radio"
          name={name}
          checked={isSelected}
          onChange={onChange}
          className="elem--mr__MED"
        />
        <Address address={address} />
      </label>
    );
  }
  return (
    <div className={className}>
      <Address address={address} />
    </div>
  );
};

export default AddressOption;
