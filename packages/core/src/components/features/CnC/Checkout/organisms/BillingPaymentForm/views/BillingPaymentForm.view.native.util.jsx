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
  DefaultPaymentWrapper,
} from '../styles/BillingPaymentForm.style.native';

const getCardDetailsMethod = (labels, setFormToEditState, editMode, scope) => {
  return (
    <CardDetailHeader>
      {labels.cardDetailsTitle ? (
        <BodyCopy
          fontFamily="primary"
          fontSize="fs26"
          fontWeight="regular"
          spacingStyles="margin-bottom-MED"
          color="gray.900"
          dataLocator="cardDetailLbl"
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
            onPress={e => setFormToEditState(scope, e)}
            text={labels.edit}
          />
        </CardDetailEdit>
      ) : null}
    </CardDetailHeader>
  );
};

const getDefaultPayment = (selectedCard, labels, isSpace) => {
  return !selectedCard.defaultInd && labels.defaultPayment ? (
    <DefaultPaymentWrapper isSpace={isSpace}>
      <Field
        id="primary"
        name={isSpace ? 'isDefault' : 'defaultPayment'}
        component={InputCheckbox}
        dataLocator="defaultPaymentChkBox"
      />
      <DefaultPaymentTextWrapper>
        <BodyCopy
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          text={labels.defaultPayment}
        />
      </DefaultPaymentTextWrapper>
    </DefaultPaymentWrapper>
  ) : null;
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
            dataLocator="billingAddressLbl"
            color="gray.900"
            text={labels.billingAddress}
          />
        </BillingAddressHeader>
      ) : null}
      {selectedCard ? (
        <BillingAddressWrapper>
          {onFileCardKey && (
            <Card card={selectedCard} dataLocator="selectedCardDetail" showAddress />
          )}
        </BillingAddressWrapper>
      ) : null}
    </>
  );
};

export { getCardDetailsMethod, getDefaultPayment, getBillingAddressWrapper };
