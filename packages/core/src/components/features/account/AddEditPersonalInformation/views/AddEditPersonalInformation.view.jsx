import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import AddEditPersonalInformationForm from '../molecules/AddEditPersonalInformationForm';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';

export const AddEditPersonalInformation = ({
  labels,
  successMessage,
  errorMessage,
  onSubmit,
  birthMonthOptionsMap,
  birthYearOptionsMap,
  initialValues,
  isEmployee,
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
      <AddEditPersonalInformationForm
        labels={labels}
        successMessage={successMessage}
        errorMessage={errorMessage}
        onSubmit={onSubmit}
        birthMonthOptionsMap={birthMonthOptionsMap}
        birthYearOptionsMap={birthYearOptionsMap}
        initialValues={initialValues}
        isEmployee={isEmployee}
        formErrorMessage={formErrorMessage}
      />
    </React.Fragment>
  );
};

AddEditPersonalInformation.propTypes = {
  labels: PropTypes.shape({
    lbl_profile_personal_info_back: PropTypes.string,
    lbl_profile_heading: PropTypes.string,
  }),
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  birthMonthOptionsMap: PropTypes.shape([]).isRequired,
  birthYearOptionsMap: PropTypes.shape([]).isRequired,
  initialValues: PropTypes.shape({}),
  isEmployee: PropTypes.string.isRequired,
  formErrorMessage: PropTypes.shape({}).isRequired,
};

AddEditPersonalInformation.defaultProps = {
  labels: {
    lbl_profile_personal_info_back: '',
    lbl_profile_heading: '',
  },
  initialValues: {},
};
export default AddEditPersonalInformation;
