import React from 'react';
import FreeShippingBannerSection from '../../../molecules/FreeShippingBannerSection';

class FreeShippingBanner extends React.PureComponent<Props> {
  render() {
    const { labels } = this.props;
    return <FreeShippingBannerSection labels={labels} />;
  }
}

export default FreeShippingBanner;
