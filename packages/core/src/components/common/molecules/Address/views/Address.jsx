import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../atoms/BodyCopy';

const getAddressfromDiffLines = (address, dataLocatorPrefix) => {
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

const getFormattedAddress = (address, dataLocatorPrefix) => {
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
}) =>
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
        : getAddressfromDiffLines(address, dataLocatorPrefix)}
      {getFormattedAddress(address, dataLocatorPrefix)}
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

Address.propTypes = {
  address: PropTypes.shape({}),
  className: PropTypes.string,
  dataLocatorPrefix: PropTypes.string,
  fontWeight: PropTypes.string,
  showPhone: PropTypes.bool,
  showCountry: PropTypes.bool,
  isDefault: PropTypes.bool,
  showName: PropTypes.bool,
};

Address.defaultProps = {
  showPhone: true,
  showCountry: true,
  isDefault: false,
  showName: true,
};

export default Address;
