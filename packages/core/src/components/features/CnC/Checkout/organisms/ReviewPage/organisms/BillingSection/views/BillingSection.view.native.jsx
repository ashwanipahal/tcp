import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import Address from '@tcp/core/src/components/common/molecules/Address';
import CardImage from '@tcp/core/src/components/common/molecules/CardImage';
import AppliedGiftCards from '../../../molecules/AppliedGiftCards';

/* istanbul ignore next */
import {
  Heading,
  SubHeading,
  PaymentMethod,
  BillingAddress,
  EditLink,
} from '../styles/BillingSection.style.native';

/**
 * @function renderCardNumber
 * @param {Object} card
 * @param {Object} labels
 * @description This method renders the card number string with ending in prefixed
 */
const renderCardNumber = (card, labels) =>
  `${labels.lbl_review_paymentMethodEndingIn} ${card.cardNumber}`;

/**
 * @function BillingSection
 * @param {Object} props
 * @description Billing Section functional component
 */
export const BillingSection = ({ card, address, appliedGiftCards, labels, onEdit }) => {
  return (
    <Fragment>
      <Heading>
        <BodyCopy
          fontSize="fs26"
          mobileFontFamily="primary"
          text={`${labels.lbl_review_billingSectionTitle} `}
        />
        <EditLink>
          <Anchor
            fontSizeVariation="large"
            underline
            anchorVariation="primary"
            onPress={onEdit}
            text={labels.lbl_review_billingEdit}
          />
        </EditLink>
      </Heading>
      {card && (
        <PaymentMethod>
          <SubHeading>
            <BodyCopy
              fontSize="fs16"
              fontWeight="semibold"
              color="gray.900"
              mobileFontFamily="secondary"
              text={labels.lbl_review_paymentMethod}
            />
          </SubHeading>
          <CardImage card={card} cardNumber={renderCardNumber(card, labels)} />
        </PaymentMethod>
      )}
      {address && (
        <BillingAddress>
          <SubHeading>
            <BodyCopy
              fontSize="fs16"
              fontWeight="semibold"
              color="gray.900"
              mobileFontFamily="secondary"
              text={labels.lbl_review_billingAddress}
            />
          </SubHeading>
          <Address address={address} fontSize="fs16" regularName />
        </BillingAddress>
      )}
      {appliedGiftCards && (
        <Fragment>
          <SubHeading>
            <BodyCopy
              fontSize="fs16"
              fontWeight="semibold"
              color="gray.900"
              mobileFontFamily="secondary"
              text={labels.lbl_review_appliedGiftCards}
            />
          </SubHeading>
          <AppliedGiftCards appliedGiftCards={appliedGiftCards} labels={labels} />
        </Fragment>
      )}
    </Fragment>
  );
};

BillingSection.propTypes = {
  card: PropTypes.shape({}),
  address: PropTypes.shape({}),
  appliedGiftCards: PropTypes.shape([]),
  labels: PropTypes.shape({
    lbl_review_billingSectionTitle: PropTypes.string,
    lbl_review_paymentMethod: PropTypes.string,
    lbl_review_billingAddress: PropTypes.string,
    lbl_review_appliedGiftCards: PropTypes.string,
    lbl_review_paymentMethodEndingIn: PropTypes.string,
  }),
  onEdit: PropTypes.func.isRequired,
};

BillingSection.defaultProps = {
  card: null,
  address: null,
  appliedGiftCards: [],
  labels: {
    lbl_review_billingSectionTitle: '',
    lbl_review_paymentMethod: '',
    lbl_review_billingAddress: '',
    lbl_review_appliedGiftCards: '',
    lbl_review_paymentMethodEndingIn: '',
  },
};

export default BillingSection;
