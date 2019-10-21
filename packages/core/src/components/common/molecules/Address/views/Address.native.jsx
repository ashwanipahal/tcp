import React from 'react';
import PropTypes from 'prop-types';
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

const getAddressfromDiffLines = ({ address }: GetAddressLineProps, { customStyle, fontSize }) => {
  return (
    <React.Fragment>
      {address.addressLine1 ? (
        <BodyCopy
          fontSize={fontSize}
          mobilefontFamily={['secondary']}
          fontWeight="regular"
          text={address.addressLine1}
          color="gray.900"
          {...customStyle}
        />
      ) : null}
      {address.addressLine2 ? (
        <BodyCopy
          fontSize={fontSize}
          mobilefontFamily={['secondary']}
          fontWeight="regular"
          text={address.addressLine2}
          color="gray.900"
          {...customStyle}
        />
      ) : null}
    </React.Fragment>
  );
};

const getAddessLines = ({ address, customStyle, fontSize }) => {
  return address.addressLine
    .filter(al => al && al.trim() !== '')
    .map(addressLine => (
      <BodyCopy
        fontSize={fontSize}
        fontFamily="secondary"
        fontWeight="regular"
        text={addressLine}
        color="gray.900"
        {...customStyle}
      />
    ));
};

const getNameFromAddress = (address, customStyle, showDefaultText, regularName) => {
  const name = `${address.firstName} ${address.lastName} ${showDefaultText ? '(Default)' : ''}`;
  return (
    <BodyCopy
      fontSize="fs14"
      fontFamily="secondary"
      fontWeight={regularName ? 'regular' : 'semibold'}
      text={name}
      color="gray.900"
      {...customStyle}
    />
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
  dataLocatorPrefix,
  showPhone,
  showCountry,
  customStyle,
  showName,
  showDefaultText,
  fontSize,
  regularName,
}: Props) => {
  return address ? (
    <View>
      {showName && getNameFromAddress(address, customStyle, showDefaultText, regularName)}
      {address.addressLine
        ? getAddessLines({ address, dataLocatorPrefix, customStyle, fontSize })
        : getAddressfromDiffLines({ address, dataLocatorPrefix }, { customStyle, fontSize })}
      <BodyCopy
        fontSize={fontSize}
        fontFamily="secondary"
        fontWeight="regular"
        text={`${address.city ? `${address.city}, ` : ''}${
          address.state ? `${address.state} ` : ''
        }${address.zipCode}`}
        color="gray.900"
        {...customStyle}
      />
      {showCountry && address.country && (
        <BodyCopy
          fontSize={fontSize}
          fontFamily="secondary"
          fontWeight="regular"
          text={address.country}
          color="gray.900"
          {...customStyle}
        />
      )}
      {showPhone && address.phone1 && (
        <BodyCopy
          fontSize={fontSize}
          fontFamily="secondary"
          fontWeight="regular"
          text={address.phone1}
          color="gray.900"
          {...customStyle}
        />
      )}
    </View>
  ) : null;
};

Address.propTypes = {
  showName: PropTypes.bool,
  customStyle: PropTypes.shape({}),
  showDefaultText: PropTypes.bool,
  fontSize: PropTypes.string,
  regularName: PropTypes.bool,
};

Address.defaultProps = {
  showPhone: true,
  showCountry: true,
  showName: true,
  customStyle: {},
  showDefaultText: false,
  fontSize: 'fs14',
  regularName: false,
};

export default Address;
