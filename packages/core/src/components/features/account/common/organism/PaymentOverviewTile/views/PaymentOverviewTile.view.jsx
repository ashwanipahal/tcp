import React from 'react';
import PropTypes from 'prop-types';
import { getIconPath } from '../../../../../../../utils';
// import { Image } from '../../../../../../common/atoms';

import { Row, Col, BodyCopy, Image } from '../../../../../../common/atoms';
import Anchor from '../../../../../../common/atoms/Anchor';

import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';

export const PaymentOverviewTile = ({ labels, creditCardDefault, giftCardList, venmoCardList }) => {
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
      {creditCardDefault && creditCardDefault.ccBrand && (
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
                Default Credit Card
              </BodyCopy>
            </Col>
            <Col
              colSize={{
                small: 1,
                large: 2,
                medium: 1,
              }}
            >
              <BodyCopy component="span" fontSize="fs14" fontFamily="secondary">
                <Anchor fontSizeVariation="medium" underline anchorVariation="primary">
                  {labels.lbl_overview_addressBookEdit}
                </Anchor>
              </BodyCopy>
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
              <BodyCopy component="div">
                <Image
                  className="creditCardDefault__img"
                  src={getIconPath(cardIconMapping[creditCardDefault.ccBrand])}
                />
                <BodyCopy component="span" fontSize="fs12" fontFamily="secondary">
                  ending in
                </BodyCopy>
                <BodyCopy component="span" fontSize="fs12" fontFamily="secondary">
                  {creditCardDefault.accountNo.slice(-4)}
                </BodyCopy>
              </BodyCopy>
            </Col>
          </Row>
        </BodyCopy>
      )}

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
                Venmo Card
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

      {giftCardList && giftCardList.ccBrand && (
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
                Gift Card
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
                <BodyCopy component="span">
                  <Image
                    className="giftCardList_img"
                    src={getIconPath(cardIconMapping[giftCardList.ccBrand])}
                  />
                </BodyCopy>
                <BodyCopy component="span" fontSize="fs12" fontFamily="secondary">
                  {'  '}
                  ending in
                </BodyCopy>
                <BodyCopy component="span" fontSize="fs12" fontFamily="secondary">
                  {giftCardList.accountNo.slice(-4)}
                </BodyCopy>
              </BodyCopy>
            </Col>
          </Row>
        </BodyCopy>
      )}
    </AccountOverviewTile>
  );
};

PaymentOverviewTile.propTypes = {
  labels: PropTypes.shape({
    lbl_overview_paymentHeading: PropTypes.string,
    lbl_overview_paymentCTA: PropTypes.string,
  }),
  creditCardDefault: PropTypes.shape({}),
  giftCardList: PropTypes.shape({}),
  venmoCardList: PropTypes.shape({}),
};

PaymentOverviewTile.defaultProps = {
  labels: {
    lbl_overview_paymentHeading: '',
    lbl_overview_paymentCTA: '',
  },
  creditCardDefault: {},
  giftCardList: {},
  venmoCardList: {},
};

export default PaymentOverviewTile;
