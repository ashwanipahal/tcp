import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Badge from '../../../../../../common/atoms/Badge';
import Address from '../../../../../../common/molecules/Address';
import Anchor from '../../../../../../common/atoms/Anchor';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../CardTile.style';
import { getIconPath } from '../../../../../../../utils';
import PAYMENT_CONSTANTS from '../../../../Payment/Payment.constants';
import Recaptcha from '../../../../../../common/molecules/recaptcha/recaptcha';
import TextBox from '../../../../../../common/atoms/TextBox';
import Button from '../../../../../../common/atoms/Button';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
// @flow
type Props = {
  card: object,
  className: string,
  labels: object,
  setDefaultPaymentMethod: Function,
  setDeleteModalMountState: Function,
  setSelectedGiftCard: Function,
  change: any,
  handleSubmit: any,
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
  showNotificationCaptcha: any,
  form: any,
};

class CardTile extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.cardIconMapping = {
      DISC: 'disc-small',
      MC: 'mc-small',
      Amex: 'amex-small',
      Visa: 'visa-small',
      GC: 'gift-card-small',
      'PLACE CARD': 'place-card-small',
    };
    this.paymentMethodId = PAYMENT_CONSTANTS.CREDIT_CARDS_PAYMETHODID;
    this.state = { isTokenDirty: false, HideCaptchaBtn: false };
    this.handleCheckBalanceClick = this.handleCheckBalanceClick.bind(this);
  }

  getMakeDefaultBadge = () => {
    const { card, labels } = this.props;
    return card.defaultInd ? (
      <Badge showCheckmark dataLocator="payment-defpaymentlabel">
        {labels.ACC_LBL_DEFAULT_PAYMENT}
      </Badge>
    ) : (
      <Anchor
        fontSizeVariation="small"
        noLink
        underline
        to="/#"
        anchorVariation="primary"
        dataLocator="payment-makedefault"
        handleLinkClick={this.handleDefaultLinkClick}
      >
        {labels.ACC_LBL_MAKE_DEFAULT}
      </Anchor>
    );
  };

  getAddressDetails = () => {
    const { card } = this.props;
    return (
      card.addressDetails && (
        <Address
          address={card.addressDetails}
          fontWeight="normal"
          showCountry={false}
          showPhone={false}
          dataLocatorPrefix="payment"
        />
      )
    );
  };

  getVenmoUserName = () => {
    const { card } = this.props;
    return (
      card.properties && (
        <BodyCopy
          tag="span"
          fontSize="fs16"
          fontFamily="secondary"
          fontWeight="normal"
          className="cardTile__heading"
          lineHeights="lh107"
          dataLocator="payment-venmoid"
        >
          {card.properties.venmoUserId}
        </BodyCopy>
      )
    );
  };

  getCardDetails = dataLocatorPrefix => {
    const { card, labels } = this.props;
    const cardNum = `${labels.ACC_LBL_CARD_NUM}${card.accountNo.slice(-4)}`;
    const expDate = `${labels.ACC_LBL_EXP_DATE}${card.expMonth.trim()}/${card.expYear}`;
    return (
      <React.Fragment>
        <BodyCopy
          tag="span"
          fontSize="fs14"
          fontFamily="secondary"
          fontWeight="black"
          className="cardTile__number"
          lineHeights="lh107"
          dataLocator={`payment-${dataLocatorPrefix}endingtext`}
        >
          {cardNum}
        </BodyCopy>
        {card.ccType !== 'PLACE CARD' && (
          <BodyCopy
            tag="span"
            fontSize="fs14"
            fontFamily="secondary"
            fontWeight="semibold"
            className="cardTile__expiry"
            lineHeights="lh115"
            dataLocator={`payment-${dataLocatorPrefix}expiretext`}
          >
            {expDate}
          </BodyCopy>
        )}
      </React.Fragment>
    );
  };

  getCardName = () => {
    const { card, labels } = this.props;
    switch (card.ccType) {
      case 'GiftCard':
        return labels.ACC_LBL_GIFT_CARD;
      case 'PLACE CARD':
        return labels.ACC_LBL_PLCC_CARD;
      case 'VENMO':
        return labels.ACC_LBL_VENMO_ACCOUNT;
      default:
        return labels.ACC_LBL_DEFAULT_CARD_NAME;
    }
  };

  onDeletegiftardClick = e => {
    const { card, setDeleteModalMountState, setSelectedGiftCard } = this.props;
    e.preventDefault();
    setSelectedGiftCard(card);
    setDeleteModalMountState({ state: true });
  };

  getDataLocatorPrefix = () => {
    const { card } = this.props;
    switch (card.ccType) {
      case 'GiftCard':
        return 'giftcard';
      case 'VENMO':
        return 'venmo';
      default:
        return 'creditdebit';
    }
  };

  handleRecaptchaVerify = token => {
    const { change } = this.props;
    change('recaptchaToken', token);
    this.setState({ isTokenDirty: false });
  };

  handleRecaptchaExpired = () => {
    const { change } = this.props;
    change('recaptchaToken', '');
  };

  attachReCaptchaRef = ref => {
    this.recaptcha = ref;
  };

  remainBalance = () => {
    const { card, checkbalanceValueInfo, labels } = this.props;
    const { HideCaptchaBtn } = this.state;
    const isCreditCard = card.ccType !== 'GiftCard' && card.ccType !== 'VENMO';
    const isVenmo = card.ccType === 'VENMO';
    return (
      <React.Fragment>
        {HideCaptchaBtn && checkbalanceValueInfo.giftCardNbr === card.accountNo && (
          <BodyCopy
            tag="span"
            fontSize="fs14"
            fontFamily="secondary"
            fontWeight="semibold"
            className=""
            lineHeights="lh115"
          >
            {labels.ACC_LBL_REMAINING_BALANCE}
          </BodyCopy>
        )}
        {HideCaptchaBtn && checkbalanceValueInfo.giftCardNbr === card.accountNo && (
          <BodyCopy
            tag="span"
            fontSize="fs28"
            fontFamily="secondary"
            fontWeight="extrabold"
            className=""
            lineHeights="lh115"
          >
            {checkbalanceValueInfo.giftCardAuthorizedAmt}
          </BodyCopy>
        )}
        {!HideCaptchaBtn && !isVenmo && !isCreditCard && (
          <Button
            onClick={this.handleCheckBalanceClick}
            buttonVariation="variable-width"
            type="submit"
            data-locator="cardtile-checkbalance"
            fill="BLUE"
            disabled={HideCaptchaBtn && !checkbalanceValueInfo.giftCardNbr}
          >
            {labels.ACC_LBL_CHECK_BALANCE}
          </Button>
        )}
      </React.Fragment>
    );
  };

  handleCheckBalanceClick = e => {
    const { isTokenDirty } = this.state;
    const { change, handleSubmit, card } = this.props;
    e.preventDefault();
    if (isTokenDirty) {
      change('recaptchaToken', '');
      this.setState({
        isTokenDirty: false,
      });
      return;
    }

    handleSubmit(formData => {
      const { onGetBalanceCard } = this.props;
      onGetBalanceCard({ formData, card });
      this.setState({
        HideCaptchaBtn: true,
      });
    })();
  };

  handleDefaultLinkClick = event => {
    const { card, setDefaultPaymentMethod } = this.props;
    event.preventDefault();
    const setDefaultPaymentJSON = {
      action: 'U',
      isDefault: 'true',
      addressId: card.addressId || '',
      creditCardId: card.creditCardId,
      billing_firstName: card.addressDetails.firstName,
      billing_lastName: card.addressDetails.lastName,
      billing_phone1: card.addressDetails.phone1 || '',
      billing_address1: card.addressDetails.addressLine1,
      billing_address2: card.addressDetails.addressLine2,
      billing_city: card.addressDetails.city,
      billing_state: card.addressDetails.state,
      billing_addressField3: card.addressDetails.zipCode,
      billing_zipCode: card.addressDetails.zipCode,
      billing_country: card.addressDetails.country,
      billing_nickName: `Billing_10151_${new Date().getTime().toString()}`,
      pay_account: card.accountNo,
      pay_expire_month: (card.expMonth || '').toString(), // on PLCC it's null
      payMethodId: this.paymentMethodId[card.ccBrand.toUpperCase()],
      pay_expire_year: (card.expYear || '').toString(), // on PLCC it's null
      redirecturl: 'AjaxLogonForm',
      viewTaskName: 'RedirectView',
    };
    setDefaultPaymentMethod(setDefaultPaymentJSON);
  };

  loading = () => {
    const { checkbalanceValueInfo, labels } = this.props;
    const { HideCaptchaBtn } = this.state;
    return (
      <React.Fragment>
        {HideCaptchaBtn && !checkbalanceValueInfo.giftCardNbr && (
          <BodyCopy
            tag="span"
            fontSize="fs24"
            fontFamily="secondary"
            fontWeight="extrabold"
            className=""
            lineHeights="lh115"
          >
            {labels.ACC_LBL_LOADING}
          </BodyCopy>
        )}
      </React.Fragment>
    );
  };

  render() {
    const { card, className, labels, showNotificationCaptcha, form } = this.props;
    const { HideCaptchaBtn } = this.state;
    const isCreditCard = card.ccType !== 'GiftCard' && card.ccType !== 'VENMO';
    const isVenmo = card.ccType === 'VENMO';
    const cardName = this.getCardName();
    const cardIcon = getIconPath(this.cardIconMapping[card.ccBrand]);
    const dataLocatorPrefix = this.getDataLocatorPrefix();
    return (
      <div className={className}>
        {showNotificationCaptcha && (
          <Notification
            status="error"
            colSize={{ large: 12, medium: 8, small: 6 }}
            message="INVLAID CAPTCHA"
          />
        )}
        <div className="cardTile">
          <div className="cardTile__cardDetails">
            <BodyCopy
              tag="span"
              fontSize="fs16"
              fontFamily="secondary"
              fontWeight="normal"
              className="cardTile__heading"
              dataLocator={`payment-${dataLocatorPrefix}nametitle`}
            >
              {cardName}
            </BodyCopy>
            {isVenmo ? this.getVenmoUserName() : this.getCardDetails(dataLocatorPrefix)}
            {isCreditCard ? this.getAddressDetails() : null}
          </div>
          <div className="cardTile__defaultSection">
            {isCreditCard ? this.getMakeDefaultBadge() : null}
            <img className="cardTile__img" alt="" src={cardIcon} />
          </div>
        </div>
        <div className="giftcardTile__wrapper">
          <form name={form} onSubmit={this.handleSubmit} autoComplete="off" noValidate>
            <div className="giftcardTile__row">
              {!HideCaptchaBtn && !isVenmo && !isCreditCard && (
                <Recaptcha
                  ref={this.attachReCaptchaRef}
                  onloadCallback={this.handleRecaptchaOnload}
                  verifyCallback={this.handleRecaptchaVerify}
                  expiredCallback={this.handleRecaptchaExpired}
                />
              )}
              <Field
                component={TextBox}
                title=""
                type="hidden"
                placeholder="recaptcha value"
                name="recaptchaToken"
                id="recaptchaToken"
              />
              {this.loading()}
              {this.remainBalance()}
            </div>
          </form>
          <div className="cardTile__ctaLinks">
            {isCreditCard && (
              <Anchor
                fontSizeVariation="large"
                underline
                to="/#"
                anchorVariation="primary"
                dataLocator={`payment-${dataLocatorPrefix}editlink`}
                className="cardTile__anchor"
              >
                {labels.ACC_LBL_EDIT}
              </Anchor>
            )}
            {
              <Anchor
                className="cardTile__anchor"
                fontSizeVariation="large"
                underline
                to="/#"
                anchorVariation="primary"
                dataLocator={`payment-${dataLocatorPrefix}deletelink`}
                onClick={e => this.onDeletegiftardClick(e)}
              >
                {labels.ACC_LBL_DELETE}
              </Anchor>
            }
          </div>
        </div>
      </div>
    );
  }
}
const validateMethod = createValidateMethod(getStandardConfig(['recaptchaToken']));
export default reduxForm({ destroyOnUnmount: false, enableReinitialize: true, ...validateMethod })(
  withStyles(CardTile, styles)
);
