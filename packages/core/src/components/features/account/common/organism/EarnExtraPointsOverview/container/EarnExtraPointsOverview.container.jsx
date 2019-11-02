import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCommonLabels } from '../../../../Account/container/Account.selectors';
import EarnExtraPointsOverviewSkelton from '../skelton/EarnExtraPointsOverviewSkelton.view';
import { getEarnExtraPointsFetchingState } from '../../EarnExtraPointsTile/container/EarnExtraPointsTile.selectors';
import EarnExtraPointsOverview from '../views';

export class EarnExtraPointsOverviewContainer extends PureComponent {
  render() {
    const { labels, handleComponentChange, isFetching } = this.props;

    if (isFetching) {
      return <EarnExtraPointsOverviewSkelton />;
    }
    return (
      <EarnExtraPointsOverview labels={labels} handleComponentChange={handleComponentChange} />
    );
  }
}

EarnExtraPointsOverviewContainer.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  handleComponentChange: PropTypes.func,
  isFetching: PropTypes.bool,
};
EarnExtraPointsOverviewContainer.defaultProps = {
  handleComponentChange: () => {},
  isFetching: false,
};

export const mapStateToProps = state => {
  return {
    labels: getCommonLabels(state),
    isFetching: getEarnExtraPointsFetchingState(state),
  };
};

export default connect(mapStateToProps)(EarnExtraPointsOverviewContainer);
