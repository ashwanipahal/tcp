import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import PLCCAgreementsWrapper from './styles/PLCCAgreements.style';

/**
 * @constant PLCCAgreements
 *
 * @param labels - data of labels.
 */
const PLCCAgreements = ({ labels }) => {
  return (
    <PLCCAgreementsWrapper>
      <BodyCopy component="h2" className="title" fontSize="fs16" fontFamily="secondary">
        {labels.plcc_form_financial_terms}
      </BodyCopy>
      <iframe
        title={labels.plcc_form_financial_terms}
        className="financial-terms-disclosures"
        src="https://comenity.net/childrensplace/common/Legal/disclosures.xhtml"
      />
    </PLCCAgreementsWrapper>
  );
};

PLCCAgreements.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default PLCCAgreements;
