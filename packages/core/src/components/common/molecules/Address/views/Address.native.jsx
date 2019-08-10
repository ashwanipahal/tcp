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

const getAddressfromDiffLines = ({ address }: GetAddressLineProps, { customStyle }) => {
  return (
    <React.Fragment>
      <BodyCopy
        fontSize="fs16"
        mobilefontFamily={['secondary']}
        fontWeight="regular"
        text={address.addressLine1}
        {...customStyle}
      />
      <BodyCopy
        fontSize="fs16"
        mobilefontFamily={['secondary']}
        fontWeight="regular"
        text={address.addressLine2}
        {...customStyle}
      />
    </React.Fragment>
  );
};

const getAddessLines = ({ address, customStyle }) => {
  return address.addressLine
    .filter(al => al.trim() !== '')
    .map(addressLine => (
      <BodyCopy
        fontSize="fs16"
        mobilefontFamily={['secondary']}
        fontWeight="regular"
        text={addressLine}
        {...customStyle}
      />
    ));
};

/**
 * @function Address The address component will render an address
 * that is constructed from the address prop passed.
 * @param {string} className The class name for the component
 * @param {object} address address object
 */

const Address = ({
  address,
  dataLocatorPrefix,
  showPhone,
  showCountry,
  customStyle,
  showName,
}: Props) =>
  address && (
    <View>
      {showName && (
        <BodyCopy
          fontSize="fs16"
          mobilefontFamily={['secondary']}
          fontWeight="semibold"
          text={`${address.firstName} ${address.lastName}`}
          {...customStyle}
        />
      )}
      {address.addressLine
        ? getAddessLines({ address, dataLocatorPrefix, customStyle })
        : getAddressfromDiffLines({ address, dataLocatorPrefix }, { customStyle })}
      <BodyCopy
        mobilefontFamily={['secondary']}
        fontWeight="regular"
        text={`${address.city}, ${address.state} ${address.zipCode}`}
        {...customStyle}
      />
      {showCountry && address.country && (
        <BodyCopy
          fontSize="fs16"
          mobilefontFamily={['secondary']}
          fontWeight="regular"
          text={address.country}
          {...customStyle}
        />
      )}
      {showPhone && address.phone1 && (
        <BodyCopy
          fontSize="fs16"
          mobilefontFamily={['secondary']}
          fontWeight="regular"
          text={address.phone1}
          {...customStyle}
        />
      )}
    </View>
  );

Address.defaultProps = {
  showPhone: true,
  showCountry: true,
  customStyle: {},
};

export default Address;
