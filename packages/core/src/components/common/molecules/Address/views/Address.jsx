// @flow
import React from 'react';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';

type Props = {
  address: {
    firstName: string,
    lastName: string,
    addressLine: string[],
    city: ?string,
    state: ?string,
    zipCode: ?string,
    country: ?string,
    phone1: ?string,
  },
  className: string,
};

/**
 * @function Address The address component will render an address
 * that is constructed from the address prop passed.
 * @param {string} className The class name for the component
 * @param {object} address address object
 */
const Address = ({ address, className }: Props) => (
  <BodyCopy
    tag="div"
    bodySize="three"
    color="primary"
    fontFamily="secondaryFontFamily"
    className={className}
  >
    <BodyCopy tag="p" fontWeight="bold">
      {`${address.firstName} ${address.lastName}`}
    </BodyCopy>
    {address.addressLine.map(addressLine => (
      <BodyCopy tag="p">{addressLine}</BodyCopy>
    ))}
    <BodyCopy tag="p">
      {`${address.city || ''}, ${address.state || ''} ${address.zipCode || ''}`}
    </BodyCopy>
    {address.country && <BodyCopy tag="p">{address.country}</BodyCopy>}
    {address.phone1 && <BodyCopy tag="p">{address.phone1}</BodyCopy>}
  </BodyCopy>
);

export default Address;
