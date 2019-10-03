import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import AboutYouInformationForm from '../molecules/AboutYouInformationForm';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';

export const AboutYouInformation = ({
  labels,
  successMessage,
  errorMessage,
  onSubmit,
  initialValues,
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
          data-locator="moreaboutyou-backlnk"
        >
          <span className="left-arrow"> </span>
          {getLabelValue(labels, 'lbl_profile_personal_info_back')}
        </Anchor>
      </BodyCopy>
      <FormPageHeadingComponent
        heading={getLabelValue(labels, 'lbl_profile_about_you_modal_heading')}
        className="margin-none"
        data-locator="moreaboutyou-header"
      />
      <AboutYouInformationForm
        labels={labels}
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    </React.Fragment>
  );
};

AboutYouInformation.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_personal_info_back: PropTypes.string,
    lbl_profile_about_you_modal_heading: PropTypes.string,
  }),
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({}),
};

AboutYouInformation.defaultProps = {
  labels: {
    lbl_profile_personal_info_back: '',
    lbl_profile_about_you_modal_heading: '',
  },
  initialValues: {},
};

export default AboutYouInformation;
