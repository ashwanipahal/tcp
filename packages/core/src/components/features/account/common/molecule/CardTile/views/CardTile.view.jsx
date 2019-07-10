import React from 'react';
import { Field, reduxForm } from 'redux-form';
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
import { required } from '../../../../../../../utils/FormValidation';

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
    this.handleDefaultLinkClick = this.handleDefaultLinkClick.bind(this);
    this.getMakeDefaultBadge = this.getMakeDefaultBadge.bind(this);
    this.getAddressDetails = this.getAddressDetails.bind(this);
    this.getVenmoUserName = this.getVenmoUserName.bind(this);
    this.getCardDetails = this.getCardDetails.bind(this);
    this.getCardName = this.getCardName.bind(this);
    this.state = {
      isTokenDirty: false,
      HideCaptchaBtn: false,
    };
    this.handleCheckBalanceClick = this.handleCheckBalanceClick.bind(this);
  }

  getMakeDefaultBadge() {
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
  }

  getAddressDetails() {
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
  }

  getVenmoUserName() {
    const { card } = this.props;
    return (
      card.properties && (
        <BodyCopy
          tag="span"
          fontSize="fs16"
          fontFamily="secondary"
          fontWeight="normal"
          className="cardTile__heading"
        >
          {card.properties.venmoUserId}
        </BodyCopy>
      )
    );
  }

  getCardDetails() {
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
          >
            {expDate}
          </BodyCopy>
        )}
      </React.Fragment>
    );
  }

  getCardName() {
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
  }

  onDeletegiftardClick = e => {
    const { card, setDeleteModalMountState, setSelectedGiftCard } = this.props;
    e.preventDefault();
    setSelectedGiftCard(card);
    setDeleteModalMountState({ state: true });
  };

  handleRecaptchaVerify = token => {
    const { change } = this.props;

    change('recaptchaToken', token);

    this.setState({
      isTokenDirty: false,
    });
  };

  handleRecaptchaExpired = () => {
    const { change } = this.props;
    change('recaptchaToken', '');
  };

  attachReCaptchaRef = ref => {
    this.recaptcha = ref;
  };

  handleCheckBalanceClick(e) {
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
  }

  handleDefaultLinkClick(event) {
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
  }

  render() {
    const { card, className, labels } = this.props;
    const { checkbalanceValueInfo } = this.props;
    const { HideCaptchaBtn } = this.state;
    const isCreditCard = card.ccType !== 'GiftCard' && card.ccType !== 'VENMO';
    const isVenmo = card.ccType === 'VENMO';
    const cardName = this.getCardName();
    const cardIcon = getIconPath(this.cardIconMapping[card.ccBrand]);
    return (
      <div className={className}>
        <div className="cardTile">
          <div className="cardTile__cardDetails">
            <BodyCopy
              tag="span"
              fontSize="fs16"
              fontFamily="secondary"
              fontWeight="normal"
              className="cardTile__heading"
            >
              {cardName}
            </BodyCopy>
            {isVenmo ? this.getVenmoUserName() : this.getCardDetails()}
            {isCreditCard ? this.getAddressDetails() : null}
          </div>
          <div className="cardTile__defaultSection">
            {isCreditCard ? this.getMakeDefaultBadge() : null}
            <img className="cardTile__img" alt="" src={cardIcon} />
          </div>
        </div>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="giftcardTile__row">
            {!HideCaptchaBtn && (
              <Recaptcha
                ref={this.attachReCaptchaRef}
                onloadCallback={this.handleRecaptchaOnload}
                verifyCallback={this.handleRecaptchaVerify}
                expiredCallback={this.handleRecaptchaExpired}
              />
            )}
            {HideCaptchaBtn && (
              <BodyCopy
                tag="span"
                fontSize="fs14"
                fontFamily="secondary"
                fontWeight="semibold"
                className=""
                lineHeights="lh115"
              >
                Remaining balance
              </BodyCopy>
            )}
            <BodyCopy
              tag="span"
              fontSize="fs28"
              fontFamily="secondary"
              fontWeight="bold"
              className=""
              lineHeights="lh115"
            >
              {checkbalanceValueInfo.giftCardAuthorizedAmt}
            </BodyCopy>
            <Field
              component={TextBox}
              title=""
              type="hidden"
              placeholder="recaptcha value"
              validate={[required]}
              name="recaptchaToken"
            />
            {!HideCaptchaBtn && (
              <Button
                onClick={this.handleCheckBalanceClick}
                buttonVariation="variable-width"
                type="submit"
                data-locator="cardtile-checkbalance"
                fill="BLUE"
              >
                Check Balance
              </Button>
            )}
            <div className="cardTile__ctaLinks">
              {isCreditCard && (
                <Anchor
                  fontSizeVariation="large"
                  underline
                  to="/#"
                  anchorVariation="primary"
                  dataLocator="payment-edit"
                >
                  {labels.ACC_LBL_EDIT}
                </Anchor>
              )}

              {
                <Anchor
                  fontSizeVariation="large"
                  underline
                  to="/#"
                  anchorVariation="primary"
                  dataLocator="payment-delete"
                  onClick={e => this.onDeletegiftardClick(e)}
                >
                  delete
                </Anchor>
              }
            </div>
          </div>
        </form>
      </div>
    );
  }
}

// export default withStyles(CardTile, styles);

export default withStyles(
  reduxForm({
    form: 'CardTile', // a unique identifier for this form
  })(CardTile),
  styles
);
