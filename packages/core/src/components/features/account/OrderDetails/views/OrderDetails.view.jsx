import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
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
      <BodyCopy
        fontSize="fs18"
        fontWeight="semibold"
        textAlign="center"
        fontFamily="secondary"
        className="morePointsWrapper"
      >
        testing order listing page
      </BodyCopy>
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
