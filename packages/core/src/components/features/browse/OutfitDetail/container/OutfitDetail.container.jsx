import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; // eslint-disable-line
import OutfitDetail from '../views/index';

class OutfitListingContainer extends React.PureComponent {
  componentDidMount() {}

  render() {
    return <OutfitDetail />;
  }
}

function mapStateToProps() {}

function mapDispatchToProps() {}

OutfitListingContainer.defaultProps = {
  productDetails: [],
  breadCrumbs: {},
  longDescription: '',
  ratingsProductId: '',
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OutfitListingContainer)
);
