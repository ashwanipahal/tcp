import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../EmptyCard.style';
import { getIconPath } from '../../../../../../../utils';

const EmptyCard = ({ labels, className, icon, alt, prefix }) => {
  const heading = getLabelValue(labels, `lbl_payment_${prefix}EmptyHeading`, 'paymentGC');
  const desc = getLabelValue(labels, `lbl_payment_${prefix}EmptyDesc`, 'paymentGC');
  const cardIcon = getIconPath(icon);
  return (
    <div className={className}>
      <Row fullBleed>
        <Col
          colSize={{
            small: 1,
            large: 1,
            medium: 1,
          }}
          className="emptyCard__imgWrapper"
        >
          <img
            className="emptyCard__img"
            alt={alt}
            src={cardIcon}
            data-locator={`payment-${prefix}-Icon`}
          />
        </Col>
        <Col
          colSize={{
            small: 5,
            large: 11,
            medium: 7,
          }}
          ignoreGutter={{
            small: true,
            medium: false,
            large: false,
          }}
          className="emptyCard__body"
        >
          <BodyCopy
            tag="p"
            fontSize="fs14"
            fontFamily="secondary"
            fontWeight="semibold"
            lineHeight="lh107"
            className="emptyCard__heading"
          >
            {heading}
          </BodyCopy>
          <BodyCopy
            tag="p"
            fontSize="fs14"
            fontFamily="secondary"
            lineHeight="lh115"
            className="emptyCard__description--desktop"
          >
            {desc}
          </BodyCopy>
        </Col>
        <Col
          colSize={{
            small: 6,
            large: 11,
            medium: 7,
          }}
          ignoreGutter={{
            small: true,
            medium: false,
            large: false,
          }}
          className="emptyCard__description--mobile"
        >
          <BodyCopy
            tag="p"
            fontSize="fs14"
            fontFamily="secondary"
            lineHeight="lh115"
            className="emptyCard__description--mobile"
          >
            {desc}
          </BodyCopy>
        </Col>
      </Row>
    </div>
  );
};

EmptyCard.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
};
export default withStyles(EmptyCard, styles);
export { EmptyCard as EmptyCardVanilla };
