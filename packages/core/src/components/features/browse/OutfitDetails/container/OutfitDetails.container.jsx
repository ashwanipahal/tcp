import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'next/router'; // eslint-disable-line
import OutfitDetails from '../views/index';
import { getLabels, getOutfitImage, getOutfitProducts } from './OutfitDetails.selectors';
import { getOutfitDetails } from './OutfitDetails.actions';

class OutfitDetailsContainer extends React.PureComponent {
  componentDidMount() {
    const {
      getOutfit,
      router: {
        query: { vendorColorProductIdsList, outfitId },
      },
    } = this.props;
    getOutfit({ outfitId, vendorColorProductIdsList });
  }

  render() {
    const { labels, outfitImageUrl, outfitProducts } = this.props;
    return (
      <OutfitDetails
        labels={labels}
        outfitImageUrl={outfitImageUrl}
        outfitProducts={outfitProducts}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
    outfitImageUrl: getOutfitImage(state),
    outfitProducts: getOutfitProducts(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getOutfit: payload => {
      dispatch(getOutfitDetails(payload));
    },
  };
}

OutfitDetailsContainer.propTypes = {
  getOutfit: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  outfitImageUrl: PropTypes.string,
  outfitProducts: PropTypes.shape({}),
  router: PropTypes.shape({
    query: PropTypes.shape({}),
  }),
};

OutfitDetailsContainer.defaultProps = {
  labels: {},
  outfitImageUrl: '',
  outfitProducts: {},
  router: {
    query: {},
  },
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OutfitDetailsContainer)
);
