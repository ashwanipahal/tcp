import React from 'react';
import { RichText } from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';
import ElectronicConsentWrapper from './styles/ElectronicConsent.style';

/**
 * @constant ElectronicConsent
 *
 * @param electronicConsent - modulesX fetched content for electronic consent data.
 */
const ElectronicConsent = ({ electronicConsent = '' }) => {
  return (
    <React.Fragment>
      <ElectronicConsentWrapper>
        <RichText richTextHtml={electronicConsent} dataLocator="contact_disclaimer_info" />
      </ElectronicConsentWrapper>
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
