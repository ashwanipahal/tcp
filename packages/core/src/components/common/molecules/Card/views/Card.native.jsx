import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../atoms/BodyCopy';
import { CardImage } from './CardImage.native';
import withStyles from '../../../hoc/withStyles';
import { HeaderWrapper, HeaderTextWrapper, BadgeWrapper } from '../CardImage.style.native';
import Badge from '../../../atoms/Badge';

/**
 * @function Card The card component will render an card
 * that is constructed from the card prop passed.
 * @param {string} className The class name for the component
 * @param {object} card card object
 */
const getAddressfromDiffLines = (address, dataLocatorPrefix) => {
  return (
    <React.Fragment>
      <BodyCopy
        mobileFontFamily="secondary"
        data-locator={dataLocatorPrefix ? `${dataLocatorPrefix}-addressline1` : ''}
        text={address.addressLine1}
      />
      {address.addressLine2 ? (
        <BodyCopy
          mobileFontFamily="secondary"
          data-locator={dataLocatorPrefix ? `${dataLocatorPrefix}-addressline2` : ''}
          text={address.addressLine2}
        />
      ) : null}
    </React.Fragment>
  );
};

const getFormattedAddress = (address, dataLocatorPrefix) => {
  return (
    <React.Fragment>
      <BodyCopy
        data-locator={dataLocatorPrefix ? `${dataLocatorPrefix}-cityfullname` : ''}
        mobileFontFamily="secondary"
        text={`${address.city ? `${address.city}, ` : ''}${
          address.state ? `${address.state} ` : ''
        }${address.zipCode}`}
      />
    </React.Fragment>
  );
};

const Card = ({
  card,
  dataLocatorPrefix,
  fontWeight,
  isDefault,
  cardNumber,
  showAddress,
  labels,
}) =>
  card && (
    <HeaderWrapper>
      <HeaderTextWrapper>
        <BodyCopy
          fontWeight={fontWeight}
          mobileFontFamily="secondary"
          data-locator={dataLocatorPrefix ? `${dataLocatorPrefix}-fullname` : ''}
          text={`${card.addressDetails.firstName} ${card.addressDetails.lastName}`}
        />
        {isDefault && (
          <BadgeWrapper>
            <Badge showCheckmark dataLocator="creditcard-default">
              {labels.defaultCard}
            </Badge>
          </BadgeWrapper>
        )}
      </HeaderTextWrapper>
      {showAddress ? (
        getAddressfromDiffLines(card.addressDetails, dataLocatorPrefix)
      ) : (
        <CardImage card={card} cardNumber={cardNumber} />
      )}
      {showAddress && getFormattedAddress(card.addressDetails, dataLocatorPrefix)}
      {showAddress && card.addressDetails.country && (
        <BodyCopy mobileFontFamily="secondary" text={card.addressDetails.country} />
      )}
    </HeaderWrapper>
  );

Card.propTypes = {
  card: PropTypes.shape({}),
  className: PropTypes.string,
  dataLocatorPrefix: PropTypes.string,
  fontWeight: PropTypes.string,
  isDefault: PropTypes.bool,
  cardNumber: PropTypes.string,
  showAddress: PropTypes.bool,
  labels: PropTypes.shape({}).isRequired,
  selectedValue: PropTypes.string,
};

Card.defaultProps = {
  isDefault: false,
  cardNumber: '',
  showAddress: false,
  selectedValue: '',
};

export default withStyles(Card);
export { Card as CardVanilla };
