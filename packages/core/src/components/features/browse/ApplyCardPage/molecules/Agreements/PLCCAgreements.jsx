import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';

/**
 * @constant PLCCAgreements
 *
 * @param labels - data of labels.
 */
const PLCCAgreements = ({ labels }) => {
  return (
    <React.Fragment>
      <BodyCopy component="h2" className="title" fontSize="fs16" fontFamily="secondary">
        {labels.plcc_form_financial_terms}
      </BodyCopy>
      <BodyCopy
        component="iframe"
        data-loactor="financial-terms-disclosures"
        className="financial_terms financial-terms-disclosures"
        src="https://comenity.net/childrensplace/common/Legal/disclosures.xhtml"
      />
    </React.Fragment>
  );
};

PLCCAgreements.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default PLCCAgreements;
