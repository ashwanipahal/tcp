import React from 'react';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import styles from '../Offers.style';
import withStyles from '../../../../../../common/hoc/withStyles';
import RichText from '../../../../../../common/atoms/RichText';

// @flow

type Props = {
  labels: Object,
  className: String,
};

const Offers = ({ labels, className }: Props) => {
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
          <RichText richTextHtml={labels.ACC_PAYMNET_BANNER_LABEL} />
        </Col>
      </Row>
    </div>
  );
};

export default withStyles(Offers, styles);
export { Offers as OffersVanilla };
