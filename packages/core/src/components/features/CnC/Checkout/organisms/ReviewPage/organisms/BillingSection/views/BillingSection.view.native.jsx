import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import Address from '@tcp/core/src/components/common/molecules/Address';
import CardImage from '@tcp/core/src/components/common/molecules/CardImage';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import GiftCardsContainer from '../../../../GiftCardsSection';

/* istanbul ignore next */
import {
  Heading,
  SubHeading,
  PaymentMethod,
  BillingAddress,
  EditLink,
  CvvCode,
  CvvTextboxStyle,
  CVVInfo,
  PaymentMethodWrapper,
  PaymentMethodImage,
} from '../styles/BillingSection.style.native';

import getCvvInfo from '../../../../../molecules/CVVInfo';
import CREDIT_CONSTANTS from '../../../../BillingPaymentForm/container/CreditCard.constants';

const getCvvInfoIcon = cvvCodeRichText => {
  return <CVVInfo>{getCvvInfo({ cvvCodeRichText })}</CVVInfo>;
};

const getCvvField = ({ isExpressCheckout, labels, cvvCodeRichText, card, isBillingVisited }) => {
  return (
    isExpressCheckout &&
    card &&
    card.ccType !== CREDIT_CONSTANTS.ACCEPTED_CREDIT_CARDS.PLACE_CARD &&
    !isBillingVisited && (
      <CvvCode>
        <Field
          label={labels.lbl_review_cvvCode}
          name="cvvCode"
          id="cvvCode"
          type="text"
          component={TextBox}
          dataLocator="cvvTxtBox"
          customStyle={CvvTextboxStyle}
        />
        {getCvvInfoIcon(cvvCodeRichText)}
      </CvvCode>
    )
  );
};

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
export const BillingSection = ({
  card,
  address,
  labels,
  onEdit,
  isExpressCheckout,
  cvvCodeRichText,
  isBillingVisited,
  isPaymentDisabled,
}) => {
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
      {!isPaymentDisabled && (
        <PaymentMethodWrapper>
          <PaymentMethodImage>
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
          </PaymentMethodImage>
          {getCvvField({ isExpressCheckout, labels, cvvCodeRichText, card, isBillingVisited })}
        </PaymentMethodWrapper>
      )}
      <GiftCardsContainer isFromReview />
    </Fragment>
  );
};

BillingSection.propTypes = {
  card: PropTypes.shape({}),
  address: PropTypes.shape({}),
  labels: PropTypes.shape({
    lbl_review_billingSectionTitle: PropTypes.string,
    lbl_review_paymentMethod: PropTypes.string,
    lbl_review_billingAddress: PropTypes.string,
    lbl_review_appliedGiftCards: PropTypes.string,
    lbl_review_paymentMethodEndingIn: PropTypes.string,
  }),
  onEdit: PropTypes.func.isRequired,
  isExpressCheckout: PropTypes.bool,
  cvvCodeRichText: PropTypes.string,
  isBillingVisited: PropTypes.bool,
  isPaymentDisabled: PropTypes.bool,
};

BillingSection.defaultProps = {
  card: null,
  address: null,
  labels: {
    lbl_review_billingSectionTitle: '',
    lbl_review_paymentMethod: '',
    lbl_review_billingAddress: '',
    lbl_review_appliedGiftCards: '',
    lbl_review_paymentMethodEndingIn: '',
  },
  isExpressCheckout: false,
  cvvCodeRichText: '',
  isBillingVisited: false,
  isPaymentDisabled: false,
};

export default BillingSection;
