import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EarnExtraPointsTile from '../views';
import {
  getEarnExtraPointsDataState,
  getCommonLabels,
  getEarnExtraPointsFetchingState,
} from './EarnExtraPointsTile.selectors';
import { getEarnExtraPointsList } from './EarnExtraPointsTile.actions';
import EarnExtraPointsTileSkelton from '../skelton/EarnExtraPointsTileSkelton.view';

export class EarnExtraPointsTileContainer extends React.PureComponent {
  componentDidMount() {
    const { getEarnExtraPointsListAction } = this.props;
    getEarnExtraPointsListAction();
  }

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { labels, waysToEarn, isAccountOverview, isFetching, ...otherProps } = this.props;

    return !isFetching ? (
      <EarnExtraPointsTile
        waysToEarn={waysToEarn}
        labels={labels}
        isAccountOverview={isAccountOverview}
        {...otherProps}
      />
    ) : (
      <EarnExtraPointsTileSkelton />
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
    isFetching: getEarnExtraPointsFetchingState(state),
  };
};

EarnExtraPointsTileContainer.propTypes = {
  getEarnExtraPointsListAction: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  waysToEarn: PropTypes.shape([]),
  isAccountOverview: PropTypes.bool,
  isFetching: PropTypes.bool,
};

EarnExtraPointsTileContainer.defaultProps = {
  labels: {},
  waysToEarn: [],
  isAccountOverview: false,
  isFetching: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EarnExtraPointsTileContainer);
