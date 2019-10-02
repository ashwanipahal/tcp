/* eslint-disable complexity */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from './PaymentOverviewTile.style';
import { getIconPath } from '../../../../../../../utils';
import { Row, Col, BodyCopy, Image } from '../../../../../../common/atoms';
import Anchor from '../../../../../../common/atoms/Anchor';
import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';

export const PaymentOverviewTile = ({
  className,
  labels,
  creditCardDefault,
  giftCardList,
  venmoCardList,
}) => {
  const cardIconMapping = {
    DISC: 'disc-small',
    MC: 'mc-small',
    Amex: 'amex-small',
    Visa: 'visa-small',
    GC: 'gift-card-small',
    'PLACE CARD': 'place-card-small',
    VENMO: 'venmo-blue-acceptance-mark',
  };
  return (
    <AccountOverviewTile
      title={getLabelValue(labels, 'lbl_overview_paymentHeading')}
      ctaTitle={getLabelValue(labels, 'lbl_overview_paymentCTA')}
      ctaLink="/account?id=payment"
      ctaPath="/account/payment"
    >
      <div className={className}>
        <div className="heading">
          <div className="section-heading">
            <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
              {getLabelValue(labels, 'lbl_overview_default_creditCard')}
            </BodyCopy>
            {creditCardDefault && creditCardDefault.ccType ? (
              <Anchor
                fontSizeVariation="large"
                underline
                anchorVariation="primary"
                to="/account?id=payment"
                asPath="/account/payment"
              >
                {getLabelValue(labels, 'lbl_overview_addressBookEdit')}
              </Anchor>
            ) : (
              <Anchor
                fontSizeVariation="large"
                underline
                anchorVariation="primary"
                to="/account?id=payment"
                asPath="/account/payment"
              >
                {getLabelValue(labels, 'lbl_overview_addressBookAdd')}
              </Anchor>
            )}
          </div>
          {/* Credit card list */}
          <Row fullBleed className="elem-mb-XL">
            <Col
              colSize={{
                small: 6,
                large: 12,
                medium: 8,
              }}
            >
              {creditCardDefault && creditCardDefault.ccType ? (
                <BodyCopy component="div" className="cardDetailsWrapper">
                  <Image
                    className="elem-mr-XS"
                    src={getIconPath(cardIconMapping[creditCardDefault.ccBrand])}
                  />
                  <BodyCopy component="div" className="cardDescriptionWrapper">
                    <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="extrabold">
                      <span>{getLabelValue(labels, 'lbl_overview_card_ending')}</span>
                      <span> </span>
                      <span>{creditCardDefault.accountNo.slice(-4)}</span>
                    </BodyCopy>
                    <BodyCopy fontSize="fs10" fontFamily="secondary">
                      <span>{getLabelValue(labels, 'lbl_overview_expires')}</span>
                      <span> </span>
                      <span>{`0${creditCardDefault.expMonth.trim()}`.slice(-2)}</span>
                      <span>/</span>
                      <span>{creditCardDefault.expYear.slice(-2)}</span>
                    </BodyCopy>
                  </BodyCopy>
                </BodyCopy>
              ) : (
                <BodyCopy fontSize="fs14" fontFamily="secondary">
                  {getLabelValue(labels, 'lbl_overview_add_creditCard')}
                </BodyCopy>
              )}
            </Col>
          </Row>
        </div>
        {/* Venmo card list */}
        {venmoCardList && venmoCardList.ccBrand && (
          <div className="heading venmo-tile">
            <BodyCopy component="div" className="elem-mt-LRG">
              <Row fullBleed>
                <Col
                  colSize={{
                    small: 6,
                    large: 12,
                    medium: 8,
                  }}
                  className="section-heading"
                >
                  <BodyCopy
                    component="div"
                    fontSize="fs14"
                    fontWeight="extrabold"
                    fontFamily="secondary"
                  >
                    {getLabelValue(labels, 'lbl_overview_venmo')}
                  </BodyCopy>
                  <Anchor
                    fontSizeVariation="large"
                    underline
                    anchorVariation="primary"
                    to="/account?id=payment"
                    asPath="/account/payment"
                  >
                    {getLabelValue(labels, 'lbl_overview_addressBookEdit')}
                  </Anchor>
                </Col>
              </Row>
              <Row fullBleed className="elem-mb-XXL">
                <Col
                  colSize={{
                    small: 5,
                    large: 10,
                    medium: 7,
                  }}
                >
                  <BodyCopy component="div" className="cardDetailsWrapper">
                    <Image
                      className="venmoCardList_img"
                      src={getIconPath(cardIconMapping[venmoCardList.ccBrand])}
                    />
                    <BodyCopy
                      fontSize="fs12"
                      fontFamily="secondary"
                      className="elem-mt-XS elem-ml-SM"
                      fontWeight="extrabold"
                    >
                      {venmoCardList.properties.venmoUserId}
                    </BodyCopy>
                  </BodyCopy>
                </Col>
              </Row>
            </BodyCopy>
          </div>
        )}

        {/* Gift card list */}
        <BodyCopy component="div" className="elem-mt-LRG">
          <div className="section-heading">
            <BodyCopy component="div" fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
              {getLabelValue(labels, 'lbl_overview_giftCard')}
            </BodyCopy>
            {giftCardList && giftCardList.ccType ? (
              ''
            ) : (
              <Anchor
                fontSizeVariation="large"
                underline
                anchorVariation="primary"
                to="/account?id=payment"
                asPath="/account/payment"
              >
                {getLabelValue(labels, 'lbl_overview_addressBookAdd')}
              </Anchor>
            )}
          </div>
          <Row fullBleed className="elem-mb-XXL">
            <Col
              colSize={{
                small: 5,
                large: 10,
                medium: 7,
              }}
            >
              {giftCardList && giftCardList.ccType ? (
                <BodyCopy component="div" className="cardDetailsWrapper">
                  <Image
                    className="elem-mr-XS"
                    src={getIconPath(cardIconMapping[giftCardList.ccBrand])}
                  />
                  <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="extrabold">
                    <span>{getLabelValue(labels, 'lbl_overview_card_ending')}</span>
                    <span> </span>
                    <span>{giftCardList.accountNo.slice(-4)}</span>
                  </BodyCopy>
                </BodyCopy>
              ) : (
                <BodyCopy fontSize="fs14" fontFamily="secondary">
                  {getLabelValue(labels, 'lbl_overview_add_giftCard')}
                </BodyCopy>
              )}
            </Col>
          </Row>
        </BodyCopy>
      </div>
    </AccountOverviewTile>
  );
};

PaymentOverviewTile.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({
    lbl_overview_paymentHeading: PropTypes.string,
    lbl_overview_paymentCTA: PropTypes.string,
  }),
  creditCardDefault: PropTypes.shape({}),
  giftCardList: PropTypes.shape({}),
  venmoCardList: PropTypes.shape({}),
};

PaymentOverviewTile.defaultProps = {
  className: '',
  labels: {
    lbl_overview_paymentHeading: '',
    lbl_overview_paymentCTA: '',
  },
  creditCardDefault: {},
  giftCardList: {},
  venmoCardList: {},
};

export default withStyles(PaymentOverviewTile, styles);
export { PaymentOverviewTile as PaymentOverviewTileVanilla };
