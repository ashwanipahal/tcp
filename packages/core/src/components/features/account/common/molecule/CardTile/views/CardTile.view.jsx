import React from 'react';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Badge from '../../../../../../common/atoms/Badge';
import Address from '../../../../../../common/molecules/Address';
import Anchor from '../../../../../../common/atoms/Anchor';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../CardTile.style';
import { getIconPath } from '../../../../../../../utils';
import PAYMENT_CONSTANTS from '../../../../Payment/Payment.constants';

// @flow
type Props = {
  card: object,
  className: string,
  labels: object,
  setDefaultPaymentMethod: Function,
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
        <div className="cardTile__ctaLinks">
          {!isVenmo && (
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
          <Anchor
            fontSizeVariation="large"
            underline
            to="/#"
            anchorVariation="primary"
            dataLocator="payment-delete"
          >
            {labels.ACC_LBL_DELETE}
          </Anchor>
        </div>
      </div>
    );
  }
}

export default withStyles(CardTile, styles);
