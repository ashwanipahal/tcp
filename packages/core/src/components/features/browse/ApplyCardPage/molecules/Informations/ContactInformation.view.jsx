import React from 'react';
import { RichText } from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';
import ContactInformationWrapper from './styles/ContactInformation.style';

/**
 * @const ContactInformation
 *
 * @param - contactInfo
 * @description - classified contact information.
 */
const ContactInformation = ({ contactInfo = '' }) => {
  return (
    <div className="contact-info-message-content">
      <ContactInformationWrapper>
        <RichText richTextHtml={contactInfo} dataLocator="contact_disclaimer_info" />
      </ContactInformationWrapper>
    </div>
  );
};

ContactInformation.propTypes = {
  contactInfo: PropTypes.string.isRequired,
};

export default ContactInformation;
