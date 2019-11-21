import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import styles from '../Offers.style';
import withStyles from '../../../../../../common/hoc/withStyles';
import Espot from '../../../../../../common/molecules/Espot';

const Offers = ({ labels, className }) => {
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
          <Espot richTextHtml={labels.ACC_PAYMNET_BANNER_LABEL} />
        </Col>
      </Row>
    </div>
  );
};

Offers.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
};

export default withStyles(Offers, styles);
export { Offers as OffersVanilla };
