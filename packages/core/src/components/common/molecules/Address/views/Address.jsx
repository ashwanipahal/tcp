// @flow
import React from 'react';
import BodyCopy from '../../../atoms/BodyCopy';

type Props = {
  address: {
    firstName: string,
    lastName: string,
    addressLine: string[],
    city: string,
    state: string,
    zipCode: string,
    country: ?string,
    phone1: ?string,
  },
  dataLocatorPrefix: ?string,
  className: string,
  fontWeight: string,
  showPhone?: boolean,
  showCountry?: boolean,
  isDefault?: boolean,
  showName?: boolean,
};

type GetAddressLineProps = {
  address: {
    firstName: string,
    lastName: string,
    addressLine1: string[],
    addressLine2: string[],
    city: string,
    state: string,
    zipCode: string,
    country: ?string,
    phone1: ?string,
  },
  dataLocatorPrefix: ?string,
};

type UserAddressProps = {
  address: {
    firstName: string,
    lastName: string,
    addressLine: string[],
    city: string,
    state: string,
    zipCode: string,
    country: ?string,
    phone1: ?string,
  },
  dataLocatorPrefix: ?string,
};

const getAddressfromDiffLines = ({ address, dataLocatorPrefix }: GetAddressLineProps) => {
  return (
    <React.Fragment>
      <BodyCopy
        fontFamily="secondary"
        tag="p"
        data-locator={dataLocatorPrefix ? `${dataLocatorPrefix}-addressline1` : ''}
      >
        {address.addressLine1}
      </BodyCopy>
      <BodyCopy
        fontFamily="secondary"
        tag="p"
        data-locator={dataLocatorPrefix ? `${dataLocatorPrefix}-addressline2` : ''}
      >
        {address.addressLine2}
      </BodyCopy>
    </React.Fragment>
  );
};

const getAddessLines = ({ address, dataLocatorPrefix }) => {
  return address.addressLine
    .filter(al => al.trim() !== '')
    .map((addressLine, index) => (
      <BodyCopy
        component="p"
        data-locator={dataLocatorPrefix ? `${dataLocatorPrefix}-addressl${index}` : ''}
        fontFamily="secondary"
      >
        {addressLine}
      </BodyCopy>
    ));
};

const getFormattedAddress = ({ address, dataLocatorPrefix }: UserAddressProps) => {
  return (
    <React.Fragment>
      <BodyCopy
        component="p"
        data-locator={dataLocatorPrefix ? `${dataLocatorPrefix}-cityfullname` : ''}
        fontFamily="secondary"
      >
        {`${address.city ? `${address.city}, ` : ''}${address.state ? `${address.state} ` : ''}${
          address.zipCode
        }`}
      </BodyCopy>
    </React.Fragment>
  );
};

/**
 * @function Address The address component will render an address
 * that is constructed from the address prop passed.
 * @param {string} className The class name for the component
 * @param {object} address address object
 */

const Address = ({
  address,
  className,
  dataLocatorPrefix,
  fontWeight,
  showPhone,
  showCountry,
  isDefault,
  showName,
}: Props) =>
  address && (
    <BodyCopy component="div" fontSize="fs14" color="text.primary" className={className}>
      {showName && (
        <BodyCopy
          component="p"
          fontWeight={fontWeight}
          fontFamily="secondary"
          className="addressTile__name"
          data-locator={dataLocatorPrefix ? `${dataLocatorPrefix}-fullname` : ''}
        >
          {`${address.firstName} ${address.lastName}${isDefault ? ' (Default)' : ''}`}
        </BodyCopy>
      )}
      {address.addressLine
        ? getAddessLines({ address, dataLocatorPrefix })
        : getAddressfromDiffLines({ address, dataLocatorPrefix })}
      {getFormattedAddress({ address, dataLocatorPrefix })}
      {showCountry && address.country && (
        <BodyCopy component="p" fontFamily="secondary">
          {address.country}
        </BodyCopy>
      )}
      {showPhone && address.phone1 && (
        <BodyCopy component="p" fontFamily="secondary">
          {address.phone1}
        </BodyCopy>
      )}
    </BodyCopy>
  );

Address.defaultProps = {
  showPhone: true,
  showCountry: true,
  isDefault: false,
  showName: true,
};

export default Address;
