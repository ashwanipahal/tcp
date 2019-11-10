import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';

import { getLabelValue } from '@tcp/core/src/utils/utils';

import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import Heading from '../../../../common/atoms/Heading';
import AddressSkeleton from '../../../../common/molecules/Address/skeleton/AddressSkeleton.view';
import styles from '../styles/CardViewSkeleton.style';

const CardViewSkeleton = ({ className, labels }) => {
  return (
    <div className={className}>
      <Row>
        <Col
          colSize={{
            small: 6,
            large: 5,
            medium: 4,
          }}
        >
          <Row>
            <Col
              colSize={{
                small: 6,
                large: 12,
                medium: 8,
              }}
            >
              <Heading
                variant="h6"
                className="cardList__heading"
                dataLocator="payment-creditAndDebitCardsLabel"
              >
                {getLabelValue(labels, 'lbl_payment_ccHeading', 'paymentGC')}
              </Heading>
            </Col>
          </Row>
          <Row className="col-border-color">
            <Col
              colSize={{
                small: 3,
                large: 6,
                medium: 4,
              }}
            >
              <LoaderSkelton width="100%" height="40px" className="elem-mb-LRG" />
              <AddressSkeleton />
            </Col>
            <Col
              colSize={{
                small: 3,
                large: 6,
                medium: 4,
              }}
            >
              <LoaderSkelton width="100%" height="150px" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col
          colSize={{
            small: 6,
            large: 5,
            medium: 4,
          }}
        >
          <Row>
            <Col
              colSize={{
                small: 6,
                large: 12,
                medium: 8,
              }}
            >
              <Heading
                variant="h6"
                className="cardList__heading"
                dataLocator="payment-creditAndDebitCardsLabel"
              >
                {getLabelValue(labels, 'lbl_payment_gcHeading', 'paymentGC')}
              </Heading>
            </Col>
          </Row>
          <Row className="col-border-color">
            <Col
              colSize={{
                small: 3,
                large: 6,
                medium: 4,
              }}
            >
              <LoaderSkelton width="100%" height="40px" className="elem-mb-LRG" />
              <AddressSkeleton />
            </Col>
            <Col
              colSize={{
                small: 3,
                large: 6,
                medium: 4,
              }}
            >
              <LoaderSkelton width="100%" height="150px" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

CardViewSkeleton.propTypes = {
  labels: PropTypes.string.isRequired,
  className: PropTypes.string,
};

CardViewSkeleton.defaultProps = {
  className: '',
};
export default withStyles(CardViewSkeleton, styles);
export { CardViewSkeleton as CardViewSkeletonVanilla };
