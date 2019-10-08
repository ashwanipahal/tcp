import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Heading from '../../../../common/atoms/Heading';
import styles from '../styles/CardList.style';
import withStyles from '../../../../common/hoc/withStyles';
import { CardView } from './Card.view';

// @flow
// type Props = {
//   labels: object,
//   venmoCardList: object,
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

const VenmoCardList = ({
  labels,
  venmoCardList,
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
      <Heading variant="h6" className="cardList__heading" dataLocator="payment-venmocardtile">
        {getLabelValue(labels, 'lbl_payment_venmoHeading', 'paymentGC')}
      </Heading>
      {venmoCardList.size !== 0 && (
        <CardView
          labels={labels}
          deleteModalMountedState={deleteModalMountedState}
          setDeleteModalMountState={setDeleteModalMountState}
          onDeleteCard={onDeleteCard}
          showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
          cardList={venmoCardList}
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

VenmoCardList.defaultProps = {
  deleteModalMountedState: false,
};

VenmoCardList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  venmoCardList: PropTypes.shape({}).isRequired,
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
export default withStyles(VenmoCardList, styles);
export { VenmoCardList as VenmoCardListVanilla };
