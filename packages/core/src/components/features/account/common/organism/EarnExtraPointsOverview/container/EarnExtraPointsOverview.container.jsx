import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCommonLabels } from '../../../../Account/container/Account.selectors';

import EarnExtraPointsOverview from '../views';

export class EarnExtraPointsOverviewContainer extends PureComponent {
  render() {
    const { labels } = this.props;

    return <EarnExtraPointsOverview labels={labels} />;
  }
}

EarnExtraPointsOverviewContainer.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export const mapStateToProps = state => {
  return {
    labels: getCommonLabels(state),
  };
};

export default connect(mapStateToProps)(EarnExtraPointsOverviewContainer);
