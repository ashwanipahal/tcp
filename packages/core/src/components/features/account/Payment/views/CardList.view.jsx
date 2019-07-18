import React from 'react';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import CardTile from '../../common/molecule/CardTile/views/CardTile.view';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/CardList.style';

// @flow

type Props = {
  labels: {},
  className: string,
  setDeleteModalMountState: Function,
  setSelectedGiftCard: Function,
  onGetBalanceCard: Function,
  checkbalanceValueInfo: any,
  cardList: Array<object>,
  showNotification: boolean,
  showNotificationCaptcha: boolean,
  setDefaultPaymentMethod: Function,
};
export const CardList = ({
  setSelectedGiftCard,
  className,
  setDeleteModalMountState,
  onGetBalanceCard,
  checkbalanceValueInfo,
  labels,
  cardList,
  showNotification,
  showNotificationCaptcha,
  setDefaultPaymentMethod,
}: Props) => {
  return (
    <div>
      <Row fullBleed className={className}>
        {cardList.map((card, index) => (
          <Col
            className="cardList__col"
            key={`container-${card.creditCardId}`}
            colSize={{ large: 4, medium: 4, small: 6 }}
            ignoreGutter={{
              large: (index + 1) % 3 === 0,
              medium: (index + 1) % 2 === 0,
              small: true,
            }}
          >
            <CardTile
              card={card}
              setSelectedGiftCard={setSelectedGiftCard}
              setDeleteModalMountState={setDeleteModalMountState}
              onGetBalanceCard={onGetBalanceCard}
              checkbalanceValueInfo={checkbalanceValueInfo}
              form={`giftcardBalance-${card.creditCardId}`}
              labels={labels}
              showNotification={showNotification}
              showNotificationCaptcha={showNotificationCaptcha}
              setDefaultPaymentMethod={setDefaultPaymentMethod}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default withStyles(CardList, styles);
export { CardList as CardListVanilla };
