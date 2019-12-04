import React from 'react';
import { string } from 'prop-types';
import { BodyCopy, Image } from '../../../atoms';
import { getIconPath } from '../../../../../utils/utils';
import styles from '../styles/VenmoBanner.style';
import withStyles from '../../../hoc/withStyles';

const VenmoBanner = ({ labels, className }) => {
  const venmoIcon = getIconPath('venmo-logo-blue');
  const { venmoBannerText, venmoIconAltText } = labels;
  return (
    <div className={className}>
      <div className="venmo-banner-container">
        <Image src={venmoIcon} alt={venmoIconAltText} className="venmo-logo" />
        <BodyCopy
          component="div"
          color="gray.900"
          fontFamily="secondary"
          fontSize="fs14"
          textAlign="center"
          className="venmo-banner-text"
        >
          {venmoBannerText}
        </BodyCopy>
      </div>
    </div>
  );
};

VenmoBanner.propTypes = {
  labels: shape({}),
  className: string,
};

VenmoBanner.defaultProps = {
  labels: {
    lbl_pickup_venmo_banner: '',
    venmoIconAltText: '',
  },
  className: '',
};

export default withStyles(VenmoBanner, styles);
export { VenmoBanner as VenmoBannerVanilla };
