import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Heading from '../../../../common/atoms/Heading';
import EmptyCard from '../../common/molecule/EmptyCard/views/EmptyCard.view';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/CardList.style';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import { CardView } from './Card.view';
import Router from 'next/router'; //eslint-disable-line
import utils from '../../../../../utils';

// @flow

// type Props = {
//   labels: object,
//   giftCardList: Array<object>,
//   className: string,
//   setDeleteModalMountState: Function,
//   deleteModalMountedState: false,
//   onDeleteCard: Function,
//   showUpdatedNotificationOnModal: any,
//   onGetBalanceCard: Function,
//   checkbalanceValueInfo: any,
//   showNotification: boolean,
//   showNotificationCaptcha: boolean,
//   setSelectedCard: string,
// };

const onAddGiftCardClick = () => {
  utils.routerPush(
    '/account?id=payment&subSection=add-gift-card',
    '/account/payment/add-gift-card'
  );
};

const GiftCardList = ({
  labels,
  giftCardList,
  className,
  setDeleteModalMountState,
  deleteModalMountedState,
  onDeleteCard,
  showUpdatedNotificationOnModal,
  onGetBalanceCard,
  checkbalanceValueInfo,
  showNotification,
  showNotificationCaptcha,
  setSelectedCard,
}: Props) => {
  return (
    <div className={className}>
      <Heading
        variant="h6"
        className="cardList__heading"
        dataLocator="payment-gcAndMerchandiseCards"
      >
        {getLabelValue(labels, 'lbl_payment_gcHeading', 'paymentGC')}
      </Heading>
      {giftCardList.size === 0 && (
        <EmptyCard labels={labels} icon="gift-card" alt="gift card icon" prefix="GC" />
      )}
      <Row fullBleed>
        <Col
          colSize={{
            large: 4,
            medium: 4,
            small: 6,
          }}
          className={`${giftCardList.size !== 0 ? 'payment__addBtn__cont' : ''}`}
        >
          <Button
            buttonVariation="fixed-width"
            fill="BLUE"
            dataLocator="payment-addagiftcard"
            className="cardList__ccAddCta"
            onClick={onAddGiftCardClick}
          >
            {giftCardList.size === 0
              ? getLabelValue(labels, 'lbl_payment_GCEmptyAddBtn', 'paymentGC')
              : getLabelValue(labels, 'lbl_payment_addBtn', 'paymentGC')}
          </Button>
        </Col>
      </Row>
      {giftCardList.size !== 0 && (
        <CardView
          labels={labels}
          deleteModalMountedState={deleteModalMountedState}
          setDeleteModalMountState={setDeleteModalMountState}
          onDeleteCard={onDeleteCard}
          showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
          cardList={giftCardList}
          onGetBalanceCard={onGetBalanceCard}
          checkbalanceValueInfo={checkbalanceValueInfo}
          showNotification={showNotification}
          showNotificationCaptcha={showNotificationCaptcha}
          setSelectedCard={setSelectedCard}
        />
      )}
    </div>
  );
};

GiftCardList.defaultProps = {
  deleteModalMountedState: false,
};

GiftCardList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  giftCardList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string.isRequired,
  setDeleteModalMountState: PropTypes.func.isRequired,
  deleteModalMountedState: PropTypes.bool,
  onDeleteCard: PropTypes.func.isRequired,
  showUpdatedNotificationOnModal: PropTypes.string.isRequired,
  onGetBalanceCard: PropTypes.func.isRequired,
  checkbalanceValueInfo: PropTypes.string.isRequired,
  showNotification: PropTypes.bool.isRequired,
  showNotificationCaptcha: PropTypes.bool.isRequired,
  setSelectedCard: PropTypes.string.isRequired,
};

export default withStyles(GiftCardList, styles);
export { GiftCardList as GiftCardListVanilla };
