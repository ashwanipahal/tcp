/* eslint-disable complexity */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from './MyPlaceRewardsCreditCardTile.style';
import { getIconPath } from '../../../../../../../utils';
import { Row, Col, BodyCopy, Image } from '../../../../../../common/atoms';
import Button from '../../../../../../common/atoms/Button';
import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';

export const MyPlaceRewardsCreditCardTile = ({ className, labels, myPlaceRewardCard }) => {
  const cardIconMapping = {
    DISC: 'disc-small',
    MC: 'mc-small',
    Amex: 'amex-small',
    Visa: 'visa-small',
    GC: 'gift-card-small',
    'PLACE CARD': 'place-card-small',
    VENMO: 'venmo-blue-acceptance-mark',
  };

  const cardEnrolled = myPlaceRewardCard && myPlaceRewardCard.ccType;
  return (
    <AccountOverviewTile
      target="new"
      title="My Place Rewards Credit Card"
      ctaTitle={cardEnrolled ? 'MANAGE YOUR CARD' : 'APPLY OR ACCEPT OFFER'}
      ctaLink="https://d.comenity.net/childrensplace/?ecid=manageacct"
    >
      <Row fullBleed className={`${className} elem-mb-XL`}>
        <Col
          colSize={{
            small: 6,
            large: 12,
            medium: 8,
          }}
        >
          {cardEnrolled ? (
            <>
              <BodyCopy component="div" className="cardDetailsWrapper">
                <Image
                  className="elem-mr-XS"
                  src={getIconPath(cardIconMapping[myPlaceRewardCard.ccBrand])}
                />
                <BodyCopy component="div" className="cardDescriptionWrapper">
                  <BodyCopy fontSize="fs12" fontFamily="secondary" fontWeight="extrabold">
                    <span>{getLabelValue(labels, 'lbl_overview_card_ending')}</span>
                    <span> </span>
                    <span>{myPlaceRewardCard.accountNo.slice(-4)}</span>
                  </BodyCopy>
                  <BodyCopy fontSize="fs10" fontFamily="secondary">
                    <span>{getLabelValue(labels, 'lbl_overview_expires')}</span>
                    <span> </span>
                    <span>{`0${myPlaceRewardCard.expMonth.trim()}`.slice(-2)}</span>
                    <span>/</span>
                    <span>{myPlaceRewardCard.expYear.slice(-2)}</span>
                  </BodyCopy>
                </BodyCopy>
              </BodyCopy>
              <BodyCopy component="div">
                <BodyCopy className="elem-mt-LRG" fontSize="fs14" fontFamily="secondary">
                  <BodyCopy fontWeight="semibold" component="span">
                    25% OFF
                  </BodyCopy>
                  <BodyCopy component="span"> your kids’ birthdays!</BodyCopy>
                </BodyCopy>

                <BodyCopy className="elem-mt-LRG" fontSize="fs14" fontFamily="secondary">
                  <BodyCopy fontWeight="semibold" component="span">
                    EARN DOUBLE POINTS
                  </BodyCopy>
                  <BodyCopy component="span"> when you check out using your card</BodyCopy>
                </BodyCopy>

                <BodyCopy className="elem-mt-LRG" fontSize="fs14" fontFamily="secondary">
                  <BodyCopy fontWeight="semibold" component="span">
                    EXCLUSIVE BONUS EVENTS
                  </BodyCopy>
                  <BodyCopy>Tripe points, double rewards & more!</BodyCopy>
                </BodyCopy>
              </BodyCopy>
            </>
          ) : (
            <BodyCopy component="div" className="container-top">
              <BodyCopy component="div">
                <BodyCopy fontSize="fs14" fontFamily="secondary" fontWeight="extrabold">
                  Add your card to:
                </BodyCopy>
                <BodyCopy
                  className="list-style"
                  component="u"
                  fontSize="fs14"
                  fontFamily="secondary"
                >
                  <li>Earn 2 pints for every $1 spent</li>
                  <li>Get 25% off birthday savings</li>
                  <li>Check out even faster</li>
                </BodyCopy>
                <BodyCopy component="div" className="elem-mt-LRG">
                  <Button
                    buttonVariation="fixed-width"
                    fill="WHITE"
                    color="GRAY"
                    className="shop-now-btn"
                    data-locator="orders-shop-now-btn"
                  >
                    ADD YOUR CARD
                  </Button>
                </BodyCopy>
              </BodyCopy>
              <BodyCopy fontSize="fs14" fontFamily="secondary" fontWeight="extrabold">
                Don’t have a My Place Rewards Credit Card?
              </BodyCopy>
            </BodyCopy>
          )}
        </Col>
      </Row>
    </AccountOverviewTile>
  );
};

MyPlaceRewardsCreditCardTile.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({
    lbl_overview_paymentHeading: PropTypes.string,
    lbl_overview_paymentCTA: PropTypes.string,
  }),
  myPlaceRewardCard: PropTypes.shape({}),
};

MyPlaceRewardsCreditCardTile.defaultProps = {
  className: '',
  labels: {
    lbl_overview_paymentHeading: '',
    lbl_overview_paymentCTA: '',
  },
  myPlaceRewardCard: {},
};

export default withStyles(MyPlaceRewardsCreditCardTile, styles);
export { MyPlaceRewardsCreditCardTile as MyPlaceRewardsCreditCardTileVanilla };
