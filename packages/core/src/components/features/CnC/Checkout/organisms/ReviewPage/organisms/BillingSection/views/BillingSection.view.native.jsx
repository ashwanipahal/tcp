import React, { Fragment, PureComponent } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy } from '@tcp/core/src/components/common/atoms';
import Address from '@tcp/core/src/components/common/molecules/Address';
import CardImage from '@tcp/core/src/components/common/molecules/CardImage';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import GenericSkeleton from '@tcp/core/src/components/common/molecules/GenericSkeleton/GenericSkeleton.view.native';
import GiftCardsContainer from '../../../../GiftCardsSection';
import InputCheckbox from '../../../../../../../../common/atoms/InputCheckbox';

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
  SkeletonWrapper,
  SaveVenmoDetails,
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
    card.ccType !== CREDIT_CONSTANTS.ACCEPTED_CREDIT_CARDS.PAYPAL &&
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
export class BillingSection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      saveVenmoPayment: false,
    };
  }

  /**
   * This method saves venmo checkbox state in the redux store
   */
  handleVenmoPaymentSaveChange = () => {
    const { saveVenmoPaymentOption } = this.props;
    this.setState(
      prevState => ({
        saveVenmoPayment: !prevState.saveVenmoPayment,
      }),
      () => {
        const { saveVenmoPayment } = this.state;
        saveVenmoPaymentOption(saveVenmoPayment);
      }
    );
  };

  getVenmoBillingView = () => {
    const {
      labels,
      venmoPayment,
      venmoPayment: { userName },
    } = this.props;
    const { saveVenmoPayment } = this.state;
    return (
      <PaymentMethodWrapper>
        <PaymentMethodImage>
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
            <CardImage card={venmoPayment} cardNumber={userName} />
          </PaymentMethod>
          <BillingAddress>
            <SaveVenmoDetails>
              <InputCheckbox
                execOnChangeByDefault={false}
                isChecked
                input={{ value: saveVenmoPayment, onChange: this.handleVenmoPaymentSaveChange }}
              />
              <BodyCopy
                fontSize="fs14"
                color="gray.900"
                mobileFontFamily="secondary"
                text={labels.lbl_review_save_venmo}
              />
            </SaveVenmoDetails>
          </BillingAddress>
        </PaymentMethodImage>
      </PaymentMethodWrapper>
    );
  };

  render() {
    const {
      card,
      address,
      labels,
      onEdit,
      isExpressCheckout,
      cvvCodeRichText,
      isBillingVisited,
      isPaymentDisabled,
      venmoPayment: { isVenmoPaymentSelected },
    } = this.props;
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
        {!isPaymentDisabled && !isVenmoPaymentSelected && (
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
        {!bagLoading ? (
          <>{!isPaymentDisabled && isVenmoPaymentSelected && this.getVenmoBillingView()}</>
        ) : (
          <>
            <SkeletonWrapper>
              <GenericSkeleton />
            </SkeletonWrapper>
          </>
        )}
        <GiftCardsContainer isFromReview />
      </Fragment>
    );
  }
}

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
  bagLoading: PropTypes.bool.isRequired,
  venmoPayment: PropTypes.shape({}),
  saveVenmoPaymentOption: PropTypes.func,
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
  venmoPayment: {
    userName: '',
  },
  saveVenmoPaymentOption: () => {},
};

export default BillingSection;
