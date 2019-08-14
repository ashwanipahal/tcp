/* eslint-disable complexity */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
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
      title={labels.lbl_overview_paymentHeading}
      ctaTitle={labels.lbl_overview_paymentCTA}
    >
      <div className={className}>
        {/* Credit card list */}
        <BodyCopy component="div" className="heading">
          <Row fullBleed>
            <Col
              colSize={{
                small: 5,
                large: 10,
                medium: 7,
              }}
            >
              <BodyCopy
                component="div"
                fontSize="fs14"
                fontWeight="extrabold"
                fontFamily="secondary"
              >
                {labels.lbl_overview_default_creditCard}
              </BodyCopy>
            </Col>
            <Col
              colSize={{
                small: 1,
                large: 2,
                medium: 1,
              }}
            >
              {creditCardDefault && creditCardDefault.ccType ? (
                <Anchor fontSizeVariation="medium" underline anchorVariation="primary">
                  {labels.lbl_overview_addressBookEdit}
                </Anchor>
              ) : (
                <Anchor fontSizeVariation="medium" underline anchorVariation="primary">
                  {labels.lbl_overview_addressBookAdd}
                </Anchor>
              )}
            </Col>
          </Row>

          <Row fullBleed className="elem-mb-XL">
            <Col
              colSize={{
                small: 5,
                large: 10,
                medium: 7,
              }}
            >
              {creditCardDefault && creditCardDefault.ccType ? (
                <BodyCopy component="div" className="cardDetailsWrapper">
                  <BodyCopy component="span" className="imageWrapper">
                    <Image
                      className="creditCardDefault__img"
                      src={getIconPath(cardIconMapping[creditCardDefault.ccBrand])}
                    />
                  </BodyCopy>
                  <BodyCopy component="span" className="cardDescriptionWrapper">
                    <BodyCopy component="span" className="cardNumberWrapper">
                      <BodyCopy
                        component="span"
                        fontSize="fs12"
                        fontFamily="secondary"
                        fontWeight="extrabold"
                      >
                        {labels.lbl_overview_card_ending}
                      </BodyCopy>
                      <BodyCopy
                        component="span"
                        fontSize="fs12"
                        fontFamily="secondary"
                        fontWeight="extrabold"
                      >
                        {creditCardDefault.accountNo.slice(-4)}
                      </BodyCopy>
                    </BodyCopy>
                    <BodyCopy component="span" className="cardExpiryWrapper">
                      <BodyCopy component="span" fontSize="fs12" fontFamily="secondary">
                        {labels.lbl_overview_expires}
                      </BodyCopy>
                      <BodyCopy component="span" fontSize="fs12" fontFamily="secondary">
                        {creditCardDefault.expMonth}
                        {'/'}
                        {creditCardDefault.expYear.slice(-2)}
                      </BodyCopy>
                    </BodyCopy>
                  </BodyCopy>
                </BodyCopy>
              ) : (
                <BodyCopy fontSize="fs14" fontFamily="secondary">
                  {labels.lbl_overview_add_creditCard}
                </BodyCopy>
              )}
            </Col>
          </Row>
        </BodyCopy>

        {/* Venmo card list */}
        {venmoCardList && venmoCardList.ccBrand && (
          <BodyCopy component="div" className="elem-mt-LRG">
            <Row fullBleed>
              <Col
                colSize={{
                  small: 5,
                  large: 10,
                  medium: 7,
                }}
              >
                <BodyCopy
                  component="div"
                  fontSize="fs14"
                  fontWeight="extrabold"
                  fontFamily="secondary"
                >
                  {labels.lbl_overview_venmo}
                </BodyCopy>
              </Col>
              <Col
                colSize={{
                  small: 1,
                  large: 2,
                  medium: 1,
                }}
              >
                <Anchor fontSizeVariation="medium" underline anchorVariation="primary">
                  {labels.lbl_overview_addressBookEdit}
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
                <BodyCopy component="div">
                  <Image
                    className="venmoCardList_img"
                    src={getIconPath(cardIconMapping[venmoCardList.ccBrand])}
                  />
                </BodyCopy>
              </Col>
            </Row>
          </BodyCopy>
        )}

        {/* Gift card list */}
        <BodyCopy component="div" className="elem-mt-LRG">
          <Row fullBleed>
            <Col
              colSize={{
                small: 5,
                large: 10,
                medium: 7,
              }}
            >
              <BodyCopy
                component="div"
                fontSize="fs14"
                fontWeight="extrabold"
                fontFamily="secondary"
              >
                {labels.lbl_overview_giftCard}
              </BodyCopy>
            </Col>
            <Col
              colSize={{
                small: 1,
                large: 2,
                medium: 1,
              }}
            >
              {giftCardList && giftCardList.ccType ? (
                <Anchor fontSizeVariation="medium" underline anchorVariation="primary">
                  {labels.lbl_overview_addressBookEdit}
                </Anchor>
              ) : (
                <Anchor fontSizeVariation="medium" underline anchorVariation="primary">
                  {labels.lbl_overview_addressBookAdd}
                </Anchor>
              )}
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
              {giftCardList && giftCardList.ccType ? (
                <BodyCopy component="div" className="cardDetailsWrapper">
                  <BodyCopy component="span" className="imageWrapper">
                    <Image
                      className="giftCardList_img"
                      src={getIconPath(cardIconMapping[giftCardList.ccBrand])}
                    />
                  </BodyCopy>
                  <BodyCopy component="span" className="cardDescriptionWrapper">
                    <BodyCopy component="span" className="cardNumberWrapper">
                      <BodyCopy
                        component="span"
                        fontSize="fs12"
                        fontFamily="secondary"
                        fontWeight="extrabold"
                      >
                        {labels.lbl_overview_card_ending}
                      </BodyCopy>
                      <BodyCopy
                        component="span"
                        fontSize="fs12"
                        fontFamily="secondary"
                        fontWeight="extrabold"
                      >
                        {giftCardList.accountNo.slice(-4)}
                      </BodyCopy>
                    </BodyCopy>
                  </BodyCopy>
                </BodyCopy>
              ) : (
                <BodyCopy fontSize="fs14" fontFamily="secondary">
                  {labels.lbl_overview_add_giftCard}
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
