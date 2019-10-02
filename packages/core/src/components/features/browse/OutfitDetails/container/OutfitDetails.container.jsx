import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'next/router'; // eslint-disable-line
import OutfitDetails from '../views/index';
import getLabels from './OutfitDetails.selectors';

class OutfitDetailsContainer extends React.PureComponent {
  componentDidMount() {}

  render() {
    const { labels } = this.props;
    return <OutfitDetails labels={labels} />;
  }
}

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
  };
};

function mapDispatchToProps() {}

OutfitDetailsContainer.propTypes = {
  labels: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
};

OutfitDetailsContainer.defaultProps = {
  labels: {},
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OutfitDetailsContainer)
);
