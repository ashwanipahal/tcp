// @flow
import React from 'react';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';

type Props = {
  address: Object,
  className: string,
};
const Address = ({ address, className }: Props) => (
  <BodyCopy
    tag="div"
    bodySize="three"
    color="primary"
    fontFamily="secondaryFontFamily"
    className={className}
  >
    <BodyCopy tag="p" fontWeight="bold" noMargin>
      {`${address.firstName} ${address.lastName}`}
    </BodyCopy>
    {address.addressLine.map(addressLine => (
      <BodyCopy tag="p" noMargin>
        {addressLine}
      </BodyCopy>
    ))}
    <BodyCopy tag="p" noMargin>
      {`${address.city} ${address.state} ${address.zipCode}`}
    </BodyCopy>
    <BodyCopy tag="p" noMargin>
      {address.country}
    </BodyCopy>
    <BodyCopy tag="p" noMargin>
      {address.phone1}
    </BodyCopy>
  </BodyCopy>
);

export default Address;
