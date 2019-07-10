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
}: Props) => (
  <BodyCopy component="div" fontSize="fs14" color="text.primary" className={className}>
    <BodyCopy
      component="p"
      fontWeight={fontWeight}
      fontFamily="secondary"
      dataLocator={dataLocatorPrefix ? `${dataLocatorPrefix}-fullname` : ''}
    >
      {`${address.firstName} ${address.lastName}`}
    </BodyCopy>
    {address.addressLine
      ? address.addressLine
          .filter(al => al.trim() !== '')
          .map((addressLine, index) => (
            <BodyCopy
              component="p"
              dataLocator={dataLocatorPrefix ? `${dataLocatorPrefix}-addressl${index}` : ''}
              fontFamily="secondary"
            >
              {addressLine}
            </BodyCopy>
          ))
      : null}
    {!address.addressLine && (
      <React.Fragment>
        <BodyCopy tag="p">{address.addressLine1}</BodyCopy>
        <BodyCopy tag="p">{address.addressLine2}</BodyCopy>
      </React.Fragment>
    )}
    <BodyCopy
      component="p"
      dataLocator={dataLocatorPrefix ? `${dataLocatorPrefix}-cityfullname` : ''}
      fontFamily="secondary"
    >
      {`${address.city}, ${address.state} ${address.zipCode}`}
    </BodyCopy>
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
};

export default Address;
