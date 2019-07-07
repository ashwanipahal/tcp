import React from 'react';
// import { List } from 'immutable';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import styles from '../styles/Payment.style';
import Notification from '../../../../common/molecules/Notification';
import { CardView } from './Card.view';
// @flow
type Props = {
  // giftCard: List<{}>,
  labels: object,
  className: string,
  showNotification: boolean,
  setDeleteModalMountState: Function,
  deleteModalMountedState: false,
  onDeleteCard: Function,
  showUpdatedNotificationOnModal: any,
};

const PaymentView = ({
  labels,
  className,
  showNotification,
  setDeleteModalMountState,
  deleteModalMountedState,
  onDeleteCard,
  showUpdatedNotificationOnModal,
}: Props) => {
  return (
    <div className={className}>
      <Row fullBleed>
        <Col
          colSize={{
            small: 6,
            large: 12,
            medium: 8,
          }}
        >
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="extrabold"
            component="h4"
            className="payment__separator"
          >
            {labels.paymentHeading}
          </BodyCopy>
        </Col>
      </Row>
      <Row fullBleed>
        <Col
          colSize={{
            small: 6,
            large: 12,
            medium: 8,
          }}
        >
          {showNotification && (
            <Notification
              status={showNotification}
              colSize={{ large: 12, medium: 8, small: 6 }}
              message={showNotification === 'success' ? labels.successMessage : labels.errorMessage}
            />
          )}
        </Col>
        <CardView
          labels={labels}
          deleteModalMountedState={deleteModalMountedState}
          setDeleteModalMountState={setDeleteModalMountState}
          onDeleteCard={onDeleteCard}
          showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
        />
      </Row>
    </div>
  );
};

export default withStyles(PaymentView, styles);
export { PaymentView as PaymentViewVanilla };
