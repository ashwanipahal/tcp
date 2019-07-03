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
};

/**
 * @function Address The address component will render an address
 * that is constructed from the address prop passed.
 * @param {string} className The class name for the component
 * @param {object} address address object
 */
const Address = ({ address, className, dataLocatorPrefix }: Props) => (
  <BodyCopy component="div" fontSize="fs14" color="text.primary" className={className}>
    <BodyCopy
      component="p"
      fontWeight="extrabold"
      fontFamily="secondary"
      dataLocator={dataLocatorPrefix ? `${dataLocatorPrefix}-fullname` : ''}
    >
      {`${address.firstName} ${address.lastName}`}
    </BodyCopy>
    {address.addressLine
      .filter(al => al.trim() !== '')
      .map((addressLine, index) => (
        <BodyCopy
          component="p"
          dataLocator={dataLocatorPrefix ? `${dataLocatorPrefix}-addressl${index}` : ''}
          fontFamily="secondary"
        >
          {addressLine}
        </BodyCopy>
      ))}
    <BodyCopy
      component="p"
      dataLocator={dataLocatorPrefix ? `${dataLocatorPrefix}-cityfullname` : ''}
      fontFamily="secondary"
    >
      {`${address.city}, ${address.state} ${address.zipCode}`}
    </BodyCopy>
    {address.country && (
      <BodyCopy component="p" fontFamily="secondary">
        {address.country}
      </BodyCopy>
    )}
    {address.phone1 && (
      <BodyCopy component="p" fontFamily="secondary">
        {address.phone1}
      </BodyCopy>
    )}
  </BodyCopy>
);

export default Address;
