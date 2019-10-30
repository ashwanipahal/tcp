import React from 'react';
import PropTypes from 'prop-types';
import FreeShippingBannerSection from '../../../molecules/FreeShippingBannerSection';

const FreeShippingBanner = props => {
  const { labels } = props;
  return <FreeShippingBannerSection labels={labels} />;
};

FreeShippingBanner.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default FreeShippingBanner;
