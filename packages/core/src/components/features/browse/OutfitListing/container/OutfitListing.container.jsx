import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'next/router'; // eslint-disable-line
import OutfitListing from '../views/index';
import getLabels from './OutfitListing.selectors';

class OutfitListingContainer extends React.PureComponent {
  componentDidMount() {}

  render() {
    const { labels } = this.props;
    return <OutfitListing labels={labels} />;
  }
}

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
  };
};

function mapDispatchToProps() {}

OutfitListingContainer.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

OutfitListingContainer.defaultProps = {
  labels: {},
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OutfitListingContainer)
);
