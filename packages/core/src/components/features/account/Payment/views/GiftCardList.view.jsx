import React from 'react';
import Heading from '../../../../common/atoms/Heading';
import EmptyCard from '../../common/molecule/EmptyCard/views/EmptyCard.view';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/CardList.style';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import { CardView } from './Card.view';

// @flow

type Props = {
  labels: object,
  giftCardList: Array<object>,
  className: string,
  setDeleteModalMountState: Function,
  deleteModalMountedState: false,
  onDeleteCard: Function,
  showUpdatedNotificationOnModal: any,
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
  showNotification: boolean,
  showNotificationCaptcha: boolean,
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
}: Props) => {
  return (
    <div className={className}>
      <Heading
        variant="h6"
        className="cardList__heading"
        dataLocator="payment-gcAndMerchandiseCards"
      >
        {labels.ACC_LBL_GC_HEADING}
      </Heading>
      {giftCardList.size === 0 && (
        <EmptyCard labels={labels} icon="gift-card" alt="gift card icon" prefix="GC" />
      )}
      <Row fullBleed>
        <Col
          colSize={{
            large: 3,
            medium: 3,
            small: 6,
          }}
        >
          <Button
            buttonVariation="fixed-width"
            fill="BLUE"
            dataLocator="payment-addagiftcard"
            className="cardList__ccAddCta"
          >
            {giftCardList.size === 0 ? labels.ACC_LBL_GC_EMPTY_ADD_BTN : labels.ACC_LBL_ADD_BTN}
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
          giftCardList={giftCardList}
          onGetBalanceCard={onGetBalanceCard}
          checkbalanceValueInfo={checkbalanceValueInfo}
          showNotification={showNotification}
          showNotificationCaptcha={showNotificationCaptcha}
        />
      )}
    </div>
  );
};

export default withStyles(GiftCardList, styles);
export { GiftCardList as GiftCardListVanilla };
