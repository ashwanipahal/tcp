import React from 'react';
import Address from '../../../../../../common/molecules/Address';

// @flow

type Props = {
  className: string,
  value?: string,
  name?: string,
  showInput: boolean,
  address: object,
  onChange?: () => void,
  isSelected: ?boolean,
  inputProps?: object,
};
const AddressOption = ({
  className,
  value,
  name,
  showInput,
  address,
  onChange,
  isSelected,
  inputProps,
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
          className="elem-mr-MED"
          {...inputProps}
        />
        <Address address={address} showPhone={false} showCountry={false} />
      </label>
    );
  }
  return (
    <div className={className}>
      <Address address={address} showPhone={false} showCountry={false} />
    </div>
  );
};

AddressOption.defaultProps = {
  value: '',
  name: '',
  onChange: () => {},
  inputProps: {},
};

export default AddressOption;
