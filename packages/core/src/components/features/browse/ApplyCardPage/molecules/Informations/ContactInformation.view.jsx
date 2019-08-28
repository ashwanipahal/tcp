import React from 'react';
import { RichText } from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';

/**
 * @const ContactInformation
 *
 * @param - contactInfo
 * @description - classified contact information.
 */
const ContactInformation = ({ contactInfo = '' }) => {
  return (
    <div className="contact-info-message-content">
      <RichText richTextHtml={contactInfo} dataLocator="contact_disclaimer_info" />
    </div>
  );
};

ContactInformation.propTypes = {
  contactInfo: PropTypes.string.isRequired,
};

export default ContactInformation;
