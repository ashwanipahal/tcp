import React from 'react';
import { RichText } from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';

/**
 * @const AccountInformations
 *
 * @param - classifiedDisclaimer
 * @description - classified disclaimed about account application.
 */
const AccountInformations = ({ classifiedDisclaimer = '' }) => {
  return <RichText richTextHtml={classifiedDisclaimer} dataLocator="pre_screen_code_link" />;
};

AccountInformations.propTypes = {
  classifiedDisclaimer: PropTypes.string.isRequired,
};

export default AccountInformations;
