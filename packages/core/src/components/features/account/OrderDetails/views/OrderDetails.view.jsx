import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Row, Col } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/OrderDetails.style';

import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';

/**
 * This function component use for return the EarnPoints
 * can be passed in the component.
 * @param waysToEarn - waysToEarn object used for showing extra points details
 */

const OrderDetailsView = ({ className }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  return (
    <div className={className}>
      <FormPageHeadingComponent heading="ORDER DETAILS" />
      <Row className="elem-mt-XL">
        <Col colSize={{ large: 6, medium: 4, small: 6 }}>
          <Row>
            <Col colSize={{ large: 6, medium: 8, small: 6 }}>
              <BodyCopy component="div">
                <BodyCopy
                  fontSize="fs14"
                  fontWeight="semibold"
                  fontFamily="secondary"
                  className="elem-mb-MED"
                >
                  Order Number
                </BodyCopy>
                <BodyCopy fontSize="fs14" fontWeight="extrabold" fontFamily="secondary">
                  257332628
                </BodyCopy>
              </BodyCopy>
              <BodyCopy component="div" className="elem-mt-XL">
                <BodyCopy
                  fontSize="fs14"
                  fontWeight="semibold"
                  fontFamily="secondary"
                  className="elem-mb-MED"
                >
                  Order Date
                </BodyCopy>
                <BodyCopy fontSize="fs14" fontFamily="secondary">
                  July 19, 2019 at 5:12am
                </BodyCopy>
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 6, medium: 8, small: 6 }}>
              <BodyCopy component="div">
                <BodyCopy fontSize="fs14" fontWeight="semibold" fontFamily="secondary">
                  Shipping
                </BodyCopy>
                <BodyCopy fontSize="fs14" fontFamily="secondary">
                  Address
                </BodyCopy>
              </BodyCopy>
            </Col>
          </Row>
        </Col>
        <Col colSize={{ large: 6, medium: 4, small: 6 }}>
          <Row>
            <Col colSize={{ large: 6, medium: 8, small: 6 }}>
              <BodyCopy fontSize="fs14" fontWeight="semibold" fontFamily="secondary">
                Billing
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 6, medium: 8, small: 6 }}>
              <BodyCopy fontSize="fs14" fontWeight="semibold" fontFamily="secondary">
                Order Summary
              </BodyCopy>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
OrderDetailsView.propTypes = {
  className: PropTypes.string,
};

OrderDetailsView.defaultProps = {
  className: '',
};

export default withStyles(OrderDetailsView, styles);
export { OrderDetailsView as OrderDetailsViewVanilla };
