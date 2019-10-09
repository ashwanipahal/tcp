import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Heading from '../../../../common/atoms/Heading';
import EmptyCard from '../../common/molecule/EmptyCard/views/EmptyCard.view';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/CardList.style';
import Col from '../../../../common/atoms/Col';
import Row from '../../../../common/atoms/Row';
import { CardView } from './Card.view';

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
}) => {
  return (
    <div className={className}>
      <Heading
        variant="h6"
        className="cardList__heading"
        dataLocator="payment-creditAndDebitCardsLabel"
      >
        {getLabelValue(labels, 'lbl_payment_ccHeading', 'paymentGC')}
      </Heading>
      {creditCardList.size === 0 && (
        <EmptyCard labels={labels} icon="credit-card" alt="card icon" prefix="CC" />
      )}
      <Row fullBleed>
        <Col
          colSize={{
            large: 4,
            medium: 4,
            small: 6,
          }}
          className={`${creditCardList.size !== 0 ? 'payment__addBtn__cont' : ''}`}
        >
          <Button
            buttonVariation="fixed-width"
            fill="BLUE"
            className="cardList__ccAddCta"
            dataLocator="payment-addcreditcard"
            onClick={addCreditCard}
          >
            {creditCardList.size === 0
              ? getLabelValue(labels, 'lbl_payment_ccEmptyAddBtn', 'paymentGC')
              : getLabelValue(labels, 'lbl_payment_addBtn', 'paymentGC')}
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

CreditCardList.defaultProps = {
  deleteModalMountedState: false,
  addCreditCard: null,
  editCreditCard: null,
};

CreditCardList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  creditCardList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string.isRequired,
  setDefaultPaymentMethod: PropTypes.func.isRequired,
  setDeleteModalMountState: PropTypes.func.isRequired,
  deleteModalMountedState: PropTypes.bool,
  onDeleteCard: PropTypes.func.isRequired,
  showUpdatedNotificationOnModal: PropTypes.string.isRequired,
  showNotification: PropTypes.bool.isRequired,
  setSelectedCard: PropTypes.string.isRequired,
  addCreditCard: PropTypes.func,
  editCreditCard: PropTypes.func,
};
export default withStyles(CreditCardList, styles);
export { CreditCardList as CreditCardListVanilla };
