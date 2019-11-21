import React from 'react';
import PropTypes from 'prop-types';
import Address from '../../Address';

const AddressOption = ({
  className,
  value,
  name,
  showInput,
  address,
  onChange,
  isSelected,
  inputProps,
  fontWeight,
}) => {
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
        <Address address={address} fontWeight={fontWeight} showPhone={false} showCountry={false} />
      </label>
    );
  }
  return (
    <div className={className}>
      <Address address={address} fontWeight={fontWeight} showPhone={false} showCountry={false} />
    </div>
  );
};

AddressOption.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  showInput: PropTypes.bool.isRequired,
  address: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func,
  isSelected: PropTypes.bool.isRequired,
  inputProps: PropTypes.shape({}),
  fontWeight: PropTypes.string,
};

AddressOption.defaultProps = {
  value: '',
  name: '',
  onChange: () => {},
  inputProps: {},
  fontWeight: '',
};

export default AddressOption;
