import React from 'react';
import PropTypes from 'prop-types';
import FreeShippingBannerSection from '../../../molecules/FreeShippingBannerSection';

class FreeShippingBanner extends React.PureComponent<Props> {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { className, labels } = this.props;
    return (
      <div className={className}>
        <FreeShippingBannerSection labels={labels} />
      </div>
    );
  }
}

export default FreeShippingBanner;
