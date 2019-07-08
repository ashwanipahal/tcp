import React from 'react';
import { getIconPath } from '../../../../../../../utils';
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
  const cardIcon = getIconPath('icon-card-smile');
  return (
    <div className={className}>
      <Row fullBleed>
        <Col
          colSize={{
            small: 1,
            large: 1,
            medium: 1,
          }}
        >
          <img alt="card Icon" src={cardIcon} />
        </Col>
        <Col
          colSize={{
            small: 5,
            large: 11,
            medium: 7,
          }}
        >
          <RichText richTextHtml={labels.ACC_LBL_OFFERS_MESSAGE} />
        </Col>
      </Row>
    </div>
  );
};

export default withStyles(Offers, styles);
export { Offers as OffersVanilla };
