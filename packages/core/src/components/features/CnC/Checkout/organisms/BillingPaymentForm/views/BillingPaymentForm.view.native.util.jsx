import React from 'react';
import { Field } from 'redux-form';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import Card from '../../../../../../common/molecules/Card/views/Card.native';

import {
  CardDetailHeader,
  CardDetailEdit,
  BillingAddressHeader,
  BillingAddressWrapper,
  DefaultPaymentTextWrapper,
} from '../styles/BillingPaymentForm.style.native';

const getCardDetailsMethod = (labels, setFormToEditState, editMode) => {
  return (
    <CardDetailHeader>
      {labels.cardDetailsTitle ? (
        <BodyCopy
          fontFamily="primary"
          fontSize="fs26"
          fontWeight="regular"
          spacingStyles="margin-bottom-MED"
          color="gray.900"
          data-locator="billing-payment-details"
          text={labels.cardDetailsTitle}
        />
      ) : null}
      {labels.edit && !editMode ? (
        <CardDetailEdit>
          <Anchor
            underline
            anchorVariation="primary"
            fontSizeVariation="small"
            noLink
            href=""
            target=""
            onPress={e => setFormToEditState(e)}
            text={labels.edit}
          />
        </CardDetailEdit>
      ) : null}
    </CardDetailHeader>
  );
};

const getDefaultPayment = (selectedCard, labels) => {
  return (
    <BillingAddressHeader>
      {!selectedCard.defaultInd && labels.defaultPayment ? (
        <>
          <Field
            id="primary"
            name="primary"
            component={InputCheckbox}
            dataLocator="abilling-payment-checkbox-field"
          />
          <DefaultPaymentTextWrapper>
            <BodyCopy
              mobileFontFamily="secondary"
              fontSize="fs14"
              fontWeight="regular"
              text={labels.defaultPayment}
            />
          </DefaultPaymentTextWrapper>
        </>
      ) : null}
    </BillingAddressHeader>
  );
};

const getBillingAddressWrapper = (selectedCard, onFileCardKey, labels) => {
  return (
    <>
      {labels.billingAddress ? (
        <BillingAddressHeader>
          <BodyCopy
            mobileFontFamily="primary"
            fontSize="fs16"
            fontWeight="extrabold"
            dataLocator="billing-payment-billingAddress"
            color="gray.900"
            text={labels.billingAddress}
          />
        </BillingAddressHeader>
      ) : null}
      {selectedCard ? (
        <BillingAddressWrapper>
          {onFileCardKey && (
            <Card card={selectedCard} dataLocatorPrefix="billing-payment-card-detail" showAddress />
          )}
        </BillingAddressWrapper>
      ) : null}
    </>
  );
};

export { getCardDetailsMethod, getDefaultPayment, getBillingAddressWrapper };
