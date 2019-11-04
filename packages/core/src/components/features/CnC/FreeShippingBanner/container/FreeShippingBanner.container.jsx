import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FreeShippingBannerView from '../views/FreeShippingBannerView';
import getLabels from './FreeShippingBanner.selectors';

export const FreeShippingBannerContainer = ({ labels }) => {
  return <FreeShippingBannerView labels={labels} />;
};

FreeShippingBannerContainer.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
  };
};

export default connect(mapStateToProps)(FreeShippingBannerContainer);
