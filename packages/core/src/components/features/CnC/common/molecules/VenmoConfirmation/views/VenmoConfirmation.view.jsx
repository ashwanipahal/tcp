import React from 'react';
import { string, shape } from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Image from '../../../../../../common/atoms/Image';
import styles from '../styles/VenmoConfirmation.style';
import withStyles from '../../../../../../common/hoc/withStyles';

export const VenmoConfirmation = ({ labels, className }) => {
  return (
    <div className={className}>
      <div className="venmo-confirmation-container">
        <div>
          <div className="venmo-logo-wrapper">
            <Image
              alt={labels.lbl_venmo_logo}
              className="venmo-logo elem-pr-XXXS"
              src="https://cdn1.venmo.com/marketing/images/branding/venmo-icon.svg"
            />
          </div>
          <BodyCopy
            component="h3"
            fontSize="fs16"
            fontWeight="semibold"
            className="venmo-heading"
            fontFamily="secondary"
            color="gray.900"
          >
            {labels.lbl_venmo_payment}
          </BodyCopy>
          <BodyCopy
            color="gray.900"
            fontFamily="secondary"
            fontSize="fs14"
            textAlign="left"
            className="venmo-banner-text"
          >
            {labels.lbl_venmo_confirmation_message}
          </BodyCopy>
        </div>
      </div>
    </div>
  );
};

VenmoConfirmation.propTypes = {
  labels: shape({
    lbl_venmo_confirmation_message: string,
    lbl_venmo_payment: string,
    lbl_venmo_logo: string,
  }),
  className: string,
};

VenmoConfirmation.defaultProps = {
  labels: {
    lbl_venmo_confirmation_message: '',
    lbl_venmo_payment: '',
    lbl_venmo_logo: '',
  },
  className: '',
};

export default withStyles(VenmoConfirmation, styles);
export { VenmoConfirmation as VenmoConfirmationVanilla };
