import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../atoms/BodyCopy';
import Badge from '../../../atoms/Badge';
import CardImage from '../../CardImage';
import withStyles from '../../../hoc/withStyles';
import CardStyle from '../Card.style';

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

const Card = ({
  card,
  className,
  dataLocatorPrefix,
  fontWeight,
  isDefault,
  cardNumber,
  showAddress,
  labels,
}) =>
  card && (
    <BodyCopy component="div" fontSize="fs16" color="text.primary" className={className}>
      <BodyCopy component="div" fontFamily="secondary" className="card-title">
        <BodyCopy
          component="p"
          fontWeight={fontWeight}
          fontFamily="secondary"
          className="card-name"
          data-locator={dataLocatorPrefix ? `${dataLocatorPrefix}-fullname` : ''}
        >
          {`${card.addressDetails.firstName} ${card.addressDetails.lastName}`}
        </BodyCopy>
        {isDefault ? (
          <Badge
            showCheckmark
            dataLocator="card-carddefaultbadge"
            noMargin
            className="card-carddefaultbadge"
          >
            {labels.defaultCard}
          </Badge>
        ) : (
          ''
        )}
      </BodyCopy>
      {showAddress ? (
        getAddressfromDiffLines(card.addressDetails, dataLocatorPrefix)
      ) : (
        <BodyCopy component="div" fontFamily="secondary">
          <CardImage card={card} cardNumber={cardNumber} />
        </BodyCopy>
      )}
      {showAddress && getFormattedAddress(card.addressDetails, dataLocatorPrefix)}
      {showAddress && card.addressDetails.country && (
        <BodyCopy component="p" fontFamily="secondary">
          {card.addressDetails.country}
        </BodyCopy>
      )}
    </BodyCopy>
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

export default withStyles(Card, CardStyle);
export { Card as CardVanilla };
