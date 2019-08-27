import React from 'react';
import PropTypes from 'prop-types';
import AddEditPersonalInformationForm from '../molecules/AddEditPersonalInformationForm';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import Anchor from '../../../../common/atoms/Anchor';

export const AddEditPersonalInformation = ({ labels, successMessage, errorMessage, onSubmit,birthMonthOptionsMap , birthYearOptionsMap, initialValues }) => {
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
      />
    </React.Fragment>
  );
};

AddEditPersonalInformation.propTypes = {
  labels: PropTypes.shape({
    lbl_changePassword_back: PropTypes.string,
    lbl_changePassword_heading: PropTypes.string,
    lbl_changePassword_password_info: PropTypes.string,
  }),
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  birthMonthOptionsMap: PropTypes.shape([]).isRequired,
  birthYearOptionsMap: PropTypes.shape([]).isRequired,
  initialValues: PropTypes.shape({}),
};

AddEditPersonalInformation.defaultProps = {
  labels: {
    lbl_changePassword_back: '',
    lbl_changePassword_heading: '',
    lbl_changePassword_password_info: '',
  },
  initialValues:{},
};
export default AddEditPersonalInformation;
