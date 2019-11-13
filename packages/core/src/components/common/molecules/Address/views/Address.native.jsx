import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import BodyCopy from '../../../atoms/BodyCopy';
import { getScreenWidth } from '../../../../../utils/index.native';

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

const style = {
  maxWidth: getScreenWidth() / 2,
};

const getAddressfromDiffLines = ({ address }: GetAddressLineProps, { fontSize }) => {
  return (
    <React.Fragment>
      {address.addressLine1 ? (
        <BodyCopy
          fontSize={fontSize}
          fontFamily="secondary"
          fontWeight="regular"
          text={address.addressLine1}
          color="gray.900"
        />
      ) : null}
      {address.addressLine2 ? (
        <BodyCopy
          fontSize={fontSize}
          fontFamily="secondary"
          fontWeight="regular"
          text={address.addressLine2}
          color="gray.900"
        />
      ) : null}
    </React.Fragment>
  );
};

const getAddessLines = ({ address, fontSize }) => {
  return address.addressLine
    .filter(al => al && al.trim() !== '')
    .map(addressLine => (
      <BodyCopy
        fontSize={fontSize}
        fontFamily="secondary"
        fontWeight="regular"
        text={addressLine}
        color="gray.900"
      />
    ));
};

const getNameFromAddress = (address, showDefaultText, regularName) => {
  const name = `${address.firstName} ${address.lastName} ${showDefaultText ? '(Default)' : ''}`;
  return (
    <BodyCopy
      fontSize="fs14"
      fontFamily="secondary"
      fontWeight={regularName ? 'regular' : 'semibold'}
      text={name}
      color="gray.900"
      style
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
  showName,
  showDefaultText,
  fontSize,
  regularName,
}: Props) => {
  return address ? (
    <View style={style}>
      {showName && getNameFromAddress(address, showDefaultText, regularName)}
      {address.addressLine
        ? getAddessLines({ address, dataLocatorPrefix, fontSize })
        : getAddressfromDiffLines({ address, dataLocatorPrefix }, { fontSize })}
      <BodyCopy
        fontSize={fontSize}
        fontFamily="secondary"
        fontWeight="regular"
        text={`${address.city ? `${address.city}, ` : ''}${
          address.state ? `${address.state} ` : ''
        }${address.zipCode}`}
        color="gray.900"
      />
      {showCountry && !!address.country && (
        <BodyCopy
          fontSize={fontSize}
          fontFamily="secondary"
          fontWeight="regular"
          text={address.country}
          color="gray.900"
        />
      )}
      {showPhone && !!address.phone1 && (
        <BodyCopy
          fontSize={fontSize}
          fontFamily="secondary"
          fontWeight="regular"
          text={address.phone1}
          color="gray.900"
        />
      )}
    </View>
  ) : null;
};

Address.propTypes = {
  showName: PropTypes.bool,
  showDefaultText: PropTypes.bool,
  fontSize: PropTypes.string,
  regularName: PropTypes.bool,
};

Address.defaultProps = {
  showPhone: true,
  showCountry: true,
  showName: true,
  showDefaultText: false,
  fontSize: 'fs14',
  regularName: false,
};

export default Address;
