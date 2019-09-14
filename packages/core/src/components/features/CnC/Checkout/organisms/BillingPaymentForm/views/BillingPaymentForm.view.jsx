import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import TextBox from '../../../../../../common/atoms/TextBox';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/BillingPaymentForm.style';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import PaymentMethods from '../../../../common/molecules/PaymentMethods';
import CreditCardDropdown from './CreditCardDropdown.view';
import Card from '../../../../../../common/molecules/Card';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import Button from '../../../../../../common/atoms/Button';
import { Heading } from '../../../../../../common/atoms';
import constants from '../container/CreditCard.constants';
import Anchor from '../../../../../../common/atoms/Anchor';
import CardImage from '../../../../../../common/molecules/Card/views/CardImage';
import CheckoutFooter from '../../../molecules/CheckoutFooter';
import utility from '../../../util/utility';
import { CHECKOUT_ROUTES } from '../../../Checkout.constants';
import Modal from '../../../../../../common/molecules/Modal';
import DropdownList from './CreditCardDropdownList.view';
import getCvvInfo from '../../../molecules/CVVInfo';

export class BillingPaymentForm extends React.PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    cardList: PropTypes.shape({}).isRequired,
    onFileCardKey: PropTypes.string,
    initialValues: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
    cvvCodeRichText: PropTypes.string,
    paymentMethodId: PropTypes.string.isRequired,
    orderHasShipping: PropTypes.bool,
    backLinkPickup: PropTypes.string.isRequired,
    backLinkShipping: PropTypes.string.isRequired,
    nextSubmitText: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: '',
    onFileCardKey: '',
    cvvCodeRichText: null,
    orderHasShipping: false,
  };

  handleEditClick = () => {};

  getCardOptions = (cardList, labels, onFileCardKey) => {
    let cardOptions = cardList.map(card => ({
      value: card.creditCardId,
      title: `${labels.lbl_billing_creditCardEnd}${card.accountNo.slice(-4)} ${
        card.defaultInd ? `(${labels.lbl_billing_default})` : ''
      }`,
      content: (
        <Card
          card={card}
          isDefault={card.defaultInd}
          cardNumber={`${labels.lbl_billing_creditCardEnd}${card.accountNo.slice(-4)}`}
          labels={labels}
          selectedValue={onFileCardKey}
        />
      ),
    }));

    cardOptions = cardOptions.push({
      value: '',
      title: labels.lbl_billing_addCreditHeading,
      content: (
        <Button fullWidth buttonVariation="variable-width" fill="BLACK">
          {labels.lbl_billing_addCreditBtn}
        </Button>
      ),
    });

    return cardOptions;
  };

  getSelectedCard = (cardList, onFileCardKey) => {
    return cardList.find(card => card.creditCardId === onFileCardKey);
  };

  getCreditCardList = cardList =>
    cardList &&
    cardList.size > 0 &&
    cardList.filter(
      card =>
        card.ccType !== constants.ACCEPTED_CREDIT_CARDS.GIFT_CARD &&
        card.ccType !== constants.ACCEPTED_CREDIT_CARDS.VENMO
    );

  getCreditCardDropDown = (options, onClickHandler, activeValue, onClose) => {
    return (
      <>
        <Modal
          fixedWidth
          heading="SELECT CARD"
          overlayClassName="TCPModal__Overlay"
          className="TCPModal__Content_Modal hideOnDesktop"
          onRequestClose={onClose}
          maxWidth="450px"
          minHeight="643px"
          shouldCloseOnOverlayClick={false}
          isOpen
        >
          <DropdownList
            optionsMap={options}
            clickHandler={onClickHandler}
            activeValue={activeValue}
            className="custom-select-dropDownList"
          />
        </Modal>
        <DropdownList
          optionsMap={options}
          clickHandler={onClickHandler}
          activeValue={activeValue}
          className="custom-select-dropDownList hideOnMobile"
        />
      </>
    );
  };

  getCreditCardWrapper = ({
    labels,
    creditCardList,
    selectedCard,
    cvvCodeRichText,
    onFileCardKey,
  }) => {
    return (
      <>
        <Heading
          component="h3"
          variant="listMenu"
          className="cardDropdownHeading"
          dataLocator="billing-payment-bilingcreditcardlabel"
        >
          {labels.lbl_billing_selectFromCard}
        </Heading>
        {creditCardList && creditCardList.size > 0 && labels && (
          <>
            <Row fullBleed className="elem-mb-XL">
              <Col
                colSize={{
                  large: 6,
                  small: 6,
                  medium: 10,
                }}
                className="creditCardForm__addressBook"
              >
                <Field
                  selectListTitle=""
                  name="onFileCardKey"
                  id="onFileCardKey"
                  component={CreditCardDropdown}
                  dataLocator="payment-billingaddressdd"
                  options={this.getCardOptions(creditCardList, labels, onFileCardKey)}
                  childrenComp={(options, onClickHandler, activeValue, onClose) =>
                    this.getCreditCardDropDown(options, onClickHandler, activeValue, onClose)
                  }
                />
              </Col>
            </Row>
            <BodyCopy component="div" fontFamily="secondary" className="billing-payment-details">
              <BodyCopy
                fontFamily="primary"
                fontSize="fs28"
                fontWeight="regular"
                data-locator="billing-payment-details"
                className="elem-mb-XS"
              >
                {labels.lbl_billing_cardDetailsTitle}
              </BodyCopy>
              <Anchor
                fontSizeVariation="medium"
                underline
                to="/#"
                anchorVariation="primary"
                className="billing-payment-edit"
                dataLocator="billing-payment-edit"
                onClick={this.handleEditClick}
              >
                {labels.lbl_billing_editBtn}
              </Anchor>
            </BodyCopy>
            <Heading
              component="h2"
              variant="listMenu"
              className="paymentMethodHeading"
              dataLocator="billing-payment-method"
            >
              {labels.lbl_billing_paymentMethodTitle}
            </Heading>
            <Row fullBleed>
              {selectedCard && (
                <Col
                  colSize={{
                    large: 3,
                    small: 4,
                    medium: 4,
                  }}
                  className="billing-payment-card-info"
                >
                  <CardImage
                    card={selectedCard}
                    cardNumber={`${labels.lbl_billing_creditCardEnd}${selectedCard.accountNo.slice(
                      -4
                    )}`}
                  />
                </Col>
              )}
              {selectedCard && selectedCard.ccType !== constants.ACCEPTED_CREDIT_CARDS.PLACE_CARD && (
                <Col
                  colSize={{
                    large: 3,
                    small: 2,
                    medium: 4,
                  }}
                  className="position-relative cvvCode"
                >
                  <Field
                    placeholder={labels.lbl_billing_cvvCode}
                    name="cvvCode"
                    id="cvvCode"
                    component={TextBox}
                    dataLocator="billing-payment-cvvCode"
                    className="field"
                    showSuccessCheck={false}
                    enableSuccessCheck={false}
                  />
                  <span className="hide-show show-hide-icons">
                    <span className="info-icon-img-wrapper">{getCvvInfo({ cvvCodeRichText })}</span>
                  </span>
                </Col>
              )}
            </Row>
            {selectedCard && !selectedCard.defaultInd && (
              <Row fullBleed className="billing-payment-subHeading default-payment">
                <Field
                  dataLocator="billing-payment-checkbox-field"
                  name="defaultPaymentMethod"
                  component={InputCheckbox}
                  className="default-payment"
                >
                  <BodyCopy
                    dataLocator="billing-payment-default-payment-heading-lbl"
                    fontSize="fs16"
                    fontFamily="secondary"
                    fontWeight="regular"
                  >
                    {labels.lbl_billing_defaultPayment}
                  </BodyCopy>
                </Field>
              </Row>
            )}
            <Row fullBleed className="billing-payment-subHeading">
              <Heading
                component="h2"
                variant="listMenu"
                className="paymentMethodHeading"
                dataLocator="billing-payment-billingAddress"
              >
                {labels.lbl_billing_billingAddress}
              </Heading>
            </Row>
            <Row fullBleed className="elem-mb-XL">
              {onFileCardKey && (
                <Card
                  card={selectedCard}
                  className="CreditCardForm__address"
                  dataLocatorPrefix="billing-payment-card-detail"
                  showAddress
                />
              )}
            </Row>
          </>
        )}
      </>
    );
  };

  render() {
    const {
      className,
      handleSubmit,
      cardList,
      onFileCardKey,
      labels,
      cvvCodeRichText,
      paymentMethodId,
      orderHasShipping,
      backLinkPickup,
      backLinkShipping,
      nextSubmitText,
    } = this.props;
    const creditCardList = this.getCreditCardList(cardList);
    const selectedCard = onFileCardKey ? this.getSelectedCard(cardList, onFileCardKey) : '';

    return (
      <form name={constants.FORM_NAME} noValidate className={className} onSubmit={handleSubmit}>
        <BodyCopy
          fontFamily="primary"
          fontSize="fs28"
          fontWeight="regular"
          data-locator="billing-details"
          className="elem-mb-XS elem-mt-MED"
        >
          {labels.lbl_billing_paymentMethodTitle}
        </BodyCopy>
        <PaymentMethods labels={labels} />
        {paymentMethodId === constants.PAYMENT_METHOD_CREDIT_CARD
          ? this.getCreditCardWrapper({
              labels,
              creditCardList,
              selectedCard,
              cvvCodeRichText,
              onFileCardKey,
            })
          : null}
        <CheckoutFooter
          hideBackLink
          backLinkHandler={() => utility.routeToPage(CHECKOUT_ROUTES.shippingPage)}
          nextButtonText={nextSubmitText}
          backLinkText={orderHasShipping ? backLinkShipping : backLinkPickup}
        />
      </form>
    );
  }
}
const validateMethod = createValidateMethod({
  ...getStandardConfig(['cvvCode']),
});
export default reduxForm({
  form: constants.FORM_NAME, // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(BillingPaymentForm, styles));
export { BillingPaymentForm as BillingPaymentFormVanilla };
