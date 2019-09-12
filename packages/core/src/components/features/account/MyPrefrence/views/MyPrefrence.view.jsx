import React from 'react';
import PropTypes from 'prop-types';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';
import MyFavoriteStore from '../organism/MyFavoriteStore.view';

const MyPrefrence = ({ labels }) => {
  return (
    <div>
      <FormPageHeadingComponent heading={labels.lbl_prefrence_heading} className="margin-none" />
      <MyFavoriteStore labels={labels} />
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
