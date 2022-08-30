import React from 'react';
import PropTypes from 'prop-types';
import FreeShippingBannerSection from '../../../molecules/FreeShippingBannerSection';

const FreeShippingBanner = props => {
  const { className, labels } = props;
  return (
    <div className={className}>
      <FreeShippingBannerSection labels={labels} />
    </div>
  );
};

FreeShippingBanner.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}).isRequired,
};

FreeShippingBanner.defaultProps = {
  className: '',
};

export default FreeShippingBanner;
