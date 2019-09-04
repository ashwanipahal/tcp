import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import AboutYouInformationForm from '../molecules/AboutYouInformationForm';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';

export const AboutYouInformation = ({
  labels,
  successMessage,
  errorMessage,
  onSubmit,
  initialValues,
  formErrorMessage,
}) => {
  return (
    <React.Fragment>
      <BodyCopy className="elem-mb-LRG">
        <Anchor
          to="/account?id=profile"
          asPath="/account/profile"
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          className="elem-mb-LRG"
        >
          <span className="left-arrow"> </span>
          {labels.lbl_profile_personal_info_back}
        </Anchor>
      </BodyCopy>
      <FormPageHeadingComponent
        heading={labels.lbl_profile_heading}
        className="margin-none"
        dataLocator="pi-profileinformationheading"
      />
      <AboutYouInformationForm
        labels={labels}
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={onSubmit}
        initialValues={initialValues}
        formErrorMessage={formErrorMessage}
      />
    </React.Fragment>
  );
};

AboutYouInformation.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_personal_info_back: PropTypes.string,
    lbl_profile_heading: PropTypes.string,
  }),
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}),
  formErrorMessage: PropTypes.shape({}).isRequired,
};

AboutYouInformation.defaultProps = {
  labels: {
    lbl_profile_personal_info_back: '',
    lbl_profile_heading: '',
  },
  initialValues: {},
};
export default AboutYouInformation;
