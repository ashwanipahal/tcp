import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';
import ProfileInformation from '../organism/ProfileInformation';

const MyProfile = ({ labels, labelsObj, ...otherProps }) => {
  return (
    <div>
      <FormPageHeadingComponent
        heading={getLabelValue(labels, 'lbl_profile_heading')}
        className="margin-none"
      />
      <ProfileInformation labels={labels} {...otherProps} />
    </div>
  );
};

MyProfile.propTypes = {
  labels: PropTypes.shape({}),
  labelsObj: PropTypes.shape({}),
};

MyProfile.defaultProps = {
  labels: {},
  labelsObj: {},
};

export default MyProfile;
