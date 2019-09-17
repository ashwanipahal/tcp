import React from 'react';
import PropTypes from 'prop-types';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';
import MyPref from '../organism/MyPref.view';

const MyPrefrence = ({ labels }) => {
  return (
    <div>
      <FormPageHeadingComponent heading={labels.lbl_prefrence_heading} className="margin-none" />
      <MyPref labels={labels} />
    </div>
  );
};

MyPrefrence.propTypes = {
  labels: PropTypes.shape({}),
  labelsObj: PropTypes.shape({}),
};

MyPrefrence.defaultProps = {
  labels: {},
  labelsObj: {},
};

export default MyPrefrence;
