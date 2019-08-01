import React from 'react';
import Heading from '../../../../common/atoms/Heading';
import EmptyCard from '../../common/molecule/EmptyCard/views/EmptyCard.view';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/CardList.style';
import Col from '../../../../common/atoms/Col';
import Row from '../../../../common/atoms/Row';
import { CardView } from './Card.view';

// @flow

type Props = {
  labels: object,
  creditCardList: Array<object>,
  className: string,
  setDefaultPaymentMethod: Function,
  setDeleteModalMountState: Function,
  deleteModalMountedState: false,
  onDeleteCard: Function,
  showUpdatedNotificationOnModal: any,
  showNotification: boolean,
  setSelectedCard: string,
  addCreditCard: () => {},
  editCreditCard: () => {},
};

const CreditCardList = ({
  labels,
  creditCardList,
  className,
  setDefaultPaymentMethod,
  setDeleteModalMountState,
  deleteModalMountedState,
  onDeleteCard,
  showUpdatedNotificationOnModal,
  showNotification,
  setSelectedCard,
  addCreditCard,
  editCreditCard,
}: Props) => {
  return (
    <div className={className}>
      <Heading
        variant="h6"
        className="cardList__heading"
        dataLocator="payment-creditAndDebitCardsLabel"
      >
        {labels.paymentGC.ACC_LBL_CC_HEADING}
      </Heading>
      {creditCardList.size === 0 && (
        <EmptyCard labels={labels} icon="credit-card" alt="card icon" prefix="CC" />
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
            className="cardList__ccAddCta"
            dataLocator="payment-addcreditcard"
            onClick={addCreditCard}
          >
            {creditCardList.size === 0
              ? labels.paymentGC.ACC_LBL_CC_EMPTY_ADD_BTN
              : labels.paymentGC.ACC_LBL_ADD_BTN}
          </Button>
        </Col>
      </Row>
      {creditCardList.size !== 0 && (
        <CardView
          labels={labels}
          deleteModalMountedState={deleteModalMountedState}
          setDeleteModalMountState={setDeleteModalMountState}
          onDeleteCard={onDeleteCard}
          showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
          setDefaultPaymentMethod={setDefaultPaymentMethod}
          cardList={creditCardList}
          showNotification={showNotification}
          setSelectedCard={setSelectedCard}
          editCreditCard={editCreditCard}
        />
      )}
    </div>
  );
};

export default withStyles(CreditCardList, styles);
export { CreditCardList as CreditCardListVanilla };
