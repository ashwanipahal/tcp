import React from 'react';
import { RichText } from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';

/**
 * @constant ElectronicConsent
 *
 * @param electronicConsent - modulesX fetched content for electronic consent data.
 */
const ElectronicConsent = ({ electronicConsent = '' }) => {
  return (
    <React.Fragment>
      <RichText richTextHtml={electronicConsent} dataLocator="contact_disclaimer_info" />
    </React.Fragment>
  );
};

ElectronicConsent.propTypes = {
  electronicConsent: PropTypes.string,
};

ElectronicConsent.defaultProps = {
  electronicConsent: '',
};

export default ElectronicConsent;
