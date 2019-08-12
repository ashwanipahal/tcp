import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Row, Col, BodyCopy } from '@tcp/core/src/components/common/atoms';
import style from '../styles/ItemAvailability.style';

class ItemAvailability extends React.PureComponent {
  render() {
    const { errorMsg, className } = this.props;
    return (
      <>
        <div className={className}>
          <Row>
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <BodyCopy
                fontWeight="semibold"
                component="span"
                color="error"
                ffontFamily="secondary"
                fontSize="fs14"
              >
                {errorMsg}
              </BodyCopy>
            </Col>
          </Row>
          <Row>
            <Col colSize={{ small: 6, medium: 8, large: 12 }}>
              <BodyCopy color="error" fontFamily="secondary" fontSize="fs10">
                Choose a different color, size, fit or qty.
              </BodyCopy>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

ItemAvailability.propTypes = {
  errorMsg: PropTypes.string,
  className: PropTypes.string,
};

ItemAvailability.defaultProps = {
  errorMsg: '',
  className: '',
};

export default withStyles(ItemAvailability, style);

export { ItemAvailability };
