import React from 'react';
import { View } from 'react-native';
import BodyCopy from '../../../atoms/BodyCopy';

// @flow

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
};

const getAddressfromDiffLines = ({ address }: GetAddressLineProps) => {
  return (
    <React.Fragment>
      <BodyCopy
        fontSize="fs16"
        mobilefontFamily={['secondary']}
        fontWeight="regular"
        text={address.addressLine1}
      />
      <BodyCopy
        fontSize="fs16"
        mobilefontFamily={['secondary']}
        fontWeight="regular"
        text={address.addressLine2}
      />
    </React.Fragment>
  );
};

const getAddessLines = ({ address }) => {
  return address.addressLine
    .filter(al => al.trim() !== '')
    .map(addressLine => (
      <BodyCopy
        fontSize="fs16"
        mobilefontFamily={['secondary']}
        fontWeight="regular"
        text={addressLine}
      />
    ));
};

/**
 * @function Address The address component will render an address
 * that is constructed from the address prop passed.
 * @param {string} className The class name for the component
 * @param {object} address address object
 */

const Address = ({ address, dataLocatorPrefix, showPhone, showCountry }: Props) =>
  address && (
    <View>
      <BodyCopy
        fontSize="fs16"
        mobilefontFamily={['secondary']}
        fontWeight="semibold"
        text={`${address.firstName} ${address.lastName}`}
      />
      {address.addressLine
        ? getAddessLines({ address, dataLocatorPrefix })
        : getAddressfromDiffLines({ address, dataLocatorPrefix })}
      <BodyCopy
        fontSize="fs16"
        mobilefontFamily={['secondary']}
        fontWeight="regular"
        text={`${address.city}, ${address.state} ${address.zipCode}`}
      />
      {showCountry && address.country && (
        <BodyCopy
          fontSize="fs16"
          mobilefontFamily={['secondary']}
          fontWeight="regular"
          text={address.country}
        />
      )}
      {showPhone && address.phone1 && (
        <BodyCopy
          fontSize="fs16"
          mobilefontFamily={['secondary']}
          fontWeight="regular"
          text={address.phone1}
        />
      )}
    </View>
  );

Address.defaultProps = {
  showPhone: true,
  showCountry: true,
};

export default Address;
