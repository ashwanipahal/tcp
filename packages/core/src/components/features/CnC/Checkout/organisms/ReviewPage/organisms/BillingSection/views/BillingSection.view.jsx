import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Anchor, BodyCopy, Col, Row } from '@tcp/core/src/components/common/atoms';
import { Grid } from '@tcp/core/src/components/common/molecules';
import Address from '@tcp/core/src/components/common/molecules/Address';
import CardImage from '@tcp/core/src/components/common/molecules/Card/views/CardImage';
import { getLabelValue } from '@tcp/core/src/utils';
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
  `${getLabelValue(labels, 'lbl_review_paymentMethodEndingIn')} ${card.cardNumber}`;

/**
 * @function BillingSection
 * @param {Object} props
 * @description Billing Section functional component
 */
export const BillingSection = ({ className, card, address, appliedGiftCards, labels }) => {
  return (
    <Grid className={`${className}`}>
      <Row fullBleed>
        <Col colSize={{ small: 12, medium: 12, large: 12 }}>
          <BodyCopy component="span" fontSize="fs28" fontFamily="primary">
            {`${getLabelValue(labels, 'lbl_review_billingSectionTitle')} `}
          </BodyCopy>
          <Anchor
            fontSizeVariation="large"
            underline
            anchorVariation="primary"
            {...CHECKOUT_ROUTES.billingPage}
          >
            {getLabelValue(labels, 'lbl_review_billingEdit')}
          </Anchor>
        </Col>
      </Row>
      <Row fullBleed>
        {(card || address) && (
          <Col colSize={{ small: 12, medium: 6, large: 5 }}>
            {card && (
              <Fragment>
                <BodyCopy
                  fontSize="fs16"
                  fontWeight="semibold"
                  color="gray[900]"
                  fontFamily="secondary"
                  className="sub-heading"
                >
                  {getLabelValue(labels, 'lbl_review_paymentMethod')}
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
                  {getLabelValue(labels, 'lbl_review_billingAddress')}
                </BodyCopy>
                <Address address={address} className="review-billing-address" />
              </Fragment>
            )}
          </Col>
        )}
        <Col colSize={{ small: 12, medium: 6, large: 7 }}>
          {appliedGiftCards && (
            <Fragment>
              <BodyCopy
                fontSize="fs16"
                fontWeight="semibold"
                color="gray[900]"
                fontFamily="secondary"
                className="sub-heading"
              >
                {getLabelValue(labels, 'lbl_review_appliedGiftCards')}
              </BodyCopy>
              <AppliedGiftCards appliedGiftCards={appliedGiftCards} labels={labels} />
            </Fragment>
          )}
        </Col>
      </Row>
    </Grid>
  );
};

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
};

export default withStyles(BillingSection, styles);
