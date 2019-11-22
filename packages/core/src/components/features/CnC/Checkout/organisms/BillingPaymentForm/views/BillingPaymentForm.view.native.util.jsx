import React from 'react';
import { Field } from 'redux-form';
import GenericSkeleton from '@tcp/core/src/components/common/molecules/GenericSkeleton/GenericSkeleton.view.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import Card from '../../../../../../common/molecules/Card/views/Card.native';
import constants from '../container/CreditCard.constants';
import CheckoutBillingAddress from '../../CheckoutBillingAddress';
import { getCreditCardList } from '../../../util/utility';
import {
  CardDetailHeader,
  CardDetailEdit,
  BillingAddressHeader,
  BillingAddressWrapper,
  DefaultPaymentTextWrapper,
  DefaultPaymentWrapper,
  SkeletonWrapper,
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

/**
 * @function getCheckoutBillingAddress
 * @description returns the checkout billing address form
 */
const getCheckoutBillingAddress = scope => (val = {}) => {
  const { editMode } = val;
  const {
    bagLoading,
    isSameAsShippingChecked,
    isEditFormSameAsShippingChecked = false,
  } = scope.props;
  const { selectedOnFileAddressId, userAddresses, labels, cardList, isGuest } = scope.props;
  const { orderHasShipping, addressLabels, editFormSelectedOnFileAddressId } = scope.props;
  const { dispatch, shippingAddress, billingData } = scope.props;
  const { addNewCCState } = scope.state;
  const creditCardList = getCreditCardList({ cardList });
  let formType;
  let addressId;
  if (editMode) {
    formType = constants.EDIT_FORM_NAME;
    addressId = editFormSelectedOnFileAddressId;
  } else {
    formType = constants.FORM_NAME;
    addressId = selectedOnFileAddressId;
  }
  if (!editFormSelectedOnFileAddressId && editMode) {
    addressId = '';
  }
  return !bagLoading ? (
    <CheckoutBillingAddress
      isGuest={isGuest}
      orderHasShipping={orderHasShipping}
      addressLabels={addressLabels}
      dispatch={dispatch}
      shippingAddress={shippingAddress}
      isSameAsShippingChecked={editMode ? isEditFormSameAsShippingChecked : isSameAsShippingChecked}
      labels={labels}
      billingData={billingData}
      userAddresses={userAddresses}
      selectedOnFileAddressId={addressId}
      formName={formType}
      addNewCCState={
        addNewCCState ||
        (!creditCardList && !orderHasShipping) ||
        (creditCardList && creditCardList.size === 0)
      }
      editMode={editMode}
    />
  ) : (
    <SkeletonWrapper>
      <GenericSkeleton />
    </SkeletonWrapper>
  );
};

export {
  getCardDetailsMethod,
  getDefaultPayment,
  getBillingAddressWrapper,
  getCheckoutBillingAddress,
};
