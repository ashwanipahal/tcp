/* eslint-disable complexity */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import utils from '@tcp/core/src/utils';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from './MyPlaceRewardsCreditCardTile.style';
import { getIconPath } from '../../../../../../../utils';
import { Row, Col, BodyCopy, Image } from '../../../../../../common/atoms';
import Button from '../../../../../../common/atoms/Button';
import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';
import internalEndpoints from '../../../internalEndpoints';
import { cardIconMapping } from '../../../molecule/CardTile/views/CardTile.utils';
import externalEndpoints from '../../../externalEndpoints';

const getAddYourCardToLabels = labels => {
  return Object.keys(labels).filter(labelKey => /lbl_overview_addYourCardToPoint/.test(labelKey));
};

export const MyPlaceRewardsCreditCardTile = ({
  className,
  labels,
  myPlaceRewardCard,
  openModal,
}) => {
  const cardEnrolled = myPlaceRewardCard && myPlaceRewardCard.ccType;
  const addYourCardLabelKeys = getAddYourCardToLabels(labels);
  return (
    <AccountOverviewTile
      target="new"
      title={getLabelValue(labels, 'lbl_overview_myPlaceRewardsCardHeading')}
      ctaTitle={
        cardEnrolled
          ? getLabelValue(labels, 'lbl_overview_manageYourCard')
          : getLabelValue(labels, 'lbl_overview_applyOrAcceptOffer')
      }
      ctaLink={externalEndpoints.managePlaceCardPage}
      linkClick={openModal}
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
              <BodyCopy component="div" className="cardDetailsWrapper elem-pt-SM">
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
                    {getLabelValue(labels, 'lbl_overview_25Off')}
                  </BodyCopy>
                  <BodyCopy component="span">
                    {getLabelValue(labels, 'lbl_overview_yourKidsBirthdays')}
                  </BodyCopy>
                </BodyCopy>

                <BodyCopy className="elem-mt-LRG" fontSize="fs14" fontFamily="secondary">
                  <BodyCopy fontWeight="semibold" component="span">
                    {getLabelValue(labels, 'lbl_overview_earnDoublePoints')}
                  </BodyCopy>
                  <BodyCopy component="span">
                    {getLabelValue(labels, 'lbl_overview_whenYouCheckout')}
                  </BodyCopy>
                </BodyCopy>

                <BodyCopy className="elem-mt-LRG" fontSize="fs14" fontFamily="secondary">
                  <BodyCopy fontWeight="semibold" component="span">
                    {getLabelValue(labels, 'lbl_overview_exclusiveBonusEvents')}
                  </BodyCopy>
                  <BodyCopy>
                    {getLabelValue(labels, 'lbl_overview_tripePointsDoubleRewards')}
                  </BodyCopy>
                </BodyCopy>
              </BodyCopy>
            </>
          ) : (
            <BodyCopy component="div" className="container-top">
              <BodyCopy component="div">
                <BodyCopy fontSize="fs14" fontFamily="secondary" fontWeight="extrabold">
                  {getLabelValue(labels, 'lbl_overview_addYourCardTo')}
                </BodyCopy>
                <BodyCopy
                  className="list-style"
                  component="u"
                  fontSize="fs14"
                  fontFamily="secondary"
                >
                  {addYourCardLabelKeys.map(labelKey => {
                    return <li>{labels[labelKey]}</li>;
                  })}
                </BodyCopy>
                <BodyCopy component="div" className="elem-mt-LRG">
                  <Button
                    onClick={() =>
                      utils.routerPush(
                        internalEndpoints.paymentPage.link,
                        internalEndpoints.paymentPage.path
                      )
                    }
                    buttonVariation="fixed-width"
                    fill="WHITE"
                    color="GRAY"
                    className="shop-now-btn"
                    data-locator="orders-shop-now-btn"
                  >
                    {getLabelValue(labels, 'lbl_overview_addYourCard')}
                  </Button>
                </BodyCopy>
              </BodyCopy>
              <BodyCopy fontSize="fs14" fontFamily="secondary" fontWeight="extrabold">
                {getLabelValue(labels, 'lbl_overview_dontHaveMyPlaceCard')}
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
  openModal: PropTypes.func.isRequired,
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
