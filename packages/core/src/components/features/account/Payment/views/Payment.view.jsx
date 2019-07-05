import React from 'react';
import { List } from 'immutable';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import styles from '../styles/Payment.style';
import Notification from '../../../../common/molecules/Notification';
import { GiftCardView } from './GiftCard.view';
// @flow
type Props = {
  giftCard: List<{}>,
  labels: object,
  className: string,
  showNotification: boolean,
  setDeleteModalMountState: Function,
  deleteModalMountedState: false,
};

const PaymentView = ({
  labels,
  className,
  showNotification,
  setDeleteModalMountState,
  deleteModalMountedState,
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
        <GiftCardView
          labels={labels}
          deleteModalMountedState={deleteModalMountedState}
          setDeleteModalMountState={setDeleteModalMountState}
        />
      </Row>
    </div>
  );
};

export default withStyles(PaymentView, styles);
export { PaymentView as PaymentViewVanilla };
