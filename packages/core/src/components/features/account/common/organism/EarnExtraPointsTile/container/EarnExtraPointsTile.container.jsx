import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EarnExtraPointsTile from '../views';
import { getEarnExtraPointsDataState, getCommonLabels } from './EarnExtraPointsTile.selectors';
import { getEarnExtraPointsList } from './EarnExtraPointsTile.actions';

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
    const { labels, waysToEarn, isAccountOverview, ...otherProps } = this.props;

    return (
      <EarnExtraPointsTile
        waysToEarn={waysToEarn}
        labels={labels}
        isAccountOverview={isAccountOverview}
        {...otherProps}
      />
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

EarnExtraPointsTileContainer.propTypes = {
  getEarnExtraPointsListAction: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  waysToEarn: PropTypes.shape([]),
  isAccountOverview: PropTypes.bool,
};

EarnExtraPointsTileContainer.defaultProps = {
  labels: {},
  waysToEarn: [],
  isAccountOverview: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EarnExtraPointsTileContainer);
