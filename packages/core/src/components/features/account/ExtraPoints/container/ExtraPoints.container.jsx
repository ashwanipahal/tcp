import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EarnPoints from '../views';
import {
  getEarnExtraPointsDataState,
  getCommonLabels,
} from '../../common/organism/EarnExtraPointsTile/container/EarnExtraPointsTile.selectors';
import { getEarnExtraPointsList } from '../../common/organism/EarnExtraPointsTile/container/EarnExtraPointsTile.actions';
import ExtraPointsDetailModal from '../organism/ExtraPointsDetailModal.view';

export class ExtraPointsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedCoupon: null,
    };
  }

  componentDidMount() {
    const { getEarnExtraPointsListAction } = this.props;
    getEarnExtraPointsListAction();
  }

  /**
   * This function use for view coupon details for popup modal
   * can be passed in the component.
   * @param coupon - this is coupon data used for show coupon details
   */
  onViewCouponDetails = coupon => {
    this.setState({
      selectedCoupon: coupon,
    });
  };

  /**
   * This function use for close coupon details for popup modal
   * can be passed in the component.
   * @param coupon - this is coupon data used for show coupon details
   */
  onCloseCouponDetails = () => {
    this.setState({
      selectedCoupon: null,
    });
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { waysToEarn, labels } = this.props;
    const { selectedCoupon } = this.state;
    return (
      <>
        <EarnPoints
          labels={labels}
          waysToEarn={waysToEarn}
          onViewCouponDetails={this.onViewCouponDetails}
        />
        {selectedCoupon && (
          <ExtraPointsDetailModal
            openState={selectedCoupon}
            coupon={selectedCoupon}
            onRequestClose={this.onCloseCouponDetails}
          />
        )}
      </>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getEarnExtraPointsListAction: () => {
      dispatch(getEarnExtraPointsList());
    },
  };
};

const mapStateToProps = state => {
  return {
    waysToEarn: getEarnExtraPointsDataState(state),
    labels: getCommonLabels(state),
  };
};

ExtraPointsContainer.propTypes = {
  getEarnExtraPointsListAction: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  waysToEarn: PropTypes.shape([]),
};

ExtraPointsContainer.defaultProps = {
  labels: {},
  waysToEarn: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtraPointsContainer);
