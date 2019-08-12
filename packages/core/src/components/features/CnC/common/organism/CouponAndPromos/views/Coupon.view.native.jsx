import React from 'react';
import PropTypes from 'prop-types';
import CouponForm from '../../../molecules/CouponForm';

class CouponView extends React.PureComponent {
  render() {
    const { handleApplyCoupon } = this.props;
    return <CouponForm onSubmit={handleApplyCoupon} source="form" />;
  }
}

CouponView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  handleApplyCoupon: PropTypes.func.isRequired,
};

export default CouponView;
export { CouponView as CouponViewVanilla };
