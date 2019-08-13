import React from 'react';
import PropTypes from 'prop-types';
import CouponForm from '../../../molecules/CouponForm';
import CouponHelpModal from './CouponHelpModal.view';

class CouponView extends React.PureComponent {
  state = {
    helpStatus: false,
  };

  toggleNeedHelpModal = () => {
    const { helpStatus } = this.state;
    this.setState({
      helpStatus: !helpStatus,
    });
  };

  render() {
    const { handleApplyCoupon, isFetching, labels } = this.props;
    const { helpStatus } = this.state;

    return (
      <>
        <CouponForm
          onSubmit={handleApplyCoupon}
          isFetching={isFetching}
          source="form"
          labels={labels}
          onNeedHelpTextClick={this.toggleNeedHelpModal}
        />
        <CouponHelpModal
          labels={labels}
          openState={helpStatus}
          onRequestClose={this.toggleNeedHelpModal}
        />
      </>
    );
  }
}

CouponView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  handleApplyCoupon: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default CouponView;
export { CouponView as CouponViewVanilla };
