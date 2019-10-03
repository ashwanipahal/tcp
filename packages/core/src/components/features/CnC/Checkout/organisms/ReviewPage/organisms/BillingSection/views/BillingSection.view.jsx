import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Anchor, BodyCopy, Col, Row } from '@tcp/core/src/components/common/atoms';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import { Grid } from '@tcp/core/src/components/common/molecules';
import Address from '@tcp/core/src/components/common/molecules/Address';
import CardImage from '@tcp/core/src/components/common/molecules/CardImage';
import AppliedGiftCards from '../../../molecules/AppliedGiftCards';
import { CHECKOUT_ROUTES } from '../../../../../Checkout.constants';

import styles from '../styles/BillingSection.style';

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

  render() {
    const {
      className,
      card,
      address,
      appliedGiftCards,
      labels,
      venmoPayment,
      venmoPayment: { isVenmoPaymentSelected, venmoSaveToAccountDisplayed, userName },
    } = this.props;
    const { saveVenmoPayment } = this.state;
    return (
      <Grid className={`${className}`}>
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <BodyCopy component="span" fontSize="fs28" fontFamily="primary">
              {`${labels.lbl_review_billingSectionTitle} `}
            </BodyCopy>
            <Anchor
              fontSizeVariation="large"
              underline
              anchorVariation="primary"
              {...CHECKOUT_ROUTES.billingPage}
            >
              {labels.lbl_review_billingEdit}
            </Anchor>
          </Col>
        </Row>
        <Row fullBleed>
          {(card || address) && (
            <Col colSize={{ small: 6, medium: 4, large: 5 }}>
              {card && !isVenmoPaymentSelected && (
                <Fragment>
                  <BodyCopy
                    fontSize="fs16"
                    fontWeight="semibold"
                    color="gray[900]"
                    fontFamily="secondary"
                    className="sub-heading"
                  >
                    {labels.lbl_review_paymentMethod}
                  </BodyCopy>
                  <BodyCopy>
                    <CardImage card={card} cardNumber={renderCardNumber(card, labels)} />
                  </BodyCopy>
                </Fragment>
              )}
              {address && (
                <Fragment>
                  <BodyCopy
                    fontSize="fs16"
                    fontWeight="semibold"
                    color="gray[900]"
                    fontFamily="secondary"
                    className="sub-heading"
                  >
                    {labels.lbl_review_billingAddress}
                  </BodyCopy>
                  <Address address={address} className="review-billing-address" />
                </Fragment>
              )}
            </Col>
          )}
          <Col
            colSize={{ small: 6, medium: 4, large: 6 }}
            offsetRight={{ small: 0, medium: 0, large: 1 }}
          >
            {appliedGiftCards && (
              <Fragment>
                <BodyCopy
                  fontSize="fs16"
                  fontWeight="semibold"
                  color="gray[900]"
                  fontFamily="secondary"
                  className="sub-heading"
                >
                  {labels.lbl_review_appliedGiftCards}
                </BodyCopy>
                <AppliedGiftCards appliedGiftCards={appliedGiftCards} labels={labels} />
              </Fragment>
            )}
          </Col>
          {isVenmoPaymentSelected && (
            <Col
              colSize={{ small: 6, medium: 4, large: 6 }}
              offsetRight={{ small: 0, medium: 0, large: 1 }}
            >
              <BodyCopy
                fontSize="fs16"
                fontWeight="semibold"
                color="gray[900]"
                fontFamily="secondary"
                className="sub-heading"
              >
                {labels.lbl_review_paymentMethod}
              </BodyCopy>
              <section className="venmo-payment-method-wrapper">
                <CardImage card={venmoPayment} cardNumber={userName} />
              </section>

              <div className="venmo-save-wrapper">
                {venmoSaveToAccountDisplayed && (
                  <InputCheckbox
                    component={InputCheckbox}
                    className="venmo-save-checkbox"
                    name="save-venmo-data"
                    input={{ value: saveVenmoPayment, onChange: this.handleVenmoPaymentSaveChange }}
                  >
                    <BodyCopy fontSize="fs14" fontFamily="secondary">
                      {labels.lbl_review_save_venmo}
                    </BodyCopy>
                  </InputCheckbox>
                )}
              </div>
            </Col>
          )}
        </Row>
      </Grid>
    );
  }
}

BillingSection.propTypes = {
  card: PropTypes.shape({}),
  address: PropTypes.shape({}),
  appliedGiftCards: PropTypes.shape([]),
  className: PropTypes.string,
  labels: PropTypes.shape({
    lbl_review_billingSectionTitle: PropTypes.string,
    lbl_review_paymentMethod: PropTypes.string,
    lbl_review_billingAddress: PropTypes.string,
    lbl_review_appliedGiftCards: PropTypes.string,
    lbl_review_paymentMethodEndingIn: PropTypes.string,
  }),
  venmoPayment: PropTypes.shape({}),
  saveVenmoPaymentOption: PropTypes.func,
};

BillingSection.defaultProps = {
  card: null,
  address: null,
  appliedGiftCards: [],
  className: '',
  labels: {
    lbl_review_billingSectionTitle: '',
    lbl_review_paymentMethod: '',
    lbl_review_billingAddress: '',
    lbl_review_appliedGiftCards: '',
    lbl_review_paymentMethodEndingIn: '',
  },
  venmoPayment: {
    userName: '',
  },
  saveVenmoPaymentOption: () => {},
};

export default withStyles(BillingSection, styles);
